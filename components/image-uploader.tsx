import React, { useCallback, useState } from 'react';

import { Upload } from 'lucide-react';
import Image from 'next/image';

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
    <div className={`overflow-hidden rounded-xl transition-all duration-300 ${className}`}>
      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id={inputId} />
      <label htmlFor={inputId} className="block cursor-pointer">
        {imagePreview ? (
          <div className="group relative overflow-hidden rounded-xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imagePreview}
                alt="Uploaded image"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="rounded-xl object-cover"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-transparent transition-all duration-300 group-hover:bg-black/20 group-hover:backdrop-blur-sm">
                <p className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:opacity-100">
                  {t('changeImage')}
                </p>
              </div>
            </div>
            <div className="mt-1 text-center">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{imageName || t('altText')}</p>
            </div>
          </div>
        ) : (
          <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-4 transition-all duration-300 hover:border-blue-300 hover:shadow-md dark:border-blue-800 dark:from-blue-950/10 dark:to-purple-950/10 dark:hover:border-blue-700">
            <div className="mb-2 rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
              <Upload className="size-6 text-blue-500" />
            </div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-400">{t('uploadImage')}</p>
            <p className="mt-1 text-xs text-blue-500/80 dark:text-blue-500/60">{t('supportedFormats')}</p>
          </div>
        )}
      </label>
    </div>
  );
}
