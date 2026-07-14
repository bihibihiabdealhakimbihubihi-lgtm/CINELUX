/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ContentType = 'movie' | 'series';

export interface CastMember {
  name: string;
  character: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  rating: number;
  date: string;
  source: 'CineLux' | 'IMDb' | 'Rotten Tomatoes' | 'Metacritic' | 'AI Reviewer';
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  date: string;
  likes: number;
  hasLiked?: boolean;
}

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  description: string;
  thumbnail: string;
  runtime: number;
  videoUrl: string;
}

export interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

export interface ContentItem {
  id: string;
  tmdbId?: number;
  title: string;
  originalTitle?: string;
  type: ContentType;
  description: string;
  overview: string;
  poster: string;
  backdrop: string;
  rating: number; // IMDb or composite rating
  voteAverage?: number;
  voteCount?: number;
  popularity?: number;
  year: number | string;
  runtime: number; // in minutes (for series, average per episode)
  genres: string[];
  quality: '4K Ultra HD' | 'HDR10+' | 'Dolby Vision' | '1080p';
  audioQuality: 'Dolby Atmos' | 'Dolby Digital 5.1' | 'Stereo';
  country: string;
  language: string;
  originalLanguage?: string;
  adult?: boolean;
  status?: string;
  ageRating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17' | 'TV-MA';
  director: string;
  producer: string;
  writers: string[];
  cast: CastMember[];
  productionCountries?: string[];
  productionCompanies?: string[];
  homepage?: string;
  budget?: string;
  revenue?: string;
  awards?: string[];
  reviews: Review[];
  comments: Comment[];
  videoUrl: string; // fallback if single movie
  seasons?: Season[]; // only for series
  isTrending?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  isEditorPick?: boolean;
  isComingSoon?: boolean;
  releaseDate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subscription: 'Free' | 'Premium 4K' | 'VIP Cinematic';
  subscriptionExpiry: string;
  language: string;
  watchlist: string[]; // item IDs
  favorites: string[]; // item IDs
  history: {
    itemId: string;
    progress: number; // percentage 0 - 100
    watchedAt: string;
    episodeId?: string; // for series
    seasonNumber?: number; // for series
  }[];
  devices: {
    id: string;
    name: string;
    type: 'Smart TV' | 'Mobile' | 'Macbook Pro' | 'Desktop';
    lastActive: string;
    location: string;
  }[];
  notificationsEnabled: boolean;
  theme: 'dark' | 'glass';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'release' | 'billing';
}
