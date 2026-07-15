import React, { useState, useEffect, useRef } from 'react';
import { Play, Info, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { ContentItem } from '../types';

interface LatestReleasesCarouselProps {
  items: ContentItem[];
  onPlay: (item: ContentItem) => void;
  onViewDetails: (item: ContentItem) => void;
}

export default function LatestReleasesCarousel({
  items,
  onPlay,
  onViewDetails,
}: LatestReleasesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // Take first 6 items for the carousel
  const carouselItems = items.slice(0, 6);

  useEffect(() => {
    if (carouselItems.length === 0 || isHovered) {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      return;
    }

    autoPlayTimer.current = setInterval(() => {
      handleNext();
    }, 4000);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [currentIndex, isHovered, carouselItems.length]);

  if (carouselItems.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const currentItem = carouselItems[currentIndex];

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/5 shadow-2xl h-[260px] sm:h-[340px] md:h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with blur & gradients for depth */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentItem.backdrop || currentItem.poster}
          alt={currentItem.title}
          className="w-full h-full object-cover opacity-35 scale-105 transition-all duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-transparent to-[#0B1220] z-10" />
      </div>

      {/* Navigation Buttons (visible on hover) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/90 hover:scale-115 active:scale-95 transition-all opacity-0 group-hover:opacity-100 lg:opacity-100 cursor-pointer flex items-center justify-center"
        aria-label="Previous Release"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/90 hover:scale-115 active:scale-95 transition-all opacity-0 group-hover:opacity-100 lg:opacity-100 cursor-pointer flex items-center justify-center"
        aria-label="Next Release"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl text-left space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#22C55E] text-[9px] font-black tracking-widest uppercase text-white shadow-lg shadow-[#22C55E]/20 animate-pulse">
              Latest Release
            </span>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span>{currentItem.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {currentItem.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 font-medium line-clamp-2 leading-relaxed">
            {currentItem.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={() => onPlay(currentItem)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black hover:bg-[#22C55E] hover:text-white font-bold text-xs uppercase tracking-widest shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-4 h-4 fill-current stroke-none" />
            <span>Play Now</span>
          </button>
          
          <button
            onClick={() => onViewDetails(currentItem)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Info className="w-4 h-4" />
            <span>Details</span>
          </button>
        </div>
      </div>

      {/* Progress Dots indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carouselItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex ? 'bg-[#22C55E] w-6' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
