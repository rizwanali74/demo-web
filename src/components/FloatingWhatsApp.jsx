import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp({ onOpenConcierge }) {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 animate-fadeIn">
      {/* Editorial Tooltip Pill */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#FAF8F5] text-[#1C1A17] text-xs py-2 px-3.5 rounded-full shadow-xl border border-[#D5CEBE] relative">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
          <span>Order via WhatsApp & Arrange Delivery</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-[#8C8476] hover:text-black ml-1 cursor-pointer"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={onOpenConcierge}
        className="relative bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center group"
        aria-label="Contact Concierge on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        
        {/* Pulsing Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping -z-10 opacity-75"></span>

        {/* Badge Dot */}
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#B89758] border-2 border-[#FAF8F5]"></span>
      </button>
    </div>
  );
}
