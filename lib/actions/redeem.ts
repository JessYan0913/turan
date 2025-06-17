'use server';

import baseX from 'base-x';
import crypto from 'crypto';

export interface RedeemCodePayload {
  type: 's' | 'p';
  plan: 'p' | 'e';
  amount: number;
  validUntil: number;
}

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base62 = baseX(BASE62);

const SECRET = crypto.scryptSync(process.env.REDEEM_CODE_SECRET as string, 'salt', 32);

export const generateRedeemCode = async (payload: RedeemCodePayload) => {
  try {
    const raw = `${payload.type}:${payload.plan}:${payload.amount}:${payload.validUntil}:${crypto.randomBytes(3).toString('hex')}`;
    const rawBuffer = Buffer.from(raw, 'utf8');
    const cipher = crypto.createCipheriv('aes-256-ecb', SECRET, null);
    let encrypted = cipher.update(rawBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return { success: true, code: base62.encode(encrypted) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const validateRedeemCode = async (code: string) => {
  try {
    const encrypted = base62.decode(code);

    const decipher = crypto.createDecipheriv('aes-256-ecb', SECRET, null);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    const str = decrypted.toString('utf8');
    return {
      success: true,
      result: {
        type: str.split(':')[0],
        plan: str.split(':')[1],
        amount: str.split(':')[2],
        validUntil: str.split(':')[3],
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
