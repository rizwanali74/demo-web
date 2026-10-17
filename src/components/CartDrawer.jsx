import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Truck,
  Sparkles
} from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  formatPrice, 
  onApplePayCheckout,
  onWhatsAppCheckout,
  onClearCart 
}) {
  if (!isOpen) return null;

  const subtotalAED = cartItems.reduce((acc, item) => acc + (item.priceAED * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#D5CEBE] relative animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E8E2D4] flex items-center justify-between bg-[#F3EFE6]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#1C1A17]" />
            <h3 className="font-heading-cinzel text-base uppercase tracking-wider font-semibold text-[#1C1A17]">
              Shopping Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B655D] hover:text-[#1C1A17] hover:bg-[#EAE4D6] rounded-full transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EDE8DE] flex items-center justify-center mx-auto text-[#8C8476]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-xl text-[#1C1A17]">Your bag is empty</h4>
                <p className="text-xs text-[#8C8476] mt-1">
                  Discover our handcrafted Emirati pieces & rare global imports.
                </p>
              </div>
              <button
                onClick={onClose}
                className="inline-block text-xs uppercase tracking-widest bg-[#1C1A17] text-white px-5 py-2.5 rounded-sm hover:bg-[#8C6D32] transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white p-3.5 rounded-sm border border-[#E0D9CB] flex gap-3.5 relative group"
                >
                  {/* Thumbnail */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-24 object-cover rounded-sm bg-[#EDE8DE] border border-[#EAE4D6]" 
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <span className="text-[10px] text-[#8C6D32] uppercase tracking-wider font-semibold block">
                            {item.originLabel}
                          </span>
                          <h4 className="font-serif-luxury text-base text-[#1C1A17] leading-tight">
                            {item.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#A39B8E] hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-arabic-heritage text-xs text-[#7D7567] mt-0.5">
                        {item.arabicName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE1]">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#DDD6C8] rounded-sm bg-[#FAF8F5]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-[#EDE8DE] text-[#6B655D]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-[#1C1A17]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#EDE8DE] text-[#6B655D]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-heading-cinzel text-sm font-semibold text-[#1C1A17]">
                        {formatPrice(item.priceAED * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* White Glove Delivery Notice */}
              <div className="bg-[#F2ECE1] p-3 rounded-sm border border-[#DDCFB7] flex items-center gap-2.5 text-xs text-[#6B655D]">
                <Truck className="w-4 h-4 text-[#8C6D32] shrink-0" />
                <span>
                  <strong className="text-[#1C1A17]">White Glove UAE Delivery:</strong> Free of charge. Room placement & packaging removal included.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer: Pricing & Express Checkouts */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#E8E2D4] bg-[#F3EFE6] space-y-3">
            
            {/* Subtotal */}
            <div className="space-y-1.5 text-xs text-[#6B655D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#1C1A17] font-medium">{formatPrice(subtotalAED)}</span>
              </div>
              <div className="flex justify-between">
                <span>White Glove Delivery (All UAE)</span>
                <span className="text-[#25D366] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#E0D9CB]">
                <span className="font-heading-cinzel text-sm font-bold text-[#1C1A17]">Estimated Total</span>
                <span className="font-heading-cinzel text-xl font-bold text-[#1C1A17]">
                  {formatPrice(subtotalAED)}
                </span>
              </div>
            </div>

            {/* Apple Pay Button */}
            <button
              onClick={() => onApplePayCheckout(subtotalAED)}
              className="w-full bg-black hover:bg-[#1A1A1A] text-white py-3.5 px-4 rounded-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer border border-white/20"
            >
              <span className="text-xs font-semibold uppercase tracking-wider">Pay with</span>
              <span className="text-lg font-bold leading-none -mt-0.5">Pay</span>
            </button>

            {/* WhatsApp Direct Order Button */}
            <button
              onClick={onWhatsAppCheckout}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold cursor-pointer shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Order to Client via WhatsApp</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C8476] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D32]" />
              <span>Direct order dispatch to founder • White glove coordination</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
