import { NextResponse } from 'next/server';
import { type Prediction } from 'replicate';

import { broadcast } from '../sse/route';

export async function POST(request: Request) {
  try {
    const prediction = (await request.json()) as Prediction;
    console.log('Received webhook:', JSON.stringify(prediction, null, 2));

    switch (prediction.status) {
      case 'processing':
        console.log('Prediction processing...');
        break;
      case 'succeeded':
        console.log('Prediction completed!');
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
