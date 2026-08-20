export interface WorldTourPackage {
  id: string;
  country: string;
  location: string;
  places: string;
  budgetINR: number;
  image: string;
}

// Curated shortlist of 13 handpicked international destinations for the Worldwide Tour catalogue.
// Every image below was individually verified against its destination before use.
const RAW: Omit<WorldTourPackage, 'id'>[] = [
  { country: 'Thailand', location: 'Bangkok & Pattaya', places: 'Grand Palace, Coral Island, Pattaya', budgetINR: 28000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80' },
  { country: 'Cambodia', location: 'Siem Reap', places: 'Angkor Wat, Bayon Temple, Pub Street', budgetINR: 30000, image: 'https://images.unsplash.com/photo-1770848125591-2e97455bf21d?auto=format&fit=crop&w=900&q=80' },
  { country: 'Malaysia', location: 'Kuala Lumpur', places: 'Petronas Towers, Batu Caves, Genting Highlands', budgetINR: 30000, image: 'https://images.unsplash.com/photo-1566914447826-bf04e54bf1be?auto=format&fit=crop&w=900&q=80' },
  { country: 'UAE', location: 'Dubai', places: 'Burj Khalifa, Desert Safari, Dubai Marina', budgetINR: 45000, image: 'https://images.unsplash.com/photo-1749273858638-ea678cb48e94?auto=format&fit=crop&w=900&q=80' },
  { country: 'India', location: 'Andaman Islands', places: 'Radhanagar Beach, Cellular Jail, Scuba Diving', budgetINR: 32000, image: 'https://images.unsplash.com/photo-1778090887585-b27fae5b6f03?auto=format&fit=crop&w=900&q=80' },
  { country: 'Laos', location: 'Luang Prabang', places: 'Kuang Si Falls, Royal Palace, Mekong River', budgetINR: 38000, image: 'https://images.unsplash.com/photo-1593994603100-9cd7cb22aaf1?auto=format&fit=crop&w=900&q=80' },
  { country: 'Kazakhstan', location: 'Almaty', places: 'Shymbulak, Kok Tobe, Charyn Canyon', budgetINR: 60000, image: 'https://images.unsplash.com/photo-1659651117607-d2b397cf100f?auto=format&fit=crop&w=900&q=80' },
  { country: 'Sri Lanka', location: 'Colombo & Kandy', places: 'Colombo, Kandy, Sigiriya, Bentota', budgetINR: 25000, image: 'https://images.unsplash.com/photo-1711797750174-c3750dd9d7c9?auto=format&fit=crop&w=900&q=80' },
  { country: 'Maldives', location: 'Maldives Island Escape', places: 'Malé, Maafushi, Water Villas', budgetINR: 50000, image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=80' },
  { country: 'Vietnam', location: 'Hanoi & Halong Bay', places: 'Hanoi, Halong Bay, Old Quarter', budgetINR: 30000, image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80' },
  { country: 'Indonesia', location: 'Bali Escape', places: 'Ubud, Kuta, Nusa Penida, Tanah Lot', budgetINR: 35000, image: 'https://images.unsplash.com/photo-1557093793-d149a38a1be8?auto=format&fit=crop&w=900&q=80' },
  { country: 'Singapore', location: 'Singapore City Escape', places: 'Marina Bay, Sentosa, Gardens by the Bay', budgetINR: 55000, image: 'https://images.unsplash.com/photo-1574227492706-f65b24c3688a?auto=format&fit=crop&w=900&q=80' },
  { country: 'China', location: 'Beijing', places: 'Great Wall, Forbidden City, Tiananmen', budgetINR: 65000, image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=80' },
];

export const WORLD_TOUR_PACKAGES: WorldTourPackage[] = RAW.map((item, index) => ({
  id: `world-tour-${index + 1}`,
  ...item,
}));
