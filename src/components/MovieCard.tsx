/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, memo } from 'react';
import { motion } from 'motion/react';
import { Play, Star, Plus, Check, Info, Heart, Bookmark } from 'lucide-react';
import { ContentItem } from '../types';

interface MovieCardProps {
  item: ContentItem;
  onPlay: (item: ContentItem) => void;
  onViewDetails: (item: ContentItem) => void;
  watchlist: string[];
  favorites: string[];
  onToggleWatchlist: (itemId: string) => void;
  onToggleFavorite: (itemId: string) => void;
  progress?: number; // 0 - 100 progress if continue watching
  className?: string; // Custom sizing/layout class
  layout?: 'responsive' | 'vertical' | 'horizontal';
}

function MovieCard({
  item,
  onPlay,
  onViewDetails,
  watchlist,
  favorites,
  onToggleWatchlist,
  onToggleFavorite,
  progress,
  className = "w-full max-w-[240px]",
  layout = 'vertical',
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isInWatchlist = watchlist.includes(item.id);
  const isInFavorites = favorites.includes(item.id);

  return (
    <div
      id={`movie-card-${item.id}`}
      className={`relative flex-none group cursor-pointer select-none transition-all duration-300 optimize-rendering flex flex-col ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(item)}
    >
      {/* Poster Image Wrapper */}
      <div
        className="relative shrink-0 overflow-hidden bg-[#181818] shadow-lg border border-white/5 group-hover:border-white/25 aspect-[2/3] w-full rounded-2xl transition-all duration-300"
      >
        <img
          src={item.poster}
          alt={item.title}
          className="block w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Cinematic Backdrop Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10" />

        {/* Bookmark & Favorite overlay buttons */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(item.id);
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md border shadow-md transition-transform active:scale-90 ${
              isInWatchlist
                ? 'bg-[#E50914] border-[#E50914] text-white'
                : 'bg-black/60 border-white/10 text-white hover:bg-black/80'
            }`}
            title={isInWatchlist ? 'Remove from List' : 'Add to List'}
          >
            {isInWatchlist ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Plus className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item.id);
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md border shadow-md transition-transform active:scale-90 ${
              isInFavorites
                ? 'bg-amber-500 border-amber-500 text-black'
                : 'bg-black/60 border-white/10 text-white hover:bg-black/80'
            }`}
            title={isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            <Heart className={`w-3.5 h-3.5 ${isInFavorites ? 'fill-black stroke-none' : ''}`} />
          </button>
        </div>

        {/* Quality indicator badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-bold text-gray-300 tracking-wider">
            {item.quality.includes('4K') ? '4K UHD' : 'HDR'}
          </span>
        </div>

        {/* Center Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onPlay(item);
            }}
            className="w-12 h-12 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg shadow-[#E50914]/30 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white stroke-none ml-0.5" />
          </motion.button>
        </div>

        {/* Hover Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-1.5 text-left">
          <div className="flex items-center gap-2 text-[10px] text-gray-300 font-semibold">
            <span className="flex items-center gap-0.5 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              {item.rating > 0 ? item.rating.toFixed(1) : 'Coming'}
            </span>
            <span>•</span>
            <span className="px-1 rounded border border-white/20 text-[9px]">
              {item.ageRating}
            </span>
          </div>

          <h3 className="text-white text-xs font-bold truncate">
            {item.title}
          </h3>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(item);
            }}
            className="mt-1 flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[10px] font-semibold transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            More Details
          </button>
        </div>

        {/* History progress bar overlay */}
        {progress !== undefined && progress > 0 && progress < 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
            <div
              className="h-full bg-[#E50914] rounded-r-sm transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Non-hover description text below card */}
      <div className="mt-2 text-left group-hover:opacity-30 transition-opacity duration-300 px-1 w-full">
        <h4 className="text-white text-xs font-semibold truncate leading-tight">
          {item.title}
        </h4>
        <p className="text-[10px] text-gray-500 font-medium mt-0.5">
          {item.genres.slice(0, 2).join('/')}
        </p>
      </div>
    </div>
  );
}

export default memo(MovieCard);
