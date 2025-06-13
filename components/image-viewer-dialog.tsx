'use client';

import { Download, Share2 } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ImageViewerDialogProps {
  imageURL: string;
  title?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageViewerDialog({ imageURL, title, open, onOpenChange }: ImageViewerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{title || 'Image Preview'}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image
            src={imageURL || '/placeholder.svg'}
            alt={title || 'Image preview'}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
          />
        </div>
        <div className="mt-2 flex justify-end">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="size-4" /> Download
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="size-4" /> Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
