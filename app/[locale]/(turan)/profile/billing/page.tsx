import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

interface ActivationRecord {
  id: string;
  code: string;
  planName: string;
  activationDate: Date;
  expirationDate: Date;
  status: 'active' | 'expired';
}

// Mock data - Replace with actual API call in production
const mockActivationData: ActivationRecord[] = [
  {
    id: '1',
    code: 'ACT-7890-ABCD-1234',
    planName: 'Pro Monthly',
    activationDate: new Date('2025-06-01'),
    expirationDate: new Date('2025-07-01'),
    status: 'active',
  },
  {
    id: '2',
    code: 'ACT-5678-EFGH-9012',
    planName: 'Basic Monthly',
    activationDate: new Date('2025-05-01'),
    expirationDate: new Date('2025-06-01'),
    status: 'expired',
  },
];

export default async function BillingPage() {
  const t = await getScopedI18n('billing');
  const activationRecords = mockActivationData;

  const formatDate = (date: Date) => {
    return format(date, 'yyyy-MM-dd HH:mm');
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

        <Card>
          <CardHeader>
            <CardTitle>{t('activationHistory')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('activationCode')}</TableHead>
                    <TableHead>{t('plan')}</TableHead>
                    <TableHead>{t('activationDate')}</TableHead>
                    <TableHead>{t('expirationDate')}</TableHead>
                    <TableHead className="text-right">{t('status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activationRecords.length > 0 ? (
                    activationRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-mono">{record.code}</TableCell>
                        <TableCell>{record.planName}</TableCell>
                        <TableCell>{formatDate(record.activationDate)}</TableCell>
                        <TableCell>{formatDate(record.expirationDate)}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={record.status === 'active' ? 'default' : 'secondary'}
                            className={cn(
                              record.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                            )}
                          >
                            {record.status === 'active' ? t('active') : t('expired')}
                          </Badge>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
