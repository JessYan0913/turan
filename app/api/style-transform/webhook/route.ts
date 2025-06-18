import { NextResponse } from 'next/server';
import { type Prediction } from 'replicate';

import { generateTitle } from '@/lib/actions/ai';
import { saveOnlineImage } from '@/lib/actions/file-upload';
import { consumePoint } from '@/lib/actions/work';
import { db } from '@/lib/db/client';
import { workTable } from '@/lib/db/schema';

export async function POST(request: Request) {
  try {
    const prediction = (await request.json()) as Prediction;
    if (prediction.status === 'succeeded') {
      const { prompt, userId, input_image, style, ip } = prediction.input as {
        userId: string;
        prompt: string;
        input_image: string;
        style: string;
        ip: string;
      };

      const title = await generateTitle(prompt);

      const processedImageBlob = await saveOnlineImage(prediction.output);

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

      await consumePoint(userId, 15);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('💥 Webhook handling failed:', error);
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
  }
}
