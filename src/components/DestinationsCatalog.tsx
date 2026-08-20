import React, { useState } from 'react';
import { Destination } from '../types';
import { WorldTourPackage } from '../data/worldTourPackages';
import { Star, Bookmark, MapPin, Users, Bed, Bath, Filter, Sparkles, Compass, ArrowRight, Search, Heart, Scale, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface DestinationsCatalogProps {
  destinations: Destination[];
  worldTours: WorldTourPackage[];
  onOpenDetail: (destination: Destination) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  currency: string;
}

export const DestinationsCatalog: React.FC<DestinationsCatalogProps> = ({
  destinations,
  worldTours,
  onOpenDetail,
  savedIds,
  onToggleSave,
  currency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<'india' | 'south-india' | 'worldwide'>('india');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const formatINR = (amount: number) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(amount * 86);

  const categories = [
    { id: 'all', label: 'All Escapes' },
    { id: 'tea_estate', label: '🌿 Tea Estates & Valleys' },
    { id: 'rainforest', label: '🌴 Tropical Rainforests' },
    { id: 'cliffside', label: '🌊 Cliffside & Coast' },
    { id: 'mountain', label: '⛰️ Mountain & Onsen' },
  ];

  const filteredDestinations = destinations
    .filter((d) => {
      const matchCollection = selectedCollection === 'worldwide'
        || (selectedCollection === 'india' && d.country === 'India')
        || (selectedCollection === 'south-india' && d.country === 'India' && /ooty|munnar|kerala|nilgiri/i.test(`${d.location} ${d.region}`));
      const matchCategory = selectedCategory === 'all' || d.category === selectedCategory;
      const matchSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = d.pricePerNight <= maxPrice;
      const matchWishlist = !wishlistOnly || savedIds.includes(d.id);
      return matchCollection && matchCategory && matchSearch && matchPrice && matchWishlist;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price-high') return b.pricePerNight - a.pricePerNight;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const toggleCompare = (id: string) => {
    setCompareIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current.slice(-1), id]);
  };
  const comparedPackages = destinations.filter((destination) => compareIds.includes(destination.id));
  const filteredWorldTours = worldTours.filter((tour) => {
    const query = searchQuery.toLowerCase();
    return !query || `${tour.country} ${tour.location} ${tour.places}`.toLowerCase().includes(query);
  });

  return (
    <div id="destinations-catalog-page" className="min-h-screen bg-neutral-950 text-white pt-24 pb-20 px-6 sm:px-10 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
              <Compass className="w-4 h-4" />
              <span>India & Worldwide Tour Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit',sans-serif] tracking-tight">
              Curated Dream Escapes
            </h2>
            <p className="mt-2 text-neutral-400 max-w-xl text-sm sm:text-base font-light">
              Handpicked 5 nights / 6 days journeys with Indian-rupee pricing and location-led stays.
            </p>
          </div>

          {/* View Mode Toggle: Grid vs Visual Map */}
          <div className="flex items-center gap-2 bg-neutral-900 border border-white/10 p-1 rounded-full">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-emerald-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'map' ? 'bg-emerald-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Interactive Map
            </button>
          </div>
        </div>

        {/* Tour collection chooser */}
        <div className="grid gap-3 py-7 sm:grid-cols-3">
          {[
            { id: 'india', title: 'India', count: '20 locations', copy: 'Classic holidays across India' },
            { id: 'south-india', title: 'South India', count: '30 locations', copy: 'Kerala, Tamil Nadu & hill escapes' },
            { id: 'worldwide', title: 'Worldwide Tour', count: '13 locations', copy: 'International handpicked tours' },
          ].map((collection) => (
            <button
              key={collection.id}
              onClick={() => setSelectedCollection(collection.id as typeof selectedCollection)}
              className={`rounded-2xl border p-5 text-left transition-all ${selectedCollection === collection.id ? 'border-emerald-400 bg-emerald-400/10 shadow-lg shadow-emerald-950/30' : 'border-white/10 bg-neutral-900/70 hover:border-white/30'}`}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">{collection.count}</span>
              <h3 className="mt-2 text-xl font-bold">{collection.title}</h3>
              <p className="mt-1 text-xs text-neutral-400">{collection.copy}</p>
            </button>
          ))}
        </div>

        {/* Requested trip tools */}
        <div className="mb-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-neutral-900/70 px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-emerald-400" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search location" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-500" />
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-neutral-900/70 px-4 py-3 text-sm text-neutral-300">
            <Filter className="h-4 w-4 text-emerald-400" />
            <span>Filters</span><span className="ml-auto text-xs text-neutral-500">Type & price</span>
          </div>
          <button onClick={() => setWishlistOnly((value) => !value)} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${wishlistOnly ? 'border-rose-400 bg-rose-500/15 text-white' : 'border-white/10 bg-neutral-900/70 text-neutral-300 hover:border-white/30'}`}>
            <Heart className={`h-4 w-4 ${wishlistOnly ? 'fill-rose-400 text-rose-400' : 'text-emerald-400'}`} />
            Wishlist <span className="ml-auto text-xs">{savedIds.length}</span>
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-neutral-900/70 px-4 py-3 text-sm text-neutral-300">
            <Scale className="h-4 w-4 text-emerald-400" />
            Compare Packages <span className="ml-auto text-xs">{compareIds.length}/2</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-neutral-950 font-semibold shadow-md'
                    : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-neutral-900 border border-white/15 rounded-full px-3 py-2 text-xs text-neutral-300 outline-none focus:border-emerald-400 cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Location-based 5N / 6D tour packages */}
        <section className="mb-10 rounded-3xl border border-white/10 bg-neutral-900/45 p-5 sm:p-7">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Featured itineraries</p>
              <h3 className="mt-1 text-2xl font-bold">5 Nights / 6 Days packages</h3>
            </div>
            <span className="text-xs text-neutral-400">Based on your selected location</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.slice(0, 3).map((destination) => {
              const isCompared = compareIds.includes(destination.id);
              return (
                <article key={`package-${destination.id}`} className={`overflow-hidden rounded-2xl border bg-neutral-950/60 ${isCompared ? 'border-emerald-400' : 'border-white/10'}`}>
                  <img src={destination.coverImage} alt={`${destination.location} tour`} className="h-36 w-full object-cover" />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold">{destination.location}</h4>
                        <p className="mt-1 text-xs text-neutral-400">Hotel stay · local sightseeing · breakfast</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-bold text-emerald-300">5N / 6D</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-sm font-bold text-emerald-300">From {formatINR(destination.pricePerNight * 6)}</span>
                      <button onClick={() => toggleCompare(destination.id)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${isCompared ? 'bg-emerald-500 text-neutral-950' : 'bg-white/10 hover:bg-white/20'}`}>
                        {isCompared ? 'Added to compare' : 'Compare'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {comparedPackages.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-3 text-sm">
              <Scale className="h-4 w-4 text-emerald-400" />
              <span className="text-neutral-300">Comparing:</span>
              {comparedPackages.map((destination) => <span key={destination.id} className="rounded-full bg-neutral-950 px-3 py-1 text-xs text-white">{destination.location} · {formatINR(destination.pricePerNight * 6)}</span>)}
            </div>
          )}
        </section>

        {selectedCollection === 'worldwide' && (
          <section className="mb-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">13 worldwide locations</p>
                <h3 className="mt-1 text-2xl font-bold">World Tour packages</h3>
              </div>
              <span className="text-xs text-neutral-400">{filteredWorldTours.length} matching tours</span>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredWorldTours.map((tour) => {
                const isCompared = compareIds.includes(tour.id);
                return (
                  <article key={tour.id} className={`overflow-hidden rounded-3xl border bg-neutral-900/70 ${isCompared ? 'border-emerald-400' : 'border-white/10'}`}>
                    <img src={tour.image} alt={`${tour.location}, ${tour.country}`} className="h-48 w-full object-cover" loading="lazy" />
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">{tour.country}</p>
                          <h4 className="mt-1 text-lg font-bold">{tour.location}</h4>
                        </div>
                        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-neutral-200">4N / 5D</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-400 line-clamp-2">{tour.places}</p>
                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                        <span className="font-bold text-emerald-300">From {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(tour.budgetINR)}</span>
                        <button onClick={() => toggleCompare(tour.id)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${isCompared ? 'bg-emerald-500 text-neutral-950' : 'bg-white/10 hover:bg-white/20'}`}>
                          {isCompared ? 'Added' : 'Compare'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Visual Map View (if selected) */}
        {viewMode === 'map' && (
          <div className="mb-12 rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 relative h-[460px] p-6 flex flex-col justify-between">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-neutral-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-neutral-300">
                🗺️ Global Coordinates Explorer • <strong>{filteredDestinations.length} Escapes Mapped</strong>
              </div>
              <span className="text-xs text-neutral-400">Click any location pin to view</span>
            </div>

            {/* Interactive Map Visual with Pins */}
            <div className="relative w-full h-[320px] rounded-2xl bg-neutral-950/60 border border-white/10 overflow-hidden flex items-center justify-center">
              {/* World outline SVG representation */}
              <svg viewBox="0 0 1000 500" className="w-full h-full opacity-30 fill-neutral-700">
                <path d="M150,150 Q180,100 240,120 Q300,140 280,220 Q240,260 170,240 Z" />
                <path d="M450,120 Q520,100 560,160 Q540,220 480,200 Z" />
                <path d="M600,100 Q750,80 800,180 Q780,260 680,240 Q620,180 600,100 Z" />
                <path d="M220,300 Q260,280 280,360 Q240,420 200,380 Z" />
                <path d="M480,240 Q550,220 580,320 Q520,400 460,320 Z" />
                <path d="M720,300 Q800,280 820,380 Q760,420 700,360 Z" />
              </svg>

              {/* Plotted Pins */}
              {destinations.map((d, index) => {
                // Map approximate normalized coordinates to layout positions
                const pinPositions: Record<string, { top: string; left: string }> = {
                  'nilgiri-heights': { top: '56%', left: '68%' },
                  'costa-verde-sanctuary': { top: '48%', left: '26%' },
                  'cloud-mist-chalet': { top: '58%', left: '69%' },
                  'amalfi-azure-villa': { top: '34%', left: '51%' },
                  'kintamani-bamboo-haven': { top: '64%', left: '80%' },
                  'hakone-pine-villa': { top: '36%', left: '86%' },
                };
                const pos = pinPositions[d.id] || { top: '50%', left: '50%' };

                return (
                  <div
                    key={d.id}
                    style={{ top: pos.top, left: pos.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    onClick={() => onOpenDetail(d)}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-8 h-8 rounded-full bg-emerald-500/30 animate-ping" />
                      <div className="w-9 h-9 rounded-full bg-emerald-500 text-neutral-950 border-2 border-white flex items-center justify-center font-bold text-xs shadow-lg hover:scale-110 transition-transform">
                        {index + 1}
                      </div>

                      {/* Tooltip Card on Hover */}
                      <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-48 bg-neutral-900/95 border border-white/20 rounded-2xl p-2.5 shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                        <img src={d.coverImage} alt={d.name} className="w-full h-20 object-cover rounded-lg mb-1.5" />
                        <h4 className="font-bold text-xs text-white truncate">{d.name}</h4>
                        <div className="flex items-center justify-between text-[11px] text-neutral-300 mt-0.5">
                          <span className="text-emerald-400 font-semibold">{formatINR(d.pricePerNight)}/night</span>
                          <span>★ {d.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Destination Cards Grid */}
        {selectedCollection !== 'worldwide' && (filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/40 rounded-3xl border border-white/10">
            <Sparkles className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold">No matching escapes found</h3>
            <p className="text-neutral-400 text-sm mt-1">Try adjusting your search terms or filter categories.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => {
              const isSaved = savedIds.includes(destination.id);

              return (
                <motion.div
                  key={destination.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-neutral-900/70 border border-white/10 hover:border-emerald-500/40 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/30 cursor-pointer"
                  onClick={() => onOpenDetail(destination)}
                >
                  {/* Card Cover Image with Overlays */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-neutral-800">
                    <img
                      src={destination.coverImage}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Location Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full bg-neutral-950/70 border border-white/15 backdrop-blur-md text-[11px] font-semibold tracking-wider text-neutral-200 uppercase flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        {destination.tag}
                      </span>
                    </div>

                    {/* Bookmark Button */}
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={(e) => onToggleSave(destination.id, e)}
                        className={`w-9 h-9 rounded-full border backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 ${
                          isSaved
                            ? 'bg-rose-500 border-rose-400 text-white'
                            : 'bg-neutral-950/70 hover:bg-neutral-900 border-white/20 text-neutral-200'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Gradient bottom scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

                    {/* Floating Price Pill */}
                    <div className="absolute bottom-3 right-4 z-10">
                      <div className="px-3 py-1 rounded-full bg-neutral-950/80 border border-white/15 backdrop-blur-md text-xs">
                        <span className="text-emerald-400 font-bold text-sm">{formatINR(destination.pricePerNight)}</span>
                        <span className="text-neutral-400 ml-1">/ night</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Review Count */}
                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                        <div className="flex items-center gap-1 font-medium text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="text-white font-semibold">{destination.rating}</span>
                          <span className="text-neutral-400">({destination.reviewCount})</span>
                        </div>
                        <span className="text-neutral-400">{destination.vibe.split('&')[0]}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white group-hover:text-emerald-300 transition-colors">
                        {destination.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs text-neutral-300 line-clamp-2 leading-relaxed font-light">
                        {destination.shortDescription}
                      </p>

                      {/* Key Stats Chips */}
                      <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400 border-t border-white/5 pt-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-emerald-400" />
                          {destination.stats.guests} guests
                        </span>
                        <span className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-emerald-400" />
                          {destination.stats.bedrooms} bed
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-emerald-400" />
                          {destination.stats.bathrooms} bath
                        </span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-emerald-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Explore Retreat <ArrowRight className="w-3.5 h-3.5" />
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDetail(destination);
                        }}
                        className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
                      >
                        Book Stay
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}

      </div>
    </div>
  );
};
