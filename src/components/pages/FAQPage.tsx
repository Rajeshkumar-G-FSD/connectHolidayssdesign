import React, { useState } from 'react';
import { HelpCircle, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageShell, Reveal } from '../PageShell';

const FAQS = [
  {
    q: 'How far in advance should I book my tour package?',
    a: 'We recommend booking domestic trips at least 3-4 weeks ahead and international trips 6-8 weeks ahead, especially during peak season, to get the best fares and hotel availability.',
  },
  {
    q: 'Can you customize an existing package?',
    a: 'Yes — every package we offer is a starting point. Tell us your dates, budget and interests and we\'ll adjust the itinerary, hotels and activities to match.',
  },
  {
    q: 'What documents do I need for an international trip?',
    a: 'At minimum a passport valid for 6+ months beyond your return date and the relevant visa. Our visa services team will give you a complete checklist specific to your destination.',
  },
  {
    q: 'Do you offer group discounts?',
    a: 'Yes, groups of 6 or more travelling together are eligible for special group rates on packages, flights and hotel bookings. Contact us for a custom group quote.',
  },
  {
    q: 'What is your cancellation and refund policy?',
    a: 'Refund eligibility depends on how far ahead you cancel — see our full Cancellation Policy page for the exact timelines and refund percentages.',
  },
  {
    q: 'Is travel insurance mandatory for bookings made through you?',
    a: 'It isn\'t mandatory, but we strongly recommend it for every trip — especially international travel — and can arrange a suitable plan alongside your booking.',
  },
  {
    q: 'How do I pay for my booking?',
    a: 'We accept UPI, bank transfer, debit/credit cards and can arrange installment payments for larger packages. A confirmation invoice is issued for every payment.',
  },
  {
    q: 'Can I book flights and hotels only, without a full package?',
    a: 'Absolutely — flight-only and hotel-only bookings are available, along with visa services and travel insurance, all without needing a full tour package.',
  },
];

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PageShell
      icon={HelpCircle}
      eyebrow="Got Questions?"
      title="Frequently Asked Questions"
      description="Everything travellers usually ask us before booking — if yours isn't here, just reach out."
      maxWidth="max-w-3xl"
    >
      <div className="space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal key={item.q} delay={(i % 6) * 0.05}>
              <div className="rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-neutral-400 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </PageShell>
  );
};
