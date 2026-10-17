import React, { useState } from 'react';
import { MOODBOARD_HOTSPOTS } from '../data/products';
import { Eye, ArrowUpRight } from 'lucide-react';

export default function SpacesInteractive({ onQuickViewById, formatPrice, onApplePayById }) {
  const [activeSpot, setActiveSpot] = useState(MOODBOARD_HOTSPOTS[0]);

  return (
    <section id="spaces" className="py-16 md:py-20 bg-[#F3EFE6] border-b border-[#E2DBD0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C8476] font-semibold block mb-1">
              Spaces In Situ // مساحات ملهمة
            </span>
            <h2 className="font-heading-cinzel text-2xl sm:text-4xl text-[#1C1A17] font-normal tracking-[0.04em]">
              Quiet Luxury
            </h2>
          </div>

          <p className="text-xs text-[#6B655D]">
            Click any pin on the room to explore specifications or order directly.
          </p>
        </div>

        {/* Interactive Living Scene Canvas */}
        <div className="relative rounded-sm overflow-hidden shadow-lg border border-[#D5CEBE] bg-[#E8E2D4]">
          <div className="relative aspect-[16/9] w-full min-h-[380px] max-h-[620px]">
            <img 
              src="/images/living_scene.jpg" 
              alt="Living room showcasing Murmure Olive Velvet Sofa and Sarab Lamp" 
              className="w-full h-full object-cover object-center"
            />

            {/* Interactive Pins */}
            {MOODBOARD_HOTSPOTS.map((spot) => {
              const isSelected = activeSpot?.id === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  {/* Pin Button */}
                  <button
                    onClick={() => setActiveSpot(spot)}
                    onMouseEnter={() => setActiveSpot(spot)}
                    className="relative p-2 cursor-pointer focus:outline-none"
                    aria-label={`View ${spot.title}`}
                  >
                    <span className="absolute inset-0 rounded-full bg-[#B89758] animate-ping opacity-60"></span>
                    <span className={`relative w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                      isSelected 
                        ? 'bg-[#1C1A17] text-white scale-110' 
                        : 'bg-white/95 text-[#1C1A17] hover:bg-[#8C6D32] hover:text-white'
                    }`}>
                      +
                    </span>
                  </button>

                  {/* Popover */}
                  {isSelected && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-60 sm:w-64 bg-[#FAF8F5]/95 backdrop-blur-md p-3.5 rounded-sm shadow-xl border border-[#DCD5C5] z-30 animate-fadeIn text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C6D32] font-semibold">
                          {spot.origin}
                        </span>
                        <span className="font-heading-cinzel text-xs font-bold text-[#1C1A17]">
                          {spot.price}
                        </span>
                      </div>

                      <h4 className="font-serif-luxury text-base text-[#1C1A17] leading-tight mb-2">
                        {spot.title}
                      </h4>

                      <div className="flex items-center gap-2 pt-1 border-t border-[#EAE4D6]">
                        <button
                          onClick={() => onQuickViewById(spot.productId)}
                          className="flex-1 bg-[#1C1A17] hover:bg-[#8C6D32] text-white text-[10px] uppercase tracking-wider py-1.5 rounded-sm text-center font-medium cursor-pointer"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => onApplePayById(spot.productId)}
                          className="bg-black hover:bg-[#222] text-white text-[10px] font-semibold py-1.5 px-3 rounded-sm cursor-pointer"
                        >
                          Pay
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Items Below */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {MOODBOARD_HOTSPOTS.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveSpot(item);
                onQuickViewById(item.productId);
              }}
              className="bg-[#FAF8F5] p-3 rounded-sm border border-[#E2DBD0] hover:border-[#8C6D32] transition-all cursor-pointer group flex justify-between items-center"
            >
              <div>
                <span className="text-[9px] text-[#8C6D32] uppercase tracking-wider font-semibold block">
                  {item.origin}
                </span>
                <h5 className="font-serif-luxury text-sm text-[#1C1A17] group-hover:text-[#8C6D32] truncate max-w-[140px]">
                  {item.title}
                </h5>
                <span className="font-heading-cinzel text-xs font-semibold text-[#1C1A17] block mt-0.5">
                  {item.price}
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8C6D32] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
