'use client';

import { useEffect, useRef, useState } from 'react';

import { AlertCircleIcon, CheckCircleIcon, InfoIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function TestPage() {
  // SSE Testing
  const [sseId, setSseId] = useState('');
  const [sseConnected, setSseConnected] = useState(false);
  const [sseEvents, setSseEvents] = useState<Array<{ event: string; data: any; timestamp: string }>>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Webhook Testing
  const [webhookId, setWebhookId] = useState('');
  const [webhookStatus, setWebhookStatus] = useState('idle');
  const [webhookAction, setWebhookAction] = useState('push');
  const [webhookEventType, setWebhookEventType] = useState('update');
  const [webhookPayload, setWebhookPayload] = useState(
    JSON.stringify(
      {
        progress: 50,
        message: '处理中...',
        details: {
          step: 'processing',
          timestamp: new Date().toISOString(),
        },
      },
      null,
      2
    )
  );

  // Connect to SSE endpoint
  const connectToSSE = () => {
    if (!sseId) {
      addSseEvent('error', 'ID is required', 'system');
      return;
    }

    // Close existing connection if any
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      setSseConnected(false);
    }

    try {
      const eventSource = new EventSource(`/api/sse/${sseId}`);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setSseConnected(true);
        addSseEvent('connected', `Connected to SSE channel: ${sseId}`, 'system');
      };

      eventSource.onerror = (error) => {
        // 检查是否是由于服务器端正常关闭连接导致的错误
        if (eventSource.readyState === EventSource.CLOSED) {
          console.log('SSE连接已关闭');
          addSseEvent('disconnected', '服务器已关闭连接', 'system');
        } else {
          console.error('SSE Error:', error);
          addSseEvent('error', `连接错误`, 'system');
        }

        setSseConnected(false);
        eventSource.close();
        eventSourceRef.current = null;
      };

      // Listen for all events
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          addSseEvent('message', data, 'message');
        } catch (error) {
          addSseEvent('message', event.data, 'message');
        }
      };

      // Listen for specific events
      ['starting', 'processing', 'update', 'completed', 'failed', 'broadcast', 'close', 'end'].forEach((eventType) => {
        eventSource.addEventListener(eventType, (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            addSseEvent(eventType, data, eventType);

            // 如果是关闭事件，显示提示信息
            if (eventType === 'close') {
              console.log('收到服务器关闭通知');
            }

            // 如果是结束事件，主动关闭客户端连接
            if (eventType === 'end') {
              console.log('收到服务器结束信号，主动断开连接');
              disconnectFromSSE();
            }
          } catch (error) {
            addSseEvent(eventType, event.data, eventType);
          }
        });
      });
    } catch (error) {
      console.error('Failed to create EventSource:', error);
      addSseEvent('error', `Failed to create EventSource: ${error}`, 'system');
    }
  };

  // Disconnect from SSE endpoint
  const disconnectFromSSE = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setSseConnected(false);
      addSseEvent('disconnected', 'Disconnected from SSE channel', 'system');
    }
  };

  // Add SSE event to the list
  const addSseEvent = (event: string, data: any, type: string) => {
    // 确保所有事件都显示在日志中
    setSseEvents((prev) => [
      {
        event,
        data,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);

    // 在控制台也打印事件，方便调试
    if (typeof data === 'object') {
      console.log(`[Event Log] ${event}:`, data);
    } else {
      console.log(`[Event Log] ${event}: ${data}`);
    }
  };

  // Send webhook to trigger SSE update
  const sendWebhook = () => {
    if (!webhookId) {
      setWebhookStatus('error');
      addSseEvent('error', 'Webhook ID is required', 'system');
      return;
    }

    try {
      // Prepare the webhook payload based on action type
      let payload;

      if (webhookAction === 'push') {
        if (!webhookEventType) {
          setWebhookStatus('error');
          addSseEvent('error', 'Event type is required for push action', 'system');
          return;
        }

        // For push action, we need event type and data
        payload = {
          action: 'push',
          id: webhookId,
          eventType: webhookEventType,
          data: JSON.parse(webhookPayload),
        };
      } else if (webhookAction === 'close') {
        // For close action, we just need id and optional message
        payload = {
          action: 'close',
          id: webhookId,
          message: 'Connection closed by webhook',
        };
      }

      setWebhookStatus('sending');
      addSseEvent('webhook', `Sending ${webhookAction} webhook to ID: ${webhookId}`, 'system');

      fetch('/api/sse/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer your-webhook-secret-key`,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Webhook sent successfully:', data);
          setWebhookStatus('success');
          addSseEvent('webhook', `Webhook ${webhookAction} sent successfully: ${JSON.stringify(data)}`, 'system');
          setTimeout(() => setWebhookStatus('idle'), 3000);
        })
        .catch((error) => {
          console.error('Error sending webhook:', error);
          setWebhookStatus('error');
          addSseEvent('error', `Error sending webhook: ${error.message}`, 'system');
        });
    } catch (error) {
      console.error('Error parsing webhook payload:', error);
      setWebhookStatus('error');
      addSseEvent(
        'error',
        `Error parsing webhook payload: ${error instanceof Error ? error.message : String(error)}`,
        'system'
      );
    }
  };

  // Clean up event source on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">API Testing Page</h1>

      <Tabs defaultValue="sse">
        <TabsList className="mb-4">
          <TabsTrigger value="sse">SSE Testing</TabsTrigger>
          <TabsTrigger value="webhook">Webhook Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="sse">
          <Card>
            <CardHeader>
              <CardTitle>Server-Sent Events (SSE) Testing</CardTitle>
              <CardDescription>Connect to an SSE channel and monitor events in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-end gap-4">
                <div className="flex-1">
                  <Label htmlFor="sseId" className="mb-2 block">
                    Channel ID
                  </Label>
                  <Input
                    id="sseId"
                    value={sseId}
                    onChange={(e) => setSseId(e.target.value)}
                    placeholder="Enter channel ID"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={connectToSSE} disabled={sseConnected || !sseId}>
                    Connect
                  </Button>
                  <Button onClick={disconnectFromSSE} variant="outline" disabled={!sseConnected}>
                    Disconnect
                  </Button>
                </div>
              </div>

              {sseConnected && (
                <Alert className="mb-4 bg-green-50">
                  <CheckCircleIcon className="size-4" />
                  <AlertTitle>Connected</AlertTitle>
                  <AlertDescription>Successfully connected to SSE channel: {sseId}</AlertDescription>
                </Alert>
              )}

              <div className="h-[400px] overflow-y-auto rounded-md border p-4">
                <h3 className="mb-2 font-medium">Event Log:</h3>
                {sseEvents.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">No events received yet</div>
                ) : (
                  <div className="space-y-3">
                    {sseEvents.map((event, index) => (
                      <div key={index} className={`rounded-md p-3 text-sm ${getEventColor(event.event)}`}>
                        <div className="mb-1 flex justify-between">
                          <span className="font-medium">{event.event}</span>
                          <span className="text-xs opacity-70">{new Date(event.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <pre className="overflow-x-auto whitespace-pre-wrap">
                          {typeof event.data === 'object' ? JSON.stringify(event.data, null, 2) : String(event.data)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhook">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Testing</CardTitle>
              <CardDescription>Send test webhook payloads to the webhook endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="webhookId" className="mb-2 block">
                  SSE Connection ID
                </Label>
                <Input
                  id="webhookId"
                  value={webhookId}
                  onChange={(e) => setWebhookId(e.target.value)}
                  placeholder="Enter the SSE connection ID to target"
                />
                <p className="mt-1 text-xs text-gray-500">This should match the ID used for the SSE connection</p>
              </div>

              <div className="mb-4">
                <Label htmlFor="webhookAction" className="mb-2 block">
                  Webhook Action
                </Label>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="actionPush"
                      name="webhookAction"
                      value="push"
                      checked={webhookAction === 'push'}
                      onChange={() => setWebhookAction('push')}
                      className="mr-2"
                    />
                    <label htmlFor="actionPush">Push Event</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="actionClose"
                      name="webhookAction"
                      value="close"
                      checked={webhookAction === 'close'}
                      onChange={() => setWebhookAction('close')}
                      className="mr-2"
                    />
                    <label htmlFor="actionClose">Close Connection</label>
                  </div>
                </div>
              </div>

              {webhookAction === 'push' && (
                <>
                  <div className="mb-4">
                    <Label htmlFor="webhookEventType" className="mb-2 block">
                      Event Type
                    </Label>
                    <select
                      id="webhookEventType"
                      value={webhookEventType}
                      onChange={(e) => setWebhookEventType(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                      <option value="update">update</option>
                      <option value="processing">processing</option>
                      <option value="completed">completed</option>
                      <option value="failed">failed</option>
                      <option value="custom">custom</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="webhookPayload" className="mb-2 block">
                      Event Data (JSON)
                    </Label>
                    <Textarea
                      id="webhookPayload"
                      value={webhookPayload}
                      onChange={(e) => setWebhookPayload(e.target.value)}
                      rows={8}
                      className="font-mono"
                    />
                  </div>
                </>
              )}

              {webhookStatus === 'error' && (
                <Alert className="mb-4 bg-red-50">
                  <AlertCircleIcon className="size-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Failed to send webhook. Check console for details.</AlertDescription>
                </Alert>
              )}

              {webhookStatus === 'success' && (
                <Alert className="mb-4 bg-green-50">
                  <CheckCircleIcon className="size-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Webhook sent successfully!</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={sendWebhook} disabled={webhookStatus === 'sending'}>
                {webhookStatus === 'sending'
                  ? 'Sending...'
                  : webhookAction === 'push'
                    ? 'Send Event'
                    : 'Close Connection'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper function to get event color
function getEventColor(event: string): string {
  switch (event) {
    case 'error':
      return 'bg-red-50';
    case 'connected':
    case 'succeeded':
    case 'completed':
      return 'bg-green-50';
    case 'processing':
    case 'starting':
    case 'update':
      return 'bg-blue-50';
    case 'disconnected':
      return 'bg-gray-100';
    default:
      return 'bg-gray-50';
  }
}
