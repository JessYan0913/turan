import type { InferSelectModel } from 'drizzle-orm';
import { boolean, index, integer, jsonb, numeric, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

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
  (table) => [index('user_email_idx').on(table.email), index('user_plan_idx').on(table.plan)]
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
export type WorkType = 'style-transfer' | 'avatar' | 'edit' | 'generate' | 'other';

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
      enum: ['style-transfer', 'avatar', 'edit', 'generate', 'other'],
    }).notNull(),
    prompt: text('prompt').notNull().default(''),
    originalImage: text('original_image').default(''),
    processedImage: text('processed_image').default(''),
    style: varchar('style', { length: 100 }).default(''),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
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

export type Work = InferSelectModel<typeof work>;

// 定义操作类型
export type OperationType = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'OTHER';

// 定义操作状态
export type OperationStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'CANCELLED';

// 操作日志表
export const operationLog = pgTable(
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

export type OperationLog = InferSelectModel<typeof operationLog>;

// 定义兑换码类型
export type RedeemCodeType = 'points' | 'subscription' | 'combo';

// 定义兑换码状态
export type RedeemCodeStatus = 'active' | 'expired' | 'disabled';

// 定义兑换结果
export type RedeemResultType = 'success' | 'expired' | 'invalid' | 'used_up';

// 兑换码批次表
export const redeemBatch = pgTable(
  'redeem_batch',
  {
    // 基础信息
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: varchar('name', { length: 128 }).notNull(),
    channel: varchar('channel', { length: 64 }),
    note: text('note'),

    // 审计字段
    createdBy: varchar('created_by', { length: 64 }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('redeem_batch_channel_idx').on(table.channel),
    index('redeem_batch_created_at_idx').on(table.createdAt),
  ]
);

export type RedeemBatch = InferSelectModel<typeof redeemBatch>;

// 兑换码表
export const redeemCode = pgTable(
  'redeem_code',
  {
    // 基础信息
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    code: varchar('code', { length: 32 }).notNull().unique(),

    // 奖励信息
    type: varchar('type', { length: 32 }).notNull().$type<RedeemCodeType>(),
    reward: jsonb('reward').notNull(), // 奖励详情，结构见文档

    // 使用限制
    usageLimit: integer('usage_limit').default(1),
    usedCount: integer('used_count').default(0),
    expireAt: timestamp('expire_at'),
    status: varchar('status', { length: 16 }).notNull().$type<RedeemCodeStatus>().default('active'),

    // 关联信息
    batchId: uuid('batch_id').references(() => redeemBatch.id),

    // 审计字段
    createdBy: varchar('created_by', { length: 64 }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('redeem_code_code_idx').on(table.code),
    index('redeem_code_type_idx').on(table.type),
    index('redeem_code_status_idx').on(table.status),
    index('redeem_code_batch_id_idx').on(table.batchId),
    index('redeem_code_expire_at_idx').on(table.expireAt),
  ]
);

export type RedeemCode = InferSelectModel<typeof redeemCode>;

// 兑换码使用记录表
export const redeemCodeUsage = pgTable(
  'redeem_code_usage',
  {
    // 基础信息
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    code: varchar('code', { length: 32 })
      .notNull()
      .references(() => redeemCode.code),

    // 使用信息
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id),
    usedAt: timestamp('used_at', { withTimezone: true }).notNull().defaultNow(),
    ipAddress: varchar('ip_address', { length: 64 }),
    userAgent: text('user_agent'),

    // 结果信息
    result: varchar('result', { length: 16 }).notNull().$type<RedeemResultType>(),
    message: text('message'),
  },
  (table) => [
    index('redeem_code_usage_code_idx').on(table.code),
    index('redeem_code_usage_user_id_idx').on(table.userId),
    index('redeem_code_usage_used_at_idx').on(table.usedAt),
    index('redeem_code_usage_result_idx').on(table.result),
  ]
);

export type RedeemCodeUsage = InferSelectModel<typeof redeemCodeUsage>;
