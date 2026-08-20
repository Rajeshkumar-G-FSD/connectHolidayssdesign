import React from 'react';
import { X, Building2, Users2, Target, CheckCircle2, Phone, ArrowRight, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

const LAUNCH_YEAR = 2003;
const YEARS_ACTIVE = new Date().getFullYear() - LAUNCH_YEAR;

const AUDIENCE_TAGS = [
  'Families',
  'Couples',
  'Honeymooners',
  'Corporate Travellers',
  'Groups',
  'Senior Citizens',
  'Individuals',
];

const FOCUS_ITEMS = [
  'Attractive domestic & international tour packages',
  'Customized itineraries tailored to every traveller',
  'Professional, end-to-end travel assistance',
  'Customer-friendly, reliable service at every step',
];

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Word-by-word reveal used for the two headline paragraphs — the "lazy loading" text effect. */
const AnimatedWords: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const words = text.split(' ');
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.028 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

/** Simple fade-up-on-scroll wrapper for everything else — sections "lazy load" as you reach them. */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay, ease: easeOut }}
    className={className}
  >
    {children}
  </motion.div>
);

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-neutral-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white max-h-[85vh] flex flex-col"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <BadgeCheck className="w-3.5 h-3.5" />
              Est. {LAUNCH_YEAR} · Erode, Tamil Nadu
            </span>
            <h3 className="text-2xl font-bold font-['Outfit',sans-serif] mt-0.5">About Connect Holidayss</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Business description */}
          <div>
            <AnimatedWords
              text="Connect Holidayss is a travel agency offering domestic and international tour packages, customized holidays, group tours, hotel bookings, flight bookings, sightseeing, transfers and complete travel assistance."
              className="text-base sm:text-lg text-white leading-relaxed font-['Outfit',sans-serif] font-medium"
            />

            {/* Trust stat chips */}
            <Reveal delay={0.1} className="mt-5 flex flex-wrap gap-2.5">
              {[`${YEARS_ACTIVE}+ Years of Trust`, 'Domestic & International', 'Premium Experiences'].map((chip) => (
                <span
                  key={chip}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold"
                >
                  {chip}
                </span>
              ))}
            </Reveal>
          </div>

          {/* Who we serve */}
          <Reveal delay={0.05} className="pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 pt-6 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Users2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Who We Serve</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {AUDIENCE_TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: easeOut }}
                  className="px-3 py-1.5 rounded-full bg-neutral-800 border border-white/10 text-neutral-200 text-xs font-medium"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </Reveal>

          {/* Mission */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 pt-6 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Our Mission</span>
            </div>
            <AnimatedWords
              text="To increase travel enquiries and bookings, build brand awareness, and provide customized, reliable and premium holiday experiences."
              className="text-sm text-neutral-300 leading-relaxed"
            />
          </div>

          {/* What we focus on */}
          <Reveal delay={0.05} className="pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 pt-6 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">What We Focus On</span>
            </div>
            <ul className="space-y-2">
              {FOCUS_ITEMS.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: easeOut }}
                  className="flex items-start gap-2.5 text-sm text-neutral-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </Reveal>

          {/* Contact person CTA */}
          <Reveal
            delay={0.1}
            className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-neutral-800/40 border border-white/5 rounded-2xl p-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Speak with Rajasekar, our Travel Consultant</p>
                <a href="tel:+919865051388" className="text-xs text-neutral-400 hover:text-emerald-300 transition-colors">
                  098650 51388
                </a>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer shrink-0"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Reveal>
        </div>
      </motion.div>
    </div>
  );
};
