import { experimental_generateImage as generateImage } from 'ai';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { uploadGeneratedImageToBlobStorage } from '@/lib/actions/file-upload';
import { createPrediction, processFailedPrediction, processSuccessfulPrediction } from '@/lib/actions/prediction';
import { modelProvider } from '@/lib/ai/provider';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { userTable } from '@/lib/db/schema';

const NEED_POINTS = 1;

export async function POST(request: Request) {
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

  const prediction = await createPrediction(user, NEED_POINTS, {
    status: 'starting',
    error: null,
    userId: user.id,
    tool: 'text-to-image',
    version: '1',
    input: {
      prompt: prompt,
      aspectRatio,
    },
    output: null,
    source: 'web',
    metrics: null,
  });

  try {
    const { image } = await generateImage({
      model: modelProvider.imageModel('text-to-image-model'),
      prompt: prompt,
      providerOptions: {
        replicate: {
          output_format: 'png',
          aspect_ratio: aspectRatio,
        },
      },
    });

    const resultBlobData = await uploadGeneratedImageToBlobStorage(image);
    setImmediate(() => {
      processSuccessfulPrediction(user, {
        ...prediction,
        output: resultBlobData,
        status: 'succeeded',
        metrics: null,
        completedAt: new Date(),
      });
    });

    return NextResponse.json({ ...resultBlobData }, { status: 200 });
  } catch (error) {
    setImmediate(() => {
      processFailedPrediction(user, NEED_POINTS, {
        ...prediction,
        output: null,
        status: 'failed',
        metrics: null,
        error: error,
        completedAt: new Date(),
      });
    });
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
