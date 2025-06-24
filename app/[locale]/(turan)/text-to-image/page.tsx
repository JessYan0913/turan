import Image from 'next/image';
import type React from 'react';

import { TextToImage } from '@/components/text-to-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getScopedI18n } from '@/locales/server';

const examples = [
  {
    prompt: 'a cat holding a sign that says hello world',
    imageUrl: '/text-to-image-04.webp',
  },
  {
    prompt: 'a tiny astronaut hatching from an egg on the moon',
    imageUrl: '/text-to-image-07.webp',
  },
  {
    prompt: 'womens street skateboarding final in Paris Olympics 2024',
    imageUrl: '/text-to-image-11.webp',
  },
  {
    prompt: 'black forest gateau cake spelling out the words "FLUX SCHNELL", tasty, food photography, dynamic shot',
    imageUrl: '/text-to-image-03.webp',
  },
  {
    prompt: 'Lake Papaitonga',
    imageUrl: '/text-to-image-09.webp',
  },
  {
    prompt: 'Guillermo del Toro',
    imageUrl: '/text-to-image-08.webp',
  },
  {
    prompt: "Baldur's Gate 3 Astarion",
    imageUrl: '/text-to-image-10.webp',
  },
  {
    prompt: 'Trigun Meryl Stryfe',
    imageUrl: '/text-to-image-01.webp',
  },
  {
    prompt: 'Demon Slayer Nezuko Kamado',
    imageUrl: '/text-to-image-06.webp',
  },
  {
    prompt: 'Barista etching latte art with steady milk pouring precision',
    imageUrl: '/text-to-image-02.webp',
  },
  {
    prompt: 'Cow',
    imageUrl: '/text-to-image-05.webp',
  },
  {
    prompt: 'Neck Small Lotus',
    imageUrl: '/text-to-image-12.webp',
  },
];

export default async function TextToImagePage() {
  const t = await getScopedI18n('text-to-image');
  const faqTotal = t('faq.questions.total') as unknown as number;
  const faqs = Array.from({ length: faqTotal }).map((_, index) => ({
    question: t(`faq.questions.items.${index}.question` as any),
    answer: t(`faq.questions.items.${index}.answer` as any),
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
              <TextToImage />
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
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg">{t('examples.description')}</p>
            </div>

            {/* Example Grid */}
            <div className="mt-8 columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 [&>div]:mb-4">
              {examples.map((example, index) => (
                <div
                  key={index}
                  className="group relative mb-6 break-inside-avoid overflow-hidden rounded-lg transition-all hover:scale-105 hover:shadow-lg"
                >
                  <div className="relative">
                    <Image
                      src={example.imageUrl}
                      alt={example.prompt}
                      width={800}
                      height={600}
                      className="size-full object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="line-clamp-2 text-sm text-white">{example.prompt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                {t('examples.more')}
              </Button>
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
                    <Card key={index} className="h-full transition-all hover:shadow-lg">
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
