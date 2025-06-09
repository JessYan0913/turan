import { generateText } from 'ai';

import { modelProvider } from '@/lib/ai/provider';

export const generateTitle = async (prompt: string): Promise<string> => {
  const { text: title } = await generateText({
    model: modelProvider.languageModel('title-model'),
    system: 'Write a short title for a blog post about the latest AI advancements.',
    prompt,
  });
  return title;
};
