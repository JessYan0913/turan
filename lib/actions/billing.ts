'use server';

import { count, eq } from 'drizzle-orm';

import { db } from '@/lib/db/client';
import { transactionTable } from '@/lib/db/schema';

export async function getBillingHistory(userId: string, limit: number, page: number) {
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
