'use client';

import { useEffect, useState } from 'react';

import { getUserById } from '@/lib/db/queries';
import type { User } from '@/lib/db/schema';

interface UserPointsProps {
  userId: string;
  refreshTrigger?: number;
}

export function UserPoints({ userId, refreshTrigger = 0 }: UserPointsProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        setError(null);
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取用户信息失败');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [userId, refreshTrigger]);

  if (loading) {
    return <div className="h-20 animate-pulse rounded-md bg-gray-200"></div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-yellow-500">未找到用户信息</div>;
  }

  // 计算可用积分
  const availablePoints = (user.usageLimit || 0) - (user.usageCurrent || 0);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="text-sm font-medium text-blue-700">总积分额度</h3>
          <p className="mt-2 text-2xl font-bold text-blue-800">{user.usageLimit || 0}</p>
        </div>
        <div className="rounded-lg bg-red-50 p-4">
          <h3 className="text-sm font-medium text-red-700">已使用积分</h3>
          <p className="mt-2 text-2xl font-bold text-red-800">{user.usageCurrent || 0}</p>
        </div>
        <div className="rounded-lg bg-green-50 p-4">
          <h3 className="text-sm font-medium text-green-700">可用积分</h3>
          <p className="mt-2 text-2xl font-bold text-green-800">{availablePoints}</p>
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="mb-2 font-medium">用户信息</h3>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">用户名:</span> {user.name}
          </p>
          <p>
            <span className="font-medium">邮箱:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">会员计划:</span> {user.plan || 'free'}
          </p>
          {user.planExpiry && (
            <p>
              <span className="font-medium">会员到期:</span> {new Date(user.planExpiry).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
