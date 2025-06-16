'use client';

import { useState } from 'react';

import { ConsumePointsForm } from './consume-points-form';
import { RedeemCodeForm } from './redeem-code-form';
import { UserPoints } from './user-points';

interface InteractiveTestPanelProps {
  userId: string;
}

export function InteractiveTestPanel({ userId }: InteractiveTestPanelProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">兑换码测试</h2>
        <RedeemCodeForm userId={userId} onRedeemSuccess={handleRefresh} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
  );
}
