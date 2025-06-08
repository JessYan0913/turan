'use client';

import { Check, Crown, Globe, Home, ImageIcon, Menu, Moon, Palette, Sun, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { User } from 'next-auth';
import { signOut } from 'next-auth/react';

import { useTheme } from '@/components/theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useChangeLocale, useCurrentLocale, useScopedI18n } from '../locales/client';

export function Navigation({ user }: { user: User | undefined }) {
  const pathname = usePathname();
  const { isDarkMode, toggleTheme, themeClasses } = useTheme();
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const t = useScopedI18n('navigation');

  const locales = [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`${themeClasses.navBar} sticky top-0 z-50 border-b transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex cursor-pointer items-center space-x-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <Palette className="size-5 text-white" />
            </div>
            <span
              className={`bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent`}
            >
              图然
            </span>
          </Link>

          {/* 桌面端导航菜单 */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link href="/">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  isActive('/')
                    ? isDarkMode
                      ? 'bg-gray-700/40 text-gray-200'
                      : 'bg-gray-100/60 text-gray-800'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700/30 hover:text-gray-100'
                      : 'text-gray-600 hover:bg-gray-100/40 hover:text-gray-800'
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
                    ? isDarkMode
                      ? 'bg-gray-700/40 text-gray-200'
                      : 'bg-gray-100/60 text-gray-800'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700/30 hover:text-gray-100'
                      : 'text-gray-600 hover:bg-gray-100/40 hover:text-gray-800'
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
                    ? isDarkMode
                      ? 'bg-gray-700/40 text-gray-200'
                      : 'bg-gray-100/60 text-gray-800'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700/30 hover:text-gray-100'
                      : 'text-gray-600 hover:bg-gray-100/40 hover:text-gray-800'
                }`}
              >
                <ImageIcon className="size-4" />
                <span>{t('works')}</span>
              </Button>
            </Link>

            {/* 国际化下拉菜单 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 transition-all duration-300 ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                  }`}
                >
                  <Globe className="size-4" />
                  <span>{locales.find((locale) => locale.code === currentLocale)?.name || currentLocale}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={isDarkMode ? 'border-gray-700 bg-gray-800' : ''}>
                {locales.map((locale) => (
                  <DropdownMenuItem
                    key={locale.code}
                    className={`flex items-center justify-between ${isDarkMode ? 'text-white hover:bg-gray-700' : ''}`}
                    onSelect={() => changeLocale(locale.code as any)}
                  >
                    <span>{locale.name}</span>
                    {currentLocale === locale.code && <Check className="size-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 主题切换按钮 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`transition-all duration-300 ${
                isDarkMode
                  ? 'text-gray-300 shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:bg-gray-700/50 hover:text-white'
                  : 'text-gray-600 shadow-[0_1px_8px_rgba(0,0,0,0.05)] hover:bg-gray-100/50 hover:text-gray-900'
              }`}
            >
              {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>

            {/* 用户头像 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user && (
                  <Avatar className="size-8 cursor-pointer">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className={isDarkMode ? 'bg-gray-700 text-white' : ''}>
                      <UserIcon className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={isDarkMode ? 'border-gray-700 bg-gray-800' : ''}>
                <Link href="/profile">
                  <DropdownMenuItem className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                    {t('profile')}
                  </DropdownMenuItem>
                </Link>
                {/* Settings menu item removed as it's not in the translations */}
                <DropdownMenuItem
                  className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}
                  onClick={() => signOut({ redirectTo: '/' })}
                >
                  {t('signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 移动端菜单 */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className={`${themeClasses.text}`}>
              {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className={themeClasses.text}>
                  <Menu className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`w-48 ${isDarkMode ? 'border-gray-700 bg-gray-800' : ''}`}>
                <Link href="/">
                  <DropdownMenuItem className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>首页</DropdownMenuItem>
                </Link>
                <Link href="/pricing">
                  <DropdownMenuItem className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                    {t('pricing')}
                  </DropdownMenuItem>
                </Link>
                <Link href="/works">
                  <DropdownMenuItem className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                    {t('works')}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                  {t('language')}
                </DropdownMenuItem>
                <Link href="/profile">
                  <DropdownMenuItem className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
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
