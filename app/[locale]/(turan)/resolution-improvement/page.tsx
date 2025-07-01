import Image from 'next/image';
import type React from 'react';

import { ResolutionImprovement } from '@/components/resolution-improvement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getScopedI18n } from '@/locales/server';

export default async function ResolutionImprovementPage() {
  const t = await getScopedI18n('resolution-improvement');
  const faqTotal = t('faq.list.total') as unknown as number;
  const faqs = Array.from({ length: faqTotal }).map((_, index) => ({
    question: t(`faq.list.items.${index}.question` as any),
    answer: t(`faq.list.items.${index}.answer` as any),
  }));
  const howToUseTotal = t('how-to-use.list.total') as unknown as number;
  const howToUse = Array.from({ length: howToUseTotal }).map((_, index) => ({
    title: t(`how-to-use.list.items.${index}.title` as any),
    description: t(`how-to-use.list.items.${index}.description` as any),
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
              <ResolutionImprovement />
            </div>
          </section>

          {/* Description Section with Illustrations */}
          <section
            id="description"
            className="my-16 rounded-3xl bg-gradient-to-b from-white to-blue-50/30 py-16 dark:from-gray-900 dark:to-blue-950/20"
          >
            <div className="container px-4">
              <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                  {/* Left Column - Text Content */}
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                      <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                        {t('header.title')}
                      </span>
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">
                          AI-powered technology enhances image details with precision
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">Upscale images up to 4x while preserving quality</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">Intelligently reduces noise and enhances clarity</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">Perfect for photos, artwork, and digital images</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                      <a
                        href="#how-to-use"
                        className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:from-blue-700 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
                      >
                        Learn How It Works
                        <svg
                          className="ml-2 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Right Column - Illustrations */}
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                      <div className="aspect-[4/3] w-full bg-gradient-to-br from-blue-100 to-cyan-100 p-1 dark:from-blue-900/30 dark:to-cyan-900/30">
                        <div className="grid h-full grid-cols-2 gap-1">
                          <div className="relative overflow-hidden rounded-l-xl">
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Low Resolution</span>
                            </div>
                            <Image
                              src="https://img.artiversehub.ai/online/2025/6/20/a2489fa2-445a-4671-ae88-36d7ec49b5a8_11014526.png"
                              alt="Professional avatar"
                              className="aspect-square w-full object-cover"
                              width={400}
                              height={400}
                            />
                          </div>
                          <div className="relative overflow-hidden rounded-r-xl">
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Enhanced Resolution</span>
                            </div>
                            <Image
                              src="https://img.artiversehub.ai/online/2025/6/19/b40cc473-9f2a-4a72-afed-34f3389df0c7_11015153.png"
                              alt="Anime style avatar"
                              className="aspect-square w-full object-cover"
                              width={400}
                              height={400}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Comparison Slider Mockup */}
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-0.5 bg-white/80 shadow-lg"></div>
                        <div className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-blue-600"
                          >
                            <path d="m9 18 6-6-6-6" />
                            <path d="m15 6-6 6 6 6" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -right-6 -top-6 size-24 rounded-full bg-blue-600/10 blur-2xl"></div>
                    <div className="absolute -bottom-8 -left-8 size-32 rounded-full bg-cyan-600/10 blur-3xl"></div>

                    {/* Enhancement Stats */}
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Upscale Factor</p>
                        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">Up to 4x</p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Detail Enhancement</p>
                        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">300%</p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Processing Time</p>
                        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">~10 sec</p>
                      </div>
                    </div>
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
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg">{t('how-to-use.description')}</p>
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
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">{t('faq.description')}</p>
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
