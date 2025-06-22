'use client';

import { useCallback, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, AlertTriangle, Download, ImageIcon, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type Prediction } from 'replicate';
import { z } from 'zod';

import { AspectRatioSelector } from '@/components/aspect-ratio-selector';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { usePollingRequest } from '@/hooks/use-polling-request';
import { cn, downloadImage } from '@/lib/utils';

export function TextToImage() {
  const router = useRouter();
  const imageRef = useRef<HTMLImageElement>(null);

  // Define the form schema using Zod
  const imageGenerationSchema = z.object({
    prompt: z.string().min(1, { message: 'Please enter a prompt' }),
    aspectRatio: z.string({
      required_error: 'Please select an aspect ratio',
    }),
  });

  // Initialize react-hook-form with Zod validation
  const form = useForm<z.infer<typeof imageGenerationSchema>>({
    resolver: zodResolver(imageGenerationSchema),
    defaultValues: {
      prompt: '',
      aspectRatio: '1:1',
    },
  });

  const {
    execute: generateImage,
    data: generatedImage,
    status,
    reset,
  } = usePollingRequest<{ prompt: string; aspectRatio: string }, Prediction>({
    // 发起生成图片的请求
    request: async (data) => {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: data.prompt,
          size: data.aspectRatio, // 后端API仍然使用size参数名
        }),
      });

      if (response.status === 401) {
        router.push('/login');
        return;
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to generate image');
      }
      const result = await response.json();
      return result;
    },
    // 检查生成状态
    checkStatus: async (id) => {
      const response = await fetch(`/api/prediction/${id}`);
      if (!response.ok) {
        throw new Error('Failed to check generation status');
      }
      return response.json();
    },
    // 判断是否完成
    isComplete: (data: Prediction) => data.status === 'succeeded' || data.status === 'failed',
    // 提取结果
    getResult: (data: Prediction) => (data.status === 'succeeded' ? data.output[0] : null),

    // Custom messages
    successMessage: 'Image generated successfully',
    errorMessage: 'Failed to generate image',
    timeoutMessage: 'Generation timed out, please try again',
  });

  const handleDownload = useCallback(() => {
    if (!imageRef.current || !generatedImage) return;

    // 确定图片URL
    let imageUrl = '';
    if (typeof generatedImage === 'string') {
      imageUrl = generatedImage;
    } else if (generatedImage?.output?.[0]) {
      imageUrl = generatedImage.output[0] as string;
    } else {
      return; // 没有有效的图片URL
    }

    downloadImage(imageUrl, `generated-image-${Date.now()}.png`);
  }, [generatedImage]);

  const handleSubmit = form.handleSubmit((data: z.infer<typeof imageGenerationSchema>) => {
    reset();
    generateImage({ prompt: data.prompt, aspectRatio: data.aspectRatio });
  });

  const handleRegenerate = () => {
    reset();
    const { prompt, aspectRatio } = form.getValues();
    generateImage({ prompt, aspectRatio });
  };

  return (
    <div className="grid h-full min-h-[calc(100vh-320px)] grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Left Column - Form */}
      <div className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-white to-blue-50/50 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-blue-950/20 dark:ring-white/10"
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-2 space-y-1">
                      <FormLabel className="font-medium text-blue-700 dark:text-blue-400">Prompt</FormLabel>
                      <p className="text-muted-foreground text-xs">Describe the image you want to generate in detail</p>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="A stunning landscape with mountains and a lake at sunset, realistic, 4k, detailed"
                        disabled={status === 'loading' || status === 'polling'}
                        rows={8}
                        className="min-h-[200px] resize-none border border-gray-200 bg-white/80 transition-all duration-300 focus:border-blue-400 focus:shadow-[0_8px_30px_rgba(14,165,233,0.15)] dark:border-gray-700 dark:bg-gray-950/50"
                        {...field}
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
                      <FormLabel className="font-medium text-blue-700 dark:text-blue-400">Aspect Ratio</FormLabel>
                      <p className="text-muted-foreground text-xs">Select the aspect ratio for your generated image</p>
                    </div>
                    <FormControl>
                      <AspectRatioSelector
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={status === 'loading' || status === 'polling'}
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
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-6 text-base font-medium text-white shadow-sm transition-all duration-300 hover:from-blue-700 hover:to-cyan-600 hover:shadow-md disabled:from-blue-400 disabled:to-cyan-400"
                disabled={status === 'loading' || status === 'polling' || !form.formState.isValid}
              >
                {status === 'loading' || status === 'polling' ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 size-4" />
                    Generate Image
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
        <Button
          onClick={handleRegenerate}
          disabled={status !== 'success' || !generatedImage}
          className="absolute bottom-6 left-6 z-20 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800/100"
          variant="ghost"
        >
          <RefreshCw className="size-4" />
          Regenerate
        </Button>
        {/* Download Button - Always visible, only enabled when there's an image */}
        <Button
          onClick={handleDownload}
          disabled={status !== 'success' || !generatedImage}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800/100"
          variant="ghost"
        >
          <Download className="size-4" />
          Download
        </Button>

        {/* Result Content */}
        <div className="relative flex flex-1 flex-col items-center justify-center p-6">
          {/* Idle State */}
          <div
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center space-y-4 p-6 text-center transition-all duration-500',
              status === 'idle' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
          >
            <div className="rounded-full bg-blue-50 p-6 dark:bg-blue-900/20">
              <ImageIcon className="size-16 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ready to Generate</h3>
              <p className="text-muted-foreground mt-2 max-w-xs text-sm">
                Enter a prompt and click generate to create your image
              </p>
            </div>
          </div>

          {/* Loading/Polling State */}
          <div
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center space-y-6 p-6 transition-all duration-500',
              status === 'loading' || status === 'polling' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
          >
            <div className="scale-100 animate-[pulse_1s_ease-in-out_infinite] transition-all hover:scale-110">
              <Sparkles className="size-16 text-blue-500" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {status === 'loading' ? 'Creating Your Image' : 'Almost Ready'}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {status === 'loading' ? 'Generating your masterpiece...' : 'Processing final details...'}
              </p>
            </div>
          </div>

          {/* Error State */}
          <div
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center space-y-6 p-6 text-center transition-all duration-500',
              status === 'error' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
          >
            <div className="rounded-full bg-red-100 p-6 dark:bg-red-900/30">
              <AlertCircle className="size-16 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Something Went Wrong</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                We couldn&apos;t generate your image. Please try again with a different prompt.
              </p>
              <Button
                className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
                onClick={() => form.reset()}
              >
                Try Again
              </Button>
            </div>
          </div>

          {/* Success State */}
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-all duration-500',
              status === 'success' && generatedImage ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
          >
            {status === 'success' && generatedImage && (
              <div className="relative size-full p-4">
                {typeof generatedImage === 'string' ? (
                  <div className="relative size-full overflow-hidden rounded-lg shadow-md">
                    <Image
                      ref={imageRef}
                      src={generatedImage}
                      alt="Generated image"
                      fill
                      className="object-contain transition-opacity duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                      unoptimized={!generatedImage.startsWith('/')}
                      onLoadingComplete={(img) => {
                        imageRef.current = img;
                      }}
                    />
                  </div>
                ) : generatedImage?.output?.[0] ? (
                  <div className="relative size-full overflow-hidden rounded-lg shadow-md">
                    <Image
                      ref={imageRef}
                      src={generatedImage.output[0] as string}
                      alt="Generated image"
                      fill
                      className="object-contain transition-opacity duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                      unoptimized={!generatedImage.output[0].startsWith('/')}
                      onLoadingComplete={(img) => {
                        imageRef.current = img;
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="rounded-full bg-yellow-100 p-6 dark:bg-yellow-900/30">
                      <AlertTriangle className="size-16 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Missing Image Data</h3>
                      <p className="text-muted-foreground mt-2 text-sm">
                        The image couldn&apos;t be displayed properly.
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
