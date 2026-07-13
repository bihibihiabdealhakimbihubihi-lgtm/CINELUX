/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  Activity,
  Clock,
  Lock, 
  Shield, 
  Trash2, 
  Globe, 
  Sliders, 
  Eye, 
  Check, 
  Camera, 
  Smartphone, 
  Laptop, 
  KeyRound, 
  Bell,
  CheckCircle,
  EyeOff
} from 'lucide-react';
import { UserProfile } from '../types';

interface UserAccountProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onLogout: () => void;
}

export default function UserAccount({
  user,
  onUpdateUser,
  onLogout,
}: UserAccountProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'activity' | 'devices' | 'security'>('profile');
  
  // Profile Form States
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [lang, setLang] = useState(user.language);
  const [notif, setNotif] = useState(user.notificationsEnabled);
  const [avatar, setAvatar] = useState(user.avatar);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Connected Devices state
  const [devices, setDevices] = useState(user.devices || []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      language: lang,
      notificationsEnabled: notif,
      avatar,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleRevokeDevice = (id: string) => {
    const updated = devices.filter((d) => d.id !== id);
    setDevices(updated);
    onUpdateUser({
      ...user,
      devices: updated,
    });
  };

  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  ];

  const sidebarItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'activity', label: 'Activity & Analytics', icon: Activity },
    { id: 'devices', label: 'Streaming Devices', icon: Smartphone },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
  ] as const;

  return (
    <div id="user-profile-account-view" className="min-h-screen bg-[#070707] text-white pt-24 pb-20 select-none text-left">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Page title */}
        <div className="mb-10 text-left">
          <h1 className="font-sans text-3xl font-bold tracking-tight text-white">
            Security & Account Center
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">
            Manage credentials, streaming devices, and personalized theater diagnostics
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          
          {/* LEFT COLUMN: NAVIGATION SIDEBAR */}
          <div className="flex flex-col gap-1.5 p-2 rounded-2xl bg-[#111111] border border-white/5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3.5 transition-all ${
                    isActive
                      ? 'text-white bg-[#E50914] shadow-md shadow-[#E50914]/15'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {item.label}
                </button>
              );
            })}

            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-3 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 flex items-center gap-3.5 border-t border-white/5 mt-2 transition-all"
            >
              <Lock className="w-4.5 h-4.5" />
              Sign Out Account
            </button>
          </div>

          {/* RIGHT COLUMN: ACTIVE TAB PANEL */}
          <div className="md:col-span-3 min-h-[450px] p-6 md:p-8 rounded-3xl bg-[#111111] border border-white/5 shadow-xl">
            
            {/* TAB 1: PROFILE MANAGEMENT */}
            {activeTab === 'profile' && (
              <div className="flex flex-col gap-6 text-left">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-[#E50914]" /> Profile Management
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Configure your personal streamer identity and system notifications.</p>
                </div>

                {saveSuccess && (
                  <div className="p-3.5 rounded-xl bg-[#16C784]/15 border border-[#16C784]/30 text-xs text-[#16C784] font-semibold flex items-center gap-2">
                    <CheckCircle className="w-4.5 h-4.5" /> Account information updated successfully!
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                  {/* Avatar Picker */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Profile Icon / Avatar</label>
                    <div className="flex items-center gap-4 flex-wrap">
                      <img src={avatar} alt="Current" className="w-16 h-16 rounded-full object-cover border-2 border-[#E50914] shadow-md" />
                      <div className="flex gap-2">
                        {avatarPresets.map((p, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setAvatar(p)}
                            className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                              avatar === p ? 'border-amber-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={p} alt="Preset" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Profile Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#E50914]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#E50914]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Global Language</label>
                      <select
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        className="bg-black border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="English">English</option>
                        <option value="Español">Español</option>
                        <option value="Français">Français</option>
                        <option value="日本語">日本語</option>
                        <option value="한국어">한국어</option>
                        <option value="Deutsch">Deutsch</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-black border border-white/5 mt-4 sm:mt-0">
                      <div className="text-left">
                        <p className="text-xs font-bold text-white">System Notifications</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Push alerts for new episode drops</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notif}
                        onChange={(e) => setNotif(e.target.checked)}
                        className="w-4.5 h-4.5 accent-[#E50914] cursor-pointer"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="self-start px-6 py-3 rounded-xl bg-white hover:bg-gray-200 text-black text-xs font-bold transition-colors shadow-md mt-2 cursor-pointer"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: ACTIVITY & ANALYTICS */}
            {activeTab === 'activity' && (
              <div className="flex flex-col gap-6 text-left">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#E50914]" /> Theater Activity & Diagnostics
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Review active viewing hours, preferred genre configurations, and high-fidelity bitrate statistics.</p>
                </div>

                {/* Statistics Bento Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Theater Projection Time</span>
                    <span className="text-2xl font-black text-white mt-1">2,450 Min</span>
                    <span className="text-[9px] text-emerald-400 font-semibold mt-0.5">↑ 12% increase this week</span>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Stream Quality Decryption</span>
                    <span className="text-2xl font-black text-amber-400 mt-1">4K Ultra HD</span>
                    <span className="text-[9px] text-gray-400 font-semibold mt-0.5">HEVC Main 10 Profile active</span>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Sound Field Configuration</span>
                    <span className="text-2xl font-black text-[#E50914] mt-1">Dolby Atmos</span>
                    <span className="text-[9px] text-gray-400 font-semibold mt-0.5">Spatial multi-channel stream</span>
                  </div>
                </div>

                {/* Genre Preference Distribution */}
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Genre Preference Distribution</h3>
                  <div className="flex flex-col gap-3 p-5 rounded-2xl bg-[#0b0b0b] border border-white/5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-300">Sci-Fi & Mindbending Space Sagas</span>
                        <span className="text-amber-400">45%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-300">Cyberpunk Noir & Action Thrillers</span>
                        <span className="text-[#E50914]">30%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#E50914] rounded-full" style={{ width: '30%' }} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-300">Bespoke TV Series & Dramas</span>
                        <span className="text-blue-400">15%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full" style={{ width: '15%' }} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-300">Award-winning Nature Documentaries</span>
                        <span className="text-emerald-400">10%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: '10%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Streaming Node Status */}
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Streaming Engine Diagnostics</h3>
                  <div className="p-4 rounded-xl bg-black border border-white/5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <div className="text-left">
                        <p className="text-xs font-bold text-white">CineLux Secure CDN Handshake: ACTIVE</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">TLS 1.3 Encryption • Low Latency Frame Buffer Active • Node: UK-LONDON-09</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#16C784]/15 border border-[#16C784]/30 text-[9px] font-semibold text-[#16C784]">
                      OPTIMAL
                    </span>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: STREAMING DEVICES */}
            {activeTab === 'devices' && (
              <div className="flex flex-col gap-6 text-left">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-[#E50914]" /> Streaming Devices ({devices.length})
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">De-authorize and log out active device nodes to free up stream slots.</p>
                </div>

                <div className="flex flex-col gap-3">
                  {devices.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-500">
                      No connected devices found. Please log in on an external node to engage.
                    </div>
                  ) : (
                    devices.map((dev) => (
                      <div key={dev.id} className="p-4 rounded-xl bg-black border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between gap-4 text-left">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-white/5 text-gray-400">
                            {dev.type === 'Smart TV' ? <Smartphone className="w-5 h-5" /> : dev.type === 'Macbook Pro' ? <Laptop className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">{dev.name}</h4>
                              <span className="px-1.5 py-0.5 rounded bg-[#16C784]/15 border border-[#16C784]/30 text-[9px] text-[#16C784] font-semibold">
                                {dev.lastActive}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-0.5">{dev.type} • Located in {dev.location}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRevokeDevice(dev.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/10 hover:border-red-500 transition-colors cursor-pointer"
                          title="Revoke and force logout device"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: SECURITY & PRIVACY */}
            {activeTab === 'security' && (
              <div className="flex flex-col gap-6 text-left">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#E50914]" /> Security Protocols
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Review encryption settings, active session nodes, and privacy guidelines.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black border border-white/5 text-left flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <KeyRound className="w-4 h-4 text-amber-400" /> AES-256 Decryption
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                        Streams are wrapped in a 256-bit Advanced Encryption Standard handshake preventing local node leaks.
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-[#16C784] uppercase">Secure Node Connected</span>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-white/5 text-left flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Bell className="w-4 h-4 text-amber-400" /> Stream Watermarks
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                        To protect copyrights, streams embed dynamic, imperceptible watermarks tied to your active subscriber ID.
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-gray-500 uppercase">Operational</span>
                  </div>
                </div>

                {/* Privacy policy statement link */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-400 leading-relaxed font-normal">
                  <p className="font-bold text-white mb-2">Privacy & GDPR Information</p>
                  CineLux values your privacy. We collect streaming statistics solely to perfect our Gemini AI semantic recommendation grids. We never sell your personal payment card info, and your device log profiles can be cleared at any time from this dashboard panel.
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
