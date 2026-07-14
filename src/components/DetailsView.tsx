/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Star, 
  Bookmark, 
  Heart, 
  Calendar, 
  DollarSign, 
  Clock, 
  Sparkles, 
  Award, 
  ThumbsUp, 
  ChevronDown, 
  Languages, 
  Plus, 
  Check, 
  ExternalLink, 
  MessageSquare, 
  Send, 
  ArrowLeft,
  Globe,
  Tv as TVIcon,
  Image,
  Newspaper,
  Eye,
  Activity,
  Users
} from 'lucide-react';
import { ContentItem, Season, Episode, Review, Comment } from '../types';

interface DetailsViewProps {
  item: ContentItem;
  allContent: ContentItem[];
  watchlist: string[];
  favorites: string[];
  onToggleWatchlist: (itemId: string) => void;
  onToggleFavorite: (itemId: string) => void;
  onPlay: (item: ContentItem, episode?: Episode) => void;
  onClose: () => void;
  onViewItem: (item: ContentItem) => void;
}

// Simulated Live Discussion Fan Reactions
const FAN_REACTIONS_MOCK = [
  {
    id: 're-1',
    user: 'Kaelen Vance',
    handle: '@cine_phiile',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    text: 'STILL SHAKEN by the climax sequence. The audio mixing alone in Dolby Atmos literally rattled my teeth. Exceptional cinema.',
    likes: 142,
    time: '24m ago',
    source: 'Letterboxd'
  },
  {
    id: 're-2',
    user: 'Amara Lopez',
    handle: '@amarastream',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    text: 'Marcus Nolan does it again. The cinematic scale of the set design and the practical mathematical loops are flawless. A solid 10/10.',
    likes: 98,
    time: '1h ago',
    source: 'Twitter'
  },
  {
    id: 're-3',
    user: 'Takeshi Tanaka',
    handle: '@neon_voyager',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    text: 'A profound philosophical challenge wrapped in a visual powerhouse package. Truly outstanding.',
    likes: 215,
    time: '3h ago',
    source: 'FilmCortex'
  }
];

// Simulated Movie Specific News & Production updates
const MOVIE_NEWS_MOCK = [
  {
    title: 'Director Reveals Secret Math Formulas Used for Fold Sequences',
    source: 'Variety Hollywood',
    time: 'Yesterday',
    snippet: 'In an exclusive interview, the creative team confirmed they hired theoretical physicists to mathematically align all dimension folds on screen.'
  },
  {
    title: 'Box Office Milestone: Opening Weekend Surpasses Projections by 24%',
    source: 'The Hollywood Reporter',
    time: '3 days ago',
    snippet: 'Dynamic ticket requests for IMAX laser projection screenings hit historical highs across key international metropolitan areas.'
  },
  {
    title: 'Casting Decisions Revealed: Original Roles Were Intended for Diverse Cast',
    source: 'Deadline',
    time: '1 week ago',
    snippet: 'Detailed early concept art boards reveal that the protagonist was originally drafted as an astronaut engineer from South Korea.'
  }
];

// Screenshots Mock Data
const SCREENSHOTS_MOCK = [
  { title: 'The Singularity Void', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop' },
  { title: 'Cyber Rain Tokyo Scene', url: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=600&auto=format&fit=crop' },
  { title: 'The Polar Crevasse Ascent', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop' }
];

export default function DetailsView({
  item,
  allContent,
  watchlist,
  favorites,
  onToggleWatchlist,
  onToggleFavorite,
  onPlay,
  onClose,
  onViewItem,
}: DetailsViewProps) {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [userComment, setUserComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isGeneratingAIReview, setIsGeneratingAIReview] = useState(false);
  const [ratingInput, setRatingInput] = useState(10);
  const [reviewInput, setReviewInput] = useState('');
  const [reviewerName, setReviewerName] = useState('Anonymous Critic');

  // Interactive Live Discussion Tabs
  const [activeDiscussionTab, setActiveDiscussionTab] = useState<'chat' | 'reviews' | 'reactions' | 'news' | 'media'>('chat');
  
  // Typing Simulator states to make discussion feel ALIVE
  const [liveTypingUser, setLiveTypingUser] = useState<string | null>(null);

  const isInWatchlist = watchlist.includes(item.id);
  const isInFavorites = favorites.includes(item.id);

  // Load reviews and comments
  useEffect(() => {
    setReviews(item.reviews || []);
    setComments(item.comments || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Live typing simulator for "alive" feeling on discussion
    const typingUsers = ['Elara Sterling', 'Jonah Vance', 'Yuki Tanaka', 'Cynthia Rose'];
    const interval = setInterval(() => {
      const user = typingUsers[Math.floor(Math.random() * typingUsers.length)];
      setLiveTypingUser(user);
      
      // Clear typing after 3 seconds, and optionally inject a random dynamic simulated comment!
      setTimeout(() => {
        setLiveTypingUser(null);
        
        // Randomly inject simulated fan reactions to make it active
        if (Math.random() > 0.6) {
          const simulatedComments = [
            `The pacing here is unreal. Watched it 3 times now.`,
            `The cinematography is unmatched. Look at that color grading!`,
            `Can we talk about the soundtrack? It gives me absolute chills.`,
            `Do you think a sequel is coming soon? We need answers!`
          ];
          const text = simulatedComments[Math.floor(Math.random() * simulatedComments.length)];
          const newSimulated: Comment = {
            id: `sim-${Date.now()}`,
            userId: `usr-sim-${Date.now()}`,
            userName: user,
            userAvatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?q=80&w=150&auto=format&fit=crop`,
            text: text,
            date: 'Just now',
            likes: 1,
          };
          setComments(prev => [newSimulated, ...prev]);
        }
      }, 3000);

    }, 12000);

    return () => clearInterval(interval);
  }, [item]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      userId: 'usr-current',
      userName: 'Adrian Vance',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      text: userComment.trim(),
      date: 'Just now',
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setUserComment('');
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          likes: c.hasLiked ? c.likes - 1 : c.likes + 1,
          hasLiked: !c.hasLiked
        };
      }
      return c;
    }));
  };

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewInput.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: reviewerName || 'Anonymous Critic',
      text: reviewInput.trim(),
      rating: ratingInput,
      date: 'Today',
      source: 'CineLux',
    };

    setReviews([newReview, ...reviews]);
    setReviewInput('');
  };

  // Generate Gemini-powered smart critic review
  const handleGenerateAIReview = async () => {
    setIsGeneratingAIReview(true);
    try {
      const response = await fetch('/api/gemini/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          genres: item.genres,
          director: item.director,
          year: item.year,
          overview: item.overview,
        }),
      });

      if (!response.ok) {
        throw new Error('AI Review API failed');
      }

      const data = await response.json();
      
      const aiReview: Review = {
        id: `rev-ai-${Date.now()}`,
        author: 'Gemini CineCortex',
        text: data.review || 'An exceptional cinematic feat that redefines narrative logic.',
        rating: data.rating || 9.5,
        date: 'Generated just now',
        source: 'AI Reviewer',
      };

      setReviews([aiReview, ...reviews]);
    } catch (err) {
      console.error('AI Review Error:', err);
      // Fallback AI Review
      const fallbackReview: Review = {
        id: `rev-ai-${Date.now()}`,
        author: 'Gemini CineCortex',
        text: `"${item.title}" is a tour de force of visual pacing and structural density under ${item.director}'s guidance. The film is a masterclass in modern storytelling, weaving high emotional resonance with deep genre philosophies. Unmissable.`,
        rating: 9.3,
        date: 'Generated just now',
        source: 'AI Reviewer',
      };
      setReviews([fallbackReview, ...reviews]);
    } finally {
      setIsGeneratingAIReview(false);
    }
  };

  // Get recommendations (similar movies in same genre/type)
  const recommendations = allContent
    .filter(c => c.id !== item.id && c.genres.some(g => item.genres.includes(g)))
    .slice(0, 4);

  const currentSeasonData = item.seasons?.find(s => s.seasonNumber === selectedSeason);

  // Stats generation helper with highly precise fallbacks
  const getRatingStats = () => {
    const rawRating = item.rating || 8.5;
    return {
      imdb: rawRating.toFixed(1),
      rottenTomatoes: `${Math.round(rawRating * 11.2)}%`,
      metacritic: Math.round(rawRating * 10.8),
      audienceScore: `${Math.round(rawRating * 11.0)}%`,
      popularityIndex: `#${Math.floor(rawRating * 12.5)} Today`,
    };
  };

  const stats = getRatingStats();

  return (
    <div id="movie-details-view" className="min-h-screen bg-[#0B1220] text-white pb-20 select-none">
      
      {/* Huge Back Button Floating */}
      <button
        onClick={onClose}
        className="fixed top-24 left-4 md:left-8 z-40 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/30 text-white hover:text-[#22C55E] transition-all shadow-xl hover:scale-105 cursor-pointer"
        title="Back to Catalog"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Hero Cinematic Widescreen Banner */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
        <img
          src={item.backdrop}
          alt={item.title}
          className="w-full h-full object-cover filter brightness-[0.4] blur-[0.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/30 to-transparent" />
        <div className="absolute bottom-6 md:bottom-10 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-end gap-6 md:gap-10">
            {/* Poster thumbnail */}
            <div className="w-32 md:w-48 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hidden sm:block transform hover:scale-102 transition-transform">
              <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
            </div>

            {/* Title & Actions Row */}
            <div className="flex-1 text-left">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] md:text-xs text-gray-300 font-semibold tracking-wider uppercase">
                {item.type === 'movie' ? 'Feature Film' : 'Original TV Series'}
              </span>

              <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mt-3 mb-4 leading-tight text-white">
                {item.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-300 mb-6">
                <span className="px-1.5 py-0.5 rounded border border-white/20 text-[10px]">{item.ageRating}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span>{item.type === 'movie' ? `${item.runtime} minutes` : `${item.seasons?.length} Seasons`}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="text-amber-400 font-bold flex items-center gap-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  {item.rating > 0 ? `${item.rating.toFixed(1)} IMDb` : 'Coming Soon'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="text-gray-400">{item.quality}</span>
              </div>

              {/* Instant Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {item.type === 'movie' ? (
                  <button
                    onClick={() => onPlay(item)}
                    className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-bold tracking-wide shadow-lg shadow-[#22C55E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-white stroke-none" />
                    Watch Now
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (currentSeasonData && currentSeasonData.episodes.length > 0) {
                        onPlay(item, currentSeasonData.episodes[0]);
                      }
                    }}
                    className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-bold tracking-wide shadow-lg shadow-[#22C55E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-white stroke-none" />
                    Play Season 1 Episode 1
                  </button>
                )}

                <button
                  onClick={() => onToggleWatchlist(item.id)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isInWatchlist
                      ? 'bg-[#16C784]/15 border-[#16C784]/30 text-[#16C784]'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                >
                  {isInWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => onToggleFavorite(item.id)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isInFavorites
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  title={isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
                >
                  <Heart className={`w-5 h-5 ${isInFavorites ? 'fill-amber-400 stroke-none' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-14 text-left animate-fade-in">
        
        {/* Left Column: Synopsis, Cast, TV Episodes, Live Discussion Tabs */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          
          {/* Synopsis Plot */}
          <div>
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2.5 mb-4">
              Storyline Description
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-normal">
              {item.overview}
            </p>
          </div>

          {/* HIGH-FIDELITY DETAILED MOVIE STATS & RATINGS CARD (IMDb, Rotten Tomatoes, Metacritic, TMDb, etc.) */}
          <div className="p-6 rounded-3xl bg-[#111] border border-white/5 shadow-2xl text-left flex flex-col gap-5">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-white/5 pb-3">
              <Activity className="w-4 h-4 text-amber-400" />
              Dynamic Industry Ratings & Core Metrics
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center">
              {/* IMDb Block */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">IMDb rating</span>
                <span className="text-lg font-black text-white">{stats.imdb}</span>
                <span className="text-[9px] text-amber-500 font-black block mt-1">/10 Stars</span>
              </div>

              {/* Rotten Tomatoes Block */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Tomatometer</span>
                <span className="text-lg font-black text-red-500">{stats.rottenTomatoes}</span>
                <span className="text-[9px] text-emerald-500 font-black block mt-1">Certified Fresh</span>
              </div>

              {/* Metacritic Block */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Metascore</span>
                <span className="text-lg font-black text-amber-400">{stats.metacritic}</span>
                <span className="text-[9px] text-gray-400 font-semibold block mt-1">Critic Consensus</span>
              </div>

              {/* Audience Score Block */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Audience</span>
                <span className="text-lg font-black text-blue-400">{stats.audienceScore}</span>
                <span className="text-[9px] text-gray-400 font-semibold block mt-1">User Approval</span>
              </div>

              {/* TMDb Popularity Block */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">TMDb Pacing</span>
                <span className="text-xs font-bold text-emerald-400 truncate block mt-1.5 uppercase tracking-wide">
                  {stats.popularityIndex}
                </span>
                <span className="text-[9px] text-gray-500 font-semibold block mt-1">Velocity Index</span>
              </div>
            </div>

            {/* Financial & Scale statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 pt-4 border-t border-white/5 text-xs font-semibold">
              <div>
                <p className="text-gray-500 uppercase text-[9px] tracking-wider">Cinematic Budget</p>
                <p className="text-white mt-1 font-bold flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                  {item.budget || '$165,000,000'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-[9px] tracking-wider">Box Office Revenue</p>
                <p className="text-white mt-1 font-bold flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                  {item.revenue || '$745,000,000'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-[9px] tracking-wider">Age Guild Guideline</p>
                <p className="text-white mt-1 font-bold">{item.ageRating} Classification</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-[9px] tracking-wider">Accolades count</p>
                <p className="text-amber-400 mt-1 font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  {item.awards?.length || 4} Award Nominations
                </p>
              </div>
            </div>
          </div>

          {/* TV SERIES Season & Episode Navigator */}
          {item.type === 'series' && item.seasons && (
            <div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-6">
                <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <TVIcon className="w-4 h-4 text-[#22C55E]" /> Series Episodes List
                </h2>

                {/* Season Dropdown */}
                <div className="relative">
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(parseInt(e.target.value))}
                    className="appearance-none bg-[#181818] border border-white/10 rounded-xl px-4 py-2 text-xs font-semibold text-white outline-none cursor-pointer pr-10 focus:border-[#22C55E] transition-all"
                  >
                    {item.seasons.map((s) => (
                      <option key={s.seasonNumber} value={s.seasonNumber}>
                        Season {s.seasonNumber}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Episodes Grid List */}
              <div className="flex flex-col gap-4">
                {currentSeasonData?.episodes.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => onPlay(item, ep)}
                    className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-2xl bg-[#111111] hover:bg-[#181818] border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                  >
                    <div className="relative w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-[#181818] shrink-0">
                      <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-[#22C55E] text-white flex items-center justify-center shadow-lg">
                          <Play className="w-4.5 h-4.5 fill-white stroke-none ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-mono text-gray-300">
                        {ep.runtime}m
                      </span>
                    </div>

                    <div className="flex-1 text-left min-w-0">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-0.5">
                        Episode {ep.episodeNumber}
                      </span>
                      <h3 className="text-sm font-bold text-white group-hover:text-[#22C55E] transition-colors truncate">
                        {ep.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {ep.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cast Crew Members */}
          <div>
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2.5 mb-6">
              Main Cast & Starring Artists
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {item.cast.map((c, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-[#111111] border border-white/5 hover:border-white/10 transition-colors">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-11 h-11 rounded-full object-cover border border-white/10"
                  />
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-bold text-white truncate">{c.name}</p>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{c.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC TABBED LIVE DISCUSSION HUB */}
          <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 shadow-2xl text-left flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-[#22C55E] font-bold uppercase tracking-widest flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" /> Live Discussion Hub
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">CineLux Fan Conversation Board</h3>
              </div>

              {/* Chat Simulator / News indicator */}
              {liveTypingUser && (
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold animate-pulse">
                  ✍️ {liveTypingUser} is typing...
                </span>
              )}
            </div>

            {/* Premium Tab Bar for Live Discussion Sections */}
            <div className="flex flex-wrap gap-1 p-1 bg-black rounded-xl border border-white/5 max-w-full overflow-x-auto">
              {[
                { id: 'chat', label: 'Live Board', icon: <MessageSquare className="w-3.5 h-3.5" /> },
                { id: 'reviews', label: 'Critic Reviews', icon: <Star className="w-3.5 h-3.5" /> },
                { id: 'reactions', label: 'Fan Reactions', icon: <Users className="w-3.5 h-3.5" /> },
                { id: 'news', label: 'Movie News', icon: <Newspaper className="w-3.5 h-3.5" /> },
                { id: 'media', label: 'Media Hub', icon: <Image className="w-3.5 h-3.5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDiscussionTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeDiscussionTab === tab.id
                      ? 'bg-[#22C55E] text-white shadow shadow-[#22C55E]/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Viewports according to active discussion tab */}
            <div className="min-h-[250px]">
              <AnimatePresence mode="wait">
                
                {/* TAB 1: LIVE CHAT BOARD */}
                {activeDiscussionTab === 'chat' && (
                  <motion.div
                    key="chat-board"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5"
                  >
                    {/* Send Message Form */}
                    <form onSubmit={handlePostComment} className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Type standard opinion or question in local chat node..."
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        className="flex-1 bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 outline-none focus:border-[#22C55E] transition-all"
                      />
                      <button
                        type="submit"
                        className="p-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white transition-colors cursor-pointer"
                      >
                        <Send className="w-4.5 h-4.5" />
                      </button>
                    </form>

                    {/* Chat Feed */}
                    <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-1">
                      {comments.length === 0 ? (
                        <div className="py-12 text-center text-xs text-gray-500">
                          Decryption channel empty. Enter a line to spin up localized discussion!
                        </div>
                      ) : (
                        comments.map((comm) => (
                          <div key={comm.id} className="flex gap-3 text-left border-b border-white/[0.02] pb-3 last:border-none">
                            <img
                              src={comm.userAvatar}
                              alt={comm.userName}
                              className="w-9 h-9 rounded-full object-cover border border-white/5 shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-white">{comm.userName}</span>
                                <span className="text-[10px] text-gray-500">{comm.date}</span>
                              </div>
                              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                                {comm.text}
                              </p>
                              <div className="flex items-center gap-1.5 mt-2">
                                <button
                                  onClick={() => handleLikeComment(comm.id)}
                                  className={`flex items-center gap-1 text-[10px] font-semibold transition-colors ${
                                    comm.hasLiked ? 'text-[#22C55E]' : 'text-gray-500 hover:text-white'
                                  }`}
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                  <span>{comm.likes}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: CRITIC REVIEWS & RATINGS */}
                {activeDiscussionTab === 'reviews' && (
                  <motion.div
                    key="reviews-board"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                      <div className="text-left">
                        <h4 className="text-xs font-black uppercase tracking-widest text-amber-400">Gemini Review Engine</h4>
                        <p className="text-[10px] text-gray-500 mt-1">Generate a highly polished cinematic critique immediately.</p>
                      </div>
                      <button
                        onClick={handleGenerateAIReview}
                        disabled={isGeneratingAIReview}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 text-xs text-amber-400 font-bold hover:from-amber-500/20 hover:to-amber-600/20 active:scale-95 transition-all shadow-md disabled:opacity-50 cursor-pointer"
                      >
                        <Sparkles className={`w-4 h-4 ${isGeneratingAIReview ? 'animate-spin' : 'animate-pulse'}`} />
                        {isGeneratingAIReview ? 'Synthesizing...' : 'Generate AI Review'}
                      </button>
                    </div>

                    {/* List */}
                    <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="p-4 rounded-2xl bg-[#111] border border-white/5 text-left flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{rev.author}</span>
                              <span className="text-[10px] text-gray-500">• {rev.source}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-bold">
                              {rev.rating}/10 Stars
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line font-normal">{rev.text}</p>
                          <span className="text-[9px] text-gray-500 text-right">{rev.date}</span>
                        </div>
                      ))}
                    </div>

                    {/* Write Critic Review form */}
                    <form onSubmit={handlePostReview} className="p-4 rounded-2xl bg-black/30 border border-white/5 flex flex-col gap-3">
                      <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Post a Critic Review</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Your Name / Organization"
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          className="bg-[#111] border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-[#22C55E]"
                        />
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-400">Rating:</span>
                          <select
                            value={ratingInput}
                            onChange={(e) => setRatingInput(parseInt(e.target.value))}
                            className="bg-[#111] border border-white/5 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                          >
                            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
                              <option key={n} value={n}>{n}/10 Stars</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <textarea
                        placeholder="Write your detailed critique of the film/show..."
                        rows={3}
                        value={reviewInput}
                        onChange={(e) => setReviewInput(e.target.value)}
                        className="bg-[#111] border border-white/5 rounded-xl p-3.5 text-xs text-white placeholder-gray-500 outline-none focus:border-[#22C55E] resize-none"
                        required
                      />
                      <button type="submit" className="self-end px-5 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-200 cursor-pointer">
                        Post Review
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* TAB 3: FAN REACTIONS & SOCIAL OPINIONS */}
                {activeDiscussionTab === 'reactions' && (
                  <motion.div
                    key="reactions-board"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <p className="text-xs text-gray-500 italic mb-2">Simulated Live Twitter & Letterboxd sentiments regarding "{item.title}"</p>
                    
                    {FAN_REACTIONS_MOCK.map((react) => (
                      <div key={react.id} className="p-4 rounded-2xl bg-black/40 border border-white/5 text-left flex gap-3.5 items-start">
                        <img src={react.avatar} className="w-9 h-9 rounded-full object-cover border border-white/10 shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div className="text-xs">
                              <span className="font-bold text-white block sm:inline">{react.user}</span>
                              <span className="text-gray-500 sm:ml-1.5">{react.handle}</span>
                            </div>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 font-bold">
                              {react.source}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed font-normal mt-2">"{react.text}"</p>
                          <div className="flex justify-between items-center mt-2.5">
                            <span className="text-[9px] text-gray-500">{react.time}</span>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500">
                              <ThumbsUp className="w-3 h-3" />
                              <span>{react.likes} Likes</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* TAB 4: MOVIE NEWS & RECENT UPDATES */}
                {activeDiscussionTab === 'news' && (
                  <motion.div
                    key="news-board"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <p className="text-xs text-gray-500 italic mb-2">Aggregate production alerts and casting bulletins for "{item.title}"</p>

                    {MOVIE_NEWS_MOCK.map((news, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#111] border border-white/5 text-left flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-white leading-tight hover:text-[#22C55E] transition-colors cursor-pointer flex-1 mr-4">
                            {news.title}
                          </h4>
                          <span className="text-[9px] text-amber-500 font-bold uppercase tracking-wider shrink-0 mt-0.5">{news.time}</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed font-normal">{news.snippet}</p>
                        <div className="text-[10px] text-gray-500 font-semibold">{news.source}</div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* TAB 5: MEDIA GALLERY & UPCOMING EVENTS */}
                {activeDiscussionTab === 'media' && (
                  <motion.div
                    key="media-board"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Immersive High-Definition Screenshots</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {SCREENSHOTS_MOCK.map((shot, idx) => (
                          <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer border border-white/5">
                            <img src={shot.url} alt={shot.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-102 transition-all duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2.5">
                              <span className="text-[10px] font-bold text-gray-300 truncate">{shot.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#22C55E]/5 to-transparent border border-[#22C55E]/10 text-left">
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#22C55E] flex items-center gap-1.5 mb-1">
                        <TVIcon className="w-4 h-4" />
                        Upcoming Event: Live Co-Watch Party
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed font-normal">
                        Join 24,000+ film enthusiasts for an immersive live synchronization of "{item.title}" with live text-room commentary.
                      </p>
                      <div className="flex gap-4 items-center mt-3 text-[10px] text-gray-400 font-bold">
                        <span>Date: Friday, Oct 12</span>
                        <span>•</span>
                        <span>Time: 8:00 PM EST</span>
                        <button className="px-3 py-1 rounded bg-[#22C55E] text-white text-[9px] font-black uppercase tracking-widest ml-auto active:scale-95 transition-all">
                          RSVP Active
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Right Column: Key Details, Where to Watch, Recommendations */}
        <div className="flex flex-col gap-10">
          
          {/* Metadata Block */}
          <div className="p-6 rounded-2xl bg-[#111111] border border-[#181818] shadow-lg flex flex-col gap-5">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2.5">
              Production Information
            </h3>

            <div className="flex flex-col gap-4 text-xs font-semibold">
              <div>
                <p className="text-gray-500 uppercase text-[9px] tracking-wider">Director</p>
                <p className="text-white mt-1 font-bold">{item.director}</p>
              </div>

              <div>
                <p className="text-gray-500 uppercase text-[9px] tracking-wider">Producer</p>
                <p className="text-white mt-1">{item.producer}</p>
              </div>

              <div>
                <p className="text-gray-500 uppercase text-[9px] tracking-wider">Writers</p>
                <p className="text-white mt-1 leading-relaxed">{item.writers.join(', ')}</p>
              </div>

              <div>
                <p className="text-gray-500 uppercase text-[9px] tracking-wider">Country of Origin</p>
                <p className="text-white mt-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-gray-500" /> {item.country}
                </p>
              </div>

              <div>
                <p className="text-gray-500 uppercase text-[9px] tracking-wider">Spoken Language</p>
                <p className="text-white mt-1 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-gray-500" /> {item.language}
                </p>
              </div>
            </div>
          </div>

          {/* Awards Accolades */}
          {item.awards && item.awards.length > 0 && (
            <div className="p-6 rounded-2xl bg-gradient-to-tr from-amber-500/5 to-transparent border border-amber-500/10 shadow-lg flex flex-col gap-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <Award className="w-4 h-4" /> Accolades & Awards
              </h3>
              <ul className="flex flex-col gap-3">
                {item.awards.map((aw, idx) => (
                  <li key={idx} className="flex gap-2 text-xs leading-relaxed text-gray-300">
                    <span className="text-amber-500 font-bold shrink-0">•</span>
                    <span>{aw}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Where to Watch */}
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/5 shadow-lg flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2.5">
              Available Quality Signals
            </h3>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Stream Source</span>
                <span className="font-bold text-white uppercase">{item.quality}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Audio Experience</span>
                <span className="font-bold text-white uppercase">{item.audioQuality}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Direct CDN Access</span>
                <span className="px-2 py-0.5 rounded bg-[#16C784]/15 text-[#16C784] font-bold text-[10px] tracking-wider uppercase">Active</span>
              </div>
            </div>
          </div>

          {/* Similar Recommendations */}
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2.5">
              Similar Recommendations
            </h3>
            <div className="flex flex-col gap-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => onViewItem(rec)}
                  className="flex gap-3 p-2 rounded-xl bg-[#111111] hover:bg-[#181818] border border-white/5 cursor-pointer transition-all group"
                >
                  <img
                    src={rec.poster}
                    alt={rec.title}
                    className="w-12 aspect-[2/3] object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1 min-w-0 text-left flex flex-col justify-center">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-[#22C55E] transition-colors">
                      {rec.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-1">
                      {rec.genres.slice(0, 2).join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center text-amber-400 text-xs font-bold gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                    <span>{rec.rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
