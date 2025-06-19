'use client';

import { Crown, Home, ImageIcon, Menu, Moon, Palette, Sun, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { User } from 'next-auth';
import { signOut } from 'next-auth/react';

import { LanguageSwitcher } from '@/components/language-switcher';
import { useTheme } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useScopedI18n } from '@/locales/client';

export function Navigation({ user }: { user: User | undefined }) {
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();
  const t = useScopedI18n('navigation');

  const locales = [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
  ];

  const currentLocale = pathname.split('/')[1] || 'en';

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

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

          {/* 桌面端导航菜单 */}
          <div className="hidden items-center md:flex md:space-x-6 lg:space-x-8">
            <Link href="/">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  isActive('/')
                    ? 'bg-muted/60 text-foreground'
                    : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                }`}
              >
                <Home className="size-4" />
                <span>{t('home')}</span>
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  isActive('/pricing')
                    ? 'bg-muted/60 text-foreground'
                    : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                }`}
              >
                <Crown className="size-4" />
                <span>{t('pricing')}</span>
              </Button>
            </Link>
            <Link href="/works">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  isActive('/works')
                    ? 'bg-muted/60 text-foreground'
                    : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                }`}
              >
                <ImageIcon className="size-4" />
                <span>{t('works')}</span>
              </Button>
            </Link>

            <LanguageSwitcher currentLocale={currentLocale} locales={locales} />
            <ThemeToggle />

            {/* 用户头像或登录按钮 */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="size-8 cursor-pointer">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      <UserIcon className="size-4" />
                    </AvatarFallback>
                  </Avatar>
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
              <Link href="/login">
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 transition-all duration-300 ${
                    isActive('/login')
                      ? 'bg-muted/60 text-foreground'
                      : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                  }`}
                >
                  <UserIcon className="size-4" />
                  <span>{t('signIn')}</span>
                </Button>
              </Link>
            )}
          </div>

          {/* 移动端菜单 */}
          <div className="flex items-center space-x-3 md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-foreground rounded-full">
              {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-foreground rounded-full">
                  <Menu className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-border bg-popover w-48 rounded-xl shadow-lg">
                <Link href="/">
                  <DropdownMenuItem className="text-popover-foreground hover:bg-accent">首页</DropdownMenuItem>
                </Link>
                <Link href="/pricing">
                  <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                    {t('pricing')}
                  </DropdownMenuItem>
                </Link>
                <Link href="/works">
                  <DropdownMenuItem className="text-popover-foreground hover:bg-accent">{t('works')}</DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="text-popover-foreground hover:bg-accent">{t('language')}</DropdownMenuItem>
                <Link href="/profile">
                  <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                    {t('profile')}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
