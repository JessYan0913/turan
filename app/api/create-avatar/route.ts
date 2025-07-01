import { experimental_generateImage as generateImage } from 'ai';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { uploadFileToBlobStorage, uploadGeneratedImageToBlobStorage } from '@/lib/actions/file-upload';
import { modelProvider } from '@/lib/ai/provider';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { userTable } from '@/lib/db/schema';

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

    if (user.points < 15) {
      return NextResponse.json({ success: false, message: 'Insufficient points' }, { status: 400 });
    }

    // Parse FormData from the request
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;
    const background = formData.get('background') as string | null;
    const aspectRatio = formData.get('aspectRatio') as string | null;

    // Validate required fields
    if (!imageFile) {
      return NextResponse.json({ success: false, message: 'Image file is required' }, { status: 400 });
    }

    if (!background) {
      return NextResponse.json({ success: false, message: 'Background is required' }, { status: 400 });
    }

    if (!aspectRatio) {
      return NextResponse.json({ success: false, message: 'Aspect ratio is required' }, { status: 400 });
    }

    const blobData = await uploadFileToBlobStorage(imageFile);

    const { image } = await generateImage({
      model: modelProvider.imageModel('create-avatar-model'),
      prompt: '',
      providerOptions: {
        replicate: {
          output_format: 'png',
          input_image: blobData.url,
          aspect_ratio: aspectRatio,
          background,
          seed: 2,
          safety_tolerance: 2,
        },
      },
    });
    const resultBlobData = await uploadGeneratedImageToBlobStorage(image);

    // createPrediction(user, 15, prediction);

    return NextResponse.json({ ...resultBlobData }, { status: 200 });
  } catch (error) {
    console.error('Error processing avatar generate:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process avatar generate',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
