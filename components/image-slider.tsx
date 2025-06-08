'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';
import type React from 'react';

interface ImageSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function ImageSlider({
  beforeImage,
  afterImage,
  beforeLabel = '原图',
  afterLabel = '处理后',
  className = '',
}: ImageSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div
      ref={containerRef}
      className={`relative cursor-col-resize select-none overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* 原图 */}
      <div className="relative size-full">
        <Image
          src={beforeImage || '/placeholder.svg'}
          alt={beforeLabel}
          fill
          className="object-cover"
          draggable={false}
        />
        {beforeLabel && (
          <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white">
            {beforeLabel}
          </div>
        )}
      </div>

      {/* 处理后的图片 */}
      <div
        className="absolute left-0 top-0 size-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={afterImage || '/placeholder.svg'}
          alt={afterLabel}
          fill
          className="object-cover"
          draggable={false}
        />
        {afterLabel && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white">
            {afterLabel}
          </div>
        )}
      </div>

      {/* 滑块 */}
      <div
        className="absolute inset-y-0 w-1 cursor-col-resize bg-white shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <div className="mx-0.5 h-4 w-1 rounded-full bg-gray-400"></div>
          <div className="mx-0.5 h-4 w-1 rounded-full bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
}
