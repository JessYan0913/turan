import { NextRequest } from 'next/server';

// 全局存储所有活跃的SSE连接控制器
export type SSEController = {
  controller: ReadableStreamDefaultController;
  encoder: TextEncoder;
};

// 使用全局对象来存储连接，以便在同一Node.js进程中的不同请求之间共享
// 注意: 在生产环境中，应该使用Redis或其他外部存储来保存连接信息
// 因为Next.js的serverless函数可能会在不同的实例上运行

// 定义全局类型，使其包含我们的连接映射
declare global {
  var sseConnections: Map<string, SSEController>;
}

// 初始化全局连接映射
if (!global.sseConnections) {
  global.sseConnections = new Map<string, SSEController>();
}

// 导出全局连接映射的引用
export const activeConnections = global.sseConnections;

/**
 * SSE配置选项
 */
export interface SSEOptions {
  /** 初始连接事件的类型，默认为 'connected' */
  connectEventType?: string;
  /** 初始连接事件的数据，默认包含 id, status 和 message */
  connectEventData?: Record<string, any>;
  /** 是否发送测试事件，默认为 false */
  sendTestEvent?: boolean;
  /** 测试事件的延迟时间（毫秒），默认为 2000ms */
  testEventDelay?: number;
  /** 测试事件的类型，默认为 'test' */
  testEventType?: string;
  /** 测试事件的数据，默认包含 id 和 message */
  testEventData?: Record<string, any>;
}

/**
 * 创建SSE响应流
 * @param id 连接ID
 * @param req NextRequest对象
 * @param options SSE配置选项
 * @returns 包含流和编码器的对象
 */
export function createSSEStream(id: string, req: NextRequest, options: SSEOptions = {}) {
  // 默认选项
  const {
    connectEventType = 'connected',
    connectEventData,
    sendTestEvent = false,
    testEventDelay = 2000,
    testEventType = 'test',
    testEventData,
  } = options;

  // 创建SSE响应
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // 将当前连接添加到活跃连接列表
      activeConnections.set(id, { controller, encoder });

      // 发送SSE连接保持事件
      controller.enqueue(encoder.encode(': \n\n'));

      // 发送初始状态
      const defaultConnectData = {
        id,
        status: 'connected',
        message: 'SSE连接已建立',
        ...connectEventData,
      };

      const startEvent = `event: ${connectEventType}\ndata: ${JSON.stringify(defaultConnectData)}\n\n`;
      controller.enqueue(encoder.encode(startEvent));

      // 发送测试事件（如果启用）
      if (sendTestEvent) {
        setTimeout(() => {
          try {
            const defaultTestData = {
              id,
              message: '连接测试成功',
              ...testEventData,
            };

            const testEvent = `event: ${testEventType}\ndata: ${JSON.stringify(defaultTestData)}\n\n`;
            controller.enqueue(encoder.encode(testEvent));
          } catch (error) {
            console.error('发送测试事件失败:', error);
          }
        }, testEventDelay);
      }

      // 处理连接关闭
      req.signal.addEventListener('abort', () => {
        // 从活跃连接中移除
        activeConnections.delete(id);
      });
    },
  });

  return { stream, encoder };
}

/**
 * 获取SSE响应的默认头信息
 */
export function getSSEHeaders() {
  return {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  };
}

/**
 * 推送事件到指定的连接
 * @param id 连接ID
 * @param eventType 事件类型
 * @param data 事件数据
 * @returns 是否推送成功
 */
export function pushToSSE(id: string, eventType: string, data: any): boolean {
  const connection = activeConnections.get(id);
  if (!connection) {
    return false;
  }
  try {
    const { controller, encoder } = connection;
    const event = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
    controller.enqueue(encoder.encode(event));
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 关闭指定的SSE连接
 * @param id 连接ID
 * @param message 可选的关闭消息
 * @returns 是否关闭成功
 */
export function closeSSE(id: string, message?: string): boolean {
  const connection = activeConnections.get(id);
  if (!connection) {
    return false;
  }
  try {
    const { controller, encoder } = connection;

    // 发送关闭通知
    if (message) {
      const closeNoticeData = { id, message };
      const closeEvent = `event: close\ndata: ${JSON.stringify(closeNoticeData)}\n\n`;
      controller.enqueue(encoder.encode(closeEvent));
    }
    // 发送结束事件
    controller.enqueue(encoder.encode('event: end\ndata: null\n\n'));
    controller.close();

    // 从活跃连接中移除
    activeConnections.delete(id);
    return true;
  } catch (error) {
    return false;
  }
}
