import { experimental_generateImage as generateImage } from 'ai';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { uploadFileToBlobStorage, uploadGeneratedImageToBlobStorage } from '@/lib/actions/file-upload';
import { createPrediction, processFailedPrediction, processSuccessfulPrediction } from '@/lib/actions/prediction';
import { modelProvider } from '@/lib/ai/provider';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { userTable } from '@/lib/db/schema';

const NEED_POINTS = 15;

const NoColorizePrompt = `
Please restore the damaged and missing areas in this old photo.
The restoration must be based strictly on the visible parts of the original image — do not invent or replace entire regions.
In particular, the person's face and limbs must be reconstructed based on the remaining features, keeping the original appearance, proportions, skin tone, age, gender, and ethnicity. Do not alter any existing details.
The restored image should look like a faithful and seamless repair of the original photo, not a re-imagined version.`;

const ColorizePrompt = `
Please restore the damaged and missing areas in this old photo.
The restoration of the person, especially the face and limbs, must strictly follow the visible original features — do not invent or replace them.
Preserve their appearance, proportions, skin tone, age, gender, and ethnicity.
Ensure the details of the face and limbs are highly accurate, keeping the original expression, features, and structure intact.
For the background, if it is heavily degraded or unclear, you may use reasonable artistic freedom to reconstruct it.
Ensure the background blends naturally with the rest of the image in terms of style, lighting, and overall atmosphere, while remaining consistent with the time period and context of the photo.
The final result should look like a faithful restoration of the original photo, with a seamless and natural background that does not compromise the accuracy of the person's features.`;

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = session.user.id;

  const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));

  if (!user) {
    redirect('/login');
  }

  if (user.points < NEED_POINTS) {
    return NextResponse.json({ success: false, message: 'Insufficient points' }, { status: 400 });
  }

  // Parse FormData from the request
  const formData = await request.formData();
  const imageFile = formData.get('image') as File | null;
  const colorize = formData.get('colorize') as string | null;

  // Validate required fields
  if (!imageFile) {
    return NextResponse.json({ success: false, message: 'Image file is required' }, { status: 400 });
  }

  const blobData = await uploadFileToBlobStorage(imageFile);

  const prompt = colorize === 'true' ? ColorizePrompt : NoColorizePrompt;

  const prediction = await createPrediction(user, NEED_POINTS, {
    status: 'starting',
    error: null,
    userId: user.id,
    tool: 'photo-restore',
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
      model: modelProvider.imageModel('old-photo-restore-model'),
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
    console.error('Error processing photo restore:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process photo restore',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
