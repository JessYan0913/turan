'use client';

import { useCallback, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Download, Image as ImageIcon, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

import { ImageSlider } from '@/components/image-slider';
import { ImageUploader } from '@/components/image-uploader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

export function RemoveBg() {
  const t = useScopedI18n('remove-bg.tool');
  const router = useRouter();
  const imageRef = useRef<HTMLImageElement>(null);
  const imageEditSchema = z.object({
    image: z.instanceof(File, { message: t('form.image.message') }),
  });

  const form = useForm<z.infer<typeof imageEditSchema>>({
    resolver: zodResolver(imageEditSchema),
    defaultValues: {},
  });

  const {
    trigger: removeBg,
    isMutating: isProcessing,
    error,
    reset,
    data: generatedImage,
  } = useSWRMutation('/api/remove-bg', async (url, { arg }: { arg: FormData }) => {
    const response = await fetch(url, {
      method: 'POST',
      body: arg,
      credentials: 'include',
    });

    if (response.status === 401) {
      router.push('/login');
      return null;
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'An error occurred while processing your request');
    }

    return response.json();
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof imageEditSchema>) => {
      try {
        reset();
        const formData = new FormData();
        formData.append('image', data.image);

        await removeBg(formData);
      } catch (err) {
        console.error('Error removing background:', err);
      }
    },
    [removeBg, reset]
  );

  return (
    <div className="grid h-full min-h-[calc(100vh-320px)] grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Left Column - Form */}
      <div className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-br from-white to-blue-50/50 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-blue-950/20 dark:ring-white/10"
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange } }) => (
                  <FormItem className="space-y-2">
                    <div className="mb-2 space-y-1">
                      <FormLabel className="font-medium text-blue-700 dark:text-cyan-400">
                        {t('form.image.label')}
                      </FormLabel>
                      <p className="text-muted-foreground text-xs">{t('form.image.description')}</p>
                    </div>
                    <FormControl>
                      <ImageUploader onImageChange={onChange} disabled={isProcessing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-5 text-base font-medium text-white shadow-sm transition-all duration-300 hover:from-blue-700 hover:to-cyan-600 hover:shadow-md disabled:from-blue-400 disabled:to-cyan-400"
                disabled={isProcessing || !form.formState.isValid}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 size-5 animate-spin" />
                    {t('form.submit.loading')}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 size-4" />
                    {t('form.submit.default')}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Right Column - Result Display */}
      <div className="relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-white to-blue-50/50 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-blue-950/20 dark:ring-white/10">
        {/* Regenerate Button - Always visible, only enabled when there's an image */}
        {generatedImage && (
          <Button
            onClick={() => reset()}
            className="absolute bottom-6 left-6 z-20 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800/100"
            variant="ghost"
          >
            <RefreshCw className="size-4" />
            {t('regenerate')}
          </Button>
        )}
        {/* Download Button - Always visible, only enabled when there's an image */}
        {generatedImage?.downloadUrl && (
          <Link
            href={generatedImage.downloadUrl}
            className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800/100"
          >
            <Download className="size-4" />
            {t('download')}
          </Link>
        )}

        {/* Result Content */}
        <div className="relative flex flex-1 flex-col items-center justify-center p-6">
          {/* Idle State */}
          <div
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center space-y-4 p-6 text-center transition-all duration-500',
              !isProcessing && !generatedImage && !error ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
          >
            <div className="rounded-full bg-blue-50 p-6 dark:bg-blue-900/20">
              <ImageIcon className="size-16 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t('idle.title')}</h3>
              <p className="text-muted-foreground mt-2 max-w-xs text-sm">{t('idle.subtitle')}</p>
            </div>
          </div>

          {/* Loading/Polling State */}
          <div
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center space-y-6 p-6 transition-all duration-500',
              isProcessing ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
          >
            <div className="scale-100 animate-[pulse_1s_ease-in-out_infinite] transition-all hover:scale-110">
              <Sparkles className="size-16 text-cyan-500" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{'Processing...'}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{'Processing...'} </p>
            </div>
          </div>

          {/* Error State */}
          <div
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center space-y-6 p-6 text-center transition-all duration-500',
              error ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
          >
            <div className="rounded-full bg-red-100 p-6 dark:bg-red-900/30">
              <AlertCircle className="size-16 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t('error.title')}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{t('error.subtitle')}</p>
              <Button
                className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
                onClick={() => reset()}
              >
                {t('error.try')}
              </Button>
            </div>
          </div>

          {/* Success State */}
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-all duration-500',
              generatedImage && !isProcessing ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
          >
            {generatedImage && !isProcessing && (
              <div className="relative size-full p-4">
                <div className="relative size-full overflow-hidden rounded-lg shadow-md">
                  <ImageSlider
                    ref={imageRef}
                    beforeImage={URL.createObjectURL(form.getValues('image'))}
                    afterImage={generatedImage.url}
                    beforeLabel="Original"
                    afterLabel="Edited"
                    className="size-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
