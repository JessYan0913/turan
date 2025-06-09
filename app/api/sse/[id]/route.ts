import { NextRequest, NextResponse } from 'next/server';

import { createSSEStream, getSSEHeaders } from '@/lib/sse';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const { stream } = createSSEStream(id, req, {
    sendTestEvent: true,
    testEventDelay: 2000,
    testEventData: { message: '连接测试成功' },
  });

  // 返回NextResponse，保留对路由的完全控制权
  return new NextResponse(stream, {
    headers: getSSEHeaders(),
  });
}
