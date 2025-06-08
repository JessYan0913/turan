import React, { useCallback, useState } from 'react';

import { ArrowRight, ImageIcon, Sparkles, Upload } from 'lucide-react';
import Image from 'next/image';
import { Prediction } from 'replicate';
import useSWRMutation from 'swr/mutation';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export function ImageEditTab() {
  const { themeClasses } = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');

  const { trigger: submitEdit, data: prediction } = useSWRMutation<
    Prediction,
    any,
    any,
    { image: File; prompt: string }
  >('/api/image-edit', async (url: string, { arg }: { arg: { image: File; prompt: string } }) => {
    const formData = new FormData();
    formData.append('image', arg.image);
    formData.append('prompt', arg.prompt);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to process image');
    }

    return await response.json();
  });

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResultImage(null);
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = selectedImage?.name || 'edited-image.png';
      link.click();
    }
  }, [resultImage, selectedImage]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Card className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge}`}>
          <CardContent className="p-0">
            {/* 上传区域 */}
            <div className={`${themeClasses.uploadArea} p-8 text-center`}>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="block cursor-pointer">
                {selectedImage ? (
                  <div className="group relative">
                    <Image
                      src={imagePreview || '/placeholder.svg'}
                      alt="上传的图片"
                      width={400}
                      height={300}
                      className="mx-auto max-h-[300px] rounded-lg object-contain shadow-lg"
                      onLoad={() => {
                        if (imagePreview) {
                          URL.revokeObjectURL(imagePreview);
                        }
                      }}
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

        {/* 编辑指令输入 */}
        <div className="space-y-4">
          <Textarea
            placeholder="描述您想要的编辑效果，例如：'将背景换成蓝天白云'、'修改发型为短发'..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className={`resize-none ${themeClasses.textarea} border-0 transition-all duration-300 focus:shadow-[0_8px_30px_rgba(59,130,246,0.15)]`}
          />
          <Button
            onClick={() => submitEdit({ image: selectedImage!, prompt })}
            disabled={!selectedImage || prediction?.status === 'processing'}
            className={`w-full transition-all duration-300 ${themeClasses.buttonPrimary}`}
            size="lg"
          >
            {prediction?.status === 'processing' ? (
              <>
                <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                处理中...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 size-4" />
                开始编辑
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
                      处理完成
                    </div>
                  </div>
                ) : prediction?.status === 'processing' ? (
                  <div className="space-y-4">
                    <div className="mx-auto size-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500"></div>
                    <p className={`${themeClasses.text} font-medium`}>AI正在处理您的图片...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ImageIcon className={`mx-auto size-16 ${themeClasses.textMuted}`} />
                    <p className={themeClasses.textMuted}>编辑结果将在这里显示</p>
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
