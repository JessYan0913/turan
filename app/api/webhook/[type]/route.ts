import { NextRequest, NextResponse } from 'next/server';

import {
  processAvatarGeneratePrediction,
  processGenerateImagePrediction,
  processImageEditPrediction,
  processStyleTransformPrediction,
} from '@/lib/actions/work';
import { verifyWebhookSignature } from '@/lib/utils';

export async function POST(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const webhookId = request.headers.get('webhook-id');
  const webhookSignatures = request.headers.get('webhook-signature');
  const webhookTimestamp = request.headers.get('webhook-timestamp');

  // Validate required headers
  if (!webhookId || !webhookSignatures || !webhookTimestamp) {
    return NextResponse.json({ error: 'Missing required webhook headers' }, { status: 401 });
  }

  // Validate timestamp (5 minutes max age)
  const timestamp = parseInt(webhookTimestamp, 10);
  if (isNaN(timestamp)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const now = Math.floor(Date.now() / 1000);
  const diff = Math.abs(now - timestamp);
  const MAX_DIFF_IN_SECONDS = 5 * 60; // 5 minutes

  if (diff > MAX_DIFF_IN_SECONDS) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // Get raw body
  const body = await request.text();

  if (!body) {
    return NextResponse.json({ error: 'Missing request body' }, { status: 401 });
  }

  // Construct the signed content
  const signedContent = `${webhookId}.${webhookTimestamp}.${body}`;

  if (!verifyWebhookSignature(signedContent, webhookSignatures)) {
    console.error('⚠️ Invalid webhook signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
  const response = NextResponse.json({ received: true });

  try {
    const prediction = JSON.parse(body);

    switch (type) {
      case 'generate-image':
        processGenerateImagePrediction(prediction);
        break;
      case 'style-transform':
        processStyleTransformPrediction(prediction);
        break;
      case 'image-edit':
        processImageEditPrediction(prediction);
        break;
      case 'avatar-generate':
        processAvatarGeneratePrediction(prediction);
        break;
      default:
        console.error('Invalid webhook type:', type);
        return NextResponse.json({ error: 'Invalid webhook type' }, { status: 400 });
    }

    return response;
  } catch (error) {
    console.error('💥 Webhook handling failed:', error);
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 200 });
  }
}
