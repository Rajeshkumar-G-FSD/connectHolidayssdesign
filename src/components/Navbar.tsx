import React from 'react';
import { Search, Menu, Heart, Compass, Volume2, VolumeX } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  tripsCount: number;
  onOpenSearch: () => void;
  onOpenMenu: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  tripsCount,
  onOpenSearch,
  onOpenMenu,
  soundEnabled,
  setSoundEnabled,
}) => {
  return (
    <header
      id="main-navigation-header"
      className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 lg:px-16 py-6 transition-all duration-300 bg-transparent"
    >
      <div className="w-full flex items-center justify-between">
        {/* Left: Brand Logo matching AroundMe emblem in screenshot */}
        <div
          id="aroundme-brand-logo"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          {/* Circular AroundMe symbol: Circle with inner triangle/peak */}
          <div className="w-8 h-8 rounded-full border-[2.2px] border-white flex items-center justify-center transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5 text-white"
            >
              <path d="M12 4L3 19h18L12 4zm0 4.5l5.2 8.5H6.8L12 8.5z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
            AroundMe
          </span>
        </div>

        {/* Center Navigation: News, Favorites, Contact (matching screenshot) */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          <button
            id="nav-news-btn"
            onClick={() => setActiveTab('news')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'news'
                ? 'text-white font-semibold'
                : 'text-white/80 hover:text-white'
            }`}
          >
            News
          </button>

          <button
            id="nav-favorites-btn"
            onClick={() => setActiveTab('favorites')}
            className={`transition-colors cursor-pointer relative ${
              activeTab === 'favorites'
                ? 'text-white font-semibold'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Favorites
            {savedCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold bg-white/30 text-white rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          <button
            id="nav-contact-btn"
            onClick={() => setActiveTab('contact')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'contact'
                ? 'text-white font-semibold'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Controls: Search button, Trips link, Menu icon button (matching screenshot) */}
        <div className="flex items-center gap-6 sm:gap-7">
          
          {/* Ambient sound toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute audio ambience' : 'Play nature ambience'}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer hidden sm:flex"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-white/60" />
            )}
          </button>

          {/* Circular Search Trigger (matching screenshot) */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            title="Search destinations"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
          >
            <Search className="w-4 h-4 text-white" />
          </button>

          {/* Trips Link (matching screenshot) */}
          <button
            id="header-trips-link"
            onClick={() => setActiveTab('trips')}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'trips'
                ? 'text-white font-semibold underline underline-offset-4'
                : 'text-white/90 hover:text-white'
            }`}
          >
            Trips
            {tripsCount > 0 && (
              <span className="ml-1 text-[11px] font-bold text-emerald-300">
                ({tripsCount})
              </span>
            )}
          </button>

          {/* Circular Menu Hamburger button with 2 lines (matching screenshot) */}
          <button
            id="header-menu-btn"
            onClick={onOpenMenu}
            title="Open Menu & All Destinations"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
          >
            <div className="w-4 flex flex-col gap-1 items-center justify-center">
              <span className="w-full h-[2px] bg-white rounded-full" />
              <span className="w-full h-[2px] bg-white rounded-full" />
            </div>
          </button>

        </div>
      </div>
    </header>
  );
};
