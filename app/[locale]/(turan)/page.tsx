import { ArrowRight, Camera, Edit3, Palette, Sparkles, Upload } from 'lucide-react';
import type React from 'react';

import { ImageSlider } from '@/components/image-slider';
import { MainTabs } from '@/components/main-tabs';
import { Card, CardContent } from '@/components/ui/card';
import { getExamples } from '@/lib/actions/examples';
import { getScopedI18n } from '@/locales/server';

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

export default async function HomePage() {
  const t = await getScopedI18n('home');

  const examplesData = await getExamples();

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
          <MainTabs />

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
