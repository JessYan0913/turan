// File: e:\turan\app\[locale]\(turan)\works\page.tsx
'use client';

import { useCallback, useState } from 'react';

import { Calendar, Download, Eye, ImageIcon, Share2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import useSWR from 'swr';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WorksFilter } from '@/components/works-filter';
import { type Work } from '@/lib/db/schema';

// 扩展 Work 类型，添加前端需要的额外字段
export interface WorkInfo extends Omit<Work, 'createdAt'> {
  createdAt: string;
  status: string;
  originalImage: string;
  processedImage: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  return res.json();
};

export default function MyWorksPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || 'all';
  const [workToDelete, setWorkToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Use SWR to fetch data
  const { data, error, mutate } = useSWR<{ works: WorkInfo[] }>(
    `/api/works?search=${encodeURIComponent(search)}&type=${encodeURIComponent(type)}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const works = data?.works || [];

  const handleDeleteClick = useCallback((workId: string) => {
    setWorkToDelete(workId);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!workToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch('/api/works', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workId: workToDelete }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete work');
      }

      // Invalidate the cache with the current query parameters and refetch
      await mutate();
      toast.success('Work deleted successfully');
    } catch (error) {
      console.error('Error deleting work:', error);
      toast.error('Failed to delete work');
    } finally {
      setIsDeleting(false);
      setWorkToDelete(null);
    }
  }, [workToDelete, mutate]);

  if (error) return <div>Failed to load works</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Works</h1>
        <WorksFilter searchTerm={search} filterType={type} />
      </div>

      {works.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ImageIcon className="mb-4 size-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium">No works yet</h3>
          <p className="mb-4 text-gray-500">Get started by creating your first work</p>
          <Button>Create New Work</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {works.map((work) => (
            <div
              key={work.id}
              className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={work.processedImage || work.originalImage || '/placeholder.svg'}
                  alt={work.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium">{work.title}</h3>
                  <Badge variant="outline" className="ml-2">
                    {work.type}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  Created on {new Date(work.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="size-8">
                      <Eye className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Download className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Share2 className="size-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive size-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(work.id);
                    }}
                    disabled={isDeleting}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={!!workToDelete} onOpenChange={(open) => !open && setWorkToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this work and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
