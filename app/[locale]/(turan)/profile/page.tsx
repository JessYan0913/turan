import { formatDistanceToNow } from 'date-fns';
import { eq } from 'drizzle-orm';
import {
  BarChart3,
  Camera,
  CheckCircle,
  Clock as ClockIcon,
  CreditCard,
  Crown,
  Edit3,
  ExternalLink,
  Layers,
  Loader2,
  User,
  XCircle,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getUserWorkStatistics } from '@/lib/actions/profile';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { userTable } from '@/lib/db/schema';
import { getScopedI18n } from '@/locales/server';

export default async function ProfilePage() {
  const t = await getScopedI18n('profile');
  const session = await auth();
  if (!session || !session.user?.email) {
    redirect('/login');
  }
  const [user] = await db.select().from(userTable).where(eq(userTable.email, session.user.email));
  if (!user) {
    redirect('/login');
  }

  const { totalWorks, worksThisMonth, totalProcessingTime, usedWorkTypes } = await getUserWorkStatistics();

  // Mock data for recent generations
  const recentGenerations = [
    {
      id: 'gen_123',
      status: 'succeeded',
      model: 'stability-ai/sdxl',
      input: { prompt: 'A beautiful sunset over mountains' },
      output: { url: '/placeholder.svg' },
      createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      completedAt: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
    },
    {
      id: 'gen_124',
      status: 'processing',
      model: 'stability-ai/sdxl',
      input: { prompt: 'A futuristic city skyline at night' },
      createdAt: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
      completedAt: null,
      error: null,
    },
    {
      id: 'gen_125',
      status: 'failed',
      model: 'stability-ai/sdxl',
      input: { prompt: 'A magical forest with glowing plants' },
      error: { message: 'Generation failed' },
      output: null,
      createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      completedAt: new Date(Date.now() - 1000 * 60 * 58), // 58 minutes ago
    },
  ] as const;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle className="size-4 text-green-500" />;
      case 'failed':
        return <XCircle className="size-4 text-red-500" />;
      case 'processing':
      case 'starting':
        return <Loader2 className="size-4 animate-spin text-blue-500" />;
      default:
        return <ClockIcon className="size-4 text-amber-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'succeeded':
        return '已完成';
      case 'failed':
        return '失败';
      case 'processing':
        return '处理中';
      case 'starting':
        return '开始中';
      default:
        return status;
    }
  };

  const planName = (() => {
    if (user.plan === 'pro') return '专业版';
    if (user.plan === 'enterprise') return '企业版';
    if (user.plan === 'basic') return '基础版';
    return '免费版';
  })();

  const planExpiry = (() => {
    if (!user.planExpiry) return '无限期';
    if (user.planExpiry instanceof Date) {
      return user.planExpiry.toISOString().slice(0, 10);
    }
    return String(user.planExpiry).slice(0, 10);
  })();

  const usageThisMonth = user.usageCurrent || 0;
  const planLimit = user.usageLimit || 100;
  const usagePercentage = (usageThisMonth / planLimit) * 100;

  return (
    <div className="bg-muted/20 min-h-screen pb-8 pt-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* 左侧：个人信息和成就 */}
          <div className="space-y-5 lg:col-span-4">
            {/* 个人信息卡片 */}
            <Card className="card-base">
              <CardContent className="p-6">
                <div className="relative mb-4 inline-block">
                  <Avatar className="size-24">
                    <AvatarImage src={user.avatar || '/placeholder.svg'} />
                    <AvatarFallback className="bg-gray-700 text-white">
                      <User className="size-12" />
                    </AvatarFallback>
                  </Avatar>
                  <Link
                    href="/profile/edit"
                    className="absolute -bottom-2 -right-2 flex size-8 items-center justify-center rounded-full bg-blue-600 shadow-[0_4px_16px_rgba(59,130,246,0.4)] transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_6px_24px_rgba(59,130,246,0.5)]"
                  >
                    <Camera className="size-4" />
                  </Link>
                </div>
                <h2 className="mb-1 text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground mb-3">{user.email}</p>
                <p className="text-muted-foreground mb-4 text-sm">
                  {t('stats.joinDate')}{' '}
                  {(() => {
                    const d: unknown = user.joinDate ?? user.createdAt;
                    if (!d) return '';
                    if (typeof d === 'string') return d.slice(0, 10);
                    if (d instanceof Date && typeof d.toISOString === 'function') return d.toISOString().slice(0, 10);
                    return '';
                  })()}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/profile/edit"
                    className="btn-primary flex items-center gap-2 rounded-lg px-5 py-2 text-base font-medium shadow-md"
                  >
                    <Edit3 className="size-4" />
                    {t('edit')}
                  </Link>
                  <Link
                    href="/profile/billing"
                    className="btn-secondary flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2 text-base font-medium shadow-sm dark:border-gray-600"
                  >
                    <CreditCard className="size-4" />
                    {t('bill')}
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 套餐信息卡片 */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="mr-2 size-5 text-yellow-500" />
                  {t('plan.current')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="textSecondary">{t('plan.type')}</span>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">{planName}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="textSecondary">{t('plan.expiry')}</span>
                  <span className="text-sm">{planExpiry}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="textSecondary">{t('plan.usage')}</span>
                    <span className="text-sm">
                      {usageThisMonth}/{planLimit}
                    </span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                </div>
                <Button className="btn-primary w-full rounded-lg px-5 py-2 text-base font-medium shadow-md">
                  <Link href="/profile/upgrade" className="block size-full">
                    {t('plan.upgrade')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：统计和活动 */}
          <div className="space-y-8 lg:col-span-8">
            {/* 统计卡片分组 */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="card-base">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">{t('stats.totalWorks')}</p>
                      <p className="text-3xl font-bold">{totalWorks}</p>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <BarChart3 className="size-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-base">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">{t('stats.thisMonthWorks')}</p>
                      <p className="text-3xl font-bold">{worksThisMonth}</p>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                      <Zap className="size-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-base">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">{t('stats.totalProcessingTime')}</p>
                      <p className="text-3xl font-bold">{totalProcessingTime}</p>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <ClockIcon className="size-6 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-base">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">{t('stats.workTypes')}</p>
                      <p className="text-3xl font-bold">{usedWorkTypes}</p>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                      <Layers className="size-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Generations */}
            <Card className="card-base">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">最近生成</CardTitle>
                <Link href="/generations" className="text-sm text-blue-500 hover:underline">
                  查看全部
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentGenerations.length > 0 ? (
                  <div className="space-y-3">
                    {recentGenerations.map((gen) => (
                      <div key={gen.id} className="hover:bg-muted/50 flex items-start gap-3 rounded-lg p-3">
                        <div className="mt-0.5">
                          <div className="bg-muted flex size-8 items-center justify-center rounded-full">
                            {getStatusIcon(gen.status)}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="truncate text-sm font-medium">
                              {typeof gen.input === 'object' && 'prompt' in gen.input
                                ? (gen.input.prompt as string)
                                : 'Untitled'}
                            </p>
                            <span className="text-muted-foreground ml-2 whitespace-nowrap text-xs">
                              {formatDistanceToNow(new Date(gen.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          <div className="text-muted-foreground mt-1 flex items-center text-xs">
                            <span className="inline-flex items-center gap-1">
                              {getStatusIcon(gen.status)}
                              {getStatusText(gen.status)}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="truncate">{gen.model.split('/').pop()}</span>
                            {gen.completedAt && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{Math.ceil((gen.completedAt.getTime() - gen.createdAt.getTime()) / 1000)}s</span>
                              </>
                            )}
                          </div>
                        </div>
                        {gen.status === 'succeeded' && gen.output?.url && (
                          <Link
                            href={gen.output.url}
                            target="_blank"
                            className="ml-2 shrink-0 text-blue-500 hover:text-blue-600 hover:underline"
                          >
                            <ExternalLink className="size-4" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Image
                      src="/placeholder.svg"
                      alt="No generations"
                      width={120}
                      height={120}
                      className="mb-4 opacity-40"
                    />
                    <p className="text-muted-foreground">
                      <ClockIcon className="mr-1 inline-block size-4" />
                      暂无生成记录
                    </p>
                    <Button variant="outline" className="mt-4">
                      <Zap className="mr-2 size-4" />
                      开始生成
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
