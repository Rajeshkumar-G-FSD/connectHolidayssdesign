import React from 'react';
import { PlaneTakeoff, Tag, Clock3, Headphones, CalendarRange, ArrowRight } from 'lucide-react';
import { PageShell, Reveal } from '../PageShell';

interface FlightBookingPageProps {
  onOpenContact: () => void;
}

const FEATURES = [
  { icon: Tag, title: 'Best Fare Guarantee', description: 'Access to negotiated airline fares across domestic and international routes.' },
  { icon: CalendarRange, title: 'Flexible Date Search', description: 'We compare nearby dates to find you the most affordable departure window.' },
  { icon: Clock3, title: 'Fast Confirmations', description: 'E-tickets and PNR confirmation typically issued within the hour.' },
  { icon: Headphones, title: '24/7 Travel Support', description: 'Rescheduling, cancellations and delay assistance, any time of day.' },
];

const AIRLINE_TYPES = ['Domestic Flights', 'International Flights', 'Group Bookings', 'Last-Minute Fares', 'Multi-City Itineraries', 'Student & Senior Fares'];

export const FlightBookingPage: React.FC<FlightBookingPageProps> = ({ onOpenContact }) => {
  return (
    <PageShell
      icon={PlaneTakeoff}
      eyebrow="Booking · Flights"
      title="Flight Booking"
      description="Domestic and international flights booked at the best available fares, with a real person to call if plans change."
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
        <h2 className="text-2xl font-bold font-['Outfit',sans-serif] mb-6">We Book It All</h2>
        <div className="flex flex-wrap gap-2.5">
          {AIRLINE_TYPES.map((t) => (
            <span key={t} className="px-4 py-2 rounded-full bg-neutral-900 border border-white/10 text-sm text-neutral-200">
              {t}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-14 rounded-3xl bg-neutral-900 border border-white/10 p-8 text-center">
        <h3 className="text-xl font-bold font-['Outfit',sans-serif]">Looking for flight tickets?</h3>
        <p className="mt-2 text-sm text-neutral-400 max-w-xl mx-auto">
          Share your travel dates and destination — we'll send you the best fare options within the hour.
        </p>
        <button
          onClick={onOpenContact}
          className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
        >
          Get Flight Quotes <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Reveal>
    </PageShell>
  );
};
