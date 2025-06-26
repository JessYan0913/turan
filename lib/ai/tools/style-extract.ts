import { generateObject, tool } from 'ai';
import { z } from 'zod';

import { modelProvider } from '@/lib/ai/provider';
import { replicate } from '@/lib/replicate';

const analyzingPrompt = (stylePrompt: string) => `
You are a style expert tasked with analyzing visual rendering characteristics of an image. Below are the extracted visual style properties, including their dominance scores:

${stylePrompt}

Your task is to:

1. Identify the **dominant style** that most strongly defines the image based on the provided properties.
2. List the **compatible styles** that align well with the dominant style.
3. Identify any **conflicting styles** that should be excluded from the final style description.

Please output your answer as a JSON object with the following fields:

\`\`\`json
{
  "dominant_style_key": "rendering_medium", 
  "dominant_value": "digital painting", 
  "compatible_styles": [
    {"key": "linework", "value": "smooth, fluid lines"},
    {"key": "color_approach", "value": "vibrant, saturated colors"},
    {"key": "artistic_genre", "value": "anime/manga"},
    {"key": "rendering_resolution", "value": "high resolution"}
  ], 
  "discarded_styles": [
    {"key": "texture_simulation", "value": "textured, stylized surface"}
  ]
}
\`\`\`

### Explanation:

* **dominant_style_key**: The visual characteristic with the highest dominance score that defines the image style.
* **dominant_value**: The style value associated with the dominant characteristic.
* **compatible_styles**: An array of other style properties that align with the dominant style, forming a cohesive visual identity.
* **discarded_styles**: An array of style properties that conflict with the dominant style, which should be excluded from the final style description.

Focus **only on visual rendering characteristics**. Do not include any content or scene descriptions.
`;

const styleExtractPrompt = `
You are a visual style extraction assistant.

You will be shown an image. Your task is to analyze and extract its visual rendering style in a structured format that can be used to guide a style transfer model (e.g., Flux, Midjourney, or Stable Diffusion). You must NOT describe the content, people, or objects in the image — only the visual rendering characteristics.

Output your answer in the following JSON structure. For each dimension, you must include:

- value: a short, factual style description
- dominance_score: a score (0.0 – 1.0) that estimates how dominant this dimension is in defining the overall visual style of the image.

Also, return a final field:

- dominant_style_key: the key name of the style dimension that is most important in determining the image's overall style.

Use this JSON schema:

\`\`\`json
{
  "rendering_medium": {
    "value": "...",
    "dominance_score": ...
  },
  "linework": {
    "value": "...",
    "dominance_score": ...
  },
  "color_approach": {
    "value": "...",
    "dominance_score": ...
  },
  "texture_simulation": {
    "value": "...",
    "dominance_score": ...
  },
  "artistic_genre": {
    "value": "...",
    "dominance_score": ...
  },
  "rendering_resolution": {
    "value": "...",
    "dominance_score": ...
  },
  "dominant_style_key": "..."
}
\`\`\`

⚠️ Notes:

* Use specific and technical terms (e.g., "flat cel-shading", "watercolor bleed", "canvas texture", "minimalist vector art").
* Avoid generic or emotional words.
* All values must be visually inferred.
`;

async function runLLaVAStyleExtraction(imageUrl: string): Promise<string> {
  const stylePromptResult = await replicate.run(
    'yorickvp/llava-13b:80537f9eead1a5bfa72d5ac6ea6414379be41d4d4f6679fd776e9535d1eb58bb',
    {
      input: {
        image: imageUrl,
        prompt: styleExtractPrompt,
        top_p: 1,
        temperature: 0.2,
        max_token: 1024,
      },
    }
  );
  let stylePrompt = '';
  for await (const element of stylePromptResult as any) {
    stylePrompt += element;
  }

  return stylePrompt;
}

const styleAnalysisSchema = z.object({
  dominant_style_key: z.string(),
  dominant_value: z.string(),
  compatible_styles: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
  discarded_styles: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
});

export type StyleAnalysis = z.infer<typeof styleAnalysisSchema>;

async function processLLaVAStyleOutput(llavaOutput: string): Promise<StyleAnalysis> {
  const { object } = await generateObject({
    model: modelProvider.languageModel('prompt-model'),
    prompt: analyzingPrompt(llavaOutput),
    schema: styleAnalysisSchema,
  });
  return object;
}

export async function generateFluxStylePrompt(imageUrl: string): Promise<string> {
  const llavaOutput = await runLLaVAStyleExtraction(imageUrl);
  const styleAnalysis = await processLLaVAStyleOutput(llavaOutput);
  return `${styleAnalysis.dominant_value} style with ${styleAnalysis.compatible_styles.map((style) => style.value).join(', ')}, excluding ${styleAnalysis.discarded_styles.map((style) => style.value).join(', ')}.`;
}

export const styleExtractTool = tool({
  description: 'Extract style from image',
  parameters: z.object({
    iamge: z.string().describe('Image URL'),
  }),
  execute: async ({ iamge }) => {
    return await generateFluxStylePrompt(iamge);
  },
});
