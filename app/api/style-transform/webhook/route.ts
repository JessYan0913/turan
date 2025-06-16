import { NextResponse } from 'next/server';
import { type Prediction } from 'replicate';

import { generateTitle } from '@/lib/actions/ai';
import { saveOnlineImage } from '@/lib/actions/file-upload';
import { createOperationLog, createWork } from '@/lib/db/queries';

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

      createOperationLog({
        userId,
        operationName: 'generate-image',
        operationType: 'CREATE',
        operationModule: 'image',
        operationDesc: 'Generate image',
        method: 'POST',
        path: '/api/generate-image',
        query: JSON.stringify(prediction.input),
        params: JSON.stringify(prediction.input),
        body: JSON.stringify(prediction.input),
        status: 'SUCCESS',
        response: JSON.stringify(prediction.output),
        error: null,
        ip,
        startTime: new Date(),
        endTime: new Date(),
        metadata: JSON.stringify(prediction),
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('💥 Webhook handling failed:', error);
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
  }
}
