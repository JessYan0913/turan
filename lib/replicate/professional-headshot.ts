import Replicate from "replicate";

export interface ProfessionalHeadshotInput {
  input_image: string;
  gender?: 'none' | 'male' | 'female';
  background?: 'white' | 'black' | 'neutral' | 'gray' | 'office';
  aspect_ratio?: 'match_input_image' | '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '3:2' | '2:3' | '4:5' | '5:4' | '21:9' | '9:21' | '2:1' | '1:2';
  output_format?: 'jpg' | 'png';
  seed?: number | null;
  safety_tolerance?: number;
}

type ProfessionalHeadshotOutput = {
  uri: string;
};

export const professionalHeadshot = async (input: ProfessionalHeadshotInput): Promise<ProfessionalHeadshotOutput> => {
  const defaultInput = {
    gender: 'none',
    background: 'neutral',
    aspect_ratio: 'match_input_image',
    output_format: 'png',
    safety_tolerance: 2,
  };

  const replicate = new Replicate();
  const mergedInput = { ...defaultInput, ...input };
  const output = await replicate.run("flux-kontext-apps/professional-headshot", { input: mergedInput });
  return output as ProfessionalHeadshotOutput;
};
