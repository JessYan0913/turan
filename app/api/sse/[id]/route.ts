import { NextResponse } from 'next/server';

import { getPredictionById } from '@/lib/db/queries';
import { type Prediction } from '@/lib/db/schema';

let clients: Set<WritableStreamDefaultWriter> = new Set();

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const prediction = await getPredictionById(id);

  if (!prediction) {
    return NextResponse.json({ error: 'Prediction not found' }, { status: 404 });
  }

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  clients.add(writer);

  const encoder = new TextEncoder();
  const send = (data: Prediction) => {
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
  };

  // 立即发送一个心跳
  send(prediction);

  const heartbeat = setInterval(() => {
    send(prediction);
  }, 15000);

  // 清理逻辑
  const close = () => {
    clearInterval(heartbeat);
    clients.delete(writer);
    writer.close();
  };

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

// 后端主动广播用这个
export function broadcast(data: Prediction) {
  const encoder = new TextEncoder();
  const msg = encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
  for (const writer of clients) {
    writer.write(msg).catch(() => {
      clients.delete(writer); // 防止失效链接阻塞
    });
  }
}
