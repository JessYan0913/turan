import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import {
  createRedeemBatch,
  createRedeemCode,
  generateRedeemCodes,
  getRedeemCode,
  getRedeemCodeUsageStats,
  listRedeemBatches,
  listRedeemCodes,
  redeemCodeForUser,
  updateRedeemCode,
} from '@/lib/db/queries';
import { getScopedI18n } from '@/locales/server';

export default async function RedeemCodeTestPage() {
  const session = await auth();
  if (!session || !session.user?.email) {
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

  // 创建一个测试兑换码
  const testCode = `TEST${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')}`;
  let createdCode;
  try {
    createdCode = await createRedeemCode({
      code: testCode,
      type: 'points',
      reward: { points: 100 },
      usageLimit: 5,
      expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7天后过期
      batchId: testBatch?.id,
      createdBy: session.user.id,
    });
  } catch (error) {
    console.error('创建测试兑换码失败:', error);
  }

  // 批量生成兑换码
  let generatedCodes;
  try {
    generatedCodes = await generateRedeemCodes({
      count: 3,
      prefix: 'BATCH',
      length: 6,
      type: 'subscription',
      reward: { days: 30 },
      usageLimit: 1,
      expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后过期
      batchId: testBatch?.id,
      createdBy: session.user.id,
    });
  } catch (error) {
    console.error('批量生成兑换码失败:', error);
  }

  // 列出兑换码
  let codesList;
  try {
    codesList = await listRedeemCodes({
      batchId: testBatch?.id,
      limit: 10,
    });
  } catch (error) {
    console.error('获取兑换码列表失败:', error);
  }

  // 列出批次
  let batchesList;
  try {
    batchesList = await listRedeemBatches({
      limit: 5,
    });
  } catch (error) {
    console.error('获取批次列表失败:', error);
  }

  // 测试兑换码兑换
  let redeemResult;
  if (createdCode && session.user.id) {
    try {
      redeemResult = await redeemCodeForUser({
        code: createdCode.code,
        userId: session.user.id,
        ipAddress: '127.0.0.1',
        userAgent: 'Test Browser',
      });
    } catch (error) {
      console.error('兑换码兑换失败:', error);
    }
  }

  // 获取兑换码使用统计
  let usageStats;
  if (createdCode) {
    try {
      usageStats = await getRedeemCodeUsageStats(createdCode.code);
    } catch (error) {
      console.error('获取兑换码使用统计失败:', error);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">兑换码功能测试</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">创建的测试批次</h2>
          {testBatch ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium">ID:</span> {testBatch.id}
              </p>
              <p>
                <span className="font-medium">名称:</span> {testBatch.name}
              </p>
              <p>
                <span className="font-medium">渠道:</span> {testBatch.channel}
              </p>
              <p>
                <span className="font-medium">备注:</span> {testBatch.note}
              </p>
              <p>
                <span className="font-medium">创建时间:</span> {testBatch.createdAt.toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-red-500">创建批次失败</p>
          )}
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">创建的测试兑换码</h2>
          {createdCode ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium">兑换码:</span> {createdCode.code}
              </p>
              <p>
                <span className="font-medium">类型:</span> {createdCode.type}
              </p>
              <p>
                <span className="font-medium">奖励:</span> {JSON.stringify(createdCode.reward)}
              </p>
              <p>
                <span className="font-medium">使用限制:</span> {createdCode.usageLimit}
              </p>
              <p>
                <span className="font-medium">已使用次数:</span> {createdCode.usedCount}
              </p>
              <p>
                <span className="font-medium">过期时间:</span> {createdCode.expireAt?.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">状态:</span> {createdCode.status}
              </p>
            </div>
          ) : (
            <p className="text-red-500">创建兑换码失败</p>
          )}
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">批量生成的兑换码</h2>
          {generatedCodes ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium">成功生成:</span> {generatedCodes.successful}
              </p>
              <p>
                <span className="font-medium">失败:</span> {generatedCodes.failed}
              </p>
              <p>
                <span className="font-medium">生成的兑换码:</span>
              </p>
              <ul className="list-disc pl-5">
                {generatedCodes.codes.map((code, index) => (
                  <li key={index}>{code}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-red-500">批量生成兑换码失败</p>
          )}
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">兑换码列表</h2>
          {codesList ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium">总数:</span> {codesList.total}
              </p>
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">兑换码</th>
                    <th className="py-2 text-left">类型</th>
                    <th className="py-2 text-left">状态</th>
                    <th className="py-2 text-left">使用/限制</th>
                  </tr>
                </thead>
                <tbody>
                  {codesList.items.map((code) => (
                    <tr key={code.id} className="border-b">
                      <td className="py-2">{code.code}</td>
                      <td className="py-2">{code.type}</td>
                      <td className="py-2">{code.status}</td>
                      <td className="py-2">
                        {code.usedCount}/{code.usageLimit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-red-500">获取兑换码列表失败</p>
          )}
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">批次列表</h2>
          {batchesList ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium">总数:</span> {batchesList.total}
              </p>
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">名称</th>
                    <th className="py-2 text-left">渠道</th>
                    <th className="py-2 text-left">创建时间</th>
                  </tr>
                </thead>
                <tbody>
                  {batchesList.items.map((batch) => (
                    <tr key={batch.id} className="border-b">
                      <td className="py-2">{batch.name}</td>
                      <td className="py-2">{batch.channel}</td>
                      <td className="py-2">{batch.createdAt.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-red-500">获取批次列表失败</p>
          )}
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">兑换测试</h2>
          {redeemResult ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium">结果:</span> {redeemResult.success ? '成功' : '失败'}
              </p>
              <p>
                <span className="font-medium">状态:</span> {redeemResult.result}
              </p>
              <p>
                <span className="font-medium">消息:</span> {redeemResult.message}
              </p>
              {redeemResult.reward && (
                <p>
                  <span className="font-medium">奖励:</span> {JSON.stringify(redeemResult.reward)}
                </p>
              )}
            </div>
          ) : (
            <p className="text-red-500">兑换测试失败</p>
          )}
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">兑换码使用统计</h2>
          {usageStats ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium">总使用次数:</span> {usageStats.total}
              </p>
              <p>
                <span className="font-medium">成功使用次数:</span> {usageStats.success}
              </p>
              <p>
                <span className="font-medium">失败使用次数:</span> {usageStats.failed}
              </p>
              <p>
                <span className="font-medium">唯一用户数:</span> {usageStats.uniqueUsers}
              </p>
            </div>
          ) : (
            <p className="text-red-500">获取使用统计失败</p>
          )}
        </div>
      </div>
    </div>
  );
}
