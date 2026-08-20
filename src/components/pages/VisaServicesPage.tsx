import React from 'react';
import { motion } from 'motion/react';
import { Stamp, FileCheck, Briefcase, GraduationCap, PlaneTakeoff, ClipboardCheck, ArrowRight } from 'lucide-react';
import { PageShell, Reveal } from '../PageShell';

interface VisaServicesPageProps {
  onOpenContact: () => void;
}

const VISA_TYPES = [
  { icon: Stamp, title: 'Tourist Visa', description: 'End-to-end assistance for leisure travel visas to 100+ countries, including appointment booking.' },
  { icon: Briefcase, title: 'Business Visa', description: 'Fast-tracked documentation and invitation-letter support for corporate and business travellers.' },
  { icon: GraduationCap, title: 'Student Visa', description: 'Guidance on university offer letters, financial proofs and interview preparation.' },
  { icon: PlaneTakeoff, title: 'Visa on Arrival Assistance', description: 'Pre-departure checklists and documentation for eligible visa-on-arrival destinations.' },
  { icon: FileCheck, title: 'Document Verification', description: 'Thorough review of passports, photographs and forms to avoid rejections and delays.' },
  { icon: ClipboardCheck, title: 'Application Tracking', description: 'Regular status updates from submission to approval, so you always know where things stand.' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Free Consultation', description: 'Share your destination and travel dates — we tell you exactly what visa you need.' },
  { step: '02', title: 'Documentation', description: 'We prepare and verify your full document checklist, form-filling included.' },
  { step: '03', title: 'Application Submission', description: 'Your application is submitted and appointment scheduled with the consulate/embassy.' },
  { step: '04', title: 'Approval & Handover', description: 'We track your application and hand over your passport the moment it is approved.' },
];

export const VisaServicesPage: React.FC<VisaServicesPageProps> = ({ onOpenContact }) => {
  return (
    <PageShell
      icon={Stamp}
      eyebrow="Documentation Made Easy"
      title="Visa Services"
      description="From tourist to business visas, we handle the paperwork so your trip stays stress-free."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {VISA_TYPES.map((v, i) => (
          <Reveal key={v.title} delay={(i % 3) * 0.08}>
            <div className="h-full rounded-3xl bg-neutral-900 border border-white/10 hover:border-emerald-500/30 transition-colors p-6">
              <div className="w-11 h-11 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                <v.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold font-['Outfit',sans-serif] text-white">{v.title}</h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{v.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.05} className="mt-16">
        <h2 className="text-2xl font-bold font-['Outfit',sans-serif] mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              <span className="text-4xl font-extrabold text-white/10 font-['Outfit',sans-serif]">{s.step}</span>
              <h3 className="mt-1 text-base font-bold text-white">{s.title}</h3>
              <p className="mt-1.5 text-sm text-neutral-400 leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-14 rounded-3xl bg-neutral-900 border border-white/10 p-8 text-center">
        <h3 className="text-xl font-bold font-['Outfit',sans-serif]">Ready to apply?</h3>
        <p className="mt-2 text-sm text-neutral-400 max-w-xl mx-auto">
          Talk to our visa specialists for a free eligibility check and document checklist.
        </p>
        <button
          onClick={onOpenContact}
          className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
        >
          Start Your Visa Application <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Reveal>
    </PageShell>
  );
};
