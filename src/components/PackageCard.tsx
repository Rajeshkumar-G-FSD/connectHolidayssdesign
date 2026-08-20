import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const easeOut = [0.16, 1, 0.3, 1] as const;

// Chamfered top-left corner, matching the reference package-card design exactly.
export const PACKAGE_CARD_CHAMFER =
  '[clip-path:polygon(44px_0,100%_0,100%_100%,0_100%,0_44px)] sm:[clip-path:polygon(56px_0,100%_0,100%_100%,0_100%,0_56px)]';

export const formatINR = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

interface PackageCardProps {
  priceINR: number;
  description: string;
  title: string;
  overline?: string;
  highlighted?: boolean;
  onGetNow: () => void;
  delay?: number;
  className?: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  priceINR,
  description,
  title,
  overline,
  highlighted = false,
  onGetNow,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      onClick={onGetNow}
      className={`${PACKAGE_CARD_CHAMFER} p-6 sm:p-7 flex flex-col justify-between min-h-[280px] sm:min-h-[300px] ${
        highlighted
          ? 'bg-white text-neutral-900 shadow-2xl shadow-black/40'
          : 'bg-neutral-900 text-white border border-white/10'
      } ${className}`}
    >
      {/* Top row: price + description */}
      <div className="flex items-start justify-between gap-4">
        <div>
          {overline && (
            <span className={`text-[11px] font-semibold uppercase tracking-wider block mb-1 ${highlighted ? 'text-emerald-600' : 'text-emerald-400'}`}>
              {overline}
            </span>
          )}
          <span className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif] block">
            {formatINR(priceINR)}
          </span>
          <span className={`text-xs ${highlighted ? 'text-neutral-500' : 'text-neutral-400'}`}>/Person</span>
        </div>
        <p className={`text-xs leading-relaxed max-w-[150px] ${highlighted ? 'text-neutral-600' : 'text-neutral-400'}`}>
          {description}
        </p>
      </div>

      {/* Bottom row: title + Get Now button */}
      <div className="flex items-end justify-between gap-4 mt-8">
        <h3 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] leading-tight max-w-[65%]">
          {title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onGetNow();
          }}
          className="flex flex-col items-end gap-1.5 shrink-0 cursor-pointer group"
        >
          <span
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
              highlighted ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'
            }`}
          >
            <ArrowUpRight className="w-4.5 h-4.5" />
          </span>
          <span className={`text-[11px] font-semibold ${highlighted ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Get Now
          </span>
        </button>
      </div>
    </motion.div>
  );
};
