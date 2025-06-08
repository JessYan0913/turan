import React, { useCallback, useState } from 'react';

import { ArrowRight, Upload, User } from 'lucide-react';
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

export function AvatarGenerationTab() {
  const { isDarkMode, themeClasses } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedAvatarStyle, setSelectedAvatarStyle] = useState('');

  const { data: avatarStyleOptions } = useSWR<StyleOption[]>('/api/style-options?tab=avatar', fetcher, {
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
                id="avatar-image-upload"
              />
              <label htmlFor="avatar-image-upload" className="block cursor-pointer">
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
                    <p className={`${themeClasses.text} font-medium`}>点击上传照片</p>
                    <p className={`${themeClasses.textMuted} mt-1 text-sm`}>支持 JPG, PNG, WebP 格式</p>
                  </div>
                )}
              </label>
            </div>
          </CardContent>
        </Card>

        {/* 头像风格选择器 */}
        <div className="space-y-4">
          <StyleSelector
            options={avatarStyleOptions || []}
            value={selectedAvatarStyle}
            onSelect={(style) => {
              setSelectedAvatarStyle(style.id);
              setPrompt(`生成${style.name}的专业头像`);
            }}
            placeholder="选择头像风格"
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
                生成中...
              </>
            ) : (
              <>
                <User className="mr-2 size-4" />
                生成头像
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
                      生成完成
                    </div>
                  </div>
                ) : isProcessing ? (
                  <div className="space-y-4">
                    <div className="mx-auto size-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500"></div>
                    <p className={`${themeClasses.text} font-medium`}>AI正在生成您的专业头像...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <User className={`mx-auto size-16 ${themeClasses.textMuted}`} />
                    <p className={themeClasses.textMuted}>头像将在这里显示</p>
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
                  下载头像
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
