'use server';

import { genSaltSync, hashSync } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { signIn } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { user } from '@/lib/db/schema';

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

    const [userInfo] = await db.select().from(user).where(eq(user.email, validatedData.email));

    if (userInfo) {
      return { status: 'user_exists' } as RegisterActionState;
    }

    const salt = genSaltSync(10);
    const hash = hashSync(validatedData.password, salt);
    await db.insert(user).values({
      email: validatedData.email,
      password: hash,
      name: validatedData.email.split('@')[0],
      plan: 'free',
      usageLimit: 30,
      usageCurrent: 0,
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
