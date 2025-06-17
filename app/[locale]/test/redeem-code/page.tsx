import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

import { InteractiveTestPanel } from './interactive-test-panel';

export default async function RedeemCodeTestPage() {
  const session = await auth();
  if (!session || !session.user?.email) {
    redirect('/login');
  }
  const userId = session.user.id;
  if (!userId) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">兑换码功能测试</h1>

      {/* 交互式测试面板：包含兑换码测试、用户积分信息和积分消耗测试 */}
      <div>
        <InteractiveTestPanel userId={userId} />
      </div>
    </div>
  );
}
