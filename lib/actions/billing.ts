'use server';

import { count, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { transactionTable } from '@/lib/db/schema';

export async function getBillingHistory(limit: number, page: number) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  const userId = session.user.id;
  if (!userId) {
    redirect('/login');
  }
  const offset = (page - 1) * limit;
  const transactions = await db
    .select()
    .from(transactionTable)
    .where(eq(transactionTable.userId, userId))
    .limit(limit)
    .offset(offset);
  const totalResult = await db
    .select({ count: count() })
    .from(transactionTable)
    .where(eq(transactionTable.userId, userId));
  const total = totalResult[0]?.count || 0;
  return { transactions, total };
}
