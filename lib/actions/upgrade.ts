'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { redemptionRecordTable, transactionTable, userTable } from '@/lib/db/schema';
import { decryptionRedeemCode } from '@/lib/pricing';
import { type Plan } from '@/lib/pricing/config';

export async function validationRedeemCode(redeemCode: string): Promise<Plan & { expiresAt: Date }> {
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
  const plan = await decryptionRedeemCode(redeemCode);
  const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));
  return await db.transaction(async (tx) => {
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
