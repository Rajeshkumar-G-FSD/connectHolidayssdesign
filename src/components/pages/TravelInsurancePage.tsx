import React from 'react';
import { ShieldCheck, HeartPulse, Luggage, CalendarX, PlaneLanding, LifeBuoy, ArrowRight } from 'lucide-react';
import { PageShell, Reveal } from '../PageShell';

interface TravelInsurancePageProps {
  onOpenContact: () => void;
}

const COVERAGE = [
  { icon: HeartPulse, title: 'Medical Emergencies', description: 'Coverage for accidents, hospitalization and emergency medical treatment abroad.' },
  { icon: CalendarX, title: 'Trip Cancellation', description: 'Reimbursement for prepaid, non-refundable costs if you need to cancel or cut a trip short.' },
  { icon: Luggage, title: 'Baggage Loss & Delay', description: 'Compensation for lost, stolen or significantly delayed checked baggage.' },
  { icon: PlaneLanding, title: 'Flight Delay Cover', description: 'Payouts for missed connections and extended flight delays beyond your control.' },
  { icon: LifeBuoy, title: 'Emergency Evacuation', description: 'Emergency medical evacuation and repatriation when local care isn’t enough.' },
  { icon: ShieldCheck, title: 'Personal Liability', description: 'Protection against third-party claims for accidental injury or property damage.' },
];

export const TravelInsurancePage: React.FC<TravelInsurancePageProps> = ({ onOpenContact }) => {
  return (
    <PageShell
      icon={ShieldCheck}
      eyebrow="Travel with Confidence"
      title="Travel Insurance"
      description="Comprehensive coverage plans for every trip, because the best journeys are the worry-free ones."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {COVERAGE.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 0.08}>
            <div className="h-full rounded-3xl bg-neutral-900 border border-white/10 hover:border-emerald-500/30 transition-colors p-6">
              <div className="w-11 h-11 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold font-['Outfit',sans-serif] text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{c.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-14 rounded-3xl bg-neutral-900 border border-white/10 p-8 text-center">
        <h3 className="text-xl font-bold font-['Outfit',sans-serif]">Protect your next trip</h3>
        <p className="mt-2 text-sm text-neutral-400 max-w-xl mx-auto">
          We'll help you pick the right plan for your destination, trip length and travel party.
        </p>
        <button
          onClick={onOpenContact}
          className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
        >
          Get an Insurance Quote <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Reveal>
    </PageShell>
  );
};
