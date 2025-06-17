'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { addUserPoints, redeemCodeForUser } from '@/lib/db/queries';

interface RedeemCodeFormProps {
  userId: string;
  onRedeemSuccess?: () => void;
}

export function RedeemCodeForm({ userId, onRedeemSuccess }: RedeemCodeFormProps) {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    result: string;
    message: string;
    reward?: Record<string, any>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      setError('请输入兑换码');
      toast.error('请输入兑换码');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const redeemResult = await redeemCodeForUser({
        code: code.trim(),
        userId,
        ipAddress: '127.0.0.1',
        userAgent: navigator.userAgent,
      });

      setResult(redeemResult);

      // 如果兑换成功
      if (redeemResult.success) {
        // 如果有积分奖励，自动更新用户总积分额度（usageLimit）
        if (redeemResult.reward?.type === 'points') {
          try {
            const points = parseInt(redeemResult.reward.value) || 0;
            if (points > 0) {
              await addUserPoints(userId, points, redeemResult.reward.planName);
              toast.success(`成功添加 ${points} 积分到您的账户总额度`);
            }
          } catch (pointsError) {
            console.error('更新积分失败:', pointsError);
            toast.error('更新积分失败: ' + (pointsError instanceof Error ? pointsError.message : '未知错误'));
          }
        }

        if (onRedeemSuccess) {
          onRedeemSuccess();
        }
      } else {
        toast.error(redeemResult.message || '兑换失败');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '兑换失败，请稍后再试';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="redeemCode" className="mb-2 block text-sm font-medium">
            输入兑换码
          </label>
          <div className="flex gap-2">
            <input
              id="redeemCode"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="请输入兑换码"
              className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
            >
              {isSubmitting ? '提交中...' : '兑换'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div
          className={`rounded-md p-4 ${result.success ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}
        >
          <h3 className="mb-2 font-medium">{result.success ? '兑换成功' : '兑换失败'}</h3>
          <p className="mb-2">{result.message}</p>
          {result.reward && (
            <div className="mt-2">
              <h4 className="font-medium">获得奖励:</h4>
              <pre className="mt-1 rounded bg-gray-100 p-2 text-sm">{JSON.stringify(result.reward, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      <div className="mt-6">
        <h3 className="mb-2 text-lg font-medium">使用说明</h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
          <li>输入有效的兑换码并点击&lsquo;兑换&rsquo;按钮</li>
          <li>系统将验证兑换码并显示结果</li>
          <li>成功兑换后将显示获得的奖励</li>
          <li>每个兑换码可能有使用次数限制</li>
        </ul>
      </div>
    </div>
  );
}
