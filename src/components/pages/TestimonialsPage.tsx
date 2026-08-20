import React from 'react';
import { MessageSquareQuote, Star } from 'lucide-react';
import { PageShell, Reveal } from '../PageShell';

const TESTIMONIALS = [
  {
    name: 'Priya & Karthik',
    trip: 'Bali Honeymoon Escape',
    rating: 5,
    quote: 'Connect Holidayss planned our entire honeymoon down to the last detail. The villa, the candlelight dinner, everything was exactly as promised — better, actually.',
  },
  {
    name: 'Suresh Ramanathan',
    trip: 'Kerala Backwaters & Hills',
    rating: 5,
    quote: 'Booked this for my parents\' anniversary. The houseboat stay and the tea garden tour were highlights. Excellent, patient support throughout.',
  },
  {
    name: 'Divya Menon',
    trip: 'Thailand Island Explorer',
    rating: 5,
    quote: 'Our visa was sorted in days and the whole Phuket-Krabi itinerary ran like clockwork. Would book with them again without a second thought.',
  },
  {
    name: 'Arun & Family',
    trip: 'Dubai Luxury Getaway',
    rating: 4,
    quote: 'Great value for a family trip — the desert safari was a hit with the kids and the hotel was better than what we booked for.',
  },
  {
    name: 'Meena Krishnan',
    trip: 'Himachal Mountain Adventure',
    rating: 5,
    quote: 'First time travelling with a group tour and it exceeded expectations. Well organized, friendly coordinators, and a beautiful route.',
  },
  {
    name: 'Vignesh R.',
    trip: 'Goa Beach Getaway',
    rating: 5,
    quote: 'Quick, easy booking for a last-minute weekend trip. Resort was right on the beach and transfers were on time both ways.',
  },
];

export const TestimonialsPage: React.FC = () => {
  return (
    <PageShell
      icon={MessageSquareQuote}
      eyebrow="Traveller Stories"
      title="Testimonials"
      description="What our travellers say after coming home."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 0.08}>
            <div className="h-full flex flex-col rounded-3xl bg-neutral-900 border border-white/10 p-6">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, dotIdx) => (
                  <Star
                    key={dotIdx}
                    className={`w-4 h-4 ${dotIdx < t.rating ? 'fill-emerald-400 text-emerald-400' : 'text-neutral-700'}`}
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 pt-4 border-t border-white/10">
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-xs text-emerald-400">{t.trip}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
};
