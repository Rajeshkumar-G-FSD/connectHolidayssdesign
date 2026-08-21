import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark } from 'lucide-react';
import { ContinentRegion } from '../types';

interface HeroExploreProps {
  regions: ContinentRegion[];
  currentRegionIndex: number;
  onSelectRegionIndex: (index: number) => void;
  savedCardIds: string[];
  onToggleSaveCard: (id: string, e: React.MouseEvent) => void;
}

// Staggered card sizing for the filmstrip: tall / short / tall, showing exactly
// 3 slides at once, bottom-aligned with staggered tops (matching reference).
const CARD_SIZES = [
  { wrapper: 'w-[200px] sm:w-[230px] lg:w-[250px]', image: 'h-[340px] sm:h-[400px] lg:h-[440px]' },
  { wrapper: 'w-[165px] sm:w-[185px] lg:w-[200px]', image: 'h-[290px] sm:h-[330px] lg:h-[360px]' },
  { wrapper: 'w-[185px] sm:w-[210px] lg:w-[230px]', image: 'h-[340px] sm:h-[400px] lg:h-[440px]' },
];

export const HeroExplore: React.FC<HeroExploreProps> = ({
  regions,
  currentRegionIndex,
  onSelectRegionIndex,
  savedCardIds,
  onToggleSaveCard,
}) => {
  const currentRegion = regions[currentRegionIndex] || regions[0];
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const totalCards = currentRegion.destinations.length;
  const currentCardNumber = (activeCardIndex + 1).toString().padStart(2, '0');
  const totalCardsFormatted = totalCards.toString().padStart(2, '0');

  // Active destination - always syncs with current slide
  const activeDestination = currentRegion.destinations[activeCardIndex] || currentRegion.destinations[0];
  const currentLargeBg = activeDestination ? activeDestination.image : currentRegion.bgImage;

  // The active card plus its next few neighbors, shown side-by-side as a filmstrip
  const visibleCards = CARD_SIZES.map((size, i) => {
    const actualIndex = (activeCardIndex + i) % totalCards;
    return { card: currentRegion.destinations[actualIndex], actualIndex, size };
  }).filter((entry) => entry.card);

  // Preload all 7 images for seamless instant background crossfading
  useEffect(() => {
    currentRegion.destinations.forEach((dest) => {
      const img = new Image();
      img.src = dest.image;
    });
  }, [currentRegion]);

  // Keep a live ref of the active card index so the interval below can read it
  // without needing to restart every 3s tick (which would jitter the cadence)
  const activeCardIndexRef = useRef(activeCardIndex);
  useEffect(() => {
    activeCardIndexRef.current = activeCardIndex;
  }, [activeCardIndex]);

  // Auto-advance slide every 3 seconds; once the last card in a continent is
  // reached, automatically roll over to the next continent and keep looping
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const next = activeCardIndexRef.current + 1;
      if (next >= totalCards) {
        const nextRegionIdx = (currentRegionIndex + 1) % regions.length;
        onSelectRegionIndex(nextRegionIdx);
        setActiveCardIndex(0);
      } else {
        setActiveCardIndex(next);
      }
      setProgressKey((k) => k + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, totalCards, currentRegionIndex, regions.length, onSelectRegionIndex]);

  // Next / Previous region handlers
  const handleNextRegion = () => {
    const nextIdx = (currentRegionIndex + 1) % regions.length;
    onSelectRegionIndex(nextIdx);
    setActiveCardIndex(0);
    setProgressKey((k) => k + 1);
  };

  const handlePrevRegion = () => {
    const prevIdx = (currentRegionIndex - 1 + regions.length) % regions.length;
    onSelectRegionIndex(prevIdx);
    setActiveCardIndex(0);
    setProgressKey((k) => k + 1);
  };

  // Next / Previous card within region
  const handleNextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % totalCards);
    setProgressKey((k) => k + 1);
  };

  const handlePrevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
    setProgressKey((k) => k + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextCard();
      if (e.key === 'ArrowLeft') handlePrevCard();
      if (e.key === 'ArrowUp') handlePrevRegion();
      if (e.key === 'ArrowDown') handleNextRegion();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardIndex, currentRegionIndex, totalCards, regions.length]);

  return (
    <div
      id="hero-exact-viewport"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative isolate w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden select-none bg-neutral-950 text-white flex flex-col justify-between"
    >
      {/* Full Large Dynamic Background: current active image, with a hazy fog blur across the top fading into a sharp, clear image lower down */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`hero-bg-${currentRegion.id}-${activeDestination?.id || activeCardIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 will-change-transform"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100 sm:scale-105 lg:scale-110 transition-transform duration-700 ease-out"
              style={{
                backgroundImage: `url('${currentLargeBg}')`,
              }}
            />

            {/* Cinematic subtle vignette and gradient for ultra-crisp white text readability */}
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

            {/* Foggy blur across the top third, clearing to a sharp photo below */}
            <div
              className="absolute inset-x-0 top-0 h-[46%] backdrop-blur-xl"
              style={{
                maskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
              }}
            />
            <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content Layout */}
      <div className="w-full h-full max-w-[1720px] mx-auto px-6 sm:px-14 lg:px-20 pt-28 pb-10 flex flex-col justify-between z-10">

        {/* Multi-Card Filmstrip */}
        <div className="my-auto w-full">
          {/* Kept for SEO/accessibility only — no longer shown visually */}
          <h1 className="sr-only">{currentRegion.name}: {currentRegion.description}</h1>

          {/* Horizontal filmstrip of destination cards, bottom-aligned with staggered heights */}
          <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-end justify-start lg:justify-end overflow-hidden">
            <div className="flex items-end gap-4 sm:gap-5 lg:gap-6">
              <AnimatePresence initial={false} mode="popLayout">
                {visibleCards.map(({ card, actualIndex, size }, i) => {
                  const isActive = i === 0;
                  const isSaved = savedCardIds.includes(card.id);
                  return (
                    <motion.div
                      key={card.id}
                      layout
                      initial={{ opacity: 0, x: 90 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -90 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className={`shrink-0 flex flex-col gap-2.5 ${size.wrapper}`}
                    >
                      {/* Title + rating dots sit above the photo, matching screenshot */}
                      <div>
                        <h4 className="text-white text-[13px] sm:text-sm font-semibold leading-snug truncate drop-shadow-sm">
                          {card.title}
                        </h4>
                        <div className="mt-1.5 flex items-center gap-1">
                          {[...Array(5)].map((_, dotIdx) => (
                            <span
                              key={dotIdx}
                              className={`h-1.5 w-1.5 rounded-full ${dotIdx < card.ratingDots ? 'bg-white' : 'bg-white/30'}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Photo card */}
                      <div
                        onClick={() => {
                          // Hero slides only change the active destination. Opening
                          // the destination detail modal is intentionally disabled here.
                          if (!isActive) {
                            setActiveCardIndex(actualIndex);
                            setProgressKey((k) => k + 1);
                          }
                        }}
                        className={`relative rounded-[1.5rem] overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.45)] cursor-pointer group ${size.image} ${isActive ? 'ring-2 ring-white/70' : ''}`}
                      >
                        <img
                          src={card.image}
                          alt={card.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSaveCard(card.id, e);
                          }}
                          title={isSaved ? 'Remove favorite' : 'Save to favorites'}
                          className={`absolute top-3 right-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-md transition-transform hover:scale-110 ${isSaved ? 'bg-rose-500 text-white' : 'bg-white text-neutral-900'}`}
                        >
                          <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-current' : 'fill-neutral-900 stroke-neutral-900'}`} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Timeline Pagination (01 —————— 07) */}
        <div className="w-full flex items-center justify-end pt-4">

          {/* Bottom-Right Timeline Pagination: "01 —————— 07" with 3s continuous progress bar (matching screenshot) */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-white/90 font-medium">
            <span className="text-white font-bold">{currentCardNumber}</span>
            <div className="w-16 sm:w-24 h-[2px] bg-white/30 rounded-full relative overflow-hidden">
              {/* Animated Progress Bar representing 3-second cycle */}
              {!isPaused && (
                <motion.div
                  key={`progress-${progressKey}-${activeCardIndex}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.0, ease: 'linear' }}
                  className="h-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                />
              )}
              {isPaused && (
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{
                    width: `${((activeCardIndex + 1) / totalCards) * 100}%`,
                  }}
                />
              )}
            </div>
            <span className="text-white/70">{totalCardsFormatted}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
