'use client';

import { useState } from 'react';

import { Check, ChevronDown, Paintbrush } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.3);
    border-radius: 20px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0.5);
  }
`;

interface StyleOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
  preview: string;
}

interface StyleSelectorProps {
  options: StyleOption[];
  value?: string;
  onSelect: (style: StyleOption) => void;
  disabled?: boolean;
}

export function StyleSelector({ options, value, onSelect, disabled = false }: StyleSelectorProps) {
  const t = useScopedI18n('style-selector');
  // Add scrollbar styles to document
  if (typeof document !== 'undefined') {
    const styleEl = document.createElement('style');
    styleEl.textContent = scrollbarStyles;
    if (!document.head.querySelector('style[data-custom-scrollbar]')) {
      styleEl.setAttribute('data-custom-scrollbar', '');
      document.head.appendChild(styleEl);
    }
  }
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a style"
          disabled={disabled}
          className={cn(
            'relative h-auto w-full justify-between rounded-lg border bg-transparent px-4 py-6 text-left shadow-sm transition-all',
            'hover:bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 dark:hover:bg-blue-900/20 dark:focus:ring-blue-800/50',
            disabled && 'pointer-events-none opacity-50'
          )}
        >
          <div className="flex items-center gap-4">
            {selectedOption ? (
              <>
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg shadow-sm transition-shadow">
                  <Image
                    src={selectedOption.preview || '/placeholder.svg'}
                    alt={selectedOption.name}
                    fill
                    sizes="56px"
                    className="object-cover transition-transform duration-300"
                    priority
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <div className="text-base font-medium tracking-tight">{selectedOption.name}</div>
                  <div className="line-clamp-2 text-sm text-gray-600">{selectedOption.description}</div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Paintbrush className="size-5 text-blue-900 dark:text-cyan-100" />
                <span className="text-base text-gray-500">{t('placeholder')}</span>
              </div>
            )}
          </div>
          <ChevronDown
            className={cn(
              'text-blue-600 dark:text-cyan-200',
              'size-4 text-gray-400 transition-transform duration-200 ease-in-out',
              open ? 'rotate-180 transform' : ''
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="max-h-[500px] w-[340px] overflow-hidden rounded-lg border p-0 shadow-lg"
        align="start"
        sideOffset={4}
      >
        <Command>
          <CommandGroup className="custom-scrollbar overflow-y-auto" style={{ maxHeight: '500px' }}>
            <div className="grid grid-cols-2 gap-3 p-3">
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex flex-col items-start overflow-hidden rounded-lg p-0',
                    'border transition-all duration-200 hover:scale-[1.02] hover:shadow-md',
                    selectedOption?.id === option.id ? 'border-blue-500 ring-1 ring-blue-200' : ''
                  )}
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-50">
                    <Image
                      src={option.preview || '/placeholder.svg'}
                      alt={option.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {selectedOption?.id === option.id && (
                      <div className="absolute right-2 top-2 rounded-full bg-blue-500 p-1 shadow-sm">
                        <Check className="size-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="w-full p-3">
                    <div className="mb-0.5 text-sm font-medium tracking-tight">{option.name}</div>
                    <div className="line-clamp-2 text-xs text-gray-600">{option.description}</div>
                  </div>
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
