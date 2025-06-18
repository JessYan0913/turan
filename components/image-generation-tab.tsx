'use client';

import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { type Prediction } from 'replicate';
import { z } from 'zod';

import { ResultDisplay } from '@/components/result-display';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { usePollingRequest } from '@/hooks/use-polling-request';
import { useScopedI18n } from '@/locales/client';

export function ImageGenerationTab() {
  const t = useScopedI18n('imageGeneration');

  // Define the form schema using Zod
  const imageGenerationSchema = z.object({
    prompt: z.string().min(1, { message: 'Please enter a prompt' }),
  });

  // Initialize react-hook-form with Zod validation
  const form = useForm<z.infer<typeof imageGenerationSchema>>({
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
    (data: z.infer<typeof imageGenerationSchema>) => {
      reset();
      generateImage({ prompt: data.prompt });
    },
    [generateImage, reset]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Column - Form Controls */}
        <div className="rounded-2xl bg-gradient-to-br from-white to-amber-50/30 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-amber-950/20 dark:ring-white/10">
          <div className="mb-6 space-y-2">
            <h3 className="text-xl font-medium tracking-tight text-amber-950 dark:text-amber-200">{t('title')}</h3>
            <p className="text-muted-foreground text-sm">{t('description')}</p>
          </div>

          <div className="space-y-8">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2 space-y-1">
                    <FormLabel className="font-medium text-amber-800 dark:text-amber-300">
                      {t('prompt.label')}
                    </FormLabel>
                    <p className="text-muted-foreground text-xs">{t('prompt.description')}</p>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder={t('prompt.placeholder')}
                      disabled={status === 'loading' || status === 'polling'}
                      rows={8}
                      className="resize-none border border-gray-200 bg-white/80 transition-all duration-300 focus:border-amber-300 focus:shadow-[0_8px_30px_rgba(245,158,11,0.15)] dark:border-gray-700 dark:bg-gray-950/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 py-6 text-base font-medium text-white shadow-sm transition-all duration-300 hover:shadow-md disabled:from-amber-400 disabled:to-orange-400"
              disabled={status === 'loading' || status === 'polling' || !form.formState.isValid}
            >
              {status === 'loading' || status === 'polling' ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
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
        </div>

        {/* Right Column - Result Display */}
        <div className="flex flex-col rounded-2xl bg-gradient-to-br from-white to-orange-50/30 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-orange-950/20 dark:ring-white/10">
          <div className="mb-6 space-y-2">
            <h3 className="text-xl font-medium tracking-tight text-orange-950 dark:text-orange-200">
              {t('result.title')}
            </h3>
            <p className="text-muted-foreground text-sm">{t('result.description')}</p>
          </div>
          <div className="min-h-[350px] flex-1">
            <ResultDisplay
              generatedImage={generatedImage || null}
              status={status}
              imageName="generated-image.png"
              className="h-full"
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
