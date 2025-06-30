import {
  ArrowRight,
  Brush,
  Camera,
  ImageIcon,
  MessageSquare,
  Palette,
  Star,
  Type as TypeIcon,
  UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Define the tool item interface
interface ToolItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  image: string;
  isFree?: boolean;
}

// Define the platform tools
const platformTools: ToolItem[] = [
  {
    id: 'text-to-image',
    icon: TypeIcon,
    href: '/text-to-image',
    color: 'from-blue-500 to-cyan-500',
    image: '/platform-tools/text-to-image.webp',
    isFree: true,
  },
  {
    id: 'image-edit',
    icon: ImageIcon,
    href: '/image-edit',
    color: 'from-indigo-500 to-purple-500',
    image: '/platform-tools/image-edit.webp',
    isFree: true,
  },
  {
    id: 'style-preset',
    icon: Palette,
    href: '/style-preset',
    color: 'from-pink-500 to-rose-500',
    image: '/platform-tools/style-preset.webp',
  },
  {
    id: 'create-avatar',
    icon: UserIcon,
    href: '/create-avatar',
    color: 'from-amber-500 to-orange-500',
    image: '/platform-tools/create-avatar.webp',
  },
  {
    id: 'photo-restore',
    icon: Camera,
    href: '/photo-restore',
    color: 'from-green-500 to-emerald-500',
    image: '/platform-tools/photo-restore.webp',
  },
  {
    id: 'style-transfer',
    icon: Brush,
    href: '/style-transfer',
    color: 'from-blue-500 to-violet-500',
    image: '/platform-tools/style-transfer.webp',
  },
];

export default function PlatformToolsPage() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <section id="header" className="flex min-h-[70vh] flex-col items-center justify-center space-y-8 py-16">
            <div className="text-center">
              <h1 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-4xl font-bold leading-normal tracking-tight text-transparent md:text-5xl md:leading-normal lg:text-6xl lg:leading-normal">
                Platform Tools
              </h1>
              <p className="text-muted-foreground mx-auto mt-4 max-w-3xl text-lg leading-relaxed md:text-xl md:leading-relaxed">
                Discover our powerful AI-powered tools to enhance your creative workflow
              </p>
            </div>
          </section>

          {/* Tools Grid Section */}
          <section id="tools" className="py-16">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Explore Our Tools
              </h2>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                Powerful AI tools to transform your creative process
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {platformTools.map((tool) => (
                <Link key={tool.id} href={tool.href} className="group">
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg">
                    <div className="relative h-48 w-full overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-80`}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {tool.image ? (
                          <Image
                            src={tool.image}
                            alt={tool.id}
                            fill
                            className="object-cover opacity-60 transition-opacity group-hover:opacity-80"
                          />
                        ) : (
                          <tool.icon className="size-16 text-white" />
                        )}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-xl font-semibold text-white">
                          {tool.id.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">{`Explore our ${tool.id.replace(/-/g, ' ')} tool`}</p>
                    </CardContent>
                    <CardFooter className="border-t p-4">
                      <Button
                        variant="ghost"
                        className="ml-auto transition-transform duration-300 group-hover:translate-x-1"
                      >
                        Explore <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Free Tools Section */}
          <section id="free-tools" className="py-16">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Free Tools Available
              </h2>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                Start creating with our powerful free tools - no subscription required
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {platformTools
                .filter((tool) => tool.isFree)
                .map((tool) => (
                  <Card
                    key={tool.id}
                    className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4 p-6">
                      <div
                        className={`flex size-12 items-center justify-center rounded-full bg-gradient-to-br ${tool.color}`}
                      >
                        <tool.icon className="size-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {tool.id.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </h3>
                        <p className="text-muted-foreground mt-1">Free to use with basic features</p>
                      </div>
                      <Badge className="ml-auto bg-gradient-to-r from-green-500 to-emerald-500 text-white">Free</Badge>
                    </div>
                    <CardContent className="bg-muted/30 border-t p-6">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <ArrowRight className="size-4 text-green-500" />
                          <span>No account required</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="size-4 text-green-500" />
                          <span>Basic functionality</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="size-4 text-green-500" />
                          <span>Limited to {tool.id === 'text-to-image' ? '5 generations' : '3 edits'} per day</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="border-t p-4">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
                      >
                        <Link href={tool.href}>Try for Free</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Want access to all features and unlimited generations?</p>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600">
                Upgrade to Pro
              </Button>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-16">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Why Choose Our Platform
              </h2>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                Powerful features designed to enhance your creative workflow
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((index) => (
                <Card key={index} className="border-0 shadow-md transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div
                      className={`flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500`}
                    >
                      <span className="text-lg font-bold text-white">{index + 1}</span>
                    </div>
                    <CardTitle className="mt-4">Feature {index}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Description for feature {index}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* User Feedback Section */}
          <section id="user-feedback" className="py-16">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                What Our Users Say
              </h2>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                Discover how our tools are helping creators around the world
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Alex Johnson',
                  avatar: '/avatars/avatar-1.png',
                  role: 'Digital Artist',
                  rating: 5,
                  comment:
                    'The text-to-image tool has completely transformed my creative process. I can now visualize concepts in seconds that would have taken hours to sketch!',
                  tool: 'Text to Image',
                },
                {
                  name: 'Sarah Chen',
                  avatar: '/avatars/avatar-2.png',
                  role: 'Graphic Designer',
                  rating: 5,
                  comment:
                    'I use the style transfer tool daily in my workflow. It allows me to experiment with different artistic styles that would be impossible to create manually.',
                  tool: 'Style Transfer',
                },
                {
                  name: 'Michael Rodriguez',
                  avatar: '/avatars/avatar-3.png',
                  role: 'Photographer',
                  rating: 4,
                  comment:
                    "The photo restoration tool saved a collection of my grandfather's old photographs. The results were incredible and preserved precious memories.",
                  tool: 'Photo Restore',
                },
                {
                  name: 'Emily Taylor',
                  avatar: '/avatars/avatar-4.png',
                  role: 'Content Creator',
                  rating: 5,
                  comment:
                    "Creating custom avatars for my brand has never been easier. The AI understands exactly what I'm looking for with minimal direction.",
                  tool: 'Create Avatar',
                },
                {
                  name: 'David Kim',
                  avatar: '/avatars/avatar-5.png',
                  role: 'UI/UX Designer',
                  rating: 4,
                  comment:
                    'The image editing capabilities are impressive. I can quickly iterate through design concepts and save hours of work.',
                  tool: 'Image Edit',
                },
                {
                  name: 'Lisa Wong',
                  avatar: '/avatars/avatar-6.png',
                  role: 'Art Director',
                  rating: 5,
                  comment:
                    'Style presets have revolutionized our branding process. We can maintain consistency across all our visual assets effortlessly.',
                  tool: 'Style Preset',
                },
              ].map((feedback, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader className="flex flex-row items-center gap-4 border-b pb-4">
                    <Avatar>
                      <AvatarImage src={feedback.avatar} alt={feedback.name} />
                      <AvatarFallback>
                        {feedback.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{feedback.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">{feedback.role}</p>
                    </div>
                    <Badge className="ml-auto" variant="outline">
                      {feedback.tool}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center gap-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                    </div>
                    <p className="text-muted-foreground">{feedback.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Card className="mx-auto max-w-2xl border-0 bg-gradient-to-r from-blue-600/10 to-cyan-400/10 p-6">
                <div className="flex items-center justify-center gap-3">
                  <MessageSquare className="size-5 text-blue-500" />
                  <h3 className="text-xl font-medium">Share Your Experience</h3>
                </div>
                <p className="text-muted-foreground mt-2 text-center">
                  We&apos;d love to hear how our tools have helped your creative process.
                </p>
                <Button className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600">
                  Submit Feedback
                </Button>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section id="cta" className="py-16">
            <Card className="border-0 bg-gradient-to-r from-blue-600/10 to-cyan-400/10">
              <CardContent className="flex flex-col items-center justify-between gap-6 p-8 md:flex-row">
                <div>
                  <h3 className="text-2xl font-bold md:text-3xl">Ready to get started?</h3>
                  <p className="text-muted-foreground mt-2 max-w-2xl">
                    Explore our platform tools and enhance your creative workflow today.
                  </p>
                </div>
                <Button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
