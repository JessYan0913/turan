'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { createRedeemCode, generateRedeemCodes } from '@/lib/db/queries';
import type { RedeemCodeType } from '@/lib/db/schema';

interface CreateRedeemCodeFormProps {
  batchId: string;
  onCodeCreated?: () => void;
}

// Use the type from the schema

export function CreateRedeemCodeForm({ batchId, onCodeCreated }: CreateRedeemCodeFormProps) {
  const [code, setCode] = useState('');
  const [type, setType] = useState<RedeemCodeType>('points');
  const [points, setPoints] = useState(100);
  const [usageLimit, setUsageLimit] = useState(1);
  const [expireDays, setExpireDays] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBatch, setIsBatch] = useState(false);
  const [batchCount, setBatchCount] = useState(5);
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [planDays, setPlanDays] = useState(30);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const expireAt = new Date();
      expireAt.setDate(expireAt.getDate() + expireDays);

      let reward;
      if (type === 'points') {
        reward = {
          type: 'points' as const,
          value: points.toString(),
        };
      } else if (type === 'plan_pro' || type === 'plan_enterprise') {
        // 提取套餐名称（去掉plan_前缀）
        const planName = type.replace('plan_', '');
        reward = {
          type: 'plan' as const,
          days: planDays,
          planName: planName, // 添加套餐名称到reward中
        };
      } else {
        reward = {
          type: 'subscription' as const,
          days: 30,
        };
      }

      if (isBatch) {
        // Generate batch of codes
        const { codes } = await generateRedeemCodes({
          count: batchCount,
          prefix: code || 'CODE',
          length: 8,
          type,
          reward,
          usageLimit,
          expireAt,
          batchId,
          createdBy: 'test-user', // This should be the actual user ID
        });
        setGeneratedCodes(codes);
        toast.success(`成功生成 ${codes.length} 个兑换码`);
      } else {
        // Create single code
        if (!code.trim()) {
          throw new Error('请填写兑换码');
        }

        await createRedeemCode({
          code: code.trim(),
          type,
          reward,
          usageLimit,
          expireAt,
          batchId,
          createdBy: 'test-user', // This should be the actual user ID
        });
        toast.success('兑换码创建成功');
      }

      if (onCodeCreated) {
        onCodeCreated();
      }
    } catch (error) {
      console.error('创建兑换码失败:', error);
      toast.error(error instanceof Error ? error.message : '创建兑换码失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="singleCode"
              checked={!isBatch}
              onChange={() => setIsBatch(false)}
              className="size-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="singleCode" className="ml-2 block text-sm text-gray-700">
              单个兑换码
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="batchCode"
              checked={isBatch}
              onChange={() => setIsBatch(true)}
              className="size-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="batchCode" className="ml-2 block text-sm text-gray-700">
              批量生成
            </label>
          </div>
        </div>

        {!isBatch && (
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              兑换码
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="输入兑换码"
            />
          </div>
        )}

        {isBatch && (
          <div>
            <label htmlFor="batchPrefix" className="block text-sm font-medium text-gray-700">
              前缀 (可选)
            </label>
            <input
              type="text"
              id="batchPrefix"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="输入前缀 (可选)"
            />
            <div className="mt-2">
              <label htmlFor="batchCount" className="block text-sm font-medium text-gray-700">
                生成数量: {batchCount}
              </label>
              <input
                type="range"
                id="batchCount"
                min="1"
                max="100"
                value={batchCount}
                onChange={(e) => setBatchCount(parseInt(e.target.value, 10))}
                className="mt-1 block w-full"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            类型
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as RedeemCodeType)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="points">一次性积分</option>
            <option value="plan_basic">基础套餐</option>
            <option value="plan_pro">专业套餐</option>
            <option value="plan_enterprise">企业套餐</option>
          </select>
        </div>

        {type === 'points' && (
          <div>
            <label htmlFor="points" className="block text-sm font-medium text-gray-700">
              积分数量
            </label>
            <input
              type="number"
              id="points"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value, 10) || 0)}
              min="1"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        )}

        {(type === 'plan_basic' || type === 'plan_pro' || type === 'plan_enterprise') && (
          <div className="space-y-4">
            <div>
              <label htmlFor="planDays" className="block text-sm font-medium text-gray-700">
                套餐有效期（天）
              </label>
              <input
                type="number"
                id="planDays"
                value={planDays}
                onChange={(e) => setPlanDays(parseInt(e.target.value, 10) || 30)}
                min="1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="rounded-md bg-blue-50 p-3">
              <h4 className="text-sm font-medium text-blue-800">套餐信息</h4>
              <div className="mt-2 text-sm text-blue-700">
                {type === 'plan_basic' && <p>基础套餐：每月自动获得 300 积分，有效期 {planDays} 天</p>}
                {type === 'plan_pro' && <p>专业套餐：每月自动获得 1000 积分，有效期 {planDays} 天</p>}
                {type === 'plan_enterprise' && <p>企业套餐：每月自动获得 2500 积分，有效期 {planDays} 天</p>}
              </div>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700">
            使用次数限制
          </label>
          <input
            type="number"
            id="usageLimit"
            value={usageLimit}
            onChange={(e) => setUsageLimit(parseInt(e.target.value, 10) || 1)}
            min="1"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="expireDays" className="block text-sm font-medium text-gray-700">
            有效期 (天)
          </label>
          <input
            type="number"
            id="expireDays"
            value={expireDays}
            onChange={(e) => setExpireDays(parseInt(e.target.value, 10) || 30)}
            min="1"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? '提交中...' : '创建兑换码'}
          </button>
        </div>
      </form>

      {generatedCodes.length > 0 && (
        <div className="mt-6 rounded-md bg-green-50 p-4">
          <h3 className="text-sm font-medium text-green-800">生成的兑换码 ({generatedCodes.length}个)</h3>
          <div className="mt-2 max-h-60 overflow-auto rounded bg-white p-2 text-sm text-green-700">
            {generatedCodes.map((code, index) => (
              <div key={index} className="py-1 font-mono">
                {code}
              </div>
            ))}
          </div>
          <div className="mt-3">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(generatedCodes.join('\n'));
                toast.success('已复制到剪贴板');
              }}
              className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800 hover:bg-green-200"
            >
              复制全部
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
