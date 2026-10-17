import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  MessageCircle, 
  Menu, 
  X, 
  Globe, 
  Sparkles,
  PhoneCall,
  Check
} from 'lucide-react';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  activeCurrency, 
  onChangeCurrency,
  onOpenWhatsAppConcierge,
  onSearch,
  searchQuery,
  onNavigateSection
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#E8E2D4] transition-all">
      {/* Top Editorial Announcement Bar */}
      <div className="bg-[#1C1A17] text-[#EDE8DF] text-[11px] md:text-xs py-2 px-4 tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B89758] animate-pulse"></span>
            <span className="text-[#C8C2B5] font-light">White Glove Delivery across all UAE Emirates</span>
            <span className="hidden sm:inline text-[#7A756C]">•</span>
            <span className="hidden sm:inline text-[#D8D2C5]">Atelier in Dubai Design District (d3)</span>
          </div>

          <div className="flex items-center gap-5 ml-auto">
            {/* Currency Switcher */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <Globe className="w-3 h-3 text-[#B89758]" />
              <button 
                onClick={() => onChangeCurrency('AED')} 
                className={`transition-colors cursor-pointer ${activeCurrency === 'AED' ? 'text-[#B89758] font-semibold underline underline-offset-4' : 'text-[#A09A8F] hover:text-white'}`}
              >
                AED
              </button>
              <span className="text-[#555]">/</span>
              <button 
                onClick={() => onChangeCurrency('USD')} 
                className={`transition-colors cursor-pointer ${activeCurrency === 'USD' ? 'text-[#B89758] font-semibold underline underline-offset-4' : 'text-[#A09A8F] hover:text-white'}`}
              >
                USD ($)
              </button>
              <span className="text-[#555]">/</span>
              <button 
                onClick={() => onChangeCurrency('EUR')} 
                className={`transition-colors cursor-pointer ${activeCurrency === 'EUR' ? 'text-[#B89758] font-semibold underline underline-offset-4' : 'text-[#A09A8F] hover:text-white'}`}
              >
                EUR (€)
              </button>
            </div>

            {/* Direct WhatsApp Concierge CTA */}
            <button
              onClick={onOpenWhatsAppConcierge}
              className="hidden md:flex items-center gap-1.5 text-[#EFEBE1] hover:text-[#B89758] transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-[#1C1A17] hover:text-[#B89758] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Left Links */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-[0.16em] uppercase text-[#4A453E]">
            <button 
              onClick={() => onNavigateSection('collection')} 
              className="hover:text-[#1C1A17] transition-colors hover:underline underline-offset-8 cursor-pointer"
            >
              The Collection
            </button>
            <button 
              onClick={() => onNavigateSection('emirati-craft')} 
              className="flex items-center gap-1.5 text-[#1C1A17] font-medium hover:text-[#B89758] transition-colors cursor-pointer"
            >
              <span className="text-xs">🇦🇪</span>
              <span>Emirati Craft</span>
            </button>
            <button 
              onClick={() => onNavigateSection('rare-imports')} 
              className="hover:text-[#1C1A17] transition-colors hover:underline underline-offset-8 cursor-pointer"
            >
              Rare Imports
            </button>
            <button 
              onClick={() => onNavigateSection('spaces')} 
              className="hover:text-[#1C1A17] transition-colors hover:underline underline-offset-8 cursor-pointer"
            >
              Spaces In Situ
            </button>
          </nav>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center justify-center cursor-pointer select-none" onClick={() => onNavigateSection('hero')}>
            <span className="font-heading-cinzel text-xl sm:text-2xl md:text-[26px] tracking-[0.24em] font-semibold text-[#1C1A17]">
              AL-ATHAR
            </span>
            <div className="flex items-center gap-2 -mt-1">
              <span className="font-arabic-heritage text-sm text-[#7D7567] tracking-widest">
                دار الأثر
              </span>
              <span className="w-1 h-1 rounded-full bg-[#B89758]"></span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C8578]">
                Collectible Design
              </span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 sm:gap-6 text-[#1C1A17]">
            {/* Search Toggle */}
            <div className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                className="p-1.5 hover:text-[#B89758] transition-colors cursor-pointer"
                aria-label="Search collectibles"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-10 w-72 sm:w-80 bg-white p-3 shadow-xl rounded-sm border border-[#E5DFD3] z-50 animate-fadeIn">
                  <div className="flex items-center gap-2 border-b border-[#D8D1C2] pb-1.5">
                    <Search className="w-4 h-4 text-[#8C8578]" />
                    <input 
                      type="text" 
                      placeholder="Search furniture, sandstone, terracotta..." 
                      value={searchQuery}
                      onChange={(e) => onSearch(e.target.value)}
                      autoFocus
                      className="w-full text-xs bg-transparent focus:outline-none text-[#1C1A17]"
                    />
                    {searchQuery && (
                      <button onClick={() => onSearch('')} className="text-xs text-[#8C8578] hover:text-black">
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Header Contact */}
            <button 
              onClick={onOpenWhatsAppConcierge}
              className="hidden lg:flex items-center gap-1.5 text-xs tracking-wider uppercase border border-[#D5CEBE] px-3 py-1.5 rounded-sm hover:border-[#1C1A17] hover:bg-[#1C1A17] hover:text-white transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Order via WhatsApp</span>
            </button>

            {/* Shopping Cart Drawer Toggle */}
            <button 
              onClick={onOpenCart} 
              className="relative p-1.5 hover:text-[#B89758] transition-colors cursor-pointer flex items-center"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1C1A17] text-[#FAF8F5] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F3EFE6] border-b border-[#E0D9CB] px-6 py-6 transition-all animate-fadeIn">
          <nav className="flex flex-col gap-4 text-sm tracking-widest uppercase">
            <button 
              onClick={() => { onNavigateSection('collection'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#E6E0D2] text-[#1C1A17]"
            >
              The Complete Collection
            </button>
            <button 
              onClick={() => { onNavigateSection('emirati-craft'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#E6E0D2] text-[#B89758] font-medium flex items-center justify-between"
            >
              <span>🇦🇪 Emirati Craftsmanship</span>
              <span className="text-[10px] bg-[#B89758]/10 text-[#8C6D32] px-2 py-0.5 rounded">Specialty</span>
            </button>
            <button 
              onClick={() => { onNavigateSection('rare-imports'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#E6E0D2] text-[#1C1A17]"
            >
              Rare Global Imports
            </button>
            <button 
              onClick={() => { onNavigateSection('spaces'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#E6E0D2] text-[#1C1A17]"
            >
              Spaces In Situ (Mood Board)
            </button>
            <button 
              onClick={() => { onNavigateSection('delivery'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#E6E0D2] text-[#1C1A17]"
            >
              UAE White Glove Delivery & Apple Pay
            </button>
            
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => { onOpenWhatsAppConcierge(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-sm font-medium tracking-normal text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Client on WhatsApp</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
