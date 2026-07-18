/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  MOCK_CONTENT, 
  MOCK_HERO_MOVIE,
  MOCK_USER
} from './data';
import { ContentItem, UserProfile, Episode } from './types';
import { auth, getUserProfile, saveUserProfile } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Component Imports
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import SkeletonMovieCard from './components/SkeletonMovieCard';
import DetailsView from './components/DetailsView';
import SearchView from './components/SearchView';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import UserAccount from './components/UserAccount';
import VideoPlayer from './components/VideoPlayer';
import AIRecommender from './components/AIRecommender';
import InfoHub from './components/InfoHub';
import HeroSlider from './components/HeroSlider';
import MovieHorizontalSlider from './components/MovieHorizontalSlider';
import LatestReleasesCarousel from './components/LatestReleasesCarousel';
import CommunityReviews from './components/CommunityReviews';

import { motion, AnimatePresence } from 'motion/react';

import { 
  Bookmark, 
  Heart, 
  Trash2, 
  Sparkles, 
  Star,
  Film,
  Tv as TVIcon,
  Plus,
  Flame,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Zap,
  Cpu,
  Monitor,
  Smartphone,
  Award,
  Clapperboard,
  Users,
  Play,
  HelpCircle,
  Mail
} from 'lucide-react';

const MOVIES_POSTER_MAPPING: Record<string, string> = {
  "Obsession": "https://i.postimg.cc/fTXDPn7w/b-Rwnj8WEKBCvmfe-UNOuk-JPw-B43K.webp",
  "Toy Story 5": "https://i.postimg.cc/VL3P972F/sf-Qt-Vl-IHlj-To-Ow-Yjhe21KPGz-ZWK.webp",
  "Disclosure Day": "https://i.postimg.cc/yYKb7MqG/download.jpg",
  "Backrooms": "https://i.postimg.cc/ZqWffZ3y/rh-Gx6E3q-RNMgj3i5su2ouk-NHw-IQ.webp",
  "Scary Movie": "https://i.postimg.cc/3J3ns2mK/bq-OKJr-ZFR9Kpq-WE607dw6KOd-KCj.webp",
  "The Devil Wears Prada 2": "https://i.postimg.cc/gJvH500L/f-CAURTUx3Yfs-J8k9I0Uamj-SILi-R.webp",
  "The Furious": "https://i.postimg.cc/PJXYRz9n/z-P19YO60jw-Esf-Kd5Qf1Uv-A5u-Ju8.webp",
  "Citizen Vigilante": "https://i.postimg.cc/mgvMsGJL/6Lm-JD3Wohe0g4U62wgi7Ry-Jqf-E4.webp",
  "Vixen!": "https://i.postimg.cc/TYhW5wXn/9KMZWDA3x-Trlgr-Scqd-Mis-INQmsh.webp",
  "Your Heart Will Be Broken": "https://i.postimg.cc/zXLVXcnF/7w-IBf-Bl2gejt6x-Hx-NSK0re-VIm7E.webp",
  "Passenger": "https://i.postimg.cc/L4W873rn/2s-OEJzh-Pzj-Tk-ZSl-Pb-Gx-OJ7xg-Iy-S.webp",
  "Deep Water": "https://i.postimg.cc/XvnjFHyK/kjcu-S7xa-Ryq-Rj-Va-Vc-H4t0q-Hshu-X.webp",
  "Michael": "https://i.postimg.cc/MZnQvHw7/zm0KAb-Ojlt9e-R5y7v-Di-L2d-EOw-Ml.webp",
  "Project Hail Mary": "https://i.postimg.cc/QtHH942Z/yihd-Xom-Yb5k-Te-Sivt-Fnd-My5i-Dmf.webp",
  "The Shawshank Redemption": "https://i.postimg.cc/qv4qXvfV/9cq-Nxx0Gx-F0bfl-Zme-SMu-L5tn-Gzr.webp",
  "The Get Out": "https://i.postimg.cc/VNxMBczy/t-FXc-Ecc-SQMf3lfhf-XKSU9i-RBpa3.webp",
  "Get Out": "https://i.postimg.cc/VNxMBczy/t-FXc-Ecc-SQMf3lfhf-XKSU9i-RBpa3.webp",
  "Minions & Monsters": "https://i.postimg.cc/8cgNpZDv/nz7i42yh-LIJ4ve9JKg-M6Ntho-LHO.webp",
  "Mortal Kombat II": "https://i.postimg.cc/zXJYxbff/hw-Rd-DFIha-Emp-Rgoki805Yvyyj-Zf.webp",
  "Enola Holmes 3": "https://i.postimg.cc/Zn42s2JY/7k-RYHH9H9Pj-BFwz1Fprb-HB2AAj-I.webp",
  "Damage": "https://i.postimg.cc/HxChjRcj/alf3JOPP7EYP0i-O24gwe5Yf-Rnqo.webp",
  "The Super Mario Galaxy Movie": "https://i.postimg.cc/DZFx7GHY/e-JGWx219Zc-EMVQJh-Ag-Miqo8t-YY.webp",
  "Moana": "https://i.postimg.cc/90kPww8d/z-KVgiv5q-HCv-CLT4A2ym-Ji5Qe-XDH.webp",
  "A Flame in My Heart": "https://i.postimg.cc/LsVzBbQL/q-I2c-Tls7mso-XF4w-Iqju7klqi-Z6Y.webp",
  "Avatar Aang: The Last Airbender": "https://i.postimg.cc/t4QW0jL9/3sgn-Sf-NT27Bx5O5ukr7B26mh-EQq.webp",
  "The Sheep Detectives": "https://i.postimg.cc/qq6hYbwh/TEa-Sqm-I6TZQVim-ULYbing-DId-XT.webp",
  "Lee Cronin's The Mummy": "https://i.postimg.cc/vZshrfHM/1q308iixue-CU4p-Ft-SYug-NOevt-Nx.webp",
  "Avatar: Fire and Ash": "https://i.postimg.cc/L5Pkf6cq/aabw-WZWx6z1a-YP4PX2ADvb-DKktd.webp",
  "Night of the Living Dead": "https://i.postimg.cc/JzxNjF2K/5l0kl-Dtj2v4FMFOGGCEH23AQb30.webp",
  "The Odyssey": "https://i.postimg.cc/XN59sqP0/5rh-TDKUh-PYvpd-QIij-FIs5Vo-Ws-ON.webp",
  "Satluj": "https://i.postimg.cc/BvtKHnFg/cx-Fo7L82d-W3Vg8x0280BVPp-LNXf.webp",
  "Graphic Desires": "https://i.postimg.cc/4yv7s7CV/3Bj-Ld-TWRi-Hc1ISIZMFv-To-Omgh-OM.webp",
  "The Mandalorian and Grogu": "https://i.postimg.cc/bvGZdFcf/5Vi8d-Sau-Vw-H1HOsi-Zce-DMb-Rr1Ca.webp",
  "Spider-Man: Brand New Day": "https://i.postimg.cc/jdZ2crRr/yy-B2VJEW3an2x-Cdc-YCPQhn9QERR.webp",
  "Supergirl": "https://i.postimg.cc/76kqDBqs/c-FO65xb0xi-XKqk5Bmg-Haw-CXB1i0.webp",
  "Swapped": "https://i.postimg.cc/y6n74Xtv/t-Hhx-Wxge06go-XU6ZQH1hj7v-K8Hd.webp",
  "Little Brother": "https://i.postimg.cc/LszMyzj5/h-IJp-Xb7Xaje2meb-N9yls-S7bl-Qz-P.webp",
  "Hoppers": "https://i.postimg.cc/qM9Y9NJ2/xjt-WQ2CL1mpm-MNwu-U5He-S4Iuwuu.webp",
  "Demon Slayer: Kimetsu no Yaiba Infinity Castle": "https://i.postimg.cc/V6DpT4vB/f-WVSwgjp-T2D78VUh6X8UBd2ror-W.webp",
  "The Punisher: One Last Kill": "https://i.postimg.cc/6qFjJPXX/q-Qcl-Tg-LMDv-GBu-UBFGHRipxk-Ew-WR.webp",
  "Dolly": "https://i.postimg.cc/vZFq0ChN/s-TPUg3Xtdc-KRAS5Vwsi1GYPFh-NZ.webp",
  "Evil Dead Burn": "https://i.postimg.cc/B66M83Zs/ztad-Kz-IIR0ERYqp-Htea-PFtk7in-P.webp",
  "Toy Story 4": "https://i.postimg.cc/fW3Qpn7s/w9k-R8qbm-Q01Hwnv-K4alvn-Q2ca0L.webp",
  "In the Grey": "https://i.postimg.cc/Jz8wssfs/d-Qg-Ic-W6Th08k-MRf2HBo-YWo-FE6OD.webp",
  "Voicemails for Isabelle": "https://i.postimg.cc/FR88Nzy6/can-ZTWSx-ACSn-Aluir3d-Ct-Mx-Kp-A1.webp",
  "We Want Now": "https://i.postimg.cc/vZhKD3LF/m-Q95TSIl1Qq-NWCMQs1l-TRg-ZUWT8.webp",
  "Madness": "https://i.postimg.cc/J0j68q4n/g-V0J0Fqw2m-YMt-Qbzb0ruxv9MAe-Z.webp",
  "Like a Brother": "https://i.postimg.cc/3wWtN7xY/ti-AKYNJEp-Mn-S8L1n-Kq-EYC5yjm0C.webp",
  "Interstellar": "https://i.postimg.cc/gjyDQ2N4/y-Qv-Gr-Moipb-Rodd-T0ZR8t-Po-R7Nf-X.webp",
  "The Shadow's Edge": "https://i.postimg.cc/mggwpRMN/c-HKo3m8N1fwv-Ey2ZEr0x-Gmm-MODV.webp",
  "Toy Story": "https://i.postimg.cc/VL3P972F/sf-Qt-Vl-IHlj-To-Ow-Yjhe21KPGz-ZWK.webp",
  "Zootopia 2": "https://i.postimg.cc/tCXt7yrC/o-J7g2Cifqp-Stmo-YQya-LQg-EU32q-O.webp",
  "Zombies of the Third Reich": "https://i.postimg.cc/YCTWNwx4/hjrg-OWoruk9ea0t-Xa-N8l2gtmke-H.webp",
  "Poppea's Hot Nights": "https://i.postimg.cc/rshdD6mq/g1k-B4f7a-ZBJn-U2XZILZ8Tsy-DVVM.webp",
  "Tom Clancy's Jack Ryan: Ghost War": "https://i.postimg.cc/13Vg3jZS/8eh-Yx-Uh5MWE41Ae-E9gk-HE8DKzv-B.webp",
  "Summerween": "https://i.postimg.cc/PJFxtm3J/o-Csyamu5ixofd3yy-K9g-D7p-Gf-Ci-F.webp",
  "Kill Code": "https://i.postimg.cc/8zv5SfhS/7yy4c-Vr9ob-HOZC9lj3uct4Dw-DEn.webp",
  "Kraken": "https://i.postimg.cc/j2CxkDxL/xd-Z8k5s8DTw-Wy-PBMIcflr-YLgc-AK.webp",
  "Apex": "https://i.postimg.cc/43ZJRLfb/e-Tp7g-SPk-SF3Aw79m-Nx1Nk-BP1PZT.webp",
  "Beware the Boogeyman": "https://i.postimg.cc/KcVx8vcD/2Hm5IP9l-PW9Dfw-NSGkgh-CEMe-UBK.webp",
  "The Adolescent": "https://i.postimg.cc/Gpc154zn/v7y-CEz-F9BCF82lbp42X5ZLj-Iieo.webp",
  "War of the Worlds": "https://i.postimg.cc/PJ8GwYfv/yvir-UYrva23Iud-ARHn3m-MGVx-Wq-M.webp",
  "Inception": "https://i.postimg.cc/SNCR0zLR/xla-Y2zyz-Mfkhk0HSC5VUwzo-ZPU1.webp",
  "The Housemaid": "https://i.postimg.cc/DZSfxWfH/c-Ws-Bsc-Zzwu5brg9Yj-Nk-Gew-RUv-JX.webp",
  "Door II: Tokyo Diary": "https://i.postimg.cc/8PQkbz8Q/lsk-J34j4VKwb-Mwcv-FSQe-NYEdt8g.webp"
};

type ViewState = 'landing' | 'home' | 'movies' | 'series' | 'watchlist' | 'favorites' | 'details' | 'search' | 'account' | 'admin' | 'player' | 'ai-recommender';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('cinelux_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeView, setActiveView] = useState<ViewState>(() => {
    return localStorage.getItem('cinelux_current_user') ? 'home' : 'landing';
  });

  const [contentList, setContentList] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem('cinelux_custom_content');
    const rawList: ContentItem[] = saved ? JSON.parse(saved) : MOCK_CONTENT;
    
    // Ensure strict deduplication by Title, Poster, and Release Date on load
    const seen = new Set<string>();
    const deduplicated: ContentItem[] = [];
    for (const item of rawList) {
      const key = `${item.title.trim().toLowerCase()}|${item.poster.trim()}|${(item.releaseDate || '').trim().toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(item);
      }
    }

    // Map correct poster URLs to all movie content globally on load
    const mapped = deduplicated.map(item => {
      if (item.type === 'movie') {
        const mappedPoster = MOVIES_POSTER_MAPPING[item.title.trim()];
        if (mappedPoster) {
          return { ...item, poster: mappedPoster };
        }
      }
      return item;
    });

    return mapped;
  });

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    if (currentUser) return currentUser.watchlist || [];
    const savedGuest = localStorage.getItem('cinelux_guest_watchlist');
    if (savedGuest) {
      try {
        return JSON.parse(savedGuest);
      } catch (e) {}
    }
    return [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (currentUser) return currentUser.favorites || [];
    const savedGuest = localStorage.getItem('cinelux_guest_favorites');
    if (savedGuest) {
      try {
        return JSON.parse(savedGuest);
      } catch (e) {}
    }
    return [];
  });

  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auto transition simulated loading to show skeleton screens beautifully
  useEffect(() => {
    const contentHeavyViews: ViewState[] = ['home', 'movies', 'series', 'watchlist', 'favorites'];
    if (contentHeavyViews.includes(activeView) && currentUser) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [activeView, currentUser]);

  // Fetch and apply cached movie artwork mappings on mount
  useEffect(() => {
    async function loadArtworkCache() {
      try {
        const res = await fetch('/artwork/cache.json');
        if (res.ok) {
          const cache = await res.json();
          if (cache && cache.mappings) {
            setContentList(prevList => {
              const updated = prevList.map(item => {
                const titleKey = item.title.trim();
                const cached = cache.mappings[titleKey];
                if (cached) {
                  return {
                    ...item,
                    poster: cached.originalPoster || cached.poster || item.poster,
                    backdrop: cached.originalBackdrop || cached.backdrop || item.backdrop
                  };
                }
                return item;
              });

              // Also sync back to localStorage if saved
              const saved = localStorage.getItem('cinelux_custom_content');
              if (saved) {
                try {
                  const parsed = JSON.parse(saved);
                  const updatedSaved = parsed.map((item: any) => {
                    const cached = cache.mappings[item.title.trim()];
                    if (cached) {
                      return {
                        ...item,
                        poster: cached.originalPoster || cached.poster || item.poster,
                        backdrop: cached.originalBackdrop || cached.backdrop || item.backdrop
                      };
                    }
                    return item;
                  });
                  localStorage.setItem('cinelux_custom_content', JSON.stringify(updatedSaved));
                } catch (err) {
                  console.error('Failed to update localStorage with cached artwork:', err);
                }
              }

              return updated;
            });
          }
        }
      } catch (err) {
        console.error('Failed to load artwork cache:', err);
      }
    }
    loadArtworkCache();
  }, []);
  
  // Track the last non-details/non-player view to return to
  const [lastListView, setLastListView] = useState<ViewState>('home');

  // Memory of scroll positions per view
  const scrollPositions = useRef<Record<string, number>>({});

  // Reference for custom horizontal scroll slider
  const homeSliderRef = useRef<HTMLDivElement | null>(null);

  // Maintain active list view tracking
  useEffect(() => {
    const listViews = ['home', 'movies', 'series', 'watchlist', 'favorites', 'search', 'ai-recommender', 'admin', 'account'];
    if (listViews.includes(activeView)) {
      setLastListView(activeView);
    }
  }, [activeView]);

  // Handle document scrolling to update position memory
  useEffect(() => {
    const handleScroll = () => {
      const listViews = ['home', 'movies', 'series', 'watchlist', 'favorites', 'search', 'ai-recommender', 'admin', 'account'];
      if (listViews.includes(activeView)) {
        scrollPositions.current[activeView] = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  // Restore scroll positions instantly when navigating back to a list view
  useEffect(() => {
    const listViews = ['home', 'movies', 'series', 'watchlist', 'favorites', 'search', 'ai-recommender', 'admin', 'account'];
    if (listViews.includes(activeView)) {
      const savedPos = scrollPositions.current[activeView] || 0;
      
      const performScroll = () => {
        window.scrollTo({ top: savedPos, behavior: 'auto' });
      };

      // Perform immediately
      performScroll();

      // Ensure restoration takes place even if the component is in the middle of a reflow/render loop
      const rafId1 = requestAnimationFrame(performScroll);
      const rafId2 = requestAnimationFrame(() => requestAnimationFrame(performScroll));
      const timeoutId = setTimeout(performScroll, 30);
      const timeoutId2 = setTimeout(performScroll, 100);

      return () => {
        cancelAnimationFrame(rafId1);
        cancelAnimationFrame(rafId2);
        clearTimeout(timeoutId);
        clearTimeout(timeoutId2);
      };
    }
  }, [activeView]);

  const [activePlayItem, setActivePlayItem] = useState<ContentItem | null>(null);
  const [activePlayEpisode, setActivePlayEpisode] = useState<Episode | undefined>(undefined);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [infoHubOpen, setInfoHubOpen] = useState(false);
  const [infoHubSection, setInfoHubSection] = useState<any>('about');

  const handleOpenInfoHub = (section: any) => {
    setInfoHubSection(section);
    setInfoHubOpen(true);
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('cinelux_custom_content', JSON.stringify(contentList));
  }, [contentList]);

  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'info' | 'error' }>>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    if (currentUser) {
      const watchlistChanged = JSON.stringify(currentUser.watchlist || []) !== JSON.stringify(watchlist);
      const favoritesChanged = JSON.stringify(currentUser.favorites || []) !== JSON.stringify(favorites);
      
      if (watchlistChanged || favoritesChanged) {
        const updated = {
          ...currentUser,
          watchlist,
          favorites
        };
        setCurrentUser(updated);
        localStorage.setItem('cinelux_current_user', JSON.stringify(updated));
        saveUserProfile(currentUser.id, updated);
      }
    } else {
      localStorage.setItem('cinelux_guest_watchlist', JSON.stringify(watchlist));
      localStorage.setItem('cinelux_guest_favorites', JSON.stringify(favorites));
    }
  }, [watchlist, favorites, currentUser]);

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setWatchlist(user.watchlist || []);
    setFavorites(user.favorites || []);
    localStorage.setItem('cinelux_current_user', JSON.stringify(user));
    saveUserProfile(user.id, user);
    setActiveView('home');
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setCurrentUser(null);
      setWatchlist([]);
      setFavorites([]);
      setActiveView('landing');
      localStorage.removeItem('cinelux_current_user');
    }).catch((err) => {
      console.error("Error signing out:", err);
    });
  };

  // Automatically restore session and sync with Firebase Authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Try fetching user profile from Firestore first for the ultimate source of truth
        let profile = await getUserProfile(firebaseUser.uid) as UserProfile | null;

        if (!profile) {
          // Fallback to localStorage if Firestore hasn't synced yet, or create a default one
          const saved = localStorage.getItem('cinelux_current_user');
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              if (parsed && parsed.id === firebaseUser.uid) {
                profile = parsed;
              }
            } catch (e) {
              console.error("Error parsing saved profile:", e);
            }
          }
        }

        if (!profile) {
          profile = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Cinema Enthusiast',
            email: firebaseUser.email || '',
            avatar: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
            subscription: 'Premium 4K',
            subscriptionExpiry: 'August 18, 2026',
            language: 'English',
            watchlist: [],
            favorites: [],
            history: [],
            devices: [
              { id: 'dev-email', name: 'Macbook Pro 16"', type: 'Macbook Pro', lastActive: 'Active now', location: 'Primary Network' }
            ],
            notificationsEnabled: true,
            theme: 'dark',
          };
          saveUserProfile(firebaseUser.uid, profile);
        }

        setCurrentUser(profile);
        setWatchlist(profile.watchlist || []);
        setFavorites(profile.favorites || []);
        localStorage.setItem('cinelux_current_user', JSON.stringify(profile));
        
        // Prevent staying on landing page if logged in
        setActiveView(prev => prev === 'landing' ? 'home' : prev);
      } else {
        setCurrentUser(null);
        setWatchlist([]);
        setFavorites([]);
        localStorage.removeItem('cinelux_current_user');
        setActiveView('landing');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleToggleWatchlist = useCallback((itemId: string) => {
    const item = contentList.find(c => c.id === itemId);
    const title = item ? item.title : 'Title';
    
    setWatchlist(prev => {
      const exists = prev.includes(itemId);
      if (exists) {
        showToast(`"${title}" removed from My List`, 'info');
        return prev.filter(id => id !== itemId);
      } else {
        showToast(`"${title}" added to My List`, 'success');
        return [...prev, itemId];
      }
    });
  }, [contentList, showToast]);

  const handleToggleFavorite = useCallback((itemId: string) => {
    const item = contentList.find(c => c.id === itemId);
    const title = item ? item.title : 'Title';
    
    setFavorites(prev => {
      const exists = prev.includes(itemId);
      if (exists) {
        showToast(`"${title}" removed from Favorites`, 'info');
        return prev.filter(id => id !== itemId);
      } else {
        showToast(`"${title}" added to Favorites`, 'success');
        return [...prev, itemId];
      }
    });
  }, [contentList, showToast]);

  const handleProgressUpdate = useCallback((itemId: string, progressPercent: number, episodeId?: string, seasonNumber?: number) => {
    setCurrentUser(prevUser => {
      if (!prevUser) return null;
      
      const updatedHistory = [...prevUser.history];
      const index = updatedHistory.findIndex(h => h.itemId === itemId && h.episodeId === episodeId);
      
      if (index >= 0) {
        const currentProgress = updatedHistory[index].progress;
        // Skip updates if progress difference is less than 1.0% to avoid infinite render loops
        if (Math.abs(currentProgress - progressPercent) < 1.0) {
          return prevUser;
        }
        
        updatedHistory[index] = {
          itemId,
          progress: progressPercent,
          watchedAt: 'Just now',
          episodeId,
          seasonNumber
        };
      } else {
        updatedHistory.unshift({
          itemId,
          progress: progressPercent,
          watchedAt: 'Just now',
          episodeId,
          seasonNumber
        });
      }
      
      const updatedUser = {
        ...prevUser,
        history: updatedHistory.slice(0, 8)
      };
      
      localStorage.setItem('cinelux_current_user', JSON.stringify(updatedUser));
      saveUserProfile(updatedUser.id, updatedUser);
      return updatedUser;
    });
  }, []);

  // Add / Delete custom content from Admin Dashboard
  const handleAddContent = (newMovie: ContentItem) => {
    setContentList(prev => [newMovie, ...prev]);
  };

  const handleDeleteContent = (id: string) => {
    setContentList(prev => prev.filter(m => m.id !== id));
  };

  // View movie details
  const handleViewDetails = useCallback((item: ContentItem) => {
    setSelectedItem(item);
    setActiveView('details');
  }, []);

  // Play video
  const handlePlayContent = useCallback((item: ContentItem, episode?: Episode) => {
    setActivePlayItem(item);
    setActivePlayEpisode(episode);
    setActiveView('player');
  }, []);

  // Content groupings for sections
  const moviesList = contentList.filter(c => c.type === 'movie');
  const seriesList = contentList.filter(c => c.type === 'series');
  
  // Categorized Remaining Movies definition
  const CATEGORIES = [
    'Trending', 'Popular', 'Upcoming', 'Action', 'Adventure', 
    'Animation', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller'
  ];

  const [selectedCategory, setSelectedCategory] = useState('Trending');

  const getCategoryMovies = (category: string, list: ContentItem[]) => {
    switch (category) {
      case 'Trending':
        return list.filter(item => item.isTrending || item.rating >= 8.1);
      case 'Popular':
        return list.filter(item => item.isPopular || item.rating >= 7.5);
      case 'Upcoming':
        return list.filter(item => item.isComingSoon || (typeof item.year === 'number' ? item.year >= 2026 : true));
      case 'Action':
        return list.filter(item => item.genres.includes('Action'));
      case 'Adventure':
        return list.filter(item => item.genres.includes('Adventure'));
      case 'Animation':
        return list.filter(item => item.genres.includes('Animation'));
      case 'Comedy':
        return list.filter(item => item.genres.includes('Comedy'));
      case 'Drama':
        return list.filter(item => item.genres.includes('Drama'));
      case 'Horror':
        return list.filter(item => item.genres.includes('Horror'));
      case 'Sci-Fi':
        return list.filter(item => item.genres.includes('Sci-Fi'));
      case 'Thriller':
        return list.filter(item => item.genres.includes('Thriller'));
      default:
        return list;
    }
  };

  const trendingList = [...contentList]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const actionList = contentList.filter(c => 
    c.genres.includes('Action') || c.genres.includes('Sci-Fi') || c.genres.includes('Thriller')
  );

  const docsList = contentList.filter(c => 
    c.genres.includes('Documentary') || c.genres.includes('Biography') || c.genres.includes('History')
  );

  const featuredList = contentList.filter(item => item.isFeatured).slice(0, 10);
  const remainingMovies = contentList.filter(item => !featuredList.some(f => f.id === item.id));
  const homeRemainingMovies = remainingMovies.slice(0, Math.max(0, remainingMovies.length - 10));

  // Filter out any invalid items in history
  const activeHistory = currentUser ? currentUser.history.filter(h => contentList.some(c => c.id === h.itemId)) : [];

  return (
    <div id="cinelux-master-application" className="min-h-screen bg-[#0B1220] text-white flex flex-col justify-between">
      
      {/* GLOBAL GLASSMORPHIC HEADER */}
      <Header
        user={currentUser}
        activeTab={activeView === 'landing' ? 'home' : activeView}
        setActiveTab={(tab) => {
          if (tab === 'home' && !currentUser) {
            setActiveView('landing');
          } else {
            setActiveView(tab as any);
          }
        }}
        onOpenSearch={() => {
          if (!currentUser) {
            setAuthModalOpen(true);
          } else {
            setActiveView('search');
          }
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenProfile={() => setActiveView('account')}
        onOpenAdmin={() => setActiveView('admin')}
        isAdmin={currentUser?.email === 'bihiabde503@gmail.com'}
      />

      {/* RENDER ACTIVE ROUTE VIEW */}
      <main className="flex-1">
        
        {/* VIEW A: ANONYMOUS LANDING PAGE */}
        {activeView === 'landing' && (
          <LandingPage onGetStarted={() => setAuthModalOpen(true)} />
        )}

        {/* VIEW B: PRIMARY DASHBOARD */}
        {activeView === 'home' && currentUser && (
          <div className="pb-20 text-left bg-[#0B1220] overflow-x-hidden">
            {/* Edge-to-edge Hero Slider at the top */}
            <HeroSlider
              featuredItems={featuredList}
              onPlay={handlePlayContent}
              onViewDetails={handleViewDetails}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
            />

            {/* Main Page Containers holding all the rows, sections, and grids */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 space-y-16">
              
              {/* Continue Watching Section (Conditional) */}
              {activeHistory.length > 0 && (
                <div className="text-left animate-fade-in">
                  <h2 className="text-lg md:text-xl font-black font-sans tracking-tight mb-6 flex items-center gap-2 uppercase text-white/90">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Continue Watching
                  </h2>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin snap-x">
                    {activeHistory.map((hist) => {
                      const item = contentList.find(c => c.id === hist.itemId);
                      if (!item) return null;
                      return (
                        <div key={`${hist.itemId}-${hist.episodeId || 'movie'}`} className="shrink-0 snap-start">
                          <MovieCard
                            item={item}
                            watchlist={watchlist}
                            favorites={favorites}
                            onToggleWatchlist={handleToggleWatchlist}
                            onToggleFavorite={handleToggleFavorite}
                            onPlay={handlePlayContent}
                            onViewDetails={handleViewDetails}
                            progress={hist.progress}
                            className="w-[150px] sm:w-[190px] md:w-[220px]"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Movies Section */}
              <div id="movies-section-homepage" className="border-t border-white/5 pt-12 space-y-8 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-white font-sans">
                      <span className="text-lg md:text-xl shrink-0 select-none">🎬</span> Movies
                    </h2>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mt-1">
                      Stream award-winning films and critically acclaimed box office blockbusters
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-black bg-white/5 px-4 py-2 rounded-xl border border-white/10 select-none">
                    Total Movies: {moviesList.length} Films
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 sm:gap-y-8 gap-x-4 justify-items-center">
                  {isLoading ? (
                    Array.from({ length: 12 }).map((_, index) => (
                      <div key={`movies-section-skeleton-${index}`} className="w-full sm:max-w-[240px]">
                        <SkeletonMovieCard />
                      </div>
                    ))
                  ) : (
                    moviesList.map((item) => {
                      const mappedPoster = MOVIES_POSTER_MAPPING[item.title.trim()];
                      const itemWithPoster = mappedPoster ? { ...item, poster: mappedPoster } : item;
                      return (
                        <div key={item.id} className="w-full sm:max-w-[240px]">
                          <MovieCard
                            item={itemWithPoster}
                            watchlist={watchlist}
                            favorites={favorites}
                            onToggleWatchlist={handleToggleWatchlist}
                            onToggleFavorite={handleToggleFavorite}
                            onPlay={handlePlayContent}
                            onViewDetails={handleViewDetails}
                          />
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Movies CTA Button immediately below the carousel */}
                <div className="pt-4 flex justify-center">
                  <div className="relative group w-full max-w-xs sm:max-w-sm mx-4">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#16a34a] via-[#15803d] to-[#14532d] translate-y-[5px] shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:translate-y-[6px] group-hover:shadow-[0_15px_30px_rgba(34,197,94,0.3)]" />
                    <button
                      onClick={() => {
                        scrollPositions.current['movies'] = 0;
                        setActiveView('movies');
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 50);
                      }}
                      className="relative w-full px-8 py-4 md:py-5 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black uppercase tracking-widest text-xs md:text-sm transition-all duration-300 ease-out transform -translate-y-[1px] hover:-translate-y-[3px] active:translate-y-[4px] cursor-pointer flex items-center justify-center gap-3 overflow-hidden select-none"
                    >
                      <span className="text-sm md:text-base shrink-0 select-none">🎬</span>
                      <span>View All Movies</span>
                    </button>
                  </div>
                </div>
              </div>


              {/* Community Reviews Section */}
              <CommunityReviews />

              {/* Support Section */}
              <div className="border-t border-white/5 pt-12 pb-8">
                <div className="max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-3xl bg-[#111111]/30 border border-white/5 p-8 md:p-12 text-center shadow-2xl group hover:border-[#22C55E]/30 transition-all duration-500"
                  >
                    {/* Subtle brand glow behind the card */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#22C55E]/5 blur-[60px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                      {/* Support Icon */}
                      <div className="p-4 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse">
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
                          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-[#22C55E]/10 border border-white/10 hover:border-[#22C55E]/30 text-white hover:text-green-400 font-mono text-sm sm:text-base font-medium transition-all duration-300 active:scale-95 group/btn cursor-pointer"
                        >
                          <Mail className="w-4 h-4 text-[#22C55E] group-hover/btn:scale-110 transition-transform duration-300" />
                          <span>cinelux10@gmail.com</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW C: MOVIES LISTING */}
        {activeView === 'movies' && currentUser && (
          <div className="pt-20 pb-12 sm:pt-24 sm:pb-20 text-left max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2 font-sans flex items-center gap-2">
              <Film className="w-8 h-8 text-[#22C55E]" /> Feature Movies
            </h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-10 font-semibold">Explore box office masterclasses and cinematic blockbusters</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 sm:gap-y-8 gap-x-4 justify-items-center">
              {isLoading ? (
                Array.from({ length: 12 }).map((_, index) => (
                  <div key={`movies-skeleton-${index}`} className="w-full sm:max-w-[240px]">
                    <SkeletonMovieCard />
                  </div>
                ))
              ) : (
                moviesList.map((item) => {
                  const mappedPoster = MOVIES_POSTER_MAPPING[item.title.trim()];
                  const itemWithPoster = mappedPoster ? { ...item, poster: mappedPoster } : item;
                  return (
                    <div key={item.id} className="w-full sm:max-w-[240px]">
                      <MovieCard
                        item={itemWithPoster}
                        watchlist={watchlist}
                        favorites={favorites}
                        onToggleWatchlist={handleToggleWatchlist}
                        onToggleFavorite={handleToggleFavorite}
                        onPlay={handlePlayContent}
                        onViewDetails={handleViewDetails}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* VIEW D: SERIES LISTING */}
        {activeView === 'series' && currentUser && (
          <div className="pt-20 pb-12 sm:pt-24 sm:pb-20 text-left max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2 font-sans flex items-center gap-2">
              <TVIcon className="w-8 h-8 text-[#22C55E]" /> Original TV Series
            </h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-10 font-semibold">Binge-worthy premium drama seasons and epic chronicles</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 sm:gap-y-8 gap-x-4 justify-items-center">
              {isLoading ? (
                Array.from({ length: 12 }).map((_, index) => (
                  <div key={`series-skeleton-${index}`} className="w-full sm:max-w-[240px]">
                    <SkeletonMovieCard />
                  </div>
                ))
              ) : (
                seriesList.map((item) => (
                  <div key={item.id} className="w-full sm:max-w-[240px]">
                    <MovieCard
                      item={item}
                      watchlist={watchlist}
                      favorites={favorites}
                      onToggleWatchlist={handleToggleWatchlist}
                      onToggleFavorite={handleToggleFavorite}
                      onPlay={handlePlayContent}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* VIEW E: WATCHLIST HUB */}
        {activeView === 'watchlist' && (
          <div className="pt-20 pb-12 sm:pt-24 sm:pb-20 text-left max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold tracking-tight font-sans flex items-center gap-2">
                <Bookmark className="w-8 h-8 text-[#22C55E]" /> My Watchlist
              </h1>
              {watchlist.length > 0 && (
                <button
                  onClick={() => setWatchlist([])}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/5 hover:border-red-500/20 text-xs text-gray-400 hover:text-red-400 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Clear Watchlist
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-10 font-semibold">Your curated streaming queue</p>

            {watchlist.length === 0 ? (
              <div className="py-24 text-center border border-white/5 bg-[#111111]/40 rounded-3xl flex flex-col items-center gap-3">
                <Bookmark className="w-12 h-12 text-gray-600 stroke-[1.5]" />
                <p className="text-sm font-bold text-gray-400">Your watchlist is empty.</p>
                <p className="text-xs text-gray-500">Save movies and series to watch them later.</p>
                <button
                  onClick={() => setActiveView(currentUser ? 'home' : 'landing')}
                  className="mt-2 px-5 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 sm:gap-y-8 gap-x-4 justify-items-center">
                {isLoading ? (
                  Array.from({ length: Math.max(6, watchlist.length) }).map((_, index) => (
                    <div key={`watchlist-skeleton-${index}`} className="w-full sm:max-w-[240px]">
                      <SkeletonMovieCard />
                    </div>
                  ))
                ) : (
                  contentList
                    .filter((c) => watchlist.includes(c.id))
                    .map((item) => (
                      <div key={item.id} className="w-full sm:max-w-[240px]">
                        <MovieCard
                          item={item}
                          watchlist={watchlist}
                          favorites={favorites}
                          onToggleWatchlist={handleToggleWatchlist}
                          onToggleFavorite={handleToggleFavorite}
                          onPlay={handlePlayContent}
                          onViewDetails={handleViewDetails}
                        />
                      </div>
                    ))
                )}
              </div>
            )}
          </div>
        )}

        {/* VIEW F: FAVORITES HUB */}
        {activeView === 'favorites' && (
          <div className="pt-20 pb-12 sm:pt-24 sm:pb-20 text-left max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2 font-sans flex items-center gap-2">
              <Heart className="w-8 h-8 text-[#22C55E]" /> Saved Favorites
            </h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-10 font-semibold">Your absolute top tier films and series</p>

            {favorites.length === 0 ? (
              <div className="py-24 text-center border border-white/5 bg-[#111111]/40 rounded-3xl flex flex-col items-center gap-3">
                <Heart className="w-12 h-12 text-gray-600 stroke-[1.5]" />
                <p className="text-sm font-bold text-gray-400">No favorites added yet.</p>
                <p className="text-xs text-gray-500">Click the heart icon on any movie detail viewport to save them here.</p>
                <button
                  onClick={() => setActiveView(currentUser ? 'home' : 'landing')}
                  className="mt-2 px-5 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Discover Content
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 sm:gap-y-8 gap-x-4 justify-items-center">
                {isLoading ? (
                  Array.from({ length: Math.max(6, favorites.length) }).map((_, index) => (
                    <div key={`favorites-skeleton-${index}`} className="w-full sm:max-w-[240px]">
                      <SkeletonMovieCard />
                    </div>
                  ))
                ) : (
                  contentList
                    .filter((c) => favorites.includes(c.id))
                    .map((item) => (
                      <div key={item.id} className="w-full sm:max-w-[240px]">
                        <MovieCard
                          item={item}
                          watchlist={watchlist}
                          favorites={favorites}
                          onToggleWatchlist={handleToggleWatchlist}
                          onToggleFavorite={handleToggleFavorite}
                          onPlay={handlePlayContent}
                          onViewDetails={handleViewDetails}
                        />
                      </div>
                    ))
                )}
              </div>
            )}
          </div>
        )}

        {/* VIEW G: MOVIE / TV SHOW DETAILS PORTAL */}
        {activeView === 'details' && selectedItem && (
          <DetailsView
            item={{
              ...selectedItem,
              poster: selectedItem.type === 'movie' ? (MOVIES_POSTER_MAPPING[selectedItem.title.trim()] || selectedItem.poster) : selectedItem.poster
            }}
            allContent={contentList}
            watchlist={watchlist}
            favorites={favorites}
            onToggleWatchlist={handleToggleWatchlist}
            onToggleFavorite={handleToggleFavorite}
            onPlay={handlePlayContent}
            onClose={() => {
              setActiveView(lastListView);
              setSelectedItem(null);
            }}
            onViewItem={(item) => setSelectedItem(item)}
          />
        )}

        {/* VIEW H: GLOBAL SEARCH HUD */}
        {activeView === 'search' && currentUser && (
          <SearchView
            allContent={contentList}
            onPlay={handlePlayContent}
            onViewDetails={handleViewDetails}
            watchlist={watchlist}
            favorites={favorites}
            onToggleWatchlist={handleToggleWatchlist}
            onToggleFavorite={handleToggleFavorite}
            onClose={() => setActiveView('home')}
          />
        )}

        {/* VIEW I: ACCOUNT PORTAL */}
        {activeView === 'account' && currentUser && (
          <UserAccount
            user={currentUser}
            onUpdateUser={(up) => {
              setCurrentUser(up);
              localStorage.setItem('cinelux_current_user', JSON.stringify(up));
              saveUserProfile(up.id, up);
            }}
            onLogout={handleLogout}
          />
        )}

        {/* VIEW J: ADMINISTRATIVE ACTIONS */}
        {activeView === 'admin' && currentUser && (
          <AdminDashboard
            allContent={contentList}
            onAddContent={handleAddContent}
            onDeleteContent={handleDeleteContent}
          />
        )}

        {/* VIEW K: MASTER PLAYER VIEWPORT */}
        {activeView === 'player' && activePlayItem && (
          <VideoPlayer
            item={activePlayItem}
            episode={activePlayEpisode}
            onClose={() => {
              if (selectedItem) {
                setActiveView('details');
              } else {
                setActiveView(lastListView);
              }
              setActivePlayItem(null);
              setActivePlayEpisode(undefined);
            }}
            onProgressUpdate={handleProgressUpdate}
          />
        )}

        {/* VIEW L: AI RECOMMENDATION ENGINE CHAT */}
        {activeView === 'ai-recommender' && currentUser && (
          <AIRecommender
            allContent={contentList}
            watchlist={watchlist}
            favorites={favorites}
            onToggleWatchlist={handleToggleWatchlist}
            onToggleFavorite={handleToggleFavorite}
            onPlay={handlePlayContent}
            onViewDetails={handleViewDetails}
          />
        )}

      </main>

      {/* PROFESSIONAL MULTI-COLUMN LUXURY FOOTER */}
      <footer className="border-t border-white/5 bg-[#0B1220] py-16 text-xs text-gray-500 select-none text-left">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Brand pitch */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-[10px] bg-transparent shadow-lg shadow-black/40 border border-white/5 overflow-hidden flex items-center justify-center">
                <img 
                  src="https://i.postimg.cc/zXtmmyFf/images.jpg" 
                  alt="CineLux Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-sans text-lg font-bold tracking-widest text-white">CINE<span className="text-[#22C55E]">LUX</span></span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              The world's premier movie discovery and ultra-high fidelity catalog platform. Elevating standard compression stream metadata to true modern art.
            </p>
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">Secure Connection Enforced</span>
          </div>

          {/* Column 2: Platform Links */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-white tracking-widest uppercase text-[10px] mb-1 text-gray-400">Discover</span>
            <button onClick={() => { if(currentUser) { setActiveView('home'); } else { setAuthModalOpen(true); } }} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer font-semibold">Classic Cinematic</button>
            <button onClick={() => { if(currentUser) { setActiveView('movies'); } else { setAuthModalOpen(true); } }} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer font-semibold">UHD Movies</button>
            <button onClick={() => { if(currentUser) { setActiveView('series'); } else { setAuthModalOpen(true); } }} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer font-semibold">Bespoke TV Series</button>
            <button onClick={() => { if(currentUser) { setActiveView('ai-recommender'); } else { setAuthModalOpen(true); } }} className="text-left text-[#22C55E] hover:text-green-400 transition-colors cursor-pointer font-bold flex items-center gap-1 font-sans">AI Recommendation Hub <Sparkles className="w-3 h-3 animate-pulse" /></button>
          </div>

          {/* Column 3: Trust Compliance */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-white tracking-widest uppercase text-[10px] mb-1 text-gray-400">Compliance & Trust</span>
            <button onClick={() => handleOpenInfoHub('privacy')} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer font-semibold">Privacy Policy</button>
            <button onClick={() => handleOpenInfoHub('terms')} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer font-semibold">Terms of Membership</button>
            <button onClick={() => handleOpenInfoHub('dmca')} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer font-semibold">DMCA Copyright Policy</button>
            <button onClick={() => handleOpenInfoHub('cookie')} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer font-semibold">Cookie Security Policy</button>
          </div>

          {/* Column 4: Help Support */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-white tracking-widest uppercase text-[10px] mb-1 text-gray-400">Get Help</span>
            <button onClick={() => handleOpenInfoHub('faq')} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer font-semibold">FAQ & Help Desk</button>
            <button onClick={() => handleOpenInfoHub('about')} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer font-semibold">About CineLux</button>
            <button onClick={() => handleOpenInfoHub('contact')} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer font-semibold">Elite Support Contact</button>
          </div>

        </div>

        {/* Legal Disclaimer Ribbon */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600 text-[10px] font-medium uppercase tracking-wider">
          <span>© 2026 CineLux Stream Inc. All rights reserved.</span>
          <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-[#22C55E] fill-[#22C55E]" /> TLS 1.3 encryption secured</span>
        </div>
      </footer>

      {/* AUTH POPUP DIALOG OVERLAY */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* COMPLIANCE & TRUST INFO HUB */}
      <InfoHub
        isOpen={infoHubOpen}
        onClose={() => setInfoHubOpen(false)}
        initialSection={infoHubSection}
      />

      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`pointer-events-auto px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                toast.type === 'success'
                  ? 'bg-black/95 border-[#22C55E]/40 text-white shadow-green-500/10'
                  : 'bg-black/95 border-white/10 text-gray-300'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-[#22C55E]' : 'bg-gray-400'}`} />
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
