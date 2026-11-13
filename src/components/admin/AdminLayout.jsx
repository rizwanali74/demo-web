import { useStore } from '../../hooks/useStore';
import ToastBanner from '../common/ToastBanner';
import AdminDashboard from '../../pages/admin/AdminDashboard';

export default function AdminLayout() {
  const {
    products,
    categories,
    orders,
    inquiries,
    superAdmin,
    logoutSuperAdmin
  } = useStore();

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#141414] flex flex-col font-sans selection:bg-[#141414] selection:text-white">
      <ToastBanner offsetClass="top-20" />
      <AdminDashboard
        productsCount={products.length}
        categoriesCount={categories.length}
        orders={orders}
        inquiries={inquiries}
        superAdmin={superAdmin}
        onLogout={logoutSuperAdmin}
      />
    </div>
  );
}

