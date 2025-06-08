import type { InferSelectModel } from 'drizzle-orm';
import { boolean, index, integer, jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { nanoid } from '@/lib/utils';

export const user = pgTable(
  'user',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 64 }).notNull().unique(),
    password: varchar('password', { length: 256 }),
    phone: varchar('phone', { length: 20 }),
    bio: text(),
    avatar: text(),
    joinDate: timestamp('join_date').notNull().defaultNow(),
    plan: varchar('plan', { length: 20 }).default('free'),
    planExpiry: timestamp('plan_expiry'),
    usageLimit: integer('usage_limit').default(100),
    usageCurrent: integer('usage_current').default(0),
    favoriteStyle: varchar('favorite_style', { length: 50 }),
    lastActive: timestamp('last_active'),
    emailVerified: boolean('email_verified').default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    emailIdx: index('user_email_idx').on(table.email),
    planIdx: index('user_plan_idx').on(table.plan),
  })
);

export type User = InferSelectModel<typeof user> & {
  // Additional computed properties can be added here if needed
  planInfo?: {
    name: string;
    limit: number;
    used: number;
    expiry?: Date;
  };
};

// 定义作品类型
export type WorkType = 'style-transfer' | 'avatar' | 'edit' | 'other';

// 定义作品状态
export type WorkStatus = 'processing' | 'completed' | 'failed';

// 定义作品表结构
export const work = pgTable(
  'work',
  {
    id: varchar('id', { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    title: varchar('title', { length: 255 }).notNull(),
    type: varchar('type', {
      enum: ['style-transfer', 'avatar', 'edit', 'other'],
    }).notNull(),
    originalImage: text('original_image').notNull(),
    processedImage: text('processed_image').notNull(),
    style: varchar('style', { length: 100 }).notNull(),
    status: varchar('status', {
      enum: ['processing', 'completed', 'failed'],
    })
      .notNull()
      .default('processing'),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    metadata: jsonb('metadata').default({}),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('work_user_id_idx').on(table.userId),
    index('work_type_idx').on(table.type),
    index('work_status_idx').on(table.status),
    index('work_created_at_idx').on(table.createdAt),
  ]
);

export type Work = InferSelectModel<typeof work>;

// Define Prediction status types
export type PredictionStatus = 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';

export const prediction = pgTable(
  'prediction',
  {
    id: varchar('id', { length: 191 }).primaryKey().notNull(),
    status: varchar('status', {
      enum: ['starting', 'processing', 'succeeded', 'failed', 'canceled'],
    }).notNull(),
    model: varchar('model', { length: 255 }).notNull(),
    version: varchar('version', { length: 100 }).notNull(),
    input: jsonb('input').notNull(),
    output: jsonb('output'),
    source: varchar('source', { enum: ['api', 'web'] }).notNull(),
    error: jsonb('error'),
    logs: text('logs'),
    metrics: jsonb('metrics').default({}),
    webhook: text('webhook'),
    webhookEventsFilter: jsonb('webhook_events_filter'),
    urls: jsonb('urls').notNull(),
    workId: varchar('work_id', { length: 191 }).references(() => work.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    startedAt: timestamp('started_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('prediction_work_id_idx').on(table.workId),
    index('prediction_status_idx').on(table.status),
    index('prediction_created_at_idx').on(table.createdAt),
    index('prediction_model_idx').on(table.model),
  ]
);

export type Prediction = InferSelectModel<typeof prediction> & {
  // Additional computed properties or relations can be added here
};
