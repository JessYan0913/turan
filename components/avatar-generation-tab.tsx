'use client';

import { useCallback, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, User } from 'lucide-react';
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
import { useScopedI18n } from '@/locales/client';

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  preview: string;
  prompt: string;
}

export function AvatarGenerationTab() {
  const router = useRouter();
  const t = useScopedI18n('avatarGeneration');

  // Define the form schema using Zod
  const avatarGenerationSchema = z.object({
    image: z.instanceof(File, { message: 'Please upload an image' }),
    background: z.string().min(1, { message: 'Please select a background' }),
  });

  // Initialize react-hook-form with Zod validation
  const form = useForm<z.infer<typeof avatarGenerationSchema>>({
    resolver: zodResolver(avatarGenerationSchema),
    defaultValues: {
      background: '',
    },
  });

  const {
    execute: generateAvatar,
    data: generatedImage,
    status,
    reset,
  } = usePollingRequest<{ image: File; background: string }, Prediction>({
    // 发起生成头像的请求
    request: async (data) => {
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('background', data.background);

      const response = await fetch('/api/avatar-generate', {
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
        throw new Error(error.message || t('result.error'));
      }

      return response.json();
    },
    checkStatus: async (id) => {
      const response = await fetch(`/api/prediction/${id}`);
      if (!response.ok) {
        throw new Error(t('result.checkFailed'));
      }
      return response.json();
    },
    isComplete: (data: Prediction) => data.status === 'succeeded' || data.status === 'failed',
    getResult: (data: Prediction) => (data.status === 'succeeded' ? data.output : null),
    successMessage: t('result.success'),
    errorMessage: t('result.error'),
    timeoutMessage: t('result.timeout'),
  });

  const [styles, setStyles] = useState<StyleOption[]>([]);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const { getAvatarStyleOptions } = await import('@/lib/actions/options');
        const data = await getAvatarStyleOptions();
        setStyles(data);
      } catch (error) {
        console.error('Failed to fetch avatar styles:', error);
      }
    };

    fetchStyles();
  }, []);

  const onSubmit = useCallback(
    (data: z.infer<typeof avatarGenerationSchema>) => {
      reset();
      generateAvatar({ image: data.image, background: data.background });
    },
    [generateAvatar, reset]
  );

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Form {...form}>
        <form
          className="rounded-2xl bg-gradient-to-br from-white to-blue-50/30 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-blue-950/20 dark:ring-white/10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Left Column - Form Controls */}
          <div className="mb-6 space-y-2">
            <h3 className="text-xl font-medium tracking-tight text-blue-950 dark:text-blue-200">{t('title')}</h3>
            <p className="text-sm text-muted-foreground">{t('description')}</p>
          </div>

          <div className="space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-medium text-blue-800 dark:text-blue-300">
                    {t('upload.label')}
                  </FormLabel>
                  <FormControl>
                    <ImageUploader
                      onImageChange={(e) => {
                        field.onChange(e.target.files?.[0]);
                      }}
                      imageName={field.value?.name}
                      inputId="avatar-image"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="background"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2 space-y-1">
                    <FormLabel className="font-medium text-blue-800 dark:text-blue-300">{t('prompt.label')}</FormLabel>
                    <p className="text-xs text-muted-foreground">{t('prompt.description')}</p>
                  </div>
                  <FormControl>
                    <StyleSelector
                      options={styles || []}
                      value={field.value}
                      onSelect={(background) => {
                        field.onChange(background.id);
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-6 text-base font-medium text-white shadow-sm transition-all duration-300 hover:shadow-md disabled:from-blue-400 disabled:to-purple-400"
              disabled={status === 'loading' || status === 'polling' || !form.formState.isValid}
            >
              {status === 'loading' || status === 'polling' ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  {t('button.processing')}
                </>
              ) : (
                <>
                  <User className="mr-2 size-4" />
                  {t('button.generate')}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
      {/* Right Column - Result Display */}
      <div className="flex flex-col rounded-2xl bg-gradient-to-br from-white to-purple-50/30 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-purple-950/20 dark:ring-white/10">
        <div className="mb-6 space-y-2">
          <h3 className="text-xl font-medium tracking-tight text-purple-950 dark:text-purple-200">
            {t('result.title')}
          </h3>
          <p className="text-sm text-muted-foreground">{t('result.description')}</p>
        </div>
        <div className="min-h-[350px] flex-1">
          <ResultDisplay
            generatedImage={generatedImage}
            status={status}
            imageName={form.getValues('image')?.name || 'avatar.png'}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}
