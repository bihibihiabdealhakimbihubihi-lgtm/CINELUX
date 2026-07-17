/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Search as SearchIcon, 
  Bell, 
  Bookmark, 
  User, 
  ChevronDown, 
  LogOut, 
  Settings, 
  Languages, 
  SlidersHorizontal,
  Home,
  Film,
  Tv,
  X,
  Menu,
  ShieldCheck
} from 'lucide-react';
import { UserProfile, Notification } from '../types';
import { MOCK_NOTIFICATIONS } from '../data';

interface HeaderProps {
  user?: UserProfile | null;
  notifications?: Notification[];
  onMarkNotificationRead?: (id: string) => void;
  onClearNotifications?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onLogout?: () => void;
  onOpenProfile?: () => void;
  onOpenAdmin?: () => void;
  userLanguage?: string;
  onChangeLanguage?: (lang: string) => void;
  userTheme?: 'dark' | 'glass';
  onChangeTheme?: (theme: 'dark' | 'glass') => void;
  isAdmin?: boolean;
}

export default function Header({
  user,
  notifications = [],
  onMarkNotificationRead = () => {},
  onClearNotifications = () => {},
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAuth,
  onLogout = () => {},
  onOpenProfile = () => {},
  onOpenAdmin = () => {},
  userLanguage = 'English',
  onChangeLanguage = () => {},
  userTheme = 'dark',
  onChangeTheme = () => {},
  isAdmin = false,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'series', label: 'Series', icon: Tv },
    { id: 'watchlist', label: 'My List', icon: Bookmark },
  ];

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0B1220]/95 backdrop-blur-md border-b border-white/5 py-3 shadow-lg'
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left Side: Logo & Main Navigation */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div 
            id="logo-container"
            onClick={() => setActiveTab('home')}
            className="cursor-pointer flex items-center gap-1.5 group"
          >
            <div className="w-10 h-10 rounded-[10px] bg-transparent shadow-lg shadow-black/40 border border-white/5 group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center">
              <img 
                src="https://i.postimg.cc/zXtmmyFf/images.jpg" 
                alt="CineLux Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-sans text-sm font-black tracking-[0.18em] text-white">
              CINE<span className="text-[#22C55E]">LUX</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}

            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium tracking-wide text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all duration-300"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Panel
              </button>
            )}
          </nav>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Quick Search */}
          <button
            id="search-trigger"
            onClick={onOpenSearch}
            className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 relative group"
            title="Search Movies & Shows"
          >
            <SearchIcon className="w-5 h-5 group-hover:scale-105 transition-transform" />
          </button>

          {/* Language Selector */}
          <div id="language-selector-wrapper" className="relative hidden md:block">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowNotifications(false);
                setShowUserMenu(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide text-gray-400 hover:text-white hover:bg-white/5 border border-white/5 transition-all"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{userLanguage}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showLangMenu ? 'rotate-180' : ''}`} />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-[#111111] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                {['English', 'Español', 'Français', '日本語', '한국어', 'Deutsch'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      onChangeLanguage(lang);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors hover:bg-white/5 ${
                      userLanguage === lang ? 'text-[#22C55E] bg-white/5' : 'text-gray-300'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Conditionally render notifications and profile dropdown if user is signed in */}
          {user ? (
            <>
              {/* Notification Bell */}
              <div id="notifications-dropdown-wrapper" className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowUserMenu(false);
                    setShowLangMenu(false);
                  }}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#22C55E] text-[9px] font-bold text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#181818]">
                      <span className="text-sm font-semibold text-white">Notifications</span>
                      {notifications.length > 0 && (
                        <button
                          onClick={onClearNotifications}
                          className="text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-xs text-gray-500">
                          No notifications yet
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => onMarkNotificationRead(notif.id)}
                            className={`p-4 text-left transition-colors cursor-pointer hover:bg-white/5 ${
                              !notif.read ? 'bg-white/[0.02]' : ''
                            }`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className={`text-xs font-medium ${!notif.read ? 'text-[#22C55E]' : 'text-gray-300'}`}>
                                {notif.title}
                              </span>
                              <span className="text-[10px] text-gray-500 whitespace-nowrap">{notif.date}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Personalized Greeting */}
              <span id="header-user-greeting" className="hidden sm:inline-block text-xs text-gray-300 font-medium tracking-wide select-none">
                Welcome back, <span className="text-white font-semibold">{user.name}</span>
              </span>

              {/* User Profile */}
              <div id="user-profile-dropdown-wrapper" className="relative">
                <button
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifications(false);
                    setShowLangMenu(false);
                  }}
                  className="flex items-center gap-1.5 focus:outline-none"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8.5 h-8.5 rounded-full border border-white/10 object-cover"
                  />
                  <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-white/5 bg-[#181818]/60">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate mt-0.5">{user.name}</p>
                      <span className="inline-block px-2 py-0.5 rounded bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 text-[10px] text-amber-400 font-semibold mt-1.5 uppercase tracking-wide">
                        {user.subscription}
                      </span>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={() => {
                          onOpenProfile();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:text-white rounded-lg hover:bg-white/5 flex items-center gap-2.5 transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-400" />
                        My Account
                      </button>
                      <button
                        onClick={() => {
                          onChangeTheme(userTheme === 'dark' ? 'glass' : 'dark');
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:text-white rounded-lg hover:bg-white/5 flex items-center gap-2.5 transition-colors"
                      >
                        <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                        Layout: {userTheme === 'dark' ? 'Classic Cinematic' : 'Glossy Glass'}
                      </button>
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 flex items-center gap-2.5 transition-colors border-t border-white/5 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-5 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#22C55E]/20 cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Hamburger Menu (Mobile Only) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all lg:hidden"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-menu" className="lg:hidden absolute top-[100%] left-0 right-0 bg-[#111111]/95 backdrop-blur-lg border-b border-white/10 p-5 shadow-2xl flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all ${
                  isActive
                    ? 'text-white bg-white/10 shadow-inner'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
          {isAdmin && (
            <button
              onClick={() => {
                onOpenAdmin();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium tracking-wide text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/25 transition-all"
            >
              <ShieldCheck className="w-5 h-5" />
              Admin Panel
            </button>
          )}
        </div>
      )}
    </header>
  );
}
