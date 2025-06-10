import { type ClassValue, clsx } from 'clsx';
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
