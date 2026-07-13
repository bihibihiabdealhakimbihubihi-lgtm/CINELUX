/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Mail, 
  HelpCircle, 
  Info, 
  AlertTriangle,
  Lock,
  Globe,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';

export type InfoSection = 'about' | 'faq' | 'privacy' | 'terms' | 'dmca' | 'cookie' | 'contact';

interface InfoHubProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: InfoSection;
}

export default function InfoHub({
  isOpen,
  onClose,
  initialSection = 'about',
}: InfoHubProps) {
  const [activeSection, setActiveSection] = useState<InfoSection>(initialSection);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const menuItems = [
    { id: 'about', label: 'About CineLux', icon: Info },
    { id: 'faq', label: 'Help & FAQ', icon: HelpCircle },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms', label: 'Terms of Membership', icon: FileText },
    { id: 'dmca', label: 'DMCA Compliance', icon: AlertTriangle },
    { id: 'cookie', label: 'Cookie Policy', icon: Lock },
    { id: 'contact', label: 'Elite Support Hub', icon: Mail },
  ] as const;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', message: '' });
      setContactSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="info-hub-modal"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 select-none"
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full max-w-5xl h-[85vh] md:h-[80vh] rounded-3xl bg-[#101010] border border-white/5 flex flex-col md:flex-row overflow-hidden shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all z-20 cursor-pointer"
            title="Close Portal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side menu navigation */}
          <div className="w-full md:w-1/4 bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/5 p-6 shrink-0 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              {/* Logo / Brand */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E50914] flex items-center justify-center font-bold text-white text-base">
                  C
                </div>
                <span className="font-sans text-sm font-bold tracking-widest text-white uppercase">CineLux Portal</span>
              </div>

              {/* Menu items */}
              <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-1.5 pb-3 md:pb-0 scrollbar-none">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom active indicators */}
            <div className="hidden md:flex flex-col gap-1 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
              <span>Secure Transport Enforced</span>
              <span className="text-[#E50914]">TLS 1.3 Active</span>
            </div>
          </div>

          {/* Right Side Content Display */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 text-left bg-[#101010] relative">
            
            {/* ABOUT US VIEW */}
            {activeSection === 'about' && (
              <div className="flex flex-col gap-6 font-sans">
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Cinema Transcended</span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">The CineLux Mission</h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Founded in 2026, CineLux was created by a collective of filmmakers, hardware engineers, and software architects who refused to accept standard web compression limits. We believe that cinema is a sacred art, and serving it in low-bitrate packages is an injustice to the creators.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h3 className="text-xs font-bold text-white mb-1.5">Direct Bitstream Delivery</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">Our customized CDN networks bypass browser throttling, delivering true 4K video signals with minimal quantization noise.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h3 className="text-xs font-bold text-white mb-1.5">Curator First Curation</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">We don't use simple popularity algorithms to dictate what you see. Every blockbuster is selected manually by experienced film historians.</p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> Global CDN Edge Locations: 48</span>
                  <span>Version 4.2 Cinematic</span>
                </div>
              </div>
            )}

            {/* HELP & FAQ VIEW */}
            {activeSection === 'faq' && (
              <div className="flex flex-col gap-6">
                <span className="text-[10px] text-[#E50914] font-bold uppercase tracking-widest">Support Core</span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">Frequently Inquired</h2>
                
                <div className="flex flex-col gap-4">
                  {[
                    {
                      q: "What makes CineLux different from other streaming packages?",
                      a: "CineLux is engineered as a film discovery and raw metadata delivery platform. We serve cinematic blockbusters in extreme high-fidelity 4K Ultra HD and Dolby Atmos formats, coupled with an AI-curator grounded natively in our library."
                    },
                    {
                      q: "How many devices can stream simultaneously?",
                      a: "Depending on your elite membership tier, our VIP package supports up to 8 concurrent screens with full resolution parity. You can manage active devices in your Account panel."
                    },
                    {
                      q: "How do I download contents for offline viewing?",
                      a: "Offline synchronization is available natively on our mobile and iPad platforms. Simply press the download icon on any poster when using our native iOS or Android software."
                    },
                    {
                      q: "Is there a contract or cancelation fee?",
                      a: "Absolutely not. CineLux operates as a transparent monthly streaming club. You can toggle or deactivate your subscription directly from your user dashboard with a single click."
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <h3 className="text-xs font-bold text-white mb-1.5 flex items-start gap-2">
                        <span className="text-[#E50914] font-black">Q.</span>
                        <span>{faq.q}</span>
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed pl-5">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRIVACY POLICY VIEW */}
            {activeSection === 'privacy' && (
              <div className="flex flex-col gap-6 text-xs text-gray-300 leading-relaxed font-sans">
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Privacy Ledger</span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">Privacy & Data Governance</h2>
                
                <p><strong>Effective Date: July 9, 2026</strong></p>
                <p>
                  At CineLux, we treat user privacy with identical standards to our visual components. Your viewing history, search parameters, and catalog telemetry belong exclusively to you.
                </p>

                <h3 className="text-sm font-bold text-white mt-2">1. Data Minimization Principles</h3>
                <p>
                  We store only the minimum details required to sustain cross-device progress synchronization: your chosen username, subscription token, and localStorage watch-history lists. We do not sell, trade, or distribute telemetry packets to advertisers.
                </p>

                <h3 className="text-sm font-bold text-white mt-2">2. GDPR & CCPA Compliance</h3>
                <p>
                  If you reside in the European Economic Area or California, you maintain absolute rights to request a complete machine-readable copy of your profile metrics, or invoke an irreversible deletion of your account.
                </p>

                <h3 className="text-sm font-bold text-white mt-2">3. Cryptographic Storage</h3>
                <p>
                  All active user states are encrypted using SHA-256 standard digests before synchronization with local memory systems.
                </p>
              </div>
            )}

            {/* TERMS OF SERVICE VIEW */}
            {activeSection === 'terms' && (
              <div className="flex flex-col gap-6 text-xs text-gray-300 leading-relaxed font-sans">
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Membership Contract</span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">Terms of Membership</h2>
                
                <p>Welcome to CineLux. By initiating an elite membership, you agree to comply with the following operational conditions:</p>

                <h3 className="text-sm font-bold text-white mt-2">1. Acceptable Content Usage</h3>
                <p>
                  CineLux services are restricted to personal, non-commercial streaming within residential spaces. You are strictly forbidden from mirroring our bitstreams for public screening or using automated tools to scrape media assets from our content delivery network.
                </p>

                <h3 className="text-sm font-bold text-white mt-2">2. Intellectual Property Rights</h3>
                <p>
                  All movie posters, trailer files, backdrops, and descriptive synopses remain the exclusive property of CineLux or its respective licensing studios.
                </p>

                <h3 className="text-sm font-bold text-white mt-2">3. Subscription Billing & Auto-renewals</h3>
                <p>
                  Subscription fees are debited on a recurring 30-day billing sequence. You can manage or pause automatic renewals inside your dashboard at any time.
                </p>
              </div>
            )}

            {/* DMCA VIEW */}
            {activeSection === 'dmca' && (
              <div className="flex flex-col gap-6 text-xs text-gray-300 leading-relaxed font-sans">
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Legal Protection</span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">DMCA & Copyright Policy</h2>
                
                <p>
                  CineLux respects the proprietary claims of artists, directors, and film studios. We comply strictly with the terms of the Digital Millennium Copyright Act of 1998 (DMCA).
                </p>

                <p>
                  If you identify any content on our discovery index that you believe infringes upon a valid patent or trademark, you may file a notice of infringement to our legal liaison with the following components:
                </p>

                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li>An electronic or physical signature of the authorized copyright owner.</li>
                  <li>Identification of the copyrighted masterpiece claimed to have been infringed.</li>
                  <li>Accurate contact information including mailing address, phone, and active email.</li>
                  <li>A statement of good faith belief indicating that the material is unauthorized.</li>
                </ul>

                <p className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-200">
                  <strong>Submit claims to:</strong> legal@cinelux-premium.stream. All formal legal filings will be processed within 48 business hours.
                </p>
              </div>
            )}

            {/* COOKIE POLICY VIEW */}
            {activeSection === 'cookie' && (
              <div className="flex flex-col gap-6 text-xs text-gray-300 leading-relaxed font-sans">
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Cookie Protocols</span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">Cookie & State Policy</h2>
                
                <p>
                  CineLux uses cookies and local browser memory modules (localStorage) exclusively to sustain your session states and enhance discovery response latency. We do not place trackers for secondary cross-site advertising.
                </p>

                <table className="w-full mt-2 text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-white font-bold text-xs">
                      <th className="pb-2">Cookie Name</th>
                      <th className="pb-2">Domain Target</th>
                      <th className="pb-2">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-400">
                    <tr>
                      <td className="py-2 font-mono text-[10px]">cinelux_current_user</td>
                      <td className="py-2">Local Storage</td>
                      <td className="py-2">Remembers active sign-in tokens & profile layouts</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-[10px]">cinelux_custom_content</td>
                      <td className="py-2">Local Storage</td>
                      <td className="py-2">Sustains custom movies entered via Admin Dashboard</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-[10px]">cinelux_search_history</td>
                      <td className="py-2">Local Storage</td>
                      <td className="py-2">Saves recent search terms for rapid recall</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* CONTACT support form */}
            {activeSection === 'contact' && (
              <div className="flex flex-col gap-6">
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">VIP Concierge</span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">Elite Support Hub</h2>
                
                {contactSubmitted ? (
                  <div className="py-12 text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Transmission Received</h3>
                    <p className="text-xs text-gray-400">An elite support counselor will contact your registered membership email within 2 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      If you are experiencing any CDN delivery delays, billing discrepancies, or wish to propose movie licensing, please send a direct transmission below.
                    </p>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Adrian Vance"
                        className="bg-[#181818] border border-white/5 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none text-white focus:border-[#E50914] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Registered Email</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="adrian@cinelux.com"
                        className="bg-[#181818] border border-white/5 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none text-white focus:border-[#E50914] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Transmission Message</label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Write your elite inquiries here..."
                        className="bg-[#181818] border border-white/5 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none text-white focus:border-[#E50914] transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full py-3 rounded-xl bg-[#E50914] hover:bg-[#ff1622] text-xs font-bold uppercase tracking-wider text-white transition-all hover:shadow-lg hover:shadow-[#E50914]/15 cursor-pointer active:scale-98"
                    >
                      Transmit Message
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
