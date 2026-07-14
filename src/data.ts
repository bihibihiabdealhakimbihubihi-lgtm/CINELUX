/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ContentItem, UserProfile, Notification, CastMember, Review, Season, Episode } from './types';
import { COMPACT_MOVIES, CompactMovie } from './movies-data';

export const GENRES = [
  'All',
  'Action',
  'Adventure',
  'Sci-Fi',
  'Drama',
  'Fantasy',
  'Thriller',
  'Mystery',
  'Crime',
  'Documentary',
  'Anime',
  'Romance',
  'Horror',
  'Family',
  'Comedy',
];

export const COUNTRIES = ['All', 'United States', 'United Kingdom', 'Japan', 'France', 'India', 'Canada', 'Germany'];
export const LANGUAGES = ['English', 'Español', 'Français', '日本語', '한국어', 'Deutsch'];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Season 2 Premiere',
    message: 'The acclaimed sci-fi series "Tom Clancy\'s Jack Ryan" is now streaming in 4K Dolby Vision.',
    date: '2 hours ago',
    read: false,
    type: 'release',
  },
  {
    id: 'n2',
    title: 'Subscription Renewed',
    message: 'Your Premium 4K plan has been successfully renewed. Thank you for streaming with CineLux.',
    date: '1 day ago',
    read: true,
    type: 'billing',
  },
  {
    id: 'n3',
    title: 'Recommended For You',
    message: 'Based on your watch history, you might love "The Mandalorian & Grogu".',
    date: '3 days ago',
    read: true,
    type: 'info',
  },
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-991',
  name: 'Adrian Vance',
  email: 'bihiabde503@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  subscription: 'Premium 4K',
  subscriptionExpiry: 'August 18, 2026',
  language: 'English',
  watchlist: [],
  favorites: [],
  history: [],
  devices: [
    { id: 'dev-1', name: 'Sony Bravia 75" XR', type: 'Smart TV', lastActive: 'Active now', location: 'Living Room' },
    { id: 'dev-2', name: 'MacBook Pro 16"', type: 'Macbook Pro', lastActive: '2 hours ago', location: 'London, UK' },
    { id: 'dev-3', name: 'iPhone 15 Pro Max', type: 'Mobile', lastActive: 'Yesterday', location: 'Mobile Network' },
  ],
  notificationsEnabled: true,
  theme: 'dark',
};

// Generates cast details dynamically with high-quality stock portrait avatars
function getCastMembers(castNames: string[]): CastMember[] {
  const avatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
  ];
  return castNames.map((name, idx) => ({
    name,
    character: idx === 0 ? 'Lead Character' : 'Supporting Role',
    image: avatars[idx % avatars.length],
  }));
}

// Generates high quality sample reviews based on genres
function getReviews(title: string, genres: string[]): Review[] {
  if (genres.includes('Horror')) {
    return [
      { id: 'rev-a', author: 'The Hollywood Reporter', text: `"${title}" delivers a bone-chilling, masterfully atmospheric study of pure terror. One of the best of its kind.`, rating: 8.5, date: 'Jan 15, 2026', source: 'IMDb' },
      { id: 'rev-b', author: 'Variety', text: 'Stunning cinematography meets a relentless sound design that will stay with you long after the credits roll.', rating: 8.0, date: 'Feb 10, 2026', source: 'CineLux' }
    ];
  }
  if (genres.includes('Sci-Fi')) {
    return [
      { id: 'rev-c', author: 'IGN', text: `An absolute triumph of science fiction worldbuilding. "${title}" visualizes the future with unparalleled depth and heart.`, rating: 9.2, date: 'Mar 1, 2026', source: 'Metacritic' },
      { id: 'rev-d', author: 'Empire', text: 'Visually outstanding and narratively ambitious. Christopher Nolan or Denis Villeneuve fans will be enthralled.', rating: 8.8, date: 'Mar 15, 2026', source: 'Rotten Tomatoes' }
    ];
  }
  return [
    { id: 'rev-e', author: 'CineLux Critic', text: `An exceptionally polished, engaging, and heartfelt cinematic achievement. "${title}" completely deserves its massive popularity.`, rating: 9.0, date: 'Apr 20, 2026', source: 'CineLux' }
  ];
}

// Generates TV Series seasons and playable episodes dynamically
function getSeriesSeasons(id: string, title: string, count: number): Season[] {
  const seasons: Season[] = [];
  const trailers = [
    'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  ];
  const thumbs = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=400&auto=format&fit=crop',
  ];

  for (let s = 1; s <= count; s++) {
    const episodes: Episode[] = [];
    const epCount = s === 1 ? 4 : 2; // 4 episodes for first season, 2 for others
    for (let e = 1; e <= epCount; e++) {
      episodes.push({
        id: `${id}-s${s}-e${e}`,
        episodeNumber: e,
        title: s === 1 && e === 1 ? 'Pilot - The Beginning' : `Chapter ${e}: Overlapping Circles`,
        description: `In this gripping installment, secrets are uncovered as our main characters face a sudden and intense challenge that threatens their survival.`,
        thumbnail: thumbs[(s + e) % thumbs.length],
        runtime: 45 + Math.floor(Math.random() * 20),
        videoUrl: trailers[(s + e) % trailers.length],
      });
    }
    seasons.push({
      seasonNumber: s,
      episodes,
    });
  }
  return seasons;
}

// Remove duplicates automatically by title
const uniqueMoviesMap = new Map<string, typeof COMPACT_MOVIES[0]>();
COMPACT_MOVIES.forEach((m) => {
  const key = m.title.toLowerCase().trim();
  if (!uniqueMoviesMap.has(key)) {
    uniqueMoviesMap.set(key, m);
  }
});
const DEDUPLICATED_COMPACT_MOVIES = Array.from(uniqueMoviesMap.values());

// Map the deduplicated compact movies to fully structured ContentItem models
export const MOCK_CONTENT: ContentItem[] = DEDUPLICATED_COMPACT_MOVIES.map((m) => {
  const isSeries = m.type === 'series';
  const ageRatingVal = m.genres.includes('Horror') || m.genres.includes('Thriller') ? 'R' : m.genres.includes('Family') || m.genres.includes('Adventure') ? 'PG' : 'PG-13';
  const countryVal = m.genres.includes('Anime') ? 'Japan' : m.genres.includes('Romance') && m.id === 'mov-54' ? 'France' : 'United States';
  const langVal = m.genres.includes('Anime') ? '日本語' : m.genres.includes('Romance') && m.id === 'mov-54' ? 'Français' : 'English';
  const origLangVal = m.genres.includes('Anime') ? 'ja' : m.genres.includes('Romance') && m.id === 'mov-54' ? 'fr' : 'en';

  return {
    id: m.id,
    tmdbId: m.tmdbId,
    title: m.title,
    originalTitle: m.originalTitle || m.title,
    type: m.type || 'movie',
    description: m.overview,
    overview: m.overview,
    poster: m.poster,
    backdrop: m.backdrop,
    rating: m.rating,
    voteAverage: m.rating,
    voteCount: 1520 + Math.floor(m.rating * 230),
    popularity: 75.5 + m.rating * 12,
    year: m.year,
    runtime: m.runtime,
    genres: m.genres,
    quality: (typeof m.year === 'number' ? m.year >= 2024 : true) ? '4K Ultra HD' : 'HDR10+',
    audioQuality: 'Dolby Atmos',
    country: countryVal,
    language: langVal,
    originalLanguage: origLangVal,
    adult: false,
    status: (typeof m.year === 'number' ? m.year >= 2026 : true) ? 'In Production' : 'Released',
    ageRating: ageRatingVal,
    director: m.director,
    producer: `${m.director} Productions`,
    writers: [m.director],
    cast: getCastMembers(m.cast),
    productionCountries: [countryVal],
    productionCompanies: [`${m.director} Film Group`, 'Warner Bros. Pictures'],
    homepage: 'https://www.themoviedb.org',
    releaseDate: m.releaseDate,
    isTrending: m.isTrending || false,
    isPopular: m.isPopular || false,
    isComingSoon: m.isComingSoon || false,
    isEditorPick: m.isEditorPick || m.rating >= 8.8,
    isFeatured: m.isFeatured || false,
    reviews: getReviews(m.title, m.genres),
    comments: [],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    ...(isSeries ? { seasons: getSeriesSeasons(m.id, m.title, m.seasonsCount || 1) } : {}),
  };
});

// Self-healing function to clear stale mock data and initialize a completely clean empty state
if (typeof window !== 'undefined') {
  if (!localStorage.getItem('cinelux_empty_state_initialized_v4')) {
    console.log('[CineLux] Initializing clean slate for custom movie additions v4.');
    localStorage.removeItem('cinelux_custom_content');
    localStorage.removeItem('cinelux_current_user');
    localStorage.setItem('cinelux_empty_state_initialized_v4', 'true');
  }
}

export const MOCK_TRENDING_SEARCHES = [
  'The Mandalorian & Grogu',
  'John Krasinski',
  'Interstellar',
  'Zootopia 2',
  'Avatar Fire and Ash',
  'Moana 2026',
];

export const MOCK_HERO_MOVIE = MOCK_CONTENT[0]; // The Mandalorian & Grogu as default hero!
export const MOCK_USER = INITIAL_USER;
