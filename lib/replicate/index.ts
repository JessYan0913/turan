import Replicate from 'replicate';

export interface FluxKontextInput {
  prompt: string;
  seed?: number | null;
  input_image?: string | null;
  aspect_ratio?:
    | 'match_input_image'
    | '1:1'
    | '16:9'
    | '9:16'
    | '4:3'
    | '3:4'
    | '3:2'
    | '2:3'
    | '4:5'
    | '5:4'
    | '21:9'
    | '9:21'
    | '2:1'
    | '1:2';
  output_format?: 'jpg' | 'png';
  safety_tolerance?: number;
}

export interface ProfessionalHeadshotInput {
  input_image: string;
  gender?: 'none' | 'male' | 'female';
  background?: 'white' | 'black' | 'neutral' | 'gray' | 'office';
  aspect_ratio?:
    | 'match_input_image'
    | '1:1'
    | '16:9'
    | '9:16'
    | '4:3'
    | '3:4'
    | '3:2'
    | '2:3'
    | '4:5'
    | '5:4'
    | '21:9'
    | '9:21'
    | '2:1'
    | '1:2';
  output_format?: 'jpg' | 'png';
  seed?: number | null;
  safety_tolerance?: number;
}

type FluxKontextOutput = {
  uri: string;
};

type ProfessionalHeadshotOutput = {
  uri: string;
};

/**
 * A service class that encapsulates Replicate API functionality
 */
class ReplicateService {
  private replicate: Replicate;

  constructor() {
    this.replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
  }

  /**
   * Generate an image using Flux Kontext model
   * @param input Configuration for the Flux Kontext model
   * @returns Promise with the generated image URI
   */
  public async generateImage(input: FluxKontextInput): Promise<FluxKontextOutput> {
    const defaultInput = {
      aspect_ratio: 'match_input_image',
      output_format: 'png',
      safety_tolerance: 2,
    };

    const mergedInput = { ...defaultInput, ...input };
    const output = await this.replicate.run('black-forest-labs/flux-kontext-pro', {
      input: mergedInput,
    });

    return output as FluxKontextOutput;
  }

  /**
   * Generate a professional headshot using AI
   * @param input Configuration for the professional headshot generation
   * @returns Promise with the generated headshot image URI
   */
  public async generateHeadshot(input: ProfessionalHeadshotInput): Promise<ProfessionalHeadshotOutput> {
    const defaultInput = {
      gender: 'none',
      background: 'neutral',
      aspect_ratio: 'match_input_image',
      output_format: 'png',
      safety_tolerance: 2,
    };

    const mergedInput = { ...defaultInput, ...input };
    const output = await this.replicate.run('flux-kontext-apps/professional-headshot', {
      input: mergedInput,
    });

    return output as ProfessionalHeadshotOutput;
  }
}

// Export a singleton instance
export const replicateService = new ReplicateService();
