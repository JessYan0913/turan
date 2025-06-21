import { useCallback, useEffect, useState } from 'react';

import { Upload } from 'lucide-react';
import Image from 'next/image';

export interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  inputId?: string;
  disabled?: boolean;
  status?: 'idle' | 'loading' | 'error' | 'success';
  className?: string;
}

export function ImageUploader({
  onImageChange,
  inputId = 'image-upload',
  className = '',
  disabled = false,
  status = 'idle',
}: ImageUploaderProps) {
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const isDisabled = disabled || status === 'loading';
  const showPreview = Boolean(localPreview);

  // Create preview URL when local image changes
  useEffect(() => {
    if (localFile) {
      const objectUrl = URL.createObjectURL(localFile);
      setLocalPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setLocalPreview(null);
    }
  }, [localFile]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled || status === 'loading') return;

      const file = e.dataTransfer.files?.[0];
      if (!file || !file.type.startsWith('image/')) return;
      setLocalFile(file);
      onImageChange(file);
    },
    [disabled, status, onImageChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        setLocalFile(file);
        onImageChange(file);
      }
    },
    [onImageChange]
  );

  return (
    <div className={className}>
      <div
        className={`group flex h-32 w-full overflow-hidden rounded-md border border-input ${
          isDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !isDisabled && document.getElementById(inputId)?.click()}
      >
        {/* Left Side - Square Preview */}
        <div className="relative h-full w-32 shrink-0 border-r border-border/20">
          {showPreview ? (
            <div className="relative size-full">
              <Image
                src={localPreview || ''}
                alt={localFile?.name || 'Preview'}
                fill
                sizes="128px"
                className="object-cover transition-opacity group-hover:opacity-90"
                onLoad={() => {
                  if (localPreview) {
                    URL.revokeObjectURL(localPreview);
                  }
                }}
              />
              {!isDisabled && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex flex-col items-center gap-1 text-white">
                    <Upload className="size-3.5" />
                    <span className="text-[11px] font-medium">Change</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex size-full flex-col items-center justify-center">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted/50">
                <Upload className="size-4 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Info/Actions */}
        <div className="flex flex-1 flex-col justify-center p-4">
          {showPreview ? (
            <div className="space-y-1.5">
              <h4 className="text-sm font-medium">{localFile ? 'Selected Image' : 'Preview'}</h4>
              <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 break-all text-xs font-medium text-muted-foreground">
                    {localFile?.name || 'No file selected'}
                  </p>
                  <p className="text-[11px] text-muted-foreground/80">
                    {localFile ? `${(localFile.size / 1024).toFixed(1)} KB` : ''}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-[11px] font-medium text-green-600 dark:text-green-400">
                  {localFile ? 'Ready to edit' : 'Upload an image'}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground/80">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          disabled={isDisabled}
        />

        {/* Loading State */}
        {status === 'loading' && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/80">
            <div className="flex flex-col items-center gap-2">
              <div className="size-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
              <span className="text-sm text-muted-foreground">Uploading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
