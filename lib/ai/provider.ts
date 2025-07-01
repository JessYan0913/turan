import { createReplicate } from '@ai-sdk/replicate';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { customProvider } from 'ai';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const replicate = createReplicate({
  apiToken: process.env.REPLICATE_API_TOKEN!,
});

export const modelProvider = customProvider({
  languageModels: {
    'title-model': openrouter('mistralai/mistral-small-3.2-24b-instruct:free'),
    'style-analysis-model': openrouter('mistralai/mistral-small-3.2-24b-instruct'),
  },
  imageModels: {
    'text-to-image-model': replicate.image('black-forest-labs/flux-schnell'),
    'image-edit-model': replicate.image('black-forest-labs/flux-kontext-pro'),
    'style-preset-model': replicate.image('black-forest-labs/flux-kontext-pro'),
    'create-avatar-model': replicate.image('flux-kontext-apps/professional-headshot'),
    'old-photo-restore-model': replicate.image('black-forest-labs/flux-kontext-pro'),
    'remove-bg-model': replicate.image(
      '851-labs/background-remover:a029dff38972b5fda4ec5d75d7d1cd25aeff621d2cf4946a41055d7db66b80bc'
    ),
  },
});
