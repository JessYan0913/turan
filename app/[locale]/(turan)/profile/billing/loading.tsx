import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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

        {/* Table card skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
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
                  {[1, 2, 3].map((row) => (
                    <div key={row} className="grid grid-cols-5 gap-4 p-4">
                      <Skeleton className="h-5 w-full font-mono" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-32" />
                      <div className="flex justify-end">
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
