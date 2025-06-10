import { useCallback, useState } from 'react';

import { ArrowRight, ImageIcon, Sparkles, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type Prediction } from 'replicate';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { usePollingRequest } from '@/hooks/usePollingRequest';
import { downloadImage } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

export function ImageEditTab() {
  const { themeClasses } = useTheme();
  const router = useRouter();
  const t = useScopedI18n('imageEdit');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [prompt, setPrompt] = useState('');

  const { toast } = useToast();

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
        throw new Error(error.message || 'Failed to process image');
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
    successMessage: t('result.completed'),
    errorMessage: t('result.completed'),
    timeoutMessage: t('result.completed'),
  });

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleDownload = useCallback(async () => {
    if (generatedImage) {
      try {
        await downloadImage(generatedImage, selectedImage?.name || 'edited-image.png');
      } catch (error) {
        console.error('下载图片失败:', error);
      }
    }
  }, [generatedImage, selectedImage]);

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
                      alt={t('upload.altText')}
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
                        {t('upload.changeImage')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed ${themeClasses.uploadBorder} rounded-xl p-12 ${themeClasses.uploadBg} transition-all`}
                  >
                    <Upload className="mx-auto mb-3 size-12 text-blue-400" />
                    <p className={`${themeClasses.text} font-medium`}>{t('upload.uploadImage')}</p>
                    <p className={`${themeClasses.textMuted} mt-1 text-sm`}>{t('upload.supportedFormats')}</p>
                  </div>
                )}
              </label>
            </div>
          </CardContent>
        </Card>

        {/* 编辑指令输入 */}
        <div className="space-y-4">
          <Textarea
            placeholder={t('prompt.placeholder')}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className={`resize-none ${themeClasses.textarea} border-0 transition-all duration-300 focus:shadow-[0_8px_30px_rgba(59,130,246,0.15)]`}
          />
          <Button
            onClick={() => {
              if (!selectedImage) {
                toast({
                  title: t('upload.uploadImage'), // Using existing translation
                  variant: 'destructive',
                });
                return;
              }
              reset();
              submitEdit({ image: selectedImage, prompt });
            }}
            disabled={!selectedImage || status === 'loading' || status === 'polling'}
            className={`w-full transition-all duration-300 ${themeClasses.buttonPrimary}`}
            size="lg"
          >
            {status === 'loading' || status === 'polling' ? (
              <>
                <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {status === 'loading' ? t('button.processing') : t('button.processing')}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 size-4" />
                {t('button.startEditing')}
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
                    <ImageIcon className={`mx-auto size-16 ${themeClasses.textMuted}`} />
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
