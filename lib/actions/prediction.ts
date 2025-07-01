'use server';

import { and, count, desc, eq } from 'drizzle-orm';

import { generateTitle } from '@/lib/actions/ai';
import { saveOnlineImage } from '@/lib/actions/file-upload';
import { db } from '@/lib/db/client';
import {
  type Prediction,
  predictionTable,
  transactionTable,
  type User,
  userTable,
  workTable,
  type WorkType,
} from '@/lib/db/schema';

export async function createPrediction(user: User, points: number, prediction: Prediction) {
  await db.transaction(async (tx) => {
    await tx.insert(predictionTable).values({
      id: prediction.id,
      userId: user.id,
      status: prediction.status as any, // Type assertion since the status types might not match exactly
      model: prediction.model,
      version: prediction.version,
      input: prediction.input,
      output: prediction.output ?? null,
      source: 'web',
      error: prediction.error ?? null,
      metrics: prediction.metrics ?? null,
      createdAt: new Date(),
      startedAt: new Date(),
    });
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
      predictionId: prediction.id,
      metadata: prediction,
    });
  });
}

type ProcessPredictionConfig = {
  type: WorkType;
  points: number;
  getWorkData: (input: any, processedImageUrl: string) => Record<string, unknown>;
};

export async function processPrediction(prediction: Prediction, config: ProcessPredictionConfig) {
  try {
    const [predication] = await db
      .select()
      .from(predictionTable)
      .where(and(eq(predictionTable.id, prediction.id), eq(predictionTable.status, 'starting')));

    if (!predication) throw new Error('Prediction not found', { cause: prediction });

    const { prompt, userId } = prediction.input as { prompt: string; userId: string; [key: string]: any };
    const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));
    if (!user) {
      throw new Error('User not found', { cause: userId });
    }
    if (prediction.status !== 'succeeded') {
      if (['failed', 'canceled'].includes(prediction.status)) {
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
            .set({ points: user.points + config.points })
            .where(eq(userTable.id, userId))
            .returning();
          await tx.insert(transactionTable).values({
            userId,
            amount: config.points,
            type: 'payment' as const,
            status: 'completed' as const,
            balanceBefore: user.points,
            balanceAfter: updatedUser.points,
            predictionId: prediction.id,
            metadata: prediction,
          });
        });
      }
      console.log('Prediction not succeeded, status:', prediction.status);
      return;
    }

    const title = await generateTitle(prompt);
    const processedImageBlob = await saveOnlineImage(
      Array.isArray(prediction.output) ? prediction.output[0] : prediction.output
    );

    await db.transaction(async (tx) => {
      const [updatedPrediction] = await tx
        .update(predictionTable)
        .set({
          status: prediction.status,
          output: prediction.output,
          error: prediction.error,
          metrics: prediction.metrics,
          completedAt: new Date(),
        })
        .where(eq(predictionTable.id, prediction.id))
        .returning();

      const workData = {
        userId,
        title,
        prompt,
        type: config.type,
        points: config.points,
        processedImage: processedImageBlob.url,
        metadata: prediction.metrics,
        completedAt: new Date(),
        predictTime: null,
        predictionId: updatedPrediction.id,
        ...config.getWorkData(prediction.input, processedImageBlob.url),
      };

      await tx.insert(workTable).values(workData);
    });

    console.log('✅ Successfully processed prediction:', prediction.id);
  } catch (error) {
    console.error('❌ Error processing prediction:', error);
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
