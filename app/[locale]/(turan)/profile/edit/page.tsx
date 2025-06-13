import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import EditProfileForm from '@/components/edit-profile-form';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';

export default async function ProfileEditPage() {
  const session = await auth();
  if (!session || !session.user?.email) {
    redirect('/login');
  }
  const users = await getUser(session.user.email);
  if (!users.length) {
    notFound();
  }
  const userInfo = users[0];

  return (
    <div className="from-background to-muted/30 min-h-screen bg-gradient-to-b pb-12 pt-8 transition-colors duration-300">
      <div className="container mx-auto max-w-3xl px-4">
        {/* 页面头部 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Link
              href="/profile"
              className="text-muted-foreground bg-background hover:bg-muted/80 hover:text-foreground flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all"
            >
              <ArrowLeft className="size-4" />
              个人中心
            </Link>
          </div>
          <div className="mt-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">编辑个人信息</h1>
            <p className="text-muted-foreground mt-2">更新您的个人资料和联系方式</p>
          </div>
        </div>
        <Separator className="my-6 opacity-50" />
        {/* 表单卡片 */}
        <div className="overflow-hidden rounded-xl transition-all duration-300">
          <div className="p-6">
            <EditProfileForm userInfo={userInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}
