import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Package, Clock, Users, Check, X, ArrowRight, ChevronDown, Route,
  Gift, BadgePercent, Send, CheckCircle2,
} from 'lucide-react';
import { PageShell, Reveal } from '../PageShell';
import { TOUR_PACKAGES, PACKAGE_CATEGORIES, PACKAGE_OFFERS, PackageType, PackageCategory } from '../../data/tourPackages';

interface TourPackagesPageProps {
  onOpenContact: () => void;
}

const TYPE_FILTERS: ('All' | PackageType)[] = ['All', 'Domestic', 'International'];
const CATEGORY_FILTERS: ('All' | PackageCategory)[] = ['All', ...PACKAGE_CATEGORIES];

const formatINR = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

const PackageCardDetail: React.FC<{ pkg: (typeof TOUR_PACKAGES)[number]; onOpenContact: () => void }> = ({ pkg, onOpenContact }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="h-full flex flex-col rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-emerald-500/30 transition-colors group">
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-emerald-300">
          {pkg.type}
        </span>
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] font-medium text-white/90">
          {pkg.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-white">{pkg.title}</h3>
        <div className="mt-2 flex items-center gap-4 text-xs text-neutral-400">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pkg.duration}</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {pkg.groupSize}</span>
        </div>

        <ul className="mt-4 space-y-1.5">
          {pkg.inclusions.slice(0, 4).map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-neutral-300">
              <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
        >
          {expanded ? 'Hide full details' : 'View inclusions, exclusions & itinerary'}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-1 border-t border-white/10 space-y-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 block mb-1.5">Inclusions</span>
                  <ul className="space-y-1">
                    {pkg.inclusions.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-400 block mb-1.5">Exclusions</span>
                  <ul className="space-y-1">
                    {pkg.exclusions.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-neutral-400">
                        <X className="w-3.5 h-3.5 text-rose-400/80 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-1.5">
                    <Route className="w-3.5 h-3.5" /> Itinerary
                  </span>
                  <ul className="space-y-2">
                    {pkg.itinerary.map((day) => (
                      <li key={day.day} className="text-xs text-neutral-300">
                        <span className="font-semibold text-white">Day {day.day} — {day.title}:</span>{' '}
                        <span className="text-neutral-400">{day.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Starting from</span>
            <span className="text-lg font-bold text-white">{formatINR(pkg.priceINR)}<span className="text-xs font-normal text-neutral-400">/person</span></span>
          </div>
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Enquire <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};

export const TourPackagesPage: React.FC<TourPackagesPageProps> = ({ onOpenContact }) => {
  const [typeFilter, setTypeFilter] = useState<'All' | PackageType>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | PackageCategory>('All');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tourType: 'Domestic',
    destination: '',
    travellers: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const filteredPackages = TOUR_PACKAGES.filter(
    (pkg) => (typeFilter === 'All' || pkg.type === typeFilter) && (categoryFilter === 'All' || pkg.category === categoryFilter)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', phone: '', tourType: 'Domestic', destination: '', travellers: '', budget: '', message: '' });
  };

  return (
    <PageShell
      icon={Package}
      eyebrow="Curated Journeys"
      title="Tour Packages"
      description="Handpicked domestic and international packages with itineraries, stays and transfers planned end-to-end. All prices in Indian Rupees (₹)."
    >
      {/* Domestic / International + Category filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-neutral-900 border border-white/10 w-fit">
          {TYPE_FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                typeFilter === t ? 'bg-emerald-600 text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t === 'All' ? 'All Tours' : `${t} Tours`}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORY_FILTERS.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap border ${
                categoryFilter === c
                  ? 'bg-white text-neutral-900 border-white'
                  : 'bg-transparent text-neutral-400 border-white/15 hover:text-white hover:border-white/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Package grid */}
      {filteredPackages.length === 0 ? (
        <p className="text-sm text-neutral-400 py-10 text-center">No packages match this filter yet — try another category, or request a custom package below.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={(i % 3) * 0.08}>
              <PackageCardDetail pkg={pkg} onOpenContact={onOpenContact} />
            </Reveal>
          ))}
        </div>
      )}

      {/* Offers & Discounts */}
      <Reveal delay={0.05} className="mt-16">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-6">
          <BadgePercent className="w-4 h-4" />
          <span>Offers & Discounts</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PACKAGE_OFFERS.map((offer) => (
            <div key={offer.id} className="rounded-3xl bg-neutral-900 border border-white/10 p-5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center mb-3">
                <Gift className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white">{offer.title}</h3>
              <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">{offer.description}</p>
              {offer.code && (
                <span className="mt-3 inline-block px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-bold tracking-wider">
                  {offer.code}
                </span>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      {/* Custom Package Request */}
      <Reveal delay={0.1} className="mt-16 rounded-3xl bg-neutral-900 border border-white/10 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif]">Request a Custom Package</h2>
        <p className="mt-2 text-sm text-neutral-400 max-w-xl">
          Don't see what you're looking for? Tell us your dates, budget and interests and we'll design a package just for you.
        </p>

        {submitted ? (
          <div className="mt-8 py-10 flex flex-col items-center text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3 animate-bounce" />
            <h3 className="text-lg font-bold font-['Outfit',sans-serif]">Request Received</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm">
              Our travel consultant will reach out with a custom itinerary within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="98650 51388"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Tour Type</label>
              <select
                value={formData.tourType}
                onChange={(e) => setFormData({ ...formData, tourType: e.target.value })}
                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-400"
              >
                <option>Domestic</option>
                <option>International</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Preferred Destination(s)</label>
              <input
                type="text"
                placeholder="e.g. Kashmir, Bali, Europe"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Number of Travellers</label>
              <input
                type="text"
                placeholder="e.g. 2 Adults"
                value={formData.travellers}
                onChange={(e) => setFormData({ ...formData, travellers: e.target.value })}
                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Budget (₹ per person)</label>
              <input
                type="text"
                placeholder="e.g. ₹40,000 - ₹60,000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Tell Us More</label>
              <textarea
                rows={3}
                placeholder="Travel dates, interests, special occasions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-400 resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Custom Request
              </button>
            </div>
          </form>
        )}
      </Reveal>
    </PageShell>
  );
};
