import React, { useState, useMemo } from 'react';
import { 
  MessageCircle, 
  Eye, 
  ShoppingBag, 
  SlidersHorizontal 
} from 'lucide-react';

export default function CatalogSection({ 
  products, 
  activeFilter, 
  setActiveFilter, 
  searchQuery, 
  setSearchQuery,
  formatPrice, 
  onQuickView, 
  onApplePayDirect, 
  onWhatsAppOrder,
  onAddToCart 
}) {
  const [selectedSort, setSelectedSort] = useState('featured');

  // Filter & Search logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (activeFilter === 'uae' && !product.isHandmadeUAE) return false;
      if (activeFilter === 'imports' && product.isHandmadeUAE) return false;
      if (activeFilter === 'furniture' && product.category !== 'Furniture') return false;
      if (activeFilter === 'vessels' && product.category !== 'Vessels & Objects') return false;
      if (activeFilter === 'lighting' && product.category !== 'Lighting') return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.arabicName.includes(query) ||
          product.materials.toLowerCase().includes(query) ||
          product.originLabel.toLowerCase().includes(query)
        );
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.priceAED - b.priceAED;
      if (selectedSort === 'price-desc') return b.priceAED - a.priceAED;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeFilter, searchQuery, selectedSort]);

  const uaeCount = products.filter(p => p.isHandmadeUAE).length;
  const importCount = products.filter(p => !p.isHandmadeUAE).length;

  return (
    <section id="collection" className="py-14 md:py-20 bg-[#F8F6F0] border-b border-[#E8E2D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C8476] font-semibold block mb-1">
              Curated Works // القطع المتاحة
            </span>
            <h2 className="font-heading-cinzel text-2xl sm:text-4xl text-[#1C1A17] font-normal tracking-[0.04em]">
              The Collection
            </h2>
          </div>

          <p className="text-xs text-[#7A7468]">
            Click any piece to order instantly with <strong className="text-[#1C1A17]">Apple Pay</strong> or via <strong className="text-[#1C1A17]">WhatsApp</strong>.
          </p>
        </div>

        {/* Clean Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-8 border-b border-[#E5DFD3]">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#1C1A17] text-[#FAF8F5] font-semibold'
                  : 'bg-[#EDE8DE] text-[#5A544A] hover:bg-[#E2DDD1]'
              }`}
            >
              All ({products.length})
            </button>

            <button
              onClick={() => setActiveFilter('uae')}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all flex items-center gap-1 cursor-pointer ${
                activeFilter === 'uae'
                  ? 'bg-[#8C6D32] text-white font-semibold'
                  : 'bg-[#F2ECE1] text-[#785B22] border border-[#D5C29F] hover:bg-[#EAE0CE]'
              }`}
            >
              <span>🇦🇪 Made in UAE ({uaeCount})</span>
            </button>

            <button
              onClick={() => setActiveFilter('imports')}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                activeFilter === 'imports'
                  ? 'bg-[#1C1A17] text-[#FAF8F5] font-semibold'
                  : 'bg-[#EDE8DE] text-[#5A544A] hover:bg-[#E2DDD1]'
              }`}
            >
              Imports ({importCount})
            </button>

            <button
              onClick={() => setActiveFilter('furniture')}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                activeFilter === 'furniture'
                  ? 'bg-[#1C1A17] text-[#FAF8F5] font-semibold'
                  : 'bg-[#EDE8DE] text-[#5A544A] hover:bg-[#E2DDD1]'
              }`}
            >
              Furniture
            </button>

            <button
              onClick={() => setActiveFilter('vessels')}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                activeFilter === 'vessels'
                  ? 'bg-[#1C1A17] text-[#FAF8F5] font-semibold'
                  : 'bg-[#EDE8DE] text-[#5A544A] hover:bg-[#E2DDD1]'
              }`}
            >
              Vessels
            </button>

            <button
              onClick={() => setActiveFilter('lighting')}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                activeFilter === 'lighting'
                  ? 'bg-[#1C1A17] text-[#FAF8F5] font-semibold'
                  : 'bg-[#EDE8DE] text-[#5A544A] hover:bg-[#E2DDD1]'
              }`}
            >
              Lighting
            </button>
          </div>

          {/* Simple Sort */}
          <div className="flex items-center gap-2 text-xs text-[#6B655D] self-end sm:self-auto">
            <span>Sort:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-transparent border border-[#D5CEBE] rounded-sm px-2 py-1 text-xs text-[#1C1A17] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Clear Search Indicator if searching */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-[#F1EBE0] px-4 py-2 rounded-sm text-xs">
            <span>Results for "{searchQuery}"</span>
            <button onClick={() => setSearchQuery('')} className="text-[#8C6D32] underline">Clear</button>
          </div>
        )}

        {/* Clean, Editorial Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group flex flex-col justify-between"
            >
              <div>
                {/* Product Image Frame */}
                <div 
                  onClick={() => onQuickView(product)}
                  className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#EDE8DE] border border-[#E0D9CB] cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Minimal Origin Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    {product.isHandmadeUAE ? (
                      <span className="bg-[#FAF8F5]/95 text-[#785B22] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm font-semibold border border-[#D5C29F]">
                        🇦🇪 Made in UAE
                      </span>
                    ) : (
                      <span className="bg-[#1C1A17]/80 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm">
                        {product.originLabel}
                      </span>
                    )}
                  </div>

                  {/* Stock tag */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-[#1C1A17]/70 text-white text-[9px] uppercase px-1.5 py-0.5 rounded-sm">
                      {product.edition}
                    </span>
                  </div>

                  {/* Subtle Quick View on Hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 text-[#1C1A17] text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-sm shadow flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </span>
                  </div>
                </div>

                {/* Minimal Details */}
                <div className="pt-3 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h3 
                      onClick={() => onQuickView(product)}
                      className="font-serif-luxury text-xl text-[#1C1A17] hover:text-[#8C6D32] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#7A7468]">
                    {product.materials}
                  </p>

                  <div className="pt-1 flex items-baseline justify-between">
                    <span className="font-heading-cinzel text-base sm:text-lg font-bold text-[#1C1A17]">
                      {formatPrice(product.priceAED)}
                    </span>
                    <span className="text-[10px] text-[#25D366] font-medium">
                      Free UAE Delivery
                    </span>
                  </div>
                </div>
              </div>

              {/* 2 Crystal Clear Action Buttons */}
              <div className="mt-3 pt-2.5 border-t border-[#E8E2D4] flex items-center gap-2">
                {/* Apple Pay Button */}
                <button
                  onClick={() => onApplePayDirect(product)}
                  className="flex-1 bg-black hover:bg-[#222] text-white py-2 rounded-sm text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm"
                  title="Buy instantly with Apple Pay"
                >
                  <span className="text-sm">Pay</span>
                  <span>Buy</span>
                </button>

                {/* WhatsApp Order Button */}
                <button
                  onClick={() => onWhatsAppOrder(product)}
                  className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white py-2 rounded-sm text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm"
                  title="Order via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                {/* Add to Bag Icon */}
                <button
                  onClick={() => onAddToCart(product)}
                  className="p-2 border border-[#D5CEBE] text-[#1C1A17] hover:bg-[#1C1A17] hover:text-white rounded-sm transition-colors cursor-pointer"
                  title="Add to shopping bag"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
