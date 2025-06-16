'use client';

import { useState } from 'react';

import { consumeUserPoints } from '@/lib/db/queries';

interface ConsumePointsFormProps {
  userId: string;
  onPointsConsumed?: () => void;
}

export function ConsumePointsForm({ userId, onPointsConsumed }: ConsumePointsFormProps) {
  const [points, setPoints] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (points <= 0) {
      setResult({
        success: false,
        message: '请输入大于0的积分数量',
      });
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await consumeUserPoints(userId, points);
      setResult(response);

      if (response.success && onPointsConsumed) {
        onPointsConsumed();
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : '消耗积分失败',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="mb-4 font-medium">消耗积分测试</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="points" className="block text-sm font-medium text-gray-700">
            积分数量
          </label>
          <input
            type="number"
            id="points"
            min="1"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
    </div>
  );
}
