'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Download, Image as ImageIcon, Loader2, Palette, RefreshCw, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type Prediction } from 'replicate';
import { z } from 'zod';

import { ImageSlider } from '@/components/image-slider';
import { ImageUploader } from '@/components/image-uploader';
import { StyleSelector } from '@/components/style-selector';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { usePollingRequest } from '@/hooks/use-polling-request';
import { StyleOption } from '@/lib/actions/options';
import { cn, downloadImage } from '@/lib/utils';

export function StyleTransformTab() {
  const router = useRouter();

  const imageRef = useRef<HTMLImageElement>(null);
  const [styleOptions, setStyleOptions] = useState<StyleOption[]>([]);

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
    reset: resetPolling,
  } = usePollingRequest<{ image: File; prompt: string; style: string }, Prediction>({
    request: async (data) => {
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('prompt', data.prompt || '');
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
    successMessage: 'Style transformation completed successfully',
    errorMessage: 'Failed to transform style',
    timeoutMessage: 'Request timed out',
  });

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

  const onSubmit = useCallback(
    (data: z.infer<typeof styleTransformSchema>) => {
      resetPolling();
      submitTransform({ image: data.image, prompt: data.prompt || '', style: data.style });
    },
    [submitTransform, resetPolling]
  );

  const handleRegenerate = useCallback(() => {
    const values = form.getValues();
    if (values.image) {
      resetPolling();
      submitTransform({
        image: values.image,
        prompt: values.prompt || '',
        style: values.style,
      });
    }
  }, [form, submitTransform, resetPolling]);

  const handleDownload = useCallback(() => {
    if (!imageRef.current || !generatedImage) return;

    let imageUrl = '';
    if (typeof generatedImage === 'string') {
      imageUrl = generatedImage;
    } else if (generatedImage?.output?.[0]) {
      imageUrl = generatedImage.output[0] as string;
    } else {
      return;
    }

    downloadImage(imageUrl, `styled-image-${Date.now()}.png`);
  }, [generatedImage]);

  return (
    <div className="grid h-full min-h-[calc(100vh-250px)] grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Left Column - Form */}
      <div className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-br from-white to-purple-50/50 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-purple-950/20 dark:ring-white/10"
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange } }) => (
                  <FormItem className="space-y-2">
                    <div className="mb-2 space-y-1">
                      <FormLabel className="font-medium text-purple-700 dark:text-purple-400">Prompt</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Describe the style transformation you want to apply
                      </p>
                    </div>
                    <FormControl>
                      <ImageUploader onImageChange={onChange} disabled={status === 'loading' || status === 'polling'} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="mb-2 space-y-1">
                      <FormLabel className="font-medium text-purple-700 dark:text-purple-400">Style</FormLabel>
                      <p className="text-xs text-muted-foreground">Choose a style to apply to your image</p>
                    </div>
                    <FormControl>
                      <StyleSelector
                        options={styleOptions}
                        value={field.value}
                        onSelect={(style) => {
                          field.onChange(style.id);
                          form.setValue('prompt', style.prompt);
                        }}
                        placeholder="Select a style"
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
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-5 text-base font-medium text-white shadow-sm transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 hover:shadow-md disabled:from-purple-400 disabled:to-indigo-400"
                disabled={status === 'loading' || status === 'polling' || !form.formState.isValid}
              >
                {status === 'loading' || status === 'polling' ? (
                  <>
                    <Loader2 className="mr-2 size-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Palette className="mr-2 size-5" />
                    Transform Style
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Right Column - Result Display */}
      <div className="relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-white to-purple-50/50 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-purple-950/20 dark:ring-white/10">
        {/* Regenerate Button - Always visible, only enabled when there's an image */}
        <Button
          onClick={handleRegenerate}
          disabled={status !== 'success' || !generatedImage}
          className="absolute bottom-6 left-6 z-20 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800/100"
          variant="ghost"
        >
          <RefreshCw className="size-4" />
          Regenerate
        </Button>
        {/* Download Button - Always visible, only enabled when there's an image */}
        <Button
          onClick={handleDownload}
          disabled={status !== 'success' || !generatedImage}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800/100"
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
            <div className="rounded-full bg-purple-50 p-6 dark:bg-purple-900/20">
              <Palette className="size-16 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ready to Transform</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">Your transformed image will appear here</p>
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
              <Sparkles className="size-16 text-purple-500" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {status === 'loading' ? 'Transforming Your Image' : 'Processing...'}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {status === 'loading' ? 'Generating your image...' : 'Processing...'}
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
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Something went wrong</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We encountered an error while processing your request. Please try again.
              </p>
              <Button
                className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white hover:from-purple-700 hover:to-indigo-600"
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
                <div className="relative size-full overflow-hidden rounded-lg shadow-md">
                  <ImageSlider
                    ref={imageRef}
                    beforeImage={URL.createObjectURL(form.getValues('image'))}
                    afterImage={generatedImage}
                    beforeLabel="Original"
                    afterLabel="Transformed"
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
