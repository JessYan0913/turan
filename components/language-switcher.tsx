'use client';

import { useTransition } from 'react';

import { Check, Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Locale {
  code: string;
  name: string;
}

interface LanguageSwitcherProps {
  currentLocale: string;
  locales: Locale[];
}

export function LanguageSwitcher({ currentLocale, locales }: LanguageSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const switchLocale = (locale: string) => {
    // Get the current path without the locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    // Navigate to the same path with the new locale
    startTransition(() => {
      router.push(`/${locale}${pathWithoutLocale}`);
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
