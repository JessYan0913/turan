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
    'image-edit-model': replicate.image('black-forest-labs/flux-kontext-pro'),
  },
});
