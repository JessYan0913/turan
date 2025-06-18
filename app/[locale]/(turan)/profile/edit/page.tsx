import { eq } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import EditProfileForm from '@/components/edit-profile-form';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { user } from '@/lib/db/schema';
import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

export default async function ProfileEditPage() {
  const session = await auth();
  if (!session || !session.user?.email) {
    redirect('/login');
  }
  const [userInfo] = await db.select().from(user).where(eq(user.email, session.user.email));
  if (!userInfo) {
    redirect('/login');
  }
  const t = await getScopedI18n('profileEdit');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Back button and header */}
        <div className="flex items-center justify-between">
          <Link href="/profile" className={cn(buttonVariants({ variant: 'ghost' }), 'flex items-center gap-2')}>
            <ArrowLeft className="size-4" />
            {t('profile')}
          </Link>
        </div>

        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground mt-2">{t('description')}</p>
        </div>

        {/* Form card */}
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>{t('form.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <EditProfileForm userInfo={userInfo} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
