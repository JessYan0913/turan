// scripts/generate-redeem-codes.ts

import baseX from 'base-x';
import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';

// 加载 .env.local 文件
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base62 = baseX(BASE62);

// 添加默认值以防止未定义
const SECRET = crypto.scryptSync(process.env.REDEEM_CODE_SECRET || 'development-secret-key', 'turan', 32);

export const encryptionRedeemCode = async (plan: 'basic' | 'pro' | 'enterprise'): Promise<string> => {
  try {
    const planIndex = ['free', 'basic', 'pro', 'enterprise'].findIndex((p) => p === plan);
    if (planIndex === -1) {
      throw new Error('Invalid plan');
    }
    const r = crypto.randomBytes(4); // 4 字节扰动
    const p = Buffer.from([planIndex]); // 1 字节套餐 ID
    const payload = Buffer.concat([p, r]); // 5字节原文
    const cipher = crypto.createCipheriv('aes-256-ecb', SECRET, null);
    const encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);

    return base62.encode(encrypted);
  } catch (error: any) {
    throw error;
  }
};

async function generateRedeemCodes(plan: 'basic' | 'pro' | 'enterprise', count: number = 1): Promise<string[]> {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = await encryptionRedeemCode(plan);
    codes.push(code);
  }
  return codes;
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: tsx scripts/generate-redeem-codes.ts <plan> [count=1]');
  console.error('Example: tsx scripts/generate-redeem-codes.ts pro 5');
  process.exit(1);
}

const plan = args[0] as 'basic' | 'pro' | 'enterprise';
const count = args[1] ? parseInt(args[1], 10) : 1;

if (!['pro', 'enterprise', 'basic'].includes(plan)) {
  console.error('Invalid plan. Must be one of: pro, enterprise, basic');
  process.exit(1);
}

if (isNaN(count) || count < 1) {
  console.error('Count must be a positive number');
  process.exit(1);
}

// Generate and display codes
generateRedeemCodes(plan, count)
  .then((codes) => {
    console.log(`Generated ${codes.length} ${plan} redeem codes:`);
    console.log('-------------------');
    codes.forEach((code, index) => {
      console.log(`${index + 1}. ${code}`);
    });
    console.log('-------------------');
  })
  .catch((error) => {
    console.error('Error generating codes:', error);
    process.exit(1);
  });
