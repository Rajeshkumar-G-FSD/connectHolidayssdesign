import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Plus, Route, MapPin, ArrowRight } from 'lucide-react';
import { TopCountry } from '../types';
import { COUNTRY_PACKAGES } from '../data/countryPackages';
import { Reveal } from './PageShell';
import { PackageCard } from './PackageCard';

interface CountryDetailPageProps {
  country: TopCountry;
  onBack: () => void;
  onOpenContact: () => void;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

export const CountryDetailPage: React.FC<CountryDetailPageProps> = ({ country, onBack, onOpenContact }) => {
  const { packages, itinerary } = COUNTRY_PACKAGES[country.id];

  return (
    <div id="country-detail-page" className="bg-neutral-950 text-white">

      {/* Larger hero banner for this destination */}
      <div className="relative isolate w-full min-h-screen overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{ backgroundImage: `url('${country.image}')` }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-black/30" />
        </div>

        {/* Back button */}
        <button
          onClick={onBack}
          title="Back to Home"
          className="absolute top-24 left-6 sm:left-14 lg:left-20 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-6 sm:px-14 lg:px-20 pt-32 pb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-emerald-300"
          >
            Rank #{country.rank.toString().padStart(2, '0')} Worldwide Favorite
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4 text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif] drop-shadow-md leading-[0.95] break-words"
          >
            <span>{country.flag}</span>
            <span>{country.country}</span>
          </motion.h1>

          <Reveal delay={0.15} className="mt-6 text-white text-base sm:text-lg max-w-2xl leading-relaxed font-['Outfit',sans-serif] font-medium drop-shadow-sm">
            Discover the very best of {country.country} — from {country.places.slice(0, -1).join(', ')} to {country.places[country.places.length - 1]}, curated into complete, hassle-free holiday packages.
          </Reveal>

          <Reveal delay={0.2} className="mt-6 flex flex-wrap gap-2.5">
            {country.places.map((place) => (
              <span
                key={place}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-medium backdrop-blur-sm"
              >
                <MapPin className="w-3 h-3" />
                {place}
              </span>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Package cards — matching the reference design exactly */}
      <section className="py-16 sm:py-24 px-6 sm:px-14 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-14">
            <span className="inline-flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 mb-6">
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-xs font-medium text-white/80">Our Packages</span>
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold font-['Outfit',sans-serif] max-w-2xl leading-tight break-words">
              Choose Your Perfect <span className="text-emerald-400">Package</span> For Memorable {country.country} Adventure.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:items-center">
            {packages.map((pkg, i) => (
              <PackageCard
                key={pkg.name}
                priceINR={pkg.priceINR}
                description={pkg.description}
                title={pkg.name}
                highlighted={i === 1}
                onGetNow={onOpenContact}
                delay={i * 0.1}
                className={i === 1 ? 'md:-translate-y-4' : ''}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Complete Holiday Trip Itinerary */}
      <section className="py-16 sm:py-20 px-6 sm:px-14 lg:px-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <Reveal className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            <Route className="w-4 h-4" />
            <span>Day by Day</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold font-['Outfit',sans-serif] mb-2 break-words">
              Complete Holiday Trip Itinerary
            </h2>
            <p className="text-sm text-neutral-400 mb-12 max-w-xl">
              A sample {itinerary.length}-day itinerary covering the best of {country.country} — fully customizable to your dates and pace.
            </p>
          </Reveal>

          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10" />
            <div className="space-y-8">
              {itinerary.map((day, i) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.06, ease: easeOut }}
                  className="relative flex gap-5"
                >
                  <span className="relative z-10 shrink-0 w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-300">
                    {day.day}
                  </span>
                  <div className="flex-1 pb-1">
                    <h3 className="text-base font-bold text-white">Day {day.day} — {day.title}</h3>
                    <p className="mt-1 text-sm text-neutral-400 leading-relaxed">{day.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Reveal delay={0.1} className="mt-14 rounded-3xl bg-neutral-900 border border-white/10 p-8 text-center">
            <h3 className="text-xl font-bold font-['Outfit',sans-serif]">Ready to plan your {country.country} trip?</h3>
            <p className="mt-2 text-sm text-neutral-400 max-w-xl mx-auto">
              Every itinerary here can be tailored to your travel dates, budget and group size.
            </p>
            <button
              onClick={onOpenContact}
              className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              Enquire About This Trip <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
