import React from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Smartphone, 
  MessageCircle, 
  Clock, 
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { DELIVERY_BENEFITS } from '../data/products';

export default function WhiteGloveDeliverySection({ onOpenWhatsAppConcierge }) {
  return (
    <section id="delivery" className="py-20 md:py-28 bg-[#F8F6F0] border-b border-[#E8E2D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F3EFE6] border border-[#DDD6C8] px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#8C6D32] mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>Frictionless Ordering // خدمة التوصيل المتميزة</span>
          </div>

          <h2 className="font-heading-cinzel text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1A17] tracking-[0.04em] mb-4">
            White Glove Delivery & Apple Pay
          </h2>

          <p className="text-sm sm:text-base text-[#6B655D] font-light leading-relaxed">
            Acquiring rare collectible design should be effortless. We have streamlined ordering into a seamless, direct connection between collector and atelier.
          </p>
        </div>

        {/* 4-Step Journey */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          
          <div className="bg-[#FAF8F5] p-6 rounded-sm border border-[#E0D9CB] relative group hover:border-[#8C6D32] transition-colors">
            <span className="font-heading-cinzel text-3xl font-bold text-[#E0D9CB] group-hover:text-[#B89758] transition-colors block mb-2">
              01
            </span>
            <h3 className="font-heading-cinzel text-sm uppercase tracking-wider font-semibold text-[#1C1A17] mb-2">
              Transparent Pricing
            </h3>
            <p className="text-xs text-[#6B655D] leading-relaxed">
              Every piece is presented with honest pricing in AED, detailed material origins, and verified UAE workshop provenance.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-sm border border-[#E0D9CB] relative group hover:border-[#8C6D32] transition-colors">
            <span className="font-heading-cinzel text-3xl font-bold text-[#E0D9CB] group-hover:text-[#B89758] transition-colors block mb-2">
              02
            </span>
            <h3 className="font-heading-cinzel text-sm uppercase tracking-wider font-semibold text-[#1C1A17] mb-2 flex items-center gap-1.5">
              <span>Apple Pay & Direct</span>
            </h3>
            <p className="text-xs text-[#6B655D] leading-relaxed">
              Pay in seconds with Pay Touch ID / Face ID, or complete order via WhatsApp directly without complicated registration.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-sm border border-[#E0D9CB] relative group hover:border-[#8C6D32] transition-colors">
            <span className="font-heading-cinzel text-3xl font-bold text-[#E0D9CB] group-hover:text-[#B89758] transition-colors block mb-2">
              03
            </span>
            <h3 className="font-heading-cinzel text-sm uppercase tracking-wider font-semibold text-[#1C1A17] mb-2">
              Direct Order Routing
            </h3>
            <p className="text-xs text-[#6B655D] leading-relaxed">
              Your order is sent straight to our founder's desk, ensuring bespoke scheduling and white glove delivery coordination.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-sm border border-[#E0D9CB] relative group hover:border-[#8C6D32] transition-colors">
            <span className="font-heading-cinzel text-3xl font-bold text-[#E0D9CB] group-hover:text-[#B89758] transition-colors block mb-2">
              04
            </span>
            <h3 className="font-heading-cinzel text-sm uppercase tracking-wider font-semibold text-[#1C1A17] mb-2">
              Insured White Glove
            </h3>
            <p className="text-xs text-[#6B655D] leading-relaxed">
              Two-man specialist team delivers, unpacks, and positions your piece in your residence across all 7 Emirates.
            </p>
          </div>

        </div>

        {/* Benefits Strip */}
        <div className="bg-[#F2ECE1] p-8 sm:p-10 rounded-sm border border-[#DDCFB7] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DELIVERY_BENEFITS.map((b, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6D32] shrink-0" />
                <h4 className="font-heading-cinzel text-xs uppercase tracking-wider font-semibold text-[#1C1A17]">
                  {b.title}
                </h4>
              </div>
              <p className="font-arabic-heritage text-xs text-[#8C6D32]">
                {b.arabicTitle}
              </p>
              <p className="text-[11px] text-[#615B51] leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>

        {/* WhatsApp Callout Banner */}
        <div className="mt-12 text-center bg-[#FAF8F5] p-6 rounded-sm border border-[#E0D9CB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-heading-cinzel text-sm font-semibold text-[#1C1A17]">
              Need custom dimensions or a bespoke Emirati commission?
            </h4>
            <p className="text-xs text-[#7A7468]">
              Connect directly with our creative team on WhatsApp for private viewings and residential proposals.
            </p>
          </div>

          <button
            onClick={onOpenWhatsAppConcierge}
            className="shrink-0 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold cursor-pointer shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
}
