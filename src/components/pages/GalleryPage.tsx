import React, { useState } from 'react';
import { Images, ArrowUpRight } from 'lucide-react';
import { PageShell } from '../PageShell';

type GalleryCategory = 'domestic' | 'international' | 'adventure' | 'heritage' | 'trips';

interface GalleryPlace {
  id: string;
  name: string;
  country: string;
  image: string;
  categories: GalleryCategory[];
}

const TABS: { id: 'all' | GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'domestic', label: 'Domestic' },
  { id: 'international', label: 'International' },
  { id: 'adventure', label: 'Adventure/Wildlife' },
  { id: 'heritage', label: 'Heritage/Temple' },
  { id: 'trips', label: 'Trips' },
];

// Every image below is reused from elsewhere in the app, where it was already
// verified against its place name before use.
const PLACES: GalleryPlace[] = [
  { id: 'taj-mahal', name: 'Taj Mahal', country: 'Agra, India', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=85', categories: ['domestic', 'heritage'] },
  { id: 'hawa-mahal', name: 'Hawa Mahal', country: 'Jaipur, India', image: 'https://images.unsplash.com/photo-1741975369004-8ee28a95a7f6?auto=format&fit=crop&w=700&q=85', categories: ['domestic', 'heritage'] },
  { id: 'kerala-backwaters', name: 'Kerala Backwaters', country: 'Alleppey, India', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=85', categories: ['domestic', 'trips'] },
  { id: 'goa-beaches', name: 'Goa Beaches', country: 'Goa, India', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=85', categories: ['domestic', 'trips'] },
  { id: 'ladakh', name: 'Ladakh', country: 'Ladakh, India', image: 'https://images.unsplash.com/photo-1757007813494-f9e7b880d2c6?auto=format&fit=crop&w=700&q=85', categories: ['domestic', 'adventure'] },
  { id: 'andaman', name: 'Andaman Islands', country: 'Andaman, India', image: 'https://images.unsplash.com/photo-1778090887585-b27fae5b6f03?auto=format&fit=crop&w=700&q=85', categories: ['domestic', 'adventure', 'trips'] },
  { id: 'golden-temple', name: 'Golden Temple', country: 'Amritsar, India', image: 'https://images.unsplash.com/photo-1757552528834-09a6e8c7c9ed?auto=format&fit=crop&w=700&q=85', categories: ['domestic', 'heritage'] },
  { id: 'mysore-palace', name: 'Mysore Palace', country: 'Mysore, India', image: 'https://images.unsplash.com/photo-1657856855186-7cf4909a4f78?auto=format&fit=crop&w=700&q=85', categories: ['domestic', 'heritage'] },
  { id: 'munnar', name: 'Munnar', country: 'Kerala, India', image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=700&q=85', categories: ['domestic', 'trips', 'adventure'] },
  { id: 'ooty', name: 'Ooty', country: 'Tamil Nadu, India', image: 'https://images.unsplash.com/photo-1761442663511-2558e561f15e?auto=format&fit=crop&w=700&q=85', categories: ['domestic', 'trips'] },
  { id: 'burj-khalifa', name: 'Burj Khalifa', country: 'Dubai', image: 'https://images.unsplash.com/photo-1749273858638-ea678cb48e94?auto=format&fit=crop&w=700&q=85', categories: ['international'] },
  { id: 'angkor-wat', name: 'Angkor Wat', country: 'Cambodia', image: 'https://images.unsplash.com/photo-1770848125591-2e97455bf21d?auto=format&fit=crop&w=700&q=85', categories: ['international', 'heritage'] },
  { id: 'petronas-towers', name: 'Petronas Twin Towers', country: 'Malaysia', image: 'https://images.unsplash.com/photo-1566914447826-bf04e54bf1be?auto=format&fit=crop&w=700&q=85', categories: ['international'] },
  { id: 'sigiriya', name: 'Sigiriya Rock', country: 'Sri Lanka', image: 'https://images.unsplash.com/photo-1711797750174-c3750dd9d7c9?auto=format&fit=crop&w=700&q=85', categories: ['international', 'heritage'] },
  { id: 'maldives', name: 'Maldives', country: 'Maldives', image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=700&q=85', categories: ['international', 'trips'] },
  { id: 'halong-bay', name: 'Halong Bay', country: 'Vietnam', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=700&q=85', categories: ['international', 'adventure'] },
  { id: 'kelingking-beach', name: 'Kelingking Beach', country: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85', categories: ['international', 'trips'] },
  { id: 'marina-bay-sands', name: 'Marina Bay Sands', country: 'Singapore', image: 'https://images.unsplash.com/photo-1574227492706-f65b24c3688a?auto=format&fit=crop&w=700&q=85', categories: ['international'] },
  { id: 'great-wall', name: 'Great Wall', country: 'China', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=700&q=85', categories: ['international', 'heritage'] },
  { id: 'kuang-si-falls', name: 'Kuang Si Falls', country: 'Laos', image: 'https://images.unsplash.com/photo-1593994603100-9cd7cb22aaf1?auto=format&fit=crop&w=700&q=85', categories: ['international', 'adventure'] },
];

// Position (0-indexed) in the "All" grid where the featured CTA tile sits —
// matches the reference layout (2nd row, 3rd column of a 5-wide grid).
const CTA_SLOT = 7;

interface GalleryPageProps {
  onExploreDestinations?: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onExploreDestinations }) => {
  const [activeTab, setActiveTab] = useState<'all' | GalleryCategory>('all');

  const filtered = activeTab === 'all' ? PLACES : PLACES.filter((p) => p.categories.includes(activeTab));

  const tiles: React.ReactNode[] = filtered.map((place) => (
    <div key={place.id} className="group relative aspect-[4/3] overflow-hidden bg-neutral-900">
      <img
        src={place.image}
        alt={place.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <p className="font-['Playfair_Display',serif] italic text-base sm:text-lg text-white drop-shadow-sm leading-tight">
          {place.name}
        </p>
        <p className="text-[11px] text-white/70 tracking-wide">{place.country}</p>
      </div>
    </div>
  ));

  // Splice the featured "explore more" tile into the All view, matching the reference layout.
  if (activeTab === 'all' && onExploreDestinations) {
    tiles.splice(
      Math.min(CTA_SLOT, tiles.length),
      0,
      <button
        key="cta-explore-more"
        onClick={onExploreDestinations}
        title="Explore all destinations"
        className="group relative aspect-[4/3] flex flex-col items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer text-center px-4"
      >
        <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white">
          <Images className="h-4 w-4" />
        </span>
        <span className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-extrabold tracking-wide text-white">
          EXPLORE MORE
        </span>
        <span className="flex items-center gap-1 text-sm text-white/85">
          13 Worldwide Destinations <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </button>,
    );
  }

  return (
    <PageShell
      icon={Images}
      eyebrow="Wanderlust"
      title="Travel Gallery"
      description="A glimpse of the destinations our travellers fall in love with."
      maxWidth="max-w-[1600px]"
    >
      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-white/10 pb-4 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'text-emerald-400 border-emerald-400'
                : 'text-neutral-400 border-neutral-700 hover:text-neutral-200 hover:border-neutral-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Edge-to-edge photo mosaic */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[2px] bg-neutral-950">
        {tiles}
      </div>
    </PageShell>
  );
};
