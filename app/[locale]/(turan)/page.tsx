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
import { useTheme } from '@/components/theme-provider';
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
  const { themeClasses } = useTheme();
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
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background} pt-16`}>
      <div className="p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          {/* 固定的标题区域 */}
          <div className="mb-10 text-center">
            <h1 className="mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
              {t('title')}
            </h1>
            <p className={`${themeClasses.textSecondary} text-lg`}>{t('subtitle')}</p>
          </div>

          {/* 主要功能区 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`mx-auto mb-8 grid w-full max-w-3xl grid-cols-4 gap-1 ${themeClasses.tabsList}`}>
              <TabsTrigger value="generate" className={themeClasses.tabsTrigger}>
                {t('tabs.generate')}
              </TabsTrigger>
              <TabsTrigger value="edit" className={themeClasses.tabsTrigger}>
                {t('tabs.edit')}
              </TabsTrigger>
              <TabsTrigger value="style" className={themeClasses.tabsTrigger}>
                {t('tabs.style')}
              </TabsTrigger>
              <TabsTrigger value="avatar" className={themeClasses.tabsTrigger}>
                {t('tabs.avatar')}
              </TabsTrigger>
            </TabsList>

            {/* 固定高度的内容区域，避免抖动 */}
            <div className="min-h-[600px]">
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
          <div className="mt-20">
            <div className="mb-16 text-center">
              <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                {t('examples.title')}
              </h2>
              <p className={`${themeClasses.textSecondary} text-lg`}>{t('examples.subtitle')}</p>
            </div>

            {/* 图像编辑示例 */}
            <div className="mb-16">
              <div className="mb-8 flex items-center">
                <Edit3 className="mr-3 size-5 text-blue-500" />
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>{t('examples.imageEdit')}</h3>
                <div className="ml-4 h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {examplesData?.editExamples?.map((example, index) => (
                  <Card key={index} className={`border-0 transition-all duration-300 ${themeClasses.card}`}>
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
                        <h4 className={`font-medium ${themeClasses.text} mb-1`}>{example.title}</h4>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>{t('examples.sliderHint')}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 风格转换示例 */}
            <div className="mb-16">
              <div className="mb-8 flex items-center">
                <Palette className="mr-3 size-5 text-purple-500" />
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>{t('examples.styleTransfer')}</h3>
                <div className="ml-4 h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {examplesData?.styleExamples?.map((example, index) => (
                  <Card key={index} className={`border-0 transition-all duration-300 ${themeClasses.card}`}>
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
                        <h4 className={`font-medium ${themeClasses.text} mb-1`}>{example.title}</h4>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>{t('examples.sliderHint')}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 头像生成示例 */}
            <div className="mb-16">
              <div className="mb-8 flex items-center">
                <Camera className="mr-3 size-5 text-green-500" />
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>{t('examples.avatarGeneration')}</h3>
                <div className="ml-4 h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {examplesData?.avatarExamples?.map((example, index) => (
                  <Card key={index} className={`border-0 transition-all duration-300 ${themeClasses.card}`}>
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
                        <h4 className={`font-medium ${themeClasses.text} mb-1`}>{example.title}</h4>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>{t('examples.sliderHint')}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* 简单的使用步骤 */}
          <div className="mb-8 mt-16">
            <h2
              className={`mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-2xl font-bold text-transparent`}
            >
              {t('steps.title')}
            </h2>
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              <Card className={`border-0 text-center transition-all duration-300 ${themeClasses.cardSubtle}`}>
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <Upload className="size-5 text-white" />
                  </div>
                  <h3 className={`mb-2 font-semibold ${themeClasses.text}`}>1. {t('steps.upload.title')}</h3>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>{t('steps.upload.description')}</p>
                </CardContent>
              </Card>
              <Card className={`border-0 text-center transition-all duration-300 ${themeClasses.cardSubtle}`}>
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <Sparkles className="size-5 text-white" />
                  </div>
                  <h3 className={`mb-2 font-semibold ${themeClasses.text}`}>2. {t('steps.select.title')}</h3>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>{t('steps.select.description')}</p>
                </CardContent>
              </Card>
              <Card className={`border-0 text-center transition-all duration-300 ${themeClasses.cardSubtle}`}>
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <ArrowRight className="size-5 text-white" />
                  </div>
                  <h3 className={`mb-2 font-semibold ${themeClasses.text}`}>3. {t('steps.download.title')}</h3>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>{t('steps.download.description')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
