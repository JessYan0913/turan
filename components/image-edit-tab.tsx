'use client';

import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Download, Image as ImageIcon, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { usePollingRequest } from '@/hooks/use-polling-request';
import { cn } from '@/lib/utils';

import { ImageSlider } from './image-slider';
import { ImageUploader } from './image-uploader';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Textarea } from './ui/textarea';

// Define the Prediction type
interface Prediction {
  id: string;
  output?: string[];
  status: string;
  error?: string;
}

export function ImageEditTab() {
  const router = useRouter();

  // Define the form schema using Zod
  const imageEditSchema = z.object({
    image: z.instanceof(File, { message: 'Please upload an image' }),
    prompt: z.string().min(1, { message: 'Please enter a prompt' }),
  });

  // Text constants
  const text = {
    uploadLabel: 'Upload Image',
    uploadDescription: 'Drag and drop an image here, or click to select',
    uploadPlaceholder: 'Click to upload or drag and drop',
    promptLabel: 'Edit Instructions',
    promptDescription: 'Enter a description of the changes you want to make to the image.',
    promptPlaceholder: 'Describe the changes you want to make to the image...',
    generate: 'Generate',
    generating: 'Generating your image...',
    resultPlaceholder: 'Your edited image will appear here',
    errorTitle: 'Something went wrong',
    errorDescription: 'We encountered an error while processing your request. Please try again.',
    retry: 'Try Again',
    download: 'Download',
    result: {
      title: 'Result',
      description: 'Your edited image will appear here',
    },
    processing: 'Processing...',
  };

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
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = form.getValues('image')?.name || 'edited-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [generatedImage, form]);

  return (
    <div className="grid h-full min-h-[calc(100vh-250px)] grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Left Column - Form */}
      <div className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-white to-teal-50/50 p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 dark:from-gray-900 dark:to-teal-950/20 dark:ring-white/10"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <div>
                  <FormLabel className="font-medium text-teal-700 dark:text-teal-400">{text.uploadLabel}</FormLabel>
                  <p className="text-muted-foreground text-xs">{text.uploadDescription}</p>
                </div>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUploader
                          onImageChange={onChange}
                          disabled={status === 'loading' || status === 'polling'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2 space-y-1">
                    <FormLabel className="font-medium text-teal-700 dark:text-teal-400">{text.promptLabel}</FormLabel>
                    <p className="text-muted-foreground text-xs">{text.promptDescription}</p>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder={text.promptPlaceholder}
                      disabled={status === 'loading' || status === 'polling'}
                      rows={8}
                      className="min-h-[200px] w-full resize-none rounded-lg border border-gray-200 bg-white/80 p-4 transition-colors hover:border-teal-400 focus:border-teal-400 focus:shadow-[0_8px_30px_rgba(13,148,136,0.15)] dark:border-gray-700 dark:bg-gray-950/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-8">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 py-6 text-base font-medium text-white shadow-sm transition-all duration-300 hover:from-teal-700 hover:to-emerald-600 hover:shadow-md disabled:from-teal-400 disabled:to-emerald-400"
                disabled={status === 'loading' || status === 'polling'}
              >
                {status === 'loading' || status === 'polling' ? (
                  <>
                    <Loader2 className="mr-2 size-5 animate-spin" />
                    {text.processing}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 size-5" />
                    {text.generate}
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
              <p className="text-muted-foreground mt-2 max-w-xs text-sm">{text.resultPlaceholder}</p>
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
                {status === 'loading' ? text.generating : text.processing}
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
              <svg
                className="size-16 text-red-500 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{text.errorTitle}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{text.errorDescription}</p>
              <Button
                className="mt-4 bg-gradient-to-r from-teal-600 to-emerald-500 text-white hover:from-teal-700 hover:to-emerald-600"
                onClick={handleRegenerate}
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
