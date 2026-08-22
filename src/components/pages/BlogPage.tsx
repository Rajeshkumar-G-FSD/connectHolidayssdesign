import React from 'react';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';
import { PageShell, Reveal } from '../PageShell';

const ARTICLES = [
  {
    title: 'Top 10 Hidden Tea Estate Escapes Across Asia in 2026',
    date: 'August 14, 2026',
    category: 'Curated Escapes',
    image: 'https://images.unsplash.com/photo-1761442663511-2558e561f15e?auto=format&fit=crop&w=800&q=80',
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
  {
    title: 'Visa-Free & Visa-on-Arrival: 15 Countries Indians Can Explore in 2026',
    date: 'July 20, 2026',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    summary: 'A practical, up-to-date guide to visa-free and on-arrival destinations for Indian passport holders — perfect for last-minute planners.',
  },
  {
    title: 'Packing Smart: The Only Checklist You Need for International Trips',
    date: 'July 05, 2026',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1414408718521-f6f6198e9917?auto=format&fit=crop&w=800&q=80',
    summary: 'Documents, adapters, medication and everything else our travel consultants tell every client before departure.',
  },
  {
    title: 'Why Travel Insurance Is No Longer Optional',
    date: 'June 22, 2026',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    summary: 'Real stories of trip cancellations and medical emergencies abroad — and how the right coverage made all the difference.',
  },
];

export const BlogPage: React.FC = () => {
  return (
    <PageShell
      icon={Newspaper}
      eyebrow="Journal"
      title="Travel Blog & News"
      description="Stories, guides and practical tips from our travel desk."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((article, i) => (
          <Reveal key={article.title} delay={(i % 3) * 0.08}>
            <article className="h-full flex flex-col rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-emerald-500/30 transition-colors group cursor-pointer">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2">
                  <span className="text-emerald-400 font-semibold">{article.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed flex-1">{article.summary}</p>
                <span className="mt-4 text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  Read story <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
};
