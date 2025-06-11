'use client';

import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type Prediction } from 'replicate';
import { z } from 'zod';

import { ImageUploader } from '@/components/image-uploader';
import { ResultDisplay } from '@/components/result-display';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { usePollingRequest } from '@/hooks/usePollingRequest';
import { useScopedI18n } from '@/locales/client';

export function ImageEditTab() {
  const { themeClasses } = useTheme();
  const router = useRouter();
  const t = useScopedI18n('imageEdit');

  // Define the form schema using Zod
  const imageEditSchema = z.object({
    image: z.instanceof(File, { message: 'Please upload an image' }),
    prompt: z.string().min(1, { message: 'Please enter a prompt' }),
  });

  // Initialize react-hook-form with Zod validation
  const form = useForm<z.infer<typeof imageEditSchema>>({
    resolver: zodResolver(imageEditSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const {
    execute: submitEdit,
    data: generatedImage,
    status,
    reset,
  } = usePollingRequest<{ image: File; prompt: string }, Prediction>({
    request: async (data) => {
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('prompt', data.prompt);

      const response = await fetch('/api/image-edit', {
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
    (data: z.infer<typeof imageEditSchema>) => {
      reset();
      submitEdit({ image: data.image, prompt: data.prompt });
    },
    [submitEdit, reset]
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
                    inputId="edit-image-upload"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={t('prompt.placeholder')}
                      disabled={status === 'loading' || status === 'polling'}
                      rows={4}
                      className={`resize-none ${themeClasses.textarea} border-0 transition-all duration-300 focus:shadow-[0_8px_30px_rgba(59,130,246,0.15)]`}
                      {...field}
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
                  <Sparkles className="mr-2 size-4" />
                  {t('button.generate')}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 结果展示 */}
        <div>
          <ResultDisplay
            generatedImage={generatedImage || null}
            status={status}
            imageName={form.getValues('image')?.name || 'edited-image.png'}
          />
        </div>
      </form>
    </Form>
  );
}
