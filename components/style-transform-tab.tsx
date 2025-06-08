import React, { useCallback, useState } from 'react';

import { ArrowRight, Palette, Upload } from 'lucide-react';
import Image from 'next/image';
import useSWR from 'swr';

import { StyleSelector } from '@/components/style-selector';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetcher } from '@/lib/utils';

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  preview: string;
}

export function StyleTransformTab() {
  const { isDarkMode, themeClasses } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');

  const { data: styleOptions } = useSWR<StyleOption[]>('/api/style-options?tab=style', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleProcess = useCallback(async () => {
    if (!selectedImage) return;

    setIsProcessing(true);

    // 模拟处理过程
    setTimeout(() => {
      setResultImage(selectedImage); // 临时使用原图作为结果
      setIsProcessing(false);
    }, 2000);
  }, [selectedImage]);

  const handleDownload = useCallback(() => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'edited-image.png';
      link.click();
    }
  }, [resultImage]);
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Card className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge}`}>
          <CardContent className="p-0">
            {/* 上传区域 */}
            <div className={`${themeClasses.uploadArea} p-8 text-center`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="style-image-upload"
              />
              <label htmlFor="style-image-upload" className="block cursor-pointer">
                {selectedImage ? (
                  <div className="group relative">
                    <Image
                      src={selectedImage || '/placeholder.svg'}
                      alt="上传的图片"
                      width={400}
                      height={300}
                      className="mx-auto max-h-[300px] rounded-lg object-contain shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/0 transition-all group-hover:bg-black/20">
                      <p className="rounded-full bg-black/70 px-4 py-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                        点击更换图片
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed ${themeClasses.uploadBorder} rounded-xl p-12 ${themeClasses.uploadBg} transition-all`}
                  >
                    <Upload className="mx-auto mb-3 size-12 text-blue-400" />
                    <p className={`${themeClasses.text} font-medium`}>点击上传图片</p>
                    <p className={`${themeClasses.textMuted} mt-1 text-sm`}>支持 JPG, PNG, WebP 格式</p>
                  </div>
                )}
              </label>
            </div>
          </CardContent>
        </Card>

        {/* 风格选择器 */}
        <div className="space-y-4">
          <StyleSelector
            options={styleOptions || []}
            value={selectedStyle}
            onSelect={(style) => {
              setSelectedStyle(style.id);
              setPrompt(`将图片转换为${style.name}风格`);
            }}
            placeholder="选择艺术风格"
            isDarkMode={isDarkMode}
          />

          <Button
            onClick={handleProcess}
            disabled={!selectedImage || isProcessing}
            className={`w-full transition-all duration-300 ${themeClasses.buttonPrimary}`}
            size="lg"
          >
            {isProcessing ? (
              <>
                <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                转换中...
              </>
            ) : (
              <>
                <Palette className="mr-2 size-4" />
                开始转换
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 结果展示 */}
      <div>
        <Card className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge} h-full`}>
          <CardContent className="h-full p-0">
            <div className={`${themeClasses.resultArea} flex h-full flex-col p-8 text-center`}>
              <div className="flex flex-1 items-center justify-center">
                {resultImage ? (
                  <div className="space-y-4">
                    <Image
                      src={resultImage || '/placeholder.svg'}
                      alt="处理结果"
                      width={400}
                      height={300}
                      className="mx-auto max-h-[300px] rounded-lg object-contain shadow-lg"
                    />
                    <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      <div className="mr-2 size-2 rounded-full bg-green-500"></div>
                      转换完成
                    </div>
                  </div>
                ) : isProcessing ? (
                  <div className="space-y-4">
                    <div className="mx-auto size-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500"></div>
                    <p className={`${themeClasses.text} font-medium`}>AI正在转换风格...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Palette className={`mx-auto size-16 ${themeClasses.textMuted}`} />
                    <p className={themeClasses.textMuted}>风格转换结果将在这里显示</p>
                  </div>
                )}
              </div>

              {resultImage && (
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className={`mt-4 transition-all duration-300 ${themeClasses.buttonSecondary}`}
                >
                  <ArrowRight className="mr-2 size-4" />
                  下载图片
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
