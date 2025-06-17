'use server';

import baseX from 'base-x';
import crypto from 'crypto';

import { type PlanId, PLANS } from './config';

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base62 = baseX(BASE62);

const SECRET = crypto.scryptSync(process.env.REDEEM_CODE_SECRET as string, 'turan', 32);

export const generateRedeemCode = async (plan: Omit<PlanId, 'free'>) => {
  try {
    const planIndex = PLANS.findIndex((p) => p.id === plan);
    if (planIndex === -1) {
      return { success: false, error: 'Invalid plan' };
    }
    const r = crypto.randomBytes(4); // 4 字节扰动
    const p = Buffer.from([planIndex]); // 1 字节套餐 ID
    const payload = Buffer.concat([p, r]); // 5字节原文
    const cipher = crypto.createCipheriv('aes-256-ecb', SECRET, null);
    const encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);

    return { success: true, code: base62.encode(encrypted) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const validateRedeemCode = async (code: string) => {
  try {
    const encrypted = base62.decode(code);

    const decipher = crypto.createDecipheriv('aes-256-ecb', SECRET, null);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const packageId = decrypted[0];
    return {
      success: true,
      result: PLANS[packageId],
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
