import React from 'react';
import { Images } from 'lucide-react';
import { PageShell, Reveal } from '../PageShell';

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85', caption: 'Kelingking Beach, Bali' },
  { src: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85', caption: 'Taj Mahal, Agra' },
  { src: 'https://images.unsplash.com/photo-1770848125591-2e97455bf21d?auto=format&fit=crop&w=900&q=85', caption: 'Angkor Wat, Cambodia' },
  { src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85', caption: 'Gion District, Kyoto' },
  { src: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=85', caption: 'Great Wall of China' },
  { src: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=85', caption: 'Halong Bay, Vietnam' },
  { src: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=900&q=85', caption: 'Mount Fuji, Japan' },
  { src: 'https://images.unsplash.com/photo-1557093793-d149a38a1be8?auto=format&fit=crop&w=900&q=85', caption: 'Tegallalang Rice Terrace, Bali' },
  { src: 'https://images.unsplash.com/photo-1568282167464-cb0d811b05c2?auto=format&fit=crop&w=900&q=85', caption: 'Amalfi Coast, Italy' },
  { src: 'https://images.unsplash.com/photo-1560703649-e3055f28bcf8?auto=format&fit=crop&w=900&q=85', caption: 'Santorini, Greece' },
  { src: 'https://images.unsplash.com/photo-1749273858638-ea678cb48e94?auto=format&fit=crop&w=900&q=85', caption: 'Burj Khalifa, Dubai' },
  { src: 'https://images.unsplash.com/photo-1758907598809-c2d41574478c?auto=format&fit=crop&w=900&q=85', caption: 'Sydney Opera House' },
];

export const GalleryPage: React.FC = () => {
  return (
    <PageShell
      icon={Images}
      eyebrow="Wanderlust"
      title="Travel Gallery"
      description="A glimpse of the destinations our travellers fall in love with."
    >
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
        {GALLERY_IMAGES.map((img, i) => (
          <Reveal key={img.caption} delay={(i % 4) * 0.06} className="break-inside-avoid">
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src={img.src}
                alt={img.caption}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-3 left-3 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-sm">
                {img.caption}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
};
