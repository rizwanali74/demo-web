import React, { useState } from 'react';
import { Eye, ArrowUpRight, Sparkles } from 'lucide-react';

export const MOODBOARD_HOTSPOTS = [
  {
    id: 'spot-1',
    productId: 'huj-01',
    title: 'Dune Modular Bouclé Sofa',
    price: 'AED 14,500',
    origin: 'Bespoke UAE Workshop',
    x: 48,
    y: 65
  },
  {
    id: 'spot-2',
    productId: 'huj-03',
    title: 'Roma Honed Travertine Table',
    price: 'AED 7,200',
    origin: 'Natural Roman Stone',
    x: 28,
    y: 75
  },
  {
    id: 'spot-3',
    productId: 'huj-06',
    title: 'Alabaster Dome Lamp',
    price: 'AED 2,450',
    origin: 'Turned Spanish Alabaster',
    x: 78,
    y: 42
  }
];

export default function SpacesInteractive({ onQuickViewById, formatPrice, onApplePayById }) {
  const [activeSpot, setActiveSpot] = useState(MOODBOARD_HOTSPOTS[0]);

  return (
    <section id="spaces" className="py-16 md:py-24 bg-white border-b border-[#EAE8E4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-neutral-400 font-semibold">
                Spaces In Situ // مساحات ملهمة
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl text-[#141414] font-light tracking-[-0.01em]">
              The Living Room Moodboard
            </h2>
          </div>

          <p className="text-xs text-[#736E67] font-light">
            Interactive Lookbook: Click any room pin to inspect specifications or add to bag.
          </p>
        </div>

        {/* Interactive Living Scene Canvas */}
        <div className="relative rounded-sm overflow-hidden shadow-sm border border-[#EAE8E4] bg-[#F5F4F0]">
          <div className="relative aspect-[16/9] w-full min-h-[380px] max-h-[620px]">
            <img 
              src="/images/living_scene.jpg" 
              alt="HUJRAH Curated Minimalist Living Room with Boucle Sofa and Travertine" 
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
                    className="relative p-2 cursor-pointer focus:outline-none"
                    aria-label={`View ${spot.title}`}
                  >
                    <span className="absolute inset-0 rounded-full bg-black/30 animate-ping"></span>
                    <span className={`relative w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all shadow-md ${
                      isSelected 
                        ? 'bg-[#141414] text-white scale-110' 
                        : 'bg-white text-[#141414] hover:bg-black hover:text-white'
                    }`}>
                      +
                    </span>
                  </button>

                  {/* Popover */}
                  {isSelected && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-64 bg-white/95 backdrop-blur-md p-4 rounded-sm shadow-xl border border-[#EAE8E4] z-30 animate-fadeIn text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C7A58] font-semibold">
                          {spot.origin}
                        </span>
                        <span className="text-xs font-semibold text-[#141414]">
                          {spot.price}
                        </span>
                      </div>

                      <h4 className="text-sm font-medium text-[#141414] leading-snug mb-3">
                        {spot.title}
                      </h4>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#F0EFEA]">
                        <button
                          onClick={() => onQuickViewById(spot.productId)}
                          className="flex-1 bg-[#141414] hover:bg-neutral-800 text-white text-[10px] uppercase tracking-wider py-2 rounded-full text-center font-medium cursor-pointer transition-colors"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => onApplePayById(spot.productId)}
                          className="bg-black hover:bg-neutral-800 text-white text-[10px] font-semibold py-2 px-3.5 rounded-full cursor-pointer transition-colors"
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

      </div>
    </section>
  );
}
