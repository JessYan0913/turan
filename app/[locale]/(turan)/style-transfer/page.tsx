import Image from 'next/image';

import { StyleTransfer } from '@/components/style-transfer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqItems = [
  {
    question: 'What is style transfer?',
    answer:
      'Style transfer is an artificial intelligence technology that can apply the artistic style of one image to another image while retaining the content of the original image.',
  },
  {
    question: 'How to use the style transfer feature?',
    answer:
      'Simply upload your original image and the artistic style image you want to apply, our AI will automatically apply the style to your image.',
  },
  {
    question: 'What image formats does style transfer support?',
    answer:
      'We support common image formats, including JPEG, PNG, and WebP. For the best results, we recommend using high-quality images.',
  },
  {
    question: 'How long does it take to process an image?',
    answer:
      'Processing time depends on image size and server load, usually ranging from a few seconds to several minutes. High-resolution images may require longer processing time.',
  },
  {
    question: 'Will style transfer change my original image?',
    answer:
      'No, all processing is non-destructive. You can download the processed image at any time, and the original image will remain unchanged.',
  },
  {
    question: 'How to get the best effect?',
    answer:
      'For the best effect, we recommend using high contrast style images and trying different style images to find the most suitable one.',
  },
];

export default async function StyleTransferPage() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <section id="header" className="flex min-h-screen flex-col items-center justify-center space-y-8 py-16">
            <div className="text-center">
              <h1 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-4xl font-bold leading-normal tracking-tight text-transparent md:text-5xl md:leading-normal lg:text-6xl lg:leading-normal">
                Style Transfer
              </h1>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:text-xl md:leading-relaxed">
                Transform any image into your favorite artistic style
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
                    Four Major Advantages of Flux Image to Image AI
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-md text-lg md:text-xl">
                    Advanced AI models with flexible options to meet your needs.
                  </p>
                  <Button className="bg-gradient-to-r from-green-400 to-blue-400 px-8 py-3 text-lg font-semibold text-white shadow-lg">
                    Try it now
                  </Button>
                </div>
                <div className="mt-8 w-full max-w-xs overflow-hidden rounded-2xl shadow-xl lg:max-w-sm">
                  <Image
                    src="/examples/style-before.jpg"
                    alt="Style Transfer Example"
                    width={500}
                    height={300}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
              {/* Right: Four advantages */}
              <div className="grid grid-cols-1 gap-8">
                {/* 1 */}
                <div className="bg-muted/50 flex items-start space-x-4 rounded-xl p-6 shadow-md">
                  <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-400"></span>
                  <div>
                    <h3 className="mb-1 text-xl font-semibold">Multiple Specialized Models</h3>
                    <p className="text-muted-foreground">
                      Choose from various models optimized for different tasks - Flux Redux AI, Flux.1 Dev for advanced
                      features like image-to-image transformation.
                    </p>
                  </div>
                </div>
                {/* 2 */}
                <div className="bg-muted/50 flex items-start space-x-4 rounded-xl p-6 shadow-md">
                  <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-cyan-400"></span>
                  <div>
                    <h3 className="mb-1 text-xl font-semibold">Intelligent Model Selection</h3>
                    <p className="text-muted-foreground">
                      Our system automatically recommends the most suitable model based on your input image and text
                      description, balancing quality and computation costs.
                    </p>
                  </div>
                </div>
                {/* 3 */}
                <div className="bg-muted/50 flex items-start space-x-4 rounded-xl p-6 shadow-md">
                  <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-400"></span>
                  <div>
                    <h3 className="mb-1 text-xl font-semibold">Superior Text Understanding</h3>
                    <p className="text-muted-foreground">
                      Advanced natural language processing capabilities allow precise interpretation of text prompts to
                      accurately transform images according to your descriptions.
                    </p>
                  </div>
                </div>
                {/* 4 */}
                <div className="bg-muted/50 flex items-start space-x-4 rounded-xl p-6 shadow-md">
                  <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-400"></span>
                  <div>
                    <h3 className="mb-1 text-xl font-semibold">Cost-Effective Processing</h3>
                    <p className="text-muted-foreground">
                      Flexible model options let you choose between lightweight models for simple tasks and advanced
                      models for complex transformations, optimizing both quality and cost.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section id="faq" className="min-h-screen py-16">
            <div className="container px-2 md:px-4 lg:px-6">
              <div className="mx-auto max-w-6xl">
                <div className="mb-16 space-y-4 text-center">
                  <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
                    Answers to common questions about style transfer
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
