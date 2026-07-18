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
  ArrowRight, 
  Sparkles, 
  Check, 
  Eye, 
  EyeOff,
  ShieldCheck,
  KeyRound,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../types';
import { auth, getUserProfile, saveUserProfile } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

interface GoogleSignInButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <div style={{ perspective: '800px', transformStyle: 'preserve-3d' }} className="w-full relative py-2 select-none">
      <div 
        className="absolute inset-x-4 bottom-2 h-[44px] rounded-xl pointer-events-none filter blur-lg opacity-40 transition-all duration-300 group-hover:opacity-75"
        style={{
          background: 'radial-gradient(circle, rgba(66, 133, 244, 0.15) 0%, rgba(52, 168, 83, 0.1) 50%, transparent 100%)',
          transform: 'translateZ(-10px) translateY(4px)',
        }}
      />
      <motion.button
        type="button"
        onClick={onClick}
        disabled={disabled || isLoading}
        whileHover={disabled || isLoading ? {} : { y: -2, scale: 1.01 }}
        whileTap={disabled || isLoading ? {} : { y: 1, scale: 0.99 }}
        className={`w-full h-12 relative rounded-xl border border-white/10 bg-[#0F0F11] hover:bg-[#141417] text-white font-medium text-xs tracking-wider transition-all flex items-center justify-center gap-3 shadow-lg shadow-black/50 overflow-hidden ${
          disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer group'
        }`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {!isLoading && (
          <motion.div 
            className="absolute inset-y-0 w-[30%] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-[-20deg]"
            animate={{
              x: ['-120%', '240%']
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 4,
              duration: 2,
              ease: 'easeInOut'
            }}
          />
        )}

        <div className="flex items-center justify-center gap-3 z-10">
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full shrink-0"
            />
          ) : (
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
          )}
          
          <span className="font-semibold text-[13px] tracking-normal text-gray-200 group-hover:text-white transition-colors">
            {isLoading ? 'Verifying with Google...' : 'Continue with Google'}
          </span>
        </div>
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
  const [error, setError] = useState('');
  
  // Verification Code States
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);

  // Recovery email state
  const [recoverySent, setRecoverySent] = useState(false);

  const renderError = () => {
    if (!error) return null;
    
    const isPopupBlocked = error.includes('auth/popup-blocked') || error.includes('popup-blocked') || error.includes('popup-closed-by-user');
    
    if (isPopupBlocked) {
      return (
        <div className="mb-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium text-left leading-relaxed animate-fade-in flex flex-col gap-2">
          <div className="font-bold text-sm text-amber-400 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Pop-up Blocked or Closed</span>
          </div>
          <p>
            Google Sign-In requires a browser pop-up. If the window did not open, please ensure pop-ups are allowed for this domain in your browser settings, or open the website in a new tab.
          </p>
        </div>
      );
    }
    
    return (
      <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold text-center leading-normal animate-fade-in">
        {error}
      </div>
    );
  };

  // Clear errors on phase transition
  useEffect(() => {
    setError('');
  }, [phase]);

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

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setLoadingMsg('Initiating Google Secure Handshake...');
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseUser = userCredential.user;

      setLoadingMsg('Retrieving or constructing user profile index...');

      let userProfile = await getUserProfile(firebaseUser.uid) as UserProfile | null;
      if (!userProfile) {
        userProfile = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Cinema Enthusiast',
          email: firebaseUser.email || 'user@cinelux.stream',
          avatar: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          subscription: 'VIP Cinematic',
          subscriptionExpiry: 'Unlimited Stream Access',
          language: 'English',
          watchlist: [],
          favorites: [],
          history: [],
          devices: [
            { id: 'dev-google', name: 'Google Authenticated Node', type: 'Desktop', lastActive: 'Active now', location: 'Primary Network' }
          ],
          notificationsEnabled: true,
          theme: 'dark',
        };
        saveUserProfile(firebaseUser.uid, userProfile);
      }

      setIsLoading(false);
      onSuccess(userProfile);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      console.error("Google Sign-In error:", err);
      setError(err.message || 'Failed to authenticate with Google. Please try again.');
    }
  };



  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) return;

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setLoadingMsg('Verifying secure TLS credentials...');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      let userProfile = await getUserProfile(firebaseUser.uid);
      if (!userProfile) {
        userProfile = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Cinema Enthusiast',
          email: firebaseUser.email || email,
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
        saveUserProfile(firebaseUser.uid, userProfile);
      }
      
      setIsLoading(false);
      onSuccess(userProfile as UserProfile);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      console.error("Login error:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Incorrect email or password. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err.message || 'An error occurred during authentication.');
      }
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !name) return;

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    setLoadingMsg('Constructing secure credentials index...');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, {
        displayName: name,
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
      });

      const userProfile: UserProfile = {
        id: firebaseUser.uid,
        name: name,
        email: firebaseUser.email || email,
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

      saveUserProfile(firebaseUser.uid, userProfile);

      setIsLoading(false);
      onSuccess(userProfile);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      console.error("Registration error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already registered.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password must be at least 8 characters long.');
      } else {
        setError(err.message || 'An error occurred during registration.');
      }
    }
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

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) return;

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setLoadingMsg('Locating accounts matching cipher email...');

    try {
      await sendPasswordResetEmail(auth, email);
      setIsLoading(false);
      setRecoverySent(true);
    } catch (err: any) {
      setIsLoading(false);
      console.error("Password recovery error:", err);
      if (err.code === 'auth/user-not-found') {
        setError('No user found with this email address.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
    }
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
              <div className="w-10 h-10 rounded-[10px] bg-[#101010] absolute flex items-center justify-center overflow-hidden">
                <img 
                  src="https://i.postimg.cc/zXtmmyFf/images.jpg" 
                  alt="CineLux Logo" 
                  className="w-full h-full object-contain animate-pulse"
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
              <div className="w-10 h-10 rounded-[10px] bg-transparent shadow-lg shadow-black/40 border border-white/5 mb-4 overflow-hidden mx-auto flex items-center justify-center">
                <img 
                  src="https://i.postimg.cc/zXtmmyFf/images.jpg" 
                  alt="CineLux Logo" 
                  className="w-full h-full object-contain"
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

            {renderError()}

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
              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Or Secure Login</span>
              <div className="flex-1 h-[1px] bg-white/5" />
            </div>

            {/* SSO Layout - Premium Google Sign-In */}
            <GoogleSignInButton
              onClick={() => handleGoogleSignIn()}
              isLoading={isLoading}
            />

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
              <div className="w-10 h-10 rounded-[10px] bg-transparent shadow-lg shadow-black/40 border border-white/5 mb-4 overflow-hidden mx-auto flex items-center justify-center">
                <img 
                  src="https://i.postimg.cc/zXtmmyFf/images.jpg" 
                  alt="CineLux Logo" 
                  className="w-full h-full object-contain"
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

            {renderError()}

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

            {renderError()}

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
