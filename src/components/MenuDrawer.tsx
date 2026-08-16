import React from 'react';
import { X, Compass, Globe, Luggage, Heart, Shield, Mail, Phone, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab, ContinentRegion } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  regions: ContinentRegion[];
  currentRegionIndex: number;
  onSelectRegion: (index: number) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  regions,
  currentRegionIndex,
  onSelectRegion,
  onNavigateTab,
}) => {
  if (!isOpen) return null;

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
        className="w-full max-w-md bg-neutral-900 border-l border-white/15 h-full p-8 flex flex-col justify-between overflow-y-auto text-white"
      >
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full border border-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <span className="text-lg font-bold font-['Outfit',sans-serif]">AroundMe</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Continents & Regions Switcher */}
          <div className="mt-8">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-3">
              Explore Continents
            </span>
            <div className="space-y-2">
              {regions.map((region, idx) => (
                <button
                  key={region.id}
                  onClick={() => {
                    onSelectRegion(idx);
                    onNavigateTab('home');
                    onClose();
                  }}
                  className={`w-full p-3 rounded-2xl text-left flex items-center justify-between transition-all cursor-pointer ${
                    idx === currentRegionIndex
                      ? 'bg-emerald-950/80 border border-emerald-500/50 text-white font-bold'
                      : 'bg-neutral-800/40 hover:bg-neutral-800 border border-white/5 text-neutral-300'
                  }`}
                >
                  <span className="text-base font-['Outfit',sans-serif]">{region.name}</span>
                  <span className="text-xs text-neutral-400 font-mono">0{region.indexNum} / 06</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Navigation Links */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-sm">
            <button
              onClick={() => { onNavigateTab('destinations'); onClose(); }}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>All Destinations Catalog</span>
            </button>
            <button
              onClick={() => { onNavigateTab('trips'); onClose(); }}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <Luggage className="w-4 h-4 text-emerald-400" />
              <span>My Trips & Itineraries</span>
            </button>
            <button
              onClick={() => { onNavigateTab('favorites'); onClose(); }}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Saved Favorites</span>
            </button>
            <button
              onClick={() => { onNavigateTab('news'); onClose(); }}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Travel Stories & News</span>
            </button>
            <button
              onClick={() => { onNavigateTab('contact'); onClose(); }}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Concierge & Contact</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-white/10 text-xs text-neutral-400">
          <p className="font-light">AroundMe Curated Travel Experience</p>
          <p className="text-[11px] text-neutral-500 mt-1">24/7 Global Sanctuary Concierge</p>
        </div>
      </motion.div>
    </div>
  );
};
