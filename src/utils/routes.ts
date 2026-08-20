import { ActiveTab } from '../types';

// The URL path used for each tab. 'home' is the root.
export const TAB_PATHS: Record<ActiveTab, string> = {
  home: '/',
  about: '/about',
  destinations: '/destinations',
  'tour-packages': '/packages',
  'visa-services': '/visa-services',
  'flight-booking': '/flight-booking',
  'hotel-booking': '/hotel-booking',
  'travel-insurance': '/travel-insurance',
  gallery: '/gallery',
  blog: '/blog',
  faq: '/faq',
  testimonials: '/testimonials',
  contact: '/contact',
  favorites: '/favorites',
  trips: '/trips',
  'privacy-policy': '/privacy-policy',
  'terms-conditions': '/terms-conditions',
  'cancellation-policy': '/cancellation-policy',
};

// Human-readable page name per tab — used for <title> and any "current page" labels.
export const TAB_TITLES: Record<ActiveTab, string> = {
  home: 'Home',
  about: 'About Us',
  destinations: 'Destinations',
  'tour-packages': 'Tour Packages',
  'visa-services': 'Visa Services',
  'flight-booking': 'Flight Booking',
  'hotel-booking': 'Hotel Booking',
  'travel-insurance': 'Travel Insurance',
  gallery: 'Gallery',
  blog: 'Blog',
  faq: 'FAQ',
  testimonials: 'Testimonials',
  contact: 'Contact',
  favorites: 'Saved Favorites',
  trips: 'My Trips',
  'privacy-policy': 'Privacy Policy',
  'terms-conditions': 'Terms & Conditions',
  'cancellation-policy': 'Cancellation Policy',
};

const PATH_TO_TAB: Record<string, ActiveTab> = Object.entries(TAB_PATHS).reduce((acc, [tab, path]) => {
  acc[path] = tab as ActiveTab;
  return acc;
}, {} as Record<string, ActiveTab>);

export const COUNTRY_PATH_PREFIX = '/countries/';

const cleanPath = (pathname: string) => pathname.replace(/\/+$/, '') || '/';

export function getTabForPath(pathname: string): ActiveTab {
  return PATH_TO_TAB[cleanPath(pathname)] ?? 'home';
}

export function isKnownTabPath(pathname: string): boolean {
  return cleanPath(pathname) in PATH_TO_TAB;
}

export function getPathForTab(tab: ActiveTab): string {
  return TAB_PATHS[tab] ?? '/';
}

export function getCountryIdFromPath(pathname: string): string | null {
  const clean = cleanPath(pathname);
  if (clean.startsWith(COUNTRY_PATH_PREFIX)) {
    return decodeURIComponent(clean.slice(COUNTRY_PATH_PREFIX.length));
  }
  return null;
}

export function getPathForCountry(countryId: string): string {
  return `${COUNTRY_PATH_PREFIX}${countryId}`;
}
