import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { createPrediction } from '@/lib/actions/prediction';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { userTable } from '@/lib/db/schema';
import { replicate } from '@/lib/replicate';
import { WEBHOOK_HOST } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;

    const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));

    if (!user) {
      redirect('/login');
    }

    if (user.points < 1) {
      return NextResponse.json({ success: false, message: 'Insufficient points' }, { status: 400 });
    }

    const { prompt, aspectRatio } = await request.json();

    if (!prompt) {
      return NextResponse.json({ success: false, message: 'Prompt is required' }, { status: 400 });
    }

    if (!aspectRatio) {
      return NextResponse.json({ success: false, message: 'Aspect ratio is required' }, { status: 400 });
    }

    const prediction = await replicate.predictions.create({
      model: 'black-forest-labs/flux-schnell',
      input: {
        userId,
        prompt,
        output_format: 'png',
        aspect_ratio: aspectRatio,
      },
      webhook: `${WEBHOOK_HOST}/api/webhook/text-to-image`,
      webhook_events_filter: ['completed'],
    });

    createPrediction(user, 1, prediction);

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
