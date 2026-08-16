export interface DestinationCard {
  id: string;
  title: string;
  location: string;
  image: string;
  ratingDots: number;
  ratingScore: number;
  reviewCount: number;
  pricePerNight: number;
  tag: string;
  description: string;
  category: 'coastal' | 'tea_estate' | 'rainforest' | 'mountain' | 'cultural';
}

export interface ContinentRegion {
  id: string;
  name: string;
  prevName: string;
  nextName: string;
  indexNum: number;
  totalNum: number;
  description: string;
  bgImage: string;
  destinations: DestinationCard[];
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  location: string;
  region: string;
  country: string;
  tag: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  coverImage: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  vibe: string;
  category: 'tea_estate' | 'rainforest' | 'cliffside' | 'mountain' | 'coastal';
  stats: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    elevation?: string;
  };
  amenities: {
    name: string;
    icon: string;
    description: string;
  }[];
  experiences: {
    title: string;
    description: string;
    duration: string;
    included: boolean;
  }[];
  host: {
    name: string;
    avatar: string;
    role: string;
    isSuperhost: boolean;
    responseRate: string;
    languages: string[];
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  reviews: {
    id: string;
    author: string;
    avatar: string;
    date: string;
    rating: number;
    comment: string;
  }[];
}

export interface Booking {
  id: string;
  destinationId: string;
  destination: Destination;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalNights: number;
  totalPrice: number;
  selectedAddons: string[];
  status: 'confirmed' | 'upcoming' | 'completed';
  bookedAt: string;
  guestName: string;
  guestEmail: string;
}

export type ActiveTab = 'home' | 'news' | 'favorites' | 'contact' | 'trips' | 'destinations';
