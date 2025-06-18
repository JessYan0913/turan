import { NextResponse } from 'next/server';
import { type Prediction } from 'replicate';

import { generateTitle } from '@/lib/actions/ai';
import { saveOnlineImage } from '@/lib/actions/file-upload';
import { db } from '@/lib/db/client';
import { work } from '@/lib/db/schema';

export async function POST(request: Request) {
  try {
    const prediction = (await request.json()) as Prediction;
    if (prediction.status === 'succeeded') {
      const { prompt, userId, input_image, ip } = prediction.input as {
        userId: string;
        prompt: string;
        input_image: string;
        ip: string;
      };

      const title = await generateTitle(prompt);

      const processedImageBlob = await saveOnlineImage(prediction.output);

      await db.insert(work).values({
        userId,
        title,
        prompt,
        type: 'avatar',
        originalImage: input_image,
        processedImage: processedImageBlob.url,
        metadata: JSON.parse(JSON.stringify(prediction)) as Record<string, unknown>,
        completedAt: new Date(prediction.completed_at || new Date()),
        predictTime: prediction.metrics?.predict_time?.toString(),
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('💥 Webhook handling failed:', error);
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
  }
}
