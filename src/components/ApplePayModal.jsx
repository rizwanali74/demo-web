import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  MapPin, 
  Smartphone, 
  MessageCircle,
  Truck,
  Sparkles
} from 'lucide-react';

export default function ApplePayModal({ 
  orderItem, 
  cartItems, 
  totalAED, 
  formatPrice, 
  onClose,
  onOrderSuccess 
}) {
  const [step, setStep] = useState('review'); // 'review' | 'processing' | 'success'
  const [selectedAddress, setSelectedAddress] = useState('Palm Jumeirah, Villa Frond M, Dubai, UAE');
  const [customerPhone, setCustomerPhone] = useState('+971 50 491 8820');
  const [customerName, setCustomerName] = useState('Sheikh Rashid Al Maktoum');
  const [orderId, setOrderId] = useState(`ATH-${Math.floor(1000 + Math.random() * 9000)}-DXB`);

  const displayTotal = totalAED || (orderItem ? orderItem.priceAED : 0);
  const itemsList = orderItem ? [orderItem] : (cartItems || []);

  const handleSimulatePayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      if (onOrderSuccess) {
        onOrderSuccess({
          orderId,
          totalAED: displayTotal,
          items: itemsList,
          address: selectedAddress,
          phone: customerPhone,
          name: customerName,
          paymentMethod: 'Apple Pay'
        });
      }
    }, 1800);
  };

  const handleSendWhatsAppNotification = () => {
    const text = `*NEW ORDER CONFIRMED [Apple Pay]*\nOrder Ref: #${orderId}\nTotal: AED ${displayTotal.toLocaleString()}\nClient: ${customerName}\nPhone: ${customerPhone}\nDelivery City: ${selectedAddress}\n\n*Items Ordered:*\n${itemsList.map(i => `- ${i.name} (${formatPrice(i.priceAED)})`).join('\n')}\n\nPlease confirm dispatch for UAE White Glove Delivery.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/971508821971?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div 
        className="bg-[#1C1C1E] text-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl border border-white/10 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Apple Pay Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#2C2C2E]">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight">Pay</span>
            <span className="text-xs text-[#8E8E93] ml-1">Express Checkout</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#8E8E93] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cancel Apple Pay"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: REVIEW & AUTHORIZE */}
        {step === 'review' && (
          <div className="p-6 space-y-5">
            {/* Payment Card Simulation */}
            <div className="bg-[#2C2C2E] p-4 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 bg-gradient-to-r from-[#B89758] to-[#DFC486] rounded-md flex items-center justify-center text-black font-bold text-[10px]">
                  CARD
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Emirates NBD Infinite •••• 8842</div>
                  <div className="text-[11px] text-[#8E8E93]">Billing: Default UAE Address</div>
                </div>
              </div>
              <span className="text-xs text-[#0A84FF]">Edit</span>
            </div>

            {/* Delivery Address */}
            <div className="bg-[#2C2C2E] p-4 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#8E8E93]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>White Glove Delivery Address</span>
                </span>
                <span className="text-[#30D158] text-[11px] font-medium">Free UAE Delivery</span>
              </div>

              <select
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="w-full bg-[#1C1C1E] border border-white/10 text-xs text-white p-2.5 rounded-lg focus:outline-none focus:border-[#B89758]"
              >
                <option value="Palm Jumeirah, Villa Frond M, Dubai, UAE">Palm Jumeirah, Frond M, Dubai</option>
                <option value="Saadiyat Cultural District, Abu Dhabi, UAE">Saadiyat Cultural District, Abu Dhabi</option>
                <option value="Downtown Dubai, Boulevard Crescent, Dubai, UAE">Downtown Dubai, Opera District</option>
                <option value="Al Barari, Jasmine Leaf Villa, Dubai, UAE">Al Barari Residences, Dubai</option>
                <option value="Al Heerah Suburb, Sharjah, UAE">Al Heerah Coastal Villa, Sharjah</option>
                <option value="Emirates Hills, Sector E, Dubai, UAE">Emirates Hills, Dubai</option>
              </select>
            </div>

            {/* Itemized Overview */}
            <div className="border-t border-b border-white/10 py-3 space-y-2 text-xs">
              <div className="text-[#8E8E93] text-[11px] uppercase tracking-wider">
                Order Items ({itemsList.length})
              </div>
              {itemsList.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-white">
                  <span className="truncate max-w-[280px]">{item.name}</span>
                  <span className="font-mono text-[#D8D2C5]">{formatPrice(item.priceAED)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-[#30D158] pt-1">
                <span>Insured White Glove UAE Delivery</span>
                <span>COMPLIMENTARY</span>
              </div>
            </div>

            {/* Total Amount in AED */}
            <div className="flex justify-between items-baseline pt-1">
              <div>
                <span className="text-xs text-[#8E8E93] block">TOTAL PAYABLE</span>
                <span className="text-[10px] text-[#B89758]">Processed directly in UAE Dirhams</span>
              </div>
              <span className="text-2xl font-bold font-mono tracking-tight text-white">
                {formatPrice(displayTotal)}
              </span>
            </div>

            {/* Double Click / Touch ID Simulation Trigger */}
            <div className="pt-2">
              <button
                onClick={handleSimulatePayment}
                className="w-full bg-white text-black hover:bg-[#E5E5EA] py-4 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-[0.98] font-semibold text-sm cursor-pointer shadow-xl"
              >
                <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                  <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
                </div>
                <span>Double Click or Tap to Pay with Face ID</span>
              </button>
              <p className="text-center text-[10px] text-[#8E8E93] mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#30D158]" />
                <span>Protected by Apple Pay Cryptographic Security & UAE Payment Gateway</span>
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: PROCESSING / BIOMETRIC PULSE */}
        {step === 'processing' && (
          <div className="py-20 px-6 text-center space-y-5">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-[#30D158]/20 animate-ping"></div>
              <div className="relative w-20 h-20 rounded-full border-4 border-[#30D158] flex items-center justify-center bg-[#2C2C2E]">
                <Sparkles className="w-8 h-8 text-[#30D158] animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Verifying Biometric Token...</h3>
              <p className="text-xs text-[#8E8E93] mt-1">Transmitting order directly to AL-ATHAR Concierge</p>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS & ORDER CONFIRMATION */}
        {step === 'success' && (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#30D158]/20 border border-[#30D158] text-[#30D158] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-[#B89758] tracking-widest uppercase">
                Payment Authorized
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Order Confirmed // تم تأكيد الطلب
              </h3>
              <p className="text-xs text-[#AEAEB2] max-w-sm mx-auto">
                Thank you. Your order has been placed successfully and dispatched to our delivery coordinator.
              </p>
            </div>

            {/* Order Receipt Box */}
            <div className="bg-[#2C2C2E] p-4 rounded-xl border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[#8E8E93]">Order Reference</span>
                <span className="font-mono font-bold text-white">#{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[#8E8E93]">Amount Paid</span>
                <span className="font-mono text-[#30D158] font-semibold">{formatPrice(displayTotal)}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[#8E8E93]">Delivery Location</span>
                <span className="text-right text-white max-w-[200px] truncate">{selectedAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8E93]">Estimated Delivery</span>
                <span className="text-white font-medium">Within 48 Hours (White Glove)</span>
              </div>
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleSendWhatsAppNotification}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Notify Concierge on WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full bg-transparent hover:bg-white/10 text-[#8E8E93] hover:text-white py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Return to Gallery
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
