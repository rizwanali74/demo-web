import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function Hero({ onExploreCollection, onExploreEmirati, onOpenWhatsAppConcierge }) {
  return (
    <section id="hero" className="relative bg-[#F8F6F0] pt-4 pb-12 md:pb-16 overflow-hidden border-b border-[#E8E2D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C8476] font-semibold block mb-2">
            Collectible Design & Interior Décor • UAE
          </span>
          <h1 className="font-heading-cinzel text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1C1A17] tracking-[0.04em] leading-[1.1]">
            Objects with Presence.
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#615B51] font-light leading-relaxed">
            Handcrafted one-of-a-kind designs with a purely Emirati identity, paired with rare imported pieces from worldwide ateliers.
          </p>
        </div>

        {/* Hero Visual Banner */}
        <div className="relative rounded-sm overflow-hidden shadow-xl border border-[#DCD5C5] group">
          <div className="relative h-[420px] sm:h-[520px] lg:h-[600px] w-full overflow-hidden bg-[#ECE6D8]">
            <img 
              src="/images/hero.jpg" 
              alt="AL-ATHAR Collectible Design Gallery with sandstone bench and terracotta amphora" 
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>

          {/* Minimal Corner Badges */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#FAF8F5]/90 backdrop-blur-sm text-[#1C1A17] text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-sm border border-[#E0D9CC] font-semibold">
              New Curations
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <span className="bg-[#1C1A17]/85 backdrop-blur-sm text-[#EDE8DF] text-[10px] tracking-wider px-3 py-1 rounded-sm border border-white/10 font-medium">
              🇦🇪 Made in UAE & Rare Imports
            </span>
          </div>

          {/* Bottom Hero Overlay */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div>
              <span className="font-script-editorial text-2xl sm:text-3xl text-[#E8DCC4] block">
                Fragments d'Héritage
              </span>
              <h2 className="font-serif-luxury text-xl sm:text-3xl text-white font-normal">
                Rare sculptural silhouettes & desert stone.
              </h2>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex items-center gap-3">
              <button
                onClick={onExploreCollection}
                className="bg-white text-[#1C1A17] hover:bg-[#B89758] hover:text-white transition-all px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold rounded-sm shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>View Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenWhatsAppConcierge}
                className="bg-[#25D366] hover:bg-[#20ba59] text-white transition-all px-4 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold rounded-sm shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Minimal Pillars */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E8E2D4] text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#8C6D32] font-semibold block">
              🇦🇪 Made in UAE
            </span>
            <p className="text-xs text-[#6B655D]">
              Locally designed and manufactured with desert stone, terracotta, and palm timber.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#8C6D32] font-semibold block">
              🌍 Rare Imports
            </span>
            <p className="text-xs text-[#6B655D]">
              Unusual, distinctive collectible furniture curated from international ateliers.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#8C6D32] font-semibold block">
              Pay & White Glove Delivery
            </span>
            <p className="text-xs text-[#6B655D]">
              Instant ordering with Apple Pay or WhatsApp, delivered directly to your home.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
