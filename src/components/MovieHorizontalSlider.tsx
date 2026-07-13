import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ContentItem } from '../types';
import MovieCard from './MovieCard';
import SkeletonMovieCard from './SkeletonMovieCard';

interface MovieHorizontalSliderProps {
  items: ContentItem[];
  watchlist: string[];
  favorites: string[];
  onToggleWatchlist: (itemId: string) => void;
  onToggleFavorite: (itemId: string) => void;
  onPlay: (item: ContentItem) => void;
  onViewDetails: (item: ContentItem) => void;
  cardClassName?: string;
  isLoading?: boolean;
}

export default function MovieHorizontalSlider({
  items,
  watchlist,
  favorites,
  onToggleWatchlist,
  onToggleFavorite,
  onPlay,
  onViewDetails,
  cardClassName = "w-[160px] sm:w-[200px] md:w-[230px]",
  isLoading = false,
}: MovieHorizontalSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Mouse drag to scroll state
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Check scroll position to show/hide navigation arrows
  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      // Initial check
      checkScroll();
      // Handle resize
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [items]);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -containerRef.current.clientWidth * 0.75,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.clientWidth * 0.75,
        behavior: 'smooth',
      });
    }
  };

  // Mouse drag implementation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDown(true);
    containerRef.current.style.scrollBehavior = 'auto'; // Disable smooth for dragging
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeftState(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseUp = () => {
    setIsDown(false);
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    containerRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Enable subtle horizontal wheel scrolling if the user wants it
  const handleWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) return;
    // If scrolling vertically, let it scroll unless Shift is held,
    // but if the trackpad supports horizontal scroll, it's native.
    // To keep standard vertical scroll intact, we only intercept if they scroll horizontally or with high velocity.
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      containerRef.current.scrollLeft += e.deltaX;
    }
  };

  if (items.length === 0 && !isLoading) {
    return (
      <div className="py-8 text-center text-xs text-gray-500 font-semibold uppercase tracking-widest border border-white/5 bg-white/[0.01] rounded-2xl">
        No content available
      </div>
    );
  }

  return (
    <div className="relative group/slider w-full select-none">
      {/* Left Navigation Arrow */}
      {(showLeftArrow || isLoading) && (
        <button
          onClick={handleScrollLeft}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 border border-white/10 text-white opacity-0 group-hover/slider:opacity-100 hover:bg-black/90 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md shadow-2xl cursor-pointer hidden md:flex items-center justify-center"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Right Navigation Arrow */}
      {(showRightArrow || isLoading) && (
        <button
          onClick={handleScrollRight}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 border border-white/10 text-white opacity-0 group-hover/slider:opacity-100 hover:bg-black/90 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md shadow-2xl cursor-pointer hidden md:flex items-center justify-center"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Scrolling Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        className={`flex gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x scroll-smooth -mx-4 px-4 md:mx-0 md:px-0 ${
          isDown ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="shrink-0 snap-start">
              <SkeletonMovieCard className={cardClassName} />
            </div>
          ))
        ) : (
          items.map((item) => (
            <div key={item.id} className="shrink-0 snap-start">
              <MovieCard
                item={item}
                watchlist={watchlist}
                favorites={favorites}
                onToggleWatchlist={onToggleWatchlist}
                onToggleFavorite={onToggleFavorite}
                onPlay={onPlay}
                onViewDetails={onViewDetails}
                className={cardClassName}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
