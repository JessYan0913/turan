import { NextResponse } from 'next/server';

import { checkUserPoints, consumePoint } from '@/lib/actions/work';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { predictionTable } from '@/lib/db/schema';
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

    const predication = await replicate.predictions.create({
      model: 'black-forest-labs/flux-schnell',
      input: {
        userId,
        prompt,
        output_format: 'png',
      },
      webhook: `${WEBHOOK_HOST}/api/webhook/generate-image`,
      webhook_events_filter: ['completed'],
    });

    await db.insert(predictionTable).values({
      id: predication.id,
      status: predication.status as any, // Type assertion since the status types might not match exactly
      model: predication.model,
      version: predication.version,
      input: predication.input,
      output: predication.output ?? null,
      source: 'web',
      error: predication.error ?? null,
      logs: predication.logs ?? null,
      metrics: predication.metrics ?? null,
      webhook: predication.webhook ?? null,
      webhookEventsFilter: predication.webhook_events_filter ?? null,
      urls: predication.urls ?? {},
      createdAt: predication.created_at ? new Date(predication.created_at) : new Date(),
      startedAt: predication.started_at ? new Date(predication.started_at) : null,
    });

    consumePoint(userId, 1);

    return NextResponse.json({ id: predication.id, input: predication.input }, { status: 201 });
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
