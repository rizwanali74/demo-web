import React from 'react';
import { Truck, MessageCircle } from 'lucide-react';
import { DELIVERY_BENEFITS } from '../data/products';

export default function WhiteGloveDeliverySection({ onOpenWhatsAppConcierge }) {
  return (
    <section id="delivery" className="py-14 md:py-18 bg-[#F8F6F0] border-b border-[#E8E2D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D32] font-semibold block mb-1">
            Seamless Ordering // التوصيل والدفع
          </span>
          <h2 className="font-heading-cinzel text-2xl sm:text-3xl text-[#1C1A17] font-normal tracking-[0.04em]">
            White Glove Delivery
          </h2>
          <p className="mt-2 text-xs text-[#6B655D]">
            Order directly with Apple Pay or WhatsApp. Every piece is delivered, unpacked, and placed in your home across the UAE.
          </p>
        </div>

        {/* 3 Simple Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {DELIVERY_BENEFITS.map((item, idx) => (
            <div key={idx} className="bg-[#FAF8F5] p-5 rounded-sm border border-[#E0D9CB] text-center md:text-left">
              <span className="font-heading-cinzel text-2xl font-bold text-[#8C6D32] block mb-1">
                {item.step}
              </span>
              <h3 className="font-heading-cinzel text-xs uppercase tracking-wider font-semibold text-[#1C1A17] mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-[#6B655D]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* WhatsApp direct prompt banner */}
        <div className="bg-[#F2ECE1] p-5 rounded-sm border border-[#DDCFB7] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif-luxury text-base font-semibold text-[#1C1A17]">
              Have questions or request custom dimensions?
            </h4>
            <p className="text-xs text-[#6B655D]">
              Chat directly with our team on WhatsApp for private viewings and delivery inquiries.
            </p>
          </div>

          <button
            onClick={onOpenWhatsAppConcierge}
            className="shrink-0 inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold cursor-pointer shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
}
