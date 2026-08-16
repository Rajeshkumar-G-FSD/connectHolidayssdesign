import React, { useState } from 'react';
import { Booking, Destination } from '../types';
import { Luggage, Calendar, MapPin, Users, Sparkles, Trash2, ArrowRight, Heart, Bookmark, Compass, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface MyTripsViewProps {
  bookings: Booking[];
  savedDestinations: Destination[];
  onOpenDetail: (destination: Destination) => void;
  onCancelBooking: (id: string) => void;
  onExploreDestinations: () => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  initialTab?: 'trips' | 'saved';
  currency: string;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({
  bookings,
  savedDestinations,
  onOpenDetail,
  onCancelBooking,
  onExploreDestinations,
  onToggleSave,
  initialTab = 'trips',
  currency,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'trips' | 'saved'>(initialTab);

  return (
    <div id="my-trips-view-page" className="min-h-screen bg-neutral-950 text-white pt-24 pb-20 px-6 sm:px-10 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Subtabs Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
              <Luggage className="w-4 h-4" />
              <span>Personal Itinerary & Wishlist</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit',sans-serif] tracking-tight">
              {activeSubTab === 'trips' ? 'My Booked Escapes' : 'Saved Wishlist'}
            </h2>
            <p className="mt-2 text-neutral-400 max-w-xl text-sm sm:text-base font-light">
              Manage your upcoming reservations, host communication, and saved dream sanctuaries.
            </p>
          </div>

          {/* Subtab Toggle Buttons */}
          <div className="flex items-center gap-2 bg-neutral-900 border border-white/10 p-1.5 rounded-full">
            <button
              onClick={() => setActiveSubTab('trips')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'trips'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Luggage className="w-3.5 h-3.5" />
              Trips ({bookings.length})
            </button>

            <button
              onClick={() => setActiveSubTab('saved')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'saved'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              Saved ({savedDestinations.length})
            </button>
          </div>
        </div>

        {/* TRIPS VIEW CONTENT */}
        {activeSubTab === 'trips' && (
          <div className="mt-10">
            {bookings.length === 0 ? (
              <div className="text-center py-20 px-6 bg-neutral-900/40 rounded-3xl border border-white/10 max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-['Outfit',sans-serif]">No upcoming reservations yet</h3>
                <p className="text-neutral-400 text-sm mt-2 max-w-md mx-auto font-light">
                  Your itinerary is empty. Explore our curated boutique retreats and book your first escape today.
                </p>
                <button
                  onClick={onExploreDestinations}
                  className="mt-6 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs tracking-wide transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
                >
                  <span>Explore Featured Escapes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((b) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between shadow-xl"
                  >
                    {/* Stay Image & Info */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full lg:w-auto">
                      <img
                        src={b.destination.coverImage}
                        alt={b.destination.name}
                        className="w-full sm:w-44 h-32 object-cover rounded-2xl border border-white/10 cursor-pointer"
                        onClick={() => onOpenDetail(b.destination)}
                      />

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
                            {b.status.toUpperCase()}
                          </span>
                          <span className="text-xs text-neutral-400 font-mono">Ref: {b.id}</span>
                        </div>

                        <h3
                          onClick={() => onOpenDetail(b.destination)}
                          className="text-2xl font-bold font-['Outfit',sans-serif] text-white hover:text-emerald-300 transition-colors cursor-pointer"
                        >
                          {b.destination.name}
                        </h3>

                        <p className="text-xs text-neutral-300 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          {b.destination.location} • {b.destination.country}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                            {b.checkIn} → {b.checkOut} ({b.totalNights} nights)
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-emerald-400" />
                            {b.guests} Guests
                          </span>
                        </div>

                        {b.selectedAddons.length > 0 && (
                          <div className="pt-1 flex flex-wrap gap-1.5">
                            {b.selectedAddons.map((addon, idx) => (
                              <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 border border-white/10 text-emerald-300">
                                + {addon}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price & Manage Actions */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-white/10 gap-4">
                      <div className="text-left lg:text-right">
                        <span className="text-xs text-neutral-400 block">Total Paid</span>
                        <span className="text-2xl font-bold text-emerald-400 font-['Outfit',sans-serif]">
                          {currency}{b.totalPrice}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenDetail(b.destination)}
                          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onCancelBooking(b.id)}
                          title="Cancel Reservation"
                          className="p-2 rounded-full bg-neutral-800 hover:bg-rose-900/60 border border-white/10 text-neutral-400 hover:text-rose-300 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVED WISHLIST VIEW CONTENT */}
        {activeSubTab === 'saved' && (
          <div className="mt-10">
            {savedDestinations.length === 0 ? (
              <div className="text-center py-20 px-6 bg-neutral-900/40 rounded-3xl border border-white/10 max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center mx-auto mb-4 text-rose-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-['Outfit',sans-serif]">Your wishlist is empty</h3>
                <p className="text-neutral-400 text-sm mt-2 max-w-md mx-auto font-light">
                  Tap the bookmark icon on any escape card to save it for your next trip planning session.
                </p>
                <button
                  onClick={onExploreDestinations}
                  className="mt-6 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wide transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
                >
                  <span>Discover Escapes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedDestinations.map((d) => (
                  <div
                    key={d.id}
                    className="bg-neutral-900/70 border border-white/10 rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between"
                    onClick={() => onOpenDetail(d)}
                  >
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <img src={d.coverImage} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          onClick={(e) => onToggleSave(d.id, e)}
                          className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg"
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                      <div className="absolute bottom-3 right-4 z-10">
                        <div className="px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-xs font-bold text-emerald-400">
                          {currency}{d.pricePerNight} / night
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">{d.tag}</span>
                        <h4 className="text-lg font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">{d.name}</h4>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{d.shortDescription}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-amber-400 font-semibold">★ {d.rating} ({d.reviewCount})</span>
                        <button className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 text-xs font-bold transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
