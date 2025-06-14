'use server';

import { genSaltSync, hashSync } from 'bcrypt-ts';
import { startOfMonth } from 'date-fns';
import type { InferInsertModel } from 'drizzle-orm';
import { and, count, desc, eq, gte, sql, sum } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import {
  type OperationLog,
  operationLog,
  type OperationStatus,
  type OperationType,
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
