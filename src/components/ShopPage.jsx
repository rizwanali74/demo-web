import React, { useState, useMemo } from 'react';

export default function ShopPage({ 
  products, 
  initialCategory = 'all', 
  onBackToHome,
  onOpenProductPage, 
  formatPrice 
}) {
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const activeCategory = selectedCat !== null ? selectedCat : initialCategory;

  const setActiveCategory = (cat) => {
    setSelectedCat(cat);
  };

  const categoryTabs = [
    { id: 'all', label: 'All Objects', title: 'The Complete Collection' },
    { id: 'sofas-seating', label: 'Sofas & Seating', title: 'Sofas & Modular Seating' },
    { id: 'lounge-chairs', label: 'Lounge Chairs', title: 'Lounge & Accent Chairs' },
    { id: 'tables', label: 'Tables', title: 'Coffee, Side & Dining Tables' },
    { id: 'lighting', label: 'Lighting', title: 'Architectural Lighting & Lamps' },
    { id: 'decor-objects', label: 'Objects & Mirrors', title: 'Sculptural Objects & Mirrors' },
    { id: 'in-stock', label: 'Ready to Ship', title: 'In-Stock Pieces (UAE 48h)' }
  ];

  const currentTab = categoryTabs.find(t => t.id === activeCategory) || categoryTabs[0];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (activeCategory === 'sofas-seating' && product.category !== 'sofas-seating') return false;
      if (activeCategory === 'lounge-chairs' && product.category !== 'lounge-chairs') return false;
      if (activeCategory === 'tables' && product.category !== 'tables') return false;
      if (activeCategory === 'lighting' && product.category !== 'lighting') return false;
      if (activeCategory === 'decor-objects' && product.category !== 'decor-objects') return false;
      if (activeCategory === 'in-stock' && !product.inStock) return false;
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.priceAED - b.priceAED;
      if (selectedSort === 'price-desc') return b.priceAED - a.priceAED;
      if (selectedSort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, activeCategory, selectedSort]);

  return (
    <div className="bg-white min-h-screen text-[#141414] animate-fadeIn pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-wider font-light border-b border-[#EAE8E4] pb-4">
          <button onClick={onBackToHome} className="hover:text-black cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-black font-medium">Shop</span>
          <span>/</span>
          <span className="text-[#8C7A58] font-medium">{currentTab.label}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Header Title & Count */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-neutral-400 font-semibold block mb-1">
              Curated Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-light text-[#141414] tracking-[-0.01em]">
              {currentTab.title}
            </h1>
          </div>

          <div className="text-xs text-neutral-500 font-light">
            Showing {filteredProducts.length} pieces
          </div>
        </div>

        {/* Category Pills & Sort Bar (Forma Object style) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-10 border-b border-[#EAE8E4]">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categoryTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-[#141414] text-white font-medium shadow-2xs'
                    : 'bg-[#F4F2EE] text-[#555] hover:bg-[#EAE6DE] hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
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

        {/* Clean Forma Object Product Grid: ONLY IMAGE, NAME, PRICE */}
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

                    {/* Minimal Badge */}
                    {product.isNew && (
                      <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#141414] text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 rounded-full font-medium shadow-2xs border border-black/5">
                        New
                      </span>
                    )}
                  </div>

                  {/* Clean Product Name & Price ONLY */}
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-normal text-[#141414] group-hover:opacity-70 transition-opacity leading-snug">
                      {product.name}
                    </h3>
                    
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
            <p className="text-sm text-[#736E67] mb-3">No pieces match your selected category.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="bg-[#141414] text-white text-xs uppercase tracking-wider px-5 py-2.5 rounded-full cursor-pointer hover:bg-neutral-800"
            >
              View All Objects
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
