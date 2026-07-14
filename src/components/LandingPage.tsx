/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Sparkles, 
  Tv, 
  Smartphone, 
  Laptop, 
  ShieldCheck, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Star, 
  Zap, 
  Heart,
  Film,
  Volume2,
  Lock,
  Globe,
  Award,
  Bookmark,
  MessageSquare,
  Send,
  CheckCircle2,
  HelpCircle,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPACT_MOVIES } from '../movies-data';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  // Carousel ref and scroll helpers
  const carouselRef = useRef<HTMLDivElement>(null);

  // Infinite Autoplay Slider States for "Trending This Week"
  const [virtualIndex, setVirtualIndex] = useState(5); // Start at index 5 (first real movie)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  
  // Testimonials state
  const [reviews, setReviews] = useState([
    {
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      username: 'Sarah Jenkins',
      country: 'United States',
      rating: 5,
      text: 'CineLux is hands down the best streaming catalog out there. The UI is gorgeous, clean, and blazingly fast!'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      username: 'Kenji Takahashi',
      country: 'Japan',
      rating: 5,
      text: 'Immersive sound, incredible selection of 4K content, and the AI recommendations are surprisingly spot on.'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      username: 'Chantal Dubois',
      country: 'France',
      rating: 5,
      text: 'A magnificent platform. I love being able to curate my watchlist and view such high-fidelity movie posters and reviews.'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
      username: 'Rajesh Kumar',
      country: 'India',
      rating: 5,
      text: 'Finally, a streaming curation platform made for true cinema enthusiasts. Outstanding design and absolutely ad-free!'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
      username: 'Clara Schmidt',
      country: 'Germany',
      rating: 5,
      text: 'The absolute gold standard of movie indexes. Slick, intuitive, and extremely performant. A joy to use.'
    }
  ]);

  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Auto rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  // Handle Review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;

    const avatars = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'
    ];

    const newReview = {
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      username: reviewName,
      country: 'Verified User',
      rating: reviewRating,
      text: reviewText
    };

    setReviews((prev) => [...prev, newReview]);
    setReviewName('');
    setReviewText('');
    setReviewRating(5);
    setSubmittedMessage(true);

    // Focus / switch immediately to the newly added review
    setActiveReviewIdx(reviews.length);

    setTimeout(() => {
      setSubmittedMessage(false);
    }, 4000);
  };

  // Infinite slider controls
  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsAnimating(true);
    setVirtualIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsAnimating(true);
    setVirtualIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (virtualIndex >= 17) {
      setVirtualIndex(5);
    } else if (virtualIndex <= 4) {
      setVirtualIndex(16);
    }
    setIsTransitioning(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Autoplay hook for trending slider
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4500); // Slides every 4.5 seconds

    return () => clearInterval(interval);
  }, [isHovered, isTransitioning, virtualIndex]);

  // Deduplicate COMPACT_MOVIES by title, poster, and release date
  const uniqueMovies: typeof COMPACT_MOVIES = [];
  const seenKeys = new Set<string>();
  for (const m of COMPACT_MOVIES) {
    const key = `${m.title.trim().toLowerCase()}|${m.poster.trim()}|${m.releaseDate.trim().toLowerCase()}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueMovies.push(m);
    }
  }

  // Extract real trending movies (10-12) from our datasets
  const trendingMovies = uniqueMovies.slice(0, 12);

  const sliderItems = [
    ...trendingMovies.slice(-5).map((m, idx) => ({ ...m, sliderId: `prepended-${idx}-${m.id}` })),
    ...trendingMovies.map((m) => ({ ...m, sliderId: `middle-${m.id}` })),
    ...trendingMovies.slice(0, 5).map((m, idx) => ({ ...m, sliderId: `appended-${idx}-${m.id}` })),
  ];

  const activeMovieIndex = (virtualIndex - 5 + trendingMovies.length) % trendingMovies.length;

  // Extract featured movies (8) from our datasets
  const featuredMovies = uniqueMovies.filter(m => m.isFeatured).slice(0, 8);
  // Fallback to slice if featured list is short
  const featuredRow = featuredMovies.length >= 8 ? featuredMovies : uniqueMovies.slice(12, 20);

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#050505] text-white select-none text-left scroll-smooth font-sans">
      <style>{`
        .trending-slider-container {
          --visible-items: 2;
          --gap: 16px;
        }
        @media (min-width: 768px) {
          .trending-slider-container {
            --visible-items: 3;
            --gap: 24px;
          }
        }
        @media (min-width: 1024px) {
          .trending-slider-container {
            --visible-items: 5;
            --gap: 24px;
          }
        }
      `}</style>
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-24 px-4 sm:px-6 bg-black">
        {/* Cinematic overlay image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 pointer-events-none"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1574267431629-2e570b032d13?q=80&w=1920&auto=format&fit=crop')`
          }}
        />
        
        {/* Dark elegant cinematic gradients for absolute legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/85 to-black/50 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
        
        {/* Radial subtle red brand glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-[#E50914]/10 blur-[120px] pointer-events-none z-10" />

        <div className="max-w-4xl mx-auto text-center relative z-20 flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-bold mb-6 tracking-wider backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>The Next Generation Cinema Hub</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1] max-w-4xl uppercase font-sans text-white"
          >
            Discover the World's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] via-[#ff3b47] to-[#ff7e86] drop-shadow-[0_2px_15px_rgba(229,9,20,0.45)]">
              Best Movies.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mb-10 leading-relaxed font-normal"
          >
            Explore thousands of movies and TV shows in stunning HD and 4K. Build your watchlist, discover new favorites, and enjoy a premium cinematic experience.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative group w-full sm:w-auto flex justify-center"
          >
            {/* Elegant 3D shadow layer underneath */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#b8070f] to-[#450205] translate-y-1.5 blur-md opacity-85 transition-all duration-300 group-hover:translate-y-2 group-hover:opacity-100" />
            
            <button
              onClick={onGetStarted}
              className="relative w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-[#E50914] via-[#ff1622] to-[#E50914] text-white text-xs sm:text-sm font-black uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#E50914]/40 active:translate-y-1 active:shadow-inner cursor-pointer border border-white/20 flex items-center justify-center gap-3 select-none"
            >
              <span>Get Started — It's Free</span>
              <Play className="w-4 h-4 fill-white stroke-none animate-pulse" />
            </button>
          </motion.div>
        </div>

        {/* Subtle Scroll-Down Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:text-white transition-colors z-20"
          onClick={() => {
            const nextSec = document.getElementById('quick-stats');
            if (nextSec) nextSec.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[9px] tracking-widest uppercase font-bold text-gray-500">Scroll Down</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </div>


      {/* 2. QUICK STATS */}
      <div id="quick-stats" className="py-12 bg-[#050505] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '20,000+', label: 'Movies', icon: '🎬', desc: 'Curated world blockbusters' },
            { value: '5,000+', label: 'TV Shows', icon: '📺', desc: 'Full premium series' },
            { value: 'Updated Daily', label: 'Fresh Content', icon: '⭐', desc: 'Synced with new releases' },
            { value: 'HD & 4K Streaming', label: 'Max Fidelity', icon: '💎', desc: 'Dolby Atmos immersive audio' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ 
                y: -6, 
                borderColor: 'rgba(229, 9, 20, 0.3)',
                boxShadow: '0 12px 30px -10px rgba(229, 9, 20, 0.15)'
              }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl bg-[#111111]/30 border border-white/5 flex items-center gap-5 text-left transition-all group cursor-pointer"
            >
              <div className="text-3xl bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#E50914]/10 group-hover:border-[#E50914]/20 transition-all">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-xl font-black text-white group-hover:text-[#E50914] transition-colors">{stat.value}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      {/* 3. TRENDING THIS WEEK */}
      <div 
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 border-t border-white/5 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-between items-end mb-8">
          <div className="text-left">
            <span className="text-xs text-[#E50914] font-black uppercase tracking-widest block mb-1">Weekly Highlights</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white uppercase">
              Trending This Week
            </h2>
          </div>
          {/* Scroll Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-[#111111] hover:bg-[#E50914]/10 border border-white/10 hover:border-[#E50914]/30 transition-all text-white active:scale-95 cursor-pointer flex items-center justify-center"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-[#111111] hover:bg-[#E50914]/10 border border-white/10 hover:border-[#E50914]/30 transition-all text-white active:scale-95 cursor-pointer flex items-center justify-center"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sliding Carousel Track */}
        <div className="trending-slider-container relative w-full overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex"
            style={{
              gap: 'var(--gap)',
              transform: `translate3d(calc(-1 * ${virtualIndex} * (100% + var(--gap)) / var(--visible-items)), 0, 0)`,
              transition: isAnimating ? 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              width: '100%',
            }}
            onTransitionEnd={handleTransitionEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {sliderItems.map((movie) => (
              <motion.div
                key={movie.sliderId}
                onClick={onGetStarted}
                whileHover={{ y: -8 }}
                className="flex-shrink-0 text-left group cursor-pointer transition-all duration-300"
                style={{
                  width: 'calc((100% - (var(--visible-items) - 1) * var(--gap)) / var(--visible-items))',
                }}
              >
                {/* Image Frame */}
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 group-hover:border-[#E50914]/50 transition-all shadow-xl bg-neutral-900">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Brand Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="px-2.5 py-1 rounded-md bg-[#E50914] text-[9px] font-extrabold uppercase tracking-widest w-fit shadow-lg mb-2">
                      Stream Now
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/70 border border-white/10 backdrop-blur-md flex items-center gap-1 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                    <span className="text-amber-400">{movie.rating}</span>
                  </div>
                </div>

                {/* Text Block */}
                <div className="mt-3.5">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#E50914] transition-colors line-clamp-1">
                    {movie.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    {movie.genres[0]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Small Pagination Dots below the slider */}
        <div className="flex justify-center gap-2 mt-6">
          {trendingMovies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (isTransitioning) return;
                setIsTransitioning(true);
                setIsAnimating(true);
                setVirtualIndex(idx + 5);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeMovieIndex ? 'bg-[#E50914] w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>


      {/* 4. WHY CHOOSE CINELUX */}
      <div className="py-24 bg-[#080808] border-t border-b border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs text-[#E50914] font-black uppercase tracking-widest block mb-1">Unmatched Streaming</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase font-sans">
              Why Choose CineLux
            </h2>
            <p className="text-xs text-gray-500 mt-2">
              Engineered with state-of-the-art catalog tools for film aficionados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast Streaming',
                desc: 'Enjoy smooth and high-quality playback with optimized global CDN delivery.',
                color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
              },
              {
                icon: Film,
                title: 'Premium Movie Library',
                desc: 'Thousands of carefully selected movies and TV shows, formatted in peak bitrates.',
                color: 'text-red-400 bg-red-500/10 border-red-500/20'
              },
              {
                icon: Heart,
                title: 'Build Your Watchlist',
                desc: 'Save your favorite movies and continue watching anytime with dynamic storage.',
                color: 'text-pink-400 bg-pink-500/10 border-pink-500/20'
              }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-[#111111]/30 border border-white/5 hover:border-white/10 transition-all flex flex-col gap-5 group cursor-pointer"
                >
                  <div className={`p-4 rounded-2xl w-fit border ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E50914] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>


      {/* 5. USER REVIEWS */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Review Slider */}
          <div className="lg:col-span-7 text-left">
            <span className="text-xs text-[#E50914] font-black uppercase tracking-widest block mb-1">Global Opinions</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-8 uppercase font-sans">
              User Reviews
            </h2>

            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReviewIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#111111]/40 border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col justify-between gap-6 relative shadow-2xl"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <img 
                        src={reviews[activeReviewIdx].avatar} 
                        alt={reviews[activeReviewIdx].username}
                        className="w-12 h-12 rounded-full border border-white/10 object-cover" 
                      />
                      <div>
                        <h4 className="text-sm font-black text-white">{reviews[activeReviewIdx].username}</h4>
                        <p className="text-[11px] text-gray-500 font-semibold">{reviews[activeReviewIdx].country}</p>
                      </div>
                    </div>

                    <div className="flex gap-0.5">
                      {[...Array(reviews[activeReviewIdx].rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm md:text-base text-gray-300 italic leading-relaxed font-normal">
                    "{reviews[activeReviewIdx].text}"
                  </p>

                  <div className="flex gap-2.5 mt-2">
                    {reviews.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveReviewIdx(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeReviewIdx === i ? 'w-6 bg-[#E50914]' : 'w-1.5 bg-gray-600 hover:bg-gray-400'}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Form: Leave Your Review */}
          <div className="lg:col-span-5 bg-[#111111]/30 border border-white/5 rounded-3xl p-8 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider font-sans">
              Leave Your Review
            </h3>

            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 text-left">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1.5">
                  Your Name
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Liam Sterling"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/5 hover:border-white/10 focus:border-[#E50914]/40 focus:outline-none text-xs font-bold transition-all placeholder:text-gray-600 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1.5">
                  Rating
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => setReviewRating(stars)}
                      className="p-1 cursor-pointer hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${reviewRating >= stars ? 'fill-amber-400 stroke-none' : 'stroke-gray-600 fill-none'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1.5">
                  Review Text
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Write your cinema critique here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/5 hover:border-white/10 focus:border-[#E50914]/40 focus:outline-none text-xs leading-relaxed transition-all placeholder:text-gray-600 resize-none text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#E50914] hover:bg-[#ff1622] text-white text-[11px] font-extrabold uppercase tracking-widest cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <span>Submit Review</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              <AnimatePresence>
                {submittedMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Thank you! Your review was posted successfully.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>
      </div>


      {/* 6. FEATURED COLLECTION */}
      <div className="py-24 bg-[#080808] border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <span className="text-xs text-[#E50914] font-black uppercase tracking-widest block mb-1">Our Masterpieces</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase font-sans">
              Featured Collection
            </h2>
            <p className="text-xs text-gray-500 mt-2">
              High-fidelity selections carefully curated by CineLux editors
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {featuredRow.map((movie) => (
              <motion.div
                key={movie.id}
                onClick={onGetStarted}
                whileHover={{ y: -8 }}
                className="group cursor-pointer text-left"
              >
                {/* Poster Box */}
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 group-hover:border-[#E50914]/40 transition-all bg-neutral-900 shadow-lg">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Visual details on image bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-4">
                    <span className="px-2.5 py-1 rounded-md bg-[#E50914] text-[9px] font-extrabold uppercase tracking-widest w-fit shadow-lg mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Stream
                    </span>
                  </div>
                  {/* Rating badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/75 border border-white/10 backdrop-blur-md flex items-center gap-1 text-[11px] font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                    <span className="text-amber-400">{movie.rating}</span>
                  </div>
                </div>

                {/* Movie Titles */}
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#E50914] transition-colors line-clamp-1">
                    {movie.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">
                    {movie.genres.slice(0, 2).join(' / ')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


      {/* 6.5 SUPPORT SECTION */}
      <div className="py-24 bg-[#050505] border-t border-white/5 relative z-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-[#111111]/30 border border-white/5 p-8 md:p-12 text-center shadow-2xl group hover:border-[#E50914]/30 transition-all duration-500"
          >
            {/* Subtle brand glow behind the card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#E50914]/5 blur-[60px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Support Icon */}
              <div className="p-4 rounded-2xl bg-[#E50914]/10 border border-[#E50914]/20 text-[#E50914] mb-6 group-hover:scale-110 transition-transform duration-300">
                <HelpCircle className="w-8 h-8" />
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase font-sans mb-4">
                Need Help?
              </h2>

              {/* Description */}
              <div className="max-w-xl mx-auto mb-8">
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal mb-4">
                  Experiencing any issues while using CineLux?
                </p>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                  If you encounter bugs, playback problems, account issues, or have any questions, our support team is always ready to help.
                </p>
              </div>

              {/* Contact Button / Link */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">
                  📧 Contact us:
                </span>
                <a
                  href="mailto:cinelux10@gmail.com"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-[#E50914]/10 border border-white/10 hover:border-[#E50914]/30 text-white hover:text-[#ff3b47] font-mono text-sm sm:text-base font-medium transition-all duration-300 active:scale-95 group/btn"
                >
                  <Mail className="w-4 h-4 text-[#E50914] group-hover/btn:scale-110 transition-transform duration-300" />
                  <span>cinelux10@gmail.com</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


      {/* 7. FOOTER */}
      <footer className="bg-black border-t border-white/5 pt-16 pb-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 pb-12 border-b border-white/5 text-left">
            
            {/* Logo / Brand block */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <span className="text-xl font-sans font-black tracking-widest uppercase">
                Cine<span className="text-[#E50914]">Lux</span>
              </span>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                An elite, ad-free streaming catalog for film lovers. Experience state-of-the-art cinematic discovery coupled with intelligent design.
              </p>
            </div>

            {/* Quick Links Blocks */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <h5 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Navigation</h5>
              <button onClick={onGetStarted} className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer text-left">Home</button>
              <button onClick={onGetStarted} className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer text-left">Movies</button>
              <button onClick={onGetStarted} className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer text-left">Series</button>
            </div>

            <div className="md:col-span-2 flex flex-col gap-3">
              <h5 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Legal</h5>
              <a href="#privacy" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="#about" className="text-xs text-gray-500 hover:text-white transition-colors">About</a>
            </div>

            <div className="md:col-span-3 flex flex-col gap-3">
              <h5 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Support</h5>
              <a href="#contact" className="text-xs text-gray-500 hover:text-white transition-colors">Contact</a>
              <a href="#help" className="text-xs text-gray-500 hover:text-white transition-colors">Support Center</a>
              <span className="text-xs text-gray-600 font-mono">Service Status: Live</span>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-600 font-medium">
            <span>© 2026 CineLux. All Rights Reserved.</span>
            <div className="flex gap-6">
              <span className="hover:text-white transition-colors cursor-pointer">About</span>
              <span className="hover:text-white transition-colors cursor-pointer">Contact</span>
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-white transition-colors cursor-pointer">Support</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
