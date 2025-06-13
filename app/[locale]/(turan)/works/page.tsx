// File: e:\turan\app\[locale]\(turan)\works\page.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';

import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { Download, Eye, ImageIcon, Share2, Trash2 } from 'lucide-react';
import Image from 'next/image';
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

// Use the Work type directly from schema, with createdAt as string for frontend
export type WorkWithStringDates = Omit<Work, 'createdAt'> & {
  createdAt: string;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  return res.json();
};

// Helper function to convert works to grid items format required by MasonryInfiniteGrid
const getGridItems = (works: WorkWithStringDates[], page: number) => {
  return works.map((work, index) => ({
    ...work,
    groupKey: page,
    key: work.id,
  }));
};

export default function MyWorksPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || 'all';
  const [workToDelete, setWorkToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewingImage, setViewingImage] = useState<string | null>(null);
  const [viewingImageTitle, setViewingImageTitle] = useState<string | null>(null);

  // State for pagination
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // State for grid items
  const [gridItems, setGridItems] = useState<(WorkWithStringDates & { groupKey: number; key: string })[]>([]);

  // Use SWR to fetch data
  const { data, error, mutate, isLoading } = useSWR<{ works: WorkWithStringDates[]; total: number }>(
    `/api/works?search=${encodeURIComponent(search)}&type=${encodeURIComponent(type)}&page=${page}&limit=${ITEMS_PER_PAGE}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );

  // Reset grid items when search or type changes
  useEffect(() => {
    setGridItems([]);
    setPage(1);
  }, [search, type]);

  // Update grid items when data changes
  useEffect(() => {
    if (data?.works) {
      // If it's the first page, replace all items, otherwise append
      if (page === 1) {
        setGridItems(getGridItems(data.works, page));
      } else {
        setGridItems((prev) => [...prev, ...getGridItems(data.works, page)]);
      }
    }
  }, [data, page]);

  const totalWorks = data?.total || 0;
  // Check if there are more items to load
  const hasMore = totalWorks > gridItems.length;
  // Show loading state when no items are loaded yet
  const isInitialLoading = isLoading && gridItems.length === 0;

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
      // Also update the grid items to remove the deleted item
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
      <style jsx global>{`
        .masonry-grid-container {
          width: 100%;
        }
        .masonry-container {
          width: 100%;
          position: relative;
        }
        .masonry-item {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          break-inside: avoid;
        }
        @media (min-width: 640px) {
          .masonry-item {
            width: calc(50% - 8px);
          }
        }
        @media (min-width: 1024px) {
          .masonry-item {
            width: calc(33.333% - 11px);
          }
        }
        @media (min-width: 1280px) {
          .masonry-item {
            width: calc(25% - 12px);
          }
        }
      `}</style>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Works</h1>
        <WorksFilter searchTerm={search} filterType={type} />
      </div>

      {isInitialLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="border-t-primary mb-4 size-12 animate-spin rounded-full border-4 border-gray-300"></div>
          <p>Loading works...</p>
        </div>
      ) : gridItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ImageIcon className="mb-4 size-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium">No works yet</h3>
          <p className="mb-4 text-gray-500">Get started by creating your first work</p>
          <Button>Create New Work</Button>
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
            onRequestAppend={() => {
              if (hasMore && !isLoading) {
                setPage((prevPage) => prevPage + 1);
              }
            }}
          >
            {gridItems.map((item) => (
              <div
                key={item.key}
                data-grid-groupkey={item.groupKey}
                className="masonry-item bg-card group relative overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={item.processedImage || item.originalImage || '/placeholder.svg'}
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
                              setViewingImage(item.processedImage || item.originalImage || '');
                              setViewingImageTitle(item.title);
                            }}
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8 border-gray-500 bg-black/50 text-white hover:bg-black/70 hover:text-white"
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

      {/* Image Viewer Dialog */}
      <ImageViewerDialog
        imageURL={viewingImage || ''}
        title={viewingImageTitle || ''}
        open={!!viewingImage}
        onOpenChange={(open) => {
          if (!open) {
            setViewingImage(null);
            setViewingImageTitle(null);
          }
        }}
      />
    </div>
  );
}
