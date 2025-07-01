'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, AlertTriangle, Download, Loader2, Palette, RefreshCw, Sparkles, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

import { AspectRatioSelector } from '@/components/aspect-ratio-selector';
import { ImageUploader } from '@/components/image-uploader';
import { StyleSelector } from '@/components/style-selector';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  preview: string;
  prompt: string;
}

const styles = [
  {
    id: 'office',
    name: '办公室',
    description: '办公室背景',
    preview: 'https://2hav3s1paktcascm.public.blob.vercel-storage.com/office_avatar-yNQWPgDzMMkSiQKXIYwm1UYJ6HIGMP.png',
    prompt: '',
  },
  {
    id: 'white',
    name: '白墙',
    description: '白墙背景',
    preview: 'https://2hav3s1paktcascm.public.blob.vercel-storage.com/white_avatar-JvRwOQfcHHbfZPx59uP8rxSYUkgQ2r.png',
    prompt: '',
  },
  {
    id: 'black',
    name: '黑色',
    description: '黑色背景',
    preview: 'https://2hav3s1paktcascm.public.blob.vercel-storage.com/black_avatar-eYtanXGd6DlkY49rsAeDTUKKo1ODI8.png',
    prompt: '',
  },
  {
    id: 'gray',
    name: '灰色',
    description: '灰色背景',
    preview: 'https://2hav3s1paktcascm.public.blob.vercel-storage.com/gray_avatar-lF72k0HPKpynoHNBPplvVBiDVAUKj1.png',
    prompt: '',
  },
];

export function CreateAvatar() {
  const router = useRouter();
  const t = useScopedI18n('create-avatar.tool');

  // Define the form schema using Zod
  const avatarGenerationSchema = z.object({
    image: z.instanceof(File, { message: t('form.image.message') }),
    background: z.string({ required_error: t('form.background.message') }),
    aspectRatio: z.enum(
      ['1:1', '16:9', '9:16', '4:3', '3:4', '3:2', '2:3', '4:5', '5:4', '21:9', '9:21', '2:1', '1:2'],
      {
        required_error: t('form.aspectRatio.message'),
      }
    ),
  });

  // Initialize react-hook-form with Zod validation
  const form = useForm<z.infer<typeof avatarGenerationSchema>>({
    resolver: zodResolver(avatarGenerationSchema),
    defaultValues: {
      background: '',
      aspectRatio: '1:1',
    },
  });

  const {
    trigger: createAvatar,
    isMutating: isProcessing,
    error,
    reset,
    data: generatedImage,
  } = useSWRMutation('/api/create-avatar', async (url, { arg }: { arg: FormData }) => {
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
      throw new Error(error.message || 'Failed to generate avatar');
    }

    return response.json();
  });

  const submit = form.handleSubmit(async (data: z.infer<typeof avatarGenerationSchema>) => {
    try {
      reset();
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('background', data.background);
      formData.append('aspectRatio', data.aspectRatio);

      await createAvatar(formData);
    } catch (err) {
      console.error('Failed to generate avatar:', err);
    }
  });

  return (
    <div className="grid h-full min-h-[calc(100vh-320px)] grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Left Column - Form */}
      <div className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={submit}
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
                    </div>
                    <FormControl>
                      <ImageUploader onImageChange={onChange} disabled={isProcessing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="background"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="mb-2 space-y-1">
                      <FormLabel className="font-medium text-blue-700 dark:text-cyan-400">
                        {t('form.background.label')}
                      </FormLabel>
                      <p className="text-muted-foreground text-xs">{t('form.background.description')}</p>
                    </div>
                    <FormControl>
                      <StyleSelector
                        options={styles || []}
                        value={field.value}
                        onSelect={(background) => {
                          field.onChange(background.id);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aspectRatio"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="mb-2 space-y-1">
                      <FormLabel className="font-medium text-blue-700 dark:text-cyan-400">
                        {t('form.aspectRatio.label')}
                      </FormLabel>
                      <p className="text-muted-foreground text-xs">{t('form.aspectRatio.description')}</p>
                    </div>
                    <FormControl>
                      <AspectRatioSelector disabled={isProcessing} onValueChange={field.onChange} value={field.value} />
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
                    <Palette className="mr-2 size-5" />
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
            onClick={() => {
              submit();
            }}
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
              <User className="size-16 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t('idle.title')}</h3>
              <p className="text-muted-foreground mt-2 max-w-xs text-sm">{t('idle.subtitle')}</p>
            </div>
          </div>

          {/* Loading/Processing State */}
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
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Generating Avatar</h3>
              <p className="text-muted-foreground mt-2 text-sm">Creating your AI avatar. This may take a moment...</p>
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
                onClick={submit}
              >
                Try Again
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
                  <Image
                    src={generatedImage.url}
                    alt="Generated avatar"
                    fill
                    className="object-contain transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    unoptimized={!generatedImage.url.startsWith('/')}
                  />
                </div>
                {!generatedImage.url && (
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="rounded-full bg-yellow-100 p-6 dark:bg-yellow-900/30">
                      <AlertTriangle className="size-16 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Missing Image Data</h3>
                      <p className="text-muted-foreground mt-2 text-sm">
                        The avatar couldn&apos;t be displayed properly.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
