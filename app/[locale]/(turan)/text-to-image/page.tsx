import Image from 'next/image';
import type React from 'react';

import { TextToImage } from '@/components/text-to-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqItems = [
  {
    question: 'How does the AI image generator work?',
    answer:
      'Our AI uses advanced machine learning models to generate images based on your text prompts. Simply describe what you want to see, and the AI will create it for you.',
  },
  {
    question: 'Is there a limit to how many images I can generate?',
    answer:
      'Free users can generate up to 10 images per day. For unlimited generations and additional features, consider upgrading to our Pro plan.',
  },
  {
    question: 'Can I use the generated images commercially?',
    answer:
      'Yes, all images generated are royalty-free and can be used for both personal and commercial projects. However, you may not resell or redistribute the images as-is.',
  },
  {
    question: 'How can I get better results from the AI?',
    answer:
      'For best results, be specific with your prompts. Include details about style, colors, composition, and mood. You can also try different variations of your prompt to see different results.',
  },
  {
    question: 'What image formats are supported?',
    answer:
      'Our AI supports generating images in various formats including JPEG, PNG, and WebP. You can choose your preferred format in the download options.',
  },
  {
    question: 'Can I customize the image resolution?',
    answer:
      'Yes, you can select from various resolution options before generating your image. Higher resolutions may take slightly longer to process.',
  },
];

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
    id: 10,
    prompt: 'A magical forest with glowing mushrooms',
    imageUrl: 'https://img.artiversehub.ai/online/2025/6/20/d65981cb-a619-4b15-8650-dac0137a1b41_11040960.jpeg',
    style: 'Fantasy',
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

export default function TextToImagePage() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* 标题区域 */}
          <section id="header" className="flex min-h-screen flex-col items-center justify-center space-y-8 py-16 ">
            <div className="text-center">
              <h1 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-4xl font-bold leading-normal tracking-tight text-transparent md:text-5xl md:leading-normal lg:text-6xl lg:leading-normal">
                Turan AI Image Generator
              </h1>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:text-xl md:leading-relaxed">
                Input text description, AI will generate beautiful images for you
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
                Explore Prompts for the{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                  AI Image Generator
                </span>
              </h2>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                Input text description, AI will generate beautiful images for you
              </p>
            </div>

            {/* Example Grid */}
            <div className="mt-8 columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 [&>div]:mb-4">
              {examples.map((example) => (
                <div
                  key={example.id}
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
                Load More Examples
              </Button>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="flex min-h-screen items-center py-16">
            <div className="container px-2 md:px-4 lg:px-6">
              <div className="mx-auto max-w-6xl">
                <div className="mb-16 space-y-4 text-center">
                  <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
                    Find answers to common questions about our AI image generator
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
                  {faqItems.map((item, index) => (
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
