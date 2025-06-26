import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { StyleTransfer } from '@/components/style-transfer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

export default async function StyleTransferPage() {
  const t = await getScopedI18n('style-transfer');
  const faqTotal = t('faq.list.total') as unknown as number;
  const faqs = Array.from({ length: faqTotal }).map((_, index) => ({
    question: t(`faq.list.items.${index}.question` as any),
    answer: t(`faq.list.items.${index}.answer` as any),
  }));
  const styleColors = [
    'from-pink-400 to-purple-400',
    'from-blue-400 to-cyan-400',
    'from-yellow-400 to-orange-400',
    'from-green-400 to-blue-400',
  ];
  const styleTransferInfoTotal = t('style-transfer-info.list.total') as unknown as number;
  const styleTransferInfos = Array.from({ length: styleTransferInfoTotal }).map((_, index) => ({
    color: styleColors[index % styleColors.length],
    title: t(`style-transfer-info.list.items.${index}.title` as any),
    description: t(`style-transfer-info.list.items.${index}.description` as any),
  }));
  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <section id="header" className="flex min-h-screen flex-col items-center justify-center space-y-8 py-16">
            <div className="text-center">
              <h1 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-4xl font-bold leading-normal tracking-tight text-transparent md:text-5xl md:leading-normal lg:text-6xl lg:leading-normal">
                {t('header.title')}
              </h1>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:text-xl md:leading-relaxed">
                {t('header.subtitle')}
              </p>
            </div>
            <div className="w-full">
              <StyleTransfer />
            </div>
          </section>

          {/* Style Transfer Information (English, Modern Column UI) */}
          <section id="style-transfer-info" className="min-h-screen py-16">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Left: Title, subtitle, button, image */}
              <div className="flex flex-col items-center space-y-8 lg:items-start">
                <div>
                  <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                    {t('style-transfer-info.title')}
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-md text-lg md:text-xl">
                    {t('style-transfer-info.description')}
                  </p>
                  <Link
                    href="#header"
                    className="rounded-lg bg-gradient-to-r from-green-400 to-blue-400 px-8 py-3 text-lg font-semibold text-white shadow-lg"
                  >
                    {t('style-transfer-info.try')}
                  </Link>
                </div>
                <div className="mx-auto mt-8 w-full max-w-4xl pb-20 pt-8">
                  <div className="relative">
                    {/* Main split-screen visual */}
                    <div className="bg-muted relative flex aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
                      {/* Left side: Content */}
                      <div className="relative h-full w-1/2">
                        <Image
                          src="/style-transfer-original.webp"
                          alt="Original Content"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                          CONTENT
                        </div>
                      </div>
                      {/* Right side: Result */}
                      <div className="relative h-full w-1/2">
                        <Image src="/style-transfer-result.png" alt="Styled Result" fill className="object-cover" />
                        <div className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                          RESULT
                        </div>
                      </div>
                      {/* Divider with arrow */}
                      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <div className="absolute h-full w-px bg-white/20"></div>
                        <div className="bg-background/80 border-border rounded-full border p-2 shadow-lg backdrop-blur-sm">
                          <ArrowRight className="text-primary size-6" />
                        </div>
                      </div>
                    </div>

                    {/* Style image floating below */}
                    <div className="group absolute -bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center">
                      <div className="border-background relative size-28 overflow-hidden rounded-full border-4 shadow-lg transition-transform duration-300 group-hover:scale-110 md:size-32">
                        <Image src="/style-transfer-style.webp" alt="Style Source" fill className="object-cover" />
                      </div>
                      <div className="mt-3 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                        STYLE
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: Four advantages */}
              <div className="grid grid-cols-1 gap-8">
                {styleTransferInfos.map((info, index) => (
                  <div key={index} className="bg-muted/50 flex items-start space-x-4 rounded-xl p-6 shadow-md">
                    <span
                      className={cn(
                        'mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br',
                        info.color
                      )}
                    ></span>
                    <div>
                      <h3 className="mb-1 text-xl font-semibold">{info.title}</h3>
                      <p className="text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section id="faq" className="min-h-screen py-16">
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
