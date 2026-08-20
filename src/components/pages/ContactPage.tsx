import React, { useState } from 'react';
import { MessageCircle, Phone, MapPin, Clock, Send, CheckCircle2, Facebook, Instagram } from 'lucide-react';
import { PageShell } from '../PageShell';

const BUSINESS_ADDRESS = 'Muthuram Complex, 314/L, Brough Rd, Erode Fort, Erode, Tamil Nadu 638001';
const BUSINESS_PHONE_DISPLAY = '098650 51388';
const BUSINESS_PHONE_TEL = '+919865051388';
const FACEBOOK_URL = 'https://www.facebook.com/connectholidaysserd/';
const INSTAGRAM_URL = 'https://www.instagram.com/connect_holidayss/';

// Sun=0 ... Sat=6, matching Date#getDay()
const BUSINESS_HOURS = [
  { day: 'Sunday', hours: 'Closed' },
  { day: 'Monday', hours: '9:30 AM – 8:30 PM' },
  { day: 'Tuesday', hours: '9:30 AM – 8:30 PM' },
  { day: 'Wednesday', hours: '9:30 AM – 8:30 PM' },
  { day: 'Thursday', hours: '9:30 AM – 8:30 PM' },
  { day: 'Friday', hours: '9:30 AM – 8:30 PM' },
  { day: 'Saturday', hours: '9:30 AM – 8:30 PM' },
];

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const today = new Date().getDay();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <PageShell
      icon={MessageCircle}
      eyebrow="Visit or Call Our Concierge"
      title="Contact Connect Holidayss"
      description="Reach out for bookings, custom itineraries, or any question about your next trip."
      maxWidth="max-w-5xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* Address, phone & hours */}
        <div className="space-y-5">
          <div className="flex gap-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Address
              </span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-emerald-300 transition-colors leading-relaxed"
              >
                {BUSINESS_ADDRESS}
              </a>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <Phone className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Phone
              </span>
              <a href={`tel:${BUSINESS_PHONE_TEL}`} className="text-sm text-white hover:text-emerald-300 transition-colors">
                {BUSINESS_PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Hours
              </span>
              <ul className="space-y-0.5">
                {BUSINESS_HOURS.map(({ day, hours }, idx) => (
                  <li
                    key={day}
                    className={`flex items-center justify-between gap-4 text-xs py-0.5 ${
                      idx === today ? 'text-emerald-300 font-semibold' : 'text-neutral-300'
                    }`}
                  >
                    <span>{day}</span>
                    <span>{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <Instagram className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5">
                Follow Us
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Connect Holidayss on Facebook"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Connect Holidayss on Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry form */}
        {submitted ? (
          <div className="rounded-3xl bg-neutral-900 border border-white/10 flex flex-col items-center justify-center text-center p-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3 animate-bounce" />
            <h4 className="text-xl font-bold font-['Outfit',sans-serif]">Message Received</h4>
            <p className="text-xs text-neutral-300 mt-1 max-w-sm">
              Our travel consultant will get in touch with you within 30 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Destination or Question
              </label>
              <textarea
                required
                rows={5}
                placeholder="Ask about tour packages, visa services, or flight & hotel bookings..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Inquiry to Concierge</span>
            </button>
          </form>
        )}
      </div>
    </PageShell>
  );
};
