import { generateObject, tool } from 'ai';
import { z } from 'zod';

import { modelProvider } from '@/lib/ai/provider';

const styleExtractPrompt = `
You are a visual style extraction assistant. You must extract only rendering-related characteristics from an image using the following 14 visual style dimensions. Do NOT describe people, objects, or scene content.

---

1. renderingMedium  
- Description: Primary technical medium or emulated medium style.  
- Guidance: Describe what the rendering technique looks like. You may combine terms like "digital painting with photographic elements". Avoid reusing examples directly.

2. linework  
- Description: Presence, style, and detail of outlines or internal lines.  
- Guidance: Describe both contour lines and interior line detail, such as "thin outer strokes with cross-hatch shading".

3. colorApproach  
- Description: Color scheme, tone, and palette use.  
- Guidance: Specify both the palette structure and intensity, such as "muted tones with warm highlights" or "high-saturation primary colors".

4. textureSimulation  
- Description: Surface rendering and material texture effects.  
- Guidance: Include both the material feel and visual technique, such as "gritty pencil texture" or "smooth synthetic shading".

5. artisticGenre  
- Description: Art style or genre lineage (e.g., anime, cyberpunk, surrealist).  
- Guidance: Use recognizable or fused styles like "anime with photorealism" or "flat vector minimalism".

6. renderingResolution  
- Description: Perceived sharpness, clarity, or visual fidelity.  
- Guidance: Describe the apparent resolution level, not the file resolution, e.g., "high-definition with crisp edges".

7. visualMood  
- Description: The emotion or aesthetic atmosphere evoked visually.  
- Guidance: Must come from lighting, palette, or texture — e.g., "dreamy", "moody", "playful", etc.

8. surfaceFidelity  
- Description: Degree of realism or stylization in surfaces.  
- Guidance: Focus on material or form precision — such as "polished with highlights", "simplified geometry", or "hyper-detailed texture".

9. compositionStyle  
- Description: Layout structure and visual balance.  
- Guidance: Consider symmetry, focus, and arrangement, such as "rule-of-thirds layout with empty margins" or "asymmetrical diagonal flow".

10. lightingStyle  
- Description: Lighting technique and direction.  
- Guidance: Describe how the scene is lit, including light direction and softness — e.g., "backlit with glow", "harsh rim lighting", or "diffused top light".

11. backgroundTreatment  
- Description: Visual style of background relative to foreground.  
- Guidance: Focus on style match or spatial contrast — like "flat color background", "blurred depth", or "textured but abstract".

12. styleStrength  
- Description: Intensity of the applied visual style.  
- Guidance: Assess how strong or subtle the stylistic transformation is — e.g., "dominant", "highly stylized", "barely present".

13. visualCues  
- Description: 3–5 signature visual features.  
- Guidance: Write out 3–5 strong visual style elements (e.g., "flat shading", "high-contrast lighting", "grainy overlay").

14. signatureTechniques  
- Description: Optional. Unique markers from genre or artist.  
- Guidance: Use only if strongly present — e.g., "halftone dot shading", "Ghibli-style clouds", "retro VHS blur".

15. bodyFormStylization

- Description: Stylization and anatomical treatment of the full body form.
- Guidance: Focus on the overall proportions (e.g., head-to-body ratio), limb length, exaggeration or simplification of forms. Describe anatomical realism vs. stylization, such as "elongated limbs with fluid silhouette" or "compact body with cartoonish features". Note how body parts connect, and any unique exaggerations like oversized hands or minimal muscle contour.

16. facialStructureStyle

- Description: The structure and placement of facial elements — eyes, nose, mouth, jaw.
- Guidance: Analyze the face shape, feature placement, and proportion (e.g., "large forehead with low-placed eyes", "triangular face with narrow jawline"). Note if features are omitted or simplified (e.g., "no visible nose"), and describe symmetry or intentional distortion.

17. facialFeatureRendering

- Description: Rendering style of individual facial features (eyes, nose, mouth).
- Guidance:

  > Eyes:
    - Analyze shape and size (e.g., almond, round), eyelid details, spacing.
    - Iris and Pupil Rendering:
      - Observe iris style (e.g., "multi-layered gradients", "flat pastel tone").
      - Check pupil design (e.g., "vertical slit", "no pupil", "photorealistic reflection")
      - Note stylized effects (e.g., sparkles, star-shaped pupils, glow)
    - Consider emotional expression and stylistic exaggeration.

  > Nose: Simplification or detail (e.g., "flat triangle with no nostrils", "soft shading with visible bridge").
  
  > Mouth:Expression detail and lip structure (e.g., "soft pink lips with minimal outline", "thick black lines with cartoon smile").
  
  > Note consistent rendering techniques, stylistic exaggeration, and how these features interact.

If the image contains a human figure, you must also extract the following 3 additional style dimensions:

15. bodyFormStylization
16. facialStructureStyle
17. facialFeatureRendering

`;

const styleScheme = z.object({
  renderingMedium: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  linework: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  colorApproach: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  textureSimulation: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  artisticGenre: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  renderingResolution: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  visualMood: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  surfaceFidelity: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  compositionStyle: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  lightingStyle: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  backgroundTreatment: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  styleStrength: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  visualCues: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  signatureTechniques: z.object({
    value: z.string(),
    dominanceScore: z.number(),
  }),
  bodyFormStylization: z
    .object({
      value: z.string(),
      dominanceScore: z.number(),
    })
    .optional(),
  facialStructureStyle: z
    .object({
      value: z.string(),
      dominanceScore: z.number(),
    })
    .optional(),
  facialFeatureRendering: z
    .object({
      value: z.string(),
      dominanceScore: z.number(),
    })
    .optional(),
});

async function runLLaVAStyleExtraction(image: File | Blob): Promise<z.infer<typeof styleScheme>> {
  try {
    const { object } = await generateObject({
      model: modelProvider.languageModel('style-analysis-model'),
      system: styleExtractPrompt,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze the style of the following image.',
            },
            {
              type: 'image',
              image: await image.arrayBuffer(), // 或者使用其他支持的图像数据格式
              mimeType: image.type,
            },
          ] as any,
        },
      ],
      schema: styleScheme,
    });
    return object;
  } catch (error) {
    throw new Error();
  }
}

export async function generateFluxStylePrompt(image: File | Blob): Promise<string> {
  const style = await runLLaVAStyleExtraction(image);

  return Object.values(style)
    .map(({ value }) => value)
    .join(', ');
}

export const styleExtractTool = tool({
  description: 'Extract style from image',
  parameters: z.object({
    image: z.string().describe('Image URL'),
  }),
  execute: async ({ image }) => {
    const file = await fetch(image).then((res) => res.blob());
    return await generateFluxStylePrompt(file);
  },
});
