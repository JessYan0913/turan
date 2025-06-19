'use server';

import { count, eq, sql } from 'drizzle-orm';

import { db } from '@/lib/db/client';
import { type User, userTable, workTable } from '@/lib/db/schema';

export async function getUserWorkStatistics(userId: string): Promise<{
  totalWorks: number;
  worksThisMonth: number;
  totalProcessingTime: number;
  usedWorkTypes: number;
}> {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const [result] = await db
      .select({
        totalWorks: count(),
        worksThisMonth: sql<number>`SUM(CASE WHEN ${workTable.createdAt} >= ${firstDayOfMonth}::timestamp THEN 1 ELSE 0 END)`,
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

export async function updateUserInfo(userId: string, data: Partial<Pick<User, 'name' | 'bio' | 'email'>>) {
  try {
    const [updatedUser] = await db
      .update(userTable)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(userTable.id, userId))
      .returning();

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
    };
  } catch (error) {
    console.error('Error updating user info:', error);
    throw new Error('Failed to update user information');
  }
}
