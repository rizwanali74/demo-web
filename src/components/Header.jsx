import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MessageCircle, 
  Menu, 
  X, 
  Globe 
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
      {/* Minimal Top Bar */}
      <div className="bg-[#1C1A17] text-[#EDE8DF] text-[11px] py-1.5 px-4 tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89758]"></span>
            <span className="text-[#C8C2B5] font-light">White Glove Delivery across UAE • Apple Pay & WhatsApp</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Currency Selector */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <button 
                onClick={() => onChangeCurrency('AED')} 
                className={`transition-colors cursor-pointer ${activeCurrency === 'AED' ? 'text-[#B89758] font-bold' : 'text-[#8E887E] hover:text-white'}`}
              >
                AED
              </button>
              <span className="text-[#444]">|</span>
              <button 
                onClick={() => onChangeCurrency('USD')} 
                className={`transition-colors cursor-pointer ${activeCurrency === 'USD' ? 'text-[#B89758] font-bold' : 'text-[#8E887E] hover:text-white'}`}
              >
                USD ($)
              </button>
            </div>

            <button
              onClick={onOpenWhatsAppConcierge}
              className="hidden sm:flex items-center gap-1 text-[#25D366] hover:text-white transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Mobile Menu Button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-[#1C1A17] hover:text-[#B89758]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Left Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs tracking-[0.16em] uppercase text-[#554E44]">
            <button 
              onClick={() => onNavigateSection('collection')} 
              className="hover:text-[#1C1A17] transition-colors cursor-pointer"
            >
              Collection
            </button>
            <button 
              onClick={() => onNavigateSection('emirati-craft')} 
              className="flex items-center gap-1 text-[#1C1A17] font-semibold hover:text-[#B89758] transition-colors cursor-pointer"
            >
              <span>🇦🇪 Made in UAE</span>
            </button>
            <button 
              onClick={() => onNavigateSection('rare-imports')} 
              className="hover:text-[#1C1A17] transition-colors cursor-pointer"
            >
              Imports
            </button>
            <button 
              onClick={() => onNavigateSection('spaces')} 
              className="hover:text-[#1C1A17] transition-colors cursor-pointer"
            >
              Spaces
            </button>
          </nav>

          {/* Center Brand Identity */}
          <div 
            className="flex flex-col items-center justify-center cursor-pointer select-none text-center" 
            onClick={() => onNavigateSection('hero')}
          >
            <span className="font-heading-cinzel text-xl sm:text-2xl tracking-[0.24em] font-semibold text-[#1C1A17]">
              AL-ATHAR
            </span>
            <span className="font-arabic-heritage text-xs text-[#8C8476] tracking-widest -mt-1">
              دار الأثر
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 text-[#1C1A17]">
            {/* Minimal Search Button */}
            <div className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                className="p-1.5 hover:text-[#B89758] transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4 h-4 stroke-[1.75]" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-10 w-72 bg-white p-3 shadow-xl rounded-sm border border-[#E5DFD3] z-50 animate-fadeIn">
                  <div className="flex items-center gap-2 border-b border-[#D8D1C2] pb-1.5">
                    <Search className="w-3.5 h-3.5 text-[#8C8578]" />
                    <input 
                      type="text" 
                      placeholder="Search bench, terracotta, sofa..." 
                      value={searchQuery}
                      onChange={(e) => onSearch(e.target.value)}
                      autoFocus
                      className="w-full text-xs bg-transparent focus:outline-none text-[#1C1A17]"
                    />
                    {searchQuery && (
                      <button onClick={() => onSearch('')} className="text-xs text-[#8C8578]">✕</button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <button 
              onClick={onOpenWhatsAppConcierge}
              className="hidden lg:flex items-center gap-1.5 text-xs tracking-wider uppercase border border-[#D5CEBE] px-3 py-1.5 rounded-sm hover:border-[#25D366] hover:text-[#25D366] transition-all cursor-pointer font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </button>

            {/* Bag Icon with count badge */}
            <button 
              onClick={onOpenCart} 
              className="relative p-1.5 hover:text-[#B89758] transition-colors cursor-pointer flex items-center"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
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
        <div className="md:hidden bg-[#F3EFE6] border-b border-[#E0D9CB] px-6 py-5 transition-all">
          <nav className="flex flex-col gap-3 text-xs tracking-widest uppercase">
            <button 
              onClick={() => { onNavigateSection('collection'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#E6E0D2] text-[#1C1A17]"
            >
              The Collection
            </button>
            <button 
              onClick={() => { onNavigateSection('emirati-craft'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#E6E0D2] text-[#B89758] font-bold flex items-center justify-between"
            >
              <span>🇦🇪 Made in UAE</span>
              <span className="text-[10px] bg-[#B89758]/15 text-[#8C6D32] px-2 py-0.5 rounded">Spotlight</span>
            </button>
            <button 
              onClick={() => { onNavigateSection('rare-imports'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#E6E0D2] text-[#1C1A17]"
            >
              Rare Imports
            </button>
            <button 
              onClick={() => { onNavigateSection('spaces'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#E6E0D2] text-[#1C1A17]"
            >
              Spaces In Situ
            </button>
            
            <button
              onClick={() => { onOpenWhatsAppConcierge(); setMobileMenuOpen(false); }}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-sm font-semibold tracking-wider text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact via WhatsApp</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
