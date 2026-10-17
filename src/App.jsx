import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EmiratiCraftManifesto from './components/EmiratiCraftManifesto';
import CatalogSection from './components/CatalogSection';
import SpacesInteractive from './components/SpacesInteractive';
import WhiteGloveDeliverySection from './components/WhiteGloveDeliverySection';
import ProductDetailModal from './components/ProductDetailModal';
import ApplePayModal from './components/ApplePayModal';
import WhatsAppOrderModal from './components/WhatsAppOrderModal';
import CartDrawer from './components/CartDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';
import { CheckCircle2, MessageCircle } from 'lucide-react';

export default function App() {
  // State
  const [products] = useState(PRODUCTS);
  const [cart, setCart] = useState([
    // Pre-populate with one iconic piece for instant demo visual!
    { ...PRODUCTS[1], quantity: 1 } // Dhafra Sculptural Vessel
  ]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCurrency, setActiveCurrency] = useState('AED');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [applePayState, setApplePayState] = useState({ isOpen: false, orderItem: null, totalAED: null });
  const [whatsAppState, setWhatsAppState] = useState({ isOpen: false, product: null });
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Currency Converter
  const formatPrice = (priceAED) => {
    if (activeCurrency === 'USD') {
      const usd = Math.round(priceAED / 3.6725);
      return `$${usd.toLocaleString()}`;
    }
    if (activeCurrency === 'EUR') {
      const eur = Math.round(priceAED / 3.98);
      return `€${eur.toLocaleString()}`;
    }
    return `AED ${priceAED.toLocaleString()}`;
  };

  // Toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to your bag`);
  };

  const handleUpdateQuantity = (productId, newQty) => {
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQty } : item
    ));
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Piece removed from your bag');
  };

  // Navigation Smooth Scroll
  const handleNavigateSection = (sectionId) => {
    if (sectionId === 'rare-imports') {
      setActiveFilter('imports');
      const el = document.getElementById('collection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (sectionId === 'emirati-craft') {
      const el = document.getElementById('emirati-craft');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Trigger Apple Pay for single product
  const handleDirectApplePay = (product) => {
    setQuickViewProduct(null);
    setApplePayState({ isOpen: true, orderItem: product, totalAED: product.priceAED });
  };

  // Trigger Apple Pay for entire cart
  const handleCartApplePay = (subtotalAED) => {
    setCartOpen(false);
    setApplePayState({ isOpen: true, orderItem: null, totalAED: subtotalAED });
  };

  // Trigger WhatsApp order for single product
  const handleWhatsAppOrder = (product) => {
    setQuickViewProduct(null);
    setWhatsAppState({ isOpen: true, product });
  };

  // Trigger WhatsApp order for entire cart
  const handleCartWhatsApp = () => {
    setCartOpen(false);
    const subtotalAED = cart.reduce((acc, item) => acc + (item.priceAED * item.quantity), 0);
    const itemsText = cart.map(item => `• ${item.name} (${item.quantity}x) - AED ${(item.priceAED * item.quantity).toLocaleString()}`).join('\n');
    
    const message = `السلام عليكم ورحمة الله وبركاته
Hello AL-ATHAR Concierge,

I would like to place an order for the items in my collection bag:

${itemsText}

Estimated Total: AED ${subtotalAED.toLocaleString()}
Delivery: UAE White Glove Delivery

Please confirm availability and coordinate delivery schedule.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/971508821971?text=${encoded}`, '_blank');
  };

  // Quick View by ID (used by Mood Board)
  const handleQuickViewById = (productId) => {
    const found = products.find(p => p.id === productId);
    if (found) setQuickViewProduct(found);
  };

  const handleApplePayById = (productId) => {
    const found = products.find(p => p.id === productId);
    if (found) handleDirectApplePay(found);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1C1A17] flex flex-col font-sans selection:bg-[#B89758]/20 selection:text-[#1C1A17]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#1C1A17] text-[#FAF8F5] text-xs py-3 px-4 rounded-sm shadow-2xl flex items-center gap-2.5 border border-white/10 animate-slideLeft">
          <CheckCircle2 className="w-4 h-4 text-[#30D158]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        activeCurrency={activeCurrency}
        onChangeCurrency={setActiveCurrency}
        onOpenWhatsAppConcierge={() => setWhatsAppState({ isOpen: true, product: null })}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onNavigateSection={handleNavigateSection}
      />

      {/* Hero Editorial Banner */}
      <Hero
        onExploreCollection={() => handleNavigateSection('collection')}
        onExploreEmirati={() => handleNavigateSection('emirati-craft')}
        onOpenWhatsAppConcierge={() => setWhatsAppState({ isOpen: true, product: null })}
      />

      {/* Core UAE Identity & Craftsmanship Spotlight */}
      <EmiratiCraftManifesto
        onFilterUAEHandmade={() => {
          setActiveFilter('uae');
          handleNavigateSection('collection');
        }}
      />

      {/* Curated Product Catalogue */}
      <CatalogSection
        products={products}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        formatPrice={formatPrice}
        onQuickView={setQuickViewProduct}
        onApplePayDirect={handleDirectApplePay}
        onWhatsAppOrder={handleWhatsAppOrder}
        onAddToCart={handleAddToCart}
      />

      {/* Spaces In Situ / Interactive Mood Board */}
      <SpacesInteractive
        onQuickViewById={handleQuickViewById}
        onApplePayById={handleApplePayById}
        formatPrice={formatPrice}
      />

      {/* White Glove UAE Delivery & Ordering Flow */}
      <WhiteGloveDeliverySection
        onOpenWhatsAppConcierge={() => setWhatsAppState({ isOpen: true, product: null })}
      />

      {/* Footer */}
      <Footer
        onOpenWhatsAppConcierge={() => setWhatsAppState({ isOpen: true, product: null })}
        onNavigateSection={handleNavigateSection}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp
        onOpenConcierge={() => setWhatsAppState({ isOpen: true, product: null })}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        formatPrice={formatPrice}
        onApplePayCheckout={handleCartApplePay}
        onWhatsAppCheckout={handleCartWhatsApp}
      />

      {/* Product Quick View Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          formatPrice={formatPrice}
          onApplePay={handleDirectApplePay}
          onWhatsAppOrder={handleWhatsAppOrder}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Apple Pay Sheet Modal */}
      {applePayState.isOpen && (
        <ApplePayModal
          orderItem={applePayState.orderItem}
          cartItems={applePayState.orderItem ? null : cart}
          totalAED={applePayState.totalAED}
          formatPrice={formatPrice}
          onClose={() => setApplePayState({ isOpen: false, orderItem: null, totalAED: null })}
          onOrderSuccess={(orderData) => {
            showToast(`Order #${orderData.orderId} placed via Apple Pay!`);
            // Clear cart if paying for cart
            if (!applePayState.orderItem) setCart([]);
          }}
        />
      )}

      {/* Direct WhatsApp Order Modal */}
      {whatsAppState.isOpen && (
        <WhatsAppOrderModal
          product={whatsAppState.product}
          formatPrice={formatPrice}
          onClose={() => setWhatsAppState({ isOpen: false, product: null })}
        />
      )}

    </div>
  );
}
