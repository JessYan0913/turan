import { createOpenAI } from '@ai-sdk/openai';
import { createReplicate } from '@ai-sdk/replicate';
import { customProvider } from 'ai';

const siliconflow = createOpenAI({
  name: 'siliconflow',
  apiKey: process.env.SILICONFLOW_API_KEY,
  baseURL: 'https://api.siliconflow.cn/v1',
  compatibility: 'compatible',
});

const replicate = createReplicate({
  apiToken: process.env.REPLICATE_API_TOKEN!,
});

export const modelProvider = customProvider({
  languageModels: {
    'title-model': siliconflow('Qwen/Qwen3-8B', {
      enable_thinking: false,
    } as any),
  },
  imageModels: {
    'image-edit-model': replicate.image('black-forest-labs/flux-kontext-pro'),
  },
});
