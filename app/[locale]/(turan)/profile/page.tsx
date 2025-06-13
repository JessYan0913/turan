'use client';

import { useState } from 'react';

import { BarChart3, Calendar, Camera, Check, CreditCard, Crown, Edit3, Info, Save, User, X, Zap } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '138****8888',
    joinDate: '2023-06-15',
    avatar: '/placeholder.svg?height=120&width=120',
  });

  const [editForm, setEditForm] = useState(userInfo);

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  // 扩展用户统计数据
  const stats = {
    totalWorks: 156,
    thisMonthWorks: 23,
    totalProcessingTime: '12.5小时',
    workTypes: {
      'style-transfer': { count: 68, percentage: 43.6 },
      avatar: { count: 42, percentage: 26.9 },
      edit: { count: 28, percentage: 17.9 },
      generate: { count: 18, percentage: 11.5 },
    },
    plan: '专业版',
    planExpiry: '2024-03-15',
    usageThisMonth: 234,
    planLimit: 500,
    recentActivity: [
      { action: '完成风格转换', target: '风景照片', time: '2小时前', type: 'success' },
      { action: '生成专业头像', target: '商务形象', time: '5小时前', type: 'success' },
      { action: '背景替换', target: '人像照片', time: '1天前', type: 'success' },
      { action: '升级到专业版', target: '套餐升级', time: '3天前', type: 'info' },
      { action: '获得新成就', target: '创作达人', time: '4天前', type: 'success' },
      { action: '分享作品', target: '社交媒体', time: '5天前', type: 'info' },
    ],
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
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 size-8 rounded-full bg-blue-600 shadow-[0_4px_16px_rgba(59,130,246,0.4)] transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_6px_24px_rgba(59,130,246,0.5)]"
                  >
                    <Camera className="size-4" />
                  </Button>
                </div>

                {!isEditing ? (
                  <>
                    <h2 className="mb-1 text-2xl font-bold">{userInfo.name}</h2>
                    <p className="text-muted-foreground mb-3">{userInfo.email}</p>
                    <p className="text-muted-foreground mb-4 text-sm">加入于 {userInfo.joinDate}</p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="btn-primary flex items-center gap-2 rounded-lg px-5 py-2 text-base font-medium shadow-md"
                      >
                        <Edit3 className="size-4" />
                        编辑资料
                      </Button>
                      <Button
                        variant="secondary"
                        className="btn-secondary flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2 text-base font-medium shadow-sm dark:border-gray-600"
                      >
                        <CreditCard className="size-4" />
                        账单
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4 text-left">
                    <div>
                      <Label className="text">姓名</Label>
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="textarea"
                      />
                    </div>
                    <div>
                      <Label className="text">邮箱</Label>
                      <Input
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="textarea"
                      />
                    </div>
                    <div>
                      <Label className="text">手机</Label>
                      <Input
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="textarea"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSave}
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-700 shadow-[0_4px_24px_rgba(59,130,246,0.4)] transition-all duration-300 hover:from-blue-700 hover:to-purple-800 hover:shadow-[0_8px_32px_rgba(59,130,246,0.5)]"
                      >
                        <Save className="mr-2 size-4" />
                        保存
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-gray-600/50 bg-gray-700/60 text-gray-200 transition-all duration-300 hover:border-gray-500/70 hover:bg-gray-600/80 hover:text-white"
                      >
                        <X className="mr-2 size-4" />
                        取消
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 套餐信息卡片 */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="mr-2 size-5 text-yellow-500" />
                  当前套餐
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="textSecondary">套餐类型</span>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">{stats.plan}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="textSecondary">到期时间</span>
                  <span className="text-sm">{stats.planExpiry}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="textSecondary">本月使用量</span>
                    <span className="text-sm">
                      {stats.usageThisMonth}/{stats.planLimit}
                    </span>
                  </div>
                  <Progress value={(stats.usageThisMonth / stats.planLimit) * 100} className="h-2" />
                </div>
                <Button className="btn-primary w-full rounded-lg px-5 py-2 text-base font-medium shadow-md">
                  升级套餐
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：统计和活动 */}
          <div className="space-y-8 lg:col-span-8">
            {/* 统计卡片分组 */}
            <div className="dark:bg-card/80 grid gap-6 md:grid-cols-2">
              <Card className="card-base">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">总作品数</p>
                      <p className="text-3xl font-bold">{stats.totalWorks}</p>
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
                      <p className="text-muted-foreground text-sm">本月作品</p>
                      <p className="text-3xl font-bold">{stats.thisMonthWorks}</p>
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
                      <p className="text-muted-foreground text-sm">处理时长</p>
                      <p className="text-3xl font-bold">{stats.totalProcessingTime}</p>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <Calendar className="size-6 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-base">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">作品类型</p>
                      <p className="text-3xl font-bold">4 种</p>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                      <User className="size-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 最近活动单独分组放底部 */}
            <Card className="card-base">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">最近活动</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className={`group flex items-start space-x-3 rounded-lg p-3 transition-all duration-200 ${
                        activity.type === 'success'
                          ? 'bg-green-50/80 hover:bg-green-100/60 dark:bg-green-900/20 dark:hover:bg-green-900/30'
                          : 'bg-blue-50/80 hover:bg-blue-100/60 dark:bg-blue-900/20 dark:hover:bg-blue-900/30'
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110 ${
                          activity.type === 'success'
                            ? 'bg-green-100 text-green-600 dark:bg-green-800/50'
                            : 'bg-blue-100 text-blue-600 dark:bg-blue-800/50'
                        }`}
                      >
                        {activity.type === 'success' ? <Check className="size-4" /> : <Info className="size-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="truncate text-sm font-medium">
                            {activity.action} <span className="text-muted-foreground">{activity.target}</span>
                          </p>
                          <span className="text-muted-foreground mt-1 text-xs sm:ml-2 sm:mt-0 sm:whitespace-nowrap">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
