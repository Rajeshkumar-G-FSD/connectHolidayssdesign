"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SliderItem {
  image: string;
  country: string;
  flag: string;
}

const DEFAULT_DATA: SliderItem[] = [
  { image: "https://images.unsplash.com/photo-1540968221243-29f5d70540bf?w=800&auto=format&fit=crop&q=60", country: "Dubai", flag: "🇦🇪" },
  { image: "https://images.unsplash.com/photo-1596135187959-562c650d98bc?w=800&auto=format&fit=crop&q=60", country: "London", flag: "🇬🇧" },
  { image: "https://images.unsplash.com/photo-1628944682084-831f35256163?w=800&auto=format&fit=crop&q=60", country: "Japan", flag: "🇯🇵" },
  { image: "https://images.unsplash.com/photo-1590013330451-3946e83e0392?w=800&auto=format&fit=crop&q=60", country: "Italy", flag: "🇮🇹" },
  { image: "https://images.unsplash.com/photo-1590421959604-741d0eec0a2e?w=800&auto=format&fit=crop&q=60", country: "Spain", flag: "🇪🇸" },
  { image: "https://images.unsplash.com/photo-1572613000712-eadc57acbecd?w=800&auto=format&fit=crop&q=60", country: "Greece", flag: "🇬🇷" },
  { image: "https://images.unsplash.com/photo-1570097192570-4b49a6736f9f?w=800&auto=format&fit=crop&q=60", country: "France", flag: "🇫🇷" },
  { image: "https://images.unsplash.com/photo-1620789550663-2b10e0080354?w=800&auto=format&fit=crop&q=60", country: "Maldives", flag: "🇲🇻" },
  { image: "https://images.unsplash.com/photo-1617775623669-20bff4ffaa5c?w=800&auto=format&fit=crop&q=60", country: "Thailand", flag: "🇹🇭" },
  { image: "https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&auto=format&fit=crop&q=60", country: "Canada", flag: "🇨🇦" },
  { image: "https://images.unsplash.com/photo-1573824969595-a76d4365a2e6?w=800&auto=format&fit=crop&q=60", country: "Australia", flag: "🇦🇺" },
  { image: "https://images.unsplash.com/photo-1633936929709-59991b5fdd72?w=800&auto=format&fit=crop&q=60", country: "USA", flag: "🇺🇸" },
  { image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60", country: "Singapore", flag: "🇸🇬" },
];

interface Slider3DProps {
  /** Array of country data to display */
  items?: SliderItem[];
  /** Duration of one full 360-degree rotation (in seconds) */
  duration?: number;
  /** Width of each card. Can be px, rem, em, etc. */
  cardWidth?: string;
  /** CSS aspect ratio of the cards */
  cardAspectRatio?: string;
  /** CSS perspective value for the 3D container */
  perspective?: string;
  /** Additional classes for the outermost container */
  containerClassName?: string;
  /** Additional classes for the individual image elements */
  imageClassName?: string;
  /** Direction of the rotation */
  rotationDirection?: "left" | "right";
  /** Whether to apply a gradient fade mask on the edges */
  withMask?: boolean;
}

export default function ImageSlider3D({
  items = DEFAULT_DATA,
  duration = 32,
  cardWidth = "17.5em",
  cardAspectRatio = "7/10",
  perspective = "35em",
  containerClassName = "",
  imageClassName = "",
  rotationDirection = "left",
  withMask = true,
}: Slider3DProps) {
  const n = items.length;
  const prefersReducedMotion = useReducedMotion();
  const animationDuration = prefersReducedMotion ? duration * 4 : duration;

  // rotation angles based on direction
  const rotationValues = rotationDirection === "left" ? [0, 360] : [360, 0];

  const maskStyles = withMask
    ? {
        WebkitMask:
          "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
        mask: "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
      }
    : {};

  return (
    <div
      className={`grid w-full h-full min-h-[500px] overflow-hidden place-items-center ${containerClassName}`}
      style={{
        perspective: perspective,
        ...maskStyles,
      }}
    >
      <motion.div
        className="grid place-self-center pointer-events-auto"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: rotationValues,
        }}
        transition={{
          duration: animationDuration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="col-start-1 row-start-1 flex flex-col items-center justify-start"
            style={{
              width: cardWidth,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: `rotateY(calc(${i} * (1turn / ${n}))) translateZ(calc(-1 * (0.5 * ${cardWidth} + 0.5em) / tan(0.5 * (1turn / ${n}))))`,
            }}
          >
            {/* Country Name and Flag */}
            <div className="w-full px-3 py-3 bg-gradient-to-b from-emerald-500/20 to-emerald-500/0 backdrop-blur-sm rounded-t-[1.5em] flex items-center justify-center gap-2 border-b border-white/10">
              <span className="text-xl">{item.flag}</span>
              <h3 className="text-sm font-bold text-white text-center font-['Outfit',sans-serif] drop-shadow-sm">
                {item.country}
              </h3>
            </div>

            {/* Image */}
            <img
              src={item.image}
              alt={item.country}
              className={`w-full object-cover rounded-b-[1.5em] flex-1 ${imageClassName}`}
              style={{
                aspectRatio: cardAspectRatio,
              }}
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
