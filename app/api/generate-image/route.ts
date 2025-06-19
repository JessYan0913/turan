import { NextResponse } from 'next/server';

import { checkUserPoints, createPrediction } from '@/lib/actions/prediction';
import { auth } from '@/lib/auth';
import { replicate } from '@/lib/replicate';
import { WEBHOOK_HOST } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;

    await checkUserPoints(userId, 1);

    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ success: false, message: 'Prompt is required' }, { status: 400 });
    }

    const prediction = await replicate.predictions.create({
      model: 'black-forest-labs/flux-schnell',
      input: {
        userId,
        prompt,
        output_format: 'png',
      },
      webhook: `${WEBHOOK_HOST}/api/webhook/generate-image`,
      webhook_events_filter: ['completed'],
    });

    createPrediction(userId, 1, prediction);

    return NextResponse.json({ id: prediction.id, input: prediction.input }, { status: 201 });
  } catch (error) {
    console.error('Error processing image generation:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process image generation',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
