import type { InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { nanoid } from '@/lib/utils';

export const userTable = pgTable(
  'user',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 64 }).notNull().unique(),
    password: varchar('password', { length: 256 }),
    phone: varchar('phone', { length: 20 }),
    bio: text(),
    avatar: text(),
    points: integer('points').default(0).notNull(),
    plan: varchar('plan', { length: 20 }).default('free'),
    planExpiry: timestamp('plan_expiry'),
    subscriptionId: varchar('subscription_id', { length: 128 }),
    usageLimit: integer('usage_limit').default(100),
    usageCurrent: integer('usage_current').default(0),
    favoriteStyle: varchar('favorite_style', { length: 50 }),
    lastActive: timestamp('last_active'),
    emailVerified: boolean('email_verified').default(false),
    metadata: jsonb('metadata').default({}),
    joinDate: timestamp('join_date').notNull().defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('user_email_idx').on(table.email),
    index('user_plan_idx').on(table.plan),
    index('user_points_idx').on(table.points),
  ]
);

export type User = InferSelectModel<typeof userTable> & {
  // Additional computed properties can be added here if needed
  planInfo?: {
    name: string;
    limit: number;
    used: number;
    expiry?: Date;
  };
  // 套餐订阅信息
  planSubscription?: {
    plan: 'basic' | 'pro' | 'enterprise';
    monthlyPoints: number;
    startDate: string;
    endDate: string;
    redeemCode: string;
    nextResetDate: string;
  };
};

// 定义作品类型
export type WorkType = 'style-transfer' | 'avatar' | 'edit' | 'generate' | 'other';

// 定义作品状态
export type WorkStatus = 'processing' | 'completed' | 'failed';

// Define Prediction status enum
export const predictionStatusEnum = pgEnum('prediction_status', [
  'starting',
  'processing',
  'succeeded',
  'failed',
  'canceled',
]);

// Prediction model based on Replicate's Prediction interface
export const predictionTable = pgTable(
  'prediction',
  {
    id: varchar('id', { length: 191 }).primaryKey().notNull(),
    status: predictionStatusEnum('status').notNull(),
    model: varchar('model', { length: 255 }).notNull(),
    version: varchar('version', { length: 100 }).notNull(),
    input: jsonb('input').notNull(),
    output: jsonb('output'),
    source: varchar('source', { length: 10 }).notNull().default('api'),
    error: jsonb('error'),
    logs: text('logs'),
    metrics: jsonb('metrics'),
    webhook: text('webhook'),
    webhookEventsFilter: jsonb('webhook_events_filter'),
    urls: jsonb('urls').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    startedAt: timestamp('started_at'),
    completedAt: timestamp('completed_at'),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('prediction_status_idx').on(table.status), index('prediction_created_at_idx').on(table.createdAt)]
);

export type Prediction = InferSelectModel<typeof predictionTable>;

// 定义作品表结构
export const workTable = pgTable(
  'work',
  {
    id: varchar('id', { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    title: varchar('title', { length: 255 }).notNull(),
    type: varchar('type', {
      enum: ['style-transfer', 'avatar', 'edit', 'generate', 'other'],
    }).notNull(),
    prompt: text('prompt').notNull().default(''),
    originalImage: text('original_image').default(''),
    processedImage: text('processed_image').default(''),
    style: varchar('style', { length: 100 }).default(''),
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    metadata: jsonb('metadata').default({}),
    predictionId: varchar('prediction_id', { length: 191 }).references(() => predictionTable.id, {
      onDelete: 'set null',
    }),
    completedAt: timestamp('completed_at'),
    predictTime: numeric('predict_time', { precision: 10, scale: 9 }),
    points: integer('points'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('work_user_id_idx').on(table.userId),
    index('work_type_idx').on(table.type),
    index('work_created_at_idx').on(table.createdAt),
    index('work_completed_at_idx').on(table.completedAt),
  ]
);

export type Work = InferSelectModel<typeof workTable>;

// 定义交易类型
export type TransactionType = 'redeem_code' | 'payment' | 'refund' | 'adjustment';

// 定义交易状态
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded';

// 交易记录表
export const transactionTable = pgTable(
  'transaction',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 32 }).notNull().$type<TransactionType>(),
    amount: integer('amount').notNull(), // 正数表示收入，负数表示支出
    workId: varchar('work_id', { length: 191 }).references(() => workTable.id, { onDelete: 'set null' }),
    status: varchar('status', { length: 32 }).notNull().$type<TransactionStatus>().default('completed'),
    metadata: jsonb('metadata').default({}), // 存储额外信息，如JWT内容、支付信息等
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('transaction_user_id_idx').on(table.userId),
    index('transaction_type_idx').on(table.type),
    index('transaction_status_idx').on(table.status),
    index('transaction_created_at_idx').on(table.createdAt),
  ]
);

export type Transaction = InferSelectModel<typeof transactionTable>;

// 兑换记录表（替换原有的redeemCodeUsage）
export const redemptionRecordTable = pgTable(
  'redemption_record',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    code: varchar('code', { length: 255 }).notNull(), // 原始兑换码
    type: varchar('type', { length: 32 }).notNull(), // 兑换类型
    reward: jsonb('reward').notNull(), // 奖励详情
    transactionId: uuid('transaction_id').references(() => transactionTable.id),
    metadata: jsonb('metadata').default({}), // 存储JWT payload等原始数据
    redeemedAt: timestamp('redeemed_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('redemption_user_id_idx').on(table.userId),
    index('redemption_code_idx').on(table.code),
    index('redemption_redeemed_at_idx').on(table.redeemedAt),
  ]
);

export type RedemptionRecord = InferSelectModel<typeof redemptionRecordTable>;
