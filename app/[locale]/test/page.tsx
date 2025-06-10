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

export default function ImageGenerationTest() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt) {
      toast({
        title: '提示词不能为空',
        description: '请输入提示词以生成图片',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      // 显示开始生成的提示
      toast({
        title: '开始生成图片',
        description: '正在处理您的请求，请稍候...',
      });

      // 发送 POST 请求开始生成图片
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || '生成图片失败');
      }

      const result = (await response.json()) as Prediction;
      const predictionId = result.id;

      if (!predictionId) {
        throw new Error('未能获取预测 ID');
      }

      // 开始轮询检查生成状态
      const pollInterval = 1000; // 1 秒检查一次
      const maxAttempts = 60; // 最多检查 60 次，约 3 分钟
      let attempts = 0;

      const checkStatus = async () => {
        if (attempts >= maxAttempts) {
          toast({
            title: '生成超时',
            description: '图片生成时间过长，请稍后刷新页面查看结果',
            variant: 'destructive',
          });
          setIsGenerating(false);
          return;
        }

        attempts++;

        try {
          const statusResponse = await fetch(`/api/prediction/${predictionId}`, {
            method: 'GET',
          });

          if (!statusResponse.ok) {
            throw new Error('检查状态失败');
          }

          const statusData = await statusResponse.json();

          if (statusData.status === 'succeeded') {
            // 生成成功
            setGeneratedImage(statusData.output[0]);
            toast({
              title: '图片生成成功',
              description: '已成功生成图片',
            });
            setIsGenerating(false);
            return; // 结束轮询
          } else if (statusData.status === 'failed') {
            // 生成失败
            toast({
              title: '生成图片失败',
              description: statusData.error || '未知错误',
              variant: 'destructive',
            });
            setIsGenerating(false);
            return; // 结束轮询
          }

          // 如果还在处理中，继续轮询
          setTimeout(checkStatus, pollInterval);
        } catch (error) {
          console.error('Error checking status:', error);
          // 出错时继续轮询
          setTimeout(checkStatus, pollInterval);
        }
      };

      // 开始首次轮询
      setTimeout(checkStatus, pollInterval);
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: '生成图片失败',
        description: error instanceof Error ? error.message : '请稍后重试',
        variant: 'destructive',
      });
      setIsGenerating(false);
    }
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
                disabled={isGenerating}
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
            <Button type="submit" disabled={isGenerating || !prompt}>
              {isGenerating ? (
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
