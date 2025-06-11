import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type Prediction } from 'replicate';
import useSWR from 'swr';
import { z } from 'zod';

import { ImageUploader } from '@/components/image-uploader';
import { ResultDisplay } from '@/components/result-display';
import { StyleSelector } from '@/components/style-selector';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { usePollingRequest } from '@/hooks/usePollingRequest';
import { fetcher } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

// Define the form schema using Zod
const avatarGenerationSchema = z.object({
  image: z.instanceof(File, { message: 'Please upload an image' }),
  background: z.string().min(1, { message: 'Please select a background' }),
});

// Define the form data type from the schema
type AvatarGenerationFormValues = z.infer<typeof avatarGenerationSchema>;

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  preview: string;
  prompt: string;
}

export function AvatarGenerationTab() {
  const { isDarkMode, themeClasses } = useTheme();
  const router = useRouter();
  const t = useScopedI18n('avatarGeneration');

  // Initialize react-hook-form with Zod validation
  const form = useForm<AvatarGenerationFormValues>({
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

  const { data: avatarStyleOptions } = useSWR<StyleOption[]>('/api/style-options?tab=avatar', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

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
    (data: AvatarGenerationFormValues) => {
      reset();
      generateAvatar({ image: data.image, background: data.background });
    },
    [generateAvatar, reset]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormControl>
                  <ImageUploader
                    onImageChange={handleImageUpload}
                    imageName={form.getValues('image')?.name}
                    inputId="avatar-image-upload"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 风格选择器 */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="background"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <StyleSelector
                      options={avatarStyleOptions || []}
                      value={field.value}
                      onSelect={(background) => {
                        field.onChange(background.id);
                      }}
                      placeholder={t('prompt.placeholder')}
                      isDarkMode={isDarkMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={status === 'loading' || status === 'polling'}
              className={`w-full transition-all duration-300 ${themeClasses.buttonPrimary}`}
              size="lg"
            >
              {status === 'loading' || status === 'polling' ? (
                <>
                  <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
        </div>

        {/* 结果展示 */}
        <div>
          <ResultDisplay
            generatedImage={generatedImage}
            status={status}
            imageName={form.getValues('image')?.name || 'avatar.png'}
          />
        </div>
      </form>
    </Form>
  );
}
