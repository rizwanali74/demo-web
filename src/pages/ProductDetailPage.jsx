import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Check, 
  ChevronRight, 
  Share2
} from 'lucide-react';

export default function ProductDetailPage({ 
  product, 
  allProducts,
  onBack, 
  onSelectProduct,
  formatPrice, 
  onAddToCart, 
  onApplePay, 
  onWhatsAppOrder 
}) {
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product?.id]);

  if (!product) return null;

  const currentImg = selectedImage || product.image;

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedColor: selectedColor || product.colors?.[0]?.name
    }, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Find related products in same category or featured
  const relatedProducts = allProducts
    ?.filter(p => p.id !== product.id && (p.category === product.category || p.isBestSeller))
    .slice(0, 3) || [];

  return (
    <div className="bg-[#FAFAF9] min-h-screen text-[#141414] animate-fadeIn pb-24">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between border-b border-[#EAE8E4] pb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-neutral-600 hover:text-black transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Collection</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-neutral-400 uppercase tracking-wider font-light">
            <span onClick={onBack} className="hover:text-black cursor-pointer">Home</span>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <span onClick={onBack} className="hover:text-black cursor-pointer">{product.categoryName || 'Furniture'}</span>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <span className="text-black font-medium truncate max-w-[200px]">{product.name}</span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black transition-colors cursor-pointer"
            title="Share piece"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Product Experience */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Editorial Multi-Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image Frame */}
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full rounded-sm overflow-hidden bg-[#F5F4F0] border border-[#EAE8E4] shadow-xs group">
              <img 
                src={currentImg} 
                alt={product.name} 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />

              {/* Status Tags */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                {product.isNew && (
                  <span className="bg-white/95 backdrop-blur-md text-[#141414] text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-sm font-semibold border border-black/5">
                    New Arrival
                  </span>
                )}
                {product.isBespoke && (
                  <span className="bg-[#141414]/90 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full font-medium">
                    Bespoke Sizing
                  </span>
                )}
              </div>

              <div className="absolute top-4 right-4 z-10">
                {product.inStock ? (
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-medium">
                    In Stock — UAE 48h
                  </span>
                ) : (
                  <span className="bg-neutral-100 text-neutral-700 border border-neutral-300 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-medium">
                    Made to Order
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setSelectedImage(product.image)}
                className={`relative w-20 h-24 rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${
                  currentImg === product.image ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </button>

              {product.secondaryImage && (
                <button
                  onClick={() => setSelectedImage(product.secondaryImage)}
                  className={`relative w-20 h-24 rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${
                    currentImg === product.secondaryImage ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={product.secondaryImage} alt="" className="w-full h-full object-cover" />
                </button>
              )}
            </div>

            {/* Quality & Delivery Assurance Pills */}
            <div className="mt-8 pt-6 border-t border-[#EAE8E4] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#736E67]">
              <div className="flex items-start gap-3 p-3.5 bg-white rounded-sm border border-[#EAE8E4]">
                <Truck className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#141414] block">White Glove UAE Delivery</span>
                  <span className="text-[11px] leading-relaxed">Complimentary room placement and unboxing over 1,500 AED.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-sm border border-[#EAE8E4]">
                <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#141414] block">5-Year Structural Guarantee</span>
                  <span className="text-[11px] leading-relaxed">Hand-inspected joinery, premium foams & authentic natural materials.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Custom Finishes & Add to Cart */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header Meta */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[#8C7A58] font-semibold">
                    {product.categoryName || 'Sculptural Furniture'}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    SKU: {product.sku}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl text-[#141414] font-light tracking-[-0.01em] leading-tight mb-1">
                  {product.name}
                </h1>

                {product.arabicName && (
                  <p dir="rtl" className="font-arabic text-lg sm:text-xl text-[#736E67] text-left">
                    {product.arabicName}
                  </p>
                )}

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3 pb-4 border-b border-[#EAE8E4]">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#141414]">
                    {formatPrice(product.priceAED)}
                  </span>
                  {product.compareAtPriceAED && (
                    <span className="text-base text-neutral-400 line-through font-light">
                      {formatPrice(product.compareAtPriceAED)}
                    </span>
                  )}
                  <span className="text-xs text-neutral-500 font-light ml-auto">
                    VAT Included • UAE Dirhams
                  </span>
                </div>
              </div>

              {/* Short Bio */}
              <p className="text-sm text-[#555] font-light leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* Available Finishes / Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs uppercase tracking-[0.16em] text-[#141414] font-medium">
                      Select Finish / Material:
                    </span>
                    <span className="text-xs text-neutral-600 font-semibold">
                      {selectedColor || product.colors[0].name}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {product.colors.map((c, i) => {
                      const isSelected = (selectedColor || product.colors[0].name) === c.name;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(c.name)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-[#141414] bg-white shadow-xs font-medium text-black' 
                              : 'border-[#DDD8CF] bg-[#F7F6F3] text-neutral-600 hover:border-black'
                          }`}
                        >
                          <span 
                            style={{ backgroundColor: c.hex }} 
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0 inline-block" 
                          />
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag CTA */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#DDD8CF] rounded-full bg-white px-3 py-2 text-sm text-[#141414]">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 text-neutral-400 hover:text-black cursor-pointer font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 font-semibold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 text-neutral-400 hover:text-black cursor-pointer font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add to Bag Button */}
                  <button
                    onClick={handleAdd}
                    className="flex-1 bg-[#141414] hover:bg-neutral-800 text-white py-3.5 px-6 rounded-full flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-[0.18em] font-semibold transition-all shadow-sm"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Shopping Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag — {formatPrice(product.priceAED * quantity)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Instant Apple Pay Checkout */}
                <button
                  onClick={() => onApplePay({ ...product, quantity, selectedColor })}
                  className="w-full bg-black hover:bg-neutral-900 text-white py-3.5 px-4 rounded-full flex items-center justify-center gap-2 cursor-pointer text-xs font-medium shadow-sm transition-all"
                >
                  <span className="uppercase tracking-wider">Instant Checkout with</span>
                  <span className="text-base font-bold">Pay</span>
                </button>

                {/* Direct WhatsApp Concierge Order */}
                <button
                  onClick={() => onWhatsAppOrder({ ...product, quantity, selectedColor })}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-full flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-medium shadow-2xs transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order or Request Swatches via WhatsApp</span>
                </button>
              </div>

              {/* Specifications Tabs / Accordion */}
              <div className="pt-6 border-t border-[#EAE8E4]">
                <div className="flex border-b border-[#EAE8E4] text-xs uppercase tracking-wider">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`pb-2.5 px-3 font-medium cursor-pointer transition-colors ${
                      activeTab === 'description' 
                        ? 'border-b-2 border-black text-black' 
                        : 'text-neutral-400 hover:text-black'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2.5 px-3 font-medium cursor-pointer transition-colors ${
                      activeTab === 'specs' 
                        ? 'border-b-2 border-black text-black' 
                        : 'text-neutral-400 hover:text-black'
                    }`}
                  >
                    Dimensions & Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('delivery')}
                    className={`pb-2.5 px-3 font-medium cursor-pointer transition-colors ${
                      activeTab === 'delivery' 
                        ? 'border-b-2 border-black text-black' 
                        : 'text-neutral-400 hover:text-black'
                    }`}
                  >
                    White Glove Delivery
                  </button>
                </div>

                <div className="pt-4 text-xs text-[#666] leading-relaxed">
                  {activeTab === 'description' && (
                    <div className="space-y-3">
                      <p>{product.description}</p>
                      <p className="text-[#141414] font-medium">
                        Custom sizing and bespoke commercial configurations are available upon request through our Al Ain & Dubai ateliers.
                      </p>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b border-[#F0EEE9]">
                        <span className="text-neutral-400">Materials:</span>
                        <span className="text-[#141414] font-medium text-right">{product.materials}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#F0EEE9]">
                        <span className="text-neutral-400">Dimensions:</span>
                        <span className="text-[#141414] font-medium">{product.dimensions}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#F0EEE9]">
                        <span className="text-neutral-400">Lead Time:</span>
                        <span className="text-[#141414] font-medium">{product.leadTime}</span>
                      </div>
                      {product.specs && Object.entries(product.specs).map(([k, v]) => (
                        <div key={k} className="flex justify-between py-1 border-b border-[#F0EEE9]">
                          <span className="text-neutral-400">{k}:</span>
                          <span className="text-[#141414] font-medium text-right">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'delivery' && (
                    <div className="space-y-2">
                      <p>
                        <strong>UAE Wide:</strong> Complimentary for orders above 1,500 AED. Delivered within 24-48 hours for in-stock pieces.
                      </p>
                      <p>
                        <strong>White Glove Service:</strong> Our two-person logistics specialists deliver directly into your room of choice, assemble where necessary, and remove all packing refuse.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Curated Pairings / Related Pieces */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#EAE8E4]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-neutral-400 font-semibold block mb-1">
                  Curated Pairings
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-[#141414]">
                  Complementary Objects
                </h3>
              </div>
              <button
                onClick={onBack}
                className="text-xs uppercase tracking-wider text-black font-semibold underline cursor-pointer hover:opacity-70"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((rel) => (
                <div 
                  key={rel.id}
                  onClick={() => onSelectProduct(rel)}
                  className="group cursor-pointer flex flex-col justify-between"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-sm bg-[#F5F4F0] border border-[#EAE8E4] relative mb-3">
                    <img 
                      src={rel.image} 
                      alt={rel.name} 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-104"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-normal text-[#141414] group-hover:opacity-75 transition-opacity">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-neutral-500 font-light truncate mt-0.5">
                      {rel.materials}
                    </p>
                    <span className="text-sm font-semibold text-[#141414] block mt-1">
                      {formatPrice(rel.priceAED)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
