/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Film } from 'lucide-react';

interface SkeletonMovieCardProps {
  className?: string; // Custom sizing/layout class to match the MovieCard
}

export default function SkeletonMovieCard({
  className = "w-full max-w-[240px]"
}: SkeletonMovieCardProps) {
  return (
    <div className={`relative flex-none select-none transition-all duration-300 ${className}`}>
      {/* Aspect Ratio 2:3 Poster Placeholder */}
      <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-[#121212] border border-white/5 shadow-md flex flex-col justify-between p-4">
        {/* Shimmer/Pulse Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full animate-shimmer pointer-events-none" />
        
        {/* Quality Indicator Badge Placeholder */}
        <div className="w-12 h-4 rounded bg-white/5 border border-white/[0.03] animate-pulse" />

        {/* Optional Centered Film Reel Icon Placeholder to feel contextual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Film className="w-8 h-8 text-white/[0.02] animate-pulse" />
        </div>

        {/* Watchlist/Favorite Buttons Placeholder at Top Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/[0.03] animate-pulse" />
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/[0.03] animate-pulse" />
        </div>
      </div>

      {/* Non-hover Information Placeholders underneath card */}
      <div className="mt-3 px-1 space-y-2 text-left">
        {/* Title Line */}
        <div className="h-3.5 bg-white/[0.06] rounded-md w-4/5 animate-pulse" />
        
        {/* Subtitle Line (Year and Genres) */}
        <div className="flex gap-2">
          <div className="h-2.5 bg-white/[0.03] rounded-md w-1/4 animate-pulse" />
          <div className="h-2.5 bg-white/[0.03] rounded-md w-1/3 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
