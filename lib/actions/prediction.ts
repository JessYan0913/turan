'use server';

import { and, count, desc, eq } from 'drizzle-orm';

import { db } from '@/lib/db/client';
import {
  type Prediction,
  predictionTable,
  transactionTable,
  type User,
  userTable,
  type WorkType,
} from '@/lib/db/schema';
import { nanoid } from '@/lib/utils';

export async function createPrediction(
  user: User,
  points: number,
  prediction: Omit<Prediction, 'id' | 'createdAt' | 'updatedAt' | 'startedAt' | 'completedAt'>
) {
  return await db.transaction(async (tx) => {
    const [insertedPrediction] = await tx
      .insert(predictionTable)
      .values({
        id: nanoid(),
        userId: user.id,
        status: prediction.status,
        tool: prediction.tool,
        version: prediction.version,
        input: prediction.input,
        output: prediction.output ?? null,
        source: 'web',
        error: prediction.error ?? null,
        metrics: prediction.metrics ?? null,
        createdAt: new Date(),
        startedAt: new Date(),
      })
      .returning();
    const [updatedUser] = await tx
      .update(userTable)
      .set({ points: user.points - points })
      .where(eq(userTable.id, user.id))
      .returning();
    await tx.insert(transactionTable).values({
      userId: user.id,
      amount: -points,
      type: 'payment' as const,
      status: 'completed' as const,
      balanceBefore: user.points,
      balanceAfter: updatedUser.points,
      predictionId: insertedPrediction.id,
      metadata: prediction,
    });
    return insertedPrediction;
  });
}

export async function processFailedPrediction(user: User, points: number, prediction: Prediction) {
  try {
    const [existingPrediction] = await db
      .select()
      .from(predictionTable)
      .where(
        and(
          eq(predictionTable.id, prediction.id),
          eq(predictionTable.status, 'starting'),
          eq(predictionTable.userId, user.id)
        )
      );

    if (!existingPrediction) {
      throw new Error('Prediction not found', { cause: prediction });
    }
    if (!['failed', 'canceled'].includes(prediction.status)) {
      throw new Error('Prediction is not failed or canceled', { cause: prediction });
    }

    await db.transaction(async (tx) => {
      await tx
        .update(predictionTable)
        .set({
          status: prediction.status,
          output: prediction.output,
          error: prediction.error,
          metrics: prediction.metrics,
          completedAt: new Date(),
        })
        .where(eq(predictionTable.id, prediction.id));

      const [updatedUser] = await tx
        .update(userTable)
        .set({ points: user.points + points })
        .where(eq(userTable.id, user.id))
        .returning();

      await tx.insert(transactionTable).values({
        userId: user.id,
        amount: points,
        type: 'payment' as const,
        status: 'completed' as const,
        balanceBefore: user.points,
        balanceAfter: updatedUser.points,
        predictionId: prediction.id,
        metadata: prediction,
      });
    });

    console.log('✅ Successfully processed failed prediction:', prediction.id);
  } catch (error) {
    console.error('❌ Error processing failed prediction:', error);
    throw error;
  }
}

export async function processSuccessfulPrediction(user: User, prediction: Prediction) {
  try {
    const [existingPrediction] = await db
      .select()
      .from(predictionTable)
      .where(
        and(
          eq(predictionTable.id, prediction.id),
          eq(predictionTable.status, 'starting'),
          eq(predictionTable.userId, user.id)
        )
      );

    if (!existingPrediction) {
      throw new Error('Prediction not found', { cause: prediction });
    }
    if (prediction.status !== 'succeeded') {
      throw new Error('Prediction is not completed', { cause: prediction });
    }

    await db
      .update(predictionTable)
      .set({
        status: prediction.status,
        output: prediction.output,
        error: prediction.error,
        metrics: prediction.metrics,
        completedAt: new Date(),
      })
      .where(eq(predictionTable.id, prediction.id));

    console.log('✅ Successfully processed successful prediction:', prediction.id);
  } catch (error) {
    console.error('❌ Error processing prediction:', error);
    throw error;
  }
}

export async function getPredictions(userId: string, limit: number, page: number) {
  const offset = (page - 1) * limit;
  const predictions = await db
    .select()
    .from(predictionTable)
    .where(eq(predictionTable.userId, userId))
    .orderBy(desc(predictionTable.createdAt))
    .limit(limit)
    .offset(offset);
  const totalResult = await db
    .select({ count: count() })
    .from(predictionTable)
    .where(eq(predictionTable.userId, userId));
  const total = Number(totalResult[0]?.count) || 0;
  return { predictions, total };
}
