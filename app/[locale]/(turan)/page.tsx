import React from 'react';

import {
  ArrowRight,
  Award,
  Brush,
  Camera,
  ChevronRight,
  Crown,
  FlipHorizontal,
  Globe,
  Image,
  MessageSquare,
  Palette,
  Play,
  Proportions,
  Quote,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Type,
  User,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

import { getScopedI18n } from '@/locales/server';

interface MenuItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  title?: string;
  description?: string;
}

interface UserFeedback {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  tool: string;
}

const userFeedbacks: UserFeedback[] = [
  {
    name: 'Alex Johnson',
    role: 'Digital Artist',
    avatar: 'AJ',
    rating: 5,
    comment:
      'The text-to-image tool has completely transformed my creative process. I can now visualize concepts in seconds that would have taken hours to sketch!',
    tool: 'Text to Image',
  },
  {
    name: 'Sarah Chen',
    role: 'Graphic Designer',
    avatar: 'SC',
    rating: 5,
    comment:
      'I use the style transfer tool daily in my workflow. It allows me to experiment with different artistic styles effortlessly.',
    tool: 'Style Transfer',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Photographer',
    avatar: 'MR',
    rating: 4,
    comment:
      "The photo restoration tool saved a collection of my grandfather's old photographs. The results were incredible and preserved precious memories.",
    tool: 'Photo Restore',
  },
  {
    name: 'Emily Taylor',
    role: 'Content Creator',
    avatar: 'ET',
    rating: 5,
    comment:
      "Creating custom avatars for my brand has never been easier. The AI understands exactly what I'm looking for with minimal direction.",
    tool: 'Create Avatar',
  },
  {
    name: 'David Kim',
    role: 'UI/UX Designer',
    avatar: 'DK',
    rating: 4,
    comment:
      'The image editing capabilities are impressive. I can quickly iterate through design concepts and save hours of work.',
    tool: 'Image Edit',
  },
  {
    name: 'Lisa Wong',
    role: 'Art Director',
    avatar: 'LW',
    rating: 5,
    comment:
      'Style presets have revolutionized our branding process. We can maintain consistency across all our visual assets effortlessly.',
    tool: 'Style Preset',
  },
];

export default async function TuranLandingPage() {
  const t = await getScopedI18n('loading-page');

  const freeToolsItems: MenuItem[] = [
    {
      id: 'remove-bg',
      icon: FlipHorizontal,
      href: '/remove-bg',
      color: 'from-emerald-500 to-teal-500',
      title: t('free-tools.remove-bg.title'),
      description: t('free-tools.remove-bg.description'),
    },
    {
      id: 'resolution-improvement',
      icon: Proportions,
      href: '/resolution-improvement',
      color: 'from-violet-500 to-purple-500',
      title: t('free-tools.resolution-improvement.title'),
      description: t('free-tools.resolution-improvement.description'),
    },
  ];

  const proToolsItems: MenuItem[] = [
    {
      id: 'text-to-image',
      icon: Type,
      href: '/text-to-image',
      color: 'from-rose-500 to-pink-500',
      title: t('pro-tools.text-to-image.title'),
      description: t('pro-tools.text-to-image.description'),
    },
    {
      id: 'image-edit',
      icon: Image,
      href: '/image-edit',
      color: 'from-blue-500 to-cyan-500',
      title: t('pro-tools.image-edit.title'),
      description: t('pro-tools.image-edit.description'),
    },
    {
      id: 'style-preset',
      icon: Palette,
      href: '/style-preset',
      color: 'from-amber-500 to-orange-500',
      title: t('pro-tools.style-preset.title'),
      description: t('pro-tools.style-preset.description'),
    },
    {
      id: 'create-avatar',
      icon: User,
      href: '/create-avatar',
      color: 'from-indigo-500 to-blue-500',
      title: t('pro-tools.create-avatar.title'),
      description: t('pro-tools.create-avatar.description'),
    },
    {
      id: 'photo-restore',
      icon: Camera,
      href: '/photo-restore',
      color: 'from-green-500 to-emerald-500',
      title: t('pro-tools.photo-restore.title'),
      description: t('pro-tools.photo-restore.description'),
    },
    {
      id: 'style-transfer',
      icon: Brush,
      href: '/style-transfer',
      color: 'from-purple-500 to-violet-500',
      title: t('pro-tools.style-transfer.title'),
      description: t('pro-tools.style-transfer.description'),
    },
  ];

  const featureIcons = [
    {
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Star,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const featureTotal = t('features.list.total') as unknown as number;
  const features = Array.from({ length: featureTotal }).map((_, index) => ({
    title: t(`features.list.items.${index}.title` as any),
    description: t(`features.list.items.${index}.description` as any),
    icon: featureIcons[index].icon,
    color: featureIcons[index].color,
  }));
  const ToolCard = ({ tool, isPro = false }: { tool: MenuItem; isPro?: boolean }) => (
    <div className="border-border bg-card hover:border-border/80 group relative overflow-hidden rounded-2xl border shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <div
        className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${tool.color.replace('from-', '').replace(' to-', ', ')})` }}
      />
      <div className="relative z-10 p-6">
        <div
          className={`inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r ${tool.color} mb-4 shadow-lg`}
        >
          <tool.icon className="size-6 text-white" />
        </div>
        <h3 className="text-card-foreground group-hover:text-card-foreground/80 mb-2 text-xl font-bold transition-colors">
          {tool.title || tool.id.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
        </h3>
        <p className="text-muted-foreground group-hover:text-muted-foreground/80 mb-4 text-sm transition-colors">
          {tool.description || `Professional ${tool.id.replace(/-/g, ' ')} tool powered by AI`}
        </p>
        <div className="flex items-center justify-between">
          {isPro && (
            <span className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-2 py-1 text-xs font-bold text-black">
              PRO
            </span>
          )}
          <div className="ml-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ArrowRight className="size-5 text-gray-900" />
          </div>
        </div>
      </div>
    </div>
  );

  const FeedbackCard = ({ feedback }: { feedback: UserFeedback }) => (
    <div className="border-border bg-card hover:border-border/80 rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="mb-4 flex items-start gap-4">
        <div
          className={`flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white`}
        >
          {feedback.avatar}
        </div>
        <div className="flex-1">
          <h4 className="text-card-foreground font-bold">{feedback.name}</h4>
          <p className="text-muted-foreground text-sm">{feedback.role}</p>
        </div>
        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">{feedback.tool}</span>
      </div>

      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-4 ${i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>

      <div className="relative">
        <Quote className="text-muted-foreground absolute -left-1 -top-2 size-6 opacity-20" />
        <p className="text-card-foreground/90 pl-4 text-sm leading-relaxed">{feedback.comment}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.03),transparent_50%)]" />
        <div
          className="absolute size-96 rounded-full bg-gradient-to-r from-blue-200/30 to-purple-200/30 blur-3xl transition-all duration-1000 dark:from-blue-900/20 dark:to-purple-900/20"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="relative flex min-h-screen items-center justify-center px-4">
          <div className="mx-auto max-w-6xl text-center">
            <div className="border-border bg-secondary/30 mb-8 inline-flex items-center rounded-full border px-4 py-2 transition-colors">
              <Sparkles className="mr-2 size-4 text-yellow-400" />
              <span className="text-muted-foreground text-sm font-medium">Powered by Advanced AI</span>
            </div>

            <h1 className="mb-6 text-6xl font-black leading-tight md:text-8xl">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TURAN</span>
            </h1>

            <p className="text-muted-foreground mb-4 text-2xl font-light md:text-3xl">{t('hero.subtitle')}</p>

            <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#free-tools"
                className="group relative flex min-w-52 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 hover:brightness-110"
              >
                <span className="relative z-10 flex items-center">
                  {t('hero.free-start-creating')}
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>

              <Link
                href="#pro-tools"
                className="group relative flex min-w-52 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 font-medium text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-amber-400/30 hover:brightness-110"
              >
                <span className="relative z-10 flex items-center justify-center">{t('hero.pro-start-creating')}</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -right-1 -top-1 rotate-12">
                  <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg group-hover:shadow-amber-400/30">
                    <Crown className="size-5 text-white" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { icon: Users, number: '1M+', label: t('hero.active-user') },
                { icon: Award, number: '50M+', label: t('hero.images-processed') },
                { icon: TrendingUp, number: '99.9%', label: t('hero.satisfaction-rate') },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="mx-auto mb-2 size-8 text-blue-400" />
                  <div className="text-foreground mb-1 text-3xl font-bold">{stat.number}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free Tools Section */}
        <section id="free-tools" className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {t('free-tools.title')}
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">{t('free-tools.subtitle')}</p>
            </div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
              {freeToolsItems.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* Pro Tools Section */}
        <section id="pro-tools" className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {t('pro-tools.title')}
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">{t('pro-tools.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {proToolsItems.map((tool) => (
                <ToolCard key={tool.id} tool={tool} isPro />
              ))}
            </div>
          </div>
        </section>

        {/* User Feedback Section */}
        <section id="testimonials" className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  {t('testimonials.title')}
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">{t('testimonials.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {userFeedbacks.map((feedback, index) => (
                <FeedbackCard key={index} feedback={feedback} />
              ))}
            </div>

            {/* Feedback CTA */}
            <div className="mt-16 text-center">
              <div className="mx-auto max-w-2xl rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 transition-colors dark:border-blue-900/50 dark:from-blue-950/30 dark:to-cyan-950/30">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <MessageSquare className="size-6 text-blue-500" />
                  <h3 className="text-foreground text-2xl font-bold">{t('testimonials.experience.title')}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{t('testimonials.experience.subtitle')}</p>
                <button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-cyan-600">
                  {t('testimonials.experience.feedback')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                {t('features.title')}{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Turan
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="border-border bg-card hover:border-border/80 group rounded-2xl border p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div
                    className={`inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color} mb-4 shadow-lg transition-shadow group-hover:shadow-xl`}
                  >
                    <feature.icon className="size-8 text-white" />
                  </div>
                  <h3 className="text-card-foreground mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="relative z-10 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-12 backdrop-blur-sm transition-colors dark:border-blue-900/50 dark:from-blue-950/30 dark:to-purple-950/30">
              <div className="relative z-10">
                <h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">{t('cta.title')}</h2>
                <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">{t('cta.description')}</p>
                <Link
                  href="#free-tools"
                  className="group relative inline-flex rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25"
                >
                  <span className="relative z-10 flex items-center">
                    {t('cta.start-creating')}
                    <ChevronRight className="ml-2 size-6 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
