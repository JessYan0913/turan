import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Back button skeleton */}
        <div className="flex items-center">
          <Skeleton className="h-9 w-32" />
        </div>

        {/* Page header skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Table skeleton */}
        <div className="rounded-md border">
          <div className="overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-5 gap-4 border-b px-4 py-3 text-left text-sm font-medium">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="ml-auto h-5 w-16" />
            </div>

            {/* Table rows */}
            <div className="divide-y">
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="grid grid-cols-5 items-center gap-4 p-4">
                  <Skeleton className="h-5 w-32 font-mono" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-16" />
                  <div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="ml-auto h-5 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-end space-x-2">
          <Skeleton className="h-9 w-24" />
          <div className="flex space-x-1">
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}
