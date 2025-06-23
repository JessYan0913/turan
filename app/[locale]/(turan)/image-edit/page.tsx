import type React from 'react';

import { ImageEdit } from '@/components/image-edit';
import { ImageSlider } from '@/components/image-slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getScopedI18n } from '@/locales/server';

const examples = [
  {
    id: 6,
    prompt: 'A magical forest with glowing mushrooms',
    imageUrl: 'https://img.artiversehub.ai/online/2025/6/20/d65981cb-a619-4b15-8650-dac0137a1b41_11040960.jpeg',
    style: 'Fantasy',
  },
  {
    id: 2,
    prompt: 'A futuristic city with flying cars and neon lights',
    imageUrl: 'https://img.artiversehub.ai/online/2025/6/18/81c9f16e-e392-4ec8-8556-6e248a09b788_11020959.png',
    style: 'Cyberpunk',
  },
  {
    id: 9,
    prompt: 'A magical forest with glowing mushrooms',
    imageUrl: 'https://img.artiversehub.ai/online/2025/6/18/094dd5c0-cdb5-44ae-af08-af31d46e5dad_11053931.png',
    style: 'Fantasy',
  },
  {
    id: 5,
    prompt: 'A beautiful sunset over the ocean',
    imageUrl: 'https://img.artiversehub.ai/online/2025/6/16/ba6cad48-f3d9-4222-b1f6-989cd0315884_11016625.jpeg',
    style: 'Oil Painting',
  },
  {
    id: 7,
    prompt: 'A magical forest with glowing mushrooms',
    imageUrl: 'https://img.artiversehub.ai/online/2025/6/18/81c9f16e-e392-4ec8-8556-6e248a09b788_11020959.png',
    style: 'Fantasy',
  },
  {
    id: 1,
    prompt: 'A serene landscape with mountains and a lake at sunset',
    imageUrl: 'https://img.artiversehub.ai/online/2025/6/20/a2489fa2-445a-4671-ae88-36d7ec49b5a8_11014526.png',
    style: 'Digital Art',
  },
  {
    id: 4,
    prompt: 'An astronaut floating in space with Earth in the background',
    imageUrl: 'https://img.artiversehub.ai/online/2025/6/16/c6628fb3-0cc1-4026-a308-06420e600891_11038925.png',
    style: 'Realistic',
  },
  {
    id: 3,
    prompt: 'A cute panda eating bamboo in a bamboo forest',
    imageUrl: 'https://img.artiversehub.ai/online/2025/6/19/b40cc473-9f2a-4a72-afed-34f3389df0c7_11015153.png',
    style: 'Watercolor',
  },
  {
    id: 8,
    prompt: 'A magical forest with glowing mushrooms',
    imageUrl: 'https://img.artiversehub.ai/online/2025/6/20/d65981cb-a619-4b15-8650-dac0137a1b41_11040960.jpeg',
    style: 'Fantasy',
  },
];

export default async function TextToImagePage() {
  const t = await getScopedI18n('image-edit');
  const faqTotal = t('faq.questions.total') as unknown as number;
  const faqs = Array.from({ length: faqTotal }).map((_, index) => ({
    question: t(`faq.questions.list.${index}.question` as any),
    answer: t(`faq.questions.list.${index}.answer` as any),
  }));
  const howToUseTotal = t('how-to-use.steps.total') as unknown as number;
  const howToUse = Array.from({ length: howToUseTotal }).map((_, index) => ({
    title: t(`how-to-use.steps.list.${index}.title` as any),
    description: t(`how-to-use.steps.list.${index}.description` as any),
  }));
  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* 标题区域 */}
          <section id="header" className="flex min-h-screen flex-col items-center justify-center space-y-8 py-16 ">
            <div className="text-center">
              <h1 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-4xl font-bold leading-normal tracking-tight text-transparent md:text-5xl md:leading-normal lg:text-6xl lg:leading-normal">
                {t('header.title')}
              </h1>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:text-xl md:leading-relaxed">
                {t('header.subtitle')}
              </p>
            </div>
            <div className="w-full">
              <ImageEdit />
            </div>
          </section>

          {/* 示例展示区 */}
          <section id="examples" className="min-h-screen flex-col items-center py-16">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                {t('examples.title01')}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                  {t('examples.title02')}
                </span>
              </h2>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg">{t('examples.subtitle')}</p>
            </div>

            {/* Example Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {examples.map((example) => (
                <Card
                  key={example.id}
                  className="border-border bg-card group overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-square">
                    <ImageSlider
                      beforeImage={example.imageUrl}
                      afterImage={example.imageUrl}
                      beforeLabel=""
                      afterLabel=""
                      className="size-full"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-foreground line-clamp-2 text-sm font-medium leading-tight">{example.prompt}</p>
                      <span className="border-border bg-secondary/30 text-muted-foreground inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
                        {example.style}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                {t('examples.more')}
              </Button>
            </div>
          </section>

          {/* How to Use Section */}
          <section id="how-to-use" className="flex min-h-screen items-center py-16">
            <div className="container px-2 md:px-4 lg:px-6">
              <div className="mx-auto max-w-4xl">
                <div className="mb-12 space-y-4 text-center">
                  <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                    {t('how-to-use.title')}
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg">{t('how-to-use.subtitle')}</p>
                </div>

                <div className="space-y-8">
                  {howToUse.map((item, index) => (
                    <div key={index} className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 bg-clip-text text-lg font-bold text-transparent">
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-foreground text-lg font-semibold">{item.title}</h3>
                        <p className="text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="flex min-h-screen items-center py-16">
            <div className="container px-2 md:px-4 lg:px-6">
              <div className="mx-auto max-w-6xl">
                <div className="mb-16 space-y-4 text-center">
                  <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                    {t('faq.title')}
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">{t('faq.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
                  {faqs.map((item, index) => (
                    <Card
                      key={index}
                      className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
                    >
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold md:text-xl">{item.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
