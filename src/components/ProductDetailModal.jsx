import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  MessageCircle, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Hammer, 
  Clock, 
  Maximize2,
  Check
} from 'lucide-react';

export default function ProductDetailModal({ 
  product, 
  onClose, 
  formatPrice, 
  onApplePay, 
  onWhatsAppOrder, 
  onAddToCart 
}) {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-[#FAF8F5] w-full max-w-4xl rounded-sm shadow-2xl border border-[#D5CEBE] overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#6B655D] hover:text-[#1C1A17] hover:bg-[#EDE8DE] rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Visual Gallery */}
          <div className="md:col-span-6 bg-[#EDE8DE] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E0D9CB]">
            <div>
              {/* Main Image Display */}
              <div className="aspect-[4/5] rounded-sm overflow-hidden bg-white/40 border border-[#D8D1C2] relative shadow-sm mb-4">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Origin Badge */}
                <div className="absolute top-3 left-3">
                  {product.isHandmadeUAE ? (
                    <span className="bg-[#FAF8F5]/95 text-[#785B22] border border-[#D5C29F] text-[10px] uppercase tracking-[0.16em] px-3 py-1 rounded-sm shadow-sm font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D32]"></span>
                      Handmade in UAE 🇦🇪
                    </span>
                  ) : (
                    <span className="bg-[#1C1A17]/85 text-[#FAF8F5] text-[10px] uppercase tracking-[0.16em] px-3 py-1 rounded-sm shadow-sm font-medium">
                      {product.originLabel}
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails Switcher */}
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`w-16 h-16 rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === product.image ? 'border-[#8C6D32] scale-105' : 'border-[#D5CEBE] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={product.image} alt="Primary view" className="w-full h-full object-cover" />
                </button>
                {product.secondaryImage && (
                  <button
                    onClick={() => setActiveImage(product.secondaryImage)}
                    className={`w-16 h-16 rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === product.secondaryImage ? 'border-[#8C6D32] scale-105' : 'border-[#D5CEBE] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={product.secondaryImage} alt="Secondary atelier view" className="w-full h-full object-cover" />
                  </button>
                )}
              </div>
            </div>

            {/* Authenticity Guarantee Note */}
            <div className="mt-6 pt-4 border-t border-[#D5CEBE] text-xs text-[#6B655D] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8C6D32] shrink-0" />
              <span>Includes Certificate of Provenance & White Glove Delivery</span>
            </div>
          </div>

          {/* Right Column: Piece Story, Specifications & Ordering Options */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Header Details */}
              <div>
                <div className="flex items-center justify-between text-xs text-[#8C8476] mb-1">
                  <span className="uppercase tracking-widest">{product.category}</span>
                  <span className="font-mono">{product.sku}</span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1C1A17] font-normal leading-tight">
                  {product.name}
                </h3>

                <p className="font-arabic-heritage text-lg text-[#8C6D32] mt-0.5">
                  {product.arabicName}
                </p>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-heading-cinzel text-2xl font-bold text-[#1C1A17]">
                    {formatPrice(product.priceAED)}
                  </span>
                  <span className="text-xs text-[#25D366] font-medium bg-[#25D366]/10 px-2 py-0.5 rounded">
                    Ready for Delivery
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5A544A] leading-relaxed">
                {product.description}
              </p>

              {/* Emirati Identity Highlight (if UAE) */}
              {product.isHandmadeUAE && (
                <div className="bg-[#F2ECE1] p-3.5 rounded-sm border border-[#DDCFB7] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#785B22]">
                    <span>🇦🇪</span>
                    <span>Emirati Craftsmanship & Provenance</span>
                  </div>
                  <p className="text-[11px] text-[#5A544A] leading-snug">
                    {product.emiratiIdentityHighlight}
                  </p>
                </div>
              )}

              {/* Specifications Table */}
              <div className="pt-2 border-t border-[#E8E2D4] space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#F0EBE0]">
                  <span className="text-[#8C8476]">Materials</span>
                  <span className="text-[#1C1A17] font-medium text-right max-w-[220px]">{product.materials}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0EBE0]">
                  <span className="text-[#8C8476]">Dimensions</span>
                  <span className="text-[#1C1A17] font-medium">{product.dimensions}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0EBE0]">
                  <span className="text-[#8C8476]">Weight</span>
                  <span className="text-[#1C1A17] font-medium">{product.weight}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0EBE0]">
                  <span className="text-[#8C8476]">Edition</span>
                  <span className="text-[#1C1A17] font-medium">{product.edition}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8C8476]">Workshop Origin</span>
                  <span className="text-[#1C1A17] font-medium text-right max-w-[200px]">{product.workshop}</span>
                </div>
              </div>

            </div>

            {/* Interactive Ordering CTAs */}
            <div className="mt-8 pt-4 border-t border-[#E8E2D4] space-y-2.5">
              
              {/* Primary Apple Pay Button */}
              <button
                onClick={() => onApplePay(product)}
                className="w-full bg-black hover:bg-[#1A1A1A] text-white py-3.5 px-4 rounded-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20 group"
              >
                <span className="font-semibold text-sm">Buy with</span>
                <span className="text-xl font-bold leading-none -mt-0.5">Pay</span>
              </button>

              {/* Secondary WhatsApp Ordering Button */}
              <button
                onClick={() => onWhatsAppOrder(product)}
                className="w-full bg-[#FAF8F5] hover:bg-[#25D366] text-[#1C1A17] hover:text-white border border-[#25D366] py-3 px-4 rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer font-medium text-xs uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                <span>Order Direct via WhatsApp</span>
              </button>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                className="w-full bg-[#1C1A17] hover:bg-[#8C6D32] text-white py-3 px-4 rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer text-xs uppercase tracking-wider font-medium"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-[#25D366]" />
                    <span>Added to Your Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <span className="text-[10px] text-[#8C8476]">
                  UAE White Glove Delivery & Unpacking Included • 100% Insured
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
