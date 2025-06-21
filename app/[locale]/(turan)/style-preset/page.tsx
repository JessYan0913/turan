import { ImageSlider } from '@/components/image-slider';
import { StyleTransfer } from '@/components/style-transfer';
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

const stylePresets = [
  {
    id: 1,
    name: 'Cinematic',
    description: 'Dramatic lighting and high contrast for a film-like quality',
    beforeImage: 'https://img.artiversehub.ai/online/2025/6/20/a2489fa2-445a-4671-ae88-36d7ec49b5a8_11014526.png',
    afterImage: 'https://img.artiversehub.ai/online/2025/6/20/d65981cb-a619-4b15-8650-dac0137a1b41_11040960.jpeg',
    category: 'Photography',
  },
  {
    id: 2,
    name: 'Cyberpunk',
    description: 'Neon lights and futuristic color grading',
    beforeImage: 'https://img.artiversehub.ai/online/2025/6/18/81c9f16e-e392-4ec8-8556-6e248a09b788_11020959.png',
    afterImage: 'https://img.artiversehub.ai/online/2025/6/18/094dd5c0-cdb5-44ae-af08-af31d46e5dad_11053931.png',
    category: 'Digital Art',
  },
  {
    id: 3,
    name: 'Vintage Film',
    description: 'Classic film grain and faded colors',
    beforeImage: 'https://img.artiversehub.ai/online/2025/6/16/ba6cad48-f3d9-4222-b1f6-989cd0315884_11016625.jpeg',
    afterImage: 'https://img.artiversehub.ai/online/2025/6/19/b40cc473-9f2a-4a72-afed-34f3389df0c7_11015153.png',
    category: 'Vintage',
  },
  {
    id: 4,
    name: 'Watercolor',
    description: 'Soft, artistic watercolor painting effect',
    beforeImage: 'https://img.artiversehub.ai/online/2025/6/16/c6628fb3-0cc1-4026-a308-06420e600891_11038925.png',
    afterImage: 'https://img.artiversehub.ai/online/2025/6/20/a2489fa2-445a-4671-ae88-36d7ec49b5a8_11014526.png',
    category: 'Artistic',
  },
  {
    id: 5,
    name: 'Minimalist',
    description: 'Clean lines and reduced color palette',
    beforeImage: 'https://img.artiversehub.ai/online/2025/6/18/81c9f16e-e392-4ec8-8556-6e248a09b788_11020959.png',
    afterImage: 'https://img.artiversehub.ai/online/2025/6/20/d65981cb-a619-4b15-8650-dac0137a1b41_11040960.jpeg',
    category: 'Design',
  },
  {
    id: 6,
    name: 'Fantasy',
    description: 'Ethereal glow and magical atmosphere',
    beforeImage: 'https://img.artiversehub.ai/online/2025/6/20/a2489fa2-445a-4671-ae88-36d7ec49b5a8_11014526.png',
    afterImage: 'https://img.artiversehub.ai/online/2025/6/20/d65981cb-a619-4b15-8650-dac0137a1b41_11040960.jpeg',
    category: 'Artistic',
  },
  {
    id: 7,
    name: 'Noir',
    description: 'High contrast black and white with deep shadows',
    beforeImage: 'https://img.artiversehub.ai/online/2025/6/18/094dd5c0-cdb5-44ae-af08-af31d46e5dad_11053931.png',
    afterImage: 'https://img.artiversehub.ai/online/2025/6/16/ba6cad48-f3d9-4222-b1f6-989cd0315884_11016625.jpeg',
    category: 'Photography',
  },
  {
    id: 8,
    name: 'Pastel Dreams',
    description: 'Soft, dreamy pastel colors',
    beforeImage: 'https://img.artiversehub.ai/online/2025/6/16/c6628fb3-0cc1-4026-a308-06420e600891_11038925.png',
    afterImage: 'https://img.artiversehub.ai/online/2025/6/19/b40cc473-9f2a-4a72-afed-34f3389df0c7_11015153.png',
    category: 'Artistic',
  },
  {
    id: 9,
    name: 'Oil Painting',
    description: 'Classic oil painting texture and brush strokes',
    beforeImage: 'https://img.artiversehub.ai/online/2025/6/20/a2489fa2-445a-4671-ae88-36d7ec49b5a8_11014526.png',
    afterImage: 'https://img.artiversehub.ai/online/2025/6/16/ba6cad48-f3d9-4222-b1f6-989cd0315884_11016625.jpeg',
    category: 'Artistic',
  },
  {
    id: 10,
    name: 'Neon Glow',
    description: 'Vibrant neon colors and glow effects',
    beforeImage: 'https://img.artiversehub.ai/online/2025/6/18/81c9f16e-e392-4ec8-8556-6e248a09b788_11020959.png',
    afterImage: 'https://img.artiversehub.ai/online/2025/6/20/d65981cb-a619-4b15-8650-dac0137a1b41_11040960.jpeg',
    category: 'Digital Art',
  },
];

export default function StylePresetPage() {
  return (
    <div className="min-h-screen py-8 transition-colors duration-300 md:py-12 lg:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <section className="mb-12 space-y-4 text-center">
            <h1 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
              Style Presets
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
              Transform your images with one-click style presets
            </p>
          </section>

          <StyleTransfer />

          {/* Style Presets Grid */}
          <section className="mt-12 scroll-m-20" id="presets">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Explore Style Presets
              </h2>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
                Browse our collection of professionally designed presets. Click any preset to see a preview of how it
                transforms your image.
              </p>
            </div>

            {/* Style Presets Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stylePresets.map((preset) => (
                <Card
                  key={preset.id}
                  className="border-border bg-card group overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative aspect-square">
                    <ImageSlider
                      beforeImage={preset.beforeImage}
                      afterImage={preset.afterImage}
                      beforeLabel="Original"
                      afterLabel="With Preset"
                      className="size-full"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-foreground text-lg font-semibold">{preset.name}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">{preset.description}</p>
                      </div>
                      <span className="border-border bg-secondary/30 text-muted-foreground inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
                        {preset.category}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Apply Preset
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Load More Presets
              </Button>
            </div>
          </section>

          {/* How to Use Section */}
          <section className="py-16 md:py-24" id="how-to-use">
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
