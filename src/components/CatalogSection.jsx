import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  Eye, 
  ShoppingBag, 
  Check, 
  SlidersHorizontal,
  ArrowUpRight,
  ShieldCheck
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
      // Filter tab logic
      if (activeFilter === 'uae' && !product.isHandmadeUAE) return false;
      if (activeFilter === 'imports' && product.isHandmadeUAE) return false;
      if (activeFilter === 'furniture' && product.category !== 'Furniture') return false;
      if (activeFilter === 'vessels' && product.category !== 'Vessels & Objects') return false;
      if (activeFilter === 'lighting' && product.category !== 'Lighting') return false;

      // Search query logic
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesArabic = product.arabicName.includes(query);
        const matchesMaterials = product.materials.toLowerCase().includes(query);
        const matchesOrigin = product.originLabel.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        return matchesName || matchesArabic || matchesMaterials || matchesOrigin || matchesCategory;
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
    <section id="collection" className="py-16 md:py-24 bg-[#F8F6F0] border-b border-[#E8E2D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89758]"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C8476] font-medium">
                The Curated Catalogue // المعروضات النادرة
              </span>
            </div>
            <h2 className="font-heading-cinzel text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1A17] tracking-[0.04em]">
              Collectible Works & Sculptural Forms
            </h2>
          </div>

          <div className="text-xs text-[#7A7468] max-w-sm">
            <p>
              Each collectible is strictly limited or unique. Ready for instant secure ordering with <strong className="text-[#1C1A17]">Apple Pay</strong> or direct coordination via <strong className="text-[#1C1A17]">WhatsApp</strong>.
            </p>
          </div>
        </div>

        {/* Filter Tabs & Sort Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-10 border-b border-[#E5DFD3]">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] whitespace-nowrap rounded-sm transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#1C1A17] text-[#FAF8F5] shadow-sm font-semibold'
                  : 'bg-[#EDE8DE] text-[#5A544A] hover:bg-[#E2DDD1] hover:text-[#1C1A17]'
              }`}
            >
              All Works ({products.length})
            </button>

            {/* UAE Handmade Tab - Highlighted with distinctive badge */}
            <button
              onClick={() => setActiveFilter('uae')}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] whitespace-nowrap rounded-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'uae'
                  ? 'bg-[#8C6D32] text-white shadow-sm font-semibold ring-1 ring-[#8C6D32]'
                  : 'bg-[#F2ECE1] border border-[#D5C29F] text-[#785B22] hover:bg-[#EAE0CE]'
              }`}
            >
              <span>🇦🇪 Made in UAE ({uaeCount})</span>
              <span className="text-[10px] bg-white/20 px-1 rounded">Emirati Identity</span>
            </button>

            <button
              onClick={() => setActiveFilter('imports')}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] whitespace-nowrap rounded-sm transition-all cursor-pointer ${
                activeFilter === 'imports'
                  ? 'bg-[#1C1A17] text-[#FAF8F5] shadow-sm font-semibold'
                  : 'bg-[#EDE8DE] text-[#5A544A] hover:bg-[#E2DDD1] hover:text-[#1C1A17]'
              }`}
            >
              Rare Imports ({importCount})
            </button>

            <button
              onClick={() => setActiveFilter('furniture')}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] whitespace-nowrap rounded-sm transition-all cursor-pointer ${
                activeFilter === 'furniture'
                  ? 'bg-[#1C1A17] text-[#FAF8F5] shadow-sm font-semibold'
                  : 'bg-[#EDE8DE] text-[#5A544A] hover:bg-[#E2DDD1] hover:text-[#1C1A17]'
              }`}
            >
              Furniture
            </button>

            <button
              onClick={() => setActiveFilter('vessels')}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] whitespace-nowrap rounded-sm transition-all cursor-pointer ${
                activeFilter === 'vessels'
                  ? 'bg-[#1C1A17] text-[#FAF8F5] shadow-sm font-semibold'
                  : 'bg-[#EDE8DE] text-[#5A544A] hover:bg-[#E2DDD1] hover:text-[#1C1A17]'
              }`}
            >
              Vessels & Ceramics
            </button>

            <button
              onClick={() => setActiveFilter('lighting')}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] whitespace-nowrap rounded-sm transition-all cursor-pointer ${
                activeFilter === 'lighting'
                  ? 'bg-[#1C1A17] text-[#FAF8F5] shadow-sm font-semibold'
                  : 'bg-[#EDE8DE] text-[#5A544A] hover:bg-[#E2DDD1] hover:text-[#1C1A17]'
              }`}
            >
              Lighting
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto text-xs text-[#6B655D]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sort:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-transparent border border-[#D5CEBE] rounded-sm px-2.5 py-1.5 text-xs text-[#1C1A17] focus:outline-none focus:border-[#8C6D32] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Search Notification */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-[#F1EBE0] px-4 py-2.5 rounded-sm text-xs text-[#5C564C]">
            <span>Showing results for "<strong className="text-[#1C1A17]">{searchQuery}</strong>" ({filteredProducts.length} items found)</span>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[#8C6D32] hover:underline font-medium"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Product Cards Grid - Editorial Layout inspired by Reference Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group flex flex-col bg-transparent justify-between"
            >
              <div>
                {/* Product Image Frame */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#EDE8DE] border border-[#E0D9CB] mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Top Origin Tag */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    {product.isHandmadeUAE ? (
                      <span className="bg-[#FAF8F5]/95 backdrop-blur-sm text-[#785B22] border border-[#D5C29F] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-sm shadow-sm font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D32]"></span>
                        Handmade in UAE 🇦🇪
                      </span>
                    ) : (
                      <span className="bg-[#1C1A17]/85 backdrop-blur-sm text-[#FAF8F5] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-sm shadow-sm font-medium">
                        {product.originLabel}
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="bg-[#1C1A17]/70 backdrop-blur-sm text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm">
                      {product.edition}
                    </span>
                  </div>

                  {/* Hover Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-[#1C1A17]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
                    <button
                      onClick={() => onQuickView(product)}
                      className="w-full max-w-[200px] bg-[#FAF8F5] text-[#1C1A17] hover:bg-white text-xs uppercase tracking-[0.16em] font-semibold py-2.5 rounded-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform transform translate-y-2 group-hover:translate-y-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>

                    <button
                      onClick={() => onApplePayDirect(product)}
                      className="w-full max-w-[200px] bg-black text-white hover:bg-[#1A1A1A] text-xs font-semibold py-2.5 rounded-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform transform translate-y-2 group-hover:translate-y-0 border border-white/20"
                    >
                      <span className="text-sm font-medium">Pay</span>
                      <span>Buy Direct</span>
                    </button>
                  </div>
                </div>

                {/* Product Metadata & Editorial Details */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 
                      onClick={() => onQuickView(product)}
                      className="font-serif-luxury text-xl sm:text-2xl font-normal text-[#1C1A17] group-hover:text-[#8C6D32] transition-colors cursor-pointer leading-tight"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <p className="font-arabic-heritage text-sm text-[#7D7567]">
                    {product.arabicName}
                  </p>

                  <p className="text-xs text-[#6B655D] line-clamp-1">
                    {product.materials}
                  </p>

                  {/* Price display with clear typography */}
                  <div className="pt-1 flex items-baseline justify-between">
                    <span className="font-heading-cinzel text-base sm:text-lg font-semibold text-[#1C1A17]">
                      {formatPrice(product.priceAED)}
                    </span>
                    <span className="text-[11px] text-[#8C8476]">
                      White Glove Included
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Order Strip */}
              <div className="mt-4 pt-3 border-t border-[#E8E2D4] flex items-center justify-between gap-2">
                <button
                  onClick={() => onWhatsAppOrder(product)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-wider text-[#1C1A17] hover:text-[#25D366] py-1.5 transition-colors cursor-pointer border border-[#DCD5C5] hover:border-[#25D366] rounded-sm"
                  title="Order piece via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-wider bg-[#1C1A17] text-[#FAF8F5] hover:bg-[#8C6D32] py-1.5 transition-colors cursor-pointer rounded-sm"
                  title="Add to shopping bag"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-[#FAF8F5] rounded-sm border border-[#E0D9CB]">
            <p className="text-sm text-[#7A7468] mb-4">No collectible pieces match your current selection.</p>
            <button
              onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              className="text-xs uppercase tracking-widest bg-[#1C1A17] text-white px-5 py-2.5 rounded-sm hover:bg-[#8C6D32]"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
