import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ onOpenWhatsAppConcierge, onNavigateSection }) {
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
              <p className="tracking-wide">+971 50 123 4567</p>
              <p>info@hujrah.ae</p>
              
              <div className="pt-1">
                <button
                  onClick={onOpenWhatsAppConcierge}
                  className="inline-block text-xs text-[#141414] font-normal underline hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Chat on WhatsApp
                </button>
              </div>

              {/* Social Icons matching Forma Object */}
              <div className="flex items-center gap-3.5 pt-3 text-[#141414]">
                {/* Instagram Icon */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                
                {/* TikTok Icon */}
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
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
