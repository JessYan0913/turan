import React, { useCallback, useState } from 'react';

import { Upload } from 'lucide-react';
import Image from 'next/image';

import { useTheme } from '@/components/theme-provider';
import { Card, CardContent } from '@/components/ui/card';
import { useScopedI18n } from '@/locales/client';

export interface ImageUploaderProps {
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageName?: string;
  inputId?: string;
  className?: string;
}

export function ImageUploader({
  onImageChange,
  imageName,
  inputId = 'image-upload',
  className = '',
}: ImageUploaderProps) {
  const t = useScopedI18n('imageUploader');
  const { themeClasses } = useTheme();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onImageChange(event);
      }
    },
    [onImageChange]
  );

  return (
    <Card className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge} ${className}`}>
      <CardContent className="p-0">
        <div className={`${themeClasses.uploadArea} p-8 text-center`}>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id={inputId} />
          <label htmlFor={inputId} className="block cursor-pointer">
            {imagePreview ? (
              <div className="group relative">
                <Image
                  src={imagePreview}
                  alt="Uploaded image"
                  width={400}
                  height={300}
                  className="mx-auto max-h-[300px] rounded-lg object-contain"
                />
                <div className="mt-4 text-center">
                  <p className={`${themeClasses.text} text-sm font-medium`}>{imageName || t('altText')}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/0 transition-all group-hover:bg-black/20">
                  <p className="rounded-full bg-black/70 px-4 py-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {t('changeImage')}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed ${themeClasses.uploadBorder} rounded-xl p-12 ${themeClasses.uploadBg} transition-all`}
              >
                <Upload className="mx-auto mb-3 size-12 text-blue-400" />
                <p className={`${themeClasses.text} font-medium`}>{t('uploadImage')}</p>
                <p className={`${themeClasses.textMuted} mt-1 text-sm`}>{t('supportedFormats')}</p>
              </div>
            )}
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
