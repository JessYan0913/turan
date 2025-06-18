'use client';

import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type Prediction } from 'replicate';
import { z } from 'zod';

import { ImageUploader } from '@/components/image-uploader';
import { ResultDisplay } from '@/components/result-display';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { usePollingRequest } from '@/hooks/use-polling-request';
import { useScopedI18n } from '@/locales/client';

export function ImageEditTab() {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Column - Form Controls */}
        <div className="rounded-2xl bg-gradient-to-br from-white to-green-50/30 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-green-950/20 dark:ring-white/10">
          <div className="mb-6 space-y-2">
            <h3 className="text-xl font-medium tracking-tight text-green-950 dark:text-green-200">{t('title')}</h3>
            <p className="text-muted-foreground text-sm">{t('description')}</p>
          </div>
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-medium text-green-800 dark:text-green-300">
                    {t('upload.label')}
                  </FormLabel>
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

            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2 space-y-1">
                    <FormLabel className="font-medium text-green-800 dark:text-green-300">
                      {t('prompt.label')}
                    </FormLabel>
                    <p className="text-muted-foreground text-xs">{t('prompt.description')}</p>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder={t('prompt.placeholder')}
                      disabled={status === 'loading' || status === 'polling'}
                      rows={4}
                      className="resize-none border border-gray-200 bg-white/80 transition-all duration-300 focus:border-green-300 focus:shadow-[0_8px_30px_rgba(34,197,94,0.15)] dark:border-gray-700 dark:bg-gray-950/50"
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
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 py-6 text-base font-medium text-white shadow-sm transition-all duration-300 hover:shadow-md disabled:from-green-400 disabled:to-teal-400"
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
        <div className="flex flex-col rounded-2xl bg-gradient-to-br from-white to-teal-50/30 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-teal-950/20 dark:ring-white/10">
          <div className="mb-6 space-y-2">
            <h3 className="text-xl font-medium tracking-tight text-teal-950 dark:text-teal-200">{t('result.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('result.description')}</p>
          </div>
          <div className="min-h-[350px] flex-1">
            <ResultDisplay
              generatedImage={generatedImage || null}
              status={status}
              imageName={form.getValues('image')?.name || 'edited-image.png'}
              className="h-full"
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
