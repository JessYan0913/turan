import { NextResponse } from 'next/server';
import { type Prediction } from 'replicate';

import { updatePrediction } from '@/lib/db/queries';

import { broadcast } from '../sse/[id]/route';

export async function POST(request: Request) {
  try {
    const prediction = (await request.json()) as Prediction;
    const newPrediction = await updatePrediction(prediction.id, {
      ...prediction,
      startedAt: prediction.started_at ? new Date(prediction.started_at) : undefined,
      completedAt: prediction.completed_at ? new Date(prediction.completed_at) : undefined,
    });
    broadcast(newPrediction);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('💥 Webhook handling failed:', error);
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
  }
}
