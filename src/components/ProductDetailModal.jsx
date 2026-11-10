import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  ShoppingBag, 
  ShieldCheck, 
  Check, 
  Truck
} from 'lucide-react';

export default function ProductDetailModal({ 
  product, 
  onClose, 
  formatPrice, 
  onApplePay, 
  onWhatsAppOrder, 
  onAddToCart 
}) {
  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const currentImage = activeImage || product.image;

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedColor: selectedColor || (product.colors?.[0]?.name)
    }, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-4xl rounded-sm shadow-2xl border border-[#EAE8E4] overflow-hidden relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Gallery */}
          <div className="bg-[#FAF9F6] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EAE8E4]">
            <div>
              <div className="aspect-[4/5] rounded-sm overflow-hidden bg-white border border-[#EAE8E4] mb-3 relative">
                <img 
                  src={currentImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2.5">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`w-16 h-16 rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${
                    currentImage === product.image ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </button>
                {product.secondaryImage && (
                  <button
                    onClick={() => setActiveImage(product.secondaryImage)}
                    className={`w-16 h-16 rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${
                      currentImage === product.secondaryImage ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={product.secondaryImage} alt="" className="w-full h-full object-cover" />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EAE8E4] space-y-2 text-[11px] text-[#736E67]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-700" />
                <span>Complimentary UAE White Glove delivery over 1,500 AED</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-700" />
                <span>Transit insurance & 5-year structural craftsmanship guarantee</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details, Finishes & CTAs */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7A58] font-semibold">
                    {product.categoryName || 'Sculptural Furniture'}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {product.sku}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-2xl text-[#141414] font-light leading-snug">
                    {product.name}
                  </h3>
                  {product.arabicName && (
                    <span className="font-arabic-calligraphy text-base text-[#8C8476]">
                      {product.arabicName}
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="mt-2.5 flex items-baseline gap-2.5">
                  <span className="text-2xl font-semibold text-[#141414]">
                    {formatPrice(product.priceAED)}
                  </span>
                  {product.compareAtPriceAED && (
                    <span className="text-sm text-neutral-400 line-through font-light">
                      {formatPrice(product.compareAtPriceAED)}
                    </span>
                  )}
                  {product.inStock ? (
                    <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium ml-2">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-xs bg-neutral-100 text-neutral-600 border border-neutral-300 px-2.5 py-0.5 rounded-full font-medium ml-2">
                      Made to Order
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed">
                {product.description || product.shortDescription}
              </p>

              {/* Color / Finish Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#736E67] font-medium block mb-2">
                    Select Finish: <span className="text-black font-semibold">{selectedColor || product.colors[0].name}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs cursor-pointer transition-all ${
                          (selectedColor || product.colors[0].name) === c.name 
                            ? 'border-black bg-neutral-50 font-medium' 
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        <span 
                          style={{ backgroundColor: c.hex }} 
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0 inline-block" 
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications Matrix */}
              <div className="pt-3 border-t border-[#EAE8E4] space-y-2 text-xs text-[#736E67]">
                <div className="flex justify-between py-0.5">
                  <span className="text-neutral-500">Materials:</span>
                  <span className="text-[#141414] font-medium text-right max-w-[65%]">{product.materials}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-neutral-500">Dimensions:</span>
                  <span className="text-[#141414] font-medium">{product.dimensions}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-neutral-500">Dispatch:</span>
                  <span className="text-[#141414] font-medium">{product.leadTime}</span>
                </div>
                {product.specs && Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-0.5">
                    <span className="text-neutral-500">{key}:</span>
                    <span className="text-[#141414] font-medium text-right max-w-[65%]">{val}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-[#EAE8E4] space-y-2.5">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#DDD8CF] rounded-full px-3 py-1.5 text-xs text-[#141414]">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-0.5 text-neutral-500 hover:text-black cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-0.5 text-neutral-500 hover:text-black cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-white border border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-white py-3 px-4 rounded-full flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-[0.16em] font-semibold transition-colors"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant Apple Pay Button */}
              <button
                onClick={() => onApplePay(product)}
                className="w-full bg-black hover:bg-neutral-800 text-white py-3 px-4 rounded-full flex items-center justify-center gap-2 cursor-pointer font-medium text-xs shadow-sm transition-all"
              >
                <span>Instant Checkout with</span>
                <span className="text-sm font-semibold">Pay</span>
              </button>

              {/* WhatsApp Direct Order */}
              <button
                onClick={() => onWhatsAppOrder(product)}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-4 rounded-full flex items-center justify-center gap-2 cursor-pointer font-medium text-xs tracking-wider uppercase shadow-2xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire & Order via WhatsApp</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
