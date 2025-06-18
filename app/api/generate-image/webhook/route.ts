import { NextResponse } from 'next/server';
import { type Prediction } from 'replicate';

import { generateTitle } from '@/lib/actions/ai';
import { saveOnlineImage } from '@/lib/actions/file-upload';
import { consumePoint } from '@/lib/actions/work';
import { db } from '@/lib/db/client';
import { workTable } from '@/lib/db/schema';
import { verifyWebhookSignature } from '@/lib/utils';

async function processPrediction(prediction: Prediction) {
  try {
    if (prediction.status !== 'succeeded') {
      console.log('Prediction not succeeded, status:', prediction.status);
      return;
    }

    const { prompt, userId } = prediction.input as {
      prompt: string;
      userId: string;
    };

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

    await consumePoint(userId, 1);
    console.log('✅ Successfully processed prediction:', prediction.id);
  } catch (error) {
    console.error('❌ Error processing prediction:', error);
  }
}

export async function POST(request: Request) {
  if (!verifyWebhookSignature(request)) {
    console.error('⚠️ Invalid webhook signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 200 });
  }
  const response = NextResponse.json({ received: true });

  try {
    const prediction = (await request.json()) as Prediction;

    processPrediction(prediction).catch(console.error);

    return response;
  } catch (error) {
    console.error('💥 Webhook handling failed:', error);
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 200 });
  }
}
