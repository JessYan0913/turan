'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { consumeUserPoints, getAvailablePoints } from '@/lib/db/queries';

interface ConsumePointsFormProps {
  userId: string;
  onPointsConsumed?: () => void;
}

export function ConsumePointsForm({ userId, onPointsConsumed }: ConsumePointsFormProps) {
  const [points, setPoints] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [availablePoints, setAvailablePoints] = useState<number>(0);
  const [loadingPoints, setLoadingPoints] = useState(true);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // 获取用户可用积分
  useEffect(() => {
    async function fetchAvailablePoints() {
      try {
        setLoadingPoints(true);
        const available = await getAvailablePoints(userId);
        setAvailablePoints(available);
      } catch (error) {
        console.error('获取可用积分失败:', error);
        toast.error('获取可用积分失败');
      } finally {
        setLoadingPoints(false);
      }
    }

    fetchAvailablePoints();
  }, [userId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (points <= 0) {
      toast.error('请输入大于0的积分数量');
      return;
    }

    if (points > availablePoints) {
      toast.error(`积分不足，您当前只有 ${availablePoints} 可用积分`);
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      // 使用新的consumeUserPoints函数
      await consumeUserPoints(userId, points);

      // 设置成功结果
      setResult({
        success: true,
        message: `成功消耗 ${points} 积分`,
      });

      // 显示成功通知
      toast.success(`成功消耗 ${points} 积分`);

      // 更新可用积分
      setAvailablePoints((prev) => prev - points);

      // 回调父组件的刷新函数
      if (onPointsConsumed) {
        onPointsConsumed();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '消耗积分失败';
      setResult({
        success: false,
        message: errorMessage,
      });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="mb-4 font-medium">消耗积分测试</h3>

      {loadingPoints ? (
        <div className="mb-4 h-6 animate-pulse rounded bg-gray-200"></div>
      ) : (
        <div className="mb-4 flex items-center justify-between rounded-md bg-blue-50 p-2 text-sm">
          <span>当前可用积分:</span>
          <span className="font-medium text-blue-700">{availablePoints}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="points" className="block text-sm font-medium text-gray-700">
            要消耗的积分数量
          </label>
          <input
            type="number"
            id="points"
            min="1"
            max={availablePoints}
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
            disabled={loading || availablePoints <= 0}
          />
        </div>

        <button
          type="submit"
          disabled={loading || availablePoints < points || availablePoints <= 0}
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-300"
        >
          {loading ? '处理中...' : '消耗积分'}
        </button>
      </form>

      {result && (
        <div
          className={`mt-4 rounded-md p-3 ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
        >
          {result.message}
        </div>
      )}

      {availablePoints <= 0 && !loading && !loadingPoints && (
        <div className="mt-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
          您当前没有可用积分，请先兑换积分码来获取积分。
        </div>
      )}
    </div>
  );
}
