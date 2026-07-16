/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Chrome, 
  Apple, 
  Facebook,
  ArrowRight, 
  Sparkles, 
  Check, 
  Eye, 
  EyeOff,
  ShieldCheck,
  KeyRound,
  RefreshCw
} from 'lucide-react';
import { UserProfile } from '../types';

interface Premium3DButtonProps {
  onClick: () => void;
  brand: 'Google' | 'Apple' | 'Facebook';
}

const Premium3DButton: React.FC<Premium3DButtonProps> = ({ onClick, brand }) => {
  const config = {
    Google: {
      label: 'Google',
      borderColor: 'border border-white/10 hover:border-white/20',
      bgGradient: 'bg-gradient-to-b from-[#1b1b1e] via-[#121214] to-[#0a0a0c]',
      glowColor: 'rgba(234, 67, 53, 0.2)',
      baseShadow: '0 1px 0 #28282b, 0 2px 0 #242427, 0 3px 0 #202022, 0 4px 0 #1c1c1e, 0 5px 0 #18181a, 0 6px 0 #141416, 0 7px 0 #101011, 0 8px 0 #0d0d0e, 0 9px 0 #09090a, 0 10px 0 #050506, 0 12px 24px rgba(0,0,0,0.85), 0 16px 32px rgba(234,67,53,0.1)',
      hoverShadow: '0 1px 0 #28282b, 0 2px 0 #242427, 0 3px 0 #202022, 0 4px 0 #1c1c1e, 0 5px 0 #18181a, 0 6px 0 #141416, 0 7px 0 #101011, 0 8px 0 #0d0d0e, 0 9px 0 #09090a, 0 10px 0 #050506, 0 20px 32px rgba(0,0,0,0.7), 0 24px 48px rgba(234,67,53,0.3)',
      tapShadow: '0 1px 0 #1c1c1e, 0 2px 0 #18181a, 0 3px 0 #141416, 0 4px 0 #101011, 0 6px 12px rgba(0,0,0,0.9), 0 8px 16px rgba(234,67,53,0.05)',
      icon: (
        <svg className="w-5 h-5 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] drop-shadow-[0_-0.5px_0.5px_rgba(255,255,255,0.3)] shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
      )
    },
    Apple: {
      label: 'Apple',
      borderColor: 'border border-white/15 hover:border-white/30',
      bgGradient: 'bg-gradient-to-b from-[#2a2a2e] via-[#161618] to-[#040405]',
      glowColor: 'rgba(255, 255, 255, 0.1)',
      baseShadow: '0 1px 0 #444447, 0 2px 0 #3b3b3d, 0 3px 0 #323234, 0 4px 0 #29292a, 0 5px 0 #202021, 0 6px 0 #171718, 0 7px 0 #0f0f10, 0 8px 0 #0a0a0b, 0 9px 0 #050506, 0 10px 0 #010101, 0 12px 24px rgba(0,0,0,0.95), 0 16px 32px rgba(255,255,255,0.04)',
      hoverShadow: '0 1px 0 #444447, 0 2px 0 #3b3b3d, 0 3px 0 #323234, 0 4px 0 #29292a, 0 5px 0 #202021, 0 6px 0 #171718, 0 7px 0 #0f0f10, 0 8px 0 #0a0a0b, 0 9px 0 #050506, 0 10px 0 #010101, 0 20px 32px rgba(0,0,0,0.8), 0 24px 48px rgba(255,255,255,0.12)',
      tapShadow: '0 1px 0 #29292a, 0 2px 0 #202021, 0 3px 0 #171718, 0 4px 0 #0f0f10, 0 6px 12px rgba(0,0,0,0.95), 0 8px 16px rgba(255,255,255,0.02)',
      icon: (
        <svg className="w-5 h-5 text-white filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] drop-shadow-[0_-0.5px_0.5px_rgba(255,255,255,0.4)] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94 1.07.08 2.15-.52 2.81-1.33z" />
        </svg>
      )
    },
    Facebook: {
      label: 'Facebook',
      borderColor: 'border border-blue-500/20 hover:border-blue-400/40',
      bgGradient: 'bg-gradient-to-b from-[#1844b4] via-[#0d2a84] to-[#04123d]',
      glowColor: 'rgba(24, 119, 242, 0.25)',
      baseShadow: '0 1px 0 #183e9d, 0 2px 0 #15378a, 0 3px 0 #122f77, 0 4px 0 #0e2764, 0 5px 0 #0b2051, 0 6px 0 #08183e, 0 7px 0 #05102c, 0 8px 0 #030a1c, 0 9px 0 #020612, 0 10px 0 #010208, 0 12px 24px rgba(0,0,0,0.85), 0 16px 32px rgba(24,119,242,0.12)',
      hoverShadow: '0 1px 0 #183e9d, 0 2px 0 #15378a, 0 3px 0 #122f77, 0 4px 0 #0e2764, 0 5px 0 #0b2051, 0 6px 0 #08183e, 0 7px 0 #05102c, 0 8px 0 #030a1c, 0 9px 0 #020612, 0 10px 0 #010208, 0 20px 32px rgba(0,0,0,0.7), 0 24px 48px rgba(24,119,242,0.3)',
      tapShadow: '0 1px 0 #0e2764, 0 2px 0 #0b2051, 0 3px 0 #08183e, 0 4px 0 #05102c, 0 6px 12px rgba(0,0,0,0.9), 0 8px 16px rgba(24,119,242,0.05)',
      icon: (
        <svg className="w-5 h-5 text-white filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] drop-shadow-[0_-0.5px_0.5px_rgba(255,255,255,0.4)] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    }
  };

  const brandConfig = config[brand];

  const buttonVariants = {
    idle: {
      y: 0,
      rotateX: 1.5,
      rotateY: -1.5,
      scale: 1,
      boxShadow: brandConfig.baseShadow,
      transition: {
        y: { repeat: Infinity, repeatType: 'mirror' as const, duration: 4.5, ease: 'easeInOut' },
        rotateX: { repeat: Infinity, repeatType: 'mirror' as const, duration: 5, ease: 'easeInOut' },
        rotateY: { repeat: Infinity, repeatType: 'mirror' as const, duration: 5.5, ease: 'easeInOut' }
      }
    },
    hover: {
      y: -8,
      scale: 1.05,
      rotateX: 6,
      rotateY: -3,
      boxShadow: brandConfig.hoverShadow,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 14
      }
    },
    tap: {
      y: 5,
      scale: 0.96,
      rotateX: 1,
      rotateY: -1,
      boxShadow: brandConfig.tapShadow,
      transition: {
        type: 'spring',
        stiffness: 350,
        damping: 12
      }
    }
  };

  return (
    <div style={{ perspective: '800px', transformStyle: 'preserve-3d' }} className="w-full relative py-3 select-none">
      <div 
        className="absolute inset-x-2 bottom-1 h-[48px] rounded-[22px] pointer-events-none filter blur-xl opacity-60 transition-all duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${brandConfig.glowColor} 0%, transparent 70%)`,
          transform: 'translateZ(-15px) translateY(8px)',
        }}
      />
      <motion.button
        type="button"
        onClick={onClick}
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        className={`w-full h-[62px] relative rounded-[22px] ${brandConfig.bgGradient} ${brandConfig.borderColor} cursor-pointer group overflow-visible`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div 
          className="absolute inset-0 rounded-[21px] overflow-hidden pointer-events-none"
          style={{ transform: 'translateZ(4px)' }}
        >
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute -top-[50%] -left-[10%] w-[120%] h-[100%] rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
          <motion.div 
            className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent skew-x-[-28deg]"
            animate={{
              x: ['-120%', '240%']
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 3.5,
              duration: 1.8,
              ease: 'easeInOut'
            }}
          />
        </div>
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center gap-1"
          style={{ transform: 'translateZ(15px)' }}
        >
          {brandConfig.icon}
          <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#e0e0e0] group-hover:text-white transition-colors drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.95)]">
            {brandConfig.label}
          </span>
        </div>
        <div className="absolute top-1.5 left-2 w-1 h-1 rounded-full bg-white/10" style={{ transform: 'translateZ(2px)' }} />
        <div className="absolute top-1.5 right-2 w-1 h-1 rounded-full bg-white/5"  style={{ transform: 'translateZ(2px)' }} />
      </motion.button>
    </div>
  );
};

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

type AuthPhase = 'login' | 'register' | 'forgot' | 'verify';

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [phase, setPhase] = useState<AuthPhase>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  
  // Verification Code States
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);

  // Recovery email state
  const [recoverySent, setRecoverySent] = useState(false);

  // Auto decrement verification timer
  useEffect(() => {
    let interval: any;
    if (phase === 'verify' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, timer]);

  if (!isOpen) return null;

  const handleSimulatedSSO = (provider: 'Google' | 'Apple' | 'Facebook') => {
    setIsLoading(true);
    setLoadingMsg(`Handshaking with ${provider} secure servers...`);
    
    setTimeout(() => {
      setLoadingMsg('Verifying public key encryption standard...');
    }, 1200);

    setTimeout(() => {
      const mockUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: provider === 'Google' ? 'Adrian Vance' : provider === 'Apple' ? 'Marcus Stirling' : 'Vance Social Streamer',
        email: email || 'user@cinelux.stream',
        avatar: provider === 'Google' 
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        subscription: 'VIP Cinematic',
        subscriptionExpiry: 'October 12, 2026',
        language: 'English',
        watchlist: [],
        favorites: [],
        history: [],
        devices: [
          { id: 'dev-sso', name: `${provider} Authenticated Node`, type: 'Desktop', lastActive: 'Active now', location: 'London, UK' }
        ],
        notificationsEnabled: true,
        theme: 'dark',
      };
      setIsLoading(false);
      onSuccess(mockUser);
      onClose();
    }, 2400);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setLoadingMsg('Verifying secure TLS credentials...');

    setTimeout(() => {
      const mockUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: 'Adrian Vance',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
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
      setIsLoading(false);
      onSuccess(mockUser);
      onClose();
    }, 1800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;

    setIsLoading(true);
    setLoadingMsg('Constructing decentralized credentials index...');

    setTimeout(() => {
      setIsLoading(false);
      setPhase('verify');
      setTimer(59);
    }, 1500);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const completeCode = verificationCode.join('');
    if (completeCode.length < 6) return;

    setIsLoading(true);
    setLoadingMsg('Activating CineLux master cipher key...');

    setTimeout(() => {
      const mockUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: name || 'Cinema Enthusiast',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        subscription: 'VIP Cinematic',
        subscriptionExpiry: 'Unlimited Stream Access',
        language: 'English',
        watchlist: [],
        favorites: [],
        history: [],
        devices: [
          { id: 'dev-new', name: 'Primary Device Node', type: 'Desktop', lastActive: 'Active now', location: 'Home Network' }
        ],
        notificationsEnabled: true,
        theme: 'dark',
      };
      setIsLoading(false);
      onSuccess(mockUser);
      onClose();
    }, 2000);
  };

  const handleCodeChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newCode = [...verificationCode];
    newCode[index] = val.substring(val.length - 1);
    setVerificationCode(newCode);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`code-box-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setLoadingMsg('Locating accounts matching cipher email...');

    setTimeout(() => {
      setIsLoading(false);
      setRecoverySent(true);
    }, 1500);
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl overflow-y-auto select-none">
      <div className="min-h-screen w-full flex items-center justify-center p-4 py-8 md:py-12">
        <div className="w-full max-w-md bg-[#101010]/80 border border-white/10 rounded-[32px] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.8)] relative p-6 md:p-10 backdrop-saturate-150">
        
        {/* Glow ambient background elements */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer border border-white/5 hover:border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LOADING HANDSHAKE OVERLAY */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#0B1220]/98 z-50 flex flex-col items-center justify-center gap-4 p-8">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-white/5 border-t-2 border-t-[#22C55E] animate-spin" />
              <div className="w-10 h-10 rounded-full bg-[#101010] absolute flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.jpg" 
                  alt="CineLux Logo" 
                  className="w-full h-full object-cover animate-pulse"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <p className="text-sm font-bold text-white tracking-wider mt-4">{loadingMsg}</p>
            <p className="text-[10px] text-gray-500 font-semibold tracking-widest uppercase">Encryption Tunnel Secure</p>
          </div>
        )}

        {/* ================= PHASE 1: LOGIN ================= */}
        {phase === 'login' && (
          <div>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#22C55E] to-emerald-600 shadow-xl shadow-[#22C55E]/25 mb-4 border border-white/10 overflow-hidden mx-auto">
                <img 
                  src="/logo.jpg" 
                  alt="CineLux Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white font-sans">
                Stream in Cine<span className="text-[#22C55E]">Lux</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1.5 font-medium">
                Unlock peerless 4K HDR streams and director narratives.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4.5 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-4 top-4" />
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-white placeholder-gray-600 outline-none focus:border-[#22C55E] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Security Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-4 top-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border border-white/5 rounded-2xl py-3.5 pl-12 pr-12 text-xs text-white placeholder-gray-600 outline-none focus:border-[#22C55E] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Extras Row */}
              <div className="flex items-center justify-between text-[11px] font-semibold mt-1">
                <label className="flex items-center gap-2 text-gray-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4.5 h-4.5 rounded bg-black border-white/10 accent-[#22C55E] cursor-pointer"
                  />
                  <span>Remember Session</span>
                </label>
                <button
                  type="button"
                  onClick={() => setPhase('forgot')}
                  className="text-gray-400 hover:text-[#22C55E] transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 shadow-xl shadow-[#22C55E]/20 mt-3 cursor-pointer"
              >
                <span>Authorize CineLux Engine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* SSO Divider */}
            <div className="flex items-center gap-4 my-7">
              <div className="flex-1 h-[1px] bg-white/5" />
              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Or Decrypt With SSO</span>
              <div className="flex-1 h-[1px] bg-white/5" />
            </div>

            {/* SSO Layout */}
            <div className="grid grid-cols-3 gap-3">
              <Premium3DButton
                brand="Google"
                onClick={() => handleSimulatedSSO('Google')}
              />
              <Premium3DButton
                brand="Apple"
                onClick={() => handleSimulatedSSO('Apple')}
              />
              <Premium3DButton
                brand="Facebook"
                onClick={() => handleSimulatedSSO('Facebook')}
              />
            </div>

            <p className="text-center text-xs text-gray-500 mt-8 font-medium">
              New to CineLux catalog streaming?
              <button
                onClick={() => setPhase('register')}
                className="ml-1.5 text-white hover:text-[#22C55E] font-black transition-colors"
              >
                Begin Membership
              </button>
            </p>
          </div>
        )}

        {/* ================= PHASE 2: REGISTER ================= */}
        {phase === 'register' && (
          <div>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#22C55E] to-emerald-600 shadow-xl shadow-[#22C55E]/25 mb-4 border border-white/10 overflow-hidden mx-auto">
                <img 
                  src="/logo.jpg" 
                  alt="CineLux Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white font-sans">
                Embark on Cine<span className="text-[#22C55E]">Lux</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1.5 font-medium">
                Create your global cinema access credential.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4.5 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-500 absolute left-4 top-4" />
                  <input
                    type="text"
                    required
                    placeholder="Adrian Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-white placeholder-gray-600 outline-none focus:border-[#22C55E] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-4 top-4" />
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-white placeholder-gray-600 outline-none focus:border-[#22C55E] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Setup Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-4 top-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border border-white/5 rounded-2xl py-3.5 pl-12 pr-12 text-xs text-white placeholder-gray-600 outline-none focus:border-[#22C55E] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-gray-500 leading-normal">
                By clicking Establish Membership, you consent to our security Handshake rules and decrypted content policies. No subscription fees will ever be billed.
              </p>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 shadow-xl shadow-[#22C55E]/20 mt-2 cursor-pointer"
              >
                <span>Establish Access Key</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-8 font-medium">
              Already have an active credential?
              <button
                onClick={() => setPhase('login')}
                className="ml-1.5 text-white hover:text-[#22C55E] font-black transition-colors"
              >
                Sign In Instead
              </button>
            </p>
          </div>
        )}

        {/* ================= PHASE 3: FORGOT PASSWORD ================= */}
        {phase === 'forgot' && (
          <div>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-black text-white text-2xl mx-auto shadow-xl shadow-amber-500/20 mb-4 border border-white/10">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white font-sans">
                Access Recovery
              </h2>
              <p className="text-xs text-gray-400 mt-1.5 font-medium">
                Request a decryption token sent directly to your security email address.
              </p>
            </div>

            {recoverySent ? (
              <div className="flex flex-col gap-5 text-center py-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium leading-relaxed flex flex-col gap-2">
                  <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                  <span>We've dispatched a recovery token to <strong>{email}</strong>. Check your simulated incoming mail logs to restore the session node.</span>
                </div>
                <button
                  onClick={() => {
                    setRecoverySent(false);
                    setPhase('login');
                  }}
                  className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest border border-white/5 transition-all cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleRecoverySubmit} className="flex flex-col gap-4 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-500 absolute left-4 top-4" />
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-white placeholder-gray-600 outline-none focus:border-[#22C55E] transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 mt-2 cursor-pointer shadow-lg shadow-amber-500/15"
                >
                  <span>Transmit Decryption Token</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setPhase('login')}
                  className="w-full py-3.5 rounded-xl text-xs text-gray-400 hover:text-white font-bold transition-all text-center mt-2 cursor-pointer"
                >
                  Cancel and Return
                </button>
              </form>
            )}
          </div>
        )}

        {/* ================= PHASE 4: EMAIL VERIFICATION UI ================= */}
        {phase === 'verify' && (
          <div>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#22C55E] to-emerald-600 flex items-center justify-center font-black text-white text-2xl mx-auto shadow-xl shadow-[#22C55E]/20 mb-4 border border-white/10">
                <ShieldCheck className="w-6 h-6 text-white animate-pulse" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white font-sans">
                Verify Connection
              </h2>
              <p className="text-xs text-gray-400 mt-1.5 font-medium">
                Enter the 6-digit decryption key dispatched to <strong>{email || 'your email'}</strong>
              </p>
            </div>

            <form onSubmit={handleVerifySubmit} className="flex flex-col gap-6">
              {/* Digit Input Grid */}
              <div className="grid grid-cols-6 gap-2 px-1">
                {verificationCode.map((digit, i) => (
                  <input
                    key={i}
                    id={`code-box-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    className="aspect-square w-full bg-black border border-white/10 rounded-xl text-center text-lg font-black text-white focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] outline-none"
                  />
                ))}
              </div>

              {/* Countdown or Resend row */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                {timer > 0 ? (
                  <span>Resend available in <strong className="text-white">{timer}s</strong></span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setTimer(59)}
                    className="text-[#22C55E] hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Resend Encryption Key
                  </button>
                )}
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Secure Cipher</span>
              </div>

              <button
                type="submit"
                disabled={verificationCode.some(c => !c)}
                className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Authorize & Begin Streaming</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setPhase('register')}
                className="text-xs text-gray-400 hover:text-white font-bold transition-all text-center"
              >
                Change Registration Email
              </button>
            </form>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
