import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import CatalogSection from './components/home/CatalogSection';
import CustomFurnitureContactSection from './components/home/CustomFurnitureContactSection';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOverviewTab from './pages/admin/AdminOverviewTab';
import AdminProductsTab from './pages/admin/AdminProductsTab';
import AdminAddProductPage from './pages/admin/AdminAddProductPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminOrdersTab from './pages/admin/AdminOrdersTab';
import AdminContactTab from './pages/admin/AdminContactTab';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import ApplePayModal from './components/modals/ApplePayModal';
import WhatsAppOrderModal from './components/modals/WhatsAppOrderModal';
import CartDrawer from './components/modals/CartDrawer';
import defaultData from './data/data.json';
import {
  INITIAL_ORDERS,
  INITIAL_INQUIRIES,
  INITIAL_STUDIO_INFO
} from './data/adminMockData';
import { CheckCircle2 } from 'lucide-react';

function ShopRouteWrapper({ products, categories, onBackToHome, onOpenProductPage, formatPrice }) {
  const { category } = useParams();
  return (
    <ShopPage
      products={products}
      categories={categories}
      initialCategory={category || 'all'}
      onBackToHome={onBackToHome}
      onOpenProductPage={onOpenProductPage}
      formatPrice={formatPrice}
    />
  );
}

function ProductDetailRouteWrapper({
  products,
  onBack,
  onSelectProduct,
  formatPrice,
  onAddToCart,
  onApplePay,
  onWhatsAppOrder
}) {
  const { productId } = useParams();
  const product = products.find(p => p.id === productId);
  if (!product) {
    return <Navigate to="/shop/all" replace />;
  }
  return (
    <ProductDetailPage
      product={product}
      allProducts={products}
      onBack={onBack}
      onSelectProduct={onSelectProduct}
      formatPrice={formatPrice}
      onAddToCart={onAddToCart}
      onApplePay={onApplePay}
      onWhatsAppOrder={onWhatsAppOrder}
    />
  );
}

function TrackOrderRouteWrapper({ orders, studioInfo, formatPrice, onBackToHome }) {
  const { orderId } = useParams();
  return (
    <TrackOrderPage
      key={orderId || 'default'}
      orders={orders}
      initialTrackingId={orderId || ''}
      studioInfo={studioInfo}
      formatPrice={formatPrice}
      onBackToHome={onBackToHome}
    />
  );
}

function AdminEditProductRoute({
  products,
  categories,
  onSaveProduct,
  onCancel,
  formatPrice
}) {
  const { productId } = useParams();
  const product = products.find(p => p.id === productId);
  if (!product) {
    return <Navigate to="/admin/products" replace />;
  }
  return (
    <AdminAddProductPage
      categories={categories}
      initialProduct={product}
      totalProductsCount={products.length}
      onSaveProduct={onSaveProduct}
      onCancel={onCancel}
      formatPrice={formatPrice}
    />
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Storefront & Admin Shared State (Frontend-only, API-Ready)
  const [products, setProducts] = useState(defaultData.products);
  const [categories, setCategories] = useState(() =>
    (defaultData.categories || []).filter(c => c.id !== 'all')
  );
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [studioInfo, setStudioInfo] = useState(INITIAL_STUDIO_INFO);

  // SuperAdmin Auth State (persisted in localStorage; replace with backend session/JWT later)
  const [superAdmin, setSuperAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('hujrah_superadmin_auth');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [cart, setCart] = useState([
    { ...defaultData.products[0], quantity: 1, selectedColor: defaultData.products[0].colors?.[0]?.name }
  ]);
  const [activeCurrency, setActiveCurrency] = useState('AED');
  const [searchQuery, setSearchQuery] = useState('');

  // Checkout, Modals & Drawers
  const [checkoutState, setCheckoutState] = useState({ items: null, paymentMethod: 'Apple Pay' });
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
          if (json.categories && json.categories.length > 0) {
            setCategories(json.categories.filter(c => c.id !== 'all'));
          }
        }
      } catch (err) {
        console.info('Loaded fallback local catalog data:', err);
      }
    }
    loadCatalog();
  }, []);

  // Navigation Handlers
  const handleNavigateHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateShop = (catId = 'all') => {
    navigate(`/shop/${catId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateContact = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTrackOrder = (orderId = '') => {
    navigate(orderId ? `/track-order/${orderId}` : '/track-order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAdmin = () => {
    navigate(superAdmin ? '/admin' : '/admin/login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuperAdmin = (adminUser) => {
    setSuperAdmin(adminUser);
    try {
      localStorage.setItem('hujrah_superadmin_auth', JSON.stringify(adminUser));
    } catch {
      // Ignore storage errors
    }
    showToast(`Signed in as ${adminUser.name}`);
  };

  const handleLogoutSuperAdmin = () => {
    setSuperAdmin(null);
    try {
      localStorage.removeItem('hujrah_superadmin_auth');
    } catch {
      // Ignore storage errors
    }
    navigate('/admin/login', { replace: true });
    showToast('Signed out of SuperAdmin');
  };

  const handleOpenProductPage = (product) => {
    navigate(`/product/${product.id}`);
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

  // Admin: Product CRUD Handlers
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added "${newProduct.name}" to catalog`);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    showToast(`Updated "${updatedProduct.name}"`);
  };

  const handleDeleteProduct = (productId) => {
    const target = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast(target ? `Removed "${target.name}"` : 'Product deleted');
  };

  const handleSaveProductFromAdmin = (payload, isEdit) => {
    if (isEdit) {
      handleUpdateProduct(payload);
    } else {
      handleAddProduct(payload);
    }
    navigate('/admin/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin: Category CRUD Handlers
  const handleAddCategory = (newCategory) => {
    setCategories(prev => [...prev, newCategory]);
    showToast(`Created category "${newCategory.name}"`);
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCategories(prev => prev.map(c => (c.id === updatedCategory.id ? updatedCategory : c)));
    setProducts(prev =>
      prev.map(p => (p.category === updatedCategory.id ? { ...p, categoryName: updatedCategory.name } : p))
    );
    showToast(`Updated category "${updatedCategory.name}"`);
  };

  const handleDeleteCategory = (categoryId) => {
    const target = categories.find(c => c.id === categoryId);
    setCategories(prev => prev.filter(c => c.id !== categoryId));
    showToast(target ? `Deleted category "${target.name}"` : 'Category deleted');
  };

  // Admin: Order Status Handler
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)));
    showToast(`Order #${orderId} marked as ${newStatus}`);
  };

  // Admin & Storefront: Contact / Inquiry Handlers
  const handleSubmitInquiry = (inquiryData) => {
    const newInq = {
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      ...inquiryData
    };
    setInquiries(prev => [newInq, ...prev]);
    showToast('Inquiry received! Our design team will respond within 2 hours.');
  };

  const handleUpdateInquiryStatus = (inqId, newStatus) => {
    setInquiries(prev => prev.map(i => (i.id === inqId ? { ...i, status: newStatus } : i)));
    showToast(`Inquiry status updated to ${newStatus}`);
  };

  const handleDeleteInquiry = (inqId) => {
    setInquiries(prev => prev.filter(i => i.id !== inqId));
    showToast('Inquiry removed');
  };

  const handleUpdateStudioInfo = (updatedInfo) => {
    setStudioInfo(updatedInfo);
    showToast('Studio contact information saved');
  };

  // Direct Apple Pay & UAE COD Checkout Page & WhatsApp Checkout
  const handleDirectApplePay = (product, method = 'Apple Pay') => {
    setCheckoutState({ items: [product], paymentMethod: method });
    navigate('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCartApplePay = (_totalAED, method = 'Apple Pay') => {
    setCartOpen(false);
    setCheckoutState({ items: null, paymentMethod: method });
    navigate('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppOrder = (product) => {
    setWhatsAppState({ isOpen: true, product });
  };

  const handleCartWhatsApp = (cartItems, subtotalAED) => {
    const itemsText = cartItems
      .map(i => `• ${i.name} (Qty: ${i.quantity}${i.selectedColor ? `, ${i.selectedColor}` : ''}) - ${formatPrice(i.priceAED * i.quantity)}`)
      .join('\n');

    const message = `Hello HUJRAH // حجره Studio,
I would like to place an order for my selected pieces:

${itemsText}

Estimated Subtotal: AED ${subtotalAED.toLocaleString()}
Delivery: UAE White Glove Room Placement

Please confirm stock availability and coordinate private delivery schedule.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${studioInfo.whatsappNumber || '971501234567'}?text=${encoded}`, '_blank');
  };

  const isAdminRoute = location.pathname.startsWith('/admin');
  const currentPageKey = location.pathname.startsWith('/shop')
    ? 'shop'
    : location.pathname.startsWith('/contact')
      ? 'contact'
      : location.pathname.startsWith('/track-order')
        ? 'track-order'
        : location.pathname.startsWith('/product')
          ? 'product'
          : 'home';

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#141414] flex flex-col font-sans selection:bg-[#141414] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed ${isAdminRoute ? 'top-20' : 'top-24'} right-6 z-[110] bg-[#141414] text-white text-xs py-3 px-4 rounded-full shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fadeIn`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Storefront Header (hidden on /admin routes) */}
      {!isAdminRoute && (
        <Header
          cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
          onOpenCart={() => setCartOpen(true)}
          activeCurrency={activeCurrency}
          onChangeCurrency={setActiveCurrency}
          onNavigateHome={handleNavigateHome}
          onNavigateShop={handleNavigateShop}
          onNavigateContact={handleNavigateContact}
          onNavigateTrackOrder={() => handleNavigateTrackOrder()}
          onNavigateAdmin={handleNavigateAdmin}
          categories={categories}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          currentPage={currentPageKey}
        />
      )}

      {/* Application Routes */}
      <Routes>
        {/* Storefront Routes */}
        <Route
          path="/"
          element={
            <>
              <Hero
                onExploreCollection={() => handleNavigateShop('all')}
                onOpenWhatsAppConcierge={() => setWhatsAppState({ isOpen: true, product: null })}
              />
              <CatalogSection
                products={products}
                activeFilter="all"
                setActiveFilter={handleNavigateShop}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                formatPrice={formatPrice}
                onOpenProductPage={handleOpenProductPage}
              />
              <CustomFurnitureContactSection
                onOpenWhatsAppConcierge={handleNavigateContact}
              />
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <ShopRouteWrapper
              products={products}
              categories={categories}
              onBackToHome={handleNavigateHome}
              onOpenProductPage={handleOpenProductPage}
              formatPrice={formatPrice}
            />
          }
        />
        <Route
          path="/shop/:category"
          element={
            <ShopRouteWrapper
              products={products}
              categories={categories}
              onBackToHome={handleNavigateHome}
              onOpenProductPage={handleOpenProductPage}
              formatPrice={formatPrice}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={
            <ProductDetailRouteWrapper
              products={products}
              onBack={handleNavigateHome}
              onSelectProduct={handleOpenProductPage}
              formatPrice={formatPrice}
              onAddToCart={handleAddToCart}
              onApplePay={handleDirectApplePay}
              onWhatsAppOrder={handleWhatsAppOrder}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <ContactPage
              onBackToHome={handleNavigateHome}
              onOpenWhatsAppConcierge={() => setWhatsAppState({ isOpen: true, product: null })}
              studioInfo={studioInfo}
              onSubmitInquiry={handleSubmitInquiry}
            />
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PrivacyPolicyPage
              onBackToHome={handleNavigateHome}
              studioInfo={studioInfo}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              items={checkoutState.items || cart}
              initialPaymentMethod={checkoutState.paymentMethod}
              freeDeliveryThresholdAED={studioInfo.freeDeliveryThresholdAED || 1500}
              formatPrice={formatPrice}
              onBack={handleNavigateHome}
              onTrackOrder={(orderId) => handleNavigateTrackOrder(orderId)}
              onCompleteOrder={(orderData) => {
                const newOrder = {
                  id: orderData.orderId,
                  createdAt: new Date().toISOString(),
                  customerName: orderData.name,
                  customerPhone: orderData.phone,
                  customerEmail: orderData.email || '',
                  address: orderData.address,
                  city: orderData.city,
                  paymentMethod: orderData.paymentMethod,
                  status: 'Confirmed',
                  notes: orderData.notes || '',
                  totalAED: orderData.totalAED,
                  items: orderData.items || []
                };
                setOrders(prev => [newOrder, ...prev]);
                showToast(`Order #${orderData.orderId} confirmed via ${orderData.paymentMethod}!`);
                if (!checkoutState.items) setCart([]);
              }}
            />
          }
        />
        <Route
          path="/track-order"
          element={
            <TrackOrderRouteWrapper
              orders={orders}
              studioInfo={studioInfo}
              formatPrice={formatPrice}
              onBackToHome={handleNavigateHome}
            />
          }
        />
        <Route
          path="/track-order/:orderId"
          element={
            <TrackOrderRouteWrapper
              orders={orders}
              studioInfo={studioInfo}
              formatPrice={formatPrice}
              onBackToHome={handleNavigateHome}
            />
          }
        />

        {/* SuperAdmin Login Route */}
        <Route
          path="/admin/login"
          element={
            <AdminLoginPage
              isAuthenticated={Boolean(superAdmin)}
              onLogin={handleLoginSuperAdmin}
            />
          }
        />

        {/* Protected SuperAdmin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute isAuthenticated={Boolean(superAdmin)}>
              <AdminDashboard
                productsCount={products.length}
                categoriesCount={categories.length}
                orders={orders}
                inquiries={inquiries}
                superAdmin={superAdmin}
                onLogout={handleLogoutSuperAdmin}
              />
            </ProtectedAdminRoute>
          }
        >
          <Route
            index
            element={
              <AdminOverviewTab
                products={products}
                categories={categories}
                orders={orders}
                inquiries={inquiries}
                formatPrice={formatPrice}
                onSwitchTab={(tab) => navigate(`/admin/${tab}`)}
              />
            }
          />
          <Route
            path="products"
            element={
              <AdminProductsTab
                products={products}
                categories={categories}
                onOpenAddProduct={() => navigate('/admin/products/new')}
                onOpenEditProduct={(product) => navigate(`/admin/products/edit/${product.id}`)}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                formatPrice={formatPrice}
              />
            }
          />
          <Route
            path="products/new"
            element={
              <AdminAddProductPage
                categories={categories}
                initialProduct={null}
                totalProductsCount={products.length}
                onSaveProduct={handleSaveProductFromAdmin}
                onCancel={() => navigate('/admin/products')}
                formatPrice={formatPrice}
              />
            }
          />
          <Route
            path="products/edit/:productId"
            element={
              <AdminEditProductRoute
                products={products}
                categories={categories}
                onSaveProduct={handleSaveProductFromAdmin}
                onCancel={() => navigate('/admin/products')}
                formatPrice={formatPrice}
              />
            }
          />
          <Route
            path="categories"
            element={
              <AdminCategoriesPage
                categories={categories}
                products={products}
                onAddCategory={handleAddCategory}
                onUpdateCategory={handleUpdateCategory}
                onDeleteCategory={handleDeleteCategory}
              />
            }
          />
          <Route
            path="orders"
            element={
              <AdminOrdersTab
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                formatPrice={formatPrice}
              />
            }
          />
          <Route
            path="contact"
            element={
              <AdminContactTab
                inquiries={inquiries}
                onUpdateInquiryStatus={handleUpdateInquiryStatus}
                onDeleteInquiry={handleDeleteInquiry}
                studioInfo={studioInfo}
                onUpdateStudioInfo={handleUpdateStudioInfo}
              />
            }
          />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Storefront Footer & Checkout Modals (hidden on /admin routes) */}
      {!isAdminRoute && (
        <>
          <Footer
            onOpenWhatsAppConcierge={() => setWhatsAppState({ isOpen: true, product: null })}
            onNavigateSection={(sectionId) => {
              if (sectionId === 'contact-custom') {
                handleNavigateContact();
              } else if (sectionId === 'track-order') {
                handleNavigateTrackOrder();
              } else if (sectionId === 'privacy-policy') {
                navigate('/privacy-policy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                handleNavigateHome();
              }
            }}
            studioInfo={studioInfo}
          />

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

          {applePayState.isOpen && (
            <ApplePayModal
              orderItem={applePayState.orderItem}
              cartItems={applePayState.orderItem ? null : cart}
              totalAED={applePayState.totalAED}
              formatPrice={formatPrice}
              onClose={() => setApplePayState({ isOpen: false, orderItem: null, totalAED: null })}
              onOrderSuccess={(orderData) => {
                const newOrder = {
                  id: orderData.orderId,
                  createdAt: new Date().toISOString(),
                  customerName: orderData.name,
                  customerPhone: orderData.phone,
                  customerEmail: '',
                  address: orderData.address,
                  city: orderData.address.split(',').slice(-2, -1)[0]?.trim() || 'Dubai',
                  paymentMethod: orderData.paymentMethod || 'Apple Pay',
                  status: 'Confirmed',
                  notes: '',
                  totalAED: orderData.totalAED,
                  items: orderData.items || []
                };
                setOrders(prev => [newOrder, ...prev]);
                showToast(`Order #${orderData.orderId} placed via Apple Pay!`);
                if (!applePayState.orderItem) setCart([]);
              }}
            />
          )}

          {whatsAppState.isOpen && (
            <WhatsAppOrderModal
              product={whatsAppState.product}
              formatPrice={formatPrice}
              onClose={() => setWhatsAppState({ isOpen: false, product: null })}
            />
          )}
        </>
      )}
    </div>
  );
}
