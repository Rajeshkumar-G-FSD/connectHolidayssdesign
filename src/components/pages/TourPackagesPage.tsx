import React from 'react';
import { Package, Clock, Users, Check, ArrowRight } from 'lucide-react';
import { PageShell, Reveal } from '../PageShell';

interface TourPackagesPageProps {
  onOpenContact: () => void;
}

const PACKAGES = [
  {
    id: 'bali-honeymoon',
    title: 'Bali Honeymoon Escape',
    type: 'International',
    duration: '6 Nights / 7 Days',
    groupSize: '2 Travellers',
    price: 68999,
    image: 'https://images.unsplash.com/photo-1557093793-d149a38a1be8?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Private villa with pool', 'Ubud & Kintamani sightseeing', 'Candlelight beach dinner', 'Airport transfers included'],
  },
  {
    id: 'kerala-backwaters',
    title: 'Kerala Backwaters & Hills',
    type: 'Domestic',
    duration: '5 Nights / 6 Days',
    groupSize: 'Family / Couple',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Overnight houseboat stay', 'Munnar tea garden tour', 'Ayurvedic spa session', 'All meals included'],
  },
  {
    id: 'thailand-explorer',
    title: 'Thailand Island Explorer',
    type: 'International',
    duration: '5 Nights / 6 Days',
    groupSize: 'Group / Couple',
    price: 47999,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Phuket & Krabi islands', 'Phi Phi speedboat tour', 'Bangkok city sightseeing', 'Visa assistance included'],
  },
  {
    id: 'himachal-adventure',
    title: 'Himachal Mountain Adventure',
    type: 'Domestic',
    duration: '6 Nights / 7 Days',
    groupSize: 'Group',
    price: 21999,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Shimla, Manali & Kasol', 'Adventure activities included', 'Comfortable AC coach', 'Daily breakfast & dinner'],
  },
  {
    id: 'dubai-luxury',
    title: 'Dubai Luxury Getaway',
    type: 'International',
    duration: '4 Nights / 5 Days',
    groupSize: 'Family / Couple',
    price: 55999,
    image: 'https://images.unsplash.com/photo-1749273858638-ea678cb48e94?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Burj Khalifa 124th floor entry', 'Desert safari with BBQ dinner', 'Dubai Marina cruise', '4-star hotel stay'],
  },
  {
    id: 'goa-getaway',
    title: 'Goa Beach Getaway',
    type: 'Domestic',
    duration: '3 Nights / 4 Days',
    groupSize: 'Group / Couple',
    price: 14999,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85',
    highlights: ['North & South Goa tour', 'Beachfront resort stay', 'Water sports session', 'Airport pickup & drop'],
  },
];

export const TourPackagesPage: React.FC<TourPackagesPageProps> = ({ onOpenContact }) => {
  return (
    <PageShell
      icon={Package}
      eyebrow="Curated Journeys"
      title="Tour Packages"
      description="Handpicked domestic and international packages with itineraries, stays and transfers planned end-to-end."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PACKAGES.map((pkg, i) => (
          <Reveal key={pkg.id} delay={(i % 3) * 0.08}>
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
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-white">{pkg.title}</h3>
                <div className="mt-2 flex items-center gap-4 text-xs text-neutral-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pkg.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {pkg.groupSize}</span>
                </div>
                <ul className="mt-4 space-y-1.5 flex-1">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Starting from</span>
                    <span className="text-lg font-bold text-white">₹{pkg.price.toLocaleString('en-IN')}<span className="text-xs font-normal text-neutral-400">/person</span></span>
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
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-14 rounded-3xl bg-neutral-900 border border-white/10 p-8 text-center">
        <h3 className="text-xl font-bold font-['Outfit',sans-serif]">Don't see what you're looking for?</h3>
        <p className="mt-2 text-sm text-neutral-400 max-w-xl mx-auto">
          Every itinerary can be fully customized — tell us your dates, budget and interests and we'll design a package just for you.
        </p>
        <button
          onClick={onOpenContact}
          className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
        >
          Request a Custom Package <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Reveal>
    </PageShell>
  );
};
