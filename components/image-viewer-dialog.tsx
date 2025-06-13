'use client';

import { useState } from 'react';

import { Check, Download, Share2 } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

import { ImageSlider } from '@/components/image-slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { type Work } from '@/lib/db/schema';
import { downloadImage } from '@/lib/utils';

interface ImageViewerDialogProps {
  work: Work;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageViewerDialog({ work, open, onOpenChange }: ImageViewerDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (work.processedImage) {
      try {
        await navigator.clipboard.writeText(work.processedImage);
        setCopied(true);
        toast.success('图片链接已复制到剪贴板');
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error('复制失败，请重试');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{work.title || 'Image Preview'}</span>
          </DialogTitle>
          <div className="text-muted-foreground mt-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {work.type.replace('-', ' ')}
              </Badge>
              <span>{new Date(work.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </DialogHeader>

        {work.type === 'generate' ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={work.processedImage || '/placeholder.svg'}
              alt={work.title || 'Image preview'}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
            />
          </div>
        ) : ['style-transfer', 'avatar', 'edit'].includes(work.type) ? (
          <div className="h-[500px] w-full overflow-hidden rounded-md">
            <ImageSlider
              beforeImage={work.originalImage || ''}
              afterImage={work.processedImage || ''}
              beforeLabel="原图"
              afterLabel="处理后"
              className="h-full rounded-t-lg"
            />
          </div>
        ) : (
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={work.processedImage || '/placeholder.svg'}
              alt={work.title || 'Image preview'}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
            />
          </div>
        )}

        <div className="mt-2 flex justify-end">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => downloadImage(work.processedImage || '')}
            >
              <Download className="size-4" /> Download
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleCopyLink}>
              {copied ? (
                <>
                  <Check className="size-4" /> Copied
                </>
              ) : (
                <>
                  <Share2 className="size-4" /> Share
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
