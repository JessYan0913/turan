import type { InferSelectModel } from 'drizzle-orm';
import { boolean, index, integer, jsonb, numeric, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

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
    completedAt: timestamp('completed_at'),
    predictTime: numeric('predict_time', { precision: 10, scale: 9 }),
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

// 定义操作类型
export type OperationType = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'OTHER';

// 定义操作状态
export type OperationStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'CANCELLED';

// 操作日志表
export const operationLogTable = pgTable(
  'operation_log',
  {
    // 基础信息
    id: varchar('id', { length: 64 })
      .primaryKey()
      .notNull()
      .$defaultFn(() => nanoid()),

    // 操作信息
    operationName: varchar('operation_name', { length: 100 }).notNull(),
    operationType: varchar('operation_type', { length: 20 }).notNull().$type<OperationType>(),
    operationModule: varchar('operation_module', { length: 50 }),
    operationDesc: text('operation_desc'),

    // 请求信息
    method: varchar('method', { length: 10 }).notNull(),
    path: varchar('path', { length: 255 }).notNull(),
    query: jsonb('query').default({}),
    params: jsonb('params').default({}),
    body: jsonb('body'),

    // 响应信息
    status: varchar('status', { length: 20 }).notNull().$type<OperationStatus>().default('PENDING'),
    response: jsonb('response').default({}),
    error: jsonb('error').default({}),

    // 用户信息 - 不使用外键约束，允许记录不存在的用户ID（如已删除用户）
    userId: uuid('user_id'),

    // 系统信息
    ip: varchar('ip', { length: 45 }),

    // 时间信息
    startTime: timestamp('start_time', { withTimezone: true }).notNull(),
    endTime: timestamp('end_time', { withTimezone: true }),

    // 元数据
    metadata: jsonb('metadata').default({}),

    // 审计字段
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('operation_log_user_id_idx').on(table.userId),
    index('operation_log_operation_type_idx').on(table.operationType),
    index('operation_log_operation_module_idx').on(table.operationModule),
    index('operation_log_status_idx').on(table.status),
    index('operation_log_created_at_idx').on(table.createdAt),
  ]
);

export type OperationLog = InferSelectModel<typeof operationLogTable>;

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
