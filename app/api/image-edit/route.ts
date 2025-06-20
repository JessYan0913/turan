import { NextResponse } from 'next/server';

import { uploadFileToBlobStorage } from '@/lib/actions/file-upload';
import { checkUserPoints, createPrediction } from '@/lib/actions/prediction';
import { auth } from '@/lib/auth';
import { replicate } from '@/lib/replicate';
import { getClientIp, WEBHOOK_HOST } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;

    await checkUserPoints(userId, 15);

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

    const prediction = await replicate.predictions.create({
      model: 'black-forest-labs/flux-kontext-pro',
      input: {
        userId,
        prompt,
        output_format: 'png',
        input_image: blobData.url,
        aspect_ratio: 'match_input_image',
        seed: 2,
        safety_tolerance: 2,
        ip: getClientIp(request),
      },
      webhook: `${WEBHOOK_HOST}/api/webhook/image-edit`,
      webhook_events_filter: ['completed', 'logs', 'start'],
    });

    createPrediction(userId, 15, prediction);

    return NextResponse.json({ id: prediction.id, input: prediction.input }, { status: 201 });
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
