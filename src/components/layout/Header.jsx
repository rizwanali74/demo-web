import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  LayoutDashboard,
  Truck
} from 'lucide-react';

export default function Header({
  cartCount,
  onOpenCart,
  activeCurrency: _activeCurrency,
  onChangeCurrency: _onChangeCurrency,
  onNavigateHome,
  onNavigateShop,
  onNavigateContact,
  onNavigateTrackOrder,
  onNavigateAdmin,
  categories: propCategories = [],
  onSearch,
  searchQuery,
  currentPage
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Objects' },
    ...(propCategories.length > 0
      ? propCategories
      : [
          { id: 'sofas-seating', name: 'Sofas & Modular' },
          { id: 'lounge-chairs', name: 'Lounge Chairs' },
          { id: 'tables', name: 'Coffee & Dining Tables' },
          { id: 'lighting', name: 'Architectural Lighting' },
          { id: 'decor-objects', name: 'Objects & Mirrors' }
        ]),
    { id: 'in-stock', name: 'Ready to Ship (UAE 48h)' }
  ];

  const handleCategorySelect = (catId) => {
    onNavigateShop(catId);
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE8E4] transition-all">
      {/* Minimal Top Announcement Bar */}
      {/* <div className="bg-[#141414] text-[#E8E6E1] text-[10.5px] py-1 px-4 tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.16em]">
              Complimentary UAE Delivery Over 1,500 AED • Custom Sizing Available
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] shrink-0">
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => onChangeCurrency('AED')} 
                className={`transition-colors cursor-pointer ${activeCurrency === 'AED' ? 'text-white font-semibold' : 'text-[#8E8B84] hover:text-white'}`}
              >
                AED
              </button>
              <span className="text-[#444]">|</span>
              <button 
                onClick={() => onChangeCurrency('USD')} 
                className={`transition-colors cursor-pointer ${activeCurrency === 'USD' ? 'text-white font-semibold' : 'text-[#8E8B84] hover:text-white'}`}
              >
                USD ($)
              </button>
              <span className="text-[#444]">|</span>
              <button 
                onClick={() => onChangeCurrency('EUR')} 
                className={`transition-colors cursor-pointer ${activeCurrency === 'EUR' ? 'text-white font-semibold' : 'text-[#8E8B84] hover:text-white'}`}
              >
                EUR (€)
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Luxury Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-15">

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-[#141414] hover:text-neutral-500 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
          </button>

          {/* EXACTLY 3 NAVITEMS: HOME, SHOP, CONTACT US */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.22em] font-medium text-[#4A4742]">

            {/* 1. HOME */}
            <button
              onClick={onNavigateHome}
              className={`hover:text-black transition-colors cursor-pointer pb-0.5 ${currentPage === 'home' ? 'text-black font-semibold border-b border-black' : ''
                }`}
            >
              Home
            </button>

            {/* 2. SHOP (with Category Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                onClick={() => onNavigateShop('all')}
                className={`flex items-center gap-1 hover:text-black transition-colors cursor-pointer pb-0.5 ${currentPage === 'shop' ? 'text-black font-semibold border-b border-black' : ''
                  }`}
              >
                <span>Shop</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Clean Dropdown Menu */}
              {shopDropdownOpen && (
                <div className="absolute left-0 top-full pt-3 w-60 z-50 animate-fadeIn">
                  <div className="bg-white border border-[#EAE8E4] shadow-xl py-2 px-1 rounded-sm">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className="w-full text-left px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-[#555] hover:text-black hover:bg-[#F8F7F4] transition-colors cursor-pointer rounded-xs flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <ArrowRight className="w-3 h-3 text-neutral-300 opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. CONTACT US */}
            <button
              onClick={onNavigateContact}
              className={`hover:text-black transition-colors cursor-pointer pb-0.5 ${currentPage === 'contact' ? 'text-black font-semibold border-b border-black' : ''
                }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Center Brand Identity with Provided HUJRAH Logo */}
          <div
            className="flex items-center justify-center cursor-pointer select-none py-1"
            onClick={onNavigateHome}
          >
            <img
              src="/images/logo.png"
              alt="HUJRAH // حجره"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-300 hover:opacity-85"
            />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4 text-[#141414]">
            {/* Search Button */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:text-neutral-500 transition-colors cursor-pointer"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-12 w-72 sm:w-80 bg-white p-3.5 shadow-2xl rounded-sm border border-[#EAE8E4] z-50 animate-fadeIn">
                  <div className="flex items-center gap-2 border-b border-[#E0DCD5] pb-2">
                    <Search className="w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search sofa, travertine, lamp, mirror..."
                      value={searchQuery}
                      onChange={(e) => {
                        onSearch(e.target.value);
                        if (currentPage !== 'shop') onNavigateShop('all');
                      }}
                      autoFocus
                      className="w-full text-xs bg-transparent focus:outline-none text-[#141414] placeholder:text-neutral-400"
                    />
                    {searchQuery && (
                      <button onClick={() => onSearch('')} className="text-xs text-neutral-400 hover:text-black">✕</button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Track Order Truck Icon */}
            <button
              onClick={onNavigateTrackOrder}
              className={`p-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'track-order' ? 'text-black' : 'text-[#141414] hover:text-neutral-500'
              }`}
              aria-label="Track Order"
              title="Track Order"
            >
              <Truck className="w-5 h-5 stroke-[1.5]" />
              <span className="hidden lg:inline text-[10px] uppercase tracking-[0.16em] font-medium">
                Track
              </span>
            </button>

            {/* TODO: Remove temporary Admin button when protected route auth is implemented */}
            <button
              onClick={onNavigateAdmin}
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] border border-[#DDD8CF] hover:border-black px-3 py-1.5 rounded-full text-[#141414] font-medium transition-colors cursor-pointer"
              title="Open Admin Dashboard (Temporary Access)"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            {/* Shopping Bag Icon with count badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2 hover:text-neutral-500 transition-colors cursor-pointer flex items-center"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#141414] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu: Exactly Home, Shop categories, Contact Us */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAFAF9] border-b border-[#E8E5DF] px-6 py-6 transition-all animate-fadeIn">
          <nav className="flex flex-col gap-4 text-xs tracking-[0.18em] uppercase">
            <button
              onClick={() => { onNavigateHome(); setMobileMenuOpen(false); }}
              className={`text-left py-2 border-b border-[#EAE8E4] ${currentPage === 'home' ? 'font-bold text-black' : 'text-[#141414]'}`}
            >
              Home
            </button>

            {/* Shop Accordion */}
            <div className="border-b border-[#EAE8E4] pb-2">
              <div
                onClick={() => onNavigateShop('all')}
                className="py-2 text-[#141414] font-semibold flex justify-between items-center cursor-pointer"
              >
                <span>Shop</span>
                <span className="text-[10px] text-neutral-400">View All</span>
              </div>
              <div className="pl-3 space-y-2 pt-1 pb-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCategorySelect(c.id)}
                    className="block text-left py-1 text-[11px] text-[#666] hover:text-black cursor-pointer"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => { onNavigateContact(); setMobileMenuOpen(false); }}
              className={`text-left py-2 border-b border-[#EAE8E4] ${currentPage === 'contact' ? 'font-bold text-black' : 'text-[#141414]'}`}
            >
              Contact Us
            </button>

            <button
              onClick={() => { onNavigateTrackOrder(); setMobileMenuOpen(false); }}
              className={`text-left py-2 border-b border-[#EAE8E4] flex items-center gap-2 ${currentPage === 'track-order' ? 'font-bold text-black' : 'text-[#141414]'}`}
            >
              <Truck className="w-4 h-4" />
              <span>Track Order</span>
            </button>

            {/* Track Order Truck Icon */}
            <button
              onClick={onNavigateTrackOrder}
              className={`p-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'track-order' ? 'text-black' : 'text-[#141414] hover:text-neutral-500'
              }`}
              aria-label="Track Order"
              title="Track Order"
            >
              <Truck className="w-5 h-5 stroke-[1.5]" />
              <span className="hidden lg:inline text-[10px] uppercase tracking-[0.16em] font-medium">
                Track
              </span>
            </button>

            {/* TODO: Remove temporary Admin button when protected route auth is implemented */}
            <button
              onClick={() => { onNavigateAdmin(); setMobileMenuOpen(false); }}
              className="text-left py-2 text-[#141414] font-semibold flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
