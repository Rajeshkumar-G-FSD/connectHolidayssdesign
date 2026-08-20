import React, { useState, useEffect } from 'react';
import { DESTINATIONS } from './data/destinations';
import { CONTINENT_REGIONS } from './data/regions';
import { TOP_COUNTRIES } from './data/topCountries';
import { ActiveTab, Booking, Destination, DestinationCard, ContinentRegion, TopCountry } from './types';
import {
  TAB_TITLES,
  getTabForPath,
  getPathForTab,
  getCountryIdFromPath,
  getPathForCountry,
  isKnownTabPath,
} from './utils/routes';
import { Navbar } from './components/Navbar';
import { HeroExplore } from './components/HeroExplore';
import { TopCountriesSection } from './components/TopCountriesSection';
import { PackagesSection } from './components/PackagesSection';
import { WorldToursSection } from './components/WorldToursSection';
import { CountryDetailPage } from './components/CountryDetailPage';
import { DestinationsCatalog } from './components/DestinationsCatalog';
import { MyTripsView } from './components/MyTripsView';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { MenuDrawer } from './components/MenuDrawer';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { TourPackagesPage } from './components/pages/TourPackagesPage';
import { VisaServicesPage } from './components/pages/VisaServicesPage';
import { FlightBookingPage } from './components/pages/FlightBookingPage';
import { HotelBookingPage } from './components/pages/HotelBookingPage';
import { TravelInsurancePage } from './components/pages/TravelInsurancePage';
import { GalleryPage } from './components/pages/GalleryPage';
import { BlogPage } from './components/pages/BlogPage';
import { FAQPage } from './components/pages/FAQPage';
import { TestimonialsPage } from './components/pages/TestimonialsPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './components/pages/TermsConditionsPage';
import { CancellationPolicyPage } from './components/pages/CancellationPolicyPage';
import { ambientSound } from './utils/audio';

// Resolve the initial view straight from the URL, so a hard refresh or a
// direct link to e.g. /packages or /countries/japan lands on the right page.
const getInitialCountry = (): TopCountry | null => {
  const countryId = getCountryIdFromPath(window.location.pathname);
  return countryId ? TOP_COUNTRIES.find((c) => c.id === countryId) ?? null : null;
};

export default function App() {
  const [activeTab, setActiveTabState] = useState<ActiveTab>(() => getTabForPath(window.location.pathname));
  const [regionIndex, setRegionIndex] = useState<number>(0); // 0 is Asia (index 5 of 6 matching screenshot)
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedCountry, setSelectedCountryState] = useState<TopCountry | null>(getInitialCountry);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

  // Scroll to top whenever the active page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeTab, selectedCountry]);

  // Keep the browser tab title in sync with whatever page is showing
  useEffect(() => {
    const brand = 'Connect Holidayss';
    if (selectedCountry) {
      document.title = `${selectedCountry.country} Packages | ${brand}`;
    } else if (activeTab === 'home') {
      document.title = `${brand} | We Lead, You Relax`;
    } else {
      document.title = `${TAB_TITLES[activeTab]} | ${brand}`;
    }
  }, [activeTab, selectedCountry]);

  // Support the browser's Back/Forward buttons — re-sync state from the URL
  // whenever it changes outside of our own navigate() calls.
  useEffect(() => {
    const handlePopState = () => {
      const countryId = getCountryIdFromPath(window.location.pathname);
      const country = countryId ? TOP_COUNTRIES.find((c) => c.id === countryId) ?? null : null;
      setSelectedCountryState(country);
      if (!country) {
        setActiveTabState(getTabForPath(window.location.pathname));
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // A direct visit to an unrecognized path (e.g. a typo) quietly settles on Home
  // rather than leaving a dead URL showing the home page underneath it.
  useEffect(() => {
    const path = window.location.pathname;
    const countryId = getCountryIdFromPath(path);
    const validCountry = countryId ? TOP_COUNTRIES.some((c) => c.id === countryId) : false;
    if (!validCountry && !isKnownTabPath(path)) {
      window.history.replaceState(null, '', getPathForTab('home'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigate to a tab: updates state, the URL, and exits the country detail takeover
  const navigateToTab = (tab: ActiveTab) => {
    const path = getPathForTab(tab);
    if (window.location.pathname !== path) {
      window.history.pushState({ tab }, '', path);
    }
    setSelectedCountryState(null);
    setActiveTabState(tab);
  };

  // Navigate to a country's detail takeover, updating the URL to /countries/:id
  const navigateToCountry = (country: TopCountry) => {
    const path = getPathForCountry(country.id);
    if (window.location.pathname !== path) {
      window.history.pushState({ countryId: country.id }, '', path);
    }
    setSelectedCountryState(country);
  };

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
    navigateToTab('destinations');
  };

  const goToContact = () => navigateToTab('contact');
  const goToDestinations = () => navigateToTab('destinations');

  const savedDestinations = DESTINATIONS.filter((d) => savedIds.includes(d.id));

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-emerald-600 selection:text-white">

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Main View Display */}
      <main className="flex-1">
        {selectedCountry ? (
          <CountryDetailPage
            country={selectedCountry}
            onBack={() => navigateToTab('home')}
            onOpenContact={goToContact}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <>
                <HeroExplore
                  regions={CONTINENT_REGIONS}
                  currentRegionIndex={regionIndex}
                  onSelectRegionIndex={setRegionIndex}
                  onExploreContinent={handleExploreContinent}
                  onSelectCard={handleSelectCard}
                  savedCardIds={savedIds}
                  onToggleSaveCard={handleToggleSave}
                />
                <TopCountriesSection onSelectCountry={navigateToCountry} />
                <PackagesSection onSelectCountry={navigateToCountry} />
                <WorldToursSection onExplorePlace={goToContact} />
              </>
            )}

            {activeTab === 'about' && (
              <AboutPage onOpenContact={goToContact} onExploreDestinations={goToDestinations} />
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

            {activeTab === 'tour-packages' && <TourPackagesPage onOpenContact={goToContact} />}
            {activeTab === 'visa-services' && <VisaServicesPage onOpenContact={goToContact} />}
            {activeTab === 'flight-booking' && <FlightBookingPage onOpenContact={goToContact} />}
            {activeTab === 'hotel-booking' && <HotelBookingPage onOpenContact={goToContact} />}
            {activeTab === 'travel-insurance' && <TravelInsurancePage onOpenContact={goToContact} />}
            {activeTab === 'gallery' && <GalleryPage />}
            {activeTab === 'blog' && <BlogPage />}
            {activeTab === 'faq' && <FAQPage />}
            {activeTab === 'testimonials' && <TestimonialsPage />}
            {activeTab === 'contact' && <ContactPage />}

            {activeTab === 'privacy-policy' && <PrivacyPolicyPage />}
            {activeTab === 'terms-conditions' && <TermsConditionsPage />}
            {activeTab === 'cancellation-policy' && <CancellationPolicyPage />}

            {activeTab === 'trips' && (
              <MyTripsView
                bookings={bookings}
                savedDestinations={savedDestinations}
                onOpenDetail={(dest) => setSelectedDestination(dest)}
                onCancelBooking={handleCancelBooking}
                onExploreDestinations={goToDestinations}
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
                onExploreDestinations={goToDestinations}
                onToggleSave={handleToggleSave}
                initialTab="saved"
                currency={currency}
              />
            )}
          </>
        )}
      </main>

      <Footer onNavigate={navigateToTab} />

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

      {/* Right Menu Drawer — primary navigation below the xl breakpoint */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        regions={CONTINENT_REGIONS}
        currentRegionIndex={regionIndex}
        onSelectRegion={setRegionIndex}
        onNavigateTab={navigateToTab}
        savedCount={savedIds.length}
        tripsCount={bookings.length}
      />

    </div>
  );
}
