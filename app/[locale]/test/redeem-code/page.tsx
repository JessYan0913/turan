import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { createRedeemBatch, createRedeemCode, generateRedeemCodes } from '@/lib/db/queries';

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

  // 创建一个测试批次
  const testBatchName = `测试批次-${new Date().toISOString()}`;
  let testBatch;
  try {
    testBatch = await createRedeemBatch({
      name: testBatchName,
      channel: '测试渠道',
      note: '这是一个测试批次',
      createdBy: session.user.id,
    });
  } catch (error) {
    console.error('创建测试批次失败:', error);
  }

  // 创建一个测试兑换码（积分类型）
  const testPointsCode = `TEST${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')}`;
  try {
    await createRedeemCode({
      code: testPointsCode,
      type: 'points',
      reward: { points: 100 },
      usageLimit: 5,
      expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7天后过期
      batchId: testBatch?.id,
      createdBy: session.user.id,
    });
    console.log(`创建积分兑换码成功: ${testPointsCode}，可获得100积分`);
  } catch (error) {
    console.error('创建积分兑换码失败:', error);
  }

  // 批量生成兑换码（会员类型）
  try {
    const generatedCodes = await generateRedeemCodes({
      count: 3,
      prefix: 'BATCH',
      length: 6,
      type: 'points',
      reward: { points: 500 },
      usageLimit: 1,
      expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后过期
      batchId: testBatch?.id,
      createdBy: session.user.id,
    });
    console.log(`批量生成高额积分兑换码成功: ${generatedCodes.codes.length}个，可获得500积分`);
  } catch (error) {
    console.error('批量生成会员兑换码失败:', error);
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">兑换码功能测试</h1>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">测试兑换码说明</h2>
        <div className="space-y-4">
          <div className="rounded-md bg-blue-50 p-4">
            <h3 className="font-medium text-blue-800">积分兑换码</h3>
            <p className="mt-1 text-blue-700">已自动创建积分兑换码，格式为 TEST + 4位数字，可获得100积分</p>
            <p className="mt-1 text-blue-700">使用限制：5次，有效期：7天</p>
          </div>

          <div className="rounded-md bg-green-50 p-4">
            <h3 className="font-medium text-green-800">高额积分兑换码</h3>
            <p className="mt-1 text-green-700">已自动创建3个高额积分兑换码，格式为 BATCH + 6位字符，可获得500积分</p>
            <p className="mt-1 text-green-700">使用限制：1次，有效期：30天</p>
          </div>
        </div>
      </div>

      {/* 交互式测试面板：包含兑换码测试、用户积分信息和积分消耗测试 */}
      <div>
        <InteractiveTestPanel userId={userId} />
      </div>
    </div>
  );
}
