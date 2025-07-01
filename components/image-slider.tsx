'use client';

import { forwardRef, useRef, useState } from 'react';

import Image from 'next/image';

interface ImageSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

const ImageSlider = forwardRef<HTMLDivElement, ImageSliderProps>(function ImageSlider(
  { beforeImage, afterImage, beforeLabel = '原图', afterLabel = '处理后', className = '' },
  ref
) {
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
      ref={(node) => {
        // Forward the ref to the container element
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        // Also set the container ref for internal use
        containerRef.current = node;
      }}
      className={`relative cursor-col-resize select-none overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Original Image */}
      <div className="relative size-full">
        <div
          className="absolute inset-0 size-full"
          style={{
            backgroundImage:
              'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%)',
            backgroundPosition: '0 0, 10px 10px, 10px 10px, 20px 20px',
            backgroundSize: '20px 20px',
            backgroundColor: '#f3f4f6',
          }}
        />
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

      {/* Processed Image */}
      <div
        className="absolute left-0 top-0 size-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div
          className="absolute inset-0 size-full"
          style={{
            backgroundImage:
              'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%)',
            backgroundPosition: '0 0, 10px 10px, 10px 10px, 20px 20px',
            backgroundSize: '20px 20px',
            backgroundColor: '#f3f4f6',
          }}
        />
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

      {/* Slider Handle */}
      <div
        className="absolute inset-y-0 w-1 cursor-col-resize bg-white shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <div className="mx-0.5 h-4 w-1 rounded-full bg-gray-400" />
          <div className="mx-0.5 h-4 w-1 rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
});

ImageSlider.displayName = 'ImageSlider';

export { ImageSlider };
