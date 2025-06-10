'use server';

import { put } from '@vercel/blob';
import { z } from 'zod';

import { nanoid } from '@/lib/utils';

// Type for GeneratedFile from ai package
interface GeneratedFile {
  base64: string;
  // Add other properties if needed
}

// 支持的文件类型
const SUPPORTED_FILE_TYPES = [
  'application/pdf',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/markdown',
  'image/jpeg',
  'image/png',
];

// 最大文件大小 (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// 文件验证模式
const FileSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: '文件大小不能超过 10MB',
    })
    .refine((file) => SUPPORTED_FILE_TYPES.includes(file.type), {
      message: `文件类型必须是以下之一: ${SUPPORTED_FILE_TYPES.join(', ')}`,
    }),
});

/**
 * 上传文件到 Vercel Blob 存储
 */
export async function uploadFileToBlobStorage(file: File) {
  const validatedFile = FileSchema.safeParse({ file });
  if (!validatedFile.success) {
    const errorMessage = validatedFile.error.errors.map((error) => error.message).join(', ');
    throw new Error(errorMessage);
  }

  // 获取文件信息
  const filename = file.name;
  const fileSize = file.size;
  const fileType = file.type;
  const fileBuffer = await file.arrayBuffer();

  try {
    // 上传到 Vercel Blob 存储
    const blobData = await put(`${Date.now()}-${filename}`, fileBuffer, {
      access: 'public',
    });

    // 直接返回blob数据，不再创建contentSource记录
    return {
      ...blobData,
      fileSize,
      fileType,
      filename,
    };
  } catch (error) {
    console.error('上传文件失败:', error);
    throw new Error('上传文件失败');
  }
}

/**
 * Upload a GeneratedFile (from ai package) to Vercel Blob storage
 */
export async function uploadGeneratedImageToBlobStorage(
  generatedFile: GeneratedFile,
  filename: string = 'generated-image.png'
) {
  try {
    // Extract base64 data (remove data URL prefix if present)
    const base64Data = generatedFile.base64.split(';base64,').pop() || '';
    const buffer = Buffer.from(base64Data, 'base64');

    // Upload to Vercel Blob storage
    const blobData = await put(`${Date.now()}-${filename}`, buffer, {
      access: 'public',
      contentType: 'image/png',
    });

    return {
      ...blobData,
      fileSize: buffer.byteLength,
      fileType: 'image/png',
      filename,
    };
  } catch (error) {
    console.error('上传生成图片失败:', error);
    throw new Error('上传生成图片失败');
  }
}

/**
 * Saves an online image to Vercel Blob storage
 * @param imageUrl The URL of the image to save
 * @param filename Optional custom filename (without extension)
 * @returns Promise with the URL of the saved image
 */
export async function saveOnlineImage(imageUrl: string, filename: string = nanoid()) {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Get the content type from the response or default to jpeg
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const fileExtension = contentType.split('/').pop() || 'jpg';
    const blobName = `${filename}.${fileExtension}`;

    // Convert the response to a buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Vercel Blob
    const blob = await put(blobName, buffer, {
      access: 'public',
      contentType,
    });

    return blob;
  } catch (error) {
    console.error('Error saving online image:', error);
    throw new Error('Failed to save online image');
  }
}
