'use client';

import { useCallback, useState } from 'react';

import { ArrowRight, Sparkles, Wand2 } from 'lucide-react';
import Image from 'next/image';
import { type Prediction } from 'replicate';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { usePollingRequest } from '@/hooks/usePollingRequest';
import { downloadImage } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

export function ImageGenerationTab() {
  const { themeClasses } = useTheme();
  const t = useScopedI18n('imageGeneration');
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');

  const {
    execute: generateImage,
    data: generatedImage,
    status,
  } = usePollingRequest<{ prompt: string }, Prediction>({
    // 发起生成图片的请求
    request: async (data) => {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || t('errors.generateFailed'));
      }
      return response.json();
    },
    // 检查生成状态
    checkStatus: async (id) => {
      const response = await fetch(`/api/prediction/${id}`);
      if (!response.ok) {
        throw new Error(t('errors.statusCheckFailed'));
      }
      return response.json();
    },
    // 判断是否完成
    isComplete: (data: Prediction) => data.status === 'succeeded' || data.status === 'failed',
    // 提取结果
    getResult: (data: Prediction) => (data.status === 'succeeded' ? data.output[0] : null),

    // 自定义消息
    successMessage: t('success'),
    errorMessage: t('errors.generateFailed'),
    timeoutMessage: t('errors.timeout'),
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!prompt) {
        toast({
          title: t('errors.emptyPrompt.title'),
          description: t('errors.emptyPrompt.description'),
          variant: 'destructive',
        });
        return;
      }

      generateImage({ prompt });
    },
    [generateImage, prompt, toast, t]
  );

  const handleDownload = useCallback(async () => {
    if (generatedImage) {
      try {
        await downloadImage(generatedImage, 'generated-image.png');
      } catch (error) {
        console.error('下载图片失败:', error);
        toast({
          title: t('errors.downloadFailed.title'),
          description: t('errors.downloadFailed.description'),
          variant: 'destructive',
        });
      }
    }
  }, [generatedImage, toast, t]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Card className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge}`}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">{t('promptLabel')}</Label>
                <Textarea
                  id="prompt"
                  placeholder={t('promptPlaceholder')}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={status === 'loading' || status === 'polling'}
                  rows={4}
                  className={`resize-none ${themeClasses.textarea} border-0 transition-all duration-300 focus:shadow-[0_8px_30px_rgba(59,130,246,0.15)]`}
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!prompt || status === 'loading' || status === 'polling'}
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
                    <Wand2 className="mr-2 size-4" />
                    {t('button.generate')}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 结果展示 */}
      <div>
        <Card className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge} h-full`}>
          <CardContent className="h-full p-0">
            <div className={`${themeClasses.resultArea} flex h-full flex-col p-8 text-center`}>
              <div className="flex flex-1 items-center justify-center">
                {generatedImage ? (
                  <div className="space-y-4">
                    <Image
                      src={generatedImage}
                      alt={t('result.altText')}
                      width={400}
                      height={300}
                      className="mx-auto max-h-[300px] rounded-lg object-contain shadow-lg"
                    />
                    <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      <div className="mr-2 size-2 rounded-full bg-green-500"></div>
                      {t('result.completed')}
                    </div>
                  </div>
                ) : status === 'loading' || status === 'polling' ? (
                  <div className="space-y-4">
                    <div className="mx-auto size-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500"></div>
                    <p className={`${themeClasses.text} font-medium`}>{t('result.processing')}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Sparkles className={`mx-auto size-16 ${themeClasses.textMuted}`} />
                    <p className={themeClasses.textMuted}>{t('result.defaultMessage')}</p>
                  </div>
                )}
              </div>

              {generatedImage && (
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className={`mt-4 transition-all duration-300 ${themeClasses.buttonSecondary}`}
                >
                  <ArrowRight className="mr-2 size-4" />
                  {t('button.download')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
