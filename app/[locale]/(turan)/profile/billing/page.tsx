import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getBillingHistory } from '@/lib/actions/billing';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

interface PageProps {
  params: { locale: string };
  searchParams: Promise<{
    page?: string | string[];
  }>;
}

export default async function BillingPage({ params, searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  const userId = session.user.id;
  if (!userId) {
    redirect('/login');
  }
  const t = await getScopedI18n('billing');
  const pageParam = (await searchParams).page;
  const page = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const pageInt = page ? parseInt(page, 10) : 1;
  const limitInt = 10; // Fixed limit of 10 items per page
  const { transactions, total } = await getBillingHistory(userId, limitInt, pageInt);
  const totalPages = Math.ceil(total / limitInt);
  const hasPrevious = pageInt > 1;
  const hasNext = pageInt < totalPages;

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
                <TableHead>{t('table.type')}</TableHead>
                <TableHead>{t('table.amount')}</TableHead>
                <TableHead>{t('table.balanceBefore')}</TableHead>
                <TableHead>{t('table.balanceAfter')}</TableHead>
                <TableHead>{t('table.status')}</TableHead>
                <TableHead className="text-right">{t('table.createdAt')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono">{transaction.id}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell
                      className={cn('font-medium', transaction.amount > 0 ? 'text-green-600' : 'text-red-600')}
                    >
                      {transaction.amount > 0 ? '+' : ''}
                      {transaction.amount}
                    </TableCell>
                    <TableCell>{transaction.balanceBefore}</TableCell>
                    <TableCell>{transaction.balanceAfter}</TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                        className={cn(
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        )}
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {format(new Date(transaction.createdAt), 'yyyy-MM-dd HH:mm')}
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

        {/* Pagination */}
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
