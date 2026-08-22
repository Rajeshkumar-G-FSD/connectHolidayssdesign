import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Globe2, ArrowRight, Grid3X3, Rows3 } from 'lucide-react';
import { TOP_COUNTRIES } from '../data/topCountries';
import { TopCountry } from '../types';
import ThreeDSlider, { SliderItemData } from './lightswind/3d-slider';

const easeOut = [0.16, 1, 0.3, 1] as const;

// Staggered reveal for the header block (badge → title → copy → controls)
const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

interface TopCountriesSectionProps {
  onSelectCountry: (country: TopCountry) => void;
}

export const TopCountriesSection: React.FC<TopCountriesSectionProps> = ({ onSelectCountry }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'carousel' | '3d'>('3d');
  const prefersReducedMotion = useReducedMotion();

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('[data-country-card]') as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : 300;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  // Convert countries to 3D slider format (title, rank number, image)
  const sliderItems: SliderItemData[] = TOP_COUNTRIES.map(country => ({
    title: `${country.flag} ${country.country}`,
    num: country.rank.toString().padStart(2, '0'),
    imageUrl: country.image,
    data: country,
  }));

  return (
    <section
      id="top-countries-section"
      className="relative bg-neutral-950 py-16 sm:py-20 px-6 sm:px-14 lg:px-20 overflow-hidden"
    >
      {/* Ambient background glow — subtle, paused for reduced-motion users */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-emerald-500/10 blur-[120px]"
            animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-24 w-[380px] h-[380px] rounded-full bg-sky-500/10 blur-[120px]"
            animate={{ opacity: [0.25, 0.55, 0.25], scale: [1.05, 1, 1.05] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="max-w-[1720px] mx-auto relative">

        {/* Header */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10"
        >
          <div>
            <motion.div
              variants={headerItem}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2"
            >
              <Globe2 className="w-4 h-4" />
              <span>Worldwide Favorites</span>
            </motion.div>
            <motion.h2
              variants={headerItem}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white"
            >
              Top 13 Countries to Explore
            </motion.h2>
            <motion.p
              variants={headerItem}
              className="mt-2 text-neutral-400 max-w-xl text-sm sm:text-base font-light"
            >
              The world's most-loved destinations, handpicked with their must-see cities and landmarks.
            </motion.p>
          </div>

          {/* View Mode Toggle + Navigation */}
          <motion.div variants={headerItem} className="hidden sm:flex items-center gap-3 shrink-0">
            {/* View Mode Toggle Buttons — sliding active pill */}
            <div className="relative flex items-center gap-2 bg-neutral-900 border border-white/10 rounded-full p-1">
              <button
                onClick={() => setViewMode('carousel')}
                title="Carousel view"
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  viewMode === 'carousel' ? 'text-emerald-400' : 'text-white/60 hover:text-white'
                }`}
              >
                {viewMode === 'carousel' && (
                  <motion.span
                    layoutId="viewModePill"
                    className="absolute inset-0 rounded-full bg-emerald-500/20 border border-emerald-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Rows3 className="w-4 h-4 relative" />
              </button>
              <button
                onClick={() => setViewMode('3d')}
                title="3D carousel view"
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  viewMode === '3d' ? 'text-emerald-400' : 'text-white/60 hover:text-white'
                }`}
              >
                {viewMode === '3d' && (
                  <motion.span
                    layoutId="viewModePill"
                    className="absolute inset-0 rounded-full bg-emerald-500/20 border border-emerald-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Grid3X3 className="w-4 h-4 relative" />
              </button>
            </div>

            {/* Navigation Arrows (only for carousel view) */}
            <AnimatePresence>
              {viewMode === 'carousel' && (
                <motion.div
                  key="nav-arrows"
                  initial={{ opacity: 0, x: -8, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: -8, width: 0 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="flex items-center gap-3 overflow-hidden"
                >
                  <motion.button
                    onClick={() => scrollByCard(-1)}
                    title="Scroll left"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-11 h-11 rounded-full bg-neutral-900 border border-white/10 hover:bg-neutral-800 flex items-center justify-center text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => scrollByCard(1)}
                    title="Scroll right"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-11 h-11 rounded-full bg-neutral-900 border border-white/10 hover:bg-neutral-800 flex items-center justify-center text-white cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Carousel or 3D Slider View — cross-fades when the mode is switched */}
        <AnimatePresence mode="wait">
          {viewMode === 'carousel' ? (
            <motion.div
              key="carousel-view"
              ref={scrollerRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {TOP_COUNTRIES.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  data-country-card
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectCountry(entry)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onSelectCountry(entry);
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: (i % 5) * 0.06, ease: easeOut }}
                  whileHover={{ y: -8 }}
                  className="relative shrink-0 w-[240px] sm:w-[270px] h-[360px] sm:h-[400px] rounded-3xl overflow-hidden snap-start group cursor-pointer shadow-lg shadow-black/30 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <motion.img
                    src={entry.image}
                    alt={entry.country}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: easeOut }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />

                  {/* Rank badge */}
                  <span className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-xs font-bold text-white">
                    {entry.rank.toString().padStart(2, '0')}
                  </span>

                  {/* Country name + top places */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="flex items-center gap-2 text-xl font-bold text-white font-['Outfit',sans-serif] drop-shadow-sm">
                      <span>{entry.flag}</span>
                      <span>{entry.country}</span>
                    </h3>
                    <p className="mt-1.5 text-xs text-white/70 leading-relaxed">
                      {entry.places.join(' · ')}
                    </p>
                    <span className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Packages
                      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="3d-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              <ThreeDSlider
                items={sliderItems}
                className="shadow-2xl shadow-black/50"
                onItemClick={(item) => onSelectCountry(item.data as TopCountry)}
                initialProgress={0}
              />
              <p className="mt-4 text-center text-xs text-neutral-500 sm:hidden">
                Swipe to explore · Tap a country to view packages
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
