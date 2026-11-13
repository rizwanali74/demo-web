import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from './StoreContextValue';
import defaultData from '../data/data.json';
import {
  INITIAL_ORDERS,
  INITIAL_INQUIRIES,
  INITIAL_STUDIO_INFO
} from '../data/adminMockData';

const SUPERADMIN_STORAGE_KEY = 'hujrah_superadmin_auth';

export default function StoreProvider({ children }) {
  const navigate = useNavigate();

  // Storefront & Admin Shared State
  const [products, setProducts] = useState(defaultData.products);
  const [categories, setCategories] = useState(
    (defaultData.categories || []).filter(c => c.id !== 'all')
  );
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [studioInfo, setStudioInfo] = useState(INITIAL_STUDIO_INFO);
  const [superAdmin, setSuperAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem(SUPERADMIN_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [cart, setCart] = useState([
    {
      ...defaultData.products[0],
      quantity: 1,
      selectedColor: defaultData.products[0].colors?.[0]?.name
    }
  ]);
  const [activeCurrency, setActiveCurrency] = useState('AED');
  const [searchQuery, setSearchQuery] = useState('');

  // Checkout, Modals & Drawers
  const [checkoutState, setCheckoutState] = useState({
    items: null,
    paymentMethod: 'Apple Pay'
  });
  const [whatsAppState, setWhatsAppState] = useState({
    isOpen: false,
    product: null
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [flyingItem, setFlyingItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch catalog from /data.json (or future API endpoint)
  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await fetch('/data.json');
        if (res.ok) {
          const json = await res.json();
          if (json.products?.length > 0) {
            setProducts(json.products);
          }
          if (json.categories?.length > 0) {
            setCategories(json.categories.filter(c => c.id !== 'all'));
          }
        }
      } catch (err) {
        console.info('Loaded fallback local catalog data:', err);
      }
    }
    loadCatalog();
  }, []);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // Navigation Helpers
  const navigateHome = useCallback(() => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const navigateShop = useCallback((catId = 'all') => {
    navigate(`/shop/${catId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const navigateContact = useCallback(() => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const navigateTrackOrder = useCallback((orderId = '') => {
    navigate(orderId ? `/track-order/${orderId}` : '/track-order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const navigatePrivacyPolicy = useCallback(() => {
    navigate('/privacy-policy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const navigateProduct = useCallback((product) => {
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const navigateAdmin = useCallback(() => {
    navigate(superAdmin ? '/admin' : '/admin/login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate, superAdmin]);

  // SuperAdmin Auth
  const loginSuperAdmin = useCallback((adminUser) => {
    setSuperAdmin(adminUser);
    try {
      localStorage.setItem(SUPERADMIN_STORAGE_KEY, JSON.stringify(adminUser));
    } catch {
      // Ignore storage errors
    }
    showToast(`Signed in as ${adminUser.name}`);
  }, [showToast]);

  const logoutSuperAdmin = useCallback(() => {
    setSuperAdmin(null);
    try {
      localStorage.removeItem(SUPERADMIN_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    navigate('/admin/login', { replace: true });
    showToast('Signed out of SuperAdmin');
  }, [navigate, showToast]);

  // Currency Converter
  const formatPrice = useCallback((priceAED) => {
    if (!priceAED) return 'AED 0';
    if (activeCurrency === 'USD') {
      return `$${Math.round(priceAED / 3.6725).toLocaleString()}`;
    }
    if (activeCurrency === 'EUR') {
      return `€${Math.round(priceAED / 3.98).toLocaleString()}`;
    }
    return `AED ${priceAED.toLocaleString()}`;
  }, [activeCurrency]);

  // Cart Operations (floating animation to navbar bag; drawer opens only on navbar click)
  const addToCart = useCallback((product, quantity = 1, sourceRect = null) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.selectedColor === product.selectedColor
      );
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    const cartEl = document.getElementById('navbar-cart-icon');
    const targetRect = cartEl ? cartEl.getBoundingClientRect() : null;

    if (targetRect) {
      const fromX = sourceRect ? sourceRect.left + sourceRect.width / 2 - 24 : window.innerWidth / 2 - 24;
      const fromY = sourceRect ? sourceRect.top + sourceRect.height / 2 - 24 : window.innerHeight / 2 - 24;
      const toX = targetRect.left + targetRect.width / 2 - 24;
      const toY = targetRect.top + targetRect.height / 2 - 24;

      const animId = Date.now();
      setFlyingItem({
        id: animId,
        image: product.image,
        fromX,
        fromY,
        dx: toX - fromX,
        dy: toY - fromY,
        active: false
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlyingItem(curr => (curr && curr.id === animId ? { ...curr, active: true } : curr));
        });
      });

      setTimeout(() => {
        setCartBounce(true);
        setFlyingItem(curr => (curr && curr.id === animId ? null : curr));
        setTimeout(() => setCartBounce(false), 450);
      }, 620);
    }

    showToast(`Added "${product.name}" to your bag`);
  }, [showToast]);

  const updateCartQuantity = useCallback((productId, newQty) => {
    setCart(prev => prev.map(item => (item.id === productId ? { ...item, quantity: newQty } : item)));
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Piece removed from your bag');
  }, [showToast]);

  // Checkout & Order Operations
  const startDirectCheckout = useCallback((product, method = 'Apple Pay') => {
    setCheckoutState({ items: [product], paymentMethod: method });
    navigate('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const startCartCheckout = useCallback((_totalAED, method = 'Apple Pay') => {
    setCartOpen(false);
    setCheckoutState({ items: null, paymentMethod: method });
    navigate('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const completeOrder = useCallback((orderData) => {
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
  }, [checkoutState.items, showToast]);

  // WhatsApp Concierge Operations
  const openWhatsAppOrder = useCallback((product = null) => {
    setWhatsAppState({ isOpen: true, product });
  }, []);

  const closeWhatsAppOrder = useCallback(() => {
    setWhatsAppState({ isOpen: false, product: null });
  }, []);

  const openCartWhatsApp = useCallback((cartItems, subtotalAED) => {
    const itemsText = cartItems
      .map(i => `• ${i.name} (Qty: ${i.quantity}${i.selectedColor ? `, ${i.selectedColor}` : ''}) - ${formatPrice(i.priceAED * i.quantity)}`)
      .join('\n');

    const message = `Hello HUJRAH // حجره Studio,
I would like to place an order for my selected pieces:

${itemsText}

Estimated Subtotal: AED ${subtotalAED.toLocaleString()}
Delivery: UAE White Glove Room Placement

Please confirm stock availability and coordinate private delivery schedule.`;

    window.open(
      `https://wa.me/${studioInfo.whatsappNumber || '971501234567'}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  }, [formatPrice, studioInfo.whatsappNumber]);

  // Admin: Product CRUD
  const addProduct = useCallback((newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added "${newProduct.name}" to catalog`);
  }, [showToast]);

  const updateProduct = useCallback((updatedProduct) => {
    setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    showToast(`Updated "${updatedProduct.name}"`);
  }, [showToast]);

  const deleteProduct = useCallback((productId) => {
    setProducts(prev => {
      const target = prev.find(p => p.id === productId);
      showToast(target ? `Removed "${target.name}"` : 'Product deleted');
      return prev.filter(p => p.id !== productId);
    });
  }, [showToast]);

  const saveProductFromAdmin = useCallback((payload, isEdit) => {
    if (isEdit) {
      updateProduct(payload);
    } else {
      addProduct(payload);
    }
    navigate('/admin/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [addProduct, updateProduct, navigate]);

  // Admin: Category CRUD
  const addCategory = useCallback((newCategory) => {
    setCategories(prev => [...prev, newCategory]);
    showToast(`Created category "${newCategory.name}"`);
  }, [showToast]);

  const updateCategory = useCallback((updatedCategory) => {
    setCategories(prev => prev.map(c => (c.id === updatedCategory.id ? updatedCategory : c)));
    setProducts(prev =>
      prev.map(p => (p.category === updatedCategory.id ? { ...p, categoryName: updatedCategory.name } : p))
    );
    showToast(`Updated category "${updatedCategory.name}"`);
  }, [showToast]);

  const deleteCategory = useCallback((categoryId) => {
    setCategories(prev => {
      const target = prev.find(c => c.id === categoryId);
      showToast(target ? `Deleted category "${target.name}"` : 'Category deleted');
      return prev.filter(c => c.id !== categoryId);
    });
  }, [showToast]);

  // Admin: Orders & Inquiries
  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)));
    showToast(`Order #${orderId} marked as ${newStatus}`);
  }, [showToast]);

  const submitInquiry = useCallback((inquiryData) => {
    const newInq = {
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      ...inquiryData
    };
    setInquiries(prev => [newInq, ...prev]);
    showToast('Inquiry received! Our design team will respond within 2 hours.');
  }, [showToast]);

  const updateInquiryStatus = useCallback((inqId, newStatus) => {
    setInquiries(prev => prev.map(i => (i.id === inqId ? { ...i, status: newStatus } : i)));
    showToast(`Inquiry status updated to ${newStatus}`);
  }, [showToast]);

  const deleteInquiry = useCallback((inqId) => {
    setInquiries(prev => prev.filter(i => i.id !== inqId));
    showToast('Inquiry removed');
  }, [showToast]);

  const updateStudioInfo = useCallback((updatedInfo) => {
    setStudioInfo(updatedInfo);
    showToast('Studio contact information saved');
  }, [showToast]);

  const value = {
    // State
    products,
    categories,
    orders,
    inquiries,
    studioInfo,
    superAdmin,
    cart,
    activeCurrency,
    setActiveCurrency,
    searchQuery,
    setSearchQuery,
    checkoutState,
    whatsAppState,
    cartOpen,
    setCartOpen,
    cartBounce,
    flyingItem,
    toastMessage,

    // Helpers & Navigation
    formatPrice,
    showToast,
    navigateHome,
    navigateShop,
    navigateContact,
    navigateTrackOrder,
    navigatePrivacyPolicy,
    navigateProduct,
    navigateAdmin,

    // Auth
    loginSuperAdmin,
    logoutSuperAdmin,

    // Cart & Checkout
    addToCart,
    updateCartQuantity,
    removeFromCart,
    startDirectCheckout,
    startCartCheckout,
    completeOrder,

    // WhatsApp
    openWhatsAppOrder,
    closeWhatsAppOrder,
    openCartWhatsApp,

    // Admin CRUD
    addProduct,
    updateProduct,
    deleteProduct,
    saveProductFromAdmin,
    addCategory,
    updateCategory,
    deleteCategory,
    updateOrderStatus,
    submitInquiry,
    updateInquiryStatus,
    deleteInquiry,
    updateStudioInfo
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
