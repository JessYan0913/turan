import { useCallback } from 'react';

import { ArrowRight, Palette } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
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
    <div className={`flex w-full flex-col ${className}`}>
      <div className="flex flex-1 items-center justify-center p-0">
        {generatedImage ? (
          <div className="w-full max-w-full">
            {/* Image display */}
            <div className="relative w-full">
              <Image
                src={generatedImage}
                alt={t('altText')}
                width={600}
                height={600}
                sizes="(max-width: 768px) 100vw, 600px"
                className="w-full max-w-full rounded-lg object-contain"
                priority
              />
            </div>

            {/* Download button */}
            <div className="mt-4 text-center">
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <ArrowRight className="mr-2 size-4" />
                {t('download')}
              </Button>
            </div>
          </div>
        ) : status === 'loading' || status === 'polling' ? (
          <div className="flex items-center justify-center p-4">
            <div className="size-6 animate-spin rounded-full border-4 border-blue-100 border-t-blue-500"></div>
          </div>
        ) : (
          <div className="p-4 text-gray-400">
            <Palette className="mx-auto size-8" />
          </div>
        )}
      </div>
    </div>
  );
}
