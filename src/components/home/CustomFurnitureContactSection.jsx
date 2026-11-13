import React from 'react';

export default function CustomFurnitureContactSection({ onOpenWhatsAppConcierge }) {
  return (
    <section id="contact-custom" className="bg-white border-t border-[#EAE8E4] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
        
        {/* Left Side: Editorial Typography & Underlined Contact Link */}
        <div className="flex flex-col justify-center items-center text-center p-8 sm:p-14 lg:p-20 bg-white">
          <div className="max-w-lg space-y-8">
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-normal text-[#141414] leading-[1.4] tracking-[-0.01em]">
              Crafted Just For You. We Create Custom Furniture Tailored To Your Style, Space, And Needs. From Elegant Designs To Functional Pieces, Every Item Is Handcrafted With Precision And High-Quality Materials. Bring Your Vision To Life With Furniture That's Truly One Of A Kind!
            </h2>

            <div>
              <button
                onClick={onOpenWhatsAppConcierge}
                className="inline-block text-xs uppercase tracking-[0.22em] font-medium text-[#141414] border-b border-[#141414] pb-1 hover:opacity-60 transition-opacity cursor-pointer"
              >
                CONTACT US
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Studio Photo matching Forma Object */}
        <div className="relative h-[360px] sm:h-[460px] lg:h-full w-full bg-[#EAE6DF] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=80" 
            alt="Custom furniture craftsman and designer sketches with modular sofa" 
            className="w-full h-full object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
}

