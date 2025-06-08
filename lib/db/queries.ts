'use server';

import { genSaltSync, hashSync } from 'bcrypt-ts';
import type { InferInsertModel } from 'drizzle-orm';
import { and, desc, eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import {
  type Prediction,
  prediction,
  type PredictionStatus,
  type User,
  user,
  type Work,
  work,
  type WorkStatus,
  type WorkType,
} from './schema';

type NewWork = Omit<Work, 'id' | 'createdAt' | 'updatedAt'>;

type NewPrediction = Omit<Prediction, 'id' | 'createdAt' | 'updatedAt' | 'startedAt' | 'completedAt'> & {
  output: any | null;
  error: any | null;
  logs: string | null;
  metrics: Record<string, any>;
  webhook: string | null;
  webhookEventsFilter: string[] | null;
};

type NewUser = Omit<InferInsertModel<typeof user>, 'id' | 'createdAt' | 'updatedAt'>;

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function getUser(email: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
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
  status?: WorkStatus;
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
  status,
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
          type ? eq(work.type, type) : undefined,
          status ? eq(work.status, status) : undefined
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
          type ? eq(work.type, type) : undefined,
          status ? eq(work.status, status) : undefined
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

export interface CreateWorkInput {
  title: string;
  type: WorkType;
  originalImage: string;
  processedImage: string;
  style: string;
  metadata?: Record<string, unknown>;
}

export async function createWork(data: CreateWorkInput, userId: string): Promise<Work> {
  try {
    const newWorkData = {
      ...data,
      userId,
      status: 'processing' as const,
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
    const result = await db.delete(work).where(and(eq(work.id, id), eq(work.userId, userId)));

    if (!result || (Array.isArray(result) && result.length === 0)) {
      throw new Error('Work not found or access denied');
    }
  } catch (error) {
    console.error('Failed to delete work:', error);
    throw error instanceof Error ? error : new Error('Failed to delete work');
  }
}

export async function updateWorkStatus(
  id: string,
  userId: string,
  status: WorkStatus,
  processedImage?: string
): Promise<Work> {
  try {
    const updateData: Partial<Work> = {
      status,
      updatedAt: new Date(),
    };

    if (processedImage) {
      updateData.processedImage = processedImage;
    }

    const [updatedWork] = await db
      .update(work)
      .set(updateData)
      .where(and(eq(work.id, id), eq(work.userId, userId)))
      .returning();

    if (!updatedWork) {
      throw new Error('Work not found or access denied');
    }

    return updatedWork;
  } catch (error) {
    console.error('Failed to update work status:', error);
    throw error instanceof Error ? error : new Error('Failed to update work status');
  }
}

// Prediction related queries
export interface GetPredictionsOptions {
  workId: string;
  status?: PredictionStatus;
  model?: string;
  limit?: number;
  offset?: number;
}

export interface PaginatedPredictions {
  items: Prediction[];
  total: number;
  hasMore: boolean;
}

export async function getPredictions({
  workId,
  status,
  model,
  limit = 10,
  offset = 0,
}: GetPredictionsOptions): Promise<PaginatedPredictions> {
  try {
    const whereConditions = [
      eq(prediction.workId, workId),
      ...(status ? [eq(prediction.status, status)] : []),
      ...(model ? [eq(prediction.model, model)] : []),
    ];

    const [predictions, total] = await Promise.all([
      db
        .select()
        .from(prediction)
        .where(and(...whereConditions))
        .orderBy(desc(prediction.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(prediction)
        .where(and(...whereConditions)),
    ]);

    return {
      items: predictions,
      total: Number(total[0]?.count || 0),
      hasMore: offset + predictions.length < Number(total[0]?.count || 0),
    };
  } catch (error) {
    console.error('Failed to fetch predictions:', error);
    throw new Error('Failed to fetch predictions');
  }
}

export async function getPredictionById(id: string): Promise<Prediction | undefined> {
  try {
    const [result] = await db.select().from(prediction).where(eq(prediction.id, id));
    return result;
  } catch (error) {
    console.error('Failed to fetch prediction by ID:', error);
    throw new Error('Failed to fetch prediction');
  }
}

export interface CreatePredictionInput {
  workId: string;
  model: string;
  version: string;
  input: object;
  source: 'api' | 'web';
  webhook?: string;
  webhookEventsFilter?: string[];
  urls: {
    get: string;
    cancel: string;
    stream?: string;
  };
}

export async function createPrediction(data: CreatePredictionInput): Promise<Prediction> {
  try {
    const newPrediction: Omit<Prediction, 'id' | 'createdAt' | 'updatedAt'> = {
      ...data,
      status: 'starting',
      output: null,
      error: null,
      logs: null,
      metrics: {},
      startedAt: null,
      completedAt: null,
      webhook: data.webhook || null,
      webhookEventsFilter: data.webhookEventsFilter || null,
    };

    const [result] = await db
      .insert(prediction)
      .values({
        id: crypto.randomUUID(),
        ...newPrediction,
      })
      .returning();
    return result;
  } catch (error) {
    console.error('Failed to create prediction:', error);
    throw new Error('Failed to create prediction');
  }
}

export async function updatePrediction(
  id: string,
  updates: Partial<{
    status: PredictionStatus;
    output: any;
    error: any;
    logs: string;
    metrics: Record<string, any>;
    startedAt: Date;
    completedAt: Date;
  }>
): Promise<Prediction> {
  try {
    const [result] = await db
      .update(prediction)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(prediction.id, id))
      .returning();

    if (!result) {
      throw new Error('Prediction not found');
    }

    return result;
  } catch (error) {
    console.error('Failed to update prediction:', error);
    throw new Error('Failed to update prediction');
  }
}

export async function deletePrediction(id: string): Promise<void> {
  try {
    await db.delete(prediction).where(eq(prediction.id, id));
  } catch (error) {
    console.error('Failed to delete prediction:', error);
    throw new Error('Failed to delete prediction');
  }
}

export async function updatePredictionStatus(
  id: string,
  status: PredictionStatus,
  updates: Partial<{
    output: any;
    error: any;
    logs: string;
    metrics: Record<string, any>;
  }> = {}
): Promise<Prediction> {
  try {
    const updateData: any = {
      status,
      ...updates,
      updatedAt: new Date(),
    };

    if (['succeeded', 'failed', 'canceled'].includes(status)) {
      updateData.completedAt = new Date();
    }

    if (status === 'processing' && !updates.metrics?.startedAt) {
      updateData.startedAt = new Date();
    }

    const [result] = await db.update(prediction).set(updateData).where(eq(prediction.id, id)).returning();

    if (!result) {
      throw new Error('Prediction not found');
    }

    return result;
  } catch (error) {
    console.error('Failed to update prediction status:', error);
    throw new Error('Failed to update prediction status');
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
