import React, { useState } from 'react';
import { 
  MessageCircle, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Check 
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
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#1A1815] text-[#EDE8DF] pt-12 pb-10 border-t border-[#332F2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand */}
          <div className="md:col-span-5 space-y-3">
            <span className="font-heading-cinzel text-xl tracking-[0.22em] font-semibold text-white block">
              AL-ATHAR // دار الأثر
            </span>
            <p className="text-xs text-[#A8A196] max-w-sm leading-relaxed">
              UAE-based collectible design and furniture gallery. One-of-a-kind handmade Emirati creations and rare imported works.
            </p>
            <div className="text-xs text-[#C5BBAE] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
              <span>Dubai Design District (d3), UAE</span>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-[#B89758] font-semibold">
              Navigation
            </h4>
            <div className="flex flex-col gap-1.5 text-xs text-[#A8A196]">
              <button onClick={() => onNavigateSection('collection')} className="text-left hover:text-white transition-colors cursor-pointer">
                The Collection
              </button>
              <button onClick={() => onNavigateSection('emirati-craft')} className="text-left hover:text-white transition-colors cursor-pointer text-[#B89758]">
                🇦🇪 Made in UAE
              </button>
              <button onClick={() => onNavigateSection('rare-imports')} className="text-left hover:text-white transition-colors cursor-pointer">
                Rare Imports
              </button>
              <button onClick={() => onNavigateSection('spaces')} className="text-left hover:text-white transition-colors cursor-pointer">
                Spaces In Situ
              </button>
            </div>
          </div>

          {/* WhatsApp & Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#B89758] font-semibold">
              Client Concierge
            </h4>
            <p className="text-xs text-[#A8A196]">
              Orders and delivery inquiries are handled directly on WhatsApp.
            </p>
            <button
              onClick={onOpenWhatsAppConcierge}
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat +971 50 882 1971</span>
            </button>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#80796E]">
          <div className="flex items-center gap-2">
            <span>Secure Payments:</span>
            <span className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded text-[11px]">Pay (Apple Pay)</span>
            <span className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded text-[11px]">Visa / Mastercard</span>
          </div>

          <p>© {new Date().getFullYear()} AL-ATHAR Collectible Design LLC. Registered in Dubai, UAE.</p>
        </div>

      </div>
    </footer>
  );
}
