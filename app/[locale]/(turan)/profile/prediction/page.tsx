import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getPredictions } from '@/lib/actions/work';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

export default async function PredictionPage({ params }: { params: Promise<{ page?: string; limit?: string }> }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  const userId = session.user.id;
  if (!userId) {
    redirect('/login');
  }
  const t = await getScopedI18n('prediction');
  const { page, limit } = await params;
  const pageInt = page ? parseInt(page, 10) : 1;
  const limitInt = limit ? parseInt(limit, 10) : 10;
  const { predictions, total } = await getPredictions(userId, limitInt, pageInt);
  const totalPages = Math.ceil(total / limitInt);

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
          <Link href="/profile" className={cn(buttonVariants({ variant: 'ghost' }), 'flex items-center gap-2')}>
            <ArrowLeft className="size-4" />
            {t('profile')}
          </Link>
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
                    <TableCell className="max-w-[300px] truncate">{prediction.input?.['prompt'] || 'N/A'}</TableCell>
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
                  <TableCell colSpan={5} className="h-24 text-center">
                    {t('noRecords')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2">
            <span className="text-muted-foreground text-sm">
              Page {pageInt} of {totalPages}
            </span>
            <div className="flex space-x-1">
              {pageInt > 1 && (
                <Link
                  href={`/profile/prediction?page=${pageInt - 1}&limit=${limitInt}`}
                  className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'h-9 w-9')}
                >
                  &lt;
                </Link>
              )}
              {pageInt < totalPages && (
                <Link
                  href={`/profile/prediction?page=${pageInt + 1}&limit=${limitInt}`}
                  className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'h-9 w-9')}
                >
                  &gt;
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
