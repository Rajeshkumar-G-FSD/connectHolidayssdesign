import React from 'react';
import { Ban, Check } from 'lucide-react';
import { PageShell, Reveal } from '../PageShell';

const REFUND_TIERS = [
  { window: '30+ days before travel', refund: '90% refund', note: 'Minor processing fee applies.' },
  { window: '15–29 days before travel', refund: '50% refund', note: 'Hotel/airline advances may not be recoverable.' },
  { window: '7–14 days before travel', refund: '25% refund', note: 'Limited refund due to third-party lock-ins.' },
  { window: 'Less than 7 days / no-show', refund: 'No refund', note: 'Full booking amount is non-refundable.' },
];

const NOTES = [
  'Flight tickets and visa fees are governed by the respective airline and consulate cancellation policies, which may be stricter than ours.',
  'Cancellations must be requested in writing via email or through our contact form for a valid timestamp.',
  'Refunds, where applicable, are processed within 7–10 business days to the original payment method.',
  'In case of cancellation due to force majeure (natural disasters, government travel bans, etc.), we will work with our partners to secure the best possible outcome, though full refunds cannot always be guaranteed.',
  'Date changes/rescheduling, where permitted by the airline/hotel, are treated separately from cancellations and may incur a rebooking fee.',
];

export const CancellationPolicyPage: React.FC = () => {
  return (
    <PageShell
      icon={Ban}
      eyebrow="Legal"
      title="Cancellation Policy"
      description="Last updated: August 2026 — refund timelines for tours, flights and hotel bookings."
      maxWidth="max-w-3xl"
    >
      <Reveal>
        <h2 className="text-lg font-bold font-['Outfit',sans-serif] text-white mb-4">Refund Schedule (Tour Packages)</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-900 text-left text-xs uppercase tracking-wider text-neutral-400">
                <th className="p-4 font-semibold">Cancellation Window</th>
                <th className="p-4 font-semibold">Refund</th>
                <th className="p-4 font-semibold hidden sm:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {REFUND_TIERS.map((tier, i) => (
                <tr key={tier.window} className={i % 2 === 0 ? 'bg-neutral-950' : 'bg-neutral-900/50'}>
                  <td className="p-4 text-neutral-200">{tier.window}</td>
                  <td className="p-4 font-semibold text-emerald-400">{tier.refund}</td>
                  <td className="p-4 text-neutral-400 text-xs hidden sm:table-cell">{tier.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <h2 className="text-lg font-bold font-['Outfit',sans-serif] text-white mb-4">Important Notes</h2>
        <ul className="space-y-3">
          {NOTES.map((note) => (
            <li key={note} className="flex items-start gap-2.5 text-sm text-neutral-400 leading-relaxed">
              <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </PageShell>
  );
};
