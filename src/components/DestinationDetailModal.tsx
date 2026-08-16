import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  X, Star, MapPin, Users, Bed, Bath, Sparkles, CheckCircle2,
  Calendar, ShieldCheck, Heart, Bookmark, ChevronLeft, ChevronRight,
  Flame, Waves, Coffee, UtensilsCrossed, Sun, Wifi, Compass, Wind, Eye
} from 'lucide-react';
import { Destination, Booking } from '../types';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookSuccess: (booking: Booking) => void;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  currency: string;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onBookSuccess,
  isSaved,
  onToggleSave,
  currency,
}) => {
  if (!destination) return null;

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState('2026-09-12');
  const [checkOutDate, setCheckOutDate] = useState('2026-09-15');
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [guestName, setGuestName] = useState('Alex Morgan');
  const [guestEmail, setGuestEmail] = useState('alex.morgan@example.com');
  const [bookingConfirmed, setBookingConfirmed] = useState<Booking | null>(null);

  const calculateNights = () => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 3;
    } catch {
      return 3;
    }
  };

  const nights = calculateNights();
  const baseTotal = destination.pricePerNight * nights;
  const cleaningFee = 85;
  const serviceFee = Math.round(baseTotal * 0.08);

  const addonPrices: Record<string, number> = {
    'Sunrise Tea Plucking & Tasting Tour': 0,
    'Twilight Deck Barbecue & Wine Pairing': 120,
    'Toda Tribal Heritage & Shola Forest Trek': 0,
    'In-Villa Ayurvedic Rejuvenation Spa': 150,
    'Private Sunset Capri Yacht Cruise': 350,
    'Lemon Grove Limoncello Workshop': 0,
    'Private Catamaran & Snorkel Charter': 280,
    'Tirta Gangga & Rice Terrace E-Bike Trek': 75,
  };

  const addonsTotal = selectedAddons.reduce((sum, title) => sum + (addonPrices[title] || 0), 0);
  const grandTotal = baseTotal + cleaningFee + serviceFee + addonsTotal;

  const handleToggleAddon = (title: string) => {
    setSelectedAddons((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#ffffff'],
      });
    } catch {
      // safe fallback
    }

    const newBooking: Booking = {
      id: `RES-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      destinationId: destination.id,
      destination,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guestsCount,
      totalNights: nights,
      totalPrice: grandTotal,
      selectedAddons,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
      guestName,
      guestEmail,
    };

    setBookingConfirmed(newBooking);
    onBookSuccess(newBooking);
  };

  // Map amenity icons
  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves className="w-4 h-4 text-emerald-400" />;
      case 'Flame': return <Flame className="w-4 h-4 text-amber-400" />;
      case 'Coffee': return <Coffee className="w-4 h-4 text-emerald-400" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4 text-emerald-400" />;
      case 'Sun': return <Sun className="w-4 h-4 text-amber-400" />;
      case 'Wifi': return <Wifi className="w-4 h-4 text-emerald-400" />;
      case 'Wind': return <Wind className="w-4 h-4 text-emerald-400" />;
      case 'Eye': return <Eye className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div
      id="destination-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-xl flex items-center justify-center p-0 sm:p-4 lg:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl min-h-screen sm:min-h-0 bg-neutral-900 border border-white/15 sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col text-white my-auto max-h-[92vh]"
      >
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-neutral-900/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
              {destination.tag}
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-['Outfit',sans-serif] truncate max-w-md">
              {destination.name}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={(e) => onToggleSave(destination.id, e)}
              className={`p-2.5 rounded-full border backdrop-blur-md transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-rose-500 border-rose-400 text-white'
                  : 'bg-neutral-800 hover:bg-neutral-700 border-white/20 text-neutral-300'
              }`}
              title={isSaved ? 'Saved' : 'Save to Wishlist'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 flex-1 scrollbar-thin">
          
          {bookingConfirmed ? (
            /* Confirmation Success State */
            <div className="py-12 px-6 max-w-xl mx-auto text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-6 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">
                Reservation Confirmed
              </span>
              <h3 className="text-3xl font-bold font-['Outfit',sans-serif] mt-2 mb-3">
                Your Escape to {destination.name} is Booked!
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                Booking reference: <strong className="text-emerald-400 font-mono">{bookingConfirmed.id}</strong>.
                A full itinerary with arrival coordinates and host contact details has been added to your trips.
              </p>

              <div className="w-full bg-neutral-800/80 border border-white/10 rounded-2xl p-5 text-left mb-8 text-xs text-neutral-300 space-y-2">
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-neutral-400">Dates:</span>
                  <span className="text-white font-medium">{bookingConfirmed.checkIn} to {bookingConfirmed.checkOut} ({bookingConfirmed.totalNights} Nights)</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-neutral-400">Guests:</span>
                  <span className="text-white font-medium">{bookingConfirmed.guests} Guests</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-400">Total Charged:</span>
                  <span className="text-emerald-400 font-bold text-sm">{currency}{bookingConfirmed.totalPrice}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold cursor-pointer transition-all shadow-lg"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column: Gallery & Details */}
              <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-8">
                
                {/* Photo Gallery Viewer */}
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-neutral-950 border border-white/15 group">
                  <img
                    src={destination.gallery[activePhotoIndex] || destination.coverImage}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />

                  {/* Previous / Next Gallery Buttons */}
                  <button
                    onClick={() => setActivePhotoIndex((prev) => (prev - 1 + destination.gallery.length) % destination.gallery.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-neutral-950/70 hover:bg-neutral-900 border border-white/20 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActivePhotoIndex((prev) => (prev + 1) % destination.gallery.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-neutral-950/70 hover:bg-neutral-900 border border-white/20 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Thumbnail Selector Strip */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/15">
                    {destination.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`w-7 h-5 rounded overflow-hidden border transition-all cursor-pointer ${
                          idx === activePhotoIndex ? 'border-emerald-400 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Specs Strip */}
                <div className="grid grid-cols-4 gap-3 bg-neutral-800/60 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Users className="w-4 h-4 text-emerald-400 mb-1" />
                    <span className="text-xs text-neutral-400">Capacity</span>
                    <span className="text-sm font-semibold text-white">{destination.stats.guests} Guests</span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-l border-white/10">
                    <Bed className="w-4 h-4 text-emerald-400 mb-1" />
                    <span className="text-xs text-neutral-400">Bedrooms</span>
                    <span className="text-sm font-semibold text-white">{destination.stats.bedrooms} Suites</span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-l border-white/10">
                    <Bath className="w-4 h-4 text-emerald-400 mb-1" />
                    <span className="text-xs text-neutral-400">Baths</span>
                    <span className="text-sm font-semibold text-white">{destination.stats.bathrooms} Baths</span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-l border-white/10">
                    <MapPin className="w-4 h-4 text-emerald-400 mb-1" />
                    <span className="text-xs text-neutral-400">Elevation</span>
                    <span className="text-sm font-semibold text-white">{destination.stats.elevation || 'Panoramic'}</span>
                  </div>
                </div>

                {/* About & Narrative */}
                <div>
                  <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white mb-3">
                    About this Sanctuary
                  </h3>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                    {destination.description}
                  </p>
                </div>

                {/* Bespoke Amenities */}
                <div>
                  <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white mb-4">
                    Exceptional Amenities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {destination.amenities.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-800/40 border border-white/5"
                      >
                        <div className="p-2 rounded-xl bg-neutral-800 border border-white/10 shrink-0">
                          {getAmenityIcon(item.icon)}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white">{item.name}</h4>
                          <p className="text-[11px] text-neutral-400 leading-snug mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curated Experiences / Add-ons */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white">
                      Curated Experiences
                    </h3>
                    <span className="text-xs text-neutral-400">Select to add to booking</span>
                  </div>

                  <div className="space-y-3">
                    {destination.experiences.map((exp, i) => {
                      const isSelected = selectedAddons.includes(exp.title);
                      const price = addonPrices[exp.title] ?? 0;

                      return (
                        <div
                          key={i}
                          onClick={() => handleToggleAddon(exp.title)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                            isSelected
                              ? 'bg-emerald-950/50 border-emerald-500/60 shadow-lg'
                              : 'bg-neutral-800/40 hover:bg-neutral-800/80 border-white/5'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-white/30'
                            }`}>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white">{exp.title}</h4>
                              <p className="text-xs text-neutral-400 mt-0.5">{exp.description}</p>
                              <span className="inline-block text-[10px] text-emerald-400 font-mono mt-1">Duration: {exp.duration}</span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            {exp.included ? (
                              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                                Included
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-white">
                                +{currency}{price}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Host Profile */}
                <div className="p-5 rounded-3xl bg-neutral-800/40 border border-white/10 flex items-center gap-4">
                  <img
                    src={destination.host.avatar}
                    alt={destination.host.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">Hosted by {destination.host.name}</h4>
                      {destination.host.isSuperhost && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-semibold flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3" /> Superhost
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">{destination.host.role} • Responds {destination.host.responseRate}</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Languages: {destination.host.languages.join(', ')}</p>
                  </div>
                </div>

                {/* Guest Reviews */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white flex items-center gap-2">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      {destination.rating} • {destination.reviewCount} Reviews
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {destination.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-neutral-800/30 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                          <img src={rev.avatar} alt={rev.author} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <h5 className="text-xs font-bold text-white">{rev.author}</h5>
                            <span className="text-[10px] text-neutral-400">{rev.date}</span>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed italic">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Booking Widget Sticky */}
              <div className="lg:col-span-5 xl:col-span-5">
                <div className="sticky top-20 bg-neutral-800/80 border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-md">
                  
                  {/* Price Header */}
                  <div className="flex items-baseline justify-between pb-5 border-b border-white/10">
                    <div>
                      <span className="text-3xl font-extrabold font-['Outfit',sans-serif] text-white">
                        {currency}{destination.pricePerNight}
                      </span>
                      <span className="text-neutral-400 text-xs ml-1">/ night</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-white font-semibold">{destination.rating}</span>
                      <span className="text-neutral-400">({destination.reviewCount})</span>
                    </div>
                  </div>

                  {/* Booking Form */}
                  <form onSubmit={handleConfirmReservation} className="mt-5 space-y-4">
                    
                    {/* Date Pickers */}
                    <div className="grid grid-cols-2 gap-2 bg-neutral-900 border border-white/15 rounded-2xl p-3">
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                          Check-In
                        </label>
                        <input
                          type="date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          className="w-full bg-transparent text-xs text-white outline-none cursor-pointer"
                        />
                      </div>
                      <div className="border-l border-white/10 pl-3">
                        <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                          Check-Out
                        </label>
                        <input
                          type="date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="w-full bg-transparent text-xs text-white outline-none cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Guests Selector */}
                    <div className="bg-neutral-900 border border-white/15 rounded-2xl p-3 flex items-center justify-between">
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
                          Guests
                        </label>
                        <span className="text-xs text-white font-medium">{guestsCount} Guests (Max {destination.stats.guests})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                          className="w-7 h-7 rounded-full bg-neutral-800 border border-white/15 flex items-center justify-center text-xs text-white hover:bg-neutral-700 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-white w-4 text-center">{guestsCount}</span>
                        <button
                          type="button"
                          onClick={() => setGuestsCount(Math.min(destination.stats.guests, guestsCount + 1))}
                          className="w-7 h-7 rounded-full bg-neutral-800 border border-white/15 flex items-center justify-center text-xs text-white hover:bg-neutral-700 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Guest Contact Info */}
                    <div className="space-y-2">
                      <input
                        type="text"
                        required
                        placeholder="Primary Guest Full Name"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-400"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Confirmation Email Address"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-400"
                      />
                    </div>

                    {/* Price Math Breakdown */}
                    <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-neutral-300">
                      <div className="flex justify-between">
                        <span>{currency}{destination.pricePerNight} × {nights} nights</span>
                        <span>{currency}{baseTotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaning & Sanitization</span>
                        <span>{currency}{cleaningFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Luxury Concierge Service</span>
                        <span>{currency}{serviceFee}</span>
                      </div>
                      {addonsTotal > 0 && (
                        <div className="flex justify-between text-emerald-300">
                          <span>Curated Experiences ({selectedAddons.length})</span>
                          <span>+{currency}{addonsTotal}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-3 border-t border-white/15 text-base font-bold text-white font-['Outfit',sans-serif]">
                        <span>Total Due</span>
                        <span className="text-emerald-400">{currency}{grandTotal}</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      id="reserve-dream-stay-btn"
                      className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-sm tracking-wide shadow-xl shadow-emerald-950/60 transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer mt-4"
                    >
                      Reserve Dream Stay
                    </button>

                    <p className="text-[11px] text-center text-neutral-400 mt-2 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Free cancellation up to 48 hours before check-in
                    </p>
                  </form>

                </div>
              </div>

            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
