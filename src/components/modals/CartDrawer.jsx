import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Truck
} from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  formatPrice, 
  onApplePayCheckout,
  onWhatsAppCheckout 
}) {
  if (!isOpen) return null;

  const subtotalAED = cartItems.reduce((acc, item) => acc + (item.priceAED * item.quantity), 0);
  const freeThreshold = 1500;
  const progressPercent = Math.min(100, Math.round((subtotalAED / freeThreshold) * 100));
  const amountRemaining = Math.max(0, freeThreshold - subtotalAED);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#EAE8E4] relative animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EAE8E4] flex items-center justify-between bg-[#FAFAF9]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#141414] stroke-[1.5]" />
            <h3 className="text-sm uppercase tracking-[0.18em] font-semibold text-[#141414]">
              Shopping Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-200/60 rounded-full transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator (Forma Object style) */}
        <div className="bg-[#F6F5F2] px-5 py-3 border-b border-[#EAE8E4]">
          <div className="flex justify-between items-center text-[11px] mb-1.5">
            <span className="text-[#141414] font-medium flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-neutral-700" />
              {amountRemaining === 0 
                ? 'You have qualified for Complimentary UAE White Glove Delivery!'
                : `Add ${formatPrice(amountRemaining)} more for Free White Glove Delivery`}
            </span>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div 
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-[#141414] transition-all duration-500 rounded-full"
            />
          </div>
        </div>

        {/* Drawer Body: Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F4F0] flex items-center justify-center mx-auto text-neutral-400">
                <ShoppingBag className="w-7 h-7 stroke-[1.2]" />
              </div>
              <div>
                <h4 className="text-lg font-light text-[#141414]">Your bag is empty</h4>
                <p className="text-xs text-[#736E67] mt-1 font-light">
                  Explore our curated contemporary furniture and minimalist sculptures.
                </p>
              </div>
              <button
                onClick={onClose}
                className="inline-block text-xs uppercase tracking-[0.18em] bg-[#141414] text-white px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer font-medium"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#FAFAF9] p-3.5 rounded-sm border border-[#EAE8E4] flex gap-3.5 relative group"
                >
                  {/* Thumbnail */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-24 object-cover rounded-sm bg-neutral-200 border border-[#EAE8E4]" 
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <span className="text-[9px] text-[#8C7A58] uppercase tracking-[0.16em] font-semibold block">
                            {item.categoryName || 'Furniture'}
                          </span>
                          <h4 className="text-sm font-normal text-[#141414] leading-snug">
                            {item.name}
                          </h4>
                          {item.selectedColor && (
                            <span className="text-[10px] text-neutral-500">
                              Finish: {item.selectedColor}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EAE8E4] mt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#D5CEBE] rounded-full bg-white px-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-0.5 hover:text-black text-neutral-400 cursor-pointer font-medium"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#141414]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:text-black text-neutral-400 cursor-pointer font-medium"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="text-sm font-semibold text-[#141414]">
                        {formatPrice(item.priceAED * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer: Pricing & Express Checkouts */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#EAE8E4] bg-[#FAFAF9] space-y-3">
            
            {/* Subtotal */}
            <div className="space-y-1.5 text-xs text-[#736E67]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#141414] font-medium">{formatPrice(subtotalAED)}</span>
              </div>
              <div className="flex justify-between">
                <span>UAE White Glove Delivery</span>
                <span className={amountRemaining === 0 ? "text-emerald-700 font-semibold" : "text-neutral-500 font-medium"}>
                  {amountRemaining === 0 ? "COMPLIMENTARY" : "AED 150"}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#EAE8E4]">
                <span className="text-sm font-semibold text-[#141414]">Estimated Total</span>
                <span className="text-lg font-bold text-[#141414]">
                  {formatPrice(subtotalAED + (amountRemaining === 0 ? 0 : 150))}
                </span>
              </div>
            </div>

            {/* Apple Pay & UAE COD Checkout Button */}
            <button
              onClick={() => onApplePayCheckout(subtotalAED, 'Apple Pay')}
              className="w-full bg-black hover:bg-neutral-800 text-white py-3.5 px-4 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span className="text-xs font-medium uppercase tracking-wider">Checkout with</span>
              <span className="text-base font-bold leading-none">Pay</span>
              <span className="text-neutral-400">•</span>
              <span className="text-xs font-medium uppercase tracking-wider">UAE COD</span>
            </button>

            {/* WhatsApp Direct Order Button */}
            <button
              onClick={onWhatsAppCheckout}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-medium cursor-pointer shadow-2xs transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Checkout Order via WhatsApp</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
              <span>Direct fulfillment coordination with HUJRAH Studio</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
