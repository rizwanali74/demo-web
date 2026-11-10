import React from 'react';
import { ArrowRight, Hammer, Sparkles, Building2, MessageCircle } from 'lucide-react';

export const STUDIO_MATERIALS = [
  {
    title: 'Honed Roman Travertine',
    description: 'Natural open-pore sedimentary limestone carved into monumental monolithic tables.',
    origin: 'Tuscany & UAE Stone Masonry'
  },
  {
    title: 'Heavy Wool & Linen Bouclé',
    description: 'High-texture, stain-resistant European bouclé woven for high-traffic longevity.',
    origin: 'Belgium & Custom UAE Upholstery'
  },
  {
    title: 'Figured Burl Wood Veneer',
    description: 'Wild swirling root grain bookmatched and sealed with matte organic hard-wax.',
    origin: 'Californian Walnut'
  },
  {
    title: 'Sand-Cast Raw Brass & Steel',
    description: 'Architectural hardware poured in local sand foundries with unlacquered living patina.',
    origin: 'Al Ain & Sharjah Ateliers'
  }
];

export default function EmiratiCraftManifesto({ onFilterUAEHandmade, onOpenWhatsAppConcierge }) {
  return (
    <section id="trade-bespoke" className="py-16 md:py-24 bg-[#FAF9F6] border-b border-[#EAE8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Simple Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-white border border-[#E0DCD5] px-3.5 py-1 rounded-full text-[10px] uppercase tracking-[0.24em] text-[#736E67] mb-3 font-semibold shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#141414]" />
            <span>HUJRAH // Studio & Craftsmanship</span>
          </div>

          <h2 className="text-2xl sm:text-4xl text-[#141414] font-light tracking-[-0.01em]">
            Honest Materiality & Bespoke Trade
          </h2>

          <p className="font-arabic-calligraphy text-base text-[#8C7A58] mt-1.5">
            حِرفية نحتية ومواد نقية لمساحات هادئة
          </p>

          <p className="mt-3 text-xs sm:text-sm text-[#635E57] font-light leading-relaxed">
            From our workshops in the UAE to international stone quarries, every piece is built around the balance of architectural weight and sensory comfort.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">

          {/* Studio Atelier Image */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-sm overflow-hidden shadow-sm border border-[#E0DCD5] bg-[#EAE8E4]">
              <img
                src="/images/craft_atelier.jpg"
                alt="Craftsman hand-carving stone and finishing bespoke furniture"
                className="w-full h-[380px] sm:h-[450px] object-cover object-center"
              />
            </div>

            {/* Minimal Badge */}
            <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full border border-black/10 text-xs font-medium text-[#141414] shadow-sm flex items-center gap-2">
              <Hammer className="w-3.5 h-3.5 text-neutral-800" />
              <span>Hand-finished in our UAE Ateliers</span>
            </div>
          </div>



        </div>

      </div>
    </section>
  );
}
