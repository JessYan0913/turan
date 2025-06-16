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

// 更新用户积分（增加积分）
export async function addUserPoints(userId: string, points: number): Promise<User> {
  try {
    // 获取当前用户
    const currentUser = await getUserById(userId);
    if (!currentUser) {
      throw new Error('用户不存在');
    }

    // 更新用户当前积分
    const [updatedUser] = await db
      .update(user)
      .set({
        usageCurrent: (currentUser.usageCurrent || 0) + points,
      })
      .where(eq(user.id, userId))
      .returning();

    return updatedUser;
  } catch (error) {
    console.error('更新用户积分失败', error);
    throw error;
  }
}

// 消耗用户积分
export async function consumeUserPoints(
  userId: string,
  points: number
): Promise<{
  success: boolean;
  message: string;
  user?: User;
}> {
  try {
    // 获取当前用户
    const currentUser = await getUserById(userId);
    if (!currentUser) {
      return { success: false, message: '用户不存在' };
    }

    // 检查积分是否足够
    if ((currentUser.usageCurrent || 0) < points) {
      return { success: false, message: '积分不足' };
    }

    // 更新用户积分
    const [updatedUser] = await db
      .update(user)
      .set({
        usageCurrent: (currentUser.usageCurrent || 0) - points,
      })
      .where(eq(user.id, userId))
      .returning();

    return {
      success: true,
      message: `成功消耗${points}积分`,
      user: updatedUser,
    };
  } catch (error) {
    console.error('消耗用户积分失败', error);
    return { success: false, message: '消耗积分失败：' + (error instanceof Error ? error.message : '未知错误') };
  }
}

// Work related queries
export interface GetWorksOptions {
  userId: string;
  searchTerm?: string;
  type?: WorkType;
  limit?: number;
  offset?: number;
}

export interface PaginatedWorks {
  items: Work[];
  total: number;
  hasMore: boolean;
}

export async function getWorks({
  userId,
  searchTerm = '',
  type,
  limit = 10,
  offset = 0,
}: GetWorksOptions): Promise<PaginatedWorks> {
  try {
    const query = db
      .select()
      .from(work)
      .where(
        and(
          eq(work.userId, userId),
          searchTerm
            ? sql`LOWER(${work.title}) LIKE ${`%${searchTerm.toLowerCase()}%`} OR 
               LOWER(${work.style}) LIKE ${`%${searchTerm.toLowerCase()}%`}`
            : undefined,
          type ? eq(work.type, type) : undefined
        )
      )
      .orderBy(desc(work.createdAt))
      .limit(limit + 1) // Fetch one extra to check if there are more
      .offset(offset);

    const works = await query;

    const hasMore = works.length > limit;
    const items = hasMore ? works.slice(0, -1) : works;

    // Get total count for pagination
    const countQuery = await db
      .select({ count: sql<number>`count(*)` })
      .from(work)
      .where(
        and(
          eq(work.userId, userId),
          searchTerm
            ? sql`LOWER(${work.title}) LIKE ${`%${searchTerm.toLowerCase()}%`} OR 
               LOWER(${work.style}) LIKE ${`%${searchTerm.toLowerCase()}%`}`
            : undefined,
          type ? eq(work.type, type) : undefined
        )
      )
      .then((rows) => rows[0]?.count || 0);

    return {
      items,
      total: Number(countQuery),
      hasMore,
    };
  } catch (error) {
    console.error('Failed to fetch works:', error);
    throw new Error('Failed to fetch works');
  }
}

export async function getWorkById(id: string, userId: string): Promise<Work | undefined> {
  try {
    const [result] = await db
      .select()
      .from(work)
      .where(and(eq(work.id, id), eq(work.userId, userId)))
      .limit(1);

    return result;
  } catch (error) {
    console.error('Failed to get work by id:', error);
    throw new Error('Failed to get work');
  }
}

export async function getUserWorksCount(userId: string): Promise<number> {
  try {
    const result = await db.select({ count: count() }).from(work).where(eq(work.userId, userId));

    return result[0]?.count || 0;
  } catch (error) {
    console.error('Failed to get user works count', error);
    throw error;
  }
}

export async function getUserWorksThisMonthCount(userId: string): Promise<number> {
  try {
    const startOfCurrentMonth = startOfMonth(new Date());

    const result = await db
      .select({ count: count() })
      .from(work)
      .where(and(eq(work.userId, userId), gte(work.createdAt, startOfCurrentMonth)));

    return result[0]?.count || 0;
  } catch (error) {
    console.error('Failed to get user works this month count', error);
    throw error;
  }
}

export async function getUserTotalProcessingTime(userId: string): Promise<string> {
  try {
    const result = await db
      .select({ total: sum(work.predictTime) })
      .from(work)
      .where(eq(work.userId, userId));

    const totalSeconds = Number(result[0]?.total || 0);
    if (totalSeconds < 60) {
      return `${Math.round(totalSeconds)}s`; // Show seconds if less than a minute
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours === 0) {
      return `${minutes}m`;
    }

    return `${hours}h ${minutes}m`;
  } catch (error) {
    console.error('Failed to get user total processing time', error);
    throw error;
  }
}

export async function getUserUsedWorkTypesCount(userId: string): Promise<number> {
  try {
    const result = await db
      .select({
        count: sql<number>`count(distinct ${work.type})::int`,
      })
      .from(work)
      .where(eq(work.userId, userId));

    return result[0]?.count || 0;
  } catch (error) {
    console.error('Failed to get user used work types count', error);
    throw error;
  }
}

export interface CreateWorkInput {
  title: string;
  type: WorkType;
  prompt: string;
  originalImage?: string;
  processedImage?: string;
  style?: string;
  metadata?: Record<string, unknown> | Array<Record<string, unknown>>;
  createdAt?: Date;
  completedAt?: Date;
  predictTime?: string;
}

export async function createWork(data: CreateWorkInput, userId: string): Promise<Work> {
  try {
    const newWorkData = {
      ...data,
      userId,
    };

    const [newWork] = await db.insert(work).values(newWorkData).returning();

    return newWork;
  } catch (error) {
    console.error('Failed to create work:', error);
    throw new Error('Failed to create work');
  }
}

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

export async function deleteWork(id: string, userId: string): Promise<void> {
  try {
    await db.delete(work).where(and(eq(work.id, id), eq(work.userId, userId)));
  } catch (error) {
    console.error('Failed to delete work:', error);
    throw error instanceof Error ? error : new Error('Failed to delete work');
  }
}

// Operation Log related queries
export interface ListOperationLogsOptions {
  userId?: string;
  operationType?: OperationType;
  status?: OperationStatus;
  startDate?: Date;
  endDate?: Date;
  searchTerm?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'asc' | 'desc';
}

export interface PaginatedOperationLogs {
  items: OperationLog[];
  total: number;
  hasMore: boolean;
}

export async function createOperationLog(data: Omit<OperationLog, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
  try {
    const insertData = {
      operationName: data.operationName,
      operationType: data.operationType,
      operationModule: data.operationModule,
      operationDesc: data.operationDesc,
      method: data.method,
      path: data.path,
      query: data.query,
      params: data.params,
      body: data.body,
      status: data.status,
      response: data.response,
      error: data.error,
      userId: data.userId,
      ip: data.ip,
      startTime: data.startTime,
      endTime: data.endTime,
      metadata: data.metadata,
    };

    await db.insert(operationLog).values(insertData);
  } catch (error) {
    console.error('🧨 Failed to insert operation log');
    console.error('Raw error:', error);

    const cause = (error as any)?.cause ?? (error as any)?.originalError;

    if (cause) {
      console.error('💥 Cause.message:', cause.message);
      console.error('💥 Cause.code:', cause.code);
      console.error('💥 Cause.detail:', cause.detail);
      console.error('💥 Cause.hint:', cause.hint);
    } else {
      console.warn('⚠️ No cause info found');
    }

    throw error;
  }
}

export async function getOperationLog(id: string): Promise<OperationLog | undefined> {
  try {
    const [log] = await db.select().from(operationLog).where(eq(operationLog.id, id));
    return log;
  } catch (error) {
    console.error('Failed to get operation log:', error);
    throw new Error('Failed to get operation log');
  }
}

export async function listOperationLogs({
  userId,
  operationType,
  status,
  startDate,
  endDate,
  searchTerm,
  limit = 20,
  offset = 0,
  orderBy = 'desc',
}: ListOperationLogsOptions = {}): Promise<PaginatedOperationLogs> {
  try {
    const conditions = [];
    if (userId) {
      conditions.push(eq(operationLog.userId, userId));
    }
    if (operationType) {
      conditions.push(eq(operationLog.operationType, operationType));
    }
    if (status) {
      conditions.push(eq(operationLog.status, status));
    }
    if (startDate) {
      conditions.push(gte(operationLog.startTime, startDate));
    }
    if (endDate) {
      conditions.push(sql`${operationLog.startTime} <= ${endDate}`);
    }

    if (searchTerm) {
      conditions.push(
        sql`LOWER(${operationLog.operationName}) LIKE ${`%${searchTerm.toLowerCase()}%`} OR 
            LOWER(${operationLog.operationModule || ''}) LIKE ${`%${searchTerm.toLowerCase()}%`}`
      );
    }

    // Get the logs
    const logs = await db
      .select()
      .from(operationLog)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(orderBy === 'desc' ? desc(operationLog.startTime) : operationLog.startTime)
      .limit(limit + 1) // Fetch one extra to check if there are more
      .offset(offset);

    const hasMore = logs.length > limit;
    const items = hasMore ? logs.slice(0, -1) : logs;

    // Get total count for pagination
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(operationLog)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .then((rows) => rows[0]?.count || 0);

    return {
      items,
      total: Number(countResult),
      hasMore,
    };
  } catch (error) {
    console.error('Failed to list operation logs:', error);
    throw new Error('Failed to list operation logs');
  }
}

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

    // 检查用户是否已经使用过此兑换码（如果是一次性码）
    if (code.usageLimit === 1) {
      const usageCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(redeemCodeUsage)
        .where(
          and(
            eq(redeemCodeUsage.code, codeString),
            eq(redeemCodeUsage.userId, userId),
            eq(redeemCodeUsage.result, 'success')
          )
        )
        .then((rows) => Number(rows[0]?.count || 0));

      if (usageCount > 0) {
        await logRedeemAttempt({
          code: codeString,
          userId,
          ipAddress,
          userAgent,
          result: 'used_up',
          message: '您已使用过此兑换码',
        });
        return { success: false, result: 'used_up', message: '您已使用过此兑换码' };
      }
    }

    // 应用奖励
    // 注意：这里只记录兑换成功，实际的奖励应用逻辑应在业务层处理
    // 例如：更新用户积分、延长会员时间等

    // 更新兑换码使用次数
    await db
      .update(redeemCode)
      .set({ usedCount: (code.usedCount ?? 0) + 1 })
      .where(eq(redeemCode.code, codeString));

    // 记录兑换成功
    await logRedeemAttempt({
      code: codeString,
      userId,
      ipAddress,
      userAgent,
      result: 'success',
      message: '兑换成功',
    });

    return {
      success: true,
      result: 'success',
      message: '兑换成功',
      reward: code.reward as Record<string, any>,
    };
  } catch (error) {
    console.error('兑换码使用失败:', error);
    await logRedeemAttempt({
      code: codeString,
      userId,
      ipAddress,
      userAgent,
      result: 'invalid', // 使用有效的 RedeemResultType
      message: '系统错误',
    });
    throw error instanceof Error ? error : new Error('兑换码使用失败');
  }
}

// 记录兑换码使用记录
async function logRedeemAttempt(data: {
  code: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
  result: RedeemResultType;
  message: string;
}): Promise<void> {
  try {
    await db.insert(redeemCodeUsage).values({
      code: data.code,
      userId: data.userId,
      ipAddress: data.ipAddress, // 修正字段名称与schema匹配
      userAgent: data.userAgent,
      result: data.result,
      message: data.message,
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
