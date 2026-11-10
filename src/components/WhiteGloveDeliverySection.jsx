import React from 'react';
import { Truck, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DELIVERY_BENEFITS = [
  {
    step: '01',
    title: 'Precision Craft & Quality Inspection',
    description: 'Every stone plinth, bouclé seam, and hand-carved edge is rigorously inspected in our UAE studio prior to dispatch.'
  },
  {
    step: '02',
    title: 'White Glove Room Placement',
    description: 'Our specialized fine-art logistics team brings your piece into your room of choice, unboxes, and removes all packaging materials.'
  },
  {
    step: '03',
    title: 'Frictionless Payments',
    description: 'Pay securely with Apple Pay, Visa, Mastercard, or coordinate custom bank wire & installment plans directly on WhatsApp.'
  }
];

export default function WhiteGloveDeliverySection({ onOpenWhatsAppConcierge }) {
  return (
    <section id="delivery" className="py-16 md:py-20 bg-[#FAF9F6] border-b border-[#EAE8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
      
        {/* WhatsApp direct prompt banner */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE8E4] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-2xs">
          <div>
            <h4 className="text-base font-normal text-[#141414]">
              Need custom dimensions or fabric swatches sent to your address?
            </h4>
            <p className="text-xs text-[#736E67] font-light mt-0.5">
              Connect directly with our design consultants for bespoke specifications and private studio visits.
            </p>
          </div>

          <button
            onClick={onOpenWhatsAppConcierge}
            className="shrink-0 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 rounded-full text-xs uppercase tracking-[0.16em] font-medium cursor-pointer shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Concierge</span>
          </button>
        </div>

      </div>
    </section>
  );
}
