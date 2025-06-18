'use server';

import { eq } from 'drizzle-orm';
import { type Prediction } from 'replicate';

import { generateTitle } from '@/lib/actions/ai';
import { saveOnlineImage } from '@/lib/actions/file-upload';
import { db } from '@/lib/db/client';
import { userTable, workTable } from '@/lib/db/schema';

export async function checkUserPoints(userId: string, requiredPoints: number) {
  const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));
  if (!user) throw new Error('用户不存在');
  const remain = (user.usageLimit ?? 0) - (user.usageCurrent ?? 0);
  if (remain < requiredPoints) {
    throw new Error('积分不足');
  }
}

export async function consumePoint(userId: string, points: number) {
  const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));
  if (!user) throw new Error('用户不存在');
  const remain = (user.usageLimit ?? 0) - (user.usageCurrent ?? 0);
  if (remain < points) {
    throw new Error('积分不足');
  }
  await db
    .update(userTable)
    .set({ usageCurrent: (user.usageCurrent ?? 0) + points })
    .where(eq(userTable.id, userId));
}

export async function processGenerateImagePrediction(prediction: Prediction) {
  try {
    const { prompt, userId } = prediction.input as {
      prompt: string;
      userId: string;
    };
    if (prediction.status !== 'succeeded') {
      if (['failed', 'canceled'].includes(prediction.status)) {
        await consumePoint(userId, -1);
      }
      console.log('Prediction not succeeded, status:', prediction.status);
      return;
    }

    const title = await generateTitle(prompt);
    const processedImageBlob = await saveOnlineImage(prediction.output[0]);

    await db.insert(workTable).values({
      userId,
      title,
      prompt,
      type: 'generate',
      points: 1,
      processedImage: processedImageBlob.url,
      metadata: JSON.parse(JSON.stringify(prediction)) as Record<string, unknown>,
      completedAt: new Date(prediction.completed_at || new Date()),
      predictTime: prediction.metrics?.predict_time?.toString(),
    });
    console.log('✅ Successfully processed prediction:', prediction.id);
  } catch (error) {
    console.error('❌ Error processing prediction:', error);
  }
}

export async function processStyleTransformPrediction(prediction: Prediction) {
  try {
    const { prompt, userId, input_image, style } = prediction.input as {
      userId: string;
      prompt: string;
      input_image: string;
      style: string;
    };
    if (prediction.status !== 'succeeded') {
      if (['failed', 'canceled'].includes(prediction.status)) {
        await consumePoint(userId, -15);
      }
      console.log('Prediction not succeeded, status:', prediction.status);
      return;
    }

    const title = await generateTitle(prompt);
    const processedImageBlob = await saveOnlineImage(prediction.output[0]);

    await db.insert(workTable).values({
      userId,
      title,
      prompt,
      type: 'style-transfer',
      points: 15,
      style,
      originalImage: input_image,
      processedImage: processedImageBlob.url,
      metadata: JSON.parse(JSON.stringify(prediction)) as Record<string, unknown>,
      completedAt: new Date(prediction.completed_at || new Date()),
      predictTime: prediction.metrics?.predict_time?.toString(),
    });
    console.log('✅ Successfully processed prediction:', prediction.id);
  } catch (error) {
    console.error('❌ Error processing prediction:', error);
  }
}

export async function processImageEditPrediction(prediction: Prediction) {
  try {
    const { prompt, userId, input_image } = prediction.input as {
      userId: string;
      prompt: string;
      input_image: string;
    };
    if (prediction.status !== 'succeeded') {
      if (['failed', 'canceled'].includes(prediction.status)) {
        await consumePoint(userId, -15);
      }
      console.log('Prediction not succeeded, status:', prediction.status);
      return;
    }

    const title = await generateTitle(prompt);
    const processedImageBlob = await saveOnlineImage(prediction.output[0]);

    await db.insert(workTable).values({
      userId,
      title,
      prompt,
      type: 'edit',
      points: 15,
      originalImage: input_image,
      processedImage: processedImageBlob.url,
      metadata: JSON.parse(JSON.stringify(prediction)) as Record<string, unknown>,
      completedAt: new Date(prediction.completed_at || new Date()),
      predictTime: prediction.metrics?.predict_time?.toString(),
    });
    console.log('✅ Successfully processed prediction:', prediction.id);
  } catch (error) {
    console.error('❌ Error processing prediction:', error);
  }
}

export async function processAvatarGeneratePrediction(prediction: Prediction) {
  try {
    const { prompt, userId, input_image } = prediction.input as {
      userId: string;
      prompt: string;
      input_image: string;
    };
    if (prediction.status !== 'succeeded') {
      if (['failed', 'canceled'].includes(prediction.status)) {
        await consumePoint(userId, -15);
      }
      console.log('Prediction not succeeded, status:', prediction.status);
      return;
    }

    const title = await generateTitle(prompt);
    const processedImageBlob = await saveOnlineImage(prediction.output[0]);

    await db.insert(workTable).values({
      userId,
      title,
      prompt,
      type: 'avatar',
      points: 15,
      originalImage: input_image,
      processedImage: processedImageBlob.url,
      metadata: JSON.parse(JSON.stringify(prediction)) as Record<string, unknown>,
      completedAt: new Date(prediction.completed_at || new Date()),
      predictTime: prediction.metrics?.predict_time?.toString(),
    });
    console.log('✅ Successfully processed prediction:', prediction.id);
  } catch (error) {
    console.error('❌ Error processing prediction:', error);
  }
}
