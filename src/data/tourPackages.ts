import { ItineraryDay } from '../types';

export type PackageType = 'Domestic' | 'International';

export const PACKAGE_CATEGORIES = ['Honeymoon', 'Nature & Hills', 'Beach & Islands', 'Adventure', 'Luxury'] as const;
export type PackageCategory = (typeof PACKAGE_CATEGORIES)[number];

export interface TourPackage {
  id: string;
  title: string;
  type: PackageType;
  category: PackageCategory;
  duration: string;
  groupSize: string;
  priceINR: number;
  image: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
}

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'bali-honeymoon',
    title: 'Bali Honeymoon Escape',
    type: 'International',
    category: 'Honeymoon',
    duration: '6 Nights / 7 Days',
    groupSize: '2 Travellers',
    priceINR: 68999,
    image: 'https://images.unsplash.com/photo-1557093793-d149a38a1be8?auto=format&fit=crop&w=1200&q=85',
    inclusions: [
      'Private pool villa accommodation',
      'Daily breakfast',
      'Private car airport transfers',
      'Ubud & Kintamani guided sightseeing',
      'Candlelight beach dinner',
      'All applicable taxes',
    ],
    exclusions: [
      'International airfare',
      'Visa fees',
      'Travel insurance',
      'Personal expenses & shopping',
      'Meals not mentioned in itinerary',
      'Tips & gratuities',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Bali', description: 'Private transfer to your pool villa, welcome drink, and evening at leisure.' },
      { day: 2, title: 'Ubud Sightseeing', description: 'Tegallalang rice terraces, Monkey Forest and traditional art villages.' },
      { day: 3, title: 'Kintamani Volcano Tour', description: 'Mount Batur viewpoint and a stop at a local coffee plantation.' },
      { day: 4, title: 'Leisure & Spa Day', description: 'Free morning with an optional couple\'s spa treatment and private pool time.' },
      { day: 5, title: 'Candlelight Beach Dinner', description: 'A romantic sunset dinner set up on the beach.' },
      { day: 6, title: 'Free Day', description: 'Optional water sports or explore Seminyak on your own.' },
      { day: 7, title: 'Departure', description: 'Private transfer to the airport for your return flight.' },
    ],
  },
  {
    id: 'kerala-backwaters',
    title: 'Kerala Backwaters & Hills',
    type: 'Domestic',
    category: 'Nature & Hills',
    duration: '5 Nights / 6 Days',
    groupSize: 'Family / Couple',
    priceINR: 24999,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
    inclusions: [
      'Hotel + overnight houseboat stay',
      'All meals (breakfast, lunch, dinner)',
      'AC vehicle for transfers & sightseeing',
      'Munnar tea garden tour',
      'Ayurvedic spa session',
      'All applicable taxes',
    ],
    exclusions: [
      'Flight/train fare to Kochi',
      'Personal expenses',
      'Entry tickets not mentioned',
      'Travel insurance',
      'Tips & gratuities',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Kochi', description: 'Transfer to Munnar, check-in and evening at leisure.' },
      { day: 2, title: 'Munnar Tea Gardens', description: 'Visit the Tea Museum, Mattupetty Dam and Echo Point.' },
      { day: 3, title: 'Thekkady', description: 'Periyar Wildlife Sanctuary and a guided spice plantation walk.' },
      { day: 4, title: 'Alleppey Houseboat', description: 'Overnight stay aboard a traditional houseboat on the backwaters.' },
      { day: 5, title: 'Kovalam Beach', description: 'Free day to relax by the beach with an optional Ayurvedic massage.' },
      { day: 6, title: 'Departure', description: 'Transfer to Trivandrum for your onward journey.' },
    ],
  },
  {
    id: 'thailand-explorer',
    title: 'Thailand Island Explorer',
    type: 'International',
    category: 'Beach & Islands',
    duration: '5 Nights / 6 Days',
    groupSize: 'Group / Couple',
    priceINR: 47999,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85',
    inclusions: [
      '4-star hotel accommodation',
      'Daily breakfast',
      'Phi Phi Islands speedboat tour',
      'Bangkok city sightseeing',
      'Visa assistance',
      'Airport transfers',
    ],
    exclusions: [
      'International airfare',
      'Meals other than breakfast',
      'Personal expenses',
      'Travel insurance',
      'Tips & gratuities',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Phuket', description: 'Check-in and free evening to explore Patong.' },
      { day: 2, title: 'Phi Phi Islands', description: 'Full-day speedboat tour of Phi Phi and Maya Bay.' },
      { day: 3, title: 'Krabi Sightseeing', description: 'Railay Beach and Ao Nang limestone cliffs.' },
      { day: 4, title: 'Fly to Bangkok', description: 'Domestic flight to Bangkok and city orientation tour.' },
      { day: 5, title: 'Bangkok Temples', description: 'Grand Palace, Wat Pho and Wat Arun guided tour.' },
      { day: 6, title: 'Departure', description: 'Transfer to the airport for your return flight.' },
    ],
  },
  {
    id: 'himachal-adventure',
    title: 'Himachal Mountain Adventure',
    type: 'Domestic',
    category: 'Adventure',
    duration: '6 Nights / 7 Days',
    groupSize: 'Group',
    priceINR: 21999,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85',
    inclusions: [
      'Hotel/camp accommodation',
      'Daily breakfast & dinner',
      'AC coach travel',
      'Adventure activities (rafting, paragliding as applicable)',
      'Professional trek guide',
    ],
    exclusions: [
      'Lunch',
      'Personal adventure gear',
      'Travel insurance',
      'Entry fees not mentioned',
      'Tips & gratuities',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Shimla', description: 'Check-in and evening at leisure on the Mall Road.' },
      { day: 2, title: 'Shimla Sightseeing', description: 'Kufri and local viewpoints around Shimla.' },
      { day: 3, title: 'Shimla to Manali', description: 'Scenic drive through the Kullu Valley.' },
      { day: 4, title: 'Manali Adventure Day', description: 'Optional paragliding and river rafting.' },
      { day: 5, title: 'Kasol & Parvati Valley', description: 'Day excursion to the Parvati Valley.' },
      { day: 6, title: 'Solang Valley & Rohtang', description: 'Snow-capped viewpoints, subject to weather and permits.' },
      { day: 7, title: 'Departure', description: 'Transfer out from Manali.' },
    ],
  },
  {
    id: 'dubai-luxury',
    title: 'Dubai Luxury Getaway',
    type: 'International',
    category: 'Luxury',
    duration: '4 Nights / 5 Days',
    groupSize: 'Family / Couple',
    priceINR: 55999,
    image: 'https://images.unsplash.com/photo-1749273858638-ea678cb48e94?auto=format&fit=crop&w=1200&q=85',
    inclusions: [
      '4-star hotel stay',
      'Daily breakfast',
      'Burj Khalifa 124th floor entry',
      'Desert safari with BBQ dinner',
      'Dubai Marina cruise',
      'Airport transfers',
    ],
    exclusions: [
      'International airfare',
      'Visa fees',
      'Lunch & dinner (except mentioned)',
      'Personal expenses',
      'Travel insurance',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Dubai', description: 'Check-in and evening free at leisure.' },
      { day: 2, title: 'Burj Khalifa & Downtown', description: '124th floor entry and Dubai Mall fountain show.' },
      { day: 3, title: 'Desert Safari', description: 'Dune bashing, camel ride and a BBQ dinner under the stars.' },
      { day: 4, title: 'Dubai Marina Cruise', description: 'Evening dhow cruise with dinner along the marina skyline.' },
      { day: 5, title: 'Departure', description: 'Transfer to the airport for your return flight.' },
    ],
  },
  {
    id: 'goa-getaway',
    title: 'Goa Beach Getaway',
    type: 'Domestic',
    category: 'Beach & Islands',
    duration: '3 Nights / 4 Days',
    groupSize: 'Group / Couple',
    priceINR: 14999,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85',
    inclusions: [
      'Beachfront resort stay',
      'Daily breakfast',
      'North & South Goa sightseeing',
      'Water sports session',
      'Airport pickup & drop',
    ],
    exclusions: [
      'Flight fare',
      'Lunch & dinner',
      'Alcoholic beverages',
      'Personal expenses',
      'Travel insurance',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Goa', description: 'Check-in and free evening on the beach.' },
      { day: 2, title: 'North Goa Sightseeing', description: 'Baga, Calangute and Fort Aguada.' },
      { day: 3, title: 'South Goa Sightseeing', description: 'Basilica of Bom Jesus and Colva Beach.' },
      { day: 4, title: 'Departure', description: 'Airport drop-off for your return flight.' },
    ],
  },
];

export interface PackageOffer {
  id: string;
  title: string;
  description: string;
  code?: string;
}

export const PACKAGE_OFFERS: PackageOffer[] = [
  {
    id: 'early-bird',
    title: 'Early Bird Offer',
    description: 'Book 45 days in advance on any package and save 10% instantly.',
    code: 'EARLY10',
  },
  {
    id: 'group-discount',
    title: 'Group Discount',
    description: 'Travelling with 6 or more? Get a flat 12% off on domestic and international packages.',
    code: 'GROUP12',
  },
  {
    id: 'honeymoon-special',
    title: 'Honeymoon Special',
    description: 'Complimentary candlelight dinner and room upgrade on select honeymoon packages.',
  },
  {
    id: 'festive-offer',
    title: 'Festive Season Offer',
    description: 'Flat ₹5,000 off on bookings confirmed this month.',
    code: 'FESTIVE5K',
  },
];
