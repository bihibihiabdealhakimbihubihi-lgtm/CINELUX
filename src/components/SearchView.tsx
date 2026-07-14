/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Search as SearchIcon, 
  X, 
  Mic, 
  MicOff, 
  Clock, 
  TrendingUp, 
  SlidersHorizontal, 
  ChevronDown, 
  Check, 
  Film, 
  Tv, 
  Star, 
  Award, 
  Sliders, 
  Calendar, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { ContentItem } from '../types';
import { GENRES, COUNTRIES, LANGUAGES, MOCK_TRENDING_SEARCHES } from '../data';
import MovieCard from './MovieCard';
import SkeletonMovieCard from './SkeletonMovieCard';

interface SearchViewProps {
  allContent: ContentItem[];
  onPlay: (item: ContentItem) => void;
  onViewDetails: (item: ContentItem) => void;
  watchlist: string[];
  favorites: string[];
  onToggleWatchlist: (itemId: string) => void;
  onToggleFavorite: (itemId: string) => void;
  initialQuery?: string;
  onClose: () => void;
}

export default function SearchView({
  allContent,
  onPlay,
  onViewDetails,
  watchlist,
  favorites,
  onToggleWatchlist,
  onToggleFavorite,
  initialQuery = '',
  onClose,
}: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<ContentItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // History & Trends
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('cinelux_search_history');
    return saved ? JSON.parse(saved) : ['Aetheris', 'Tokyo', 'Cyberpunk', 'Space Doc'];
  });
  
  // Voice Search Mock
  const [isListening, setIsListening] = useState(false);
  const [listeningStatus, setListeningStatus] = useState('Listening...');

  // Advanced Filters State
  const [showFilters, setShowFilters] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popularity' | 'newest' | 'rating' | 'az'>('popularity');
  const [qualityFilter, setQualityFilter] = useState<string>('All');

  // Load search results whenever queries or filters change
  useEffect(() => {
    setIsSearching(true);
    
    const timer = setTimeout(() => {
      let filtered = [...allContent];

      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter((item) => {
          return (
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.director.toLowerCase().includes(q) ||
            item.genres.some((g) => g.toLowerCase().includes(q)) ||
            item.cast.some((c) => c.name.toLowerCase().includes(q) || c.character.toLowerCase().includes(q))
          );
        });
      }

      // Genre filter
      if (selectedGenre !== 'All') {
        filtered = filtered.filter((item) => item.genres.includes(selectedGenre));
      }

      // Country filter
      if (selectedCountry !== 'All') {
        filtered = filtered.filter((item) => item.country === selectedCountry);
      }

      // Language filter
      if (selectedLanguage !== 'All') {
        filtered = filtered.filter((item) => item.language === selectedLanguage);
      }

      // Year filter
      if (selectedYear !== 'All') {
        if (selectedYear === '2025+') {
          filtered = filtered.filter((item) => typeof item.year === 'number' ? item.year >= 2025 : true);
        } else if (selectedYear === '2020-2024') {
          filtered = filtered.filter((item) => typeof item.year === 'number' && item.year >= 2020 && item.year <= 2024);
        } else if (selectedYear === 'Pre-2020') {
          filtered = filtered.filter((item) => typeof item.year === 'number' && item.year < 2020);
        }
      }
      
      // Rating filter
      if (minRating > 0) {
        filtered = filtered.filter((item) => item.rating >= minRating);
      }

      // Quality Filter
      if (qualityFilter !== 'All') {
        if (qualityFilter === '4K') {
          filtered = filtered.filter((item) => item.quality.includes('4K'));
        } else if (qualityFilter === 'HDR') {
          filtered = filtered.filter((item) => item.quality.includes('HDR'));
        }
      }

      // Sorting
      filtered.sort((a, b) => {
        if (sortBy === 'newest') {
          const yearA = typeof a.year === 'number' ? a.year : 2027;
          const yearB = typeof b.year === 'number' ? b.year : 2027;
          return yearB - yearA;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'az') {
          return a.title.localeCompare(b.title);
        }
        // popularity default
        const yearA = typeof a.year === 'number' ? a.year : 2027;
        const yearB = typeof b.year === 'number' ? b.year : 2027;
        return (b.rating * yearB) - (a.rating * yearA);
      });

      setSearchResults(filtered);
      setIsSearching(false);
    }, 400); // Cinematic high-performance 400ms loading state

    return () => clearTimeout(timer);
  }, [searchQuery, selectedGenre, selectedCountry, selectedLanguage, selectedYear, minRating, sortBy, qualityFilter, allContent]);

  // Persist search history changes
  useEffect(() => {
    localStorage.setItem('cinelux_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSelectHistory = (term: string) => {
    setSearchQuery(term);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleRemoveHistoryItem = (termToRemove: string) => {
    setSearchHistory(prev => prev.filter(t => t !== termToRemove));
  };

  const handleSearchSubmit = (term: string) => {
    if (!term.trim()) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((t) => t !== term);
      return [term, ...filtered].slice(0, 8); // Keep last 8 items
    });
  };

  // Simulate Voice Search transcribing after a few seconds
  const startVoiceSearch = () => {
    setIsListening(true);
    setListeningStatus('Listening...');
    
    setTimeout(() => {
      setListeningStatus('Processing voice signals...');
    }, 1500);

    setTimeout(() => {
      const phrases = ['Aetheris Chronicles', 'Tokyo Cyberpunk Noir', 'Paradox Loop Season 2', 'Space Documentaries'];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setSearchQuery(randomPhrase);
      setIsListening(false);
      handleSearchSubmit(randomPhrase);
    }, 3000);
  };

  const resetFilters = () => {
    setSelectedGenre('All');
    setSelectedCountry('All');
    setSelectedLanguage('All');
    setSelectedYear('All');
    setMinRating(0);
    setQualityFilter('All');
    setSortBy('popularity');
  };

  return (
    <div id="advanced-search-viewport" className="min-h-screen bg-[#070707] text-white pt-24 pb-20 select-none text-left">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Search Input HUD Header Row */}
        <div className="flex items-center gap-3 md:gap-4 p-4 rounded-3xl bg-[#111111] border border-white/5 shadow-2xl relative">
          <SearchIcon className="w-6 h-6 text-gray-400 shrink-0" />
          
          <input
            type="text"
            placeholder="Search by title, genre, director, country, cast, or AI keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(searchQuery)}
            className="flex-1 bg-transparent border-none outline-none text-white text-sm md:text-base font-medium placeholder-gray-500"
            autoFocus
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Voice search button */}
          <button
            onClick={startVoiceSearch}
            className={`p-2.5 rounded-full transition-all relative ${
              isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title="Search with Voice Assistant"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Collapsible advanced filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-full border transition-all ${
              showFilters ? 'bg-[#E50914]/15 border-[#E50914]/30 text-[#E50914]' : 'border-white/5 text-gray-400 hover:text-white'
            }`}
            title="Toggle Advanced Filters"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* VOICE SEARCH MICRO-MODAL OVERLAY */}
        {isListening && (
          <div className="fixed inset-0 bg-black/90 z-[999] flex flex-col items-center justify-center gap-6">
            <div className="w-24 h-24 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center animate-ping absolute" />
            <div className="w-20 h-20 rounded-full bg-[#E50914] text-white flex items-center justify-center relative shadow-2xl shadow-[#E50914]/40">
              <Mic className="w-8 h-8" />
            </div>
            <p className="text-lg font-bold tracking-wide mt-4 text-white animate-pulse">{listeningStatus}</p>
            <p className="text-xs text-gray-400 italic">Try saying "Chronicles of Space" or "Neon Tokyo"</p>
            <button
              onClick={() => setIsListening(false)}
              className="mt-6 px-6 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-xs text-gray-300 font-bold tracking-wider hover:text-white"
            >
              Cancel Listening
            </button>
          </div>
        )}

        {/* ADVANCED FILTER DRAWER PANEL */}
        {showFilters && (
          <div className="mt-5 p-6 rounded-3xl bg-[#111111]/60 border border-white/5 shadow-xl grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 transition-all text-left">
            {/* Genres dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Genre</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-[#181818] border border-white/5 rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer text-white focus:border-[#E50914]"
              >
                {GENRES.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Countries dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Origin</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="bg-[#181818] border border-white/5 rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer text-white focus:border-[#E50914]"
              >
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Languages dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-[#181818] border border-white/5 rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer text-white focus:border-[#E50914]"
              >
                <option value="All">All Languages</option>
                {LANGUAGES.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Release year dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Release Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-[#181818] border border-white/5 rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer text-white focus:border-[#E50914]"
              >
                <option value="All">All Years</option>
                <option value="2025+">2025 & Beyond</option>
                <option value="2020-2024">2020 - 2024</option>
                <option value="Pre-2020">Pre-2020 Classic</option>
              </select>
            </div>

            {/* Min Rating slider */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex justify-between">
                <span>IMDb Min</span>
                <span className="text-amber-400 font-bold">{minRating > 0 ? `${minRating.toFixed(1)}+` : 'All'}</span>
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="bg-[#181818] border border-white/5 rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer text-white focus:border-[#E50914]"
              >
                <option value={0}>Any Score</option>
                <option value={9}>9.0+ Excellent</option>
                <option value={8}>8.0+ Great</option>
                <option value={7}>7.0+ Good</option>
              </select>
            </div>

            {/* Quality badge filters */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Quality</label>
              <select
                value={qualityFilter}
                onChange={(e) => setQualityFilter(e.target.value)}
                className="bg-[#181818] border border-white/5 rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer text-white focus:border-[#E50914]"
              >
                <option value="All">All Quality</option>
                <option value="4K">4K UHD</option>
                <option value="HDR">HDR Signals</option>
              </select>
            </div>

            {/* Sorting criteria */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#181818] border border-white/5 rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer text-white focus:border-[#E50914]"
              >
                <option value="popularity">Popular Choice</option>
                <option value="newest">Newest Added</option>
                <option value="rating">Highest Rating</option>
                <option value="az">A - Z Titles</option>
              </select>
            </div>

            {/* Reset button spanning full width beneath row on mobile */}
            <div className="col-span-2 md:col-span-4 lg:col-span-7 border-t border-white/5 pt-3.5 flex justify-between items-center text-xs">
              <span className="text-gray-500">
                Filters matching <span className="text-white font-bold">{searchResults.length}</span> titles.
              </span>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* SEARCH HISTORY & TRENDING ROWS (shown primarily when search is empty) */}
        {!searchQuery && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="p-6 rounded-3xl bg-[#111111]/40 border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#E50914]" /> Search History
                  </h3>
                  <button
                    onClick={handleClearHistory}
                    className="text-[10px] text-gray-500 hover:text-white transition-colors"
                  >
                    Clear History
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((term, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] border border-white/5 hover:border-white/20 transition-all text-xs"
                    >
                      <button
                        onClick={() => handleSelectHistory(term)}
                        className="text-gray-300 hover:text-white transition-colors font-medium cursor-pointer"
                      >
                        {term}
                      </button>
                      <button
                        onClick={() => handleRemoveHistoryItem(term)}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending searches */}
            <div className="p-6 rounded-3xl bg-[#111111]/40 border border-white/5">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-400 animate-pulse" /> Trending Today
              </h3>
              <div className="flex flex-col gap-2">
                {MOCK_TRENDING_SEARCHES.map((trend, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectHistory(trend)}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all text-xs font-semibold flex items-center gap-2"
                  >
                    <span className="text-[#E50914] font-bold">#{idx + 1}</span>
                    <span>{trend}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEARCH RESULTS SHOWCASE GRID */}
        <div className="mt-10">
          <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-6">
            <h2 className="text-lg font-bold text-white tracking-wide">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Explore Stream Catalog'}
            </h2>
            <span className="text-xs text-gray-500">{searchResults.length} Titles Found</span>
          </div>

          {isSearching ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 sm:gap-y-8 gap-x-4 justify-items-center">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={`skeleton-${index}`} className="w-full sm:max-w-[240px]">
                  <SkeletonMovieCard />
                </div>
              ))}
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-3">
              <Sliders className="w-12 h-12 text-gray-600 stroke-[1.5]" />
              <p className="text-sm text-gray-400 font-bold">No streaming content matches those constraints.</p>
              <p className="text-xs text-gray-500">Try loosening your active filter rules or searching for generic keywords like "Space" or "Noir".</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 sm:gap-y-8 gap-x-4 justify-items-center">
              {searchResults.map((item) => (
                <div key={item.id} className="w-full sm:max-w-[240px]">
                  <MovieCard
                    item={item}
                    watchlist={watchlist}
                    favorites={favorites}
                    onToggleWatchlist={onToggleWatchlist}
                    onToggleFavorite={onToggleFavorite}
                    onPlay={onPlay}
                    onViewDetails={onViewDetails}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
