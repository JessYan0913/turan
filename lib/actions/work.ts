'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/lib/db/client';
import { userTable } from '@/lib/db/schema';

export async function checkUserPoints(userId: string, requiredPoints: number) {
  const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));
  if (!user) throw new Error('用户不存在');
  const remain = (user.usageLimit ?? 0) - (user.usageCurrent ?? 0);
  if (remain < requiredPoints) {
    throw new Error('积分不足');
  }
}

export async function consumePoint(userId: string, points: number) {
  const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));
  if (!user) throw new Error('用户不存在');
  const remain = (user.usageLimit ?? 0) - (user.usageCurrent ?? 0);
  if (remain < points) {
    throw new Error('积分不足');
  }
  await db
    .update(userTable)
    .set({ usageCurrent: (user.usageCurrent ?? 0) + points })
    .where(eq(userTable.id, userId));
}
