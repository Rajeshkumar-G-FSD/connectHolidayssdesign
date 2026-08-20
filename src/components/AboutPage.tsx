import React from 'react';
import { motion } from 'motion/react';
import {
  BadgeCheck,
  Users2,
  Target,
  CheckCircle2,
  Phone,
  ArrowRight,
  Building2,
} from 'lucide-react';

interface AboutPageProps {
  onOpenContact: () => void;
  onExploreDestinations: () => void;
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

/** Word-by-word reveal used for the headline paragraphs — the "lazy loading" text effect. */
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

/** Fade-up-on-scroll wrapper — sections "lazy load" as the page scrolls to them. */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.55, delay, ease: easeOut }}
    className={className}
  >
    {children}
  </motion.div>
);

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenContact, onExploreDestinations }) => {
  return (
    <div id="about-page" className="bg-neutral-950 text-white">

      {/* Hero-style banner: full-bleed photo + gradient + giant heading, matching the home hero's visual language */}
      <div className="relative isolate w-full min-h-[92vh] overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1758558364489-e6b0a03d1fcf?auto=format&fit=crop&w=2400&q=85')",
            }}
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-black/35" />
        </div>

        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-6 sm:px-14 lg:px-20 pt-32 pb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-emerald-300"
          >
            <BadgeCheck className="w-3.5 h-3.5" />
            Est. {LAUNCH_YEAR} · Erode, Tamil Nadu
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-5 text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif] drop-shadow-md leading-[0.95]"
          >
            About <span className="text-emerald-400">Connect Holidayss</span>
          </motion.h1>

          <AnimatedWords
            text="Connect Holidayss is a travel agency offering domestic and international tour packages, customized holidays, group tours, hotel bookings, flight bookings, sightseeing, transfers and complete travel assistance."
            className="mt-6 text-white text-base sm:text-lg max-w-2xl leading-relaxed font-['Outfit',sans-serif] font-medium drop-shadow-sm"
          />

          <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-2.5">
            {[`${YEARS_ACTIVE}+ Years of Trust`, 'Domestic & International', 'Premium Experiences'].map((chip) => (
              <span
                key={chip}
                className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenContact}
              className="group relative inline-flex items-center h-12 sm:h-[54px] pl-6 sm:pl-7 pr-1.5 rounded-full bg-[#4f7c66] hover:bg-[#436b57] text-white font-medium text-sm shadow-lg shadow-black/25 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-98"
            >
              <span className="mr-9 sm:mr-11">Get in Touch</span>
              <span className="flex h-9 w-9 sm:h-[42px] sm:w-[42px] items-center justify-center rounded-full bg-[#6f9f87] group-hover:bg-[#7cae93] transition-all duration-200">
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <button
              onClick={onExploreDestinations}
              className="text-sm font-semibold text-white/85 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
            >
              Explore Destinations
            </button>
          </Reveal>
        </div>
      </div>

      {/* Content sections below the banner */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-20 space-y-14">

        {/* Who we serve */}
        <Reveal>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
              <Users2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Who We Serve</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {AUDIENCE_TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: easeOut }}
                className="px-4 py-2 rounded-full bg-neutral-900 border border-white/10 text-neutral-200 text-sm font-medium"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </Reveal>

        {/* Mission */}
        <Reveal className="pt-2 border-t border-white/10">
          <div className="flex items-center gap-2 pt-8 mb-4">
            <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Our Mission</span>
          </div>
          <AnimatedWords
            text="To increase travel enquiries and bookings, build brand awareness, and provide customized, reliable and premium holiday experiences."
            className="text-base text-neutral-300 leading-relaxed max-w-2xl"
          />
        </Reveal>

        {/* What we focus on */}
        <Reveal className="pt-2 border-t border-white/10">
          <div className="flex items-center gap-2 pt-8 mb-4">
            <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">What We Focus On</span>
          </div>
          <ul className="space-y-3">
            {FOCUS_ITEMS.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: easeOut }}
                className="flex items-start gap-3 text-base text-neutral-300"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </Reveal>

        {/* Contact person CTA */}
        <Reveal
          delay={0.05}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 bg-neutral-900 border border-white/10 rounded-3xl p-6 sm:p-7">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Phone className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <div>
                <p className="text-base font-semibold text-white">Speak with Rajasekar, our Travel Consultant</p>
                <a href="tel:+919865051388" className="text-sm text-neutral-400 hover:text-emerald-300 transition-colors">
                  098650 51388
                </a>
              </div>
            </div>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer shrink-0"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Reveal>

      </div>
    </div>
  );
};
