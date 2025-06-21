'use client';

import { useCallback, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Download, Image as ImageIcon, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ImageSlider } from '@/components/image-slider';
import { ImageUploader } from '@/components/image-uploader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { usePollingRequest } from '@/hooks/use-polling-request';
import { cn, downloadImage } from '@/lib/utils';

// Define the Prediction type
interface Prediction {
  id: string;
  output?: string[];
  status: string;
  error?: string;
}

export function ImageEdit() {
  const router = useRouter();
  const imageRef = useRef<HTMLImageElement>(null);

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
        throw new Error(error.message || 'An error occurred while processing your request');
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
    successMessage: 'Image edited successfully',
    errorMessage: 'Failed to edit image',
    timeoutMessage: 'Request timed out',
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof imageEditSchema>) => {
      try {
        await submitEdit({ image: data.image, prompt: data.prompt });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [submitEdit]
  );

  const handleRegenerate = useCallback(() => {
    const values = form.getValues();
    if (values.image) {
      reset();
      submitEdit({ image: values.image, prompt: values.prompt });
    }
  }, [form, reset, submitEdit]);

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

  return (
    <div className="grid h-full min-h-[calc(100vh-250px)] grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Left Column - Form */}
      <div className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-br from-white to-teal-50/50 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-teal-950/20 dark:ring-white/10"
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange } }) => (
                  <FormItem className="space-y-2">
                    <div className="mb-2 space-y-1">
                      <FormLabel className="font-medium text-teal-700 dark:text-teal-400">Upload Image</FormLabel>
                      <p className="text-muted-foreground text-xs">Drag and drop an image here, or click to select</p>
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
                name="prompt"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="mb-2 space-y-1">
                      <FormLabel className="font-medium text-teal-700 dark:text-teal-400">Edit Instructions</FormLabel>
                      <p className="text-muted-foreground text-xs">
                        Enter a description of the changes you want to make to the image.
                      </p>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the changes you want to make to the image..."
                        disabled={status === 'loading' || status === 'polling'}
                        rows={6}
                        className="min-h-[160px] w-full resize-none rounded-lg border border-gray-200 bg-white/80 p-3 transition-colors hover:border-teal-400 focus:border-teal-400 focus:shadow-[0_8px_30px_rgba(13,148,136,0.15)] dark:border-gray-700 dark:bg-gray-950/50"
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
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 py-5 text-base font-medium text-white shadow-sm transition-all duration-300 hover:from-teal-700 hover:to-emerald-600 hover:shadow-md disabled:from-teal-400 disabled:to-emerald-400"
                disabled={status === 'loading' || status === 'polling'}
              >
                {status === 'loading' || status === 'polling' ? (
                  <>
                    <Loader2 className="mr-2 size-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 size-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Right Column - Result Display */}
      <div className="relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-white to-teal-50/50 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-teal-950/20 dark:ring-white/10">
        {/* Regenerate Button - Always visible, only enabled when there's an image */}
        <Button
          onClick={handleRegenerate}
          disabled={status !== 'success' || !generatedImage}
          className="absolute bottom-6 left-6 z-20 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800/100"
          variant="ghost"
        >
          <RefreshCw className="size-4" />
          Regenerate
        </Button>
        {/* Download Button - Always visible, only enabled when there's an image */}
        <Button
          onClick={handleDownload}
          disabled={status !== 'success' || !generatedImage}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800/100"
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
            <div className="rounded-full bg-teal-50 p-6 dark:bg-teal-900/20">
              <ImageIcon className="size-16 text-teal-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ready to Edit</h3>
              <p className="text-muted-foreground mt-2 max-w-xs text-sm">Your edited image will appear here</p>
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
              <Sparkles className="size-16 text-teal-500" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {status === 'loading' ? 'Editing Your Image' : 'Processing...'}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
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
              <p className="text-muted-foreground mt-2 text-sm">
                We encountered an error while processing your request. Please try again.
              </p>
              <Button
                className="mt-4 bg-gradient-to-r from-teal-600 to-emerald-500 text-white hover:from-teal-700 hover:to-emerald-600"
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
