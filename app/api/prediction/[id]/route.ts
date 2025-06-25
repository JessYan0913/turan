import { type NextRequest, NextResponse } from 'next/server';

import { replicate } from '@/lib/replicate';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: predictionId } = await params;

    if (!predictionId) {
      return NextResponse.json({ success: false, message: 'Prediction ID is required' }, { status: 400 });
    }

    const { urls, webhook, ...prediction } = await replicate.predictions.get(predictionId);

    return NextResponse.json(prediction, { status: 200 });
  } catch (error) {
    console.error('Error checking prediction status:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to check prediction status',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
