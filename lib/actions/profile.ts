'use server';

import { count, eq, sql } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { redemptionRecordTable, transactionTable, userTable, workTable } from '@/lib/db/schema';
import { decryptionRedeemCode } from '@/lib/pricing';
import { type Plan } from '@/lib/pricing/config';

export async function getUserWorkStatistics(userId: string): Promise<{
  totalWorks: number;
  worksThisMonth: number;
  totalProcessingTime: number;
  usedWorkTypes: number;
}> {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [result] = await db
      .select({
        totalWorks: count(),
        worksThisMonth: sql<number>`SUM(CASE WHEN ${workTable.createdAt} >= ${firstDayOfMonth} THEN 1 ELSE 0 END)`,
        totalProcessingTime: sql<number>`COALESCE(SUM(${workTable.predictTime}), 0)`,
        usedWorkTypes: sql<number>`COUNT(DISTINCT ${workTable.type})`,
      })
      .from(workTable)
      .where(eq(workTable.userId, userId));

    return {
      totalWorks: Number(result.totalWorks) || 0,
      worksThisMonth: Number(result.worksThisMonth) || 0,
      totalProcessingTime: parseFloat((Number(result.totalProcessingTime) || 0).toFixed(2)),
      usedWorkTypes: Number(result.usedWorkTypes) || 0,
    };
  } catch (error) {
    console.error('获取用户统计信息失败:', error);
    return {
      totalWorks: 0,
      worksThisMonth: 0,
      totalProcessingTime: 0,
      usedWorkTypes: 0,
    };
  }
}

export async function validationRedeemCode(redeemCode: string): Promise<Plan & { expiresAt: Date }> {
  const plan = await decryptionRedeemCode(redeemCode);
  const [record] = await db.select().from(redemptionRecordTable).where(eq(redemptionRecordTable.code, redeemCode));
  if (record) {
    throw new Error('兑换码已使用');
  }
  return plan;
}

export async function upgrade(redeemCode: string) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  const userId = session.user.id;
  if (!userId) {
    redirect('/login');
  }
  const plan = await decryptionRedeemCode(redeemCode);
  const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));
  return await db.transaction(async (tx) => {
    // Update user's plan and usage limit
    const [updatedUser] = await tx
      .update(userTable)
      .set({
        usageLimit: (user.usageLimit || 0) + plan.amount,
        plan: plan.id,
        planExpiry: plan.expiresAt,
        updatedAt: new Date(),
      })
      .where(eq(userTable.id, userId))
      .returning();

    // Record the transaction
    const [currentTransaction] = await tx
      .insert(transactionTable)
      .values({
        userId,
        amount: plan.amount,
        type: 'redeem_code',
        status: 'completed',
        metadata: {
          action: 'upgrade',
          planId: plan.id,
          amount: plan.amount,
          expiresAt: plan.expiresAt?.toISOString(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    await tx.insert(redemptionRecordTable).values({
      userId,
      code: redeemCode,
      type: 'plan_upgrade',
      transactionId: currentTransaction.id,
      reward: {
        planId: plan.id,
        planName: plan.id, // Using plan.id as name since plan.name isn't available
        amount: plan.amount,
        expiresAt: plan.expiresAt?.toISOString(),
      },
      metadata: {
        action: 'upgrade',
        source: 'redeem_code',
      },
      redeemedAt: new Date(),
    });

    return { success: true, plan, user: updatedUser };
  });
}
