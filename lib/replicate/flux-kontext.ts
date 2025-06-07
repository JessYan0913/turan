import Replicate from "replicate";
const replicate = new Replicate();

export interface FluxKontextInput {
  prompt: string;
  seed?: number | null;
  input_image?: string | null;
  aspect_ratio?: 'match_input_image' | '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '3:2' | '2:3' | '4:5' | '5:4' | '21:9' | '9:21' | '2:1' | '1:2';
  output_format?: 'jpg' | 'png';
  safety_tolerance?: number;
}

type FluxKontextOutput = {
  uri: string;
};

export const fluxKontext = async (input: FluxKontextInput): Promise<FluxKontextOutput> => {
  const defaultInput = {
    aspect_ratio: 'match_input_image',
    output_format: 'png',
    safety_tolerance: 2,
  };

  const mergedInput = { ...defaultInput, ...input };
  const output = await replicate.run("black-forest-labs/flux-kontext-pro", { input: mergedInput });
  return output as FluxKontextOutput;
}