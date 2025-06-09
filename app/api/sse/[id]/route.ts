import { NextRequest, NextResponse } from 'next/server';

import { createSSEStream, getSSEHeaders } from '@/lib/sse';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { stream } = createSSEStream(id, req, {
    sendTestEvent: true,
    testEventDelay: 2000,
    testEventData: { message: '连接测试成功' },
  });

  return new NextResponse(stream, {
    headers: getSSEHeaders(),
  });
}
