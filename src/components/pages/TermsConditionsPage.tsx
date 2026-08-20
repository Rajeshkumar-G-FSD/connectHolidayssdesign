import React from 'react';
import { Scale } from 'lucide-react';
import { PageShell, Reveal } from '../PageShell';

const SECTIONS = [
  {
    title: '1. Booking & Confirmation',
    body: 'A booking is confirmed only upon receipt of the applicable advance payment. Prices for tour packages, flights and hotels are subject to change until full payment is received.',
  },
  {
    title: '2. Payment Terms',
    body: 'Full payment must be completed as per the schedule communicated at the time of booking. Delayed payments may result in loss of confirmed rates or cancellation of the booking.',
  },
  {
    title: '3. Traveller Responsibilities',
    body: 'Travellers are responsible for carrying valid travel documents (passport, visa, ID proof) and for arriving on time for all scheduled transfers, flights and check-ins.',
  },
  {
    title: '4. Itinerary Changes',
    body: 'While we make every effort to deliver the itinerary as planned, changes due to weather, local authority restrictions, airline schedule changes or force majeure events may occur and are beyond our control.',
  },
  {
    title: '5. Limitation of Liability',
    body: 'Connect Holidayss acts as an intermediary between travellers and third-party service providers (airlines, hotels, transport operators). We are not liable for service deficiencies caused directly by these third parties.',
  },
  {
    title: '6. Visa & Insurance Disclaimer',
    body: 'Visa approval is at the sole discretion of the respective consulate/embassy. We assist with documentation but cannot guarantee approval. Travel insurance coverage is governed by the issuing insurer\'s policy terms.',
  },
  {
    title: '7. Governing Law',
    body: 'These terms are governed by the laws of India, and any disputes shall be subject to the jurisdiction of the courts in Erode, Tamil Nadu.',
  },
  {
    title: '8. Amendments',
    body: 'Connect Holidayss reserves the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the revised terms.',
  },
];

export const TermsConditionsPage: React.FC = () => {
  return (
    <PageShell
      icon={Scale}
      eyebrow="Legal"
      title="Terms & Conditions"
      description="Last updated: August 2026 — the terms that apply when you book with Connect Holidayss."
      maxWidth="max-w-3xl"
    >
      <div className="space-y-8">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.title} delay={(i % 4) * 0.06}>
            <h2 className="text-lg font-bold font-['Outfit',sans-serif] text-white mb-2">{s.title}</h2>
            <p className="text-sm text-neutral-400 leading-relaxed">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
};
