import { CircleCheckBig } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

import { CreateAvatar } from '@/components/create-avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getScopedI18n } from '@/locales/server';

export default async function CreateAvatarPage() {
  const t = await getScopedI18n('create-avatar');
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
  const featuresTotal = t('features.items.total') as unknown as number;
  const features = Array.from({ length: featuresTotal }).map((_, index) => ({
    title: t(`features.items.list.${index}.title` as any),
    description: t(`features.items.list.${index}.description` as any),
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
              <CreateAvatar />
            </div>
          </section>

          {/* AI Avatar Generation Features */}
          <section id="features" className="flex min-h-screen items-center py-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Left side - Text content */}
              <div className="flex flex-col justify-center space-y-6">
                <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                  {t('features.title')}
                </h2>
                <p className="text-lg text-gray-700">{t('features.description')}</p>
                <div className="space-y-4">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <CircleCheckBig className="size-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Link
                    href="#header"
                    className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 font-medium text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {t('features.try')}
                  </Link>
                </div>
              </div>
              {/* Right side - Image grid */}
              <div className="relative grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <Image
                      src="https://img.artiversehub.ai/online/2025/6/20/a2489fa2-445a-4671-ae88-36d7ec49b5a8_11014526.png"
                      alt="Professional avatar"
                      className="aspect-square w-full object-cover"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <Image
                      src="https://img.artiversehub.ai/online/2025/6/19/b40cc473-9f2a-4a72-afed-34f3389df0c7_11015153.png"
                      alt="Anime style avatar"
                      className="aspect-square w-full object-cover"
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 pt-8">
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <Image
                      src="https://img.artiversehub.ai/online/2025/6/16/c6628fb3-0cc1-4026-a308-06420e600891_11038925.png"
                      alt="Realistic portrait"
                      className="aspect-square w-full object-cover"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <Image
                      src="https://img.artiversehub.ai/online/2025/6/18/81c9f16e-e392-4ec8-8556-6e248a09b788_11020959.png"
                      alt="Cyberpunk avatar"
                      className="aspect-square w-full object-cover"
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
                <div className="absolute -right-4 -top-4 z-10 flex size-16 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                  <div className="text-center text-xs font-bold">
                    <div>5-15</div>
                    <div>seconds</div>
                  </div>
                </div>
              </div>
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
                      <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-bold">
                        {index + 1}
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
