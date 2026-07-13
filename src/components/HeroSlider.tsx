import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Info, ChevronLeft, ChevronRight, Star, Plus, Check } from 'lucide-react';
import { ContentItem } from '../types';

interface HeroSliderProps {
  featuredItems: ContentItem[];
  onPlay: (item: ContentItem) => void;
  onViewDetails: (item: ContentItem) => void;
  watchlist: string[];
  onToggleWatchlist: (itemId: string) => void;
}

function HeroSlider({
  featuredItems,
  onPlay,
  onViewDetails,
  watchlist,
  onToggleWatchlist,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Take up to 10 items
  const items = featuredItems.slice(0, 10);

  useEffect(() => {
    if (items.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, items.length]);

  if (items.length === 0) return null;

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (diff > minSwipeDistance) {
      // Swiped Left -> Show Next
      handleNext();
    } else if (diff < -minSwipeDistance) {
      // Swiped Right -> Show Prev
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentItem = items[currentIndex];
  const isInWatchlist = watchlist.includes(currentItem.id);

  // Animation variants for smooth cinematic crossfade-slider
  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 1.05,
      x: dir > 0 ? 50 : -50,
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for high-end organic slide
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      opacity: 0,
      scale: 0.95,
      x: dir > 0 ? -50 : 50,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <div
      id="hero-slider"
      className="relative w-full min-h-[500px] sm:min-h-[580px] md:min-h-[680px] lg:min-h-[720px] xl:min-h-[780px] h-[65vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden bg-black select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full flex flex-col justify-end"
        >
          {/* Backdrop Image */}
          <div className="absolute inset-0 w-full h-full bg-cover bg-center -z-10">
            <img
              src={currentItem.backdrop}
              alt={currentItem.title}
              className="w-full h-full object-cover object-center transform scale-100"
              referrerPolicy="no-referrer"
            />
            {/* Cinematic Overlay - Premium Vignette and Multi-layered Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
          </div>

          {/* Slide Content Frame: Rebuilt using Flexbox, utilizing padding constraints to clear header */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 md:pb-20 z-10 flex flex-col justify-end">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-end w-full">
              
              {/* Optional Official Poster (Hidden on mobile for cleaner layouts) */}
              <div className="hidden sm:block shrink-0 w-32 md:w-44 lg:w-48 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 transform hover:scale-[1.02] transition-transform duration-300">
                <img
                  src={currentItem.poster}
                  alt={currentItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text metadata */}
              <div className="flex-1 min-w-0 w-full flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  {/* Rating Label */}
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {currentItem.rating.toFixed(1)}
                  </span>
                  
                  {/* Year & Age rating */}
                  <span className="text-sm font-semibold text-gray-300">{currentItem.year}</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[11px] font-bold tracking-wider">
                    {currentItem.ageRating}
                  </span>
                  
                  {/* Runtime */}
                  <span className="text-sm text-gray-400 font-medium">
                    {currentItem.runtime} min
                  </span>

                  {currentItem.quality && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-widest">
                      {currentItem.quality}
                    </span>
                  )}
                </div>

                {/* Movie Title */}
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3 line-clamp-2 leading-tight drop-shadow-sm font-sans uppercase text-center md:text-left">
                  {currentItem.title}
                </h1>

                {/* Genre Tags */}
                <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mb-4">
                  {currentItem.genres.map((g) => (
                    <span
                      key={g}
                      className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-gray-300 text-xs font-medium"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Short Overview */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6 line-clamp-3 md:line-clamp-2 text-shadow-sm font-normal text-center md:text-left">
                  {currentItem.overview}
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 w-full">
                  {/* Play / Trailer button */}
                  <button
                    onClick={() => onPlay(currentItem)}
                    className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white hover:bg-white/90 text-black font-bold text-sm tracking-wide transition-all shadow-lg active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    Watch Trailer
                  </button>

                  {/* View Details Button */}
                  <button
                    onClick={() => onViewDetails(currentItem)}
                    className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-sm tracking-wide transition-all active:scale-95"
                  >
                    <Info className="w-4 h-4" />
                    View Details
                  </button>

                  {/* Watchlist Toggle */}
                  <button
                    onClick={() => onToggleWatchlist(currentItem.id)}
                    className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl border transition-all active:scale-90 ${
                      isInWatchlist
                        ? 'bg-[#E50914] border-[#E50914] text-white hover:bg-[#E50914]/90'
                        : 'bg-black/40 border-white/20 text-white hover:bg-black/60 hover:border-white/30'
                    }`}
                    title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  >
                    {isInWatchlist ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Plus className="w-5 h-5" />}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Slide Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/20 text-white/70 hover:text-white transition-all opacity-0 md:opacity-100 group-hover:opacity-100 shadow-md backdrop-blur-sm"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Cinematic Slide Right Navigation Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/20 text-white/70 hover:text-white transition-all opacity-0 md:opacity-100 group-hover:opacity-100 shadow-md backdrop-blur-sm"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Pagination Dots at Bottom Center */}
      <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(HeroSlider);
