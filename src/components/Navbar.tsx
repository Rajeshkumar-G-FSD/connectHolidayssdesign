import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Menu as MenuIcon } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenMenu: () => void;
}

const NAV_ITEMS: { tab: ActiveTab; label: string }[] = [
  { tab: 'home', label: 'Home' },
  { tab: 'about', label: 'About Us' },
  { tab: 'destinations', label: 'Destinations' },
  { tab: 'tour-packages', label: 'Tour Packages' },
  { tab: 'visa-services', label: 'Visa Services' },
];

const AFTER_BOOKING_ITEMS: { tab: ActiveTab; label: string }[] = [
  { tab: 'travel-insurance', label: 'Travel Insurance' },
  { tab: 'gallery', label: 'Gallery' },
  { tab: 'blog', label: 'Blog' },
  { tab: 'faq', label: 'FAQ' },
  { tab: 'testimonials', label: 'Testimonials' },
  { tab: 'contact', label: 'Contact' },
];

const BOOKING_TABS: ActiveTab[] = ['flight-booking', 'hotel-booking'];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenMenu }) => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);
  const isBookingActive = BOOKING_TABS.includes(activeTab);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bookingRef.current && !bookingRef.current.contains(e.target as Node)) {
        setBookingOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pillItemClass = (isActive: boolean) =>
    `relative z-10 flex items-center gap-1.5 transition-colors ${
      isActive ? 'text-neutral-900 font-semibold' : 'text-white/85 hover:text-white'
    }`;

  return (
    <header
      id="main-navigation-header"
      className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 lg:px-14 py-6 transition-all duration-300 bg-transparent"
    >
      {/* 3-column grid keeps the center nav mathematically centered */}
      <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Left: Brand Logo — Connect Holidayss */}
        <div
          id="connect-holidayss-brand-logo"
          onClick={() => setActiveTab('home')}
          className="justify-self-start flex items-center cursor-pointer select-none group"
        >
          <img
            src="/images/connect_holidayss.png"
            alt="Connect Holidayss"
            className="h-11 sm:h-12 w-auto drop-shadow-md transition-transform group-hover:scale-105"
          />
        </div>

        {/* Center Navigation: pill-shaped glass capsule with a sliding active highlight */}
        <nav className="hidden xl:flex justify-self-center items-center gap-0.5 p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[13px] font-medium shadow-sm">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.tab}
              id={`nav-${item.tab}-btn`}
              onClick={() => setActiveTab(item.tab)}
              className="relative px-3.5 py-2 rounded-full cursor-pointer whitespace-nowrap"
            >
              {activeTab === item.tab && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm"
                  transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                />
              )}
              <span className={pillItemClass(activeTab === item.tab)}>{item.label}</span>
            </button>
          ))}

          {/* Booking dropdown: Flight Booking / Hotel Booking */}
          <div className="relative" ref={bookingRef}>
            <button
              id="nav-booking-btn"
              onClick={() => setBookingOpen((v) => !v)}
              className="relative px-3.5 py-2 rounded-full cursor-pointer whitespace-nowrap"
            >
              {isBookingActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm"
                  transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                />
              )}
              <span className={pillItemClass(isBookingActive)}>
                Booking
                <ChevronDown className={`w-3 h-3 transition-transform ${bookingOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>

            {bookingOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-2xl bg-neutral-900 border border-white/10 shadow-xl overflow-hidden py-1.5"
              >
                {[
                  { tab: 'flight-booking' as ActiveTab, label: 'Flight Booking' },
                  { tab: 'hotel-booking' as ActiveTab, label: 'Hotel Booking' },
                ].map((opt) => (
                  <button
                    key={opt.tab}
                    onClick={() => {
                      setActiveTab(opt.tab);
                      setBookingOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                      activeTab === opt.tab ? 'text-emerald-400 font-semibold' : 'text-white/85 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {AFTER_BOOKING_ITEMS.map((item) => (
            <button
              key={item.tab}
              id={`nav-${item.tab}-btn`}
              onClick={() => setActiveTab(item.tab)}
              className="relative px-3.5 py-2 rounded-full cursor-pointer whitespace-nowrap"
            >
              {activeTab === item.tab && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm"
                  transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                />
              )}
              <span className={pillItemClass(activeTab === item.tab)}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right: mobile/tablet menu trigger — full menu lives in the drawer below xl */}
        <div className="justify-self-end flex items-center">
          <button
            id="header-menu-btn"
            onClick={onOpenMenu}
            title="Open menu"
            className="xl:hidden w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
          >
            <MenuIcon className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
