import React from 'react';
import { FileText } from 'lucide-react';
import { PageShell, Reveal } from '../PageShell';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: 'When you enquire, book, or contact us, we collect information such as your name, email address, phone number, travel dates, and payment details necessary to plan and confirm your trip.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'Your information is used to process bookings, arrange visas, insurance and travel documents, communicate itinerary updates, and respond to your enquiries. We do not sell your personal information to third parties.',
  },
  {
    title: '3. Sharing With Travel Partners',
    body: 'To fulfil your booking, relevant details are shared with airlines, hotels, visa consulates and insurance providers strictly as required to complete the service you have requested.',
  },
  {
    title: '4. Cookies & Website Data',
    body: 'Our website may use basic cookies to remember your preferences (such as saved destinations) and to understand how visitors use our site, so we can improve it.',
  },
  {
    title: '5. Data Security',
    body: 'We take reasonable technical and organizational measures to protect your personal data against unauthorized access, alteration, or disclosure.',
  },
  {
    title: '6. Your Rights',
    body: 'You may request access to, correction of, or deletion of your personal data held by us at any time by contacting us directly.',
  },
  {
    title: '7. Contact Us',
    body: 'For any privacy-related questions, reach us at 098650 51388 or visit us at Muthuram Complex, 314/L, Brough Rd, Erode Fort, Erode, Tamil Nadu 638001.',
  },
];

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageShell
      icon={FileText}
      eyebrow="Legal"
      title="Privacy Policy"
      description="Last updated: August 2026 — how Connect Holidayss collects, uses and protects your information."
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
