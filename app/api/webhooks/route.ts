import { NextResponse } from 'next/server';
import { type Prediction } from 'replicate';

import { pushToSSE } from '@/lib/sse';

export async function POST(request: Request) {
  try {
    const prediction = (await request.json()) as Prediction;
    pushToSSE(prediction.id, 'update', prediction);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('💥 Webhook handling failed:', error);
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
  }
}
