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
  japan: { budget: 65000, standard: 95000, premium: 145000 },
  italy: { budget: 78000, standard: 110000, premium: 165000 },
  france: { budget: 72000, standard: 105000, premium: 158000 },
  indonesia: { budget: 42000, standard: 62000, premium: 95000 },
  greece: { budget: 75000, standard: 108000, premium: 160000 },
  uae: { budget: 48000, standard: 68000, premium: 98000 },
  thailand: { budget: 35000, standard: 52000, premium: 78000 },
  vietnam: { budget: 38000, standard: 55000, premium: 82000 },
  australia: { budget: 95000, standard: 135000, premium: 195000 },
  switzerland: { budget: 105000, standard: 145000, premium: 210000 },
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
