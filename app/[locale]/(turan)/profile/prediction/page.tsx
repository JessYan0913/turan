import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getPredictions } from '@/lib/actions/prediction';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

interface PageProps {
  params: { locale: string };
  searchParams: Promise<{
    page?: string | string[];
  }>;
}

export default async function PredictionPage({ params, searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  const userId = session.user.id;
  if (!userId) {
    redirect('/login');
  }
  const t = await getScopedI18n('prediction');
  // Get page parameter from searchParams
  const pageParam = (await searchParams).page;
  const page = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const pageInt = page ? parseInt(page, 10) : 1;
  const limitInt = 10; // Fixed limit of 10 items per page

  const { predictions, total } = await getPredictions(userId, limitInt, pageInt);
  const totalPages = Math.ceil(total / limitInt);
  const hasPrevious = pageInt > 1;
  const hasNext = pageInt < totalPages;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {t('status.succeeded')}
          </Badge>
        );
      case 'failed':
        return <Badge variant="destructive">{t('status.failed')}</Badge>;
      case 'processing':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            {t('status.processing')}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/profile">
              <ArrowLeft className="size-4" />
              {t('profile')}
            </Link>
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground mt-2">{t('description')}</p>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('table.id')}</TableHead>
                <TableHead>{t('table.model')}</TableHead>
                <TableHead>{t('table.prompt')}</TableHead>
                <TableHead>{t('table.status')}</TableHead>
                <TableHead className="text-right">{t('table.createdAt')}</TableHead>
                <TableHead className="text-right">{t('table.startedAt')}</TableHead>
                <TableHead className="text-right">{t('table.completedAt')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictions.length > 0 ? (
                predictions.map((prediction) => (
                  <TableRow key={prediction.id}>
                    <TableCell className="font-mono text-xs">{prediction.id.slice(0, 8)}...</TableCell>
                    <TableCell>{prediction.model || 'N/A'}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {(prediction.input as any)['prompt'] || 'N/A'}
                    </TableCell>
                    <TableCell>{getStatusBadge(prediction.status || 'unknown')}</TableCell>
                    <TableCell className="text-right">
                      {prediction.createdAt ? format(new Date(prediction.createdAt), 'yyyy-MM-dd HH:mm') : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      {prediction.startedAt ? format(new Date(prediction.startedAt), 'yyyy-MM-dd HH:mm') : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      {prediction.completedAt ? format(new Date(prediction.completedAt), 'yyyy-MM-dd HH:mm') : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    {t('noRecords')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-muted-foreground text-sm">{`Page ${pageInt} of ${totalPages}`}</div>
            <div className="space-x-2">
              <Link
                href={`?${new URLSearchParams({
                  page: String(Math.max(1, pageInt - 1)),
                })}`}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'w-24',
                  !hasPrevious && 'pointer-events-none opacity-50'
                )}
                aria-disabled={!hasPrevious}
              >
                Previous
              </Link>
              <Link
                href={`?${new URLSearchParams({
                  page: String(Math.min(totalPages, pageInt + 1)),
                })}`}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'w-24',
                  !hasNext && 'pointer-events-none opacity-50'
                )}
                aria-disabled={!hasNext}
              >
                Next
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
