'use client';

import { useCallback, useEffect, useState } from 'react';

import { MasonryInfiniteGrid as MasonryGridComponent } from '@egjs/react-infinitegrid';

export interface BaseGridItem {
  id: string | number;
  width: number;
  height: number;
  groupKey?: number;
  key?: string | number;
  [key: string]: any; // Allow additional properties
}

// For backward compatibility
export type ImageItem = BaseGridItem & {
  src: string;
  alt: string;
};

type MasonryGridProps<T extends Record<string, any> = Record<string, any>> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  hasMore?: boolean;
  onLoadMore?: () => void;
  emptyComponent?: React.ReactNode;
  className?: string;
  gap?: number;
  maxStretchColumnSize?: number;
  threshold?: number;
};

export function MasonryGrid<T extends Record<string, any>>({
  items = [],
  renderItem,
  hasMore = false,
  onLoadMore,
  emptyComponent,
  className = '',
  gap = 5,
  maxStretchColumnSize = 300,
  threshold = 100,
}: MasonryGridProps<T>) {
  const [page, setPage] = useState(1);
  const [gridItems, setGridItems] = useState<T[]>([]);

  // Helper function to get grid items with group keys
  const getGridItems = useCallback((items: T[], groupKey: number): T[] => {
    return items.map((item) => ({
      ...item,
      groupKey,
      key: `${item.id}-${groupKey}`,
    }));
  }, []);

  // Update grid items when items or page changes
  useEffect(() => {
    if (items.length > 0) {
      if (page === 1) {
        setGridItems(getGridItems(items, page));
      } else {
        setGridItems((prev) => [...prev, ...getGridItems(items, page)]);
      }
    } else {
      setGridItems([]);
    }
  }, [items, page, getGridItems]);

  const defaultEmptyComponent = (
    <div className="flex w-full flex-col items-center justify-center py-12 text-center">
      <svg
        className="mb-4 size-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <h3 className="mb-2 text-lg font-medium">No items found</h3>
      <p className="text-gray-500">Try adjusting your search or filter to find what you&apos;re looking for.</p>
    </div>
  );

  return (
    <div className={className}>
      <MasonryGridComponent
        className="masonry-container"
        gap={gap}
        autoResize={true}
        observeChildren={true}
        align="stretch"
        maxStretchColumnSize={maxStretchColumnSize}
        resizeDebounce={0}
        threshold={threshold}
        placeholder={
          <div className="masonry-item bg-card animate-pulse overflow-hidden rounded-lg border shadow-sm">
            <div className="aspect-square w-full bg-gray-200"></div>
          </div>
        }
        onRequestAppend={(e) => {
          if (hasMore && onLoadMore) {
            const nextGroupKey = page + 1;
            e.wait();
            setPage(nextGroupKey);
            onLoadMore();
          }
        }}
      >
        {gridItems.length === 0
          ? emptyComponent || defaultEmptyComponent
          : gridItems.map((item) => (
              <div key={item.key} data-grid-groupkey={item.groupKey} className="masonry-item">
                {renderItem(item)}
              </div>
            ))}
      </MasonryGridComponent>
    </div>
  );
}
