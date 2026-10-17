import React from 'react';
import { ArrowDownRight, Sparkles, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Hero({ onExploreCollection, onExploreEmirati, onOpenWhatsAppConcierge }) {
  return (
    <section id="hero" className="relative bg-[#F8F6F0] pt-4 pb-16 md:pb-24 overflow-hidden border-b border-[#E8E2D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subheader Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B89758]"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C8476] font-medium">
                Collectible Design & Interior Décor • UAE
              </span>
            </div>
            <h1 className="font-heading-cinzel text-3xl sm:text-5xl lg:text-[54px] font-normal leading-[1.15] text-[#1C1A17] tracking-[0.06em]">
              Objects with Presence.
            </h1>
          </div>

          <div className="max-w-md text-sm text-[#5E584E] font-light leading-relaxed">
            <p>
              Specializing in rare, unconventional collectible furniture and interior decor. 
              Proudly highlighting <strong className="font-medium text-[#1C1A17]">locally designed & manufactured Emirati pieces</strong> alongside extraordinary imported collectibles from worldwide ateliers.
            </p>
          </div>
        </div>

        {/* Hero Visual Showcase */}
        <div className="relative rounded-sm overflow-hidden shadow-2xl border border-[#DCD5C5] group">
          {/* Main Hero Image */}
          <div className="relative h-[480px] sm:h-[580px] lg:h-[660px] w-full overflow-hidden bg-[#ECE6D8]">
            <img 
              src="/images/hero.jpg" 
              alt="AL-ATHAR Collectible Design Gallery with sandstone bench and terracotta amphora" 
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Subtle Gradient & Texture Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/85 via-[#1C1A17]/25 to-transparent"></div>
          </div>

          {/* Floating Editorial Overlays */}
          {/* Top Left Tag */}
          <div className="absolute top-6 left-6 z-10">
            <span className="bg-[#FAF8F5]/90 backdrop-blur-md text-[#1C1A17] text-[11px] uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-sm border border-[#E0D9CC] shadow-sm flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89758]"></span>
              New Collection // Fragments d'Héritage
            </span>
          </div>

          {/* Top Right Origin Badge */}
          <div className="absolute top-6 right-6 z-10 hidden sm:flex items-center gap-2 bg-[#1C1A17]/80 backdrop-blur-md text-[#EDE8DF] text-[11px] tracking-wider px-3.5 py-1.5 rounded-sm border border-white/10">
            <span className="text-[#B89758]">🇦🇪</span>
            <span>Handcrafted in the UAE • Pure Emirati Identity</span>
          </div>

          {/* Bottom Hero Content Card */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
            <div className="max-w-xl">
              <span className="font-script-editorial text-2xl sm:text-3xl text-[#E8DCC4] block mb-1">
                Curated for the Discerning Collector
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-[40px] font-normal leading-tight text-[#FAF8F5] mb-3">
                Rare sculptural silhouettes, desert fossil stone & unconventional craft.
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#D8D0BF]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B89758]" />
                  White Glove Delivery Across UAE
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89758]" />
                  Secure Apple Pay Checkout
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  Direct WhatsApp Ordering
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onExploreCollection}
                className="bg-[#FAF8F5] text-[#1C1A17] hover:bg-[#B89758] hover:text-white transition-all px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold rounded-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreEmirati}
                className="bg-[#1C1A17]/70 hover:bg-[#1C1A17] text-[#FAF8F5] border border-white/25 backdrop-blur-sm transition-all px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium rounded-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🇦🇪 Emirati Craft</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Editorial Note (Directly inspired by BALCONTE Image 1 layout) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#E8E2D4]">
          <div className="space-y-2">
            <span className="font-script-editorial text-2xl text-[#8C6D32] block">
              Élégance brute & esprit émirati
            </span>
            <h3 className="font-heading-cinzel text-sm uppercase tracking-[0.16em] text-[#1C1A17]">
              Ancestral UAE Craftsmanship
            </h3>
            <p className="text-xs text-[#6B655D] leading-relaxed">
              We extract and refine materials directly from the Emirati landscape: porous Jebel Hafeet fossil limestone, coarse desert terracotta, reclaimed Al-Ain oasis date palm timber, and vegetable-tanned camel leather.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-script-editorial text-2xl text-[#8C6D32] block">
              Pièces singulières du monde
            </span>
            <h3 className="font-heading-cinzel text-sm uppercase tracking-[0.16em] text-[#1C1A17]">
              Curated Global Ateliers
            </h3>
            <p className="text-xs text-[#6B655D] leading-relaxed">
              Alongside our Emirati creations, we personally seek out unconventional collectible furniture and interior decor from Kyoto, Brianza, Apt, and Oaxaca—pieces with tactile rarity and unmatched soul.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-script-editorial text-2xl text-[#8C6D32] block">
              Service sur mesure & livraison
            </span>
            <h3 className="font-heading-cinzel text-sm uppercase tracking-[0.16em] text-[#1C1A17]">
              Seamless Ordering & Apple Pay
            </h3>
            <p className="text-xs text-[#6B655D] leading-relaxed">
              Ordering is effortless. With transparent pricing in AED, instant Pay checkout, and direct WhatsApp concierge transmission, every order is personally received and delivered white-glove to your door.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
