'use server';

import { genSaltSync, hashSync } from 'bcrypt-ts';
import { startOfMonth } from 'date-fns';
import type { InferInsertModel } from 'drizzle-orm';
import { and, asc, count, desc, eq, gt, gte, ilike, inArray, lt, lte, ne, or, sql, sum } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import {
  type OperationLog,
  operationLog,
  type OperationStatus,
  type OperationType,
  type RedeemBatch,
  redeemBatch,
  type RedeemCode,
  redeemCode,
  type RedeemCodeStatus,
  type RedeemCodeType,
  type RedeemCodeUsage,
  redeemCodeUsage,
  type RedeemResultType,
  type User,
  user,
  type Work,
  work,
  type WorkType,
} from './schema';

type NewWork = Omit<Work, 'id' | 'createdAt' | 'updatedAt'>;

type NewUser = Omit<InferInsertModel<typeof user>, 'id' | 'createdAt' | 'updatedAt'>;

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function getUser(email: string): Promise<User | null> {
  try {
    const users = await db.select().from(user).where(eq(user.email, email));
    return users[0] || null;
  } catch (error) {
    console.error('Failed to get user from database');
    throw error;
  }
}

// 通过ID获取用户
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const users = await db.select().from(user).where(eq(user.id, userId));
    return users[0] || null;
  } catch (error) {
    console.error('通过ID获取用户失败', error);
    throw error;
  }
}

/**
 * 为用户添加积分（增加总积分额度）
 * @param userId 用户ID
 * @param points 要添加的积分数
 * @returns 更新后的用户信息
 */
export async function addUserPoints(userId: string, points: number, plan?: string): Promise<User> {
  try {
    // 获取当前用户
    const currentUser = await getUserById(userId);
    if (!currentUser) {
      throw new Error('用户不存在');
    }

    // 更新用户总积分额度
    const [updatedUser] = await db
      .update(user)
      .set({
        usageLimit: (currentUser.usageLimit || 0) + points,
        plan: plan || currentUser.plan,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId))
      .returning();

    return updatedUser;
  } catch (error) {
    console.error('添加用户积分失败', error);
    throw error;
  }
}

/**
 * 获取用户可用积分
 * @param userId 用户ID
 * @returns 用户可用积分数量
 * @throws 当用户不存在时抛出错误
 */
export async function getAvailablePoints(userId: string): Promise<number> {
  try {
    const currentUser = await getUserById(userId);
    if (!currentUser) {
      return 0;
    }

    // 计算可用积分 = 总额度 - 已使用积分
    const totalPoints = currentUser.usageLimit || 0;
    const usedPoints = currentUser.usageCurrent || 0;
    return Math.max(0, totalPoints - usedPoints);
  } catch (error) {
    console.error('获取用户可用积分失败:', error);
    return 0;
  }
}

/**
 * 消耗用户积分
 * @param userId 用户ID
 * @param points 要消耗的积分数
 * @returns 更新后的用户信息
 * @throws 当用户不存在或积分不足时抛出错误
 */
export async function consumeUserPoints(userId: string, points: number): Promise<User> {
  try {
    // 获取当前用户
    const currentUser = await getUserById(userId);
    if (!currentUser) {
      throw new Error('用户不存在');
    }

    // 检查可用积分是否足够
    const availablePoints = await getAvailablePoints(userId);
    if (availablePoints < points) {
      throw new Error('积分不足');
    }

    // 更新已使用积分
    const [updatedUser] = await db
      .update(user)
      .set({
        usageCurrent: (currentUser.usageCurrent || 0) + points,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId))
      .returning();

    return updatedUser;
  } catch (error) {
    console.error('消耗用户积分失败', error);
    throw error;
  }
}

// ...

export async function updateWork(
  id: string,
  userId: string,
  data: Partial<Omit<NewWork, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
): Promise<Work> {
  try {
    const [updatedWork] = await db
      .update(work)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(eq(work.id, id), eq(work.userId, userId)))
      .returning();

    if (!updatedWork) {
      throw new Error('Work not found or access denied');
    }

    return updatedWork;
  } catch (error) {
    console.error('Failed to update work:', error);
    throw error instanceof Error ? error : new Error('Failed to update work');
  }
}

// ...

export async function updateOperationLog(
  id: string,
  data: Partial<Omit<OperationLog, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<OperationLog> {
  try {
    const [updatedLog] = await db
      .update(operationLog)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(operationLog.id, id))
      .returning();

    if (!updatedLog) {
      throw new Error('Operation log not found');
    }

    return updatedLog;
  } catch (error) {
    console.error('Failed to update operation log:', error);
    throw new Error('Failed to update operation log');
  }
}

export interface OperationStats {
  total: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byDay: Array<{ date: string; count: number }>;
}

export async function getOperationStats({
  userId,
  days = 30,
}: {
  userId?: string;
  days?: number;
} = {}): Promise<OperationStats> {
  try {
    const conditions = [];

    if (userId) {
      conditions.push(eq(operationLog.userId, userId));
    }

    // Get total count
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(operationLog)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    // Get count by operation type
    const byTypeResult = await db
      .select({
        type: operationLog.operationType,
        count: sql<number>`count(*)`,
      })
      .from(operationLog)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .groupBy(operationLog.operationType);

    // Get count by status
    const byStatusResult = await db
      .select({
        status: operationLog.status,
        count: sql<number>`count(*)`,
      })
      .from(operationLog)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .groupBy(operationLog.status);

    // Get daily counts for the last N days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const byDayResult = await db
      .select({
        date: sql<string>`to_char(${operationLog.startTime}, 'YYYY-MM-DD')`,
        count: sql<number>`count(*)`,
      })
      .from(operationLog)
      .where(and(conditions.length > 0 ? and(...conditions) : undefined, gte(operationLog.startTime, startDate)))
      .groupBy(sql`to_char(${operationLog.startTime}, 'YYYY-MM-DD')`)
      .orderBy(sql`to_char(${operationLog.startTime}, 'YYYY-MM-DD')`);

    return {
      total: Number(totalResult[0]?.count || 0),
      byType: byTypeResult.reduce(
        (acc, { type, count }) => ({
          ...acc,
          [type]: Number(count),
        }),
        {}
      ),
      byStatus: byStatusResult.reduce(
        (acc, { status, count }) => ({
          ...acc,
          [status]: Number(count),
        }),
        {}
      ),
      byDay: byDayResult.map(({ date, count }) => ({
        date,
        count: Number(count),
      })),
    };
  } catch (error) {
    console.error('Failed to get operation stats:', error);
    throw new Error('Failed to get operation stats');
  }
}

// 兑换码相关查询

export interface ListRedeemCodesOptions {
  code?: string;
  type?: RedeemCodeType;
  status?: RedeemCodeStatus;
  batchId?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'asc' | 'desc';
}

export interface PaginatedRedeemCodes {
  items: RedeemCode[];
  total: number;
  hasMore: boolean;
}

export async function createRedeemCode(data: {
  code: string;
  type: RedeemCodeType;
  reward: Record<string, any>;
  usageLimit?: number;
  expireAt?: Date;
  batchId?: string;
  createdBy?: string;
}): Promise<RedeemCode> {
  try {
    // 检查兑换码是否已存在
    const existingCode = await db
      .select()
      .from(redeemCode)
      .where(eq(redeemCode.code, data.code))
      .limit(1)
      .then((rows) => rows[0]);

    if (existingCode) {
      throw new Error('兑换码已存在');
    }

    // 创建兑换码
    const [newCode] = await db
      .insert(redeemCode)
      .values({
        code: data.code,
        type: data.type,
        reward: data.reward,
        usageLimit: data.usageLimit ?? 1,
        usedCount: 0,
        expireAt: data.expireAt,
        status: 'active',
        batchId: data.batchId,
        createdBy: data.createdBy,
      })
      .returning();

    return newCode;
  } catch (error) {
    console.error('创建兑换码失败:', error);
    throw error instanceof Error ? error : new Error('创建兑换码失败');
  }
}

export async function getRedeemCode(code: string): Promise<RedeemCode | undefined> {
  try {
    const [result] = await db.select().from(redeemCode).where(eq(redeemCode.code, code)).limit(1);
    return result;
  } catch (error) {
    console.error('获取兑换码失败:', error);
    throw new Error('获取兑换码失败');
  }
}

export async function listRedeemCodes({
  code,
  type,
  status,
  batchId,
  limit = 20,
  offset = 0,
  orderBy = 'desc',
}: ListRedeemCodesOptions = {}): Promise<PaginatedRedeemCodes> {
  try {
    const conditions = [];

    if (code) {
      conditions.push(sql`LOWER(${redeemCode.code}) LIKE ${`%${code.toLowerCase()}%`}`);
    }

    if (type) {
      conditions.push(eq(redeemCode.type, type));
    }

    if (status) {
      conditions.push(eq(redeemCode.status, status));
    }

    if (batchId) {
      conditions.push(eq(redeemCode.batchId, batchId));
    }

    const query = db
      .select()
      .from(redeemCode)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(orderBy === 'desc' ? desc(redeemCode.createdAt) : redeemCode.createdAt)
      .limit(limit + 1)
      .offset(offset);

    const codes = await query;

    const hasMore = codes.length > limit;
    const items = hasMore ? codes.slice(0, -1) : codes;

    // 获取总数
    const countQuery = await db
      .select({ count: sql<number>`count(*)` })
      .from(redeemCode)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .then((rows) => rows[0]?.count || 0);

    return {
      items,
      total: Number(countQuery),
      hasMore,
    };
  } catch (error) {
    console.error('获取兑换码列表失败:', error);
    throw new Error('获取兑换码列表失败');
  }
}

export async function updateRedeemCode(
  code: string,
  data: Partial<{
    reward: Record<string, any>;
    usageLimit: number;
    expireAt: Date | null;
    status: RedeemCodeStatus;
  }>
): Promise<RedeemCode> {
  try {
    const [updated] = await db.update(redeemCode).set(data).where(eq(redeemCode.code, code)).returning();

    if (!updated) {
      throw new Error('兑换码不存在');
    }

    return updated;
  } catch (error) {
    console.error('更新兑换码失败:', error);
    throw error instanceof Error ? error : new Error('更新兑换码失败');
  }
}

export async function createRedeemBatch(data: {
  name: string;
  channel?: string;
  note?: string;
  createdBy?: string;
}): Promise<RedeemBatch> {
  try {
    const [newBatch] = await db
      .insert(redeemBatch)
      .values({
        name: data.name,
        channel: data.channel,
        note: data.note,
        createdBy: data.createdBy,
      })
      .returning();

    return newBatch;
  } catch (error) {
    console.error('创建兑换码批次失败:', error);
    throw error instanceof Error ? error : new Error('创建兑换码批次失败');
  }
}

export async function listRedeemBatches({
  limit = 20,
  offset = 0,
  orderBy = 'desc',
}: {
  limit?: number;
  offset?: number;
  orderBy?: 'asc' | 'desc';
} = {}): Promise<{ items: RedeemBatch[]; total: number; hasMore: boolean }> {
  try {
    const query = db
      .select()
      .from(redeemBatch)
      .orderBy(orderBy === 'desc' ? desc(redeemBatch.createdAt) : redeemBatch.createdAt)
      .limit(limit + 1)
      .offset(offset);

    const batches = await query;

    const hasMore = batches.length > limit;
    const items = hasMore ? batches.slice(0, -1) : batches;

    // 获取总数
    const countQuery = await db
      .select({ count: sql<number>`count(*)` })
      .from(redeemBatch)
      .then((rows) => rows[0]?.count || 0);

    return {
      items,
      total: Number(countQuery),
      hasMore,
    };
  } catch (error) {
    console.error('获取兑换码批次列表失败:', error);
    throw new Error('获取兑换码批次列表失败');
  }
}

export async function redeemCodeForUser({
  code: codeString,
  userId,
  ipAddress,
  userAgent,
}: {
  code: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
}): Promise<{
  success: boolean;
  result: RedeemResultType;
  message: string;
  reward?: Record<string, any>;
}> {
  try {
    // 获取兑换码
    const code = await getRedeemCode(codeString);

    if (!code) {
      await logRedeemAttempt({
        code: codeString,
        userId,
        ipAddress,
        userAgent,
        result: 'invalid',
        message: '兑换码不存在',
      });
      return { success: false, result: 'invalid', message: '兑换码不存在' };
    }

    // 检查兑换码状态
    if (code.status !== 'active') {
      await logRedeemAttempt({
        code: codeString,
        userId,
        ipAddress,
        userAgent,
        result: 'invalid',
        message: '兑换码已禁用',
      });
      return { success: false, result: 'invalid', message: '兑换码已禁用' };
    }

    // 检查兑换码是否过期
    if (code.expireAt && new Date(code.expireAt) < new Date()) {
      await logRedeemAttempt({
        code: codeString,
        userId,
        ipAddress,
        userAgent,
        result: 'expired',
        message: '兑换码已过期',
      });

      // 更新兑换码状态为过期
      await updateRedeemCode(codeString, { status: 'expired' });

      return { success: false, result: 'expired', message: '兑换码已过期' };
    }

    // 检查兑换码使用次数
    if ((code.usedCount ?? 0) >= (code.usageLimit ?? 1)) {
      await logRedeemAttempt({
        code: codeString,
        userId,
        ipAddress,
        userAgent,
        result: 'used_up',
        message: '兑换码已达到使用上限',
      });
      return { success: false, result: 'used_up', message: '兑换码已达到使用上限' };
    }

    // 如果是单次使用的兑换码，检查用户是否已经使用过
    if (code.usageLimit === 1) {
      const usageCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(redeemCodeUsage)
        .where(and(eq(redeemCodeUsage.code, codeString), eq(redeemCodeUsage.userId, userId)))
        .then((rows) => Number(rows[0]?.count || 0));

      if (usageCount > 0) {
        await logRedeemAttempt({
          code: codeString,
          userId,
          ipAddress,
          userAgent,
          result: 'used_up',
          message: '您已经使用过此兑换码',
        });
        return { success: false, result: 'used_up', message: '您已经使用过此兑换码' };
      }
    }

    // 处理兑换码奖励
    const reward = code.reward as Record<string, any>;

    // 处理不同类型的兑换码
    if (code.type === 'points') {
      // 普通积分兑换码
      const pointsToAdd = parseInt(reward.value, 10) || 0;
      if (pointsToAdd > 0) {
        await addUserPoints(userId, pointsToAdd);
      }
    } else if (code.type === 'plan_basic' || code.type === 'plan_pro' || code.type === 'plan_enterprise') {
      // 套餐兑换码
      const planType = code.type.replace('plan_', '') as 'basic' | 'pro' | 'enterprise';
      const days = parseInt(reward.days, 10) || 30; // 默认30天

      // 根据套餐类型确定每月积分额度
      let monthlyPoints = 0;
      switch (planType) {
        case 'basic':
          monthlyPoints = 300;
          break;
        case 'pro':
          monthlyPoints = 1000;
          break;
        case 'enterprise':
          monthlyPoints = 2500;
          break;
      }

      // 计算月数（向上取整）
      const months = Math.ceil(days / 30);

      // 立即添加第一个月的积分
      await addUserPoints(userId, monthlyPoints);

      // 创建套餐订阅
      await createPlanSubscription({
        userId,
        plan: planType,
        monthlyPoints,
        startDate: new Date(),
        days,
        redeemCode: codeString,
      });

      // 更新用户的计划类型
      await db
        .update(user)
        .set({
          plan: planType,
          updatedAt: new Date(),
        })
        .where(eq(user.id, userId));
    }

    // 更新兑换码使用次数
    await db
      .update(redeemCode)
      .set({ usedCount: (code.usedCount ?? 0) + 1 })
      .where(eq(redeemCode.code, codeString));

    // 记录兑换码使用
    await logRedeemAttempt({
      code: codeString,
      userId,
      ipAddress,
      userAgent,
      result: 'success',
      message: '兑换成功',
    });

    return { success: true, result: 'success', message: '兑换成功', reward };
  } catch (error) {
    console.error('兑换码使用失败:', error);
    await logRedeemAttempt({
      code: codeString,
      userId,
      ipAddress,
      userAgent,
      result: 'invalid',
      message: '系统错误',
    });
    throw error instanceof Error ? error : new Error('兑换码使用失败');
  }
}

// ...

// 计算下一个重置日期
function calculateNextResetDate(startDate: Date): Date {
  const nextDate = new Date(startDate);
  nextDate.setMonth(nextDate.getMonth() + 1);
  return nextDate;
}

// 重置用户的月度积分
export async function resetMonthlyPoints(userId: string): Promise<void> {
  try {
    // 获取用户信息
    const currentUser = await getUserById(userId);
    if (!currentUser || !currentUser.metadata) {
      return; // 用户不存在或没有元数据，无需重置
    }

    // 解析元数据
    const metadata = JSON.parse(currentUser.metadata);
    const subscription = metadata.planSubscription;

    // 检查是否有套餐订阅
    if (!subscription) {
      return; // 没有套餐订阅，无需重置
    }

    // 检查订阅是否已过期
    const endDate = new Date(subscription.endDate);
    if (endDate < new Date()) {
      // 订阅已过期，清除订阅信息
      delete metadata.planSubscription;
      await db
        .update(user)
        .set({
          metadata: JSON.stringify(metadata),
          updatedAt: new Date(),
        })
        .where(eq(user.id, userId));
      return;
    }

    // 检查是否需要重置
    const nextResetDate = new Date(subscription.nextResetDate);
    if (nextResetDate > new Date()) {
      return; // 还没到重置时间
    }

    // 重置积分：添加月度积分
    const monthlyPoints = subscription.monthlyPoints;
    await addUserPoints(userId, monthlyPoints);

    // 更新下次重置时间
    const newNextResetDate = calculateNextResetDate(nextResetDate);
    metadata.planSubscription.nextResetDate = newNextResetDate.toISOString();

    // 更新用户元数据
    await db
      .update(user)
      .set({
        metadata: JSON.stringify(metadata),
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId));

    console.log(
      `已为用户 ${userId} 重置${subscription.plan}套餐月度积分，添加了 ${monthlyPoints} 积分，下次重置时间：${newNextResetDate}`
    );
  } catch (error) {
    console.error('重置月度积分失败:', error);
    throw error;
  }
}

// 创建套餐订阅
export async function createPlanSubscription({
  userId,
  plan,
  monthlyPoints,
  startDate,
  days,
  redeemCode,
}: {
  userId: string;
  plan: 'basic' | 'pro' | 'enterprise';
  monthlyPoints: number;
  startDate: Date;
  days: number;
  redeemCode: string;
}): Promise<void> {
  try {
    // 创建套餐订阅记录
    // 为了简化实现，我们使用现有的表结构，将信息存储在用户表的元数据字段中

    const currentUser = await getUserById(userId);
    if (!currentUser) {
      throw new Error('用户不存在');
    }

    // 计算订阅结束日期
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + days);

    // 解析现有元数据
    const existingMetadata = currentUser.metadata ? JSON.parse(currentUser.metadata) : {};

    // 创建新的元数据对象，保留现有数据并添加订阅信息
    const newMetadata = {
      ...existingMetadata,
      planSubscription: {
        plan,
        monthlyPoints,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        redeemCode,
        nextResetDate: calculateNextResetDate(startDate).toISOString(),
      },
    };

    // 更新用户表，添加套餐订阅信息
    await db
      .update(user)
      .set({
        metadata: JSON.stringify(newMetadata),
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId));

    console.log(`为用户 ${userId} 创建了${plan}套餐订阅，每月 ${monthlyPoints} 积分，有效期 ${days} 天`);
  } catch (error) {
    console.error('创建套餐订阅失败:', error);
    throw error;
  }
}

// 记录兑换码使用记录
export async function logRedeemAttempt({
  code,
  userId,
  ipAddress,
  userAgent,
  result,
  message,
}: {
  code: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
  result: RedeemResultType;
  message: string;
}): Promise<void> {
  try {
    await db.insert(redeemCodeUsage).values({
      code,
      userId,
      ipAddress,
      userAgent,
      result,
      message,
    });
  } catch (error) {
    console.error('记录兑换码使用失败:', error);
    // 这里不抛出异常，避免影响主流程
  }
}

// 获取兑换码使用统计
export async function getRedeemCodeUsageStats(code: string): Promise<{
  total: number;
  success: number;
  failed: number;
  uniqueUsers: number;
}> {
  try {
    // 总使用次数
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(redeemCodeUsage)
      .where(eq(redeemCodeUsage.code, code))
      .then((rows) => Number(rows[0]?.count || 0));

    // 成功使用次数
    const successCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(redeemCodeUsage)
      .where(and(eq(redeemCodeUsage.code, code), eq(redeemCodeUsage.result, 'success')))
      .then((rows) => Number(rows[0]?.count || 0));

    // 失败使用次数
    const failedCount = totalCount - successCount;

    // 唯一用户数
    const uniqueUsers = await db
      .select({ count: sql<number>`count(distinct ${redeemCodeUsage.userId})` })
      .from(redeemCodeUsage)
      .where(eq(redeemCodeUsage.code, code))
      .then((rows) => Number(rows[0]?.count || 0));

    return {
      total: totalCount,
      success: successCount,
      failed: failedCount,
      uniqueUsers,
    };
  } catch (error) {
    console.error('获取兑换码使用统计失败:', error);
    throw new Error('获取兑换码使用统计失败');
  }
}

// 批量生成兑换码
export async function generateRedeemCodes({
  count,
  prefix = '',
  length = 8,
  type,
  reward,
  usageLimit = 1,
  expireAt,
  batchId,
  createdBy,
}: {
  count: number;
  prefix?: string;
  length?: number;
  type: RedeemCodeType;
  reward: Record<string, any>;
  usageLimit?: number;
  expireAt?: Date;
  batchId?: string;
  createdBy?: string;
}): Promise<{ codes: string[]; successful: number; failed: number }> {
  const generatedCodes: string[] = [];
  let successful = 0;
  let failed = 0;

  // 生成随机字符串的函数
  const generateRandomString = (length: number): string => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 排除容易混淆的字符
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  try {
    for (let i = 0; i < count; i++) {
      // 生成兑换码
      let codeString = '';
      let attempts = 0;
      const maxAttempts = 5;

      // 尝试生成唯一的兑换码
      while (attempts < maxAttempts) {
        codeString = `${prefix}${generateRandomString(length)}`;

        // 检查兑换码是否已存在
        const existingCode = await db
          .select()
          .from(redeemCode)
          .where(eq(redeemCode.code, codeString))
          .limit(1)
          .then((rows) => rows[0]);

        if (!existingCode) {
          break;
        }

        attempts++;
      }

      if (attempts >= maxAttempts) {
        failed++;
        continue;
      }

      try {
        // 创建兑换码
        await createRedeemCode({
          code: codeString,
          type,
          reward,
          usageLimit,
          expireAt,
          batchId,
          createdBy,
        });

        generatedCodes.push(codeString);
        successful++;
      } catch (error) {
        console.error(`创建兑换码 ${codeString} 失败:`, error);
        failed++;
      }
    }

    return { codes: generatedCodes, successful, failed };
  } catch (error) {
    console.error('批量生成兑换码失败:', error);
    throw error instanceof Error ? error : new Error('批量生成兑换码失败');
  }
}

export async function createUser({
  email,
  password,
  name = email.split('@')[0], // Default name from email
  phone = '',
  avatar = '',
  plan = 'free',
}: {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  avatar?: string;
  plan?: 'free' | 'pro' | 'enterprise';
}) {
  // Input validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  try {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1)
      .then((rows) => rows[0]);

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    // Create user with default values
    const newUserData: NewUser = {
      email,
      password: hash,
      name,
      phone,
      avatar,
      plan,
      emailVerified: false,
      usageLimit: plan === 'free' ? 100 : plan === 'pro' ? 1000 : 10000,
      usageCurrent: 0,
    };

    const [newUser] = await db.insert(user).values(newUserData).returning();

    // Omit sensitive data from return value
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword as Omit<typeof newUser, 'password'>;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error instanceof Error ? error : new Error('Failed to create user');
  }
}
