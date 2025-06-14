import { type NextRequest, type NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { createI18nMiddleware } from 'next-international/middleware';

import { auth } from '@/lib/auth';
import { authConfig } from '@/lib/auth/config';
import { createOperationLog } from '@/lib/db/queries';
import type { OperationStatus, OperationType } from '@/lib/db/schema';
import { nanoid } from '@/lib/utils';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ja', 'zh'],
  defaultLocale: 'en',
});

// Map URL paths to operation types
const PATH_TO_OPERATION: Record<string, { type: OperationType; name: string }> = {
  'avatar-generate': { type: 'CREATE', name: 'Avatar Generation' },
  'generate-image': { type: 'CREATE', name: 'Image Generation' },
  'image-edit': { type: 'UPDATE', name: 'Image Edit' },
  'style-transform': { type: 'UPDATE', name: 'Style Transform' },
} as const;

// OperationLog type is imported from queries

async function logOperation(
  request: NextRequest,
  response: Response,
  operationType: string,
  status: OperationStatus = 'SUCCESS'
): Promise<void> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return;

    const url = new URL(request.url);
    const ip =
      [request.headers.get('x-real-ip'), request.headers.get('x-forwarded-for')?.split(',')[0], 'unknown']
        .find(Boolean)
        ?.trim() || 'unknown';

    // Get the operation info from the path
    const operationInfo = Object.entries(PATH_TO_OPERATION).find(([path]) => url.pathname.includes(path))?.[1];

    if (operationInfo) {
      const userAgent = request.headers.get('user-agent') || '';
      const requestBody = request.body ? await request.text().catch(() => null) : null;
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - 100); // 100ms default duration

      await createOperationLog({
        userId,
        operationName: operationInfo.name,
        operationType: operationInfo.type,
        operationModule: 'API',
        operationDesc: `Operation: ${operationInfo.name}`,
        path: url.pathname,
        method: request.method,
        params: {},
        query: Object.fromEntries(url.searchParams.entries()),
        body: requestBody ? JSON.parse(requestBody) : {},
        status: status,
        response: { status: status === 'SUCCESS' ? 200 : 500 },
        error: status === 'FAILED' ? { message: 'Operation failed' } : null,
        username: session.user?.name || 'unknown',
        userRole: 'user',
        ip: ip,
        userAgent,
        startTime,
        endTime,
        duration: endTime.getTime() - startTime.getTime(),
        metadata: {
          originalUrl: request.url,
          referer: request.headers.get('referer') || '',
          responseSize: response.headers.get('content-length') || 0,
          responseType: response.headers.get('content-type') || 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Failed to log operation:', error);
    // Don't fail the request if logging fails
  }
}

export default NextAuth(authConfig).auth(async (request: NextRequest) => {
  // First run the i18n middleware
  const response = I18nMiddleware(request);

  // Check if this is an API request for a key operation
  const pathname = request.nextUrl.pathname;
  const operationMatch = Object.keys(PATH_TO_OPERATION).find((key) => pathname.includes(key));

  // If it's a key operation, log it
  if (operationMatch) {
    const operationType = PATH_TO_OPERATION[operationMatch as keyof typeof PATH_TO_OPERATION].type;

    // Clone the response so we can read it
    const responseClone = response.clone();

    // Log the operation in the background
    logOperation(
      request,
      responseClone,
      operationType.toUpperCase(),
      responseClone.status >= 400 ? 'FAILED' : 'SUCCESS'
    );
  }

  return response;
});

export const config = {
  matcher: ['/', '/login', '/register', '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
