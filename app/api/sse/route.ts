// app/api/sse/route.ts

let clients: Set<WritableStreamDefaultWriter> = new Set();

export async function GET() {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  clients.add(writer);

  const encoder = new TextEncoder();
  const send = (data: any) => {
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
  };

  // 立即发送一个心跳
  send({ type: 'connected', timestamp: Date.now() });

  const heartbeat = setInterval(() => {
    send({ type: 'ping', timestamp: Date.now() });
  }, 15000);

  // 清理逻辑
  const close = () => {
    clearInterval(heartbeat);
    clients.delete(writer);
    writer.close();
  };

  // 关闭时移除
  readable.pipeTo(new WritableStream({ close }));

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

// 后端主动广播用这个
export function broadcast(data: any) {
  const encoder = new TextEncoder();
  const msg = encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
  for (const writer of clients) {
    writer.write(msg).catch(() => {
      clients.delete(writer); // 防止失效链接阻塞
    });
  }
}
