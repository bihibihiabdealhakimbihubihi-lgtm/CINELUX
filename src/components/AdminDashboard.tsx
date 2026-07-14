/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Tv, 
  Activity, 
  PlusCircle, 
  UploadCloud, 
  Trash2, 
  Settings, 
  Layers, 
  Video, 
  MessageSquare, 
  Check, 
  Settings2,
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { ContentItem } from '../types';

interface AdminDashboardProps {
  allContent: ContentItem[];
  onAddContent: (newMovie: ContentItem) => void;
  onDeleteContent: (id: string) => void;
}

interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  timestamp: string;
  status: 'success' | 'warn' | 'error';
}

const SEEDED_LOGS: AuditLog[] = [
  { id: 'l1', user: 'Adrian Vance', role: 'SuperAdmin', action: 'Overrode CDN buffer limit to 400MB', timestamp: '3 minutes ago', status: 'success' },
  { id: 'l2', user: 'Gemini CineCortex', role: 'AI Engine', action: 'Regenerated weekly semantic suggestions matrix', timestamp: '1 hour ago', status: 'success' },
  { id: 'l3', user: 'Firewall Daemon', role: 'System', action: 'Blocked rate-limiting spike from 142.250.74.46', timestamp: '4 hours ago', status: 'warn' },
  { id: 'l4', user: 'Staff-Editor-03', role: 'Moderator', action: 'Removed flagged comment on "Autumn in Florence"', timestamp: '1 day ago', status: 'success' },
];

export default function AdminDashboard({
  allContent,
  onAddContent,
  onDeleteContent,
}: AdminDashboardProps) {
  // New Movie Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'movie' | 'series'>('movie');
  const [newOverview, setNewOverview] = useState('');
  const [newYear, setNewYear] = useState(2026);
  const [newRuntime, setNewRuntime] = useState(120);
  const [newGenres, setNewGenres] = useState('Sci-Fi, Thriller');
  const [newPoster, setNewPoster] = useState('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop');
  const [newBackdrop, setNewBackdrop] = useState('https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop');
  const [newRating, setNewRating] = useState(8.5);
  const [newDirector, setNewDirector] = useState('Christopher Nolan');
  const [newAgeRating, setNewAgeRating] = useState<'G' | 'PG' | 'PG-13' | 'R' | 'NC-17' | 'TV-MA'>('PG-13');

  const [isSuccessMsg, setIsSuccessMsg] = useState(false);
  const [logs, setLogs] = useState<AuditLog[]>(SEEDED_LOGS);

  const handleSubmitContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newOverview.trim()) return;

    const movie: ContentItem = {
      id: `mov-custom-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      description: newOverview.trim(),
      overview: newOverview.trim(),
      poster: newPoster.trim(),
      backdrop: newBackdrop.trim(),
      rating: newRating,
      year: newYear,
      runtime: newRuntime,
      genres: newGenres.split(',').map((g) => g.trim()),
      quality: '4K Ultra HD',
      audioQuality: 'Dolby Atmos',
      country: 'United States',
      language: 'English',
      ageRating: newAgeRating,
      director: newDirector.trim(),
      producer: 'Universal Studio Group',
      writers: [newDirector.trim()],
      cast: [
        { name: 'Cillian Murphy', character: 'Lead Actor', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
      ],
      awards: ['Academy Award Nominee'],
      reviews: [],
      comments: [],
      releaseDate: `${newYear}-01-01`,
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    };

    onAddContent(movie);

    // Append to logs
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      user: 'Adrian Vance',
      role: 'SuperAdmin',
      action: `Created & published new ${newType} "${newTitle}" to catalog`,
      timestamp: 'Just now',
      status: 'success',
    };
    setLogs([newLog, ...logs]);

    // Reset Form
    setNewTitle('');
    setNewOverview('');
    setIsSuccessMsg(true);
    setTimeout(() => setIsSuccessMsg(false), 3000);
  };

  return (
    <div id="admin-dashboard-container" className="min-h-screen bg-[#0B1220] text-white pt-24 pb-20 select-none text-left">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Row 1: Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/5 pb-5">
          <div>
            <h1 className="font-sans text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <ShieldAlert className="w-8 h-8 text-[#22C55E] animate-pulse" /> Platform Admin Operations
            </h1>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">
              Live server nodes: 2 Active • Region: Europe-West2
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl text-gray-300 font-semibold">
            <Calendar className="w-4 h-4 text-[#22C55E]" />
            Session Date: July 9, 2026
          </div>
        </div>

        {/* Row 2: Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-[#111111] border border-white/5 shadow-md flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Monthly Revenue</span>
              <p className="text-2xl font-bold text-white mt-1">$148,502</p>
              <span className="text-[10px] text-[#16C784] font-bold mt-1 inline-block">↑ 14.5% vs Last Month</span>
            </div>
            <div className="p-3 rounded-xl bg-[#16C784]/10 text-[#16C784]">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#111111] border border-white/5 shadow-md flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Subscribers</span>
              <p className="text-2xl font-bold text-white mt-1">9,842</p>
              <span className="text-[10px] text-[#16C784] font-bold mt-1 inline-block">↑ 8.2% Concurrent Streams</span>
            </div>
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#111111] border border-white/5 shadow-md flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Media Assets</span>
              <p className="text-2xl font-bold text-white mt-1">{allContent.length}</p>
              <span className="text-[10px] text-gray-400 mt-1 inline-block">254 CDN Nodes Engaged</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <Tv className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#111111] border border-white/5 shadow-md flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Server CPU Load</span>
              <p className="text-2xl font-bold text-white mt-1">24.2%</p>
              <span className="text-[10px] text-[#16C784] font-bold mt-1 inline-block">Optimized Docker Environs</span>
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Row 3: Custom Interactive SVG Chart */}
        <div className="p-6 rounded-3xl bg-[#111111]/80 border border-white/5 mb-10 text-left shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Subscriber Growth Curve</h3>
              <p className="text-xs text-gray-500 mt-0.5">Live platform stats for Q1/Q2 2026</p>
            </div>
            <span className="px-3 py-1 rounded bg-[#22C55E]/15 border border-[#22C55E]/30 text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">
              Live Feed
            </span>
          </div>

          {/* Premium custom SVG chart */}
          <div className="w-full h-64 relative bg-[#0b0b0b] rounded-2xl p-4 flex items-end">
            <svg className="w-full h-full text-gray-700" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

              {/* Area Under Curve */}
              <path
                d="M 0 100 L 0 85 L 15 75 L 30 68 L 45 55 L 60 45 L 75 30 L 90 22 L 100 12 L 100 100 Z"
                fill="url(#gradient-area)"
              />
              {/* Curve Line */}
              <path
                d="M 0 85 L 15 75 L 30 68 L 45 55 L 60 45 L 75 30 L 90 22 L 100 12"
                fill="none"
                stroke="#22C55E"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <defs>
                <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Labels overlay */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none text-[10px] font-mono text-gray-500">
              <div className="text-right">10k Users</div>
              <div className="text-right">5k Users</div>
              <div className="text-right">0 Users</div>
            </div>

            <div className="absolute bottom-2 left-0 right-0 px-8 flex justify-between text-[10px] font-mono text-gray-500">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </div>
        </div>

        {/* Row 4: Two Column Grid (Uploader / Audit Logs & Media Manager) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Column A: Interactive Media Uploader Form */}
          <div className="p-6 rounded-3xl bg-[#111111]/80 border border-white/5 shadow-xl flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-[#22C55E]" /> Media Content Uploader
              </h2>
              <p className="text-xs text-gray-500 mt-1">Publish movies or series directly to the live catalog.</p>
            </div>

            {isSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-[#16C784]/15 border border-[#16C784]/30 text-xs text-[#16C784] font-semibold flex items-center gap-2">
                <Check className="w-4.5 h-4.5" /> Content published successfully! Catalog refreshed.
              </div>
            )}

            <form onSubmit={handleSubmitContent} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Oppenheimer"
                    className="bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none focus:border-[#22C55E]"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="bg-black border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white outline-none cursor-pointer focus:border-[#22C55E]"
                  >
                    <option value="movie">Feature Movie</option>
                    <option value="series">TV Series</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Synopsis Overview</label>
                <textarea
                  required
                  rows={3}
                  value={newOverview}
                  onChange={(e) => setNewOverview(e.target.value)}
                  placeholder="Explain the storyline, plot pacing, and main hook..."
                  className="bg-black border border-white/5 rounded-xl p-4 text-xs text-white placeholder-gray-600 outline-none focus:border-[#22C55E] resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Year</label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(parseInt(e.target.value))}
                    className="bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Runtime (min)</label>
                  <input
                    type="number"
                    value={newRuntime}
                    onChange={(e) => setNewRuntime(parseInt(e.target.value))}
                    className="bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRating}
                    onChange={(e) => setNewRating(parseFloat(e.target.value))}
                    className="bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Director</label>
                  <input
                    type="text"
                    value={newDirector}
                    onChange={(e) => setNewDirector(e.target.value)}
                    className="bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Age Rating</label>
                  <select
                    value={newAgeRating}
                    onChange={(e) => setNewAgeRating(e.target.value as any)}
                    className="bg-black border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  >
                    <option value="PG-13">PG-13</option>
                    <option value="R">R (Mature)</option>
                    <option value="G">G (General)</option>
                    <option value="PG">PG</option>
                    <option value="TV-MA">TV-MA</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Genres (comma separated)</label>
                <input
                  type="text"
                  value={newGenres}
                  onChange={(e) => setNewGenres(e.target.value)}
                  placeholder="e.g. Action, Sci-Fi, Thriller"
                  className="bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Landscape Backdrop URL</label>
                <input
                  type="text"
                  value={newBackdrop}
                  onChange={(e) => setNewBackdrop(e.target.value)}
                  className="bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Poster Portrait URL</label>
                <input
                  type="text"
                  value={newPoster}
                  onChange={(e) => setNewPoster(e.target.value)}
                  className="bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-[#22C55E]/15 hover:scale-[1.01] cursor-pointer"
              >
                Upload & Publish Media
              </button>
            </form>
          </div>

          {/* Column B: Audit Logs & Existing Media Manager */}
          <div className="flex flex-col gap-10">
            {/* Part 1: Platform Audit Logs */}
            <div className="p-6 rounded-3xl bg-[#111111]/80 border border-white/5 shadow-xl flex flex-col gap-4 text-left">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-gray-400" /> Platform Audit Trail
                </h2>
                <p className="text-xs text-gray-500 mt-1">Direct terminal logs from Admin & AI agents.</p>
              </div>

              <div className="flex flex-col gap-3.5 max-h-80 overflow-y-auto pr-1">
                {logs.map((log) => (
                  <div key={log.id} className="p-3.5 rounded-xl bg-black/60 border border-white/5 flex items-start gap-3 text-xs leading-relaxed">
                    <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                      log.status === 'success' ? 'bg-[#16C784]' : 'bg-amber-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-gray-300">{log.user} ({log.role})</span>
                        <span className="text-[10px] text-gray-500">{log.timestamp}</span>
                      </div>
                      <p className="text-gray-400 font-normal">{log.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 2: Quick Media Asset Deleter */}
            <div className="p-6 rounded-3xl bg-[#111111]/80 border border-white/5 shadow-xl flex flex-col gap-4 text-left">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-gray-400" /> Catalog Asset Manager
                </h2>
                <p className="text-xs text-gray-500 mt-1">Safely list and de-commission streaming assets.</p>
              </div>

              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
                {allContent.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={item.poster} alt={item.title} className="w-8 aspect-[2/3] object-cover rounded" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                        <p className="text-[10px] text-gray-500 font-semibold">{item.type} • {item.year}</p>
                      </div>
                    </div>
                    
                    {/* Delete asset button */}
                    <button
                      onClick={() => onDeleteContent(item.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer border border-red-500/10"
                      title="Decommission Asset"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
