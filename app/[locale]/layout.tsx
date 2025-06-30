import '../globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { setStaticParamsLocale } from 'next-international/server';
import { ThemeProvider } from 'next-themes';
import type React from 'react';
import { Toaster } from 'sonner';

import { I18nProviderClient } from '@/locales/client';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '图然 Turan - AI图像生成与编辑平台',
  description: '每一次生成，都是用心呈现。使用AI技术进行图像编辑、风格转换和头像生成',
  generator: 'v0.dev',
};

export default async function RootLayout({
  children,
  params,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <I18nProviderClient locale={locale}>
          <ThemeProvider>
            <SessionProvider>
              <main className="min-h-[calc(100vh-4rem)]">{children}</main>
              <Toaster />
            </SessionProvider>
          </ThemeProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}
