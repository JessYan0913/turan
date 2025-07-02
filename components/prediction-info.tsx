'use client';

import { format } from 'date-fns';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { Prediction } from '@/lib/db/schema';
import { cn } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

type ErrorWithMessage = {
  message: string;
  [key: string]: unknown;
};

type Metrics = {
  [key: string]: string | number | boolean | null | undefined;
};

interface PredictionInfoProps {
  prediction: Prediction | null;
}

export function PredictionInfo({ prediction }: PredictionInfoProps) {
  const t = useScopedI18n('prediction');

  if (!prediction) return null;

  const renderOutput = () => {
    if (!prediction.output) return null;

    try {
      const output = prediction.output as unknown;

      if (Array.isArray(output)) {
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {output.map((url: unknown, index: number) => (
              <div key={index} className="bg-card relative aspect-square overflow-hidden rounded-md border">
                <Image src={url as string} alt={`Output ${index + 1}`} fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        );
      }

      if (typeof output === 'string') {
        return (
          <div className="bg-card relative aspect-square w-full overflow-hidden rounded-md border">
            <Image src={output} alt="Output" fill className="object-cover" unoptimized />
          </div>
        );
      }

      return (
        <pre className="bg-card whitespace-pre-wrap break-words rounded-md border p-4 text-sm">
          {JSON.stringify(output, null, 2)}
        </pre>
      );
    } catch (error) {
      console.error('Error rendering output:', error);
      return (
        <pre className="whitespace-pre-wrap break-words rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
          Error displaying output: {error instanceof Error ? error.message : String(error)}
        </pre>
      );
    }
  };

  const renderStatusBadge = () => {
    const statusMap: Record<string, string> = {
      starting: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      succeeded: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      canceled: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    };

    const status = prediction.status as keyof typeof statusMap;
    const statusText = status in statusMap ? status : prediction.status;
    const badgeClass = statusMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';

    return <Badge className={cn('transition-colors', badgeClass)}>{statusText}</Badge>;
  };

  const renderError = () => {
    if (!prediction.error) return null;

    let errorMessage = 'Unknown error';
    try {
      const error = prediction.error as unknown;
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        const errorWithMessage = error as ErrorWithMessage;
        errorMessage = errorWithMessage.message || JSON.stringify(error, null, 2);
      } else {
        errorMessage = JSON.stringify(error, null, 2);
      }
    } catch (e) {
      console.error('Error formatting error message:', e);
    }

    return (
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error</h3>
        <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/10">
          <pre className="whitespace-pre-wrap break-words text-sm text-red-700 dark:text-red-400">{errorMessage}</pre>
        </div>
      </div>
    );
  };

  const renderInput = (): React.ReactNode => {
    if (!prediction.input) return null;

    try {
      const input = prediction.input as unknown;

      // 处理输入是对象且包含图片URL的情况
      if (typeof input === 'object' && input !== null) {
        // 检查对象中是否有图片URL字段
        const imageFields = Object.entries(input).filter(
          ([key, value]) =>
            typeof value === 'string' &&
            (value.startsWith('http') || value.startsWith('/')) &&
            (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value as string) || /^data:image\//i.test(value as string))
        );

        if (imageFields.length > 0) {
          return (
            <div className="space-y-4">
              {/* 显示包含图片的字段 */}
              {imageFields.map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <p className="text-sm font-medium">{key}:</p>
                  <div className="bg-card relative aspect-square w-full max-w-md overflow-hidden rounded-md border">
                    <Image src={value as string} alt={`Input ${key}`} fill className="object-contain" unoptimized />
                  </div>
                </div>
              ))}

              {/* 显示其他非图片字段 */}
              {Object.entries(input).filter(([key]) => !imageFields.some(([imgKey]) => imgKey === key)).length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Other parameters:</p>
                  <pre className="bg-card whitespace-pre-wrap break-words rounded-md border p-4 text-sm">
                    {JSON.stringify(
                      Object.fromEntries(
                        Object.entries(input).filter(([key]) => !imageFields.some(([imgKey]) => imgKey === key))
                      ),
                      null,
                      2
                    )}
                  </pre>
                </div>
              )}
            </div>
          );
        }
      }

      // 处理输入是字符串且是图片URL的情况
      if (
        typeof input === 'string' &&
        (input.startsWith('http') || input.startsWith('/')) &&
        (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(input) || /^data:image\//i.test(input))
      ) {
        return (
          <div className="bg-card relative aspect-square w-full max-w-md overflow-hidden rounded-md border">
            <Image src={input} alt="Input" fill className="object-contain" unoptimized />
          </div>
        );
      }

      // 默认情况：显示JSON
      return (
        <pre className="bg-card whitespace-pre-wrap break-words rounded-md border p-4 text-sm">
          {JSON.stringify(input, null, 2)}
        </pre>
      );
    } catch (error) {
      console.error('Error rendering input:', error);
      return (
        <pre className="whitespace-pre-wrap break-words rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
          Error displaying input: {error instanceof Error ? error.message : String(error)}
        </pre>
      );
    }
  };

  const renderMetrics = () => {
    if (!prediction.metrics) return null;

    try {
      const metrics = prediction.metrics as unknown as Metrics;
      return (
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Metrics</h3>
          <div className="bg-card rounded-md border p-4">
            <pre className="whitespace-pre-wrap break-words text-sm">{JSON.stringify(metrics, null, 2)}</pre>
          </div>
        </div>
      );
    } catch (e) {
      console.error('Error rendering metrics:', e);
      return null;
    }
  };

  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {t('prediction.details')}
            {renderStatusBadge()}
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            {t('prediction.id')}: {prediction.id}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] pr-4">
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">{t('prediction.basicInfo')}</h3>
              <div className="bg-card grid gap-4 rounded-lg border p-4 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">{t('prediction.tool')}</p>
                    <p className="font-medium">{prediction.tool}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">{t('prediction.version')}</p>
                    <p className="font-medium">{prediction.version}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">{t('prediction.createdAt')}</p>
                    <p className="font-medium">
                      {prediction.createdAt ? format(new Date(prediction.createdAt), 'yyyy-MM-dd HH:mm') : 'N/A'}
                    </p>
                  </div>
                  {prediction.completedAt && (
                    <div>
                      <p className="text-muted-foreground text-sm">{t('prediction.completedAt')}</p>
                      <p className="font-medium">{format(new Date(prediction.completedAt), 'yyyy-MM-dd HH:mm')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!!prediction.input && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{t('prediction.input')}</h3>
                <div className="bg-card rounded-md border p-4">{renderInput()}</div>
              </div>
            )}

            {!!prediction.output && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{t('prediction.output')}</h3>
                <div className="bg-card rounded-md border p-4">{renderOutput()}</div>
              </div>
            )}

            {/* Error and Metrics */}
            {renderError()}
            {renderMetrics()}
          </div>
        </ScrollArea>

        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
