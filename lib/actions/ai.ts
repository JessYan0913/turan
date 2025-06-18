'use server';

import { generateText } from 'ai';

import { modelProvider } from '@/lib/ai/provider';

export const generateTitle = async (prompt: string): Promise<string> => {
  const { text: title } = await generateText({
    model: modelProvider.languageModel('title-model'),
    system:
      'Write a concise title for a blog post, strictly between 10-20 characters in length. The title should be direct and engaging, with no additional text or formatting.',
    prompt,
  });
  return title;
};
