import { Code, Download, Globe, ScanLine, SmilePlus, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ImageSlider } from '@/components/image-slider';
import { PhotoRestore } from '@/components/photo-restore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqItems = [
  {
    question: 'What types of photo damage can this tool repair?',
    answer:
      'Our AI-powered restoration tool can effectively repair various types of photo damage including scratches, dust spots, tears, creases, water stains, and general wear and tear. It also handles fading, yellowing, and discoloration that commonly occur in old photographs.',
  },
  {
    question: 'How does the AI handle colorization of black and white photos?',
    answer:
      'The FLUX Kontext Pro model uses advanced AI to add realistic colors to black and white photos. It analyzes the content and context of your image to apply historically accurate colors while maintaining the natural look and feel of the original photograph.',
  },
  {
    question: 'Will the restoration process change the original photo?',
    answer:
      'No, the original photo remains completely untouched. The restoration process creates a new, enhanced version of your photo while preserving the original file exactly as it was uploaded.',
  },
  {
    question: 'What is the recommended image quality for best results?',
    answer:
      'For optimal restoration, we recommend using high-quality scans or digital copies of your photos. Ideal specifications are: minimum 300 DPI resolution, well-lit conditions, and saved in lossless formats like TIFF or PNG when possible.',
  },
  {
    question: 'Can the tool restore severely damaged or partial photos?',
    answer:
      'While the tool can reconstruct missing or heavily damaged areas, results may vary depending on the extent of damage. For photos with significant portions missing, some manual editing might be needed for optimal results.',
  },
  {
    question: 'How long does the restoration process take?',
    answer:
      'Processing time depends on the image size and complexity of restoration needed. Most standard photos are processed within 30-90 seconds. Higher resolution images or those requiring extensive repairs may take longer.',
  },
  {
    question: 'What file formats are supported for upload?',
    answer:
      'The tool supports common image formats including JPEG, PNG, and WebP. For best results, especially with professional scanning, we recommend using TIFF format as it preserves maximum image quality.',
  },
  {
    question: 'Can I adjust the intensity of the restoration?',
    answer:
      'Yes, the tool provides adjustment options to control the strength of restoration effects, allowing you to balance between preserving the original character of the photo and applying restoration enhancements.',
  },
  {
    question: 'Is there a limit to the photo size I can upload?',
    answer:
      'The system can process photos up to 50MB in size. For very large images, we recommend resizing to a maximum of 5000 pixels on the longest side for optimal performance.',
  },
  {
    question: 'How do I get the best results from the restoration?',
    answer:
      'For best results: 1) Use the highest quality scan possible 2) Ensure good lighting when photographing prints 3) Clean the photo surface before scanning 4) Save in a lossless format 5) For physical photos, scan at 600 DPI or higher if possible.',
  },
];

export default function PhotoRestorePage() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <section id="header" className="flex min-h-screen flex-col items-center justify-center space-y-8 py-16 ">
            <div className="text-center">
              <h1 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-4xl font-bold leading-normal tracking-tight text-transparent md:text-5xl md:leading-normal lg:text-6xl lg:leading-normal">
                Old Photo Restoration
              </h1>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:text-xl md:leading-relaxed">
                Breathe new life into your cherished memories with our AI-powered photo restoration
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
                      Powered by{' '}
                      <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                        FLUX Kontext
                      </span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      Our advanced AI restoration technology brings your old photographs back to life with incredible
                      detail and accuracy.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
                          <Code className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Fix Scratches & Damage</h3>
                          <p className="text-muted-foreground">
                            Automatically repair tears, creases, stains, and other physical damage that has accumulated
                            over time.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
                          <Globe className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Colorize Black & White Photos</h3>
                          <p className="text-muted-foreground">
                            Transform monochrome memories into vibrant color images with historically accurate and
                            natural-looking results.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
                          <Download className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Enhance Resolution</h3>
                          <p className="text-muted-foreground">
                            Upscale low-resolution scans to reveal hidden details and create print-worthy restorations
                            of your family heirlooms.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20"></div>
                    <Image
                      src="https://img.artiversehub.ai/online/2025/6/16/ba6cad48-f3d9-4222-b1f6-989cd0315884_11016625.jpeg"
                      alt="Before and after photo restoration"
                      width={800}
                      height={600}
                      className="h-auto w-full object-cover"
                      priority
                    />
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
                    Advanced Restoration{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                      Technology
                    </span>
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                    Our AI-powered restoration process uses cutting-edge techniques to bring your memories back to life
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <div className="bg-card border-border rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-4 inline-block rounded-lg bg-blue-500/10 p-3 text-blue-500">
                      <ScanLine className="size-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Smart Damage Detection</h3>
                    <p className="text-muted-foreground">
                      Our AI automatically identifies different types of damage in your photos, from scratches and tears
                      to fading and discoloration, applying the appropriate restoration techniques to each area.
                    </p>
                  </div>

                  <div className="bg-card border-border rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-4 inline-block rounded-lg bg-blue-500/10 p-3 text-blue-500">
                      <Sparkles className="size-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Historical Color Accuracy</h3>
                    <p className="text-muted-foreground">
                      When colorizing black and white photos, our AI has been trained on thousands of historical images
                      to ensure period-accurate colors for clothing, objects, and environments.
                    </p>
                  </div>

                  <div className="bg-card border-border rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-4 inline-block rounded-lg bg-blue-500/10 p-3 text-blue-500">
                      <SmilePlus className="size-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Face Enhancement</h3>
                    <p className="text-muted-foreground">
                      Special attention is given to faces in your photos, with advanced facial recognition that
                      preserves the identity and expressions of your loved ones while enhancing clarity and detail.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Before & After Showcase Section */}
          <section className="my-12 py-16">
            <div className="container px-4">
              <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                    Before & After{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                      Showcase
                    </span>
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                    See the remarkable transformations our AI restoration technology can achieve
                  </p>
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
                  <Button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Upload Your Photo Now
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use Section */}
          <section className="flex min-h-screen items-center py-16" id="how-to-use">
            <div className="container px-2 md:px-4 lg:px-6">
              <div className="mx-auto max-w-4xl">
                <div className="mb-12 space-y-4 text-center">
                  <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                    How to Restore Your Old Photos
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                    Bring your cherished memories back to life in just a few simple steps
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    {
                      step: 1,
                      title: 'Upload Your Old Photo',
                      description:
                        'Start by uploading the old photograph you want to restore. You can scan your physical photo, drag and drop an image file, or click to browse your files.',
                    },
                    {
                      step: 2,
                      title: 'Select Restoration Type',
                      description:
                        "Choose the type of restoration that best suits your photo's condition. Our AI will analyze the damage and suggest the most appropriate restoration techniques.",
                    },
                    {
                      step: 3,
                      title: 'Review & Refine',
                      description:
                        'Preview the restored photo and make any adjustments. Fine-tune the restoration intensity, color balance, sharpness, and other parameters to achieve the perfect result.',
                    },
                    {
                      step: 4,
                      title: 'Save & Share',
                      description:
                        'Download your beautifully restored photograph in high resolution. Share your revitalized memories with family and friends or print them for display.',
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
          <section className="flex min-h-screen items-center py-16" id="faq">
            <div className="container px-2 md:px-4 lg:px-6">
              <div className="mx-auto max-w-6xl">
                <div className="mb-16 space-y-4 text-center">
                  <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
                    Find answers to common questions about our AI photo restoration technology
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

          {/* Before & After Showcase */}
          <section id="showcase" className="flex min-h-screen items-center py-16">
            <div className="container px-4">
              <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                    See the{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                      Transformation
                    </span>
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                    Witness the remarkable difference our restoration technology makes
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                  <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="https://img.artiversehub.ai/online/2025/6/18/81c9f16e-e392-4ec8-8556-6e248a09b788_11020959.png"
                        alt="Before restoration"
                        width={500}
                        height={500}
                        className="size-full object-cover"
                        priority
                      />
                    </div>
                    <div className="bg-muted/30 p-4 text-center">
                      <h3 className="text-lg font-medium">Before Restoration</h3>
                    </div>
                  </div>

                  <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="https://img.artiversehub.ai/online/2025/6/18/094dd5c0-cdb5-44ae-af08-af31d46e5dad_11053931.png"
                        alt="After restoration"
                        width={500}
                        height={500}
                        className="size-full object-cover"
                        priority
                      />
                    </div>
                    <div className="bg-blue-50 p-4 text-center dark:bg-blue-950/30">
                      <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">After Restoration</h3>
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <p className="text-muted-foreground mb-6">Ready to restore your own treasured memories?</p>
                  <Link
                    href="#header"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-6 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Upload Your Photo Now
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
