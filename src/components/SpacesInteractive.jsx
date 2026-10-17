import React, { useState } from 'react';
import { MOODBOARD_HOTSPOTS } from '../data/products';
import { Sparkles, Eye, ArrowUpRight, MessageCircle } from 'lucide-react';

export default function SpacesInteractive({ onQuickViewById, formatPrice, onApplePayById }) {
  const [activeSpot, setActiveSpot] = useState(MOODBOARD_HOTSPOTS[0]);

  return (
    <section id="spaces" className="py-20 md:py-28 bg-[#F3EFE6] border-b border-[#E2DBD0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89758]"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C8476] font-medium">
                Spaces That Inspire // مساحات ملهمة
              </span>
            </div>
            <h2 className="font-heading-cinzel text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1A17] tracking-[0.04em]">
              Quiet Luxury & Curated Living
            </h2>
          </div>

          <div className="max-w-md">
            <span className="font-script-editorial text-2xl text-[#8C6D32] block mb-1">
              "Harmonie des matières & silhouettes sculpturales"
            </span>
            <p className="text-xs text-[#6B655D] leading-relaxed">
              Soft neutrals, olive velvet, aged sand-cast brass, and hand-chiseled travertine come together to create a refined interior that feels timeless, curated, and quietly luxurious.
            </p>
          </div>
        </div>

        {/* Interactive Living Scene Canvas */}
        <div className="relative rounded-sm overflow-hidden shadow-2xl border border-[#D5CEBE] bg-[#E8E2D4]">
          
          {/* Main Visual Scene */}
          <div className="relative aspect-[16/9] w-full min-h-[420px] max-h-[680px]">
            <img 
              src="/images/living_scene.jpg" 
              alt="Quiet Luxury Living Room showcasing Murmure Olive Velvet Sofa and Sarab Lamp" 
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle atmospheric vignette */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

            {/* Interactive Pins */}
            {MOODBOARD_HOTSPOTS.map((spot) => {
              const isSelected = activeSpot?.id === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  {/* Pulsing Pin Marker */}
                  <button
                    onClick={() => setActiveSpot(spot)}
                    onMouseEnter={() => setActiveSpot(spot)}
                    className="relative group p-2 cursor-pointer focus:outline-none"
                    aria-label={`View details for ${spot.title}`}
                  >
                    <span className="absolute inset-0 rounded-full bg-[#B89758] animate-ping opacity-60"></span>
                    <span className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xl ${
                      isSelected 
                        ? 'bg-[#1C1A17] text-[#FAF8F5] scale-110 ring-2 ring-[#B89758]' 
                        : 'bg-[#FAF8F5]/95 text-[#1C1A17] hover:bg-[#8C6D32] hover:text-white'
                    }`}>
                      +
                    </span>
                  </button>

                  {/* Popover Card for Selected Hotspot */}
                  {isSelected && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-12 w-64 sm:w-72 bg-[#FAF8F5]/95 backdrop-blur-md p-4 rounded-sm shadow-2xl border border-[#DCD5C5] z-30 animate-fadeIn text-left">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C6D32] font-semibold bg-[#B89758]/15 px-2 py-0.5 rounded">
                          {spot.origin}
                        </span>
                        <span className="font-heading-cinzel text-xs font-bold text-[#1C1A17]">
                          {spot.price}
                        </span>
                      </div>

                      <h4 className="font-serif-luxury text-lg text-[#1C1A17] font-normal leading-tight mb-1">
                        {spot.title}
                      </h4>

                      <p className="text-[11px] text-[#6B655D] mb-3 leading-snug">
                        {spot.notes}
                      </p>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#EAE4D6]">
                        <button
                          onClick={() => onQuickViewById(spot.productId)}
                          className="flex-1 bg-[#1C1A17] hover:bg-[#8C6D32] text-white text-[11px] uppercase tracking-wider py-1.5 px-2 rounded-sm text-center transition-colors flex items-center justify-center gap-1 cursor-pointer font-medium"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View Piece</span>
                        </button>

                        <button
                          onClick={() => onApplePayById(spot.productId)}
                          className="bg-black hover:bg-[#222] text-white text-[11px] font-medium py-1.5 px-3 rounded-sm text-center transition-colors flex items-center justify-center gap-1 cursor-pointer border border-white/20"
                        >
                          <span>Pay</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Left Note */}
            <div className="absolute bottom-6 left-6 z-10 hidden sm:block bg-[#FAF8F5]/90 backdrop-blur-md p-4 rounded-sm border border-[#E0D9CB] max-w-sm shadow-lg">
              <span className="font-script-editorial text-2xl text-[#8C6D32] block">
                Refined Heritage & Quiet Luxury
              </span>
              <p className="text-xs text-[#524C43] leading-relaxed mt-1">
                Explore our curated interior compositions. Click any marker to view dimensions, local UAE craftsmanship details, and order directly.
              </p>
            </div>
          </div>
        </div>

        {/* Feature List Below Image */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {MOODBOARD_HOTSPOTS.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveSpot(item);
                onQuickViewById(item.productId);
              }}
              className="bg-[#FAF8F5] p-3.5 rounded-sm border border-[#E2DBD0] hover:border-[#8C6D32] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] text-[#8C6D32] uppercase tracking-wider font-semibold block mb-1">
                  {item.origin}
                </span>
                <h5 className="font-serif-luxury text-base text-[#1C1A17] group-hover:text-[#8C6D32] transition-colors leading-tight">
                  {item.title}
                </h5>
              </div>
              <div className="mt-3 pt-2 border-t border-[#EFEBE1] flex items-center justify-between text-xs">
                <span className="font-heading-cinzel font-semibold text-[#1C1A17]">{item.price}</span>
                <span className="text-[11px] text-[#8C6D32] group-hover:underline flex items-center gap-0.5">
                  Explore <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
