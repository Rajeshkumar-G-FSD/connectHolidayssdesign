import React from 'react';
import { Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

const FACEBOOK_URL = 'https://www.facebook.com/connectholidaysserd/';
const INSTAGRAM_URL = 'https://www.instagram.com/connect_holidayss/';

const EXPLORE_LINKS: { tab: ActiveTab; label: string }[] = [
  { tab: 'home', label: 'Home' },
  { tab: 'about', label: 'About Us' },
  { tab: 'destinations', label: 'Destinations' },
  { tab: 'gallery', label: 'Gallery' },
  { tab: 'blog', label: 'Blog' },
  { tab: 'testimonials', label: 'Testimonials' },
];

const SERVICE_LINKS: { tab: ActiveTab; label: string }[] = [
  { tab: 'tour-packages', label: 'Tour Packages' },
  { tab: 'visa-services', label: 'Visa Services' },
  { tab: 'flight-booking', label: 'Flight Booking' },
  { tab: 'hotel-booking', label: 'Hotel Booking' },
  { tab: 'travel-insurance', label: 'Travel Insurance' },
  { tab: 'faq', label: 'FAQ' },
];

const LEGAL_LINKS: { tab: ActiveTab; label: string }[] = [
  { tab: 'privacy-policy', label: 'Privacy Policy' },
  { tab: 'terms-conditions', label: 'Terms & Conditions' },
  { tab: 'cancellation-policy', label: 'Cancellation Policy' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-neutral-900 border-t border-white/10 text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-14 grid grid-cols-2 sm:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="col-span-2 sm:col-span-1">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center cursor-pointer select-none"
          >
            <img src="/images/connect_holidayss.png" alt="Connect Holidayss" className="h-11 w-auto" />
          </button>
          <p className="mt-4 text-sm text-neutral-300 font-medium">We Lead, You Relax</p>
          <p className="mt-2 text-xs leading-relaxed max-w-[220px]">
            Domestic & international tour packages, customized holidays and complete travel assistance since 2003.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Connect Holidayss on Facebook"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#1877F2] flex items-center justify-center text-white transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Connect Holidayss on Instagram"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] flex items-center justify-center text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Explore column */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.tab}>
                <button onClick={() => onNavigate(link.tab)} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services column */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Services</h4>
          <ul className="space-y-2.5 text-sm">
            {SERVICE_LINKS.map((link) => (
              <li key={link.tab}>
                <button onClick={() => onNavigate(link.tab)} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal + Contact column */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Legal</h4>
          <ul className="space-y-2.5 text-sm">
            {LEGAL_LINKS.map((link) => (
              <li key={link.tab}>
                <button onClick={() => onNavigate(link.tab)} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                Contact
              </button>
            </li>
          </ul>

          <div className="mt-5 space-y-2 text-xs">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Muthuram+Complex+314%2FL+Brough+Rd+Erode+Fort+Erode+Tamil+Nadu+638001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Muthuram Complex, 314/L, Brough Rd, Erode Fort, Erode, Tamil Nadu 638001</span>
            </a>
            <a href="tel:+919865051388" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>098650 51388</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 px-6 sm:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <span>© {year} Connect Holidayss. All rights reserved.</span>
          <span>Est. 2003 · Erode, Tamil Nadu</span>
        </div>
      </div>
    </footer>
  );
};
