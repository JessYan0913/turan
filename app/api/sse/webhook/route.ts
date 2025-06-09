import { NextRequest, NextResponse } from 'next/server';

import { closeSSE, pushToSSE } from '@/lib/sse';

const WEBHOOK_SECRET = 'your-webhook-secret-key';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }
    const body = await req.json();
    const { action, id, eventType, data } = body;

    if (!id) {
      return NextResponse.json({ error: '缺少必要参数: id' }, { status: 400 });
    }

    switch (action) {
      case 'push':
        if (!eventType) {
          return NextResponse.json({ error: '缺少必要参数: eventType' }, { status: 400 });
        }

        const success = pushToSSE(id, eventType, data || {});
        if (success) {
          return NextResponse.json({ success: true, message: `成功推送 ${eventType} 事件到 ${id}` });
        } else {
          return NextResponse.json({ error: `推送失败: 未找到ID为 ${id} 的SSE连接` }, { status: 404 });
        }

      case 'close':
        const closeSuccess = closeSSE(id, body.message);
        if (closeSuccess) {
          return NextResponse.json({ success: true, message: `成功关闭 ${id} 的SSE连接` });
        } else {
          return NextResponse.json({ error: `关闭失败: 未找到ID为 ${id} 的SSE连接` }, { status: 404 });
        }

      default:
        return NextResponse.json({ error: `不支持的操作: ${action}` }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: '处理请求时发生错误' }, { status: 500 });
  }
}
