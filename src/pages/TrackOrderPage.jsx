import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MessageCircle,
  Package,
  Search,
  Truck,
  AlertCircle,
  MapPin
} from 'lucide-react';

const TRACKING_STEPS = [
  { key: 'Pending', label: 'Order Received', desc: 'Awaiting studio confirmation' },
  { key: 'Confirmed', label: 'Confirmed', desc: 'Order verified by HUJRAH Studio' },
  { key: 'In Production', label: 'In Production', desc: 'Crafted & prepared at our UAE atelier' },
  { key: 'Out for Delivery', label: 'Out for Delivery', desc: 'White Glove team en route' },
  { key: 'Delivered', label: 'Delivered', desc: 'Placed & unboxed in your space' }
];

export default function TrackOrderPage({
  orders = [],
  initialTrackingId = '',
  studioInfo,
  formatPrice,
  onBackToHome
}) {
  const [queryId, setQueryId] = useState(initialTrackingId);
  const [searchedId, setSearchedId] = useState(initialTrackingId);

  useEffect(() => {
    if (initialTrackingId) {
      setQueryId(initialTrackingId);
      setSearchedId(initialTrackingId);
    }
  }, [initialTrackingId]);

  const normalizedSearch = searchedId.trim().replace(/^#/, '').toLowerCase();
  const matchedOrder = normalizedSearch
    ? orders.find(o => o.id.toLowerCase() === normalizedSearch)
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchedId(queryId.trim());
  };

  const activeStepIndex = matchedOrder
    ? TRACKING_STEPS.findIndex(s => s.key === matchedOrder.status)
    : -1;

  const handleWhatsAppSupport = (order) => {
    const num = studioInfo?.whatsappNumber || '971501234567';
    const msg = `Hello HUJRAH // حجره Studio,\nI would like an update on my order #${order.id} (Current Status: ${order.status}).`;
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-[#FAFAF9] min-h-[75vh] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        {/* Header & Search Form */}
        <div className="bg-white border border-[#EAE8E4] rounded-sm p-6 sm:p-8 space-y-6">
          <div className="max-w-xl space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-[#8C7A58] font-semibold">
              <Truck className="w-3.5 h-3.5" />
              <span>Order Tracking</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#141414]">
              Track Your HUJRAH Order
            </h1>
            <p className="text-xs sm:text-[13px] text-[#635E57] font-light leading-relaxed">
              Enter the Tracking ID sent to your email or WhatsApp upon order confirmation to view live production and White Glove UAE delivery status.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={queryId}
                onChange={(e) => setQueryId(e.target.value)}
                placeholder="Enter Tracking ID (e.g. HUJ-4821-UAE)"
                className="w-full pl-10 pr-4 py-3 bg-[#FAFAF9] border border-[#DDD8CF] rounded-full text-xs text-[#141414] font-mono focus:outline-none focus:border-black"
              />
            </div>
            <button
              type="submit"
              className="bg-[#141414] hover:bg-neutral-800 text-white px-7 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium cursor-pointer transition-colors shrink-0"
            >
              Track Order
            </button>
          </form>

          {/* Quick sample tracking pills for convenience */}
          {orders.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-neutral-400">
              <span>Sample IDs:</span>
              {orders.slice(0, 3).map(o => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setQueryId(o.id);
                    setSearchedId(o.id);
                  }}
                  className="font-mono text-[11px] px-2.5 py-0.5 bg-[#FAFAF9] hover:bg-[#F0EEE9] border border-[#EAE8E4] rounded-full text-[#141414] cursor-pointer transition-colors"
                >
                  {o.id}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Not Found State */}
        {normalizedSearch && !matchedOrder && (
          <div className="bg-white border border-red-200 rounded-sm p-6 flex items-start gap-3 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">No order found for &ldquo;{searchedId}&rdquo;</div>
              <p className="text-red-600/80 font-light mt-1">
                Please double-check your Tracking ID from your confirmation email (e.g. <span className="font-mono">HUJ-4821-UAE</span>) or contact our studio team.
              </p>
            </div>
          </div>
        )}

        {/* Matched Order Status & Summary */}
        {matchedOrder && (
          <div className="bg-white border border-[#EAE8E4] rounded-sm overflow-hidden animate-fadeIn">
            {/* Top Banner */}
            <div className="p-6 bg-[#FAFAF9] border-b border-[#EAE8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-base font-semibold font-mono text-[#141414]">
                    #{matchedOrder.id}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-semibold ${
                      matchedOrder.status === 'Cancelled'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : matchedOrder.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-[#141414] text-white border-[#141414]'
                    }`}
                  >
                    {matchedOrder.status}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Placed on {new Date(matchedOrder.createdAt).toLocaleDateString('en-AE', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })} • {matchedOrder.customerName}
                </p>
              </div>

              <button
                onClick={() => handleWhatsAppSupport(matchedOrder)}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Concierge Update</span>
              </button>
            </div>

            {/* Fulfillment Progress Stepper */}
            <div className="p-6 sm:p-8 border-b border-[#EAE8E4]">
              {matchedOrder.status === 'Cancelled' ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700">
                  This order has been cancelled. Please reach out to our concierge team if you need assistance.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  {TRACKING_STEPS.map((step, idx) => {
                    const isCompleted = activeStepIndex >= idx;
                    const isCurrent = activeStepIndex === idx;
                    return (
                      <div
                        key={step.key}
                        className={`p-3.5 rounded-sm border transition-all ${
                          isCurrent
                            ? 'border-black bg-[#FAFAF9]'
                            : isCompleted
                              ? 'border-emerald-200 bg-emerald-50/40'
                              : 'border-[#EAE8E4] bg-white opacity-55'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-neutral-400">0{idx + 1}</span>
                          {isCompleted ? (
                            <CheckCircle2 className={`w-4 h-4 ${isCurrent ? 'text-black' : 'text-emerald-600'}`} />
                          ) : (
                            <Clock className="w-4 h-4 text-neutral-300" />
                          )}
                        </div>
                        <div className="text-xs font-semibold text-[#141414]">{step.label}</div>
                        <p className="text-[11px] text-neutral-500 font-light mt-0.5 leading-snug">
                          {step.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Delivery & Ordered Pieces */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
              <div className="md:col-span-5 space-y-4">
                <div className="p-4 bg-[#FAFAF9] border border-[#EAE8E4] rounded-sm space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                    Delivery Destination
                  </span>
                  <div className="flex items-start gap-2 text-[#141414]">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                    <span>{matchedOrder.address}</span>
                  </div>
                  <div className="text-neutral-500 pt-1">
                    Payment: <strong className="text-[#141414]">{matchedOrder.paymentMethod}</strong>
                  </div>
                </div>

                {matchedOrder.notes && (
                  <div className="p-3.5 bg-amber-50/50 border border-amber-200/70 rounded-sm text-neutral-700">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-800 block mb-0.5">
                      Delivery Notes
                    </span>
                    {matchedOrder.notes}
                  </div>
                )}
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                  <Package className="w-3.5 h-3.5" />
                  <span>Ordered Pieces ({matchedOrder.items?.length || 0})</span>
                </div>
                <div className="border border-[#EAE8E4] rounded-sm divide-y divide-[#F0EEE9]">
                  {(matchedOrder.items || []).map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-11 h-13 object-cover rounded-xs bg-[#F5F4F0] border border-[#EAE8E4] shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-[#141414] truncate">{item.name}</div>
                          <div className="text-[11px] text-neutral-400">
                            Qty: {item.quantity || 1}
                            {item.selectedColor ? ` • ${item.selectedColor}` : ''}
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold text-[#141414] shrink-0">
                        {formatPrice(item.priceAED * (item.quantity || 1))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-medium text-[#141414]">Order Total</span>
                  <span className="text-base font-semibold text-[#141414]">
                    {formatPrice(matchedOrder.totalAED)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
