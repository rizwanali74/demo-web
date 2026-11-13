import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  MessageSquare,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { ORDER_STATUSES } from '../../data/adminMockData';
import { useStore } from '../../hooks/useStore';

export default function AdminOverviewTab({
  products: propProducts,
  categories: propCategories,
  orders: propOrders,
  inquiries: propInquiries,
  formatPrice: propFormatPrice,
  onSwitchTab: propOnSwitchTab
}) {
  const navigate = useNavigate();
  const store = useStore();
  const products = propProducts ?? store.products;
  const categories = propCategories ?? store.categories;
  const orders = propOrders ?? store.orders;
  const inquiries = propInquiries ?? store.inquiries;
  const formatPrice = propFormatPrice ?? store.formatPrice;
  const onSwitchTab = propOnSwitchTab ?? ((tab) => navigate(`/admin/${tab}`));

  const stats = useMemo(() => {
    const validOrders = orders.filter(o => o.status !== 'Cancelled');
    const totalRevenueAED = validOrders.reduce((sum, o) => sum + (Number(o.totalAED) || 0), 0);
    const deliveredRevenueAED = orders
      .filter(o => o.status === 'Delivered')
      .reduce((sum, o) => sum + (Number(o.totalAED) || 0), 0);
    const avgOrderAED = validOrders.length > 0 ? Math.round(totalRevenueAED / validOrders.length) : 0;

    const activeOrdersCount = orders.filter(
      o => o.status === 'Pending' || o.status === 'Confirmed' || o.status === 'In Production' || o.status === 'Out for Delivery'
    ).length;
    const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

    const inStockCount = products.filter(p => Boolean(p.inStock)).length;
    const madeToOrderCount = products.length - inStockCount;

    const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;
    const inProgressInquiriesCount = inquiries.filter(i => i.status === 'In Progress').length;

    const statusCounts = ORDER_STATUSES.map(status => ({
      status,
      count: orders.filter(o => o.status === status).length
    }));

    const categoryBreakdown = categories.map(cat => {
      const count = products.filter(p => p.category === cat.id).length;
      const percent = products.length > 0 ? Math.round((count / products.length) * 100) : 0;
      return {
        id: cat.id,
        label: cat.name,
        count,
        percent
      };
    });

    const recentOrders = [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const recentInquiries = [...inquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return {
      totalRevenueAED,
      deliveredRevenueAED,
      avgOrderAED,
      activeOrdersCount,
      deliveredCount,
      inStockCount,
      madeToOrderCount,
      newInquiriesCount,
      inProgressInquiriesCount,
      statusCounts,
      categoryBreakdown,
      recentOrders,
      recentInquiries
    };
  }, [products, categories, orders, inquiries]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Out for Delivery': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'In Production': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Confirmed': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Accurate KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-sm border border-[#EAE8E4] shadow-2xs">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">Net Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-semibold text-[#141414]">
            {formatPrice(stats.totalRevenueAED)}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1 font-light">
            Delivered: {formatPrice(stats.deliveredRevenueAED)} • AOV: {formatPrice(stats.avgOrderAED)}
          </p>
        </div>

        <div
          onClick={() => onSwitchTab('orders')}
          className="bg-white p-5 rounded-sm border border-[#EAE8E4] shadow-2xs cursor-pointer hover:border-black/30 transition-colors"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#141414]" />
          </div>
          <div className="text-2xl font-semibold text-[#141414]">{orders.length}</div>
          <p className="text-[11px] text-amber-700 mt-1 font-medium">
            {stats.activeOrdersCount} active • {stats.deliveredCount} delivered
          </p>
        </div>

        <div
          onClick={() => onSwitchTab('products')}
          className="bg-white p-5 rounded-sm border border-[#EAE8E4] shadow-2xs cursor-pointer hover:border-black/30 transition-colors"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">Catalog Products</span>
            <Package className="w-4 h-4 text-[#141414]" />
          </div>
          <div className="text-2xl font-semibold text-[#141414]">{products.length}</div>
          <p className="text-[11px] text-neutral-500 mt-1 font-light">
            {stats.inStockCount} in stock • {stats.madeToOrderCount} made to order • {categories.length} categories
          </p>
        </div>

        <div
          onClick={() => onSwitchTab('contact')}
          className="bg-white p-5 rounded-sm border border-[#EAE8E4] shadow-2xs cursor-pointer hover:border-black/30 transition-colors"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">Client Inquiries</span>
            <MessageSquare className="w-4 h-4 text-[#141414]" />
          </div>
          <div className="text-2xl font-semibold text-[#141414]">{inquiries.length}</div>
          <p className="text-[11px] text-emerald-700 mt-1 font-medium">
            {stats.newInquiriesCount} new • {stats.inProgressInquiriesCount} in progress
          </p>
        </div>
      </div>

      {/* Order Status Pipeline Strip */}
      <div className="bg-white border border-[#EAE8E4] rounded-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-neutral-500">
            Order Fulfillment Pipeline
          </span>
          <button
            onClick={() => onSwitchTab('orders')}
            className="text-[11px] uppercase tracking-wider font-medium text-[#141414] hover:opacity-60 cursor-pointer"
          >
            Manage Orders →
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {stats.statusCounts.map(item => (
            <button
              key={item.status}
              onClick={() => onSwitchTab('orders')}
              className="p-2.5 bg-[#FAFAF9] hover:bg-[#F4F2EE] border border-[#EAE8E4] rounded-xs text-left transition-colors cursor-pointer"
            >
              <div className="text-[10px] uppercase tracking-wider text-neutral-500 truncate">
                {item.status}
              </div>
              <div className="text-lg font-semibold text-[#141414] mt-0.5">{item.count}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Grid: Recent Orders & Catalog/Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white border border-[#EAE8E4] rounded-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#EAE8E4] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[#141414]">Recent Orders</h3>
              <p className="text-[11px] text-neutral-400 font-light">Latest customer purchases across UAE</p>
            </div>
            <button
              onClick={() => onSwitchTab('orders')}
              className="text-[11px] uppercase tracking-wider font-medium text-[#141414] hover:opacity-60 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EAE8E4] bg-[#FAFAF9] text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                  <th className="py-3 px-4 font-semibold">Order</th>
                  <th className="py-3 px-4 font-semibold">Customer</th>
                  <th className="py-3 px-4 font-semibold">Payment</th>
                  <th className="py-3 px-4 font-semibold">Total</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EEE9] text-xs">
                {stats.recentOrders.slice(0, 5).map(order => (
                  <tr key={order.id} className="hover:bg-[#FAFAF9] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] font-medium text-[#141414]">
                      #{order.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#141414]">{order.customerName}</div>
                      <div className="text-[11px] text-neutral-400">{order.city}</div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">{order.paymentMethod}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#141414]">
                      {formatPrice(order.totalAED)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-medium ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Category Breakdown & Latest Inquiries */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#EAE8E4] rounded-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[#141414]">Inventory by Category</h3>
              <button
                onClick={() => onSwitchTab('categories')}
                className="text-[10px] uppercase tracking-wider text-neutral-500 hover:text-black cursor-pointer"
              >
                Manage
              </button>
            </div>
            <div className="space-y-3">
              {stats.categoryBreakdown.map(cat => (
                <div key={cat.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-600">{cat.label}</span>
                    <span className="font-semibold text-[#141414]">
                      {cat.count} <span className="text-neutral-400 font-normal">({cat.percent}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F2EFE9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#141414] rounded-full transition-all"
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#EAE8E4] rounded-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[#141414]">Recent Inquiries</h3>
              <button
                onClick={() => onSwitchTab('contact')}
                className="text-[10px] uppercase tracking-wider text-neutral-500 hover:text-black cursor-pointer"
              >
                Open Inbox
              </button>
            </div>

            <div className="space-y-3">
              {stats.recentInquiries.slice(0, 3).map(inq => (
                <div key={inq.id} className="p-3 bg-[#FAFAF9] border border-[#EAE8E4] rounded-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[#141414]">{inq.name}</span>
                    <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${
                      inq.status === 'New' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 font-light">{inq.message}</p>
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 mt-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{inq.inquiryType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
