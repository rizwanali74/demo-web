import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusSquare,
  FolderTree,
  ShoppingBag,
  MessageSquare,
  ArrowLeft,
  ShieldCheck,
  Menu,
  X,
  Plus,
  LogOut,
  Type
} from 'lucide-react';

const FONT_SCALE_OPTIONS = [
  { id: 'sm', label: 'S', zoom: 0.9, title: 'Compact font size (90%)' },
  { id: 'md', label: 'M', zoom: 1, title: 'Default font size (100%)' },
  { id: 'lg', label: 'L', zoom: 1.08, title: 'Large font size (108%)' }
];

export default function AdminDashboard({
  productsCount = 0,
  categoriesCount = 0,
  orders = [],
  inquiries = [],
  superAdmin = null,
  onLogout
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [fontScale, setFontScale] = useState(() => {
    try {
      return localStorage.getItem('hujrah_admin_font_scale') || 'md';
    } catch {
      return 'md';
    }
  });
  const location = useLocation();
  const navigate = useNavigate();

  const activeScale = FONT_SCALE_OPTIONS.find(o => o.id === fontScale) || FONT_SCALE_OPTIONS[1];

  const handleChangeFontScale = (scaleId) => {
    setFontScale(scaleId);
    try {
      localStorage.setItem('hujrah_admin_font_scale', scaleId);
    } catch {
      // Ignore storage errors
    }
  };

  const pendingOrdersCount = orders.filter(
    o => o.status === 'Pending' || o.status === 'Confirmed' || o.status === 'In Production'
  ).length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const isAddOrEditProduct =
    location.pathname === '/admin/products/new' ||
    location.pathname.startsWith('/admin/products/edit/');

  const getPageMeta = (pathname) => {
    if (pathname === '/admin/products') {
      return {
        title: 'Manage Products',
        subtitle: `${productsCount} pieces in the HUJRAH catalog`
      };
    }
    if (pathname === '/admin/products/new') {
      return {
        title: 'Add New Product',
        subtitle: 'Create a new piece for the storefront catalog'
      };
    }
    if (pathname.startsWith('/admin/products/edit/')) {
      return {
        title: 'Edit Product',
        subtitle: 'Update product details, finishes, and technical specs'
      };
    }
    if (pathname === '/admin/categories') {
      return {
        title: 'Product Categories',
        subtitle: 'Organize collections across storefront navigation & filters'
      };
    }
    if (pathname === '/admin/orders') {
      return {
        title: 'Customer Orders',
        subtitle: 'Track fulfillment status and bespoke production'
      };
    }
    if (pathname === '/admin/contact') {
      return {
        title: 'Contact & Inquiries',
        subtitle: 'Manage studio contact details and incoming client messages'
      };
    }
    return {
      title: 'Dashboard Overview',
      subtitle: 'Catalog metrics, order pipeline & studio inbox'
    };
  };

  const currentMeta = getPageMeta(location.pathname);

  const navGroups = [
    {
      title: 'Workspace',
      items: [
        { to: '/admin', end: true, label: 'Dashboard', icon: LayoutDashboard },
        {
          to: '/admin/orders',
          label: 'Orders',
          icon: ShoppingBag,
          badge: pendingOrdersCount > 0 ? pendingOrdersCount : null
        },
        {
          to: '/admin/contact',
          label: 'Contact & Inquiries',
          icon: MessageSquare,
          badge: newInquiriesCount > 0 ? newInquiriesCount : null
        }
      ]
    },
    {
      title: 'Catalog',
      items: [
        {
          to: '/admin/products',
          end: true,
          label: 'Manage Products',
          icon: Package,
          count: productsCount
        },
        {
          to: '/admin/products/new',
          label: 'Add Product',
          icon: PlusSquare
        },
        {
          to: '/admin/categories',
          label: 'Categories',
          icon: FolderTree,
          count: categoriesCount
        }
      ]
    }
  ];

  const handleExitAdmin = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col justify-between h-full py-6 px-4 overflow-y-auto">
      <div className="space-y-6">
        {navGroups.map(group => (
          <div key={group.title}>
            <div className="px-3 mb-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
              {group.title}
            </div>
            <nav className="space-y-1">
              {group.items.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => {
                      setMobileSidebarOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={({ isActive }) =>
                      `w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-xs transition-colors ${
                        isActive
                          ? 'bg-[#141414] text-white font-medium'
                          : 'text-neutral-600 hover:bg-[#F4F2EE] hover:text-[#141414]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.label}</span>
                        </span>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                              isActive ? 'bg-white text-[#141414]' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {item.count !== undefined && !item.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              isActive ? 'bg-white/20 text-white' : 'bg-[#F4F2EE] text-neutral-500'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Sidebar Bottom Card */}
      <div className="pt-6 border-t border-[#EAE8E4] space-y-2.5">
        <div className="bg-[#FAFAF9] border border-[#EAE8E4] rounded-sm p-3">
          <div className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#141414] mb-0.5">
            {superAdmin?.name || 'SuperAdmin'}
          </div>
          <p className="text-[11px] text-neutral-500 font-light truncate">
            {superAdmin?.email || 'superadmin@hujrah.ae'}
          </p>
        </div>
        <button
          onClick={handleExitAdmin}
          className="w-full flex items-center justify-center gap-2 border border-[#DDD8CF] hover:border-black text-[#141414] text-[11px] uppercase tracking-[0.14em] font-medium px-3 py-2 rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Storefront</span>
        </button>
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 border border-red-200/80 text-[11px] uppercase tracking-[0.14em] font-medium px-3 py-2 rounded-full transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#141414] font-sans">
      {/* Minimal Fixed Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-12 z-50 bg-white border-b border-[#EAE8E4] px-3 sm:px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setMobileSidebarOpen(prev => !prev)}
            className="lg:hidden p-1.5 -ml-1 text-[#141414] hover:bg-[#F4F2EE] rounded-full transition-colors cursor-pointer"
            aria-label="Toggle admin navigation"
          >
            {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2.5">
            <NavLink
              to="/admin"
              className="flex items-center gap-2"
              title="HUJRAH Admin Home"
            >
              <img
                src="/images/logo.png"
                alt="HUJRAH"
                className="h-7 w-auto object-contain"
              />
            </NavLink>
            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] font-semibold bg-[#F4F2EE] text-[#141414] px-2 py-0.5 rounded-full border border-[#EAE8E4]">
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-700" />
              <span>SuperAdmin</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Adjustable Font Size Control */}
          <div
            className="hidden sm:inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#EAE8E4] rounded-full px-2 py-0.5"
            title="Adjust dashboard font size"
          >
            <Type className="w-3 h-3 text-neutral-400 mr-0.5" />
            {FONT_SCALE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleChangeFontScale(opt.id)}
                title={opt.title}
                className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full transition-colors cursor-pointer ${
                  fontScale === opt.id
                    ? 'bg-[#141414] text-white'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {!isAddOrEditProduct && (
            <button
              onClick={() => {
                navigate('/admin/products/new');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 bg-[#141414] hover:bg-neutral-800 text-white text-[10px] uppercase tracking-[0.14em] font-medium px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span className="hidden sm:inline">Add Product</span>
            </button>
          )}
          <button
            onClick={handleExitAdmin}
            className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] font-medium text-neutral-600 hover:text-black border border-[#DDD8CF] hover:border-black px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Store</span>
          </button>
          {onLogout && (
            <button
              onClick={onLogout}
              className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] font-medium text-red-600 hover:bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden md:inline">Logout</span>
            </button>
          )}
        </div>
      </header>

      {/* Fixed Desktop Sidebar */}
      <aside className="fixed top-12 left-0 bottom-0 w-56 z-30 bg-white border-r border-[#EAE8E4] hidden lg:block">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Slide-Over Sidebar (starts below top navbar so navbar stays crisp) */}
      {mobileSidebarOpen && (
        <div className="fixed top-12 left-0 right-0 bottom-0 z-40 lg:hidden">
          <div
            className="fixed top-12 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-[1px]"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="fixed top-12 left-0 bottom-0 w-64 bg-white border-r border-[#EAE8E4] z-50 shadow-xl">
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* Main Content Area: Minimal Fixed Page Header + Scrollable Content/Tables */}
      <main className="pt-12 lg:pl-56 h-screen flex flex-col overflow-hidden">
        {/* Minimal Fixed Page Header */}
        <div className="shrink-0 bg-[#FAFAF9] border-b border-[#EAE8E4] px-4 sm:px-5 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex flex-wrap items-baseline gap-2.5">
              <h2 className="text-sm sm:text-base font-medium tracking-tight text-[#141414]">
                {currentMeta.title}
              </h2>
              <span className="hidden sm:inline text-[11px] text-neutral-400 font-light">
                {currentMeta.subtitle}
              </span>
            </div>
            {/* Mobile Font Scale Control */}
            <div className="sm:hidden inline-flex items-center gap-1 bg-white border border-[#EAE8E4] rounded-full px-1.5 py-0.5">
              {FONT_SCALE_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleChangeFontScale(opt.id)}
                  className={`px-1.5 py-0.5 text-[9px] font-semibold rounded-full cursor-pointer ${
                    fontScale === opt.id ? 'bg-[#141414] text-white' : 'text-neutral-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Remaining Content (with adjustable font scale & mobile bottom nav clearance) */}
        <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-5 py-4 pb-20 lg:pb-4">
          <div className="max-w-7xl mx-auto" style={{ zoom: activeScale.zoom }}>
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Quick-Navigation Bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 h-14 z-30 bg-white border-t border-[#EAE8E4] grid grid-cols-5"
        aria-label="Mobile admin navigation"
      >
        {[
          { to: '/admin', end: true, label: 'Home', icon: LayoutDashboard },
          { to: '/admin/orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount },
          { to: '/admin/products', end: true, label: 'Products', icon: Package },
          { to: '/admin/categories', label: 'Categories', icon: FolderTree },
          { to: '/admin/contact', label: 'Inquiries', icon: MessageSquare, badge: newInquiriesCount }
        ].map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center gap-0.5 text-[10px] transition-colors ${
                  isActive ? 'text-[#141414] font-semibold' : 'text-neutral-400 hover:text-neutral-700'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-4 h-4" />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-0.5 bg-amber-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="truncate max-w-full px-1">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
