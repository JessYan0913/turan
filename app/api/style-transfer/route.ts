import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { uploadFileToBlobStorage } from '@/lib/actions/file-upload';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { userTable } from '@/lib/db/schema';
import { replicate } from '@/lib/replicate';
import { WEBHOOK_HOST } from '@/lib/utils';

const styleExtractPrompt = `
You are an image style analysis assistant. You are given an image and must describe **only** its visual style.

⚠️ Do NOT describe any people, objects, clothing, or scenes.
🚫 Avoid referencing hats, faces, skies, buildings, or items.
✅ Focus strictly on the abstract aesthetic and stylistic aspects of the image.

Respond with a bullet-point list describing the following **six** aspects:

1. **Color palette** – Describe the color tone, warmth, or saturation (e.g., warm pastels, muted sepia, neon tones)
2. **Lighting & contrast** – Describe lighting conditions and intensity (e.g., soft light, natural glow, high contrast)
3. **Texture** – Describe the surface finish and texture (e.g., grainy, smooth, painterly, paper-like)
4. **Composition style** – Describe the visual framing (e.g., centered, dynamic, minimalistic, rule-of-thirds)
5. **Mood / atmosphere** – Describe the emotional feeling conveyed (e.g., nostalgic, whimsical, dark, serene)
6. **Artistic style or genre** – Identify the overall visual or artistic style the image most closely resembles (e.g., Studio Ghibli animation, vintage photo, oil painting, anime, ukiyo-e woodblock print, cyberpunk, watercolor)

Your output will be used by an image generation model to apply this aesthetic style to other images. Do not include scene descriptions or literal objects.
`;

export async function POST(request: NextRequest) {
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

    if (user.points < 15) {
      return NextResponse.json({ success: false, message: 'Insufficient points' }, { status: 400 });
    }

    // Parse FormData from the request
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;
    const styleImage = formData.get('styleImage') as File | null;

    // Validate required fields
    if (!imageFile) {
      return NextResponse.json({ success: false, message: 'Image file is required' }, { status: 400 });
    }

    if (!styleImage) {
      return NextResponse.json({ success: false, message: 'Style image is required' }, { status: 400 });
    }

    const blobData = await uploadFileToBlobStorage(imageFile);
    const styleImageData = await uploadFileToBlobStorage(styleImage);

    const stylePrompt = await replicate.run(
      'yorickvp/llava-13b:80537f9eead1a5bfa72d5ac6ea6414379be41d4d4f6679fd776e9535d1eb58bb',
      {
        input: {
          image: styleImageData.url,
          prompt: styleExtractPrompt,
          top_p: 1,
          temperature: 0.2,
          max_token: 1024,
        },
      }
    );
    console.log('=-=====>', stylePrompt);
  } catch (error) {
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
