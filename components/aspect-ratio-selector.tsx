'use client';

import { useState } from 'react';

import { Check, ChevronDown, LayoutGrid, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

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

export interface AspectRatioOption {
  value: string;
  label: string;
  width: number;
  height: number;
}

export const aspectRatioOptions: AspectRatioOption[] = [
  { value: '1:1', label: '1:1', width: 40, height: 40 },
  { value: '16:9', label: '16:9', width: 48, height: 27 },
  { value: '9:16', label: '9:16', width: 27, height: 48 },
  { value: '4:3', label: '4:3', width: 44, height: 33 },
  { value: '3:4', label: '3:4', width: 33, height: 44 },
  { value: '3:2', label: '3:2', width: 45, height: 30 },
  { value: '2:3', label: '2:3', width: 30, height: 45 },
  { value: '4:5', label: '4:5', width: 36, height: 45 },
  { value: '5:4', label: '5:4', width: 45, height: 36 },
  { value: '21:9', label: '21:9', width: 50, height: 21 },
  { value: '9:21', label: '9:21', width: 21, height: 50 },
  { value: '2:1', label: '2:1', width: 50, height: 25 },
  { value: '1:2', label: '1:2', width: 25, height: 50 },
];

interface AspectRatioSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function AspectRatioSelector({ value, onValueChange, disabled = false }: AspectRatioSelectorProps) {
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
  const selectedOption = aspectRatioOptions.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select aspect ratio"
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
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-cyan-200 shadow-sm transition-shadow dark:from-blue-800/30 dark:to-cyan-900/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="relative flex items-center justify-center overflow-hidden"
                      style={{
                        width: '42px',
                        height: '42px',
                        maxWidth: '42px',
                        maxHeight: '42px',
                      }}
                    >
                      <div
                        className="flex items-center justify-center rounded-sm bg-white dark:bg-gray-800"
                        style={{
                          width: selectedOption.width * 0.8,
                          height: selectedOption.height * 0.8,
                          maxWidth: '42px',
                          maxHeight: '42px',
                        }}
                      >
                        <User className="size-6 text-blue-600 dark:text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <div className="text-base font-medium tracking-tight">{selectedOption.label} Aspect Ratio</div>
                  <div className="text-sm text-gray-600">
                    {selectedOption.width}:{selectedOption.height} proportion
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <LayoutGrid className="size-5 text-blue-900 dark:text-cyan-100" />
                <span className="text-base text-gray-500">Select aspect ratio</span>
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
              {aspectRatioOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex flex-col items-start overflow-hidden rounded-lg p-0',
                    'border transition-all duration-200 hover:scale-[1.02] hover:shadow-md',
                    value === option.value ? 'border-blue-500 ring-1 ring-blue-200' : ''
                  )}
                >
                  <div className="relative flex h-32 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-200 dark:from-blue-800/30 dark:to-cyan-900/30">
                    <div
                      className="relative flex items-center justify-center overflow-hidden"
                      style={{
                        width: '80px',
                        height: '80px',
                        maxWidth: '80px',
                        maxHeight: '80px',
                      }}
                    >
                      <div
                        className="flex items-center justify-center rounded-sm bg-white dark:bg-gray-800"
                        style={{
                          width: option.width * 1.6,
                          height: option.height * 1.6,
                          maxWidth: '80px',
                          maxHeight: '80px',
                        }}
                      >
                        <User className="size-8 text-blue-600 dark:text-cyan-400" />
                      </div>
                    </div>
                    {value === option.value && (
                      <div className="absolute right-2 top-2 rounded-full bg-blue-500 p-1 shadow-sm">
                        <Check className="size-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="w-full p-3">
                    <div className="mb-0.5 text-sm font-medium tracking-tight">{option.label}</div>
                    <div className="text-xs text-gray-600">
                      {option.width}:{option.height}
                    </div>
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
