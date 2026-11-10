import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CatalogSection from './components/CatalogSection';
import CustomFurnitureContactSection from './components/CustomFurnitureContactSection';
import ShopPage from './components/ShopPage';
import ContactPage from './components/ContactPage';
import ProductDetailPage from './components/ProductDetailPage';
import ApplePayModal from './components/ApplePayModal';
import WhatsAppOrderModal from './components/WhatsAppOrderModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import defaultData from './data/data.json';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Page Routing State: 'home' | 'shop' | 'contact' | 'product'
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Products and Cart
  const [products, setProducts] = useState(defaultData.products);
  const [cart, setCart] = useState([
    { ...defaultData.products[0], quantity: 1, selectedColor: defaultData.products[0].colors?.[0]?.name }
  ]);
  const [activeCurrency, setActiveCurrency] = useState('AED');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [applePayState, setApplePayState] = useState({ isOpen: false, orderItem: null, totalAED: null });
  const [whatsAppState, setWhatsAppState] = useState({ isOpen: false, product: null });
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch from data.json (or later your production API URL)
  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await fetch('/data.json');
        if (res.ok) {
          const json = await res.json();
          if (json.products && json.products.length > 0) {
            setProducts(json.products);
          }
        }
      } catch (err) {
        console.info('Loaded fallback local catalog data:', err);
      }
    }
    loadCatalog();
  }, []);

  // Hash-based routing for browser back/forward and deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/product/')) {
        const prodId = hash.replace('#/product/', '');
        const found = products.find(p => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
          setCurrentPage('product');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      if (hash.startsWith('#/shop')) {
        const parts = hash.split('/');
        const cat = parts[2] || 'all';
        setSelectedCategory(cat);
        setCurrentPage('shop');
        setSelectedProduct(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#/contact') {
        setCurrentPage('contact');
        setSelectedProduct(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      // Default to home
      setCurrentPage('home');
      setSelectedProduct(null);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [products]);

  // Navigation Handlers
  const handleNavigateHome = () => {
    setCurrentPage('home');
    setSelectedProduct(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateShop = (catId = 'all') => {
    setSelectedCategory(catId);
    setCurrentPage('shop');
    setSelectedProduct(null);
    window.location.hash = `#/shop/${catId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateContact = () => {
    setCurrentPage('contact');
    setSelectedProduct(null);
    window.location.hash = '#/contact';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductPage = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.location.hash = `#/product/${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Currency Converter
  const formatPrice = (priceAED) => {
    if (!priceAED) return 'AED 0';
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
  const handleAddToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === product.selectedColor);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedColor === product.selectedColor) 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added "${product.name}" to your bag`);
    setCartOpen(true);
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

  // Trigger Apple Pay for single product
  const handleDirectApplePay = (product) => {
    setApplePayState({ isOpen: true, orderItem: product, totalAED: product.priceAED });
  };

  // Trigger Apple Pay for entire cart
  const handleCartApplePay = (subtotalAED) => {
    setCartOpen(false);
    setApplePayState({ isOpen: true, orderItem: null, totalAED: subtotalAED });
  };

  // Trigger WhatsApp order for single product
  const handleWhatsAppOrder = (product) => {
    setWhatsAppState({ isOpen: true, product });
  };

  // Trigger WhatsApp order for entire cart
  const handleCartWhatsApp = () => {
    setCartOpen(false);
    const subtotalAED = cart.reduce((acc, item) => acc + (item.priceAED * item.quantity), 0);
    const itemsText = cart.map(item => `• ${item.name} (${item.quantity}x${item.selectedColor ? `, Finish: ${item.selectedColor}` : ''}) - AED ${(item.priceAED * item.quantity).toLocaleString()}`).join('\n');
    
    const message = `السلام عليكم ورحمة الله وبركاته
Hello HUJRAH // حجره Concierge,

I would like to place an order for the pieces in my shopping bag:

${itemsText}

Estimated Subtotal: AED ${subtotalAED.toLocaleString()}
Delivery: UAE White Glove Room Placement

Please confirm stock availability and coordinate private delivery schedule.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/971501234567?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#141414] flex flex-col font-sans selection:bg-[#141414] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#141414] text-white text-xs py-3 px-4 rounded-full shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3 NAVITEMS NAVBAR: HOME, SHOP (with categories dropdown), CONTACT US */}
      <Header
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        activeCurrency={activeCurrency}
        onChangeCurrency={setActiveCurrency}
        onNavigateHome={handleNavigateHome}
        onNavigateShop={handleNavigateShop}
        onNavigateContact={handleNavigateContact}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        currentPage={currentPage}
      />

      {/* VIEW ROUTING */}
      {currentPage === 'product' && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          allProducts={products}
          onBack={handleNavigateHome}
          onSelectProduct={handleOpenProductPage}
          formatPrice={formatPrice}
          onAddToCart={handleAddToCart}
          onApplePay={handleDirectApplePay}
          onWhatsAppOrder={handleWhatsAppOrder}
        />
      )}

      {currentPage === 'shop' && (
        <ShopPage
          products={products}
          initialCategory={selectedCategory}
          onBackToHome={handleNavigateHome}
          onOpenProductPage={handleOpenProductPage}
          formatPrice={formatPrice}
        />
      )}

      {currentPage === 'contact' && (
        <ContactPage
          onBackToHome={handleNavigateHome}
          onOpenWhatsAppConcierge={() => setWhatsAppState({ isOpen: true, product: null })}
        />
      )}

      {currentPage === 'home' && (
        <>
          {/* Hero Editorial Banner */}
          <Hero
            onExploreCollection={() => handleNavigateShop('all')}
            onOpenWhatsAppConcierge={() => setWhatsAppState({ isOpen: true, product: null })}
          />

          {/* Clean Catalog Preview: Only Image, Name & Price */}
          <CatalogSection
            products={products}
            activeFilter="all"
            setActiveFilter={handleNavigateShop}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            formatPrice={formatPrice}
            onOpenProductPage={handleOpenProductPage}
          />

          {/* Contact Section: Crafted Just For You / CONTACT US (matching Forma Object image) */}
          <CustomFurnitureContactSection
            onOpenWhatsAppConcierge={handleNavigateContact}
          />
        </>
      )}

      {/* Minimal Clean White Footer (matching Forma Object image) */}
      <Footer
        onOpenWhatsAppConcierge={() => setWhatsAppState({ isOpen: true, product: null })}
        onNavigateSection={(sectionId) => {
          if (sectionId === 'contact-custom') {
            handleNavigateContact();
          } else {
            handleNavigateHome();
          }
        }}
      />

      {/* Shopping Bag Slide-Over Drawer */}
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
