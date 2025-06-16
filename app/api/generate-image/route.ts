import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { replicate } from '@/lib/replicate';
import { getClientIp, WEBHOOK_HOST } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;

    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ success: false, message: 'Prompt is required' }, { status: 400 });
    }

    const { id, input } = await replicate.predictions.create({
      model: 'black-forest-labs/flux-schnell',
      input: {
        userId,
        prompt,
        output_format: 'png',
        ip: getClientIp(request),
      },
      webhook: `${WEBHOOK_HOST}/api/generate-image/webhook`,
      webhook_events_filter: ['completed', 'logs', 'start'],
    });

    return NextResponse.json({ id, input }, { status: 201 });
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
