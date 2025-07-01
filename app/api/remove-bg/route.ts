import { experimental_generateImage as generateImage } from 'ai';
import { eq } from 'drizzle-orm';
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
      return new Response('Unauthorized', { status: 401 });
    }

    // Parse FormData from the request
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;

    // Validate required fields
    if (!imageFile) {
      return NextResponse.json({ success: false, message: 'Image file is required' }, { status: 400 });
    }

    const blobData = await uploadFileToBlobStorage(imageFile);

    const { image } = await generateImage({
      model: modelProvider.imageModel('remove-bg-model'),
      prompt: '',
      providerOptions: {
        replicate: {
          image: blobData.url,
          format: 'png',
        },
      },
    });

    const resultBlobData = await uploadGeneratedImageToBlobStorage(image);

    return NextResponse.json({ ...resultBlobData }, { status: 200 });
  } catch (error) {
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
