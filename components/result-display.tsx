import { useCallback } from 'react';

import { ArrowRight, Palette } from 'lucide-react';
import Image from 'next/image';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { downloadImage } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

export type ProcessStatus = 'idle' | 'loading' | 'polling' | 'success' | 'error';

export interface ResultDisplayProps {
  generatedImage: string | null;
  status: ProcessStatus;
  imageName?: string;
  className?: string;
}

export function ResultDisplay({
  generatedImage,
  status,
  imageName = 'styled-image.png',
  className = '',
}: ResultDisplayProps) {
  const { themeClasses } = useTheme();
  const t = useScopedI18n('resultDisplay');

  const handleDownload = useCallback(async () => {
    if (generatedImage) {
      try {
        await downloadImage(generatedImage, imageName);
      } catch (error) {
        console.error('下载图片失败:', error);
      }
    }
  }, [generatedImage, imageName]);
  return (
    <Card
      className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge} h-full ${className}`}
    >
      <CardContent className="h-full p-0">
        <div className={`${themeClasses.resultArea} flex h-full flex-col p-8 text-center`}>
          <div className="flex flex-1 items-center justify-center">
            {generatedImage ? (
              <div className="space-y-4">
                <Image
                  src={generatedImage}
                  alt={t('altText')}
                  width={400}
                  height={300}
                  className="mx-auto max-h-[300px] rounded-lg object-contain shadow-lg"
                />
                <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  <div className="mr-2 size-2 rounded-full bg-green-500"></div>
                  {t('completed')}
                </div>
              </div>
            ) : status === 'loading' || status === 'polling' ? (
              <div className="space-y-4">
                <div className="mx-auto size-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500"></div>
                <p className={`${themeClasses.text} font-medium`}>{t('processing')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Palette className={`mx-auto size-16 ${themeClasses.textMuted}`} />
                <p className={themeClasses.textMuted}>{t('defaultMessage')}</p>
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
              {t('download')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
