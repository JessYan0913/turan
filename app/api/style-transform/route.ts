import { NextResponse } from 'next/server';

import { uploadFileToBlobStorage } from '@/lib/actions/file-upload';
import { auth } from '@/lib/auth';
import { replicate } from '@/lib/replicate';
import { WEBHOOK_HOST } from '@/lib/utils';

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
    const style = formData.get('style') as string | null; // Add this line to retrieve the style inf

    // Validate required fields
    if (!imageFile) {
      return NextResponse.json({ success: false, message: 'Image file is required' }, { status: 400 });
    }

    if (!prompt) {
      return NextResponse.json({ success: false, message: 'Prompt is required' }, { status: 400 });
    }

    if (!style) {
      return NextResponse.json({ success: false, message: 'Style is required' }, { status: 400 });
    }

    const blobData = await uploadFileToBlobStorage(imageFile);

    const prediction = await replicate.predictions.create({
      model: 'black-forest-labs/flux-kontext-pro',
      input: {
        userId,
        prompt,
        style,
        output_format: 'png',
        input_image: blobData.url,
        aspect_ratio: 'match_input_image',
        seed: 2,
        safety_tolerance: 2,
      },
      webhook: `${WEBHOOK_HOST}/api/style-transform/webhook`,
      webhook_events_filter: ['completed', 'logs', 'start'],
    });

    return NextResponse.json(prediction, { status: 201 });
  } catch (error) {
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
