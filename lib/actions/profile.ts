'use server';

import { and, count, desc, eq, gte, sql } from 'drizzle-orm';

import { db } from '@/lib/db/client';
import { type OperationLog, operationLog, type OperationStatus, type Work, work } from '@/lib/db/schema';

/**
 * 获取用户作品总数
 * @param userId 用户ID
 * @returns 作品总数
 */
export async function getUserWorksCount(userId: string): Promise<number> {
  try {
    const result = await db.select({ count: count() }).from(work).where(eq(work.userId, userId));
    return result[0]?.count || 0;
  } catch (error) {
    console.error('获取用户作品总数失败:', error);
    return 0;
  }
}

/**
 * 获取用户本月作品数
 * @param userId 用户ID
 * @returns 本月作品数
 */
export async function getUserWorksThisMonthCount(userId: string): Promise<number> {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const result = await db
      .select({ count: count() })
      .from(work)
      .where(and(eq(work.userId, userId), gte(work.createdAt, firstDayOfMonth)));
    return result[0]?.count || 0;
  } catch (error) {
    console.error('获取用户本月作品数失败:', error);
    return 0;
  }
}

/**
 * 获取用户总处理时间
 * @param userId 用户ID
 * @returns 总处理时间（秒）
 */
export async function getUserTotalProcessingTime(userId: string): Promise<number> {
  try {
    const result = await db
      .select({
        totalTime: sql<number>`COALESCE(SUM(${work.predictTime}), 0)::float`,
      })
      .from(work)
      .where(eq(work.userId, userId));
    return parseFloat((result[0]?.totalTime || 0).toFixed(2));
  } catch (error) {
    console.error('获取用户总处理时间失败:', error);
    return 0;
  }
}

/**
 * 获取用户使用过的作品类型数量
 * @param userId 用户ID
 * @returns 使用过的作品类型数量
 */
export async function getUserUsedWorkTypesCount(userId: string): Promise<number> {
  try {
    const result = await db
      .select({
        typeCount: sql<number>`COUNT(DISTINCT ${work.type})`,
      })
      .from(work)
      .where(eq(work.userId, userId));
    return result[0]?.typeCount || 0;
  } catch (error) {
    console.error('获取用户使用过的作品类型数量失败:', error);
    return 0;
  }
}

/**
 * 列出用户操作日志
 * @param options 查询选项
 * @returns 操作日志列表和分页信息
 */
export async function listOperationLogs({
  userId,
  limit = 10,
  offset = 0,
  orderBy = 'desc',
  status,
}: {
  userId: string;
  limit?: number;
  offset?: number;
  orderBy?: 'asc' | 'desc';
  status?: OperationStatus;
}): Promise<{ items: OperationLog[]; total: number; hasMore: boolean }> {
  try {
    const conditions = [eq(operationLog.userId, userId)];
    if (status) {
      conditions.push(eq(operationLog.status, status));
    }

    const totalResult = await db
      .select({ count: count() })
      .from(operationLog)
      .where(and(...conditions));
    const total = totalResult[0]?.count || 0;

    const items = await db
      .select()
      .from(operationLog)
      .where(and(...conditions))
      .orderBy(orderBy === 'desc' ? desc(operationLog.createdAt) : operationLog.createdAt)
      .limit(limit)
      .offset(offset);
    return {
      items,
      total,
      hasMore: offset + items.length < total,
    };
  } catch (error) {
    console.error('获取用户操作日志失败:', error);
    return { items: [], total: 0, hasMore: false };
  }
}
