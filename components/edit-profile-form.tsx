'use client';

import { useState } from 'react';

import { Camera, Mail, Phone, Save, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

export default function EditProfileForm({ userInfo }: { userInfo: any }) {
  const [form, setForm] = useState({
    name: userInfo.name || '',
    email: userInfo.email || '',
    phone: userInfo.phone || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 这里添加实际的保存逻辑
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: '个人信息已更新',
        description: '您的个人资料已成功保存',
        variant: 'default',
      });

      router.push('/profile');
      router.refresh();
    } catch (error) {
      toast({
        title: '保存失败',
        description: '请稍后再试',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 头像部分 */}
      <div className="flex flex-col items-center">
        <div
          className="group relative mb-4"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Avatar className="border-background size-32 border-4 transition-all duration-300">
            <AvatarImage
              src={userInfo.avatar || '/placeholder.svg'}
              className={`transition-all duration-300 ${isHovering ? 'scale-105 opacity-80 blur-[1px]' : ''}`}
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <User className="size-16" />
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            className="bg-primary hover:bg-primary/90 absolute bottom-0 right-0 flex size-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
          >
            <Camera className="text-primary-foreground size-5" />
          </button>
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 transition-all duration-300 group-hover:bg-black/10">
            {isHovering && (
              <span className="text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                更换头像
              </span>
            )}
          </div>
        </div>
        <h3 className="mt-2 text-lg font-medium">{form.name || userInfo.name || '用户名'}</h3>
        <p className="text-muted-foreground text-sm">{form.email || userInfo.email || '邮箱地址'}</p>
      </div>

      <Separator />

      {/* 表单字段 */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            姓名
          </Label>
          <div className="border-input bg-background ring-offset-background focus-within:ring-ring group flex items-center overflow-hidden rounded-md border px-3 py-2 text-sm focus-within:ring-1">
            <User className="text-muted-foreground group-focus-within:text-foreground mr-2 size-4 transition-colors" />
            <Input
              id="name"
              className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="请输入您的姓名"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            邮箱
          </Label>
          <div className="border-input bg-background ring-offset-background focus-within:ring-ring group flex items-center overflow-hidden rounded-md border px-3 py-2 text-sm focus-within:ring-1">
            <Mail className="text-muted-foreground group-focus-within:text-foreground mr-2 size-4 transition-colors" />
            <Input
              id="email"
              type="email"
              className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="请输入您的邮箱"
            />
          </div>
        </div>
      </div>

      {/* 按钮组 */}
      <div className="flex justify-end pt-6">
        <Button
          type="submit"
          className="flex min-w-32 items-center justify-center gap-2 rounded-full px-6 py-2 font-medium transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              处理中...
            </>
          ) : (
            <>
              <Save className="size-4" />
              保存更改
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
