import { Code, Download, Globe, ScanLine, SmilePlus, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ImageSlider } from '@/components/image-slider';
import { PhotoRestore } from '@/components/photo-restore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getScopedI18n } from '@/locales/server';

export default async function PhotoRestorePage() {
  const t = await getScopedI18n('photo-restore');
  const featureIcons = [Code, Globe, Download];
  const featureTotal = t('features.items.total') as unknown as number;
  const features = Array.from({ length: featureTotal }).map((_, index) => ({
    icon: featureIcons[index],
    title: t(`features.items.list.${index}.title` as any),
    description: t(`features.items.list.${index}.description` as any),
  }));
  const technologyIcons = [ScanLine, Sparkles, SmilePlus];
  const technologyTotal = t('technology.items.total') as unknown as number;
  const technology = Array.from({ length: technologyTotal }).map((_, index) => ({
    icon: technologyIcons[index],
    title: t(`technology.items.list.${index}.title` as any),
    description: t(`technology.items.list.${index}.description` as any),
  }));
  const howToUseTotal = t('how-to-use.steps.total') as unknown as number;
  const howToUse = Array.from({ length: howToUseTotal }).map((_, index) => ({
    title: t(`how-to-use.steps.list.${index}.title` as any),
    description: t(`how-to-use.steps.list.${index}.description` as any),
  }));
  const faqTotal = t('faq.questions.total') as unknown as number;
  const faqs = Array.from({ length: faqTotal }).map((_, index) => ({
    question: t(`faq.questions.list.${index}.question` as any),
    answer: t(`faq.questions.list.${index}.answer` as any),
  }));
  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
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
              <PhotoRestore />
            </div>
          </section>

          {/* FLUX Kontext Feature Section */}
          <section id="features" className="flex min-h-screen items-center from-transparent py-16">
            <div className="container px-4">
              <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                      {t('features.title01')}{' '}
                      <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                        {t('features.title02')}
                      </span>
                    </h2>
                    <p className="text-muted-foreground text-lg">{t('features.description')}</p>
                    <div className="space-y-4">
                      {features.map((feature) => (
                        <div key={feature.title} className="flex items-start gap-3">
                          <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
                            <feature.icon className="size-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-xl md:h-[500px]">
                    {/* Before Image (Bottom Layer) */}
                    <div className="absolute inset-0">
                      <Image src="/caw-edited.png" alt="Before photo restoration" fill className="object-cover" />
                    </div>

                    {/* After Image (Top Layer with Diagonal Mask) */}
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                        WebkitClipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                      }}
                    >
                      <Image src="/caw-original.webp" alt="After photo restoration" fill className="object-cover" />
                    </div>

                    {/* Diagonal Line Indicator */}
                    <div className="absolute inset-0 z-10">
                      <div className="absolute right-0 top-0 size-3 -translate-y-1/2 translate-x-1/2 rounded-full border-4 border-white bg-blue-500 shadow-lg"></div>
                      <div className="absolute bottom-0 left-0 size-3 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white bg-blue-500 shadow-lg"></div>
                      <div
                        className="absolute right-0 top-0 h-full w-1 origin-top-right -translate-x-1/2 bg-white/50"
                        style={{
                          transform: 'rotate(-45deg) scaleY(1.5)',
                          transformOrigin: '100% 0%',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Showcase Section */}
          <section id="technology" className="flex min-h-screen items-center overflow-hidden py-16">
            <div className="container px-4">
              <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                    {t('technology.title01')}{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                      {t('technology.title02')}
                    </span>
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg">{t('technology.description')}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {technology.map((tech) => (
                    <div
                      key={tech.title}
                      className="bg-card border-border rounded-xl border p-6 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="mb-4 inline-block rounded-lg bg-blue-500/10 p-3 text-blue-500">
                        <tech.icon className="size-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">{tech.title}</h3>
                      <p className="text-muted-foreground">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Before & After Showcase Section */}
          <section id="examples" className="my-12 min-h-screen py-16">
            <div className="container px-4">
              <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                    {t('examples.title01')}{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                      {t('examples.title02')}
                    </span>
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg">{t('examples.description')}</p>
                </div>

                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="bg-card border-border overflow-hidden rounded-xl border shadow-md transition-all hover:shadow-lg">
                    <div className="relative aspect-[4/3]">
                      <ImageSlider
                        beforeImage="https://img.artiversehub.ai/online/2025/6/16/c6628fb3-0cc1-4026-a308-06420e600891_11038925.png"
                        afterImage="https://img.artiversehub.ai/online/2025/6/20/a2489fa2-445a-4671-ae88-36d7ec49b5a8_11014526.png"
                        beforeLabel="Original"
                        afterLabel="Restored"
                        className="size-full"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 text-xl font-semibold">Damaged Family Portrait from 1940s</h3>
                      <p className="text-muted-foreground">
                        This heavily scratched and faded family portrait was restored with our scratch repair
                        technology, bringing back the clarity and detail of this precious memory.
                      </p>
                    </div>
                  </div>

                  <div className="bg-card border-border overflow-hidden rounded-xl border shadow-md transition-all hover:shadow-lg">
                    <div className="relative aspect-[4/3]">
                      <ImageSlider
                        beforeImage="https://img.artiversehub.ai/online/2025/6/16/ba6cad48-f3d9-4222-b1f6-989cd0315884_11016625.jpeg"
                        afterImage="https://img.artiversehub.ai/online/2025/6/19/b40cc473-9f2a-4a72-afed-34f3389df0c7_11015153.png"
                        beforeLabel="Original"
                        afterLabel="Restored"
                        className="size-full"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 text-xl font-semibold">Black & White to Color Transformation</h3>
                      <p className="text-muted-foreground">
                        This black and white photograph from the 1920s was not only restored but also colorized with
                        historically accurate tones to bring this moment back to life.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="bg-card border-border overflow-hidden rounded-xl border shadow-md transition-all hover:shadow-lg">
                    <div className="relative aspect-square">
                      <ImageSlider
                        beforeImage="https://img.artiversehub.ai/online/2025/6/18/81c9f16e-e392-4ec8-8556-6e248a09b788_11020959.png"
                        afterImage="https://img.artiversehub.ai/online/2025/6/18/094dd5c0-cdb5-44ae-af08-af31d46e5dad_11053931.png"
                        beforeLabel="Original"
                        afterLabel="Restored"
                        className="size-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 text-lg font-semibold">Faded Color Photo</h3>
                      <p className="text-muted-foreground text-sm">Color enhancement and vibrancy restoration</p>
                    </div>
                  </div>

                  <div className="bg-card border-border overflow-hidden rounded-xl border shadow-md transition-all hover:shadow-lg">
                    <div className="relative aspect-square">
                      <ImageSlider
                        beforeImage="https://img.artiversehub.ai/online/2025/6/20/a2489fa2-445a-4671-ae88-36d7ec49b5a8_11014526.png"
                        afterImage="https://img.artiversehub.ai/online/2025/6/20/d65981cb-a619-4b15-8650-dac0137a1b41_11040960.jpeg"
                        beforeLabel="Original"
                        afterLabel="Restored"
                        className="size-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 text-lg font-semibold">Water Damaged Photo</h3>
                      <p className="text-muted-foreground text-sm">Stain removal and texture restoration</p>
                    </div>
                  </div>

                  <div className="bg-card border-border overflow-hidden rounded-xl border shadow-md transition-all hover:shadow-lg">
                    <div className="relative aspect-square">
                      <ImageSlider
                        beforeImage="https://img.artiversehub.ai/online/2025/6/16/c6628fb3-0cc1-4026-a308-06420e600891_11038925.png"
                        afterImage="https://img.artiversehub.ai/online/2025/6/19/b40cc473-9f2a-4a72-afed-34f3389df0c7_11015153.png"
                        beforeLabel="Original"
                        afterLabel="Restored"
                        className="size-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 text-lg font-semibold">Torn Family Photo</h3>
                      <p className="text-muted-foreground text-sm">Tear repair and detail reconstruction</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <Link
                    href="#header"
                    className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {t('examples.try')}
                  </Link>
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
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">{t('faq.description')}</p>
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
