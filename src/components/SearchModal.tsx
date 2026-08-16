import React, { useState } from 'react';
import { Search, X, MapPin, Sparkles, Star, ArrowRight } from 'lucide-react';
import { Destination } from '../types';
import { motion } from 'motion/react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  currency: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  destinations,
  onSelectDestination,
  currency,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularTags = [
    'Nilgiri Hills',
    'Heated Infinity Pool',
    'Costa Rica Rainforest',
    'Amalfi Coast',
    'Private Onsen',
    'Tea Estate',
    'Bali Bamboo',
  ];

  const results = destinations.filter((d) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.tag.toLowerCase().includes(q) ||
      d.vibe.toLowerCase().includes(q) ||
      d.shortDescription.toLowerCase().includes(q)
    );
  });

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-neutral-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white"
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search by destination, country, or experience (e.g. Ooty, Rainforest, Onsen)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-white text-xs px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Popular Trending Tags */}
        <div className="px-6 py-3 bg-neutral-950/50 border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs text-neutral-400">
          <span className="shrink-0 flex items-center gap-1 text-emerald-400 font-semibold">
            <Sparkles className="w-3 h-3" /> Trending:
          </span>
          {popularTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(tag)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-neutral-800/60 hover:bg-emerald-950 hover:text-emerald-300 border border-white/5 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-3">
          {results.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-sm">
              No matching destinations found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((dest) => (
              <div
                key={dest.id}
                onClick={() => {
                  onSelectDestination(dest);
                  onClose();
                }}
                className="group p-3 sm:p-4 rounded-2xl bg-neutral-800/40 hover:bg-neutral-800/90 border border-white/5 hover:border-emerald-500/30 flex items-center justify-between gap-4 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={dest.coverImage}
                    alt={dest.name}
                    className="w-16 h-14 sm:w-20 sm:h-16 object-cover rounded-xl border border-white/10 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block">
                      {dest.tag}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white font-['Outfit',sans-serif] truncate group-hover:text-emerald-300 transition-colors">
                      {dest.name}
                    </h4>
                    <p className="text-xs text-neutral-400 truncate mt-0.5">
                      {dest.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm sm:text-base font-bold text-white font-['Outfit',sans-serif] block">
                    {currency}{dest.pricePerNight}
                  </span>
                  <span className="text-[10px] text-neutral-400">/ night</span>
                  <div className="flex items-center justify-end gap-1 text-[11px] text-amber-400 mt-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{dest.rating}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
