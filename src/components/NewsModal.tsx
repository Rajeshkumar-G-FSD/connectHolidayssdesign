import React from 'react';
import { X, Calendar, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const articles = [
    {
      title: 'Top 10 Hidden Tea Estate Escapes Across Asia in 2026',
      date: 'August 14, 2026',
      category: 'Curated Escapes',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      summary: 'From the mist-shrouded hills of Nuwara Eliya to the high peaks of Ooty and Munnar, explore boutique wooden chalets with heated infinity pools.',
    },
    {
      title: 'Sustainable Architecture: Bamboo & Stone Sanctuaries in Bali',
      date: 'August 08, 2026',
      category: 'Architecture & Design',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      summary: 'How eco-architects are handcrafting gravity-defying luxury residences overlooking sacred river gorges without disturbing natural biodiversity.',
    },
    {
      title: 'The Art of Mindful Travel: Finding Solace in Ancient Forests',
      date: 'July 29, 2026',
      category: 'Wellness & Nature',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      summary: 'Immerse yourself in Japanese Onsen hot springs and meditative walks through thousand-year-old pine ridges.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-neutral-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white max-h-[85vh] flex flex-col"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xl font-bold font-['Outfit',sans-serif]">AroundMe Journal & Travel News</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {articles.map((article, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-5 p-4 rounded-2xl bg-neutral-800/40 border border-white/5 hover:border-emerald-500/30 transition-all group"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full sm:w-48 h-32 object-cover rounded-xl shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 mb-1">
                    <span className="text-emerald-400 font-semibold">{article.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <span className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                  Read story <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
