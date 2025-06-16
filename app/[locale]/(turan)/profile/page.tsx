import { BarChart3, Camera, Check, Clock, CreditCard, Crown, Edit3, Info, Layers, User, Zap } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { auth } from '@/lib/auth';
import {
  getUser,
  getUserTotalProcessingTime,
  getUserUsedWorkTypesCount,
  getUserWorksCount,
  getUserWorksThisMonthCount,
  listOperationLogs,
} from '@/lib/db/queries';
import { getScopedI18n } from '@/locales/server';

export default async function ProfilePage() {
  const t = await getScopedI18n('profile');
  const session = await auth();
  if (!session || !session.user?.email) {
    redirect('/login');
  }
  const userInfo = await getUser(session.user.email);
  if (!userInfo) {
    redirect('/login');
  }

  const [totalWorks, thisMonthWorks, totalProcessingTime, usedWorkTypesCount, { items: recentActivity }] =
    await Promise.all([
      getUserWorksCount(userInfo.id),
      getUserWorksThisMonthCount(userInfo.id),
      getUserTotalProcessingTime(userInfo.id),
      getUserUsedWorkTypesCount(userInfo.id),
      listOperationLogs({
        userId: userInfo.id,
        limit: 20,
        orderBy: 'desc',
        status: 'SUCCESS', // Only show successful operations
      }),
    ]);

  // 用户统计数据
  const stats = {
    plan: '专业版',
    planExpiry: '2024-03-15',
    usageThisMonth: 234,
    planLimit: 500,
  };

  // Format operation logs for display
  const formatOperationType = (type: string) => {
    switch (type) {
      case 'STYLE_TRANSFORM':
        return '风格转换';
      case 'AVATAR_GENERATE':
        return '生成头像';
      case 'IMAGE_EDIT':
        return '图片编辑';
      default:
        return type;
    }
  };

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
                    <AvatarImage src={userInfo.avatar || '/placeholder.svg'} />
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
                <h2 className="mb-1 text-2xl font-bold">{userInfo.name}</h2>
                <p className="text-muted-foreground mb-3">{userInfo.email}</p>
                <p className="text-muted-foreground mb-4 text-sm">
                  {t('stats.joinDate')}{' '}
                  {(() => {
                    const d: unknown = userInfo.joinDate ?? userInfo.createdAt;
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
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">{stats.plan}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="textSecondary">{t('plan.expiry')}</span>
                  <span className="text-sm">{stats.planExpiry}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="textSecondary">{t('plan.usage')}</span>
                    <span className="text-sm">
                      {stats.usageThisMonth}/{stats.planLimit}
                    </span>
                  </div>
                  <Progress value={(stats.usageThisMonth / stats.planLimit) * 100} className="h-2" />
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
                      <p className="text-3xl font-bold">{thisMonthWorks}</p>
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
                      <Clock className="size-6 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-base">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">{t('stats.workTypes')}</p>
                      <p className="text-3xl font-bold">{usedWorkTypesCount}</p>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                      <Layers className="size-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 最近活动单独分组放底部 */}
            <Card className="card-base">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">{t('stats.recentActivity')}</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[500px] space-y-3 overflow-y-auto">
                {recentActivity.map((log) => {
                  const isSuccess = log.status === 'SUCCESS';
                  const description = log.operationDesc || '';
                  const time = new Date(log.startTime).toLocaleString('zh-CN');

                  return (
                    <div
                      key={log.id}
                      className={`group flex items-start space-x-3 rounded-lg p-3 transition-all duration-200 ${
                        isSuccess
                          ? 'bg-green-50/80 hover:bg-green-100/60 dark:bg-green-900/20 dark:hover:bg-green-900/30'
                          : 'bg-blue-50/80 hover:bg-blue-100/60 dark:bg-blue-900/20 dark:hover:bg-blue-900/30'
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110 ${
                          isSuccess
                            ? 'bg-green-100 text-green-600 dark:bg-green-800/50'
                            : 'bg-blue-100 text-blue-600 dark:bg-blue-800/50'
                        }`}
                      >
                        {isSuccess ? <Check className="size-4" /> : <Info className="size-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="truncate text-sm font-medium">
                            {description && <span className="text-muted-foreground">{description}</span>}
                          </p>
                          <span className="text-muted-foreground mt-1 text-xs sm:ml-2 sm:mt-0 sm:whitespace-nowrap">
                            {time}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
