import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Globe2 } from 'lucide-react';
import { TOP_COUNTRIES } from '../data/topCountries';

const easeOut = [0.16, 1, 0.3, 1] as const;

export const TopCountriesSection: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('[data-country-card]') as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : 300;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section id="top-countries-section" className="bg-neutral-950 py-16 sm:py-20 px-6 sm:px-14 lg:px-20">
      <div className="max-w-[1720px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
              <Globe2 className="w-4 h-4" />
              <span>Worldwide Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white">
              Top 10 Countries to Explore
            </h2>
            <p className="mt-2 text-neutral-400 max-w-xl text-sm sm:text-base font-light">
              The world's most-loved destinations, handpicked with their must-see cities and landmarks.
            </p>
          </div>

          {/* Prev / Next arrows */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollByCard(-1)}
              title="Scroll left"
              className="w-11 h-11 rounded-full bg-neutral-900 border border-white/10 hover:bg-neutral-800 flex items-center justify-center text-white transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              title="Scroll right"
              className="w-11 h-11 rounded-full bg-neutral-900 border border-white/10 hover:bg-neutral-800 flex items-center justify-center text-white transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Horizontal slide of country cards */}
        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TOP_COUNTRIES.map((entry, i) => (
            <motion.div
              key={entry.id}
              data-country-card
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.06, ease: easeOut }}
              className="relative shrink-0 w-[240px] sm:w-[270px] h-[360px] sm:h-[400px] rounded-3xl overflow-hidden snap-start group cursor-default shadow-lg shadow-black/30"
            >
              <img
                src={entry.image}
                alt={entry.country}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
