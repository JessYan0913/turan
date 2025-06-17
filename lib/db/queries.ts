'use server';

import { genSaltSync, hashSync } from 'bcrypt-ts';
import type { InferInsertModel } from 'drizzle-orm';
import { and, eq, gte, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';
import { type OperationLog, operationLog, type User, user, type Work, work } from './schema';

type NewWork = Omit<Work, 'id' | 'createdAt' | 'updatedAt'>;

type NewUser = Omit<InferInsertModel<typeof user>, 'id' | 'createdAt' | 'updatedAt'>;

const client = postgres(process.env.POSTGRES_URL!);

// Create a properly typed database instance
export const db = drizzle(client, { schema });

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
