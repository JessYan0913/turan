'use server';

import { genSaltSync, hashSync } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { signIn } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { userTable } from '@/lib/db/schema';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface LoginActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
}

export const login = async (_: LoginActionState, formData: FormData): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const result = await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
      callbackUrl: '/', // 设置登录成功后的回调URL
    });

    if (result?.error) {
      return { status: 'failed' };
    }

    // 返回成功状态，页面组件会处理重定向
    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};

export interface RegisterActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'user_exists' | 'invalid_data';
}

export const register = async (_: RegisterActionState, formData: FormData): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const [user] = await db.select().from(userTable).where(eq(userTable.email, validatedData.email));

    if (user) {
      return { status: 'user_exists' } as RegisterActionState;
    }

    const salt = genSaltSync(10);
    const hash = hashSync(validatedData.password, salt);
    await db.insert(userTable).values({
      email: validatedData.email,
      password: hash,
      name: validatedData.email.split('@')[0],
      plan: 'free',
      planPoints: 30,
      points: 30,
      planExpiry: null,
      nextResetDate: null,
      subscriptionId: null,
      favoriteStyle: null,
      lastActive: null,
      emailVerified: false,
      metadata: {},
    });
    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};
