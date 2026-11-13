import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import {
  ThemeInstagramIcon,
  ThemeTikTokIcon,
  ThemeWhatsAppIcon
} from '../common/ThemeIcons';

export default function Footer({ onOpenWhatsAppConcierge, onNavigateSection, studioInfo }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-[#141414] border-t border-[#EAE8E4] pt-14 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3 Columns matching Forma Object screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          
          {/* Column 1: Get the latest updates */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#141414] mb-4">
              GET THE LATEST UPDATES
            </h4>
            
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex items-center border border-[#D5D0C7] bg-white px-3 py-2 text-xs">
                <input 
                  type="email" 
                  placeholder="E-mail address*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent focus:outline-none text-xs text-[#141414] placeholder:text-neutral-400"
                />
                <button
                  type="submit"
                  className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#141414] hover:opacity-60 transition-opacity ml-2 shrink-0 cursor-pointer"
                >
                  {submitted ? 'SENT' : 'SEND'}
                </button>
              </div>
            </form>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:pl-6">
            <h4 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#141414] mb-4">
              QUICK LINKS
            </h4>
            
            <ul className="space-y-2 text-xs text-[#555] font-light">
              <li>
                <button 
                  onClick={() => onNavigateSection('contact-custom')} 
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  About us
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenWhatsAppConcierge} 
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenWhatsAppConcierge} 
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  Shipping policy
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenWhatsAppConcierge} 
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  Refund policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('track-order')} 
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('privacy-policy')} 
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  Privacy policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('contact-custom')} 
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenWhatsAppConcierge} 
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  Store Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#141414] mb-4">
              CONTACT
            </h4>
            
            <div className="space-y-2 text-xs text-[#444] font-light">
              <p className="tracking-wide">{studioInfo?.phone || '+971 50 123 4567'}</p>
              <p>{studioInfo?.email || 'info@hujrah.ae'}</p>
              
              <div className="pt-1">
                <button
                  onClick={onOpenWhatsAppConcierge}
                  className="inline-block text-xs text-[#141414] font-normal underline hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Chat on WhatsApp
                </button>
              </div>

              {/* Colorful Theme Social Icons */}
              <div className="flex items-center gap-3 pt-3">
                <a
                  href={studioInfo?.instagramUrl || 'https://instagram.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <ThemeInstagramIcon className="w-6 h-6" />
                </a>

                <a
                  href={studioInfo?.tiktokUrl || 'https://tiktok.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                  aria-label="TikTok"
                >
                  <ThemeTikTokIcon className="w-6 h-6" />
                </a>

                <button
                  onClick={onOpenWhatsAppConcierge}
                  className="hover:scale-110 transition-transform cursor-pointer"
                  aria-label="WhatsApp Concierge"
                >
                  <ThemeWhatsAppIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Scroll-to-Top Button on Bottom Right matching screenshot */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 w-8 h-8 bg-white border border-[#DDD8CF] hover:border-black text-[#141414] flex items-center justify-center transition-all shadow-xs cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-3.5 h-3.5 stroke-[1.5]" />
      </button>
    </footer>
  );
}
