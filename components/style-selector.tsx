'use client';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  placeholder?: string;
  isDarkMode?: boolean;
}

export function StyleSelector({
  options,
  value,
  onSelect,
  placeholder = '选择风格',
  isDarkMode = false,
}: StyleSelectorProps) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`h-auto w-full justify-between py-2 ${
            isDarkMode
              ? 'border-gray-700/50 bg-gray-800/70 text-white hover:bg-gray-700'
              : 'border-gray-200/50 bg-white/70 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            {selectedOption ? (
              <>
                <div className="size-6 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={selectedOption.preview || '/placeholder.svg'}
                    alt={selectedOption.name}
                    width={24}
                    height={24}
                    className="size-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{selectedOption.name}</div>
                  <div className={`text-[11px] leading-tight ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedOption.description}
                  </div>
                </div>
              </>
            ) : (
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{placeholder}</span>
            )}
          </div>
          <ChevronDown className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-72 p-1.5 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
        align="start"
      >
        <div className="grid grid-cols-2 gap-1.5">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
              className={`rounded-lg p-3 text-left transition-all hover:scale-105 ${
                selectedOption?.id === option.id
                  ? isDarkMode
                    ? 'border-2 border-blue-500 bg-blue-900/50'
                    : 'border-2 border-blue-500 bg-blue-50'
                  : isDarkMode
                    ? 'border-2 border-transparent bg-gray-700/50 hover:bg-gray-600/50'
                    : 'border-2 border-transparent bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="mb-1.5 h-16 w-full overflow-hidden rounded-md">
                <Image
                  src={option.preview || '/placeholder.svg'}
                  alt={option.name}
                  width={120}
                  height={80}
                  className="size-full object-cover"
                />
              </div>
              <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{option.name}</div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{option.description}</div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
