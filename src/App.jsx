import { Routes, Route, Navigate } from 'react-router-dom';
import StoreProvider from './context/StoreContext';
import StorefrontLayout from './components/layout/StorefrontLayout';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import AdminLayout from './components/admin/AdminLayout';

// Storefront Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackOrderPage from './pages/TrackOrderPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminOverviewTab from './pages/admin/AdminOverviewTab';
import AdminProductsTab from './pages/admin/AdminProductsTab';
import AdminAddProductPage from './pages/admin/AdminAddProductPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminOrdersTab from './pages/admin/AdminOrdersTab';
import AdminContactTab from './pages/admin/AdminContactTab';

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        {/* Storefront Website Routes */}
        <Route element={<StorefrontLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:category" element={<ShopPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/track-order/:orderId" element={<TrackOrderPage />} />
        </Route>

        {/* SuperAdmin Auth & Dashboard Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminOverviewTab />} />
          <Route path="products" element={<AdminProductsTab />} />
          <Route path="products/new" element={<AdminAddProductPage />} />
          <Route path="products/edit/:productId" element={<AdminAddProductPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="orders" element={<AdminOrdersTab />} />
          <Route path="contact" element={<AdminContactTab />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </StoreProvider>
  );
}
