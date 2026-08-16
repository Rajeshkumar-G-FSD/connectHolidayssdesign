import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Bookmark, ArrowRight, Play, Pause } from 'lucide-react';
import { ContinentRegion, DestinationCard } from '../types';

interface HeroExploreProps {
  regions: ContinentRegion[];
  currentRegionIndex: number;
  onSelectRegionIndex: (index: number) => void;
  onExploreContinent: (region: ContinentRegion) => void;
  onSelectCard: (card: DestinationCard) => void;
  savedCardIds: string[];
  onToggleSaveCard: (id: string, e: React.MouseEvent) => void;
}

export const HeroExplore: React.FC<HeroExploreProps> = ({
  regions,
  currentRegionIndex,
  onSelectRegionIndex,
  onExploreContinent,
  onSelectCard,
  savedCardIds,
  onToggleSaveCard,
}) => {
  const currentRegion = regions[currentRegionIndex] || regions[0];
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const cardScrollRef = useRef<HTMLDivElement>(null);

  const totalCards = currentRegion.destinations.length;
  const currentCardNumber = (activeCardIndex + 1).toString().padStart(2, '0');
  const totalCardsFormatted = totalCards.toString().padStart(2, '0');

  // Active destination - always syncs with current slide
  const activeDestination = currentRegion.destinations[activeCardIndex] || currentRegion.destinations[0];
  const currentLargeBg = activeDestination ? activeDestination.image : currentRegion.bgImage;

  // Preload all 7 images for seamless instant background crossfading
  useEffect(() => {
    currentRegion.destinations.forEach((dest) => {
      const img = new Image();
      img.src = dest.image;
    });
  }, [currentRegion]);

  // Auto-advance slide every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveCardIndex((prev) => {
        const next = (prev + 1) % totalCards;
        return next;
      });
      setProgressKey((k) => k + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, totalCards, currentRegionIndex]);

  // Smooth scroll carousel when active card changes
  useEffect(() => {
    if (cardScrollRef.current) {
      const activeCardElement = cardScrollRef.current.children[activeCardIndex] as HTMLElement;
      if (activeCardElement) {
        cardScrollRef.current.scrollTo({
          left: activeCardElement.offsetLeft - 40,
          behavior: 'smooth',
        });
      }
    }
  }, [activeCardIndex]);

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
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden select-none bg-neutral-950 text-white flex flex-col justify-between"
    >
      {/* Full Large Dynamic Background: Immediately displays the current active / 1st slide image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`hero-bg-${currentRegion.id}-${activeDestination?.id || activeCardIndex}`}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
            style={{
              backgroundImage: `url('${currentLargeBg}')`,
            }}
          >
            {/* Cinematic subtle vignette and gradient for ultra-crisp white text readability */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Rail / Vertical Index Track matching screenshot */}
      <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 flex flex-col items-center z-30 pointer-events-none">
        {/* Vertical thin track line */}
        <div className="relative w-[1.5px] h-48 bg-white/25 flex flex-col items-center justify-between py-1">
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="w-1 h-1 rounded-full bg-white/40" />

          {/* Current index circle badge '5' */}
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-[10px] font-bold text-white shadow-sm my-auto">
            {currentRegion.indexNum}
          </div>

          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="w-1 h-1 rounded-full bg-white/40" />
        </div>
      </div>

      {/* Bottom-Left Vertical Index: "05 / 06" */}
      <div className="absolute left-6 sm:left-10 bottom-8 z-30 text-[11px] font-mono tracking-widest text-white/60 select-none flex items-center gap-2">
        <span>0{currentRegion.indexNum} / 0{currentRegion.totalNum}</span>
        {isPaused && (
          <span className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] uppercase tracking-wider text-amber-300">
            Paused
          </span>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="w-full h-full max-w-[1720px] mx-auto px-6 sm:px-14 lg:px-20 pt-28 pb-10 flex flex-col justify-between z-10">
        
        {/* Main Grid: Left Continent Hierarchy + Right Multi-Card Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto w-full">
          
          {/* Left Column: Vertical Region Text Stack (Africa -> Asia -> Australia) */}
          <div className="lg:col-span-5 xl:col-span-5 pl-4 sm:pl-8 flex flex-col justify-center">
            
            {/* Ghost Previous Continent (e.g. Africa) */}
            <div
              onClick={handlePrevRegion}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white/20 tracking-tight font-['Outfit',sans-serif] cursor-pointer hover:text-white/40 transition-colors select-none mb-1 sm:mb-2 transform -translate-y-1"
            >
              {currentRegion.prevName}
            </div>

            {/* Active Continent (e.g. Asia) */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentRegion.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="text-6xl sm:text-7xl lg:text-8xl xl:text-[96px] font-extrabold text-white tracking-tight font-['Outfit',sans-serif] drop-shadow-md leading-none py-1"
              >
                {currentRegion.name}
              </motion.h1>
            </AnimatePresence>

            {/* Description matching screenshot paragraph */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentRegion.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-4 sm:mt-5 text-white/90 text-sm sm:text-base max-w-[420px] font-light leading-relaxed drop-shadow-sm"
              >
                {currentRegion.description}
              </motion.p>
            </AnimatePresence>

            {/* Explore Button matching exact green pill in screenshot */}
            <div className="mt-6 sm:mt-8 flex items-center gap-4">
              <button
                id="hero-exact-explore-btn"
                onClick={() => onExploreContinent(currentRegion)}
                className="group inline-flex items-center gap-6 px-7 py-3.5 rounded-2xl bg-[#2e5d48]/85 hover:bg-[#254d3b]/95 border border-emerald-400/25 text-white font-medium text-sm backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-98"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* 3s Auto-rotation cycle indicator badge */}
              <div className="text-[11px] text-white/60 font-mono flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>3s Autoplay ({currentCardNumber}/07)</span>
              </div>
            </div>

            {/* Ghost Next Continent (e.g. Australia) */}
            <div
              onClick={handleNextRegion}
              className="mt-6 sm:mt-8 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white/20 tracking-tight font-['Outfit',sans-serif] cursor-pointer hover:text-white/40 transition-colors select-none transform translate-y-1"
            >
              {currentRegion.nextName}
            </div>

          </div>

          {/* Right Column: Multi-Card Horizontal Carousel with 7 items */}
          <div className="lg:col-span-7 xl:col-span-7 overflow-visible">
            
            <div
              ref={cardScrollRef}
              className="flex items-start gap-5 sm:gap-6 overflow-x-auto pb-4 pt-2 scrollbar-none scroll-smooth"
            >
              {currentRegion.destinations.map((card, idx) => {
                const isSaved = savedCardIds.includes(card.id);
                const isFeatured = idx === activeCardIndex;

                return (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    onClick={() => {
                      setActiveCardIndex(idx);
                      setProgressKey((k) => k + 1);
                      onSelectCard(card);
                    }}
                    className={`flex-shrink-0 w-[230px] sm:w-[250px] lg:w-[260px] cursor-pointer group transition-all duration-300 ${
                      isFeatured
                        ? 'scale-100 opacity-100 ring-2 ring-emerald-400 rounded-3xl shadow-[0_0_25px_rgba(52,211,153,0.35)]'
                        : 'opacity-75 hover:opacity-100 hover:scale-[1.02]'
                    }`}
                  >
                    {/* Top Title Text & 5 Dots (matching screenshot) */}
                    <div className="mb-2.5 px-1 min-h-[46px] flex flex-col justify-end">
                      <h4 className={`text-sm font-semibold tracking-wide truncate drop-shadow-sm font-['Outfit',sans-serif] ${
                        isFeatured ? 'text-emerald-300 font-bold' : 'text-white'
                      }`}>
                        {card.title}
                      </h4>

                      {/* 5 Pagination / Rating Dots */}
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, dotIdx) => (
                          <span
                            key={dotIdx}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              dotIdx < card.ratingDots
                                ? isFeatured ? 'bg-emerald-400' : 'bg-white'
                                : 'bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Card Body with Rounded Corners & Photo */}
                    <div className="relative w-full aspect-[9/13.5] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-neutral-900">
                      
                      <img
                        src={card.image}
                        alt={card.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                          isFeatured ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                        loading="lazy"
                      />

                      {/* Subtle dark gradient scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" />

                      {/* Top-Right Circular White Bookmark Button (matching screenshot) */}
                      <button
                        onClick={(e) => onToggleSaveCard(card.id, e)}
                        title={isSaved ? 'Remove favorite' : 'Save to favorites'}
                        className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-md cursor-pointer z-10 ${
                          isSaved
                            ? 'bg-rose-500 text-white'
                            : 'bg-white text-neutral-900 hover:bg-neutral-100'
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isSaved ? 'fill-current' : 'fill-neutral-900 stroke-neutral-900'}`}
                        />
                      </button>

                      {/* Bottom Quick Info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-950/90 to-transparent">
                        <span className="text-[11px] font-semibold text-emerald-300 block truncate">
                          {card.location}
                        </span>
                        <div className="flex items-center justify-between text-xs text-white mt-1">
                          <span className="font-bold">${card.pricePerNight}/night</span>
                          <span className="text-emerald-400 font-semibold group-hover:underline">Explore →</span>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Bottom Bar: Center Arrows Navigation + Bottom Right Timeline (01 —————— 07) */}
        <div className="w-full flex items-center justify-between pt-4 relative">
          
          {/* Left Play/Pause Toggle */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume 3s auto slideshow' : 'Pause slideshow'}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs text-white/80 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-white" />}
              <span>{isPaused ? 'Play' : 'Pause'}</span>
            </button>
          </div>

          {/* Center Circular Navigation Arrows (matching screenshot) */}
          <div className="flex items-center gap-3 mx-auto">
            {/* Left Circular Arrow */}
            <button
              id="hero-center-prev-btn"
              onClick={handlePrevCard}
              title="Previous destination"
              className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Circular Arrow */}
            <button
              id="hero-center-next-btn"
              onClick={handleNextCard}
              title="Next destination"
              className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

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
