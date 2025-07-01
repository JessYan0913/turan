'use client';

import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 只在客户端渲染后应用主题切换
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 在服务器端渲染时返回一个占位符
    return (
      <button className="size-10 rounded-md border p-2">
        <div className="size-4" />
      </button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="text-muted-foreground hover:bg-muted/50 hover:text-foreground"
    >
      {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
}
