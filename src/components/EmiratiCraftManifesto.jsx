import React from 'react';
import { EMIRATI_MATERIALS } from '../data/products';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Hammer } from 'lucide-react';

export default function EmiratiCraftManifesto({ onFilterUAEHandmade }) {
  return (
    <section id="emirati-craft" className="py-20 md:py-28 bg-[#F3EFE6] border-b border-[#E2DBD0] relative overflow-hidden">
      {/* Decorative subtle background seal */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none select-none text-[320px] font-arabic-heritage font-bold text-[#1C1A17]">
        الإمارات
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#DDD6C8] px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#8C6D32] mb-4 shadow-sm">
            <span>🇦🇪</span>
            <span className="font-semibold">The Soul of the Emirates // روح الإمارات</span>
          </div>

          <h2 className="font-heading-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#1C1A17] font-normal tracking-[0.04em] mb-4">
            Purely Emirati Identity & Master Craftsmanship
          </h2>

          <p className="font-arabic-heritage text-xl sm:text-2xl text-[#8C6D32] mb-4">
            نحتفي بالهوية الإماراتية من خلال حِرف يدوية متجذّرة في تراب أرضنا
          </p>

          <p className="text-sm sm:text-base text-[#615B51] font-light leading-relaxed">
            The heart of AL-ATHAR is rooted in our homeland. The majority of our collectible designs are imagined, hand-carved, and manufactured in the United Arab Emirates by skilled local artisans, giving modern permanence to ancestral materials.
          </p>
        </div>

        {/* Feature Grid: Master Artisan Photo + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left: Artisan Workshop Photography */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-sm overflow-hidden shadow-2xl border border-[#D5CEBE] bg-[#E8E2D4] group">
              <img 
                src="/images/craft_atelier.jpg" 
                alt="Emirati master artisan hand-carving local fossil limestone and shaping terracotta" 
                className="w-full h-[420px] sm:h-[500px] object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/80 via-transparent to-transparent"></div>
              
              {/* Photo Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#D8CCA8] block mb-1">
                    Atelier Journal • Abu Dhabi & Sharjah
                  </span>
                  <h4 className="font-serif-luxury text-xl sm:text-2xl font-normal text-[#FAF8F5]">
                    Hand-chiseling Al Ain fossil limestone & desert terracotta slip
                  </h4>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-xs text-[#D8CCA8] block font-arabic-heritage">صُنع في الإمارات</span>
                  <span className="text-[10px] tracking-widest uppercase text-[#FAF8F5]">100% Made in UAE</span>
                </div>
              </div>
            </div>

            {/* Floating Authenticity Badge */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-[#FAF8F5] p-4 sm:p-5 rounded-sm border border-[#DDD6C8] shadow-xl max-w-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#B89758]/15 border border-[#B89758]/40 flex items-center justify-center shrink-0">
                <Hammer className="w-5 h-5 text-[#8C6D32]" />
              </div>
              <div>
                <h5 className="font-heading-cinzel text-xs uppercase tracking-wider font-semibold text-[#1C1A17]">
                  Handmade in the UAE
                </h5>
                <p className="text-[11px] text-[#6B655D] mt-0.5">
                  Every local piece is marked with a numbered seal and artisan signature.
                </p>
              </div>
            </div>
          </div>

          {/* Right: The Four Pillars of Emirati Craft */}
          <div className="lg:col-span-5 space-y-6 pt-6 lg:pt-0">
            <div className="border-l-2 border-[#B89758] pl-5 space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D32] font-semibold">
                Our Manifesto
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#1C1A17] leading-tight">
                "We do not imitate past forms; we sculpt our geology into contemporary eternity."
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#5E584E] leading-relaxed">
              From the deep red sands of the Liwa desert to the limestone ridges of Jebel Hafeet, our studio partners with generational craftsmen across the Emirates to produce unconventional collectible furniture and interior art pieces that cannot be replicated anywhere in the world.
            </p>

            {/* Quick Points */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#8C6D32] shrink-0 mt-0.5" />
                <span className="text-xs text-[#4A453E] leading-relaxed">
                  <strong className="text-[#1C1A17]">Locally Sourced Geologies:</strong> Jebel Hafeet fossil stone with 50-million-year-old marine deposits.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#8C6D32] shrink-0 mt-0.5" />
                <span className="text-xs text-[#4A453E] leading-relaxed">
                  <strong className="text-[#1C1A17]">Sustainable Oasis Palm & Camel Hide:</strong> Repurposing naturally fallen date palms and vegetable-tanned UAE camel leather.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#8C6D32] shrink-0 mt-0.5" />
                <span className="text-xs text-[#4A453E] leading-relaxed">
                  <strong className="text-[#1C1A17]">UAE Metallurgical Sand-Casting:</strong> Molten brass poured in Sharjah foundry sand pits for unique cratered textures.
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={onFilterUAEHandmade}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1C1A17] text-[#FAF8F5] hover:bg-[#B89758] transition-colors px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold rounded-sm shadow-md cursor-pointer"
              >
                <span>Filter 🇦🇪 UAE Handmade Pieces</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Material Exploration Cards */}
        <div className="mt-14 pt-12 border-t border-[#DDD6C8]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D32] font-semibold block mb-1">
                The Terroir of the Emirates
              </span>
              <h3 className="font-heading-cinzel text-xl sm:text-2xl text-[#1C1A17]">
                Natural Materials Sourced Across the 7 Emirates
              </h3>
            </div>
            <span className="hidden sm:inline text-xs text-[#7A7468] font-script-editorial text-2xl">
              Authenticité & noblesse des matières
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {EMIRATI_MATERIALS.map((mat, idx) => (
              <div 
                key={idx} 
                className="bg-[#FAF8F5] p-5 rounded-sm border border-[#E0D9CB] hover:border-[#B89758] transition-all hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C6D32] bg-[#B89758]/10 px-2 py-0.5 rounded inline-block mb-3 font-medium">
                    {mat.tag}
                  </span>
                  <h4 className="font-heading-cinzel text-sm font-semibold text-[#1C1A17] mb-1 group-hover:text-[#8C6D32] transition-colors">
                    {mat.title}
                  </h4>
                  <p className="font-arabic-heritage text-xs text-[#7D7567] mb-2 font-medium">
                    {mat.arabicTitle}
                  </p>
                  <p className="text-[11px] text-[#615B51] leading-relaxed">
                    {mat.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAE4D6] text-[10px] text-[#8C8476] flex items-center justify-between">
                  <span>Origin:</span>
                  <strong className="text-[#1C1A17]">{mat.origin}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
