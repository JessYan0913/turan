import { NextResponse } from 'next/server';

import { uploadFileToBlobStorage } from '@/lib/actions/file-upload';
import { checkUserPoints, consumePoint } from '@/lib/actions/work';
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

    await checkUserPoints(userId, 15);

    // Parse FormData from the request
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;
    const background = formData.get('background') as string | null;

    // Validate required fields
    if (!imageFile) {
      return NextResponse.json({ success: false, message: 'Image file is required' }, { status: 400 });
    }

    if (!background) {
      return NextResponse.json({ success: false, message: 'Background is required' }, { status: 400 });
    }

    const blobData = await uploadFileToBlobStorage(imageFile);

    const { id, input } = await replicate.predictions.create({
      model: 'flux-kontext-apps/professional-headshot',
      input: {
        userId,
        background,
        output_format: 'png',
        input_image: blobData.url,
        aspect_ratio: '1:1',
        seed: 2,
        safety_tolerance: 2,
      },
      webhook: `${WEBHOOK_HOST}/api/webhook/avatar-generate`,
      webhook_events_filter: ['completed', 'logs', 'start'],
    });

    consumePoint(userId, 15);

    return NextResponse.json({ id, input }, { status: 201 });
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
