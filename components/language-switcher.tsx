'use client';

import { useTransition } from 'react';

import { Check, Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChangeLocale, useCurrentLocale } from '@/locales/client';

interface Locale {
  code: string;
  name: string;
}

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  const locales = [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
  ];

  const switchLocale = (locale: string) => {
    startTransition(() => {
      changeLocale(locale as 'en' | 'ja' | 'zh');
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          disabled={isPending}
        >
          <Globe className="mr-2 size-4" />
          <span>{locales.find((l) => l.code === currentLocale)?.name || currentLocale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onSelect={() => switchLocale(locale.code)}
            className="flex items-center justify-between"
            disabled={currentLocale === locale.code}
          >
            {locale.name}
            {currentLocale === locale.code && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
