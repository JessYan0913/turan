'use client';

import { useState } from 'react';

import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { type Prediction } from 'replicate';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { usePollingRequest } from '@/lib/hooks/usePollingRequest';

export default function ImageGenerationTest() {
  const [prompt, setPrompt] = useState('');

  const {
    execute: generateImage,
    data: generatedImage,
    status,
  } = usePollingRequest<{ prompt: string }, Prediction>({
    // 发起生成图片的请求
    request: async (data) => {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || '生成图片失败');
      }
      return response.json();
    },
    // 检查生成状态
    checkStatus: async (id) => {
      const response = await fetch(`/api/prediction/${id}`);
      if (!response.ok) {
        throw new Error('检查状态失败');
      }
      return response.json();
    },
    // 判断是否完成
    isComplete: (data: Prediction) => data.status === 'succeeded' || data.status === 'failed',
    // 提取结果
    getResult: (data: Prediction) => (data.status === 'succeeded' ? data.output[0] : null),

    // 自定义消息
    successMessage: '图片生成成功',
    errorMessage: '生成图片失败',
    timeoutMessage: '图片生成时间过长，请稍后刷新页面查看结果',
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt) {
      toast({
        title: '提示词不能为空',
        description: '请输入提示词以生成图片',
        variant: 'destructive',
      });
      return;
    }

    generateImage({ prompt });
  };

  // 组件卸载时的清理工作
  return (
    <div className="container mx-auto py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>图片生成测试</CardTitle>
          <CardDescription>输入提示词生成图片</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">提示词</Label>
              <Textarea
                id="prompt"
                placeholder="请输入图片描述..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={status === 'loading' || status === 'polling'}
                rows={4}
              />
            </div>

            {generatedImage && (
              <div className="space-y-2">
                <Label>生成结果</Label>
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                  <Image src={generatedImage} alt="Generated" fill className="object-cover" priority />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={status === 'loading' || status === 'polling' || !prompt}>
              {status === 'loading' || status === 'polling' ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  生成中...
                </>
              ) : (
                '生成图片'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
