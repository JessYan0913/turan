'use client';

import { Crown, Home, ImageIcon, Menu, Palette, UserIcon } from 'lucide-react';
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

  return (
    <nav className="nav-bar sticky top-0 z-50 border-b transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex cursor-pointer items-center space-x-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
              <Palette className="size-5 text-white" />
            </div>
            <span className="gradient-text text-xl font-bold tracking-tight">Turan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center md:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'group flex items-center gap-2',
                      'bg-transparent hover:bg-muted/40 hover:text-foreground',
                      'text-muted-foreground data-[active]:bg-muted/60 data-[active]:text-foreground'
                    )}
                  >
                    <Home className="size-4" />
                    <span>{t('home')}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/pricing"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'group flex items-center gap-2',
                      'bg-transparent hover:bg-muted/40 hover:text-foreground',
                      'text-muted-foreground data-[active]:bg-muted/60 data-[active]:text-foreground'
                    )}
                  >
                    <Crown className="size-4" />
                    <span>{t('pricing')}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/works"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'group flex items-center gap-2',
                      'bg-transparent hover:bg-muted/40 hover:text-foreground',
                      'text-muted-foreground data-[active]:bg-muted/60 data-[active]:text-foreground'
                    )}
                  >
                    <ImageIcon className="size-4" />
                    <span>{t('works')}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <LanguageSwitcher />
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <ThemeToggle />
                </NavigationMenuItem>

                {/* User Menu */}
                <NavigationMenuItem>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={cn(
                            navigationMenuTriggerStyle(),
                            'size-8 p-0',
                            'bg-transparent hover:bg-muted/40 hover:text-foreground',
                            'text-muted-foreground'
                          )}
                        >
                          <Avatar className="size-6">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback className="bg-muted text-muted-foreground">
                              <UserIcon className="size-3" />
                            </AvatarFallback>
                          </Avatar>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-border bg-popover">
                        <Link href="/profile">
                          <DropdownMenuItem>{t('profile')}</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className="text-popover-foreground hover:bg-accent"
                          onClick={() => signOut({ redirectTo: '/' })}
                        >
                          {t('signOut')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <NavigationMenuLink
                      href="/login"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'group flex items-center gap-2',
                        'bg-transparent hover:bg-muted/40 hover:text-foreground',
                        'text-muted-foreground data-[active]:bg-muted/60 data-[active]:text-foreground'
                      )}
                    >
                      <UserIcon className="size-4" />
                      <span>{t('signIn')}</span>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-foreground rounded-full">
                  <Menu className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-border bg-popover w-48 rounded-xl shadow-lg">
                <Link href="/">
                  <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                    <Home className="mr-2 size-4" />
                    {t('home')}
                  </DropdownMenuItem>
                </Link>
                <Link href="/pricing">
                  <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                    <Crown className="mr-2 size-4" />
                    {t('pricing')}
                  </DropdownMenuItem>
                </Link>
                <Link href="/works">
                  <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                    <ImageIcon className="mr-2 size-4" />
                    {t('works')}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <div className="px-2">
                    <LanguageSwitcher />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <div className="px-2">
                    <ThemeToggle />
                  </div>
                </DropdownMenuItem>
                {user ? (
                  <>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                        <UserIcon className="mr-2 size-4" />
                        {t('profile')}
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="text-popover-foreground hover:bg-accent"
                      onClick={() => signOut({ redirectTo: '/' })}
                    >
                      {t('signOut')}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <Link href="/login">
                    <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                      <UserIcon className="mr-2 size-4" />
                      {t('signIn')}
                    </DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
