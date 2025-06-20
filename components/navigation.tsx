'use client';

import { Brush, Camera, Crown, Eye, Home, ImageIcon, Menu, Palette, Type as TypeIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import type { User } from 'next-auth';
import { signOut } from 'next-auth/react';

import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

export function Navigation({ user }: { user: User | undefined }) {
  const t = useScopedI18n('navigation');

  type MenuItem = {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    href: string;
    color: string;
  };

  const menuItems: MenuItem[] = [
    {
      id: 'text-to-image',
      icon: TypeIcon,
      title: t('tools.text-to-image.title'),
      description: t('tools.text-to-image.description'),
      href: '/text-to-image',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'image-edit',
      icon: ImageIcon,
      title: t('tools.image-edit.title'),
      description: t('tools.image-edit.description'),
      href: '/image-edit',
      color: 'from-violet-500 to-purple-500',
    },
    {
      id: 'style-preset',
      icon: Palette,
      title: t('tools.style-preset.title'),
      description: t('tools.style-preset.description'),
      href: '/style-preset',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'photo-restore',
      icon: Camera,
      title: t('tools.photo-restore.title'),
      description: t('tools.photo-restore.description'),
      href: '#',
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'style-transfer',
      icon: Brush,
      title: t('tools.style-transfer.title'),
      description: t('tools.style-transfer.description'),
      href: '#',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'style-extract',
      icon: Eye,
      title: t('tools.style-extract.title'),
      description: t('tools.style-extract.description'),
      href: '#',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Main Nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600">
              <Palette className="size-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Turan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      'group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      'hover:bg-accent hover:text-accent-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                      'data-[active]:bg-accent/50 data-[active]:text-accent-foreground'
                    )}
                  >
                    {t('imageTools')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-popover rounded-lg p-4 shadow-lg">
                    <div className="grid w-[500px] grid-cols-2 gap-3">
                      {menuItems.map(({ id, icon: Icon, title, description, href, color }) => (
                        <NavigationMenuLink asChild key={id}>
                          <Link
                            href={href}
                            className="hover:bg-accent group flex items-start gap-3 rounded-lg p-3 transition-colors"
                          >
                            <div
                              className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${color}`}
                            >
                              <Icon className="size-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-foreground font-medium">{title}</div>
                              <div className="text-muted-foreground mt-1 text-sm">{description}</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/pricing"
                    className={cn(
                      'group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      'hover:bg-accent hover:text-accent-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                      'data-[active]:bg-accent/50 data-[active]:text-accent-foreground'
                    )}
                  >
                    {t('pricing')}
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/works"
                    className={cn(
                      'group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      'hover:bg-accent hover:text-accent-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                      'data-[active]:bg-accent/50 data-[active]:text-accent-foreground'
                    )}
                  >
                    {t('works')}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 md:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            {/* User Menu */}
            <div className="ml-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        'flex size-8 items-center justify-center rounded-full',
                        'bg-transparent hover:bg-accent',
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                      )}
                    >
                      <Avatar className="size-6">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback className="bg-accent text-accent-foreground">
                          <UserIcon className="size-3" />
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover w-40 rounded-md border p-2 shadow-md">
                    <Link href="/profile">
                      <DropdownMenuItem className="hover:bg-accent cursor-pointer rounded-md p-2 text-sm">
                        {t('profile')}
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem
                      className="text-destructive hover:bg-destructive/10 cursor-pointer rounded-md p-2 text-sm"
                      onClick={() => signOut({ redirectTo: '/' })}
                    >
                      {t('signOut')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    'inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium',
                    'bg-primary text-primary-foreground shadow hover:bg-primary/90',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  )}
                >
                  {t('signIn')}
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center md:hidden">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-9 rounded-full">
                    <Menu className="size-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover w-56 rounded-md border p-2 shadow-lg">
                  <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                    Navigation
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1" />
                  <Link href="/pricing">
                    <DropdownMenuItem className="cursor-pointer rounded-md p-2 text-sm">
                      <Crown className="mr-2 size-4" />
                      {t('pricing')}
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/works">
                    <DropdownMenuItem className="cursor-pointer rounded-md p-2 text-sm">
                      <ImageIcon className="mr-2 size-4" />
                      {t('works')}
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                    {t('imageTools')}
                  </DropdownMenuLabel>
                  <div className="grid grid-cols-2 gap-2 p-2">
                    {menuItems.map(({ id, icon: Icon, title, href, color }) => (
                      <Link key={id} href={href}>
                        <DropdownMenuItem className="m-0 flex h-full flex-col items-center justify-center space-y-1.5 p-2 text-center">
                          <div
                            className={`flex size-9 items-center justify-center rounded-lg bg-gradient-to-br ${color}`}
                          >
                            <Icon className="size-4 text-white" />
                          </div>
                          <span className="text-xs font-medium">{title}</span>
                        </DropdownMenuItem>
                      </Link>
                    ))}
                  </div>

                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                    Settings
                  </DropdownMenuLabel>
                  <div className="space-y-1 p-2">
                    <div className="flex items-center justify-between rounded-md p-2 text-sm">
                      <span>Theme</span>
                      <ThemeToggle />
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 text-sm">
                      <span>Language</span>
                      <LanguageSwitcher />
                    </div>
                  </div>

                  {user ? (
                    <>
                      <DropdownMenuSeparator className="my-1" />
                      <Link href="/profile">
                        <DropdownMenuItem className="cursor-pointer rounded-md p-2 text-sm">
                          <UserIcon className="mr-2 size-4" />
                          {t('profile')}
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        className="text-destructive hover:bg-destructive/10 cursor-pointer rounded-md p-2 text-sm"
                        onClick={() => signOut({ redirectTo: '/' })}
                      >
                        {t('signOut')}
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuSeparator className="my-1" />
                      <Link href="/login">
                        <DropdownMenuItem className="cursor-pointer rounded-md p-2 text-sm">
                          <UserIcon className="mr-2 size-4" />
                          {t('signIn')}
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
