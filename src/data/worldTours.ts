export interface TourPlace {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface TourCategory {
  id: 'india' | 'south-india' | 'world-tour';
  label: string;
  places: TourPlace[];
}

// Every image below was individually verified against its place name before use.
export const TOUR_CATEGORIES: TourCategory[] = [
  {
    id: 'india',
    label: 'India',
    places: [
      { id: 'taj-mahal', name: 'Taj Mahal', description: 'The iconic marble mausoleum in Agra, a UNESCO World Heritage wonder.', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=85' },
      { id: 'hawa-mahal', name: 'Hawa Mahal', description: 'The pink sandstone "Palace of Winds" in the heart of Jaipur.', image: 'https://images.unsplash.com/photo-1741975369004-8ee28a95a7f6?auto=format&fit=crop&w=600&q=85' },
      { id: 'kerala-backwaters', name: 'Kerala Backwaters', description: 'Palm-fringed canals explored by traditional houseboat.', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=85' },
      { id: 'goa-beaches', name: 'Goa Beaches', description: 'Golden sands and laid-back beach shacks on the Arabian Sea.', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=85' },
      { id: 'varanasi-ghats', name: 'Varanasi Ghats', description: 'Ancient riverside steps along the sacred Ganges.', image: 'https://images.unsplash.com/photo-1762513839526-c596f5e99a9a?auto=format&fit=crop&w=600&q=85' },
      { id: 'ladakh', name: 'Ladakh', description: 'High-altitude Himalayan landscapes around Pangong Lake.', image: 'https://images.unsplash.com/photo-1757007813494-f9e7b880d2c6?auto=format&fit=crop&w=600&q=85' },
      { id: 'rishikesh', name: 'Rishikesh', description: 'The yoga capital of the world, on the banks of the Ganges.', image: 'https://images.unsplash.com/photo-1650341259809-9314b0de9268?auto=format&fit=crop&w=600&q=85' },
      { id: 'andaman-islands', name: 'Andaman Islands', description: 'Turquoise water and untouched tropical coastline.', image: 'https://images.unsplash.com/photo-1778090887585-b27fae5b6f03?auto=format&fit=crop&w=600&q=85' },
      { id: 'golden-temple', name: 'Golden Temple', description: 'The holiest Sikh shrine, glowing beside its sacred pool in Amritsar.', image: 'https://images.unsplash.com/photo-1757552528834-09a6e8c7c9ed?auto=format&fit=crop&w=600&q=85' },
      { id: 'mysore-palace', name: 'Mysore Palace', description: 'A grand royal residence famed for its Dussehra illuminations.', image: 'https://images.unsplash.com/photo-1657856855186-7cf4909a4f78?auto=format&fit=crop&w=600&q=85' },
    ],
  },
  {
    id: 'south-india',
    label: 'South India',
    places: [
      { id: 'munnar', name: 'Munnar', description: 'Rolling emerald tea estates in the Western Ghats.', image: 'https://images.unsplash.com/photo-1736950825214-1b5e2bdbb5f8?auto=format&fit=crop&w=600&q=85' },
      { id: 'ooty', name: 'Ooty', description: 'The "Queen of Hill Stations" amid the Nilgiri mountains.', image: 'https://images.unsplash.com/photo-1711553186815-8fbc95d02155?auto=format&fit=crop&w=600&q=85' },
      { id: 'kodaikanal', name: 'Kodaikanal', description: 'A misty lake town wrapped in pine and eucalyptus forest.', image: 'https://images.unsplash.com/photo-1742107939655-4f8af7484dfa?auto=format&fit=crop&w=600&q=85' },
      { id: 'alleppey', name: 'Alleppey', description: 'The "Venice of the East" and its palm-lined backwater canals.', image: 'https://images.unsplash.com/photo-1593417034675-3ed7eda1bee9?auto=format&fit=crop&w=600&q=85' },
      { id: 'mahabalipuram', name: 'Mahabalipuram', description: 'An 8th-century Shore Temple carved on the Coromandel Coast.', image: 'https://images.unsplash.com/photo-1717425139353-f8a1eac91605?auto=format&fit=crop&w=600&q=85' },
      { id: 'hampi', name: 'Hampi', description: 'The boulder-strewn ruins of a once-great Vijayanagara empire.', image: 'https://images.unsplash.com/photo-1767633994425-0eb9a3f20671?auto=format&fit=crop&w=600&q=85' },
      { id: 'coorg', name: 'Coorg', description: 'Mist-covered coffee estates in Karnataka\'s Western Ghats.', image: 'https://images.unsplash.com/photo-1458129329828-520fe3a36617?auto=format&fit=crop&w=600&q=85' },
      { id: 'wayanad', name: 'Wayanad', description: 'Dense rainforest and spice plantations in Kerala\'s highlands.', image: 'https://images.unsplash.com/photo-1679934409113-89ac476c8501?auto=format&fit=crop&w=600&q=85' },
      { id: 'rameswaram', name: 'Rameswaram', description: 'The historic Pamban rail bridge stretching across the sea.', image: 'https://images.unsplash.com/photo-1563730991359-f1f59ddf5693?auto=format&fit=crop&w=600&q=85' },
      { id: 'pondicherry', name: 'Pondicherry', description: 'Sun-bleached colonial streets in the old French Quarter.', image: 'https://images.unsplash.com/photo-1758428004389-546bb5e2065c?auto=format&fit=crop&w=600&q=85' },
    ],
  },
  {
    id: 'world-tour',
    label: 'World Tour',
    places: [
      { id: 'mount-fuji', name: 'Mount Fuji', description: "Japan's sacred snow-capped peak framed by cherry blossoms.", image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=600&q=85' },
      { id: 'amalfi-coast', name: 'Amalfi Coast', description: 'Pastel cliffside towns above the turquoise Tyrrhenian Sea.', image: 'https://images.unsplash.com/photo-1568282167464-cb0d811b05c2?auto=format&fit=crop&w=600&q=85' },
      { id: 'eiffel-tower', name: 'Eiffel Tower', description: 'The wrought-iron icon of Paris, France.', image: 'https://images.unsplash.com/photo-1694716021376-d44da3f54e8a?auto=format&fit=crop&w=600&q=85' },
      { id: 'tegallalang', name: 'Tegallalang, Bali', description: 'Emerald rice terraces cascading through Ubud\'s valley.', image: 'https://images.unsplash.com/photo-1557093793-d149a38a1be8?auto=format&fit=crop&w=600&q=85' },
      { id: 'santorini', name: 'Santorini', description: "Greece's iconic white-and-blue clifftop villages.", image: 'https://images.unsplash.com/photo-1560703649-e3055f28bcf8?auto=format&fit=crop&w=600&q=85' },
      { id: 'burj-khalifa', name: 'Burj Khalifa', description: "The world's tallest building, towering over Dubai.", image: 'https://images.unsplash.com/photo-1749273858638-ea678cb48e94?auto=format&fit=crop&w=600&q=85' },
      { id: 'ao-phra-nang', name: 'Ao Phra Nang, Thailand', description: 'Limestone karsts rising from an emerald Krabi lagoon.', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=85' },
      { id: 'halong-bay', name: 'Halong Bay', description: "Vietnam's emerald waters dotted with limestone islands.", image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=85' },
      { id: 'sydney-opera-house', name: 'Sydney Opera House', description: "Australia's sail-shaped icon on Sydney Harbour.", image: 'https://images.unsplash.com/photo-1758907598809-c2d41574478c?auto=format&fit=crop&w=600&q=85' },
      { id: 'matterhorn', name: 'Matterhorn, Zermatt', description: "Switzerland's iconic peak reflected in an alpine lake.", image: 'https://images.unsplash.com/photo-1785920602377-0032f9539bd8?auto=format&fit=crop&w=600&q=85' },
    ],
  },
];
