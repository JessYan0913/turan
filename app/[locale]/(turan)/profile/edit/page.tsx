'use client';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProfileEditPage() {
  const { data: userInfo, isLoading, error } = useSWR('/api/profile', fetcher);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      setForm({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
      });
    }
  }, [userInfo]);

  if (isLoading) return <div className="p-8 text-center">正在加载...</div>;
  if (error) return <div className="p-8 text-center text-red-500">加载失败</div>;

  return (
    <div className="bg-muted/20 flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>编辑个人信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="mb-1 block font-medium">姓名</label>
            <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block font-medium">邮箱</label>
            <Input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block font-medium">手机</label>
            <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
          </div>
          <div className="flex gap-3">
            <Button className="flex-1" disabled>
              保存
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => router.back()}>
              取消
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
