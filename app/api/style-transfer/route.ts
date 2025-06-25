import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { uploadFileToBlobStorage } from '@/lib/actions/file-upload';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { userTable } from '@/lib/db/schema';
import { replicate } from '@/lib/replicate';
import { WEBHOOK_HOST } from '@/lib/utils';
import { createPrediction } from '@/lib/actions/prediction';

const styleExtractPrompt = `
You are a visual style extraction assistant for a generative image system.  
You will be shown an image. Your task is to **extract only the visual style**, not the content, subject, objects, or people.

🎯 Your goal is to generate a **detailed, high-fidelity style prompt** that can guide a generative model (such as Stable Diffusion, Midjourney, or a style transfer AI) to apply the exact same visual style to other images.

---

⚠️ DO NOT describe people, objects, clothing, or scene content.  
✅ DO describe the **artistic, aesthetic, and rendering aspects** of the image.

Output your answer in **structured bullet-point format**, covering the following aspects:

---

1. **Color palette** – Describe overall tone, temperature, saturation, and dominant hues. Include nuanced combinations (e.g., warm pastel pinks with hints of mint and golden undertones).

2. **Lighting & contrast** – Describe light quality, direction, and interaction with contrast and shadows (e.g., backlit soft bloom, low contrast with haze).

3. **Texture & material feel** – Describe perceived texture style: painterly, silky smooth, hand-drawn, vector flat, organic paper grain, CGI plasticity, etc.

4. **Artistic style or genre** – Describe the visual style’s lineage or influence: e.g., anime, cel-shaded digital, Pixar-style 3D, vintage print, ukiyo-e, vaporwave, oil painting, surrealism, cyberpunk.

5. **Rendering technique** – Mention how the image appears rendered: raster vs vector, gradient shading, outline-based, raytracing, bokeh, SSS (subsurface scattering), bloom effects, etc.

6. **Mood / tone / atmosphere** – Abstract emotional tone: serene, dark fairytale, dreamy, cozy melancholy, epic fantasy, hyper-clean minimalism, etc.

7. **Composition & framing** – Describe symmetry, layout rules, camera perspective, depth cues: e.g., centered portrait with cinematic depth-of-field blur.

8. **Detail density & visual noise** – Describe whether image is minimal or highly detailed, sharp or soft, with emphasis on clarity vs ornamentation.

9. **Unique stylistic signatures** – Call out any standout features: glowing edge highlights, chromatic aberration, sketch linework, airbrush shading, ambient haze, pastel diffusion, glitch effects, etc.

---

📌 Be creative and original in your analysis. Do NOT use the same phrases across multiple images.  
📌 Each point should feel *specific, evocative, and transferable* to a generative engine.  
📌 The output should feel like a **style blueprint**, not a review.
---
`;

const testPrompt = `
Here is the **visual style analysis** of the provided image:

---

🎨 **1. Color palette**

* Dominated by soft pastels, especially petal pinks, muted lavenders, and warm creams.
* Overall warm tone with a golden undertone from ambient light.
* High harmony between background and subject, producing a cohesive, low-contrast chromatic unity.
* Slightly saturated accents draw attention without breaking the delicate color flow.

💡 **2. Lighting & contrast**

* Soft, backlit glow with golden-hour warmth.
* Diffused highlights rim the edges subtly, with no harsh shadows.
* Gentle luminance gradients create depth through soft contrast instead of stark delineation.

🧶 **3. Texture & surface feel**

* Velvet-smooth surfaces with silk-like softness.
* Brushed digital texture simulating soft fabric and diffused atmosphere.
* Slight micro-detailing in folds and gradients, but no coarse grain.

🖼️ **4. Composition style**

* Classic portrait framing with balanced asymmetry.
* Rule-of-thirds respected subtly through body angle and gaze direction.
* Gentle guiding lines formed by background elements, with the figure subtly offset for visual tension.

🌫️ **5. Mood / atmosphere**

* Enchanting, serene, and wistfully romantic.
* Carries an air of gentle nostalgia with fairytale undertones.
* Calm yet alive, like a moment suspended in a springtime reverie.

🖌️ **6. Artistic style or genre**

* High-fidelity digital illustration with painterly realism.
* Strong influence from modern Ghibli-inspired romantic fantasy.
* Blends eastern illustrative sensibilities with cinematic Western rendering.

---

🧍 **7. Form stylization**

* Slightly exaggerated facial features and proportions—e.g., large, luminous eyes, softened bone structure.
* Silhouettes are fluid and organic, avoiding rigidity.
* Subtle line softening to enhance the dreamlike appeal.

🛠️ **8. Rendering technique**

* 3D-informed digital painting with soft shading and post-processed depth.
* Likely neural rendering or hybrid with AI enhancement.
* No hard lines—edge transitions rely on value shifts rather than outlines.

🔆 **9. Light–color interaction**

* Soft bloom envelops light edges, particularly where light hits skin or fabric.
* Warm subsurface scattering simulated around edges and contours.
* Hazy rim light glows gently around the main form, blending subject and space.

🧩 **10. Detail density**

* Medium-high detail focus on foreground with controlled background blur.
* Delicate flourishes—like floral patterns and hair accents—add visual richness without clutter.
* Smooth transitions keep the eye flowing naturally through the image.

🎥 **11. Cinematic quality**

* Shallow depth of field with smooth bokeh effects on background petals and lighting flares.
* Subtle focal compression enhancing portrait intimacy.
* Background light sources emulate lens glow and flaring, mimicking high-end camera optics.

🌸 **12. Ambient world design**

* Lush, luminous haze filled with delicate floral ambiance.
* Feels like a timeless spring suspended in golden mist—part reality, part visual poem.
* Immersive dream-space evoking both warmth and fleeting beauty.

---

This style encapsulates a harmonious blend of **romantic fantasy** and **digital elegance**, ideal for emotionally resonant storytelling or ethereal visual worlds.

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

    // const stylePromptResult = await replicate.run(
    //   'yorickvp/llava-13b:80537f9eead1a5bfa72d5ac6ea6414379be41d4d4f6679fd776e9535d1eb58bb',
    //   {
    //     input: {
    //       image: styleImageData.url,
    //       prompt: styleExtractPrompt,
    //       top_p: 1,
    //       temperature: 0.2,
    //       max_token: 1024,
    //     },
    //   }
    // );
    // let stylePrompt = '';
    // for await (const element of stylePromptResult as any) {
    //   stylePrompt += element;
    // }

    const prediction = await replicate.predictions.create({
      model: 'black-forest-labs/flux-kontext-pro',
      input: {
        userId,
        prompt: testPrompt,
        output_format: 'png',
        input_image: blobData.url,
        aspect_ratio: 'match_input_image',
        seed: 2,
        safety_tolerance: 2,
      },
      webhook: `${WEBHOOK_HOST}/api/webhook/image-edit`,
      webhook_events_filter: ['completed', 'logs', 'start'],
    });

    createPrediction(user, 15, prediction);

    return NextResponse.json({ id: prediction.id, input: prediction.input }, { status: 201 });
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
