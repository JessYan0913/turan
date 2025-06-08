import { NextResponse } from 'next/server';

import { uploadFileToBlobStorage } from '@/lib/actions/file-upload';
import { auth } from '@/lib/auth';
import { createPrediction, createWork } from '@/lib/db/queries';
import { replicate } from '@/lib/replicate';

const WEBHOOK_HOST = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NGROK_HOST;

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

    // Upload the file to blob storage
    const blobData = await uploadFileToBlobStorage(imageFile);

    const work = await createWork(
      { title: '图片编辑', type: 'edit', originalImage: blobData.url, processedImage: '', style: '', metadata: {} },
      userId
    );

    const prediction = await replicate.predictions.create({
      model: 'black-forest-labs/flux-kontext-pro',
      input: {
        input_image: blobData.url,
        prompt,
      },
      webhook: `${WEBHOOK_HOST}/api/webhooks`,
      webhook_events_filter: ['start', 'completed', 'logs', 'output'],
    });

    await createPrediction({
      ...prediction,
      workId: work.id,
      source: 'api' as const,
    });

    if (prediction?.error) {
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction, { status: 201 });
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
