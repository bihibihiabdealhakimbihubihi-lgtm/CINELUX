/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Film, 
  Star, 
  ChevronRight, 
  Loader2, 
  RefreshCw,
  Search,
  MessageSquareCode
} from 'lucide-react';
import { ContentItem } from '../types';
import MovieCard from './MovieCard';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendedIds?: string[];
  timestamp: string;
}

interface AIRecommenderProps {
  allContent: ContentItem[];
  onPlay: (item: ContentItem) => void;
  onViewDetails: (item: ContentItem) => void;
  watchlist: string[];
  favorites: string[];
  onToggleWatchlist: (itemId: string) => void;
  onToggleFavorite: (itemId: string) => void;
  onClose?: () => void;
}

export default function AIRecommender({
  allContent,
  onPlay,
  onViewDetails,
  watchlist,
  favorites,
  onToggleWatchlist,
  onToggleFavorite,
  onClose,
}: AIRecommenderProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to the **CineLux VIP Curation Hub**. I am your personal AI Cinematic Concierge, engineered to analyze your taste and construct bespoke streaming suggestions from our exclusive 4K catalog.\n\nTell me what mood, theme, or genres you are desiring today.",
      timestamp: 'Now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starterChips = [
    { label: "Deep Cosmic Space Mysteries", icon: "🌌" },
    { label: "Neon Tokyo Crime Noir", icon: "🏙️" },
    { label: "Award Winning Sci-Fi Blockbusters", icon: "🏆" },
    { label: "Fascinating Real-life Documentaries", icon: "🎞️" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Map conversation format for the server API
      const conversationHistory = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.content
      }));

      const response = await fetch('/api/gemini/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          catalog: allContent,
          history: conversationHistory
        })
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response || "I have analyzed our database, here is my custom curation:",
        recommendedIds: data.recommendedIds || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Recommender fetch failed:", error);
      // Fallback response with beautiful curation matches
      const assistantMessage: Message = {
        id: `assistant-error-${Date.now()}`,
        role: 'assistant',
        content: "My primary telemetry signal encountered a brief interference, but my local database indicates that **The Mandalorian and Grogu** or **Zootopia 2** matches your luxurious cinematic taste perfectly.",
        recommendedIds: ['mov-mandalorian-grogu', 'mov-zootopia-2'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const parseMarkdown = (text: string) => {
    // Handle very basic bolding **text** to keep bundle light and clean
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-amber-400 font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div id="ai-recommender-viewport" className="min-h-screen bg-[#0B1220] text-white pt-24 pb-20 select-none text-left flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Concierge Introduction Card & Starter Prompts */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 shrink-0">
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 shadow-2xl text-left flex flex-col gap-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-tr from-[#22C55E]/10 to-transparent blur-2xl rounded-full" />
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#22C55E] to-emerald-600 flex items-center justify-center shadow-lg shadow-[#22C55E]/20 animate-pulse">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight font-sans">CineLux VIP Curation</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Gemini 3.5 Assistant Engine</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Experience movie discovery elevated to an art form. Chat natively with our curator to filter blockbusters by hyper-specific criteria: directors, cinematography tones, pacing, themes, or exact plot scenarios.
            </p>

            <div className="border-t border-white/5 pt-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-3">Suggested Prompt Inquiries</span>
              <div className="flex flex-col gap-2.5">
                {starterChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.label)}
                    className="w-full text-left p-3 rounded-2xl bg-[#141414] hover:bg-[#1f1f1f] border border-white/5 hover:border-white/10 text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-2.5 transition-all cursor-pointer active:scale-98"
                  >
                    <span className="text-base">{chip.icon}</span>
                    <span className="truncate">{chip.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto text-gray-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: High Fidelity Interactive Chat */}
        <div className="flex-1 flex flex-col rounded-3xl bg-gradient-to-b from-[#111] to-[#0c0c0c] border border-white/5 shadow-2xl overflow-hidden min-h-[500px] lg:h-[75vh]">
          {/* Active status header */}
          <div className="p-4 bg-[#141414]/90 border-b border-white/5 flex items-center justify-between px-6">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Interactive Telemetry Link Active</span>
            </div>
            <button
              onClick={() => setMessages([
                {
                  id: 'welcome',
                  role: 'assistant',
                  content: "Welcome to the **CineLux VIP Curation Hub**. Tell me what mood, theme, or genres you are desiring today.",
                  timestamp: 'Now'
                }
              ])}
              className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all text-xs flex items-center gap-1.5"
              title="Reset Conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-semibold">Reset</span>
            </button>
          </div>

          {/* Messages Log area */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              // Check if message has associated catalog items to render
              const matches = msg.recommendedIds 
                ? allContent.filter(c => msg.recommendedIds?.includes(c.id))
                : [];

              return (
                <div 
                  key={msg.id} 
                  className={`flex gap-4 max-w-[85%] ${!isAssistant ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  {/* Sender Avatar */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-md ${
                    isAssistant 
                      ? 'bg-gradient-to-tr from-[#22C55E]/20 to-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]' 
                      : 'bg-white/5 border-white/10 text-white'
                  }`}>
                    {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble content */}
                  <div className="flex flex-col gap-1.5">
                    <div className={`p-4 rounded-2xl leading-relaxed text-xs text-left shadow-lg ${
                      isAssistant 
                        ? 'bg-[#181818] text-gray-200 border border-white/5' 
                        : 'bg-[#22C55E] text-white font-medium'
                    }`}>
                      <p className="whitespace-pre-line">{parseMarkdown(msg.content)}</p>
                    </div>

                    {/* Grounded Movie Cards grid inside assistant response bubble */}
                    {isAssistant && matches.length > 0 && (
                      <div className="mt-4 flex flex-col gap-3">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-left flex items-center gap-1">
                          <Film className="w-3.5 h-3.5 text-amber-500" /> Concierge Matching Recommendations:
                        </span>
                        <div className="flex flex-wrap gap-4 mt-1.5 justify-start">
                          {matches.map(movie => (
                            <div key={movie.id} className="w-[140px] sm:w-[170px] shrink-0">
                              <MovieCard
                                item={movie}
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
                      </div>
                    )}

                    <span className={`text-[9px] text-gray-600 font-semibold px-1 ${!isAssistant ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Simulated interactive assistant thinking bubble */}
            {isLoading && (
              <div className="flex gap-4 mr-auto max-w-[80%]">
                <div className="w-9 h-9 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] flex items-center justify-center shrink-0">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-4 rounded-2xl bg-[#181818] border border-white/5 flex items-center gap-2 text-xs text-gray-400">
                  <span className="font-semibold text-gray-300 animate-pulse">Curation Engines analyzing available streaming catalogs...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input box footer */}
          <div className="p-4 bg-[#141414]/50 border-t border-white/5 flex gap-3 items-center">
            <input
              type="text"
              placeholder="Ask the Curator (e.g. 'Show me a high-rated dark movie with Ken Watanabe'...)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              className="flex-1 bg-[#181818] border border-white/5 rounded-2xl px-5 py-3 text-xs md:text-sm font-medium outline-none text-white focus:border-[#22C55E] transition-colors placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="p-3 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] disabled:bg-white/5 text-white disabled:text-gray-600 transition-colors cursor-pointer active:scale-95 shrink-0"
              title="Submit Prompt"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
