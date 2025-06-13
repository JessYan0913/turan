'use client';

import { useCallback, useEffect, useState } from 'react';

import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { Download, Eye, ImageIcon, Share2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import useSWR from 'swr';

import { ImageViewerDialog } from '@/components/image-viewer-dialog';
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
import { downloadImage } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  return res.json();
};

// Helper function to convert works to grid items format required by MasonryInfiniteGrid
const getGridItems = (works: Work[], groupKey: number) => {
  return works.map((work) => ({
    ...work,
    groupKey,
    key: `${work.id}-${groupKey}`,
  }));
};

export default function MyWorksPage() {
  const t = useScopedI18n('works');
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || 'all';
  const [workToDelete, setWorkToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewingWork, setViewingWork] = useState<Work | null>(null);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const [gridItems, setGridItems] = useState<(Work & { groupKey: number; key: string })[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const {
    data,
    error,
    isLoading: initialLoading,
    mutate,
  } = useSWR<{
    works: Work[];
    total: number;
    hasMore: boolean;
    page: number;
    limit: number;
  }>(
    `/api/works?search=${encodeURIComponent(search)}&type=${encodeURIComponent(type)}&page=${page}&limit=${ITEMS_PER_PAGE}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );

  const isLoading = initialLoading || loadingMore;

  useEffect(() => {
    setGridItems([]);
    setPage(1);
  }, [search, type]);

  useEffect(() => {
    if (data?.works) {
      if (page === 1) {
        setGridItems(getGridItems(data.works, page));
      } else {
        setGridItems((prev) => [...prev, ...getGridItems(data.works, page)]);
      }
      setLoadingMore(false);
    }
  }, [data, page]);

  const hasMore = data?.hasMore || false;

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

      await mutate();
      setGridItems((prev) => prev.filter((item) => item.id !== workToDelete));
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
        <h1 className="my-auto text-3xl font-bold">{t('title')}</h1>
        <div className="flex items-center">
          <WorksFilter searchTerm={search} filterType={type} />
        </div>
      </div>

      {gridItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ImageIcon className="mb-4 size-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium">{t('empty.title')}</h3>
          <p className="mb-4 text-gray-500">{t('empty.subtitle')}</p>
          <Button asChild>
            <Link href="/">{t('empty.button')}</Link>
          </Button>
        </div>
      ) : (
        <div className="masonry-grid-container">
          <MasonryInfiniteGrid
            className="masonry-container"
            gap={5}
            autoResize={true}
            observeChildren={true}
            align="stretch"
            maxStretchColumnSize={300}
            resizeDebounce={0}
            threshold={100}
            placeholder={
              <div className="masonry-item bg-card animate-pulse overflow-hidden rounded-lg border shadow-sm">
                <div className="aspect-square w-full bg-gray-200"></div>
              </div>
            }
            onRequestAppend={async (e) => {
              if (hasMore && !isLoading) {
                const nextGroupKey = (page || 0) + 1;

                e.wait();
                // 添加占位符
                e.currentTarget.appendPlaceholders(5, nextGroupKey);

                setLoadingMore(true);
                await new Promise((resolve) => setTimeout(resolve, 300));
                setPage((prevPage) => prevPage + 1);
              }
            }}
          >
            {gridItems.map((item: any) => (
              <div
                key={item.key}
                data-grid-groupkey={item.groupKey}
                className="masonry-item bg-card group relative overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={item.processedImage}
                    alt={item.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto w-full object-contain"
                  />

                  {/* Hover overlay with information */}
                  <div className="absolute inset-0 flex flex-col justify-between bg-black/60 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <Badge variant="outline" className="ml-2 bg-black/50 text-white">
                        {item.type}
                      </Badge>
                    </div>

                    <div>
                      <p className="mb-2 text-sm text-gray-200">{new Date(item.createdAt).toLocaleDateString()}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8 border-gray-500 bg-black/50 text-white hover:bg-black/70 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewingWork(item);
                            }}
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8 border-gray-500 bg-black/50 text-white hover:bg-black/70 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadImage(item.processedImage);
                            }}
                          >
                            <Download className="size-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8 border-gray-500 bg-black/50 text-white hover:bg-black/70 hover:text-white"
                          >
                            <Share2 className="size-4" />
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8 border-red-500/50 bg-black/50 text-red-400 hover:bg-black/70 hover:text-red-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(item.id);
                          }}
                          disabled={isDeleting}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </MasonryInfiniteGrid>
        </div>
      )}

      <AlertDialog open={!!workToDelete} onOpenChange={(open) => !open && setWorkToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('alert.title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('alert.description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>{t('alert.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? t('alert.deleting') : t('alert.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Image Viewer Dialog */}
      {viewingWork && (
        <ImageViewerDialog
          work={viewingWork}
          open={!!viewingWork}
          onOpenChange={(open) => {
            if (!open) {
              setViewingWork(null);
            }
          }}
        />
      )}
    </div>
  );
}
