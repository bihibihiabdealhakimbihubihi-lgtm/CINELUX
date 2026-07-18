/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  RotateCw, 
  Settings, 
  Subtitles, 
  ChevronRight, 
  SkipForward, 
  Tv, 
  Eye, 
  Sliders,
  Keyboard,
  X,
  Sparkles
} from 'lucide-react';
import { ContentItem, Episode } from '../types';

interface VideoPlayerProps {
  item: ContentItem;
  episode?: Episode;
  onClose: () => void;
  onProgressUpdate: (itemId: string, progressPercent: number, episodeId?: string, seasonNumber?: number) => void;
  onNextEpisode?: () => void;
  hasNextEpisode?: boolean;
}

const MOCK_SUBTITLES = [
  { start: 2, end: 6, text: "For thousands of years, we looked up at the stars and wondered..." },
  { start: 8, end: 12, text: "Now, we stand on the threshold of the deep, unknown cosmos." },
  { start: 14, end: 18, text: "The event horizon lies ahead. Prepare the magnetic engines!" },
  { start: 20, end: 25, text: "Wait... the gravitational shear is increasing exponentially!" },
  { start: 28, end: 32, text: "We are crossing over. The physics here... they make no sense." },
  { start: 35, end: 40, text: "It's not a void. It's a sanctuary of dimensional loops." },
];

export default function VideoPlayer({
  item,
  episode,
  onClose,
  onProgressUpdate,
  onNextEpisode,
  hasNextEpisode = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(() => {
    return item.runtime ? item.runtime * 60 : 7200;
  });
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('cinelux_volume');
    return saved ? parseFloat(saved) : 0.8;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState<'4K' | '1080p' | '720p'>('4K');
  const [selectedAudio, setSelectedAudio] = useState('English (Dolby Atmos)');
  
  // Subtitle Customization
  const [subSize, setSubSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [subColor, setSubColor] = useState<'white' | 'yellow' | 'green'>('white');
  const [subBgOpacity, setSubBgOpacity] = useState<'none' | 'medium' | 'high'>('medium');

  // Interactive Overlays
  const [showSettings, setShowSettings] = useState(false);
  const [showSubSettings, setShowSubSettings] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [hasError, setHasError] = useState(false);

  const controlsTimeoutRef = useRef<number | null>(null);

  // Locker & Verification States
  const [isVerified, setIsVerified] = useState(() => {
    return sessionStorage.getItem('cinelux_locker_verified') === 'true';
  });
  const [isLockerActive, setIsLockerActive] = useState(false);

  // Register AdBlueMedia / CPABuild complete callback
  useEffect(() => {
    const handleUnlock = () => {
      console.log('Handshake unlocked successfully!');
      sessionStorage.setItem('cinelux_locker_verified', 'true');
      setIsVerified(true);
      setIsLockerActive(false);

      // Auto-resume video playback from exact paused position
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch((err) => {
            console.warn('Auto play failed after unlock, setting state only:', err);
            setHasError(true);
            setIsPlaying(true);
          });
        } else {
          setIsPlaying(true);
        }
      }, 100);
    };

    (window as any).CPABuildComplete = handleUnlock;
    (window as any).onCPABuildComplete = handleUnlock;
    (window as any).AdBlueMediaComplete = handleUnlock;

    return () => {
      (window as any).CPABuildComplete = undefined;
      (window as any).onCPABuildComplete = undefined;
      (window as any).AdBlueMediaComplete = undefined;
    };
  }, []);

  // Force pause and trigger _jb when locker is active
  useEffect(() => {
    if (isLockerActive) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);

      // Trigger the AdBlueMedia locker instantly (within 100ms)
      const timer = setTimeout(() => {
        if (typeof (window as any)._jb === 'function') {
          try {
            (window as any)._jb();
          } catch (e) {
            console.error('Failed to trigger locker script:', e);
          }
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isLockerActive]);



  const title = episode ? `${item.title} - S1:E${episode.episodeNumber} "${episode.title}"` : item.title;
  const videoSource = episode ? episode.videoUrl : item.videoUrl;

  // Auto-fade controls when mouse is idle
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowSettings(false);
        setShowSubSettings(false);
      }
    }, 3000);
  };

  useEffect(() => {
    const handleMouseMove = () => resetControlsTimeout();
    window.addEventListener('mousemove', handleMouseMove);
    resetControlsTimeout();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Handle subtitle synchronization
  useEffect(() => {
    const activeSub = MOCK_SUBTITLES.find(
      (sub) => currentTime >= sub.start && currentTime <= sub.end
    );
    setCurrentSubtitle(activeSub ? activeSub.text : '');
  }, [currentTime]);

  // Keep volume persisted
  useEffect(() => {
    localStorage.setItem('cinelux_volume', volume.toString());
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Register Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside a form or input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      e.preventDefault();

      switch (e.code) {
        case 'Space':
          togglePlay();
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'KeyF':
          toggleFullscreen();
          break;
        case 'ArrowLeft':
          seek(-10);
          break;
        case 'ArrowRight':
          seek(10);
          break;
        case 'ArrowUp':
          setVolume((v) => Math.min(1, v + 0.05));
          setIsMuted(false);
          break;
        case 'ArrowDown':
          setVolume((v) => Math.max(0, v - 0.05));
          break;
        case 'Escape':
          if (showSettings || showSubSettings || showShortcutsHelp) {
            setShowSettings(false);
            setShowSubSettings(false);
            setShowShortcutsHelp(false);
          } else {
            onClose();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, isFullscreen, showSettings, showSubSettings, showShortcutsHelp]);

  // Playback state synchronization
  const togglePlay = () => {
    if (!isVerified) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
      setIsLockerActive(true);
      resetControlsTimeout();
      return;
    }

    if (hasError) {
      setIsPlaying(!isPlaying);
      resetControlsTimeout();
      return;
    }
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback to simulated playback if blocked by sandbox or browser policies
        setHasError(true);
        setIsPlaying(true);
      });
    }
    resetControlsTimeout();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    resetControlsTimeout();
  };

  const seek = (seconds: number) => {
    if (hasError) {
      setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + seconds)));
      resetControlsTimeout();
      return;
    }
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    resetControlsTimeout();
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    setCurrentTime(cur);

    if (duration > 0) {
      const pct = (cur / duration) * 100;
      onProgressUpdate(item.id, pct, episode?.id, episode ? 1 : undefined);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    
    if (!isVerified) {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsLockerActive(true);
      return;
    }

    // Start playback automatically if permitted
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
    });
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const time = (val / 100) * duration;
    if (hasError) {
      setCurrentTime(time);
      resetControlsTimeout();
      return;
    }
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
    resetControlsTimeout();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error(err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false));
    }
    resetControlsTimeout();
  };

  // Picture in Picture
  const togglePip = async () => {
    if (hasError) return;
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSkipIntro = () => {
    if (hasError) {
      setCurrentTime(22);
      return;
    }
    if (!videoRef.current) return;
    videoRef.current.currentTime = 22; // Jump past intro sequence
    setCurrentTime(22);
  };

  const handleSkipCredits = () => {
    if (onNextEpisode && hasNextEpisode) {
      onNextEpisode();
    } else {
      onClose();
    }
  };

  // Simulated playback timer for fallback/sandbox mode
  useEffect(() => {
    if (!hasError) return;
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      let nextTime = 0;
      setCurrentTime((prev) => {
        const next = prev + playbackRate;
        if (next >= duration) {
          nextTime = duration;
          return duration;
        }
        nextTime = next;
        return next;
      });

      if (nextTime >= duration) {
        clearInterval(interval);
        handleSkipCredits();
      } else if (duration > 0) {
        const pct = (nextTime / duration) * 100;
        onProgressUpdate(item.id, pct, episode?.id, episode ? 1 : undefined);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [hasError, isPlaying, playbackRate, duration, item.id, episode?.id]);

  const formatTime = (timeInSeconds: number) => {
    const hrs = Math.floor(timeInSeconds / 3600);
    const mins = Math.floor((timeInSeconds % 3600) / 60);
    const secs = Math.floor(timeInSeconds % 60);

    const pad = (n: number) => n.toString().padStart(2, '0');

    if (hrs > 0) {
      return `${hrs}:${pad(mins)}:${pad(secs)}`;
    }
    return `${mins}:${pad(secs)}`;
  };

  // Skip Intro is shown between 5s and 15s
  const showSkipIntroButton = currentTime >= 4 && currentTime <= 15;
  // Skip Credits button shown near end
  const showSkipCreditsButton = duration > 30 && currentTime >= duration - 15;

  // Subtitle styling classes
  const getSubSizeClass = () => {
    if (subSize === 'sm') return 'text-xs md:text-sm';
    if (subSize === 'lg') return 'text-lg md:text-2xl';
    return 'text-sm md:text-lg';
  };

  const getSubColorClass = () => {
    if (subColor === 'yellow') return 'text-yellow-300';
    if (subColor === 'green') return 'text-green-400';
    return 'text-white';
  };

  const getSubBgClass = () => {
    if (subBgOpacity === 'none') return 'bg-transparent';
    if (subBgOpacity === 'high') return 'bg-black/90 px-5 py-2';
    return 'bg-black/60 px-4 py-1.5';
  };

  const rawItem = item as any;
  const posterUrl = rawItem.poster || rawItem.image || rawItem.imageUrl || rawItem.thumbnail || rawItem.cover || rawItem.posterUrl || item.backdrop;

  return (
    <div
      ref={containerRef}
      id="custom-cinematic-video-player"
      className="fixed inset-0 w-full h-full bg-[#030303] z-[9999] flex items-center justify-center select-none overflow-hidden"
    >
      {/* Blurred Poster Background Cover */}
      <div 
        className="absolute inset-0 transition-all duration-1000 scale-110 pointer-events-none"
        style={{ 
          backgroundImage: `url(${posterUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(24px)',
          opacity: 0.9,
        }}
      />
      {/* Black transparent overlay */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      />

      {/* HTML5 video element */}
      {!hasError ? (
        <video
          ref={videoRef}
          src={videoSource}
          className="w-full h-full max-h-screen object-contain relative z-10"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
          onEnded={handleSkipCredits}
          onError={() => setHasError(true)}
        />
      ) : (
        /* Immersive Simulated Theater Experience */
        <div 
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center relative cursor-pointer z-10"
        >
          {/* Blurred Background Ambient Light */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105 pointer-events-none opacity-20 filter blur-2xl"
            style={{ backgroundImage: `url(${posterUrl})` }}
          />
          
          {/* High-quality movie backdrop in center with dramatic vignette */}
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.85)] flex items-center justify-center">
            <img 
              src={posterUrl} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
            
            {/* Pulsating play/pause visual indicator */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
              {!isPlaying && (
                <div className="p-5 rounded-full bg-black/75 border border-white/15 backdrop-blur-md text-white shadow-2xl scale-110 hover:scale-125 transition-all">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
              )}
              
              {/* Live Simulated Sound wave / Audio spectrum when playing */}
              {isPlaying && (
                <div className="flex items-end gap-1.5 h-12">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-[#22C55E] rounded-full transition-all duration-300"
                      style={{ 
                        height: `${20 + Math.random() * 80}%`,
                        animation: `pulse 0.6s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.06}s`
                      }}
                    />
                  ))}
                </div>
              )}
              
              {/* Premium Sandbox Notice */}
              <div className="mt-4 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 animate-pulse" />
                Cinematic Sandbox Preview Active
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtitles Overlay */}
      {showSubtitles && currentSubtitle && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-40 text-center w-full max-w-xl md:max-w-2xl px-6 pointer-events-none transition-all">
          <span className={`rounded-xl shadow-lg leading-relaxed ${getSubSizeClass()} ${getSubColorClass()} ${getSubBgClass()}`}>
            {currentSubtitle}
          </span>
        </div>
      )}

      {/* Skip Intro Button */}
      {showSkipIntroButton && !isLockerActive && (
        <button
          onClick={handleSkipIntro}
          className="absolute bottom-28 right-8 z-40 flex items-center gap-2 px-5 py-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 hover:border-[#22C55E] text-white text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <SkipForward className="w-4 h-4 text-[#22C55E]" />
          Skip Intro
        </button>
      )}

      {/* Skip Credits / Next Episode Button */}
      {showSkipCreditsButton && !isLockerActive && (
        <button
          onClick={handleSkipCredits}
          className="absolute bottom-28 right-8 z-40 flex items-center gap-2 px-5 py-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <SkipForward className="w-4 h-4 fill-white stroke-none" />
          {hasNextEpisode ? 'Next Episode' : 'Finish Stream'}
        </button>
      )}

      {/* Control Bar & HUD Header */}
      {!isLockerActive && (
        <div
          className={`absolute inset-0 flex flex-col justify-between p-4 md:p-6 bg-gradient-to-t from-black/80 via-transparent to-black/80 z-30 transition-opacity duration-500 pointer-events-none ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
        {/* TOP HUD: Header & Close */}
        <div className="flex items-center justify-between w-full pointer-events-auto">
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-[#22C55E] font-bold tracking-widest uppercase mb-0.5 flex items-center gap-1">
              <Tv className="w-3 h-3" /> STREAMING IN {selectedQuality}
            </span>
            <h2 className="text-white text-sm md:text-base font-bold truncate max-w-xs sm:max-w-md md:max-w-xl">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Keyboard Shortcuts Guide */}
            <button
              onClick={() => setShowShortcutsHelp(!showShortcutsHelp)}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              title="Keyboard Shortcuts"
            >
              <Keyboard className="w-4.5 h-4.5" />
            </button>

            {/* Exit/Close Player */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              title="Close Stream (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BOTTOM HUD: Playback Controls */}
        <div className="w-full flex flex-col gap-4 pointer-events-auto">
          {/* Progress Slider */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-xs font-semibold text-gray-400 font-mono min-w-[45px] text-right">
              {formatTime(currentTime)}
            </span>

            <div className="relative flex-1 group/slider py-2 cursor-pointer">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={duration > 0 ? (currentTime / duration) * 100 : 0}
                onChange={handleProgressChange}
                className="w-full h-1 bg-white/25 rounded-full appearance-none cursor-pointer accent-[#22C55E] group-hover/slider:h-1.5 transition-all outline-none"
              />
              <div 
                className="absolute left-0 top-[11px] h-1 group-hover/slider:h-1.5 bg-[#22C55E] rounded-full pointer-events-none"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>

            <span className="text-xs font-semibold text-gray-400 font-mono min-w-[45px]">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls HUD row */}
          <div className="flex items-center justify-between">
            {/* Play, Volume, Skip backward/forward */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-white text-black hover:bg-gray-150 transition-transform active:scale-90"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
              </button>

              <button
                onClick={() => seek(-10)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Rewind 10s"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => seek(10)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Fast Forward 10s"
              >
                <RotateCw className="w-5 h-5" />
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 group/volume">
                <button
                  onClick={toggleMute}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-0 group-hover/volume:w-16 h-1 bg-white/20 rounded-full appearance-none accent-white cursor-pointer transition-all duration-300 outline-none"
                />
              </div>
            </div>

            {/* Subtitles, Settings, PIP, Fullscreen */}
            <div className="flex items-center gap-3">
              {/* Subtitles Toggle button */}
              <button
                onClick={() => {
                  setShowSubtitles(!showSubtitles);
                  resetControlsTimeout();
                }}
                className={`p-2.5 rounded-full border transition-colors ${
                  showSubtitles
                    ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]'
                    : 'bg-transparent border-white/5 text-gray-400 hover:text-white'
                }`}
                title="Toggle Subtitles"
              >
                <Subtitles className="w-4.5 h-4.5" />
              </button>

              {/* Subtitles Style Panel */}
              <button
                onClick={() => {
                  setShowSubSettings(!showSubSettings);
                  setShowSettings(false);
                  resetControlsTimeout();
                }}
                className={`p-2.5 rounded-full border transition-colors ${
                  showSubSettings ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white bg-transparent border-white/5'
                }`}
                title="Subtitles Style Options"
              >
                <Sliders className="w-4.5 h-4.5" />
              </button>

              {/* Audio/Video Quality Settings */}
              <button
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowSubSettings(false);
                  resetControlsTimeout();
                }}
                className={`p-2.5 rounded-full border transition-colors ${
                  showSettings ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white bg-transparent border-white/5'
                }`}
                title="Quality & Audio Tracks"
              >
                <Settings className="w-4.5 h-4.5" />
              </button>

              {/* PiP */}
              <button
                onClick={togglePip}
                className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors hidden sm:block"
                title="Picture in Picture"
              >
                <Tv className="w-4.5 h-4.5" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Toggle Fullscreen (F)"
              >
                {isFullscreen ? <Minimize className="w-4.5 h-4.5" /> : <Maximize className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Quality & Audio Selection Dropdown Menu */}
      {showSettings && !isLockerActive && (
        <div className="absolute bottom-24 right-6 bg-[#111111]/95 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-64 text-left z-50 shadow-2xl flex flex-col gap-4">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2.5">Streaming Quality</h4>
            <div className="grid grid-cols-3 gap-1.5">
              {(['4K', '1080p', '720p'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setSelectedQuality(q)}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    selectedQuality === q
                      ? 'bg-[#22C55E] border-[#22C55E] text-white'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2.5">Audio Tracks</h4>
            <div className="flex flex-col gap-1">
              {[
                'English (Dolby Atmos)',
                '日本語 (Original 5.1)',
                'Deutsch (Stereo)',
                'Español (Surround)'
              ].map((aud) => (
                <button
                  key={aud}
                  onClick={() => setSelectedAudio(aud)}
                  className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-between ${
                    selectedAudio === aud ? 'text-white bg-[#22C55E]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{aud}</span>
                  {selectedAudio === aud && <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Playback Speed</h4>
            <div className="grid grid-cols-4 gap-1">
              {[1, 1.25, 1.5, 2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    setPlaybackRate(rate);
                    if (videoRef.current) videoRef.current.playbackRate = rate;
                  }}
                  className={`py-1 text-[11px] font-semibold rounded transition-colors ${
                    playbackRate === rate ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subtitle Customizer Dropdown Menu */}
      {showSubSettings && !isLockerActive && (
        <div className="absolute bottom-24 right-6 bg-[#111111]/95 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-64 text-left z-50 shadow-2xl flex flex-col gap-4">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Text Scale</h4>
            <div className="grid grid-cols-3 gap-1.5">
              {(['sm', 'md', 'lg'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSubSize(sz)}
                  className={`py-1 text-xs font-semibold rounded border transition-colors capitalize ${
                    subSize === sz
                      ? 'bg-[#22C55E] border-[#22C55E] text-white'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {sz === 'sm' ? 'Small' : sz === 'md' ? 'Medium' : 'Large'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Text Color</h4>
            <div className="grid grid-cols-3 gap-1.5">
              {(['white', 'yellow', 'green'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => setSubColor(color)}
                  className={`py-1 text-xs font-semibold rounded border transition-colors capitalize ${
                    subColor === color
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Background Box</h4>
            <div className="grid grid-cols-3 gap-1.5">
              {(['none', 'medium', 'high'] as const).map((op) => (
                <button
                  key={op}
                  onClick={() => setSubBgOpacity(op)}
                  className={`py-1 text-xs font-semibold rounded border transition-colors capitalize ${
                    subBgOpacity === op
                      ? 'bg-[#22C55E] border-[#22C55E] text-white'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {op === 'none' ? 'None' : op === 'medium' ? 'Glass' : 'Solid'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help Overlay */}
      {showShortcutsHelp && !isLockerActive && (
        <div className="absolute inset-0 bg-black/95 z-50 flex items-center justify-center p-6">
          <div className="bg-[#111111] border border-white/10 p-6 md:p-8 rounded-3xl max-w-md w-full relative">
            <button
              onClick={() => setShowShortcutsHelp(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-white text-lg font-bold mb-5 flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-[#22C55E]" />
              Playback Keyboard Shortcuts
            </h3>
            <div className="flex flex-col gap-3.5 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-gray-400">Play / Pause</span>
                <kbd className="px-2.5 py-1 rounded bg-white/10 text-white font-mono font-bold">Space</kbd>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-gray-400">Seek Backward 10s</span>
                <kbd className="px-2.5 py-1 rounded bg-white/10 text-white font-mono font-bold">← Arrow</kbd>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-gray-400">Seek Forward 10s</span>
                <kbd className="px-2.5 py-1 rounded bg-white/10 text-white font-mono font-bold">→ Arrow</kbd>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-gray-400">Volume Up / Down</span>
                <kbd className="px-2.5 py-1 rounded bg-white/10 text-white font-mono font-bold">↑ / ↓ Arrows</kbd>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-gray-400">Toggle Fullscreen</span>
                <kbd className="px-2.5 py-1 rounded bg-white/10 text-white font-mono font-bold">F</kbd>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-400">Mute / Unmute</span>
                <kbd className="px-2.5 py-1 rounded bg-white/10 text-white font-mono font-bold">M</kbd>
              </div>
            </div>
            <button
              onClick={() => setShowShortcutsHelp(false)}
              className="mt-6 w-full py-3 rounded-xl bg-white text-black font-semibold text-xs transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
