import { NextResponse } from 'next/server';
import { type Prediction } from 'replicate';

import { updatePrediction } from '@/lib/db/queries';

import { broadcast } from '../sse/route';

export async function POST(request: Request) {
  try {
    const prediction = (await request.json()) as Prediction;
    console.log('Received webhook:', JSON.stringify(prediction, null, 2));
    updatePrediction(prediction.id, {
      ...prediction,
      startedAt: prediction.started_at ? new Date(prediction.started_at) : undefined,
      completedAt: prediction.completed_at ? new Date(prediction.completed_at) : undefined,
    });
    switch (prediction.status) {
      case 'processing':
        break;
      case 'succeeded':
        broadcast({});
        break;
      case 'failed':
        console.error('Prediction failed:', prediction.error);
        break;
      case 'canceled':
        console.log('Prediction canceled');
        break;
      default:
        console.log('Unknown prediction status:', prediction.status);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('💥 Webhook handling failed:', error);
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
  }
}
