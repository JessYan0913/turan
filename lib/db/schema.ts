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
