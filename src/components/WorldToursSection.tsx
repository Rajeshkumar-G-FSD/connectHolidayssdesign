import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, ArrowUpRight } from 'lucide-react';
import { TOUR_CATEGORIES } from '../data/worldTours';

interface WorldToursSectionProps {
  onExplorePlace: () => void;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

export const WorldToursSection: React.FC<WorldToursSectionProps> = ({ onExplorePlace }) => {
  const [activeCategory, setActiveCategory] = useState<'india' | 'south-india' | 'world-tour'>('india');
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const category = TOUR_CATEGORIES.find((c) => c.id === activeCategory)!;

  const updateProgress = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('[data-tour-card]') as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : 240;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section id="world-tours-section" className="bg-neutral-950 py-16 sm:py-20 px-6 sm:px-14 lg:px-20">
      <div className="max-w-[1720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="bg-white text-neutral-900 rounded-[2.5rem] shadow-2xl shadow-black/40 p-6 sm:p-10"
        >
          {/* Header: heading left, category tabs right */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
            <div className="w-full lg:max-w-xl">
              <span className="inline-flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 mb-5">
                <span className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center">
                  <Plus className="w-3.5 h-3.5 text-neutral-900" />
                </span>
                <span className="text-xs font-medium text-neutral-600">World Tours</span>
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold font-['Outfit',sans-serif] leading-tight break-words">
                <span className="text-neutral-900">World's Best Tourist Places</span>{' '}
                <span className="text-neutral-400">For A Seamless And Memorable Adventure.</span>
              </h2>
            </div>

            {/* Category tabs — right side */}
            <div className="flex flex-wrap gap-2 shrink-0 lg:justify-end lg:max-w-[280px]">
              {TOUR_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCategory(c.id);
                    scrollerRef.current?.scrollTo({ left: 0 });
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeCategory === c.id
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal slide of place cards */}
          <div
            ref={scrollerRef}
            onScroll={updateProgress}
            className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="wait">
              <React.Fragment key={activeCategory}>
                {category.places.map((place, i) => (
                  <motion.div
                    key={place.id}
                    data-tour-card
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (i % 6) * 0.05, ease: easeOut }}
                    className="shrink-0 w-[210px] sm:w-[230px] snap-start rounded-3xl bg-neutral-50 border border-neutral-200/70 p-5"
                  >
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-md mx-auto mb-4"
                      loading="lazy"
                    />
                    <div className="flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-neutral-900 text-sm leading-snug truncate">{place.name}</h3>
                        <p className="mt-1 text-xs text-neutral-500 leading-relaxed line-clamp-2">
                          {place.description}
                        </p>
                      </div>
                      <button
                        onClick={onExplorePlace}
                        title={`Enquire about ${place.name}`}
                        className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-700 text-white flex items-center justify-center shrink-0 transition-all hover:scale-110 cursor-pointer"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </React.Fragment>
            </AnimatePresence>
          </div>

          {/* Prev / Next + progress bar */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              onClick={() => scrollByCard(-1)}
              title="Scroll left"
              className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-900 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <div className="w-full max-w-xs h-[3px] rounded-full bg-neutral-200 overflow-hidden">
              <div
                className="h-full bg-neutral-900 rounded-full transition-all duration-150"
                style={{ width: `${Math.max(6, scrollProgress * 100)}%` }}
              />
            </div>
            <button
              onClick={() => scrollByCard(1)}
              title="Scroll right"
              className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-900 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
