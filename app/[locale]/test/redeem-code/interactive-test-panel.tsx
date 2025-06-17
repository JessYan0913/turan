'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { createRedeemBatch } from '@/lib/db/queries';

import { ConsumePointsForm } from './consume-points-form';
import { CreateRedeemCodeForm } from './create-redeem-code-form';
import { RedeemCodeForm } from './redeem-code-form';
import { UserPoints } from './user-points';

interface InteractiveTestPanelProps {
  userId: string;
  initialBatchId?: string;
}

export function InteractiveTestPanel({ userId, initialBatchId }: InteractiveTestPanelProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [batchId, setBatchId] = useState<string | null>(initialBatchId || null);
  const [isCreatingBatch, setIsCreatingBatch] = useState(false);

  useEffect(() => {
    const createTestBatch = async () => {
      if (!batchId) {
        try {
          setIsCreatingBatch(true);
          const testBatchName = `测试批次-${new Date().toISOString()}`;
          const newBatch = await createRedeemBatch({
            name: testBatchName,
            channel: '测试渠道',
            note: '自动创建的测试批次',
            createdBy: userId,
          });
          setBatchId(newBatch.id);
        } catch (error) {
          console.error('创建测试批次失败:', error);
          toast.error('创建测试批次失败');
        } finally {
          setIsCreatingBatch(false);
        }
      }
    };

    createTestBatch();
  }, [batchId, userId]);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (isCreatingBatch || !batchId) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-white p-6 shadow">
        <div className="text-center">
          <div className="mb-4 size-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="text-gray-600">正在初始化测试批次...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">创建兑换码</h2>
            <CreateRedeemCodeForm batchId={batchId} onCodeCreated={handleRefresh} />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">兑换码测试</h2>
            <RedeemCodeForm userId={userId} onRedeemSuccess={handleRefresh} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">用户积分信息</h2>
            <UserPoints userId={userId} refreshTrigger={refreshTrigger} />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">积分消耗测试</h2>
            <ConsumePointsForm userId={userId} onPointsConsumed={handleRefresh} />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
        <p className="font-medium">测试批次信息</p>
        <p>
          批次ID: <span className="font-mono">{batchId}</span>
        </p>
        <p className="mt-1 text-sm text-blue-700">此批次专为测试创建，所有生成的兑换码将关联到此批次。</p>
      </div>
    </div>
  );
}
