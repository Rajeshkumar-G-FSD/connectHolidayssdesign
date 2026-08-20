import React, { useState, useEffect } from 'react';
import { DESTINATIONS } from './data/destinations';
import { CONTINENT_REGIONS } from './data/regions';
import { ActiveTab, Booking, Destination, DestinationCard, ContinentRegion } from './types';
import { Navbar } from './components/Navbar';
import { HeroExplore } from './components/HeroExplore';
import { DestinationsCatalog } from './components/DestinationsCatalog';
import { MyTripsView } from './components/MyTripsView';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { SearchModal } from './components/SearchModal';
import { MenuDrawer } from './components/MenuDrawer';
import { NewsModal } from './components/NewsModal';
import { ContactModal } from './components/ContactModal';
import { AboutModal } from './components/AboutModal';
import { ambientSound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [regionIndex, setRegionIndex] = useState<number>(0); // 0 is Asia (index 5 of 6 matching screenshot)
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isNewsOpen, setIsNewsOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  const [currency, setCurrency] = useState<string>('$');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Persistence for Wishlist Saved IDs
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('aroundme_saved_ids');
      return stored ? JSON.parse(stored) : ['kelingking-beach', 'nilgiri-heights'];
    } catch {
      return ['kelingking-beach', 'nilgiri-heights'];
    }
  });

  // Persistence for Booked Trips
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem('aroundme_bookings');
      if (stored) return JSON.parse(stored);

      return [
        {
          id: 'RES-ASIA77',
          destinationId: 'nilgiri-heights',
          destination: DESTINATIONS[0],
          checkIn: '2026-09-15',
          checkOut: '2026-09-18',
          guests: 2,
          totalNights: 3,
          totalPrice: 1689,
          selectedAddons: ['Sunrise Tea Plucking & Tasting Tour', 'Twilight Deck Barbecue & Wine Pairing'],
          status: 'confirmed',
          bookedAt: '2026-08-12T14:30:00.000Z',
          guestName: 'Alex Morgan',
          guestEmail: 'alex.morgan@example.com',
        },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aroundme_saved_ids', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('aroundme_bookings', JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  // Audio ambience controller
  useEffect(() => {
    if (soundEnabled) {
      ambientSound.start();
    } else {
      ambientSound.stop();
    }
    return () => {
      ambientSound.stop();
    };
  }, [soundEnabled]);

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookSuccess = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  // Convert Card selection into full Destination object
  const handleSelectCard = (card: DestinationCard) => {
    const matched = DESTINATIONS.find((d) => d.id === card.id || d.slug.includes(card.id));
    if (matched) {
      setSelectedDestination(matched);
    } else {
      // Fallback destination object if clicking newly created card
      setSelectedDestination({
        id: card.id,
        slug: card.id,
        name: card.title,
        location: card.location,
        region: CONTINENT_REGIONS[regionIndex].name,
        country: card.tag,
        tag: card.tag,
        rating: card.ratingScore,
        reviewCount: card.reviewCount,
        pricePerNight: card.pricePerNight,
        currency: '$',
        coverImage: card.image,
        gallery: [
          card.image,
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
        ],
        description: `${card.title} in ${card.location} is an extraordinary luxury escape nestled amidst ancient natural landscapes. Featuring handcrafted architectural finishes, sweeping panoramic verandas, and curated bespoke experiences.`,
        shortDescription: card.description,
        vibe: 'Serene Luxury Retreat',
        category: card.category as any,
        stats: {
          guests: 4,
          bedrooms: 2,
          beds: 2,
          bathrooms: 2,
          elevation: '1,800m',
        },
        amenities: [
          { name: 'Panoramic Infinity View', icon: 'Sun', description: 'Unobstructed vistas of the landscape.' },
          { name: 'Private Plunge Pool', icon: 'Waves', description: 'Temperature controlled natural pool.' },
          { name: 'High-Speed Starlink Wifi', icon: 'Wifi', description: 'Seamless connectivity throughout the sanctuary.' },
          { name: 'Bespoke In-Villa Dining', icon: 'Coffee', description: 'Private chef farm-to-table breakfast and dinner.' },
        ],
        experiences: [
          { title: 'Sunrise Nature Excursion', description: 'Guided morning walk with local resident naturalist.', duration: '2 hours', included: true },
          { title: 'Twilight Deck Barbecue', description: 'Four-course open flame dining with fine wine pairing.', duration: '3 hours', included: false },
        ],
        host: {
          name: 'Elena Vance',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          role: 'Sanctuary Curator',
          isSuperhost: true,
          responseRate: '100% within an hour',
          languages: ['English', 'French', 'Local dialect'],
        },
        coordinates: { lat: 11.4102, lng: 76.695 },
        reviews: [
          {
            id: 'r1',
            author: 'Julian Thorne',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
            date: 'August 2026',
            rating: 5,
            comment: 'One of the most awe-inspiring stays in the world. The morning mist and private pool were unforgettable.',
          },
        ],
      });
    }
  };

  const handleExploreContinent = (region: ContinentRegion) => {
    setActiveTab('destinations');
  };

  const savedDestinations = DESTINATIONS.filter((d) => savedIds.includes(d.id));

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-emerald-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'news') {
            setIsNewsOpen(true);
          } else if (tab === 'contact') {
            setIsContactOpen(true);
          } else if (tab === 'about') {
            setIsAboutOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        savedCount={savedIds.length}
        tripsCount={bookings.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main View Display */}
      <main>
        {activeTab === 'home' && (
          <HeroExplore
            regions={CONTINENT_REGIONS}
            currentRegionIndex={regionIndex}
            onSelectRegionIndex={setRegionIndex}
            onExploreContinent={handleExploreContinent}
            onSelectCard={handleSelectCard}
            savedCardIds={savedIds}
            onToggleSaveCard={handleToggleSave}
          />
        )}

        {activeTab === 'destinations' && (
          <DestinationsCatalog
            destinations={DESTINATIONS}
            onOpenDetail={(dest) => setSelectedDestination(dest)}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            currency={currency}
          />
        )}

        {activeTab === 'trips' && (
          <MyTripsView
            bookings={bookings}
            savedDestinations={savedDestinations}
            onOpenDetail={(dest) => setSelectedDestination(dest)}
            onCancelBooking={handleCancelBooking}
            onExploreDestinations={() => setActiveTab('destinations')}
            onToggleSave={handleToggleSave}
            initialTab="trips"
            currency={currency}
          />
        )}

        {activeTab === 'favorites' && (
          <MyTripsView
            bookings={bookings}
            savedDestinations={savedDestinations}
            onOpenDetail={(dest) => setSelectedDestination(dest)}
            onCancelBooking={handleCancelBooking}
            onExploreDestinations={() => setActiveTab('destinations')}
            onToggleSave={handleToggleSave}
            initialTab="saved"
            currency={currency}
          />
        )}
      </main>

      {/* Detailed Sanctuary Modal */}
      {selectedDestination && (
        <DestinationDetailModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onBookSuccess={handleBookSuccess}
          isSaved={savedIds.includes(selectedDestination.id)}
          onToggleSave={handleToggleSave}
          currency={currency}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        destinations={DESTINATIONS}
        onSelectDestination={(dest) => {
          setSelectedDestination(dest);
        }}
        currency={currency}
      />

      {/* Right Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        regions={CONTINENT_REGIONS}
        currentRegionIndex={regionIndex}
        onSelectRegion={setRegionIndex}
        onNavigateTab={(tab) => {
          if (tab === 'news') setIsNewsOpen(true);
          else if (tab === 'contact') setIsContactOpen(true);
          else if (tab === 'about') setIsAboutOpen(true);
          else setActiveTab(tab);
        }}
      />

      {/* News Modal */}
      <NewsModal isOpen={isNewsOpen} onClose={() => setIsNewsOpen(false)} />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />

    </div>
  );
}
