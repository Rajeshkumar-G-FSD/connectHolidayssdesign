import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { TOP_COUNTRIES } from '../data/topCountries';
import { COUNTRY_PACKAGES } from '../data/countryPackages';
import { TopCountry } from '../types';
import { PackageCard } from './PackageCard';

interface PackagesSectionProps {
  onSelectCountry: (country: TopCountry) => void;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

// One featured package per top country, so this slider doubles as a preview
// of every country's detail page.
const FEATURED_PACKAGES = TOP_COUNTRIES.map((country, i) => ({
  country,
  pkg: COUNTRY_PACKAGES[country.id].packages[1], // the "standard" tier, same one highlighted on the detail page
}));

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectCountry }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('[data-package-card]') as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section id="packages-section" className="bg-neutral-950 py-16 sm:py-24 px-6 sm:px-14 lg:px-20">
      <div className="max-w-[1720px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="flex flex-col items-center text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 mb-6">
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <Plus className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="text-xs font-medium text-white/80">Our Packages</span>
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold font-['Outfit',sans-serif] max-w-2xl leading-tight break-words">
            Choose Your Perfect <span className="text-emerald-400">Package</span> For Your Next Adventure.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl">
            One featured package from each of our top 10 destinations — tap any card to see the full trip.
          </p>
        </motion.div>

        {/* Prev / Next arrows */}
        <div className="hidden sm:flex items-center justify-end gap-3 mb-6">
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

        {/* Horizontal slide of package cards */}
        <div
          ref={scrollerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {FEATURED_PACKAGES.map(({ country, pkg }, i) => (
            <div key={country.id} data-package-card className="shrink-0 w-[280px] sm:w-[320px] snap-start">
              <PackageCard
                priceINR={pkg.priceINR}
                description={pkg.description}
                title={pkg.name}
                overline={`${country.flag} ${country.country}`}
                highlighted={i % 3 === 1}
                onGetNow={() => onSelectCountry(country)}
                delay={(i % 4) * 0.06}
                className="h-full cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
