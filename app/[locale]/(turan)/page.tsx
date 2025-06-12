'use client';

import { useState } from 'react';

import { ArrowRight, Camera, Edit3, Palette, Sparkles, Upload, Wand2 } from 'lucide-react';
import type React from 'react';
import useSWR from 'swr';

import { AvatarGenerationTab } from '@/components/avatar-generation-tab';
import { ImageEditTab } from '@/components/image-edit-tab';
import { ImageGenerationTab } from '@/components/image-generation-tab';
import { ImageSlider } from '@/components/image-slider';
import { StyleTransformTab } from '@/components/style-transform-tab';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetcher } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

export interface ExampleInfo {
  title: string;
  before: string;
  after: string;
}

export interface ExamplesResponse {
  editExamples: ExampleInfo[];
  styleExamples: ExampleInfo[];
  avatarExamples: ExampleInfo[];
}

export default function HomePage() {
  const t = useScopedI18n('home');
  const [activeTab, setActiveTab] = useState('generate');

  const { data: examplesData } = useSWR<ExamplesResponse>('api/examples', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  return (
    <div className="min-h-screen py-8 transition-colors duration-300 md:py-12 lg:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* 固定的标题区域 */}
          <div className="mb-12 space-y-4 text-center">
            <h1 className="gradient-text text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{t('title')}</h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">{t('subtitle')}</p>
          </div>

          {/* 主要功能区 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mx-auto mb-8 max-w-3xl px-4">
              <TabsList className="tabs-list grid h-auto w-full grid-cols-4 gap-0.5 overflow-hidden rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
                <TabsTrigger
                  value="generate"
                  className="relative flex-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
                >
                  <span className="relative z-10">{t('tabs.generate')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="edit"
                  className="relative flex-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
                >
                  <span className="relative z-10">{t('tabs.edit')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="style"
                  className="relative flex-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
                >
                  <span className="relative z-10">{t('tabs.style')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="avatar"
                  className="relative flex-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
                >
                  <span className="relative z-10">{t('tabs.avatar')}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* 固定高度的内容区域，避免抖动 */}
            <div className="min-h-[600px] rounded-xl p-4 md:p-6">
              {/* 图像编辑功能 */}
              <TabsContent value="edit" className="mt-0">
                <ImageEditTab />
              </TabsContent>

              {/* 风格转换功能 */}
              <TabsContent value="style" className="mt-0">
                <StyleTransformTab />
              </TabsContent>

              {/* 头像生成功能 */}
              <TabsContent value="avatar" className="mt-0">
                <AvatarGenerationTab />
              </TabsContent>

              {/* 图片生成功能 */}
              <TabsContent value="generate" className="mt-0">
                <ImageGenerationTab />
              </TabsContent>
            </div>
          </Tabs>

          {/* 简约的精彩示例展示区域 */}
          <div className="mt-24 scroll-m-20" id="examples">
            <div className="mb-16 space-y-4 text-center">
              <h2 className="gradient-text text-3xl font-bold tracking-tight md:text-4xl">{t('examples.title')}</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{t('examples.subtitle')}</p>
            </div>

            {/* 图像编辑示例 */}
            <div className="mb-16">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/30">
                  <Edit3 className="size-5 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">{t('examples.imageEdit')}</h3>
                <div className="bg-border ml-4 h-px flex-1"></div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {examplesData?.editExamples?.map((example, index) => (
                  <Card key={index} className="card-base group">
                    <CardContent className="p-0">
                      <div className="relative h-40 overflow-hidden rounded-t-lg">
                        <ImageSlider
                          beforeImage={`/placeholder.svg?height=160&width=400&text=${example.before}`}
                          afterImage={`/placeholder.svg?height=160&width=400&text=${example.after}`}
                          beforeLabel={t('examples.original')}
                          afterLabel={example.title}
                          className="h-full rounded-t-lg"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-foreground mb-2 font-medium">{example.title}</h4>
                        <p className="text-muted-foreground text-sm">{t('examples.sliderHint')}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 风格转换示例 */}
            <div className="mb-16">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900/30">
                  <Palette className="size-5 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold">{t('examples.styleTransfer')}</h3>
                <div className="bg-border ml-4 h-px flex-1"></div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {examplesData?.styleExamples?.map((example, index) => (
                  <Card key={index} className="card-base group">
                    <CardContent className="p-0">
                      <div className="relative h-40">
                        <ImageSlider
                          beforeImage={`/placeholder.svg?height=160&width=400&text=${example.before}`}
                          afterImage={`/placeholder.svg?height=160&width=400&text=${example.after}`}
                          beforeLabel={t('examples.original')}
                          afterLabel={example.title}
                          className="h-full rounded-t-lg"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-foreground mb-1 font-medium">{example.title}</h4>
                        <p className="text-muted-foreground text-sm">{t('examples.sliderHint')}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 头像生成示例 */}
            <div className="mb-16">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                  <Camera className="size-5 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">{t('examples.avatarGeneration')}</h3>
                <div className="bg-border ml-4 h-px flex-1"></div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {examplesData?.avatarExamples?.map((example, index) => (
                  <Card key={index} className="card-base group">
                    <CardContent className="p-0">
                      <div className="relative h-40">
                        <ImageSlider
                          beforeImage={`/placeholder.svg?height=160&width=400&text=${example.before}`}
                          afterImage={`/placeholder.svg?height=160&width=400&text=${example.after}`}
                          beforeLabel={t('examples.original')}
                          afterLabel={example.title}
                          className="h-full rounded-t-lg"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-foreground mb-1 font-medium">{example.title}</h4>
                        <p className="text-muted-foreground text-sm">{t('examples.sliderHint')}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* 简单的使用步骤 */}
          <div className="mb-16 mt-24 scroll-m-20" id="how-it-works">
            <h2 className="gradient-text mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
              {t('steps.title')}
            </h2>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              <Card className="card-base text-center transition-all duration-300 hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                      <Upload className="size-5 text-white" />
                    </div>
                    <div className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white">
                      1
                    </div>
                    <h3 className="mb-2 font-semibold">{t('steps.upload.title')}</h3>
                    <p className="text-sm">{t('steps.upload.description')}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-base text-center transition-all duration-300 hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                      <Sparkles className="size-5 text-white" />
                    </div>
                    <div className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white">
                      2
                    </div>
                    <h3 className="mb-2 font-semibold">{t('steps.select.title')}</h3>
                    <p className="text-sm">{t('steps.select.description')}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-base text-center transition-all duration-300 hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                      <ArrowRight className="size-5 text-white" />
                    </div>
                    <div className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white">
                      3
                    </div>
                    <h3 className="mb-2 font-semibold">{t('steps.download.title')}</h3>
                    <p className="text-sm">{t('steps.download.description')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
