import React, { useState } from 'react';
import { 
  MessageCircle, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowRight, 
  Check, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function Footer({ onOpenWhatsAppConcierge, onNavigateSection }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#1A1815] text-[#EDE8DF] pt-16 pb-12 border-t border-[#332F2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-heading-cinzel text-2xl tracking-[0.22em] font-semibold text-white block">
                AL-ATHAR
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-arabic-heritage text-base text-[#B89758] tracking-widest">
                  دار الأثر للتصميم المقتنى
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A8A196] leading-relaxed max-w-sm">
              A UAE-based sanctuary of rare, unconventional collectible design, interior décor, and sculptural furniture. Celebrating local Emirati identity alongside curated artifacts from worldwide ateliers.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#C5BBAE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]"></span>
              <span>Atelier Open for Private Appointments • Dubai & Abu Dhabi</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading-cinzel text-xs uppercase tracking-[0.2em] text-[#B89758] font-semibold">
              The Collection
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A196]">
              <li>
                <button 
                  onClick={() => onNavigateSection('emirati-craft')} 
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>🇦🇪 Emirati Craftsmanship</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('rare-imports')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Rare Global Imports
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('collection')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sculptural Furniture
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('collection')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terracotta & Vessels
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('spaces')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Spaces In Situ
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Ordering */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading-cinzel text-xs uppercase tracking-[0.2em] text-[#B89758] font-semibold">
              Client Concierge
            </h4>
            <div className="space-y-2.5 text-xs text-[#A8A196]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B89758] shrink-0 mt-0.5" />
                <span>Dubai Design District (d3), Building 7, Ground Floor & Warehouse in Al Quoz, UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B89758] shrink-0" />
                <span>+971 50 882 1971 (WhatsApp & Calls)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B89758] shrink-0" />
                <span>concierge@al-athar.ae</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenWhatsAppConcierge}
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-sm text-xs font-medium hover:bg-[#20ba59] transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Direct WhatsApp Chat</span>
              </button>
            </div>
          </div>

          {/* Newsletter / Gazette */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading-cinzel text-xs uppercase tracking-[0.2em] text-[#B89758] font-semibold">
              The Collector's Gazette
            </h4>
            <p className="text-xs text-[#A8A196] leading-relaxed">
              Receive private previews of newly arrived global curios and upcoming Emirati design releases.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center border border-white/20 rounded-sm bg-white/5 px-3 py-2 focus-within:border-[#B89758]">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent text-xs text-white placeholder-[#787268] focus:outline-none w-full"
                />
                <button
                  type="submit"
                  className="text-[#B89758] hover:text-white transition-colors cursor-pointer pl-2"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#30D158]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Welcome to the AL-ATHAR Collector's circle.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#80796E]">
          <div className="flex flex-wrap items-center gap-3">
            <span>Payment Security:</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[11px] text-white font-mono">Pay (Apple Pay)</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[11px] text-white font-mono">Visa / Mastercard</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[11px] text-white font-mono">Direct Bank Wire</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[11px] text-white font-mono">White Glove COD</span>
          </div>

          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} AL-ATHAR Collectible Design LLC. Registered in Dubai, UAE.</p>
            <p className="text-[10px] text-[#605A50] mt-0.5">Designed with Pure Emirati Identity & Global Curations.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
