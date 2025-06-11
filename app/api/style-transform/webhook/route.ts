import { NextResponse } from 'next/server';
import { type Prediction } from 'replicate';

import { generateTitle } from '@/lib/actions/ai';
import { saveOnlineImage } from '@/lib/actions/file-upload';
import { createWork } from '@/lib/db/queries';

export async function POST(request: Request) {
  try {
    const prediction = (await request.json()) as Prediction;
    if (prediction.status === 'succeeded') {
      const { prompt, userId, input_image, style } = prediction.input as {
        userId: string;
        prompt: string;
        input_image: string;
        style: string;
      };

      const title = await generateTitle(prompt);

      const processedImageBlob = await saveOnlineImage(prediction.output);

      await createWork(
        {
          title,
          prompt,
          type: 'style-transfer',
          style,
          originalImage: input_image,
          processedImage: processedImageBlob.url,
          metadata: JSON.parse(JSON.stringify(prediction)) as Record<string, unknown>,
          completedAt: new Date(prediction.completed_at || new Date()),
          predictTime: prediction.metrics?.predict_time?.toString(),
        },
        userId
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('💥 Webhook handling failed:', error);
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
  }
}
