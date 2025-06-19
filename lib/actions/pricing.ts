'use server';

import baseX from 'base-x';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';

import { db } from '@/lib/db/client';
import { redemptionRecordTable } from '@/lib/db/schema';

export type PlanId = 'free' | 'pro' | 'enterprise' | 'basic';

export type PlanPeriod = 'Month' | 'Year';

export interface Plan {
  id: PlanId;
  price: string;
  period: PlanPeriod;
  points: number;
  features: string[];
  limitations?: string[];
  popular: boolean;
}

export const getPlans = async (): Promise<Plan[]> => {
  return [
    {
      id: 'free',
      price: '¥0',
      period: 'Month',
      points: 30,
      features: [
        '30 credits per montxh',
        'Generate Image: 1 credit per image',
        'Image Edit/Style Transform: 15 credits per operation',
        'Standard quality output',
        'Community support',
        'Watermark output',
      ],
      limitations: ['Limited processing speed', 'Basic features only', 'Credits expire monthly'],
      popular: false,
    },
    {
      id: 'basic',
      price: '¥19',
      period: 'Month',
      points: 300,
      features: [
        '300 credits per month',
        'Generate Image: 1 credit per image',
        'Image Edit/Style Transform: 15 credits per operation',
        'High quality output',
        'Normal processing speed',
        'No watermark',
        'Email support',
      ],
      popular: true,
    },
    {
      id: 'pro',
      price: '¥49',
      period: 'Month',
      points: 1000,
      features: [
        '1000 credits per month',
        'Generate Image: 1 credit per image',
        'Image Edit/Style Transform: 15 credits per operation',
        'High quality output',
        'Priority processing',
        'Batch processing (up to 10 images)',
        'API access',
        'Email support',
      ],
      popular: false,
    },
    {
      id: 'enterprise',
      price: '¥99',
      period: 'Month',
      points: 2500,
      features: [
        '2500 credits per month',
        'Generate Image: 1 credit per image',
        'Image Edit/Style Transform: 15 credits per operation',
        '4K ultra HD output',
        'Exclusive processing server',
        'Batch processing (unlimited)',
        'Team collaboration features',
        'Complete API suite',
        'Dedicated customer support',
        'SLA guarantee',
      ],
      popular: false,
    },
  ];
};

export const decryptionRedeemCode = async (code: string): Promise<Plan> => {
  try {
    const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const base62 = baseX(BASE62);

    const SECRET = crypto.scryptSync(process.env.REDEEM_CODE_SECRET as string, 'turan', 32);
    const encrypted = base62.decode(code);

    const decipher = crypto.createDecipheriv('aes-256-ecb', SECRET, null);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const packageId = decrypted[0];
    const plan = (await getPlans())[packageId];
    return plan;
  } catch (error) {
    throw new Error(error as string);
  }
};

export async function validationRedeemCode(redeemCode: string): Promise<Plan> {
  const plan = await decryptionRedeemCode(redeemCode);
  const [record] = await db.select().from(redemptionRecordTable).where(eq(redemptionRecordTable.code, redeemCode));
  if (record) {
    throw new Error('兑换码已使用');
  }
  return plan;
}
