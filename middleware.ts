import { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import { createI18nMiddleware } from 'next-international/middleware';

import { authConfig } from '@/lib/auth/config';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ja', 'zh'],
  defaultLocale: 'en',
});

export default NextAuth(authConfig).auth((request: NextRequest) => {
  return I18nMiddleware(request);
});

export const config = {
  matcher: ['/', '/login', '/register', '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
