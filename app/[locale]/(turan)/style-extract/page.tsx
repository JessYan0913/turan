import { Copy } from 'lucide-react';
import Image from 'next/image';

import { ImageSlider } from '@/components/image-slider';
import { StylePreset } from '@/components/style-preset';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const faqItems = [
  {
    question: 'What are Style Presets?',
    answer:
      'Style Presets are pre-configured style templates that you can apply to your images with a single click. Each preset contains a combination of filters, effects, and adjustments to achieve a specific look.',
  },
  {
    question: 'Can I create my own Style Presets?',
    answer:
      'Yes! Pro users can create and save their own Style Presets. You can customize existing presets or create new ones from scratch to match your unique style.',
  },
  {
    question: 'How do I apply a Style Preset?',
    answer:
      'Simply click on any Style Preset to apply it to your image. You can adjust the intensity using the slider and make additional tweaks as needed.',
  },
  {
    question: 'Can I combine multiple Style Presets?',
    answer:
      'Yes, you can layer multiple Style Presets to create unique combinations. Adjust the opacity of each layer to control how they blend together.',
  },
  {
    question: 'Are Style Presets non-destructive?',
    answer:
      'Yes, all Style Presets are applied non-destructively, meaning your original image remains unchanged. You can remove or adjust any preset at any time.',
  },
  {
    question: 'Do Style Presets work with all image types?',
    answer:
      'Style Presets work with most common image formats including JPEG, PNG, and WebP. For best results, use high-quality images with good lighting.',
  },
];

const promptExamples = [
  {
    id: 1,
    image: 'https://img.artiversehub.ai/online/2025/6/20/a2489fa2-445a-4671-ae88-36d7ec49b5a8_11014526.png',
    prompt:
      '1boy, male_focus, hood, jeans, realistic, denim, afro, smile, solo, pants, hoodie, blurry_background, facial_hair, blurry, hands_in_pockets, outdoors, curly_hair, torn_pants, looking_at_viewer, brown_hair, torn_clothes, torn_jeans, blue_hoodie, teeth, grin',
    tags: ['portrait', 'male', 'casual'],
  },
  {
    id: 2,
    image: 'https://img.artiversehub.ai/online/2025/6/20/d65981cb-a619-4b15-8650-dac0137a1b41_11040960.jpeg',
    prompt:
      'aurora, no_humans, scenery, star_(sky), outdoors, sky, mountain, tree, starry_sky, snow, night, nature, night_sky, forest, winter',
    tags: ['landscape', 'night', 'nature'],
  },
  {
    id: 3,
    image: 'https://img.artiversehub.ai/online/2025/6/18/81c9f16e-e392-4ec8-8556-6e248a09b788_11020959.png',
    prompt:
      'cyberpunk, city, neon_lights, futuristic, night, rain, wet_street, reflections, skyscrapers, urban, dystopian, high_tech, low_life, blade_runner, neon_signs, hologram, advertisement, flying_cars, crowded, detailed, atmospheric',
    tags: ['cyberpunk', 'city', 'futuristic'],
  },
  {
    id: 4,
    image: 'https://img.artiversehub.ai/online/2025/6/16/c6628fb3-0cc1-4026-a308-06420e600891_11038925.png',
    prompt:
      'fantasy, magic, wizard, spell, glowing, particles, mystical, enchanted_forest, ancient, wisdom, beard, staff, robe, ritual, power, magical_energy, fantasy_world, detailed_background, dramatic_lighting, vibrant_colors, magical_atmosphere',
    tags: ['fantasy', 'magic', 'character'],
  },
];

export default function StylePresetPage() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <section id="header" className="flex min-h-screen flex-col items-center justify-center space-y-8 py-16 ">
            <div className="text-center">
              <h1 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
                Style Extract
              </h1>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
                Extract style from images with one-click style presets
              </p>
            </div>
            <div className="w-full">
              <StylePreset />
            </div>
          </section>

          {/* Image to Prompt Examples */}
          <section id="examples" className="min-h-screen flex-col items-center py-16">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Explore Examples for the{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                  Style Extract
                </span>
              </h2>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                See how our AI extracts detailed prompts from images. Use these examples to understand how the system
                works.
              </p>
            </div>

            {/* Image to Prompt Examples Grid */}
            <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {promptExamples.map((example) => (
                <Card key={example.id} className="h-[420px] overflow-hidden border shadow-md">
                  <div className="grid h-full grid-cols-1 md:grid-cols-2">
                    <div className="relative h-[420px] md:h-full">
                      <Image
                        src={example.image}
                        alt="Example image"
                        width={400}
                        height={400}
                        className="size-full object-cover"
                        style={{ height: '100%', width: '100%' }}
                      />
                      <div className="absolute left-2 top-2 flex flex-wrap gap-2">
                        {example.tags.map((tag, index) => (
                          <span key={index} className="rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex h-full flex-col p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Generated Prompt</h3>
                        <Button variant="ghost" size="icon" className="size-8" title="Copy prompt">
                          <Copy className="size-4" />
                        </Button>
                      </div>
                      <div className="bg-muted/50 grow overflow-auto rounded-lg p-4">
                        <p
                          className="text-muted-foreground whitespace-pre-wrap font-mono text-sm opacity-80"
                          style={{ userSelect: 'none' }}
                        >
                          {example.prompt.split(',').map((term, i) => (
                            <span key={i} className={i % 3 === 0 ? 'opacity-60' : i % 2 === 0 ? 'opacity-75' : ''}>
                              {term}
                              {i < example.prompt.split(',').length - 1 ? ',' : ''}
                              {i % 4 === 3 ? ' ' : ''}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Image to Prompt Generator Feature */}
          <section className="min-h-screen" id="image-to-prompt">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-6xl rounded-xl bg-black/90 p-6 shadow-xl md:p-8 lg:p-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-500">
                      <span className="size-2 rounded-full bg-blue-500"></span>
                      Image to Prompt Generator
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                      Image to Prompt Generator
                    </h2>
                    <p className="text-muted-foreground/90 text-base md:text-lg">
                      The Image to Prompt AI instantly analyzes your reference images and extracts key visual elements
                      like style, composition, lighting, and details into precise prompts...
                    </p>
                    <ul className="space-y-3 pt-4">
                      {[
                        'One-click style extraction',
                        'Precise visual matching',
                        'Easy reference-based creation',
                        'Enhanced image quality',
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                          <span className="flex size-5 items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/10 text-blue-500">
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative flex items-center justify-center overflow-hidden rounded-lg">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10 bg-black/50">
                      <Image
                        src="https://img.artiversehub.ai/online/2025/6/16/c6628fb3-0cc1-4026-a308-06420e600891_11038925.png"
                        alt="Example image for prompt generation"
                        width={500}
                        height={375}
                        className="size-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 p-6">
                        <div className="w-full rounded-md bg-black/80 p-4 text-center">
                          <div className="mx-auto mb-2 h-4 w-1/2 animate-pulse rounded bg-gray-700"></div>
                          <div className="mx-auto mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-700"></div>
                          <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-gray-700"></div>
                        </div>
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
                    How to Use Style Presets
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                    Transform your images in just a few clicks with our easy-to-use style presets
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    {
                      step: 1,
                      title: 'Upload Your Image',
                      description:
                        'Start by uploading an image you want to enhance. You can drag and drop an image or click to browse your files.',
                    },
                    {
                      step: 2,
                      title: 'Browse Style Presets',
                      description:
                        'Explore our collection of style presets. Hover over each preset to see a preview of how it will transform your image.',
                    },
                    {
                      step: 3,
                      title: 'Apply & Customize',
                      description:
                        'Click on any preset to apply it to your image. Adjust the intensity and make additional tweaks to perfect the look.',
                    },
                    {
                      step: 4,
                      title: 'Save & Share',
                      description:
                        'Download your styled image or save your favorite combinations as custom presets for future use.',
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
