import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Send, MessageSquare, Award, Clock } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  avatarGradient: string;
  rating: number;
  text: string;
  date: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    avatarGradient: 'from-pink-500 via-red-500 to-yellow-500',
    rating: 5,
    text: 'The streaming quality is absolutely flawless! Zero buffering even at 4K. CineLux is easily the best movie experience out there.',
    date: 'Jul 9, 2026'
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatarGradient: 'from-green-400 to-blue-500',
    rating: 5,
    text: 'Slick interface and incredible curated collections. Navigating through titles is snappy, and the AI Recommender is surprisingly spot on!',
    date: 'Jul 8, 2026'
  },
  {
    id: '3',
    name: 'Elena Rostova',
    avatarGradient: 'from-purple-600 to-indigo-600',
    rating: 5,
    text: 'A absolute masterpiece of a streaming site! I love the retro vibes mixed with cutting-edge UI. A film lover’s dream destination.',
    date: 'Jul 6, 2026'
  },
  {
    id: '4',
    name: 'David K.',
    avatarGradient: 'from-amber-500 to-orange-600',
    rating: 5,
    text: 'The Sound quality is remarkable on my home theater system. The cinematic layout makes me feel like I’m right in a physical cinema.',
    date: 'Jul 5, 2026'
  }
];

export default function CommunityReviews() {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('cinelux_community_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_REVIEWS;
      }
    }
    return DEFAULT_REVIEWS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);

  // Form States
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Swipe support refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-play interval (every 5 seconds)
  useEffect(() => {
    if (isHovered || reviews.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isHovered, reviews.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
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
      handleNext();
    } else if (diff < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    // Generate random premium-looking gradient for avatar
    const gradients = [
      'from-pink-500 via-red-500 to-yellow-500',
      'from-green-400 to-blue-500',
      'from-purple-600 to-indigo-600',
      'from-amber-500 to-orange-600',
      'from-cyan-500 to-blue-600',
      'from-rose-500 to-red-700'
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateStr = new Date().toLocaleDateString('en-US', options);

    const newReview: Review = {
      id: Date.now().toString(),
      name: formName.trim(),
      avatarGradient: randomGradient,
      rating: formRating,
      text: formComment.trim(),
      date: dateStr
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('cinelux_community_reviews', JSON.stringify(updatedReviews));

    // Reset form states
    setFormName('');
    setFormRating(5);
    setFormComment('');
    setFormSuccess(true);
    setCurrentIndex(0); // Show newest immediately

    setTimeout(() => {
      setFormSuccess(false);
    }, 4000);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 100 : -100,
      scale: 0.95
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -100 : 100,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    })
  };

  const currentReview = reviews[currentIndex] || reviews[0];

  return (
    <div id="community-reviews-section" className="border-t border-white/5 pt-12">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914] text-[10px] font-bold tracking-widest uppercase inline-flex items-center gap-1.5 backdrop-blur-sm">
            <MessageSquare className="w-3.5 h-3.5" />
            CineLux Voice
          </span>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-sans">
            Community Reviews
          </h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold max-w-lg mx-auto">
            See what other movie enthusiasts are saying about CineLux, or share your own thoughts!
          </p>
        </div>

        {/* Carousel Container */}
        {reviews.length > 0 && (
          <div 
            className="relative bg-gradient-to-br from-[#121212]/90 via-[#181818]/60 to-[#0c0c0c]/90 rounded-[28px] border border-white/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-6 md:p-10 select-none overflow-hidden group min-h-[220px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Ambient Red Glow in background */}
            <div className="absolute -right-16 -bottom-16 w-36 h-36 rounded-full bg-[#E50914]/5 blur-2xl group-hover:bg-[#E50914]/10 transition-all duration-500 pointer-events-none" />
            <div className="absolute -left-16 -top-16 w-36 h-36 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-6 md:gap-8">
              
              {/* Review card Slider with AnimatePresence */}
              <div className="flex-1 w-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentReview.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full flex flex-col md:flex-row items-center md:items-start gap-6"
                  >
                    {/* User Avatar with Initials */}
                    <div className="shrink-0 flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentReview.avatarGradient} p-[2px] shadow-lg`}>
                        <div className="w-full h-full bg-[#141414] rounded-[14px] flex items-center justify-center font-black text-lg text-white font-sans uppercase">
                          {currentReview.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                    </div>

                    {/* Review text, rating, name */}
                    <div className="flex-1 text-center md:text-left space-y-3">
                      
                      {/* Rating Stars & Date */}
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`w-4 h-4 ${idx < currentReview.rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-gray-500 font-mono flex items-center gap-1 uppercase">
                          <Clock className="w-3 h-3" /> {currentReview.date}
                        </span>
                      </div>

                      {/* Review body */}
                      <p className="text-gray-200 text-sm md:text-base leading-relaxed italic font-medium px-2 md:px-0">
                        "{currentReview.text}"
                      </p>

                      {/* User Name */}
                      <div className="flex items-center justify-center md:justify-start gap-1.5 pt-1">
                        <h4 className="text-sm md:text-base font-black text-white uppercase tracking-wider font-sans">
                          {currentReview.name}
                        </h4>
                        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-gray-400 tracking-widest uppercase">
                          Verified User
                        </span>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="absolute right-4 bottom-4 z-20 flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/20 text-white/70 hover:text-white transition-all active:scale-90 shadow-md backdrop-blur-sm cursor-pointer"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/20 text-white/70 hover:text-white transition-all active:scale-90 shadow-md backdrop-blur-sm cursor-pointer"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Indicator Dots at bottom left */}
            <div className="absolute left-6 bottom-5 hidden md:flex gap-1.5">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-5 bg-[#E50914]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        )}

        {/* Leave a Review Form Section */}
        <div className="bg-[#121212]/40 rounded-[28px] border border-white/[0.04] p-6 md:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E50914]/10 rounded-xl border border-[#E50914]/20 text-[#E50914]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">Leave a Review</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Share your CineLux experience with the world</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider text-center"
              >
                Thank you! Your review has been added successfully.
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-extrabold text-gray-400">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#E50914]/50 focus:bg-black/60 transition-all font-medium"
                />
              </div>

              {/* Rating Star Selector */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-extrabold text-gray-400">
                  Rating
                </label>
                <div className="flex items-center gap-2 h-[46px] px-4 bg-black/40 border border-white/10 rounded-xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      className="text-gray-600 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= formRating ? 'fill-amber-400 text-amber-400' : 'text-white/20'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-amber-400 font-mono">{formRating}/5 Stars</span>
                </div>
              </div>
            </div>

            {/* Comment Textarea */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest font-extrabold text-gray-400">
                Your Comment
              </label>
              <textarea
                required
                rows={3}
                placeholder="Write your review about CineLux... What did you love the most?"
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#E50914]/50 focus:bg-black/60 transition-all font-medium resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#ff1f2d] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-out transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_14px_rgba(229,9,20,0.3)] hover:shadow-[0_6px_20px_rgba(229,9,20,0.45)] flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Review
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
