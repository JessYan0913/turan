'use client';

import { useCallback, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, Copy, LetterText, Loader2, Palette, Pickaxe, RefreshCw, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type Prediction } from 'replicate';
import { z } from 'zod';

import { ImageUploader } from '@/components/image-uploader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { usePollingRequest } from '@/hooks/use-polling-request';
import { cn } from '@/lib/utils';

export function StyleExtract() {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  // Define the form schema using Zod
  const styleTransformSchema = z.object({
    image: z.instanceof(File, { message: 'Please upload an image' }),
  });

  // Initialize react-hook-form with Zod validation
  const form = useForm<z.infer<typeof styleTransformSchema>>({
    resolver: zodResolver(styleTransformSchema),
    defaultValues: {},
  });

  const {
    execute: submitTransform,
    data: extractText,
    status,
    reset: resetPolling,
  } = usePollingRequest<{ image: File }, Prediction>({
    request: async (data) => {
      const formData = new FormData();
      formData.append('image', data.image);

      const response = await fetch('/api/style-extract', {
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

  const onSubmit = useCallback(
    (data: z.infer<typeof styleTransformSchema>) => {
      resetPolling();
      submitTransform({ image: data.image });
    },
    [submitTransform, resetPolling]
  );

  const handleRegenerate = useCallback(() => {
    const values = form.getValues();
    if (values.image) {
      resetPolling();
      submitTransform({
        image: values.image,
      });
    }
  }, [form, submitTransform, resetPolling]);

  const handleCopy = useCallback(() => {
    if (!extractText) return;

    let textToCopy = '';
    if (typeof extractText === 'string') {
      textToCopy = extractText;
    } else {
      textToCopy = JSON.stringify(extractText, null, 2);
    }

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // 显示复制成功状态
        setIsCopied(true);

        // 1.5秒后恢复原始图标
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.error('复制失败:', err);
      });
  }, [extractText]);

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
                      <FormLabel className="font-medium text-blue-700 dark:text-cyan-400">Prompt</FormLabel>
                      <p className="text-muted-foreground text-xs">
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
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-5 text-base font-medium text-white shadow-sm transition-all duration-300 hover:from-blue-700 hover:to-cyan-600 hover:shadow-md disabled:from-blue-400 disabled:to-cyan-400"
                disabled={status === 'loading' || status === 'polling' || !form.formState.isValid}
              >
                {status === 'loading' || status === 'polling' ? (
                  <>
                    <Loader2 className="mr-2 size-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Pickaxe className="mr-2 size-5" />
                    Extract Style
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
          disabled={status !== 'success' || !extractText}
          className="absolute bottom-6 left-6 z-20 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800/100"
          variant="ghost"
        >
          <RefreshCw className="size-4" />
          Regenerate
        </Button>
        {/* Download Button - Always visible, only enabled when there's an image */}
        <Button
          onClick={handleCopy}
          disabled={status !== 'success' || !extractText}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800/100"
          variant="ghost"
        >
          {isCopied ? (
            <>
              <Check className="size-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="size-4" />
              Copy Text
            </>
          )}
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
              <LetterText className="size-16 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ready to Extract</h3>
              <p className="text-muted-foreground mt-2 max-w-xs text-sm">Your extracted style will appear here</p>
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
              status === 'success' && extractText ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
          >
            {status === 'success' && extractText && (
              <div className="relative size-full p-4">
                <div className="relative size-full overflow-auto rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                  <div className="whitespace-pre-wrap rounded-md bg-gray-50 p-4 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                    {typeof extractText === 'string' ? extractText : JSON.stringify(extractText, null, 2)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
