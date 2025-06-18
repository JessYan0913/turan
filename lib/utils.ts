import { type ClassValue, clsx } from 'clsx';
import { createHmac, timingSafeEqual } from 'crypto';
import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ApplicationError extends Error {
  info: string;
  status: number;
}

export function getClientIp(request: Request): string {
  const xRealIp = request.headers.get('x-real-ip');
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xRealIp) return xRealIp;
  if (xForwardedFor) return xForwardedFor.split(',')[0].trim();
  return 'unknown';
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    年: 31536000,
    个月: 2592000,
    周: 604800,
    天: 86400,
    小时: 3600,
    分钟: 60,
    秒: 1,
  } as const;

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval}${unit}前`;
    }
  }

  return '刚刚';
}

/**
 * Fetches style options from the API
 * @param url API endpoint URL
 * @returns Promise with style options data
 */
export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as ApplicationError;

    error.info = await res.json();
    error.status = res.status;

    throw error;
  }

  return res.json();
};

export const WEBHOOK_HOST = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NGROK_HOST;

/**
 * 从URL下载图片
 * @param imageUrl 图片URL
 * @param filename 保存的文件名
 * @returns Promise<void>
 */
export async function downloadImage(imageUrl: string, filename?: string): Promise<void> {
  try {
    // 获取图片并转换为blob
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const blob = await response.blob();

    // 创建一个临时的blob URL
    const blobUrl = URL.createObjectURL(blob);

    // 创建下载链接
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'downloaded-image.png';
    document.body.appendChild(link);
    link.click();

    // 清理
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
  } catch (error) {
    console.error('下载图片失败:', error);
    throw new Error('Failed to download image');
  }
}

export function verifyWebhookSignature(signedContent: string, signatures: string): boolean {
  try {
    const signingSecret = process.env.REPLICATE_WEBHOOK_SIGNING_SECRET;
    if (!signingSecret) {
      console.error('Missing webhook signing secret');
      return false;
    }
    // Get the secret key (remove 'whsec_' prefix if present)
    const secretKey = signingSecret.split('_')[1];
    const secretBytes = Buffer.from(secretKey, 'base64');

    // Calculate the HMAC signature
    const computedSignature = createHmac('sha256', secretBytes).update(signedContent).digest('base64');

    // Parse the webhook signatures (can be multiple space-separated)
    const expectedSignatures = signatures.split(' ').map((sig) => sig.split(',')[1]);

    const isValid = expectedSignatures.some((expectedSig) =>
      timingSafeEqual(Buffer.from(expectedSig), Buffer.from(computedSignature))
    );
    return isValid;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}
