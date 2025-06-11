'use client';

import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { type Prediction } from 'replicate';
import { z } from 'zod';

import { ResultDisplay } from '@/components/result-display';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { usePollingRequest } from '@/hooks/usePollingRequest';
import { useScopedI18n } from '@/locales/client';

// Define the form schema using Zod
const imageGenerationSchema = z.object({
  prompt: z.string().min(1, { message: 'Please enter a prompt' }),
});

type ImageGenerationFormValues = z.infer<typeof imageGenerationSchema>;

export function ImageGenerationTab() {
  const { themeClasses } = useTheme();
  const t = useScopedI18n('imageGeneration');

  // Initialize react-hook-form with Zod validation
  const form = useForm<ImageGenerationFormValues>({
    resolver: zodResolver(imageGenerationSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const {
    execute: generateImage,
    data: generatedImage,
    status,
    reset,
  } = usePollingRequest<{ prompt: string }, Prediction>({
    // 发起生成图片的请求
    request: async (data) => {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || t('result.error'));
      }
      const result = await response.json();
      return result;
    },
    // 检查生成状态
    checkStatus: async (id) => {
      const response = await fetch(`/api/prediction/${id}`);
      if (!response.ok) {
        throw new Error(t('result.checkFailed'));
      }
      return response.json();
    },
    // 判断是否完成
    isComplete: (data: Prediction) => data.status === 'succeeded' || data.status === 'failed',
    // 提取结果
    getResult: (data: Prediction) => (data.status === 'succeeded' ? data.output[0] : null),

    // 自定义消息
    successMessage: t('result.success'),
    errorMessage: t('result.error'),
    timeoutMessage: t('result.timeout'),
  });

  const onSubmit = useCallback(
    (data: ImageGenerationFormValues) => {
      reset();
      generateImage({ prompt: data.prompt });
    },
    [generateImage, reset]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid min-h-[calc(100vh-500px)] gap-8 md:grid-cols-2">
        <div className="flex h-full flex-col space-y-6">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormControl>
                    <Textarea
                      placeholder={t('prompt.placeholder')}
                      disabled={status === 'loading' || status === 'polling'}
                      rows={8}
                      className={`h-full resize-none ${themeClasses.textarea} border-0 transition-all duration-300 focus:shadow-[0_8px_30px_rgba(59,130,246,0.15)]`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'loading' || status === 'polling'}
            className={`w-full transition-all duration-300 ${themeClasses.buttonPrimary}`}
          >
            {status === 'loading' || status === 'polling' ? (
              <>
                <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {t('button.processing')}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 size-4" />
                {t('button.generate')}
              </>
            )}
          </Button>
        </div>

        {/* 结果展示 */}
        <div className="flex h-full flex-col">
          <ResultDisplay
            generatedImage={generatedImage || null}
            status={status}
            imageName="generated-image.png"
            className="size-full"
          />
        </div>
      </form>
    </Form>
  );
}
