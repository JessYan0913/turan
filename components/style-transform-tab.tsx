'use client';

import { useCallback, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Palette } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type Prediction } from 'replicate';
import { z } from 'zod';

import { ImageUploader } from '@/components/image-uploader';
import { ResultDisplay } from '@/components/result-display';
import { StyleSelector } from '@/components/style-selector';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { usePollingRequest } from '@/hooks/use-polling-request';
import { StyleOption } from '@/lib/actions/options';
import { useScopedI18n } from '@/locales/client';
export function StyleTransformTab() {
  const router = useRouter();
  const t = useScopedI18n('styleTransform');

  // Define the form schema using Zod
  const styleTransformSchema = z.object({
    image: z.instanceof(File, { message: 'Please upload an image' }),
    style: z.string().min(1, { message: 'Please select a style' }),
    prompt: z.string().optional(),
  });

  // Initialize react-hook-form with Zod validation
  const form = useForm<z.infer<typeof styleTransformSchema>>({
    resolver: zodResolver(styleTransformSchema),
    defaultValues: {
      prompt: '',
      style: '',
    },
  });

  const {
    execute: submitTransform,
    data: generatedImage,
    status,
    reset,
  } = usePollingRequest<{ image: File; prompt: string; style: string }, Prediction>({
    request: async (data) => {
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('prompt', data.prompt);
      formData.append('style', data.style);

      const response = await fetch('/api/style-transform', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.status === 401) {
        router.push('/login');
        return;
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to process style transformation');
      }

      return response.json();
    },
    checkStatus: async (id) => {
      const response = await fetch(`/api/prediction/${id}`);
      if (!response.ok) {
        throw new Error('Failed to check status');
      }
      return response.json();
    },
    isComplete: (data: Prediction) => data.status === 'succeeded' || data.status === 'failed',
    getResult: (data: Prediction) => (data.status === 'succeeded' ? data.output : null),
    successMessage: t('result.success'),
    errorMessage: t('result.error'),
    timeoutMessage: t('result.timeout'),
  });

  const [styleOptions, setStyleOptions] = useState<StyleOption[]>([]);

  useEffect(() => {
    const fetchStyleOptions = async () => {
      try {
        const { getStyleOptions } = await import('@/lib/actions/options');
        const data = await getStyleOptions();
        setStyleOptions(data);
      } catch (error) {
        console.error('Failed to fetch style options:', error);
      }
    };

    fetchStyleOptions();
  }, []);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        form.setValue('image', file, { shouldValidate: true });
      }
    },
    [form]
  );

  const onSubmit = useCallback(
    (data: z.infer<typeof styleTransformSchema>) => {
      reset();
      submitTransform({ image: data.image, prompt: data.prompt || '', style: data.style });
    },
    [submitTransform, reset]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Column - Form Controls */}
        <div className="rounded-2xl bg-gradient-to-br from-white to-purple-50/30 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-purple-950/20 dark:ring-white/10">
          <div className="mb-6 space-y-2">
            <h3 className="text-xl font-medium tracking-tight text-purple-950 dark:text-purple-200">{t('title')}</h3>
            <p className="text-muted-foreground text-sm">{t('description')}</p>
          </div>

          <div className="space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-medium text-purple-800 dark:text-purple-300">
                    {t('upload.label')}
                  </FormLabel>
                  <FormControl>
                    <ImageUploader
                      onImageChange={handleImageUpload}
                      imageName={form.getValues('image')?.name}
                      inputId="style-image-upload"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2 space-y-1">
                    <FormLabel className="font-medium text-purple-800 dark:text-purple-300">
                      {t('prompt.label')}
                    </FormLabel>
                    <p className="text-muted-foreground text-xs">{t('prompt.description')}</p>
                  </div>
                  <FormControl>
                    <StyleSelector
                      options={styleOptions || []}
                      value={field.value}
                      onSelect={(style) => {
                        field.onChange(style.id);
                        form.setValue('prompt', style.prompt);
                      }}
                      placeholder={t('prompt.placeholder')}
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
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-6 text-base font-medium text-white shadow-sm transition-all duration-300 hover:shadow-md disabled:from-purple-400 disabled:to-indigo-400"
              disabled={status === 'loading' || status === 'polling' || !form.formState.isValid}
            >
              {status === 'loading' || status === 'polling' ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  {t('button.processing')}
                </>
              ) : (
                <>
                  <Palette className="mr-2 size-4" />
                  {t('button.generate')}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right Column - Result Display */}
        <div className="flex flex-col rounded-2xl bg-gradient-to-br from-white to-indigo-50/30 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-indigo-950/20 dark:ring-white/10">
          <div className="mb-6 space-y-2">
            <h3 className="text-xl font-medium tracking-tight text-indigo-950 dark:text-indigo-200">
              {t('result.title')}
            </h3>
            <p className="text-muted-foreground text-sm">{t('result.description')}</p>
          </div>
          <div className="min-h-[350px] flex-1">
            <ResultDisplay
              generatedImage={generatedImage}
              status={status}
              imageName={form.getValues('image')?.name || 'styled-image.png'}
              className="h-full"
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
