import React, { useState, useMemo } from 'react';

export default function CatalogSection({ 
  products, 
  activeFilter, 
  setActiveFilter, 
  searchQuery, 
  setSearchQuery,
  formatPrice, 
  onOpenProductPage 
}) {
  const [selectedSort, setSelectedSort] = useState('featured');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Filter & Search logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (activeFilter === 'sofas-seating' && product.category !== 'sofas-seating') return false;
      if (activeFilter === 'lounge-chairs' && product.category !== 'lounge-chairs') return false;
      if (activeFilter === 'tables' && product.category !== 'tables') return false;
      if (activeFilter === 'lighting' && product.category !== 'lighting') return false;
      if (activeFilter === 'decor-objects' && product.category !== 'decor-objects') return false;
      if (activeFilter === 'in-stock' && !product.inStock) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          (product.arabicName && product.arabicName.includes(query)) ||
          (product.categoryName && product.categoryName.toLowerCase().includes(query))
        );
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.priceAED - b.priceAED;
      if (selectedSort === 'price-desc') return b.priceAED - a.priceAED;
      if (selectedSort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, activeFilter, searchQuery, selectedSort]);

  const categoryTabs = [
    { id: 'all', label: 'All Objects' },
    { id: 'sofas-seating', label: 'Sofas & Seating' },
    { id: 'lounge-chairs', label: 'Lounge Chairs' },
    { id: 'tables', label: 'Tables' },
    { id: 'lighting', label: 'Lighting' },
    { id: 'decor-objects', label: 'Objects & Mirrors' },
    { id: 'in-stock', label: 'Ready to Ship' }
  ];

  return (
    <section id="catalog" className="py-12 md:py-16 bg-white border-b border-[#EAE8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Category Tabs & Sort (Forma Object style) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-8 border-b border-[#EAE8E4]">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categoryTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-[#141414] text-white font-medium shadow-2xs'
                    : 'bg-[#F4F2EE] text-[#555] hover:bg-[#EAE6DE] hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Clean Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-[#736E67] self-end lg:self-auto shrink-0">
            <span className="uppercase tracking-wider text-[10px]">Sort:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-[#F8F7F4] border border-[#DDD8CF] rounded-full px-3 py-1 text-xs text-[#141414] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Search notification */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-[#F5F3EE] px-4 py-2 rounded-sm text-xs text-[#141414]">
            <span>Active search filter: "{searchQuery}"</span>
            <button onClick={() => setSearchQuery('')} className="text-black font-semibold underline cursor-pointer">Clear Search</button>
          </div>
        )}

        {/* Ultra-Clean Forma Object Product Grid: NO CLUTTER, JUST IMAGE, NAME, PRICE */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 sm:gap-x-7 gap-y-10 sm:gap-y-12">
          {filteredProducts.map((product) => {
            const isHovered = hoveredProduct === product.id;
            return (
              <div 
                key={product.id} 
                onClick={() => onOpenProductPage(product)}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group cursor-pointer flex flex-col justify-between select-none"
              >
                <div>
                  {/* Clean Aspect Ratio Image with Subtle Hover Flip */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F4F0] border border-[#EAE8E4] rounded-xs mb-3">
                    <img
                      src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
                      loading="lazy"
                    />

                    {/* Subtle Badge */}
                    {product.isNew && (
                      <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#141414] text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 rounded-full font-medium shadow-2xs border border-black/5">
                        New
                      </span>
                    )}
                  </div>

                  {/* Clean Product Name, Arabic Name & Price */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-xs sm:text-sm font-normal text-[#141414] group-hover:opacity-70 transition-opacity leading-snug">
                        {product.name}
                      </h3>
                      {product.arabicName && (
                        <span
                          dir="rtl"
                          className="font-arabic text-[11px] sm:text-xs text-[#736E67] shrink-0"
                        >
                          {product.arabicName}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-[#141414]">
                        {formatPrice(product.priceAED)}
                      </span>
                      {product.compareAtPriceAED && (
                        <span className="text-[11px] text-neutral-400 line-through font-light">
                          {formatPrice(product.compareAtPriceAED)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-[#F9F8F5] rounded-sm border border-[#EAE8E4] my-8">
            <p className="text-sm text-[#736E67] mb-3">No pieces match your selected filter.</p>
            <button
              onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              className="bg-[#141414] text-white text-xs uppercase tracking-wider px-5 py-2.5 rounded-full cursor-pointer hover:bg-neutral-800"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
