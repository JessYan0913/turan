import Script from 'next/script';
import type React from 'react';

import { Navigation } from '@/components/navigation';
import { auth } from '@/lib/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div className="flex min-h-screen flex-col">
      <Script src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js" strategy="beforeInteractive" />
      <Navigation user={session?.user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
