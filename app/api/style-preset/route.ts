import { experimental_generateImage as generateImage } from 'ai';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { uploadFileToBlobStorage, uploadGeneratedImageToBlobStorage } from '@/lib/actions/file-upload';
import { createPrediction, processPrediction } from '@/lib/actions/prediction';
import { modelProvider } from '@/lib/ai/provider';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { userTable } from '@/lib/db/schema';

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

  if (user.points < 15) {
    return NextResponse.json({ success: false, message: 'Insufficient points' }, { status: 400 });
  }

  // Parse FormData from the request
  const formData = await request.formData();
  const imageFile = formData.get('image') as File | null;
  const style = formData.get('style') as string | null;

  // Validate required fields
  if (!imageFile) {
    return NextResponse.json({ success: false, message: 'Image file is required' }, { status: 400 });
  }

  if (!style) {
    return NextResponse.json({ success: false, message: 'Style is required' }, { status: 400 });
  }

  const blobData = await uploadFileToBlobStorage(imageFile);

  const prompt = `${style} style`;

  const prediction = await createPrediction(user, 15, {
    status: 'starting',
    error: null,
    userId: user.id,
    model: 'style-preset-model',
    version: '1',
    input: {
      image: blobData.url,
      prompt,
    },
    output: null,
    source: 'web',
    metrics: null,
  });
  try {
    const { image, responses } = await generateImage({
      model: modelProvider.imageModel('style-preset-model'),
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
    // createPrediction(user, 15, prediction);
    setImmediate(() => {
      processPrediction(
        {
          ...prediction,
          output: resultBlobData,
          status: 'succeeded',
          metrics: responses,
          completedAt: new Date(),
        },
        {
          type: 'style-preset',
          points: 15,
          getWorkData: (input: any, processedImageUrl: string) => ({
            prompt: input.prompt,
            processedImageUrl,
          }),
        }
      );
    });

    return NextResponse.json({ ...resultBlobData }, { status: 200 });
  } catch (error) {
    setImmediate(() => {
      processPrediction(
        {
          ...prediction,
          output: null,
          status: 'failed',
          metrics: null,
          error: error,
          completedAt: new Date(),
        },
        {
          type: 'style-preset',
          points: 15,
          getWorkData: (input: any, processedImageUrl: string) => ({
            prompt: input.prompt,
            processedImageUrl,
          }),
        }
      );
    });
    console.error('Error processing style transform:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process style transform',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
