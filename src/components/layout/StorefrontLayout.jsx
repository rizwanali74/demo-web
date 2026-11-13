import { Outlet, useLocation } from 'react-router-dom';
import { useStore } from '../../hooks/useStore';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../modals/CartDrawer';
import WhatsAppOrderModal from '../modals/WhatsAppOrderModal';
import ToastBanner from '../common/ToastBanner';

export default function StorefrontLayout() {
  const location = useLocation();
  const {
    categories,
    studioInfo,
    cart,
    activeCurrency,
    setActiveCurrency,
    searchQuery,
    setSearchQuery,
    whatsAppState,
    cartOpen,
    setCartOpen,
    cartBounce,
    flyingItem,
    formatPrice,
    navigateHome,
    navigateShop,
    navigateContact,
    navigateTrackOrder,
    navigatePrivacyPolicy,
    navigateAdmin,
    updateCartQuantity,
    removeFromCart,
    startCartCheckout,
    openWhatsAppOrder,
    closeWhatsAppOrder,
    openCartWhatsApp
  } = useStore();

  const currentPageKey = location.pathname.startsWith('/shop')
    ? 'shop'
    : location.pathname.startsWith('/contact')
      ? 'contact'
      : location.pathname.startsWith('/track-order')
        ? 'track-order'
        : location.pathname.startsWith('/product')
          ? 'product'
          : 'home';

  const handleFooterNavigate = (sectionId) => {
    if (sectionId === 'contact-custom') {
      navigateContact();
    } else if (sectionId === 'track-order') {
      navigateTrackOrder();
    } else if (sectionId === 'privacy-policy') {
      navigatePrivacyPolicy();
    } else {
      navigateHome();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#141414] flex flex-col font-sans selection:bg-[#141414] selection:text-white">
      <ToastBanner offsetClass="top-24" />

      {/* Floating Product-to-Bag Animation */}
      {flyingItem && (
        <div
          className="fixed z-[120] pointer-events-none w-12 h-14 rounded-sm overflow-hidden border-2 border-[#8C7A58] shadow-xl bg-white"
          style={{
            left: `${flyingItem.fromX}px`,
            top: `${flyingItem.fromY}px`,
            transform: flyingItem.active
              ? `translate3d(${flyingItem.dx}px, ${flyingItem.dy}px, 0) scale(0.25)`
              : 'translate3d(0, 0, 0) scale(1)',
            opacity: flyingItem.active ? 0.25 : 1,
            transition: 'transform 620ms cubic-bezier(0.22, 1, 0.36, 1), opacity 620ms ease'
          }}
        >
          <img src={flyingItem.image} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <Header
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        cartBounce={cartBounce}
        onOpenCart={() => setCartOpen(true)}
        activeCurrency={activeCurrency}
        onChangeCurrency={setActiveCurrency}
        onNavigateHome={navigateHome}
        onNavigateShop={navigateShop}
        onNavigateContact={navigateContact}
        onNavigateTrackOrder={() => navigateTrackOrder()}
        onNavigateAdmin={navigateAdmin}
        categories={categories}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        currentPage={currentPageKey}
      />

      <Outlet />

      <Footer
        onOpenWhatsAppConcierge={() => openWhatsAppOrder(null)}
        onNavigateSection={handleFooterNavigate}
        studioInfo={studioInfo}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        formatPrice={formatPrice}
        onApplePayCheckout={startCartCheckout}
        onWhatsAppCheckout={openCartWhatsApp}
      />

      {whatsAppState.isOpen && (
        <WhatsAppOrderModal
          product={whatsAppState.product}
          formatPrice={formatPrice}
          onClose={closeWhatsAppOrder}
        />
      )}
    </div>
  );
}

