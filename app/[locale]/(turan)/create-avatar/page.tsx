import Image from 'next/image';
import type React from 'react';

import { CreateAvatar } from '@/components/create-avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqItems = [
  {
    question: 'How does the AI avatar generator work?',
    answer:
      'Our AI uses advanced machine learning models to generate personalized avatars based on your preferences. Simply select your desired style and features, and the AI will create a unique avatar for you.',
  },
  {
    question: 'Is there a limit to how many avatars I can generate?',
    answer:
      'Free users can generate up to 10 avatars per day. For unlimited generations and additional customization options, consider upgrading to our Pro plan.',
  },
  {
    question: 'Can I use the generated avatars commercially?',
    answer:
      'Yes, all avatars generated are royalty-free and can be used for both personal and commercial projects such as social media profiles, gaming accounts, or business presentations.',
  },
  {
    question: 'How can I get better results from the avatar generator?',
    answer:
      'For best results, be specific with your customization choices. Try different combinations of styles, features, and accessories to create your perfect avatar representation.',
  },
  {
    question: 'What image formats are supported for my avatar?',
    answer:
      'Our AI generates avatars in various formats including JPEG, PNG, and WebP. You can choose your preferred format in the download options, with PNG recommended for maintaining transparency.',
  },
  {
    question: 'Can I customize specific features of my avatar?',
    answer:
      'Yes, you can customize facial features, hairstyles, accessories, expressions, and background elements to create a truly personalized avatar that represents you.',
  },
];

export default function CreateAvatarPage() {
  return (
    <div className="min-h-screen py-8 transition-colors duration-300 md:py-12 lg:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* 标题区域 */}
          <section className="mb-12 space-y-4 text-center">
            <h1 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
              Turan AI Avatar Generator
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
              Create personalized avatars with AI
            </p>
          </section>

          {/* 主生成区域 */}
          <CreateAvatar />

          {/* AI Avatar Generation Features */}
          <section className="mt-24 scroll-m-20" id="features">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Left side - Text content */}
              <div className="flex flex-col justify-center space-y-6">
                <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                  AI Avatar Generation
                </h2>
                <p className="text-lg text-gray-700">
                  Easily create personalized avatars: simply upload your photo, and the AI will preserve your defining
                  features while seamlessly altering the background or adding decorative elements.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
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
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">Professional ID Photos</h3>
                      <p className="text-sm text-gray-600">
                        Create perfect passport, visa, and employee ID photos that meet official requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
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
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">Social Media Profiles</h3>
                      <p className="text-sm text-gray-600">
                        Stand out on LinkedIn, Instagram, Twitter, and other platforms with eye-catching avatars.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
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
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">Corporate Team Photos</h3>
                      <p className="text-sm text-gray-600">
                        Create consistent, professional avatars for your entire team or company directory.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
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
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">Gaming and Virtual Worlds</h3>
                      <p className="text-sm text-gray-600">
                        Design unique avatars for gaming platforms, metaverse spaces, and virtual communities.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 font-medium text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Try It Now
                  </Button>
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
          <section className="py-16 md:py-24" id="how-to-use">
            <div className="container px-2 md:px-4 lg:px-6">
              <div className="mx-auto max-w-4xl">
                <div className="mb-12 space-y-4 text-center">
                  <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                    How to Create Your Avatar
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                    Follow these simple steps to generate your perfect AI avatar
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    {
                      step: 1,
                      title: 'Choose an Avatar Style',
                      description:
                        'Browse through our example avatar styles or start with a blank canvas. Select a style that best represents your personality or brand.',
                    },
                    {
                      step: 2,
                      title: 'Customize Your Avatar',
                      description:
                        'Adjust features like facial characteristics, hairstyle, accessories, and background to create a unique avatar that represents you.',
                    },
                    {
                      step: 3,
                      title: 'Select Artistic Style',
                      description:
                        'Choose from various artistic styles like Realistic, Anime, Corporate, or Fantasy to give your avatar the perfect look and feel.',
                    },
                    {
                      step: 4,
                      title: 'Generate & Download',
                      description:
                        'Click the generate button and wait a few moments. Once your avatar is ready, you can download it in various formats for use across platforms.',
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                      <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-bold">
                        {item.step}
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
          <section className="py-16 md:py-24 lg:py-32" id="faq">
            <div className="container px-2 md:px-4 lg:px-6">
              <div className="mx-auto max-w-6xl">
                <div className="mb-16 space-y-4 text-center">
                  <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
                    Find answers to common questions about our AI avatar generator
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
