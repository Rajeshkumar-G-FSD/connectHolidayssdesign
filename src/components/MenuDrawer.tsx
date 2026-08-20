import React from 'react';
import {
  X, Home, Info, Compass, Package, Stamp, PlaneTakeoff, Hotel, ShieldCheck,
  Images, Newspaper, HelpCircle, MessageSquareQuote, MessageCircle,
  Luggage, Heart, Facebook, Instagram,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ActiveTab, ContinentRegion } from '../types';

const FACEBOOK_URL = 'https://www.facebook.com/connectholidaysserd/';
const INSTAGRAM_URL = 'https://www.instagram.com/connect_holidayss/';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  regions: ContinentRegion[];
  currentRegionIndex: number;
  onSelectRegion: (index: number) => void;
  onNavigateTab: (tab: ActiveTab) => void;
  savedCount: number;
  tripsCount: number;
}

const MAIN_LINKS: { tab: ActiveTab; label: string; icon: React.ElementType; color: string }[] = [
  { tab: 'home', label: 'Home', icon: Home, color: 'text-emerald-400' },
  { tab: 'about', label: 'About Us', icon: Info, color: 'text-sky-400' },
  { tab: 'destinations', label: 'Destinations', icon: Compass, color: 'text-emerald-400' },
  { tab: 'tour-packages', label: 'Tour Packages', icon: Package, color: 'text-amber-400' },
  { tab: 'visa-services', label: 'Visa Services', icon: Stamp, color: 'text-violet-400' },
  { tab: 'flight-booking', label: 'Flight Booking', icon: PlaneTakeoff, color: 'text-blue-400' },
  { tab: 'hotel-booking', label: 'Hotel Booking', icon: Hotel, color: 'text-blue-400' },
  { tab: 'travel-insurance', label: 'Travel Insurance', icon: ShieldCheck, color: 'text-emerald-400' },
  { tab: 'gallery', label: 'Gallery', icon: Images, color: 'text-pink-400' },
  { tab: 'blog', label: 'Blog', icon: Newspaper, color: 'text-sky-400' },
  { tab: 'faq', label: 'FAQ', icon: HelpCircle, color: 'text-amber-400' },
  { tab: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, color: 'text-rose-400' },
  { tab: 'contact', label: 'Contact', icon: MessageCircle, color: 'text-emerald-400' },
];

const LEGAL_LINKS: { tab: ActiveTab; label: string }[] = [
  { tab: 'privacy-policy', label: 'Privacy Policy' },
  { tab: 'terms-conditions', label: 'Terms & Conditions' },
  { tab: 'cancellation-policy', label: 'Cancellation Policy' },
];

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  regions,
  currentRegionIndex,
  onSelectRegion,
  onNavigateTab,
  savedCount,
  tripsCount,
}) => {
  if (!isOpen) return null;

  const go = (tab: ActiveTab) => {
    onNavigateTab(tab);
    onClose();
  };

  return (
    <div
      id="menu-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-end"
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-neutral-900 border-l border-white/15 h-full flex flex-col text-white"
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <img src="/images/connect_holidayss.png" alt="Connect Holidayss" className="h-8 w-auto" />
            <span className="text-lg font-bold font-['Outfit',sans-serif]">Connect Holidayss</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8">

          {/* Main site navigation */}
          <div className="mt-6">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-3">Menu</span>
            <div className="space-y-1">
              {MAIN_LINKS.map((link) => (
                <button
                  key={link.tab}
                  onClick={() => go(link.tab)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left cursor-pointer text-sm"
                >
                  <link.icon className={`w-4 h-4 shrink-0 ${link.color}`} />
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Continents & Regions Switcher */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-3">
              Explore Destinations
            </span>
            <div className="space-y-2">
              {regions.map((region, idx) => (
                <button
                  key={region.id}
                  onClick={() => {
                    onSelectRegion(idx);
                    go('home');
                  }}
                  className={`w-full p-3 rounded-2xl text-left flex items-center justify-between transition-all cursor-pointer ${
                    idx === currentRegionIndex
                      ? 'bg-emerald-950/80 border border-emerald-500/50 text-white font-bold'
                      : 'bg-neutral-800/40 hover:bg-neutral-800 border border-white/5 text-neutral-300'
                  }`}
                >
                  <span className="text-base font-['Outfit',sans-serif]">{region.name}</span>
                  <span className="text-xs text-neutral-400 font-mono">0{region.indexNum} / 0{region.totalNum}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Utility: Trips & Favorites */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-1 text-sm">
            <button
              onClick={() => go('trips')}
              className="w-full flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <Luggage className="w-4 h-4 text-emerald-400" />
                <span>My Trips & Itineraries</span>
              </span>
              {tripsCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-white/10 text-emerald-300">{tripsCount}</span>
              )}
            </button>
            <button
              onClick={() => go('favorites')}
              className="w-full flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Saved Favorites</span>
              </span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-white/10 text-emerald-300">{savedCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-8 pt-6 pb-8 border-t border-white/10 text-xs text-neutral-400 shrink-0">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
            {LEGAL_LINKS.map((link) => (
              <button
                key={link.tab}
                onClick={() => go(link.tab)}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-4">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Connect Holidayss on Facebook"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center text-white transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Connect Holidayss on Instagram"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] flex items-center justify-center text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="font-light">Connect Holidayss Curated Travel Experience</p>
          <p className="text-[11px] text-neutral-500 mt-1">We Lead, You Relax</p>
        </div>
      </motion.div>
    </div>
  );
};
