import React, { useState } from 'react';
import {
  ArrowLeft,
  CreditCard,
  Lock,
  MapPin,
  Smartphone,
  Truck
} from 'lucide-react';
import {
  ThemeApplePayIcon,
  ThemeCardPosIcon,
  ThemeOrderConfirmedIcon,
  ThemeShieldIcon,
  ThemeUAECashIcon
} from '../components/common/ThemeIcons';

const EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Al Ain',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain'
];

const PAYMENT_METHODS = [
  {
    id: 'Apple Pay',
    label: 'Apple Pay',
    badge: 'Pay',
    description: 'Instant Touch ID / Face ID checkout'
  },
  {
    id: 'Cash on Delivery (UAE)',
    label: 'Cash on Delivery (COD)',
    badge: 'COD UAE',
    description: 'Pay in cash upon White Glove delivery anywhere in the UAE'
  },
  {
    id: 'Card on Delivery (UAE)',
    label: 'Card on Delivery (POS)',
    badge: 'POS UAE',
    description: 'Pay via wireless card machine upon room placement'
  },
  {
    id: 'Credit / Debit Card',
    label: 'Credit or Debit Card',
    badge: 'Visa / MC',
    description: 'Encrypted UAE & international card processing'
  }
];

export default function CheckoutPage({
  items = [],
  initialPaymentMethod = 'Apple Pay',
  freeDeliveryThresholdAED = 1500,
  formatPrice,
  onBack,
  onTrackOrder,
  onCompleteOrder
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Dubai');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const subtotalAED = items.reduce((sum, item) => sum + item.priceAED * (item.quantity || 1), 0);
  const deliveryFeeAED = subtotalAED >= freeDeliveryThresholdAED || subtotalAED === 0 ? 0 : 150;
  const totalAED = subtotalAED + deliveryFeeAED;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `HUJ-${Math.floor(1000 + Math.random() * 9000)}-UAE`;
      const payload = {
        orderId,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        city,
        address: `${address.trim()}, ${city}, UAE`,
        notes: notes.trim(),
        paymentMethod,
        totalAED,
        items
      };
      onCompleteOrder(payload);
      setConfirmedOrder(payload);
      setIsProcessing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 650);
  };

  if (confirmedOrder) {
    return (
      <div className="bg-[#FAFAF9] min-h-[70vh] py-14 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#EAE8E4] rounded-sm p-8 sm:p-10 text-center space-y-5 shadow-2xs">
            <ThemeOrderConfirmedIcon className="w-16 h-16 mx-auto" />

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C7A58] font-semibold block">
                HUJRAH // حجره Order Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-light text-[#141414]">
                Thank you, {confirmedOrder.name}
              </h1>
              <p className="text-xs text-neutral-500 font-light">
                Order Reference: <span className="font-mono font-semibold text-[#141414]">#{confirmedOrder.orderId}</span>
              </p>
            </div>

            <div className="bg-[#FAFAF9] border border-[#EAE8E4] rounded-sm p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment Method</span>
                <span className="font-medium text-[#141414]">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Address</span>
                <span className="font-medium text-[#141414] text-right">{confirmedOrder.address}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EAE8E4]">
                <span className="font-semibold text-[#141414]">Total Paid</span>
                <span className="font-semibold text-[#141414]">{formatPrice(confirmedOrder.totalAED)}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              Your Tracking ID (<strong>{confirmedOrder.orderId}</strong>) has been sent to your email. Our White Glove concierge team will contact you on <strong>{confirmedOrder.phone}</strong> to schedule your delivery window.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {onTrackOrder && (
                <button
                  onClick={() => onTrackOrder(confirmedOrder.orderId)}
                  className="w-full sm:w-auto border border-[#141414] text-[#141414] hover:bg-[#FAFAF9] px-7 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium cursor-pointer transition-colors"
                >
                  Track This Order
                </button>
              )}
              <button
                onClick={onBack}
                className="w-full sm:w-auto bg-[#141414] hover:bg-neutral-800 text-white px-8 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium cursor-pointer transition-colors"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF9] min-h-[70vh] py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500 hover:text-black transition-colors cursor-pointer mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Storefront</span>
        </button>

        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C7A58] font-semibold block mb-1.5">
            Express Checkout
          </span>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#141414]">
            Delivery Details & Payment
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white border border-[#EAE8E4] rounded-sm p-10 text-center space-y-4">
            <p className="text-sm text-neutral-500 font-light">Your checkout bag is currently empty.</p>
            <button
              onClick={onBack}
              className="bg-[#141414] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider cursor-pointer"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Customer Information & Payment Method */}
            <div className="lg:col-span-7 space-y-6">
              {/* Contact & Delivery Form */}
              <div className="bg-white border border-[#EAE8E4] rounded-sm p-5 sm:p-7 space-y-4 text-xs">
                <div className="flex items-center gap-2 border-b border-[#F0EEE9] pb-3">
                  <MapPin className="w-4 h-4 text-[#141414]" />
                  <h2 className="text-sm font-medium text-[#141414]">Client & Delivery Information</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tariq Al Mansoori"
                      className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                      Emirate / City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black cursor-pointer"
                    >
                      {EMIRATES.map(em => (
                        <option key={em} value={em}>{em}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                    Street, Villa / Building Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Villa 12, Street 4, Jumeirah"
                    className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                    Delivery / Gate Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Preferred delivery window, security gate instructions..."
                    className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2 rounded-xs focus:outline-none focus:border-black resize-none"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white border border-[#EAE8E4] rounded-sm p-5 sm:p-7 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-[#F0EEE9] pb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#141414]" />
                    <h2 className="text-sm font-medium text-[#141414]">Payment Method</h2>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400">
                    <Lock className="w-3 h-3" />
                    <span>Encrypted</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map(pm => {
                    const selected = paymentMethod === pm.id;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer ${
                          selected
                            ? 'border-black bg-[#FAFAF9] ring-1 ring-black'
                            : 'border-[#EAE8E4] hover:border-neutral-400 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-medium text-[#141414]">{pm.label}</span>
                          {pm.id === 'Apple Pay' ? (
                            <ThemeApplePayIcon className="h-6 w-14" />
                          ) : pm.id === 'Cash on Delivery (UAE)' ? (
                            <ThemeUAECashIcon className="w-7 h-5" />
                          ) : (
                            <ThemeCardPosIcon className="w-7 h-5" />
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-500 font-light">{pm.description}</p>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-2 bg-black hover:bg-neutral-800 disabled:opacity-60 text-white py-3.5 px-6 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold cursor-pointer transition-colors"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>
                    {isProcessing
                      ? 'Processing Payment...'
                      : `Pay ${formatPrice(totalAED)} with ${paymentMethod}`}
                  </span>
                </button>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 bg-white border border-[#EAE8E4] rounded-sm p-5 sm:p-6 space-y-5 lg:sticky lg:top-24">
              <div className="border-b border-[#F0EEE9] pb-3">
                <h2 className="text-sm font-medium text-[#141414]">
                  Order Summary ({items.reduce((acc, i) => acc + (i.quantity || 1), 0)} {items.length === 1 ? 'piece' : 'pieces'})
                </h2>
              </div>

              <div className="divide-y divide-[#F0EEE9] max-h-80 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="py-3 flex items-center gap-3 text-xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-16 object-cover rounded-xs bg-[#F5F4F0] border border-[#EAE8E4] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#141414] truncate">{item.name}</div>
                      {item.arabicName && (
                        <div dir="rtl" className="font-arabic text-[11px] text-neutral-400 text-left truncate">
                          {item.arabicName}
                        </div>
                      )}
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        Qty: {item.quantity || 1}
                        {item.selectedColor ? ` • ${item.selectedColor}` : ''}
                      </div>
                    </div>
                    <div className="font-semibold text-[#141414] shrink-0">
                      {formatPrice(item.priceAED * (item.quantity || 1))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#EAE8E4] pt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#141414]">{formatPrice(subtotalAED)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-neutral-400" />
                    <span>White Glove UAE Delivery</span>
                  </span>
                  <span className={deliveryFeeAED === 0 ? 'text-emerald-700 font-semibold' : 'font-medium text-[#141414]'}>
                    {deliveryFeeAED === 0 ? 'COMPLIMENTARY' : formatPrice(deliveryFeeAED)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-[#EAE8E4]">
                  <span className="text-sm font-semibold text-[#141414]">Total</span>
                  <span className="text-xl font-semibold text-[#141414]">{formatPrice(totalAED)}</span>
                </div>
              </div>

              <div className="bg-[#FAFAF9] border border-[#EAE8E4] rounded-xs p-3 flex items-start gap-2.5 text-[11px] text-neutral-500">
                <ThemeShieldIcon className="w-5 h-5 shrink-0" />
                <span>5-Year Structural Guarantee & white glove room placement across all UAE Emirates.</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
