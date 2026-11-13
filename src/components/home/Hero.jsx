import React from 'react';
import { ArrowRight, MessageCircle, Sparkles, ShieldCheck, Truck } from 'lucide-react';

export default function Hero({ onExploreCollection, onOpenWhatsAppConcierge }) {
  return (
    <section id="hero" className="relative bg-[#FAFAF9] pt-6 pb-14 md:pb-20 overflow-hidden border-b border-[#EAE8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Minimal Hero Header & Editorial Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-8">


          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-[#141414] tracking-[-0.02em] leading-[1.12]">
            Sculptural Comfort & <br className="hidden sm:inline" />
            <span className="font-normal italic">Minimalist Forms.</span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-[#635E57] font-light max-w-xl mx-auto leading-relaxed">
            Curated furniture, architectural lighting, and tactile stone objects designed to create serene, intentional interiors.
          </p>
        </div>

        {/* Hero Visual Banner (Forma Object style clean editorial canvas) */}
        <div className="relative rounded-sm overflow-hidden shadow-sm border border-[#E2DED6] group">
          <div className="relative h-[440px] sm:h-[540px] lg:h-[620px] w-full overflow-hidden bg-[#ECE8E1]">
            <img
              src="/images/hero.jpg"
              alt="HUJRAH Modern Minimalist Living Space with Sculptural Dune Sofa and Travertine"
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-103"
            />
            {/* Subtle Gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
          </div>

          {/* Minimal Floating Pills */}
          <div className="absolute top-5 left-5 z-10 flex flex-wrap gap-2">
            <span className="bg-white/95 backdrop-blur-md text-[#141414] text-[10px] uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border border-black/10 font-semibold shadow-sm">
              Collection 2026
            </span>
            <span className="hidden sm:inline-block bg-[#141414]/90 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border border-white/10 font-medium">
              Al Ain & Dubai Studio
            </span>
          </div>

          {/* Bottom Banner Content */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-white">
            <div className="max-w-md">
              <span className="text-[11px] tracking-[0.24em] uppercase text-[#E5DFD5] block mb-1 font-medium">
                Signature Aesthetic
              </span>
              <h2 className="text-xl sm:text-3xl text-white font-light leading-snug">
                Quiet luxury defined by organic textures, honed stone & soft proportions.
              </h2>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreCollection}
                className="bg-white text-[#141414] hover:bg-[#141414] hover:text-white transition-all px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenWhatsAppConcierge}
                className="bg-[#25D366] hover:bg-[#20ba59] text-white transition-all px-5 py-3 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </button>
            </div>
          </div>
        </div>



      </div>
    </section>
  );
}
