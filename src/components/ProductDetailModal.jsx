import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  ShoppingBag, 
  ShieldCheck, 
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-[#FAF8F5] w-full max-w-3xl rounded-sm shadow-2xl border border-[#D5CEBE] overflow-hidden relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 text-[#6B655D] hover:text-[#1C1A17] hover:bg-[#EDE8DE] rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Image */}
          <div className="bg-[#EDE8DE] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E0D9CB]">
            <div>
              <div className="aspect-[4/5] rounded-sm overflow-hidden bg-white/40 border border-[#D8D1C2] mb-3">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`w-14 h-14 rounded-sm overflow-hidden border-2 cursor-pointer ${
                    activeImage === product.image ? 'border-[#8C6D32]' : 'border-[#D5CEBE] opacity-70'
                  }`}
                >
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </button>
                {product.secondaryImage && (
                  <button
                    onClick={() => setActiveImage(product.secondaryImage)}
                    className={`w-14 h-14 rounded-sm overflow-hidden border-2 cursor-pointer ${
                      activeImage === product.secondaryImage ? 'border-[#8C6D32]' : 'border-[#D5CEBE] opacity-70'
                    }`}
                  >
                    <img src={product.secondaryImage} alt="" className="w-full h-full object-cover" />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 text-[11px] text-[#6B655D] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D32]" />
              <span>Insured White Glove UAE Delivery Included</span>
            </div>
          </div>

          {/* Right: Clean Specifications & Ordering */}
          <div className="p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-3">
              
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C6D32] font-semibold block mb-1">
                  {product.originLabel}
                </span>

                <h3 className="font-serif-luxury text-2xl text-[#1C1A17] font-normal leading-tight">
                  {product.name}
                </h3>

                <p className="font-arabic-heritage text-sm text-[#7D7567]">
                  {product.arabicName}
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-heading-cinzel text-2xl font-bold text-[#1C1A17]">
                    {formatPrice(product.priceAED)}
                  </span>
                  <span className="text-[11px] text-[#25D366] font-medium">In Stock</span>
                </div>
              </div>

              <p className="text-xs text-[#5A544A] leading-relaxed">
                {product.description}
              </p>

              {/* Minimal Specs */}
              <div className="pt-2 border-t border-[#E8E2D4] space-y-1.5 text-xs text-[#6B655D]">
                <div className="flex justify-between py-0.5">
                  <span>Materials:</span>
                  <span className="text-[#1C1A17] font-medium text-right">{product.materials}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Dimensions:</span>
                  <span className="text-[#1C1A17] font-medium">{product.dimensions}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Weight:</span>
                  <span className="text-[#1C1A17] font-medium">{product.weight}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Delivery:</span>
                  <span className="text-[#1C1A17] font-medium">{product.leadTime}</span>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-[#E8E2D4] space-y-2">
              <button
                onClick={() => onApplePay(product)}
                className="w-full bg-black hover:bg-[#1A1A1A] text-white py-3 px-4 rounded-sm flex items-center justify-center gap-2 cursor-pointer font-semibold text-xs shadow-md"
              >
                <span>Buy with</span>
                <span className="text-lg leading-none font-bold">Pay</span>
              </button>

              <button
                onClick={() => onWhatsAppOrder(product)}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-4 rounded-sm flex items-center justify-center gap-2 cursor-pointer font-semibold text-xs uppercase tracking-wider shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </button>

              <button
                onClick={handleAdd}
                className="w-full border border-[#D5CEBE] hover:bg-[#1C1A17] hover:text-white text-[#1C1A17] py-2 px-4 rounded-sm flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider transition-colors"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
