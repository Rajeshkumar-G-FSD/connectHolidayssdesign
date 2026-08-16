import React from 'react';

interface LogoProps {
  className?: string;
  isLight?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  isLight = false,
  size = 'md',
  showText = true,
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-base font-semibold',
    md: 'text-xl font-bold tracking-tight',
    lg: 'text-2xl font-bold tracking-tight',
  };

  const primaryColor = isLight ? '#064e3b' : '#ffffff';
  const secondaryColor = isLight ? '#047857' : '#10b981';

  return (
    <div
      id="dream-homes-stay-brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none transition-transform active:scale-95 ${className}`}
    >
      <div className={`relative flex items-center justify-center ${iconSizes[size]}`}>
        {/* Exact vector reproduction of DreamHomesStay geometric emblem */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Outer circle frame */}
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke={primaryColor}
            strokeWidth="4"
            className="transition-colors duration-300"
          />

          {/* Compass Top Spire (Triangular Peak) */}
          <path
            d="M50 8 L57 36 L43 36 Z"
            stroke={primaryColor}
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Left Compass Point */}
          <path
            d="M12 50 L36 43 L36 57 Z"
            stroke={primaryColor}
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Right Compass Point */}
          <path
            d="M88 50 L64 43 L64 57 Z"
            stroke={primaryColor}
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Diagonal Ray Marks */}
          <line x1="28" y1="28" x2="36" y2="36" stroke={primaryColor} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="72" y1="28" x2="64" y2="36" stroke={primaryColor} strokeWidth="3.5" strokeLinecap="round" />

          {/* Arch Roof Silhouette Base */}
          <path
            d="M32 68 C32 46 68 46 68 68"
            stroke={primaryColor}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Center Water Wave / Swirl Motif */}
          <path
            d="M26 53 C34 53 38 60 48 57 C58 54 62 43 50 43 C42 43 42 55 53 55 C60 55 68 49 74 53"
            stroke={secondaryColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Base Platform Horizon Line */}
          <path
            d="M30 68 H70"
            stroke={primaryColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <span
          className={`${textSizes[size]} ${
            isLight ? 'text-emerald-950' : 'text-white'
          } font-['Outfit',sans-serif]`}
        >
          DreamHomes<span className="font-light text-emerald-400">Stay</span>
        </span>
      )}
    </div>
  );
};
