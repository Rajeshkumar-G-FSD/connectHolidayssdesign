import { TOP_COUNTRIES } from './topCountries';
import { TourPackageTier, ItineraryDay } from '../types';

interface CountryPricing {
  budget: number;
  standard: number;
  premium: number;
}

// Approximate per-person INR pricing for a full international/domestic package,
// reflecting each country's typical travel cost.
const PRICING: Record<string, CountryPricing> = {
  thailand: { budget: 35000, standard: 52000, premium: 78000 },
  cambodia: { budget: 32000, standard: 48000, premium: 72000 },
  malaysia: { budget: 34000, standard: 50000, premium: 76000 },
  dubai: { budget: 48000, standard: 68000, premium: 98000 },
  andaman: { budget: 28000, standard: 42000, premium: 62000 },
  laos: { budget: 36000, standard: 54000, premium: 80000 },
  kazakhstan: { budget: 55000, standard: 78000, premium: 115000 },
  'sri-lanka': { budget: 30000, standard: 45000, premium: 68000 },
  maldives: { budget: 60000, standard: 85000, premium: 130000 },
  vietnam: { budget: 38000, standard: 55000, premium: 82000 },
  bali: { budget: 40000, standard: 58000, premium: 88000 },
  singapore: { budget: 55000, standard: 78000, premium: 115000 },
  china: { budget: 58000, standard: 82000, premium: 120000 },
};

const TIER_LABELS = ['Explorer', 'Adventure', 'Premium Escape'];

function buildPackages(countryId: string, places: string[], countryName: string): TourPackageTier[] {
  const pricing = PRICING[countryId];
  const [p1, p2, p3] = places;
  return [
    {
      name: `${p1} ${TIER_LABELS[0]}`,
      priceINR: pricing.budget,
      description: `A guided introduction to ${p1} and its most iconic sights — ideal for first-time visitors to ${countryName}.`,
    },
    {
      name: `${p2} ${TIER_LABELS[1]}`,
      priceINR: pricing.standard,
      description: `An in-depth journey through ${p2} and beyond, with guided excursions and curated local experiences.`,
    },
    {
      name: `${p3} ${TIER_LABELS[2]}`,
      priceINR: pricing.premium,
      description: `Our most immersive package — private guides, premium stays and unforgettable moments around ${p3}.`,
    },
  ];
}

function buildItinerary(places: string[], countryName: string): ItineraryDay[] {
  const days: ItineraryDay[] = [
    {
      day: 1,
      title: `Arrival in ${countryName}`,
      description: `Land, transfer to your hotel, and settle in with an evening welcome briefing from your trip coordinator.`,
    },
  ];
  places.forEach((place, i) => {
    days.push({
      day: i + 2,
      title: `Explore ${place}`,
      description: `Guided sightseeing across ${place}'s must-see landmarks and local cuisine, with free time to explore at your own pace.`,
    });
  });
  days.push({
    day: places.length + 2,
    title: 'Departure',
    description: 'A free morning for last-minute shopping, then transfer to the airport for your return flight.',
  });
  return days;
}

export const COUNTRY_PACKAGES: Record<string, { packages: TourPackageTier[]; itinerary: ItineraryDay[] }> = {};

TOP_COUNTRIES.forEach((c) => {
  COUNTRY_PACKAGES[c.id] = {
    packages: buildPackages(c.id, c.places, c.country),
    itinerary: buildItinerary(c.places, c.country),
  };
});
