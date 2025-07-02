import { experimental_generateImage as generateImage } from 'ai';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { uploadFileToBlobStorage, uploadGeneratedImageToBlobStorage } from '@/lib/actions/file-upload';
import { createPrediction, processFailedPrediction, processSuccessfulPrediction } from '@/lib/actions/prediction';
import { modelProvider } from '@/lib/ai/provider';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { userTable } from '@/lib/db/schema';

const NEED_POINTS = 15;

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = session.user.id;

  const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (user.points < NEED_POINTS) {
    return NextResponse.json({ success: false, message: 'Insufficient points' }, { status: 400 });
  }

  // Parse FormData from the request
  const formData = await request.formData();
  const imageFile = formData.get('image') as File | null;
  const prompt = formData.get('prompt') as string | null;

  // Validate required fields
  if (!imageFile) {
    return NextResponse.json({ success: false, message: 'Image file is required' }, { status: 400 });
  }

  if (!prompt) {
    return NextResponse.json({ success: false, message: 'Prompt is required' }, { status: 400 });
  }

  const blobData = await uploadFileToBlobStorage(imageFile);

  const prediction = await createPrediction(user, NEED_POINTS, {
    status: 'starting',
    error: null,
    userId: user.id,
    tool: 'image-edit',
    version: '1',
    input: {
      prompt: prompt,
      input_image: blobData.url,
      aspect_ratio: 'match_input_image',
      seed: 2,
      safety_tolerance: 2,
    },
    output: null,
    source: 'web',
    metrics: null,
  });

  try {
    const { image, responses } = await generateImage({
      model: modelProvider.imageModel('image-edit-model'),
      prompt: prompt,
      providerOptions: {
        replicate: {
          output_format: 'png',
          input_image: blobData.url,
          aspect_ratio: 'match_input_image',
          seed: 2,
          safety_tolerance: 2,
        },
      },
    });

    const resultBlobData = await uploadGeneratedImageToBlobStorage(image);
    setImmediate(() => {
      processSuccessfulPrediction(user, {
        ...prediction,
        output: resultBlobData,
        status: 'succeeded',
        metrics: responses,
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
    console.error('Error processing image edit:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process image',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
