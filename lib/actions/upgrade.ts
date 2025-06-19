'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { redemptionRecordTable, transactionTable, userTable } from '@/lib/db/schema';
import { decryptionRedeemCode } from '@/lib/pricing';
import { type Plan } from '@/lib/pricing/config';

export async function validationRedeemCode(redeemCode: string): Promise<Plan> {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  const userId = session.user.id;
  if (!userId) {
    redirect('/login');
  }
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
  const record = await db.select().from(redemptionRecordTable).where(eq(redemptionRecordTable.code, redeemCode));
  if (record) {
    throw new Error('兑换码已使用');
  }
  const plan = await decryptionRedeemCode(redeemCode);
  const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));
  return await db.transaction(async (tx) => {
    // Calculate new expiry: extend from current expiry or now + 1 month
    const now = new Date();
    const newExpiry =
      user.planExpiry && user.planExpiry > now
        ? new Date(user.planExpiry.getTime() + 30 * 24 * 60 * 60 * 1000) // Add 1 month to current expiry
        : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // Now + 1 month

    const [updatedUser] = await tx
      .update(userTable)
      .set({
        plan: plan.id,
        planPoints: plan.points,
        planExpiry: newExpiry,
        points: user.points + plan.points, // Add new points to existing balance
        updatedAt: now,
      })
      .where(eq(userTable.id, userId))
      .returning();

    const [currentTransaction] = await tx
      .insert(transactionTable)
      .values({
        userId,
        amount: plan.points,
        type: 'redeem_code',
        status: 'completed',
        balanceBefore: user.points,
        balanceAfter: updatedUser.points,
        metadata: {
          redeemCode,
          action: 'upgrade',
          planId: plan.id,
          amount: plan.points,
          planPeriod: plan.period,
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
        amount: plan.points,
        planPeriod: plan.period,
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
