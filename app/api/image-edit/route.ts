import { experimental_generateImage as generateImage } from 'ai';
import { NextResponse } from 'next/server';

import { generateTitle } from '@/lib/actions/ai';
import { uploadFileToBlobStorage, uploadGeneratedImageToBlobStorage } from '@/lib/actions/file-upload';
import { modelProvider } from '@/lib/ai/provider';
import { auth } from '@/lib/auth';
import { createWork } from '@/lib/db/queries';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;

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

    const title = await generateTitle(prompt);

    const blobData = await uploadFileToBlobStorage(imageFile);

    const { image: outputImage } = await generateImage({
      model: modelProvider.imageModel('image-edit-model'),
      prompt,
      providerOptions: {
        replicate: {
          input_image: blobData.url,
          aspect_ratio: 'match_input_image',
        },
      },
    });

    const outputBlobData = await uploadGeneratedImageToBlobStorage(outputImage, 'output-image.png');

    const work = await createWork(
      {
        title,
        type: 'edit',
        originalImage: blobData.url,
        processedImage: outputBlobData.url,
        style: '',
        metadata: {},
      },
      userId
    );

    return NextResponse.json(work, { status: 201 });
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
