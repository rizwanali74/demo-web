import React from 'react';
import { EMIRATI_MATERIALS } from '../data/products';
import { ArrowRight, Hammer } from 'lucide-react';

export default function EmiratiCraftManifesto({ onFilterUAEHandmade }) {
  return (
    <section id="emirati-craft" className="py-16 md:py-20 bg-[#F3EFE6] border-b border-[#E2DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#DDD6C8] px-3.5 py-1 rounded-full text-xs uppercase tracking-[0.2em] text-[#8C6D32] mb-3 font-semibold">
            <span>🇦🇪</span>
            <span>Pure Emirati Identity</span>
          </div>

          <h2 className="font-heading-cinzel text-2xl sm:text-4xl text-[#1C1A17] font-normal tracking-[0.04em]">
            Handmade in the Emirates
          </h2>

          <p className="font-arabic-heritage text-lg text-[#8C6D32] mt-1">
            صُنع في الإمارات • هوية أصيلة وحِرفية يدوية
          </p>

          <p className="mt-2 text-xs sm:text-sm text-[#615B51] font-light leading-relaxed">
            The majority of our pieces are designed and manufactured locally in the UAE by master artisans, giving contemporary form to native desert sandstone, terracotta, and oasis timber.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          
          {/* Master Artisan Image */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-sm overflow-hidden shadow-lg border border-[#D5CEBE] bg-[#E8E2D4]">
              <img 
                src="/images/craft_atelier.jpg" 
                alt="Emirati craftsman sculpting desert stone and terracotta" 
                className="w-full h-[360px] sm:h-[420px] object-cover object-center"
              />
            </div>
            
            {/* Minimal Badge */}
            <div className="absolute bottom-4 left-4 bg-[#FAF8F5]/95 px-3 py-1.5 rounded-sm border border-[#DDD6C8] text-xs font-medium text-[#1C1A17] shadow-md flex items-center gap-2">
              <Hammer className="w-3.5 h-3.5 text-[#8C6D32]" />
              <span>Handcrafted in UAE Workshops</span>
            </div>
          </div>

          {/* 4 Clean Materials */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-heading-cinzel text-sm uppercase tracking-[0.16em] text-[#1C1A17] font-semibold mb-2">
              Native Materials
            </h3>

            <div className="space-y-2.5">
              {EMIRATI_MATERIALS.map((mat, idx) => (
                <div key={idx} className="bg-[#FAF8F5] p-3 rounded-sm border border-[#E0D9CB] flex justify-between items-center">
                  <div>
                    <h4 className="font-serif-luxury text-base font-semibold text-[#1C1A17]">
                      {mat.title}
                    </h4>
                    <p className="text-[11px] text-[#6B655D]">
                      {mat.description}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#8C6D32] bg-[#B89758]/10 px-2 py-0.5 rounded font-mono shrink-0 ml-2">
                    {mat.origin}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={onFilterUAEHandmade}
              className="mt-4 w-full bg-[#1C1A17] text-[#FAF8F5] hover:bg-[#8C6D32] transition-colors py-3 text-xs uppercase tracking-[0.2em] font-semibold rounded-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View All 🇦🇪 Made in UAE Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
