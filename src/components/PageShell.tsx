import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface PageShellProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Shared header treatment for every "interior" page — keeps the theme consistent
 * without repeating the eyebrow/title/description markup in each page component. */
export const PageShell: React.FC<PageShellProps> = ({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
  maxWidth = 'max-w-7xl',
}) => {
  return (
    <div id={`${eyebrow.toLowerCase().replace(/\s+/g, '-')}-page`} className="bg-neutral-950 text-white pt-28 pb-20 px-6 sm:px-10 lg:px-12">
      <div className={`${maxWidth} mx-auto`}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="pb-8 border-b border-white/10"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
            <Icon className="w-4 h-4" />
            <span>{eyebrow}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit',sans-serif] tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-neutral-400 max-w-2xl text-sm sm:text-base font-light">{description}</p>
          )}
        </motion.div>

        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
};

/** Fade-up-on-scroll wrapper, reused across all new pages for the "lazy loading" feel. */
export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.5, delay, ease: easeOut }}
    className={className}
  >
    {children}
  </motion.div>
);
