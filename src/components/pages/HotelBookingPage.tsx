import React from 'react';
import { Hotel, BadgePercent, ShieldCheck, Utensils, Star, ArrowRight } from 'lucide-react';
import { PageShell, Reveal } from '../PageShell';

interface HotelBookingPageProps {
  onOpenContact: () => void;
}

const FEATURES = [
  { icon: BadgePercent, title: 'Negotiated Rates', description: 'Preferred pricing with partner hotels and resorts across every destination.' },
  { icon: ShieldCheck, title: 'Verified Stays', description: 'Every property is hand-checked for cleanliness, safety and genuine reviews.' },
  { icon: Utensils, title: 'Meal Plans Included', description: 'Breakfast, half-board or full-board options arranged to match your itinerary.' },
  { icon: Star, title: 'From Budget to Luxury', description: 'Comfortable stays for every budget — 3-star convenience to 5-star resorts.' },
];

const CATEGORIES = [
  { title: 'Budget Hotels', description: 'Clean, well-located stays for value-conscious travellers.' },
  { title: 'Business Hotels', description: 'Reliable Wi-Fi, work desks and central locations for corporate trips.' },
  { title: 'Beach Resorts', description: 'Ocean-view rooms and resort amenities for a relaxed escape.' },
  { title: 'Luxury & Heritage', description: 'Curated 5-star and boutique heritage properties for special occasions.' },
];

export const HotelBookingPage: React.FC<HotelBookingPageProps> = ({ onOpenContact }) => {
  return (
    <PageShell
      icon={Hotel}
      eyebrow="Booking · Hotels"
      title="Hotel Booking"
      description="From budget stays to five-star resorts, we match you with the right hotel at the right price."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.07}>
            <div className="h-full rounded-3xl bg-neutral-900 border border-white/10 p-6">
              <div className="w-11 h-11 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold font-['Outfit',sans-serif] text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{f.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-14">
        <h2 className="text-2xl font-bold font-['Outfit',sans-serif] mb-6">Stay Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((c) => (
            <div key={c.title} className="rounded-2xl bg-neutral-900 border border-white/10 p-5">
              <h3 className="text-sm font-bold text-white">{c.title}</h3>
              <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-14 rounded-3xl bg-neutral-900 border border-white/10 p-8 text-center">
        <h3 className="text-xl font-bold font-['Outfit',sans-serif]">Need a place to stay?</h3>
        <p className="mt-2 text-sm text-neutral-400 max-w-xl mx-auto">
          Tell us your destination, dates and budget — we'll shortlist the best-matched hotels for you.
        </p>
        <button
          onClick={onOpenContact}
          className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
        >
          Find Hotels <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Reveal>
    </PageShell>
  );
};
