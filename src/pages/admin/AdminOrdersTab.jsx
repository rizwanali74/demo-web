import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Search,
  Eye,
  X,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  CreditCard
} from 'lucide-react';
import { ORDER_STATUSES } from '../../data/adminMockData';
import { useStore } from '../../hooks/useStore';

export default function AdminOrdersTab({
  orders: propOrders,
  onUpdateOrderStatus: propOnUpdateOrderStatus,
  formatPrice: propFormatPrice
}) {
  const store = useStore();
  const orders = propOrders ?? store.orders;
  const onUpdateOrderStatus = propOnUpdateOrderStatus ?? store.updateOrderStatus;
  const formatPrice = propFormatPrice ?? store.formatPrice;

  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      if (statusFilter !== 'All' && order.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          order.id.toLowerCase().includes(q) ||
          order.customerName.toLowerCase().includes(q) ||
          order.city.toLowerCase().includes(q) ||
          order.customerPhone.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Out for Delivery': return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'In Production': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Confirmed': return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-300';
    }
  };

  const handleWhatsAppCustomer = (order) => {
    const cleanPhone = (order.customerPhone || '').replace(/\D/g, '');
    const msg = `Hello ${order.customerName},\n\nThis is HUJRAH // حجره Studio Concierge regarding your order #${order.id} (Status: ${order.status}).\n\nPlease let us know your preferred White Glove delivery window in ${order.city}.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Status Filter Bar & Search */}
      <div className="bg-white p-4 sm:p-5 border border-[#EAE8E4] rounded-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search Order ID, customer, phone, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FAFAF9] border border-[#DDD8CF] rounded-full text-xs text-[#141414] focus:outline-none focus:border-black"
            />
          </div>

          <span className="text-xs text-neutral-500">
            Showing {filteredOrders.length} of {orders.length} orders
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['All', ...ORDER_STATUSES].map(status => {
            const count = status === 'All' 
              ? orders.length 
              : orders.filter(o => o.status === status).length;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 text-[11px] uppercase tracking-wider rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  statusFilter === status 
                    ? 'bg-[#141414] text-white font-medium' 
                    : 'bg-[#F4F2EE] text-[#555] hover:bg-[#EAE6DE]'
                }`}
              >
                {status} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable Orders Table (Desktop) + Card List (Mobile) */}
      <div className="bg-white border border-[#EAE8E4] rounded-sm overflow-hidden">
        <div className="max-h-[calc(100vh-15.5rem)] overflow-auto">
          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-[#F0EEE9]">
            {filteredOrders.map(order => (
              <div key={order.id} className="p-3.5 space-y-2.5 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-mono text-[11px] font-semibold text-[#141414]">#{order.id}</div>
                    <div className="font-medium text-[#141414] mt-0.5">{order.customerName}</div>
                    <div className="text-[11px] text-neutral-400">
                      {order.city} • {order.paymentMethod}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#141414]">{formatPrice(order.totalAED)}</div>
                    <div className="text-[10px] text-neutral-400">
                      {new Date(order.createdAt).toLocaleDateString('en-AE', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                    className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border font-medium cursor-pointer focus:outline-none ${getStatusStyle(order.status)}`}
                  >
                    {ORDER_STATUSES.map(st => (
                      <option key={st} value={st} className="bg-white text-[#141414]">{st}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 border border-[#DDD8CF] rounded-full text-[#141414] cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <table className="hidden md:table w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-[#FAFAF9]">
              <tr className="border-b border-[#EAE8E4] text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                <th className="py-3.5 px-4 font-semibold">Order Ref</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Delivery City</th>
                <th className="py-3.5 px-4 font-semibold">Items</th>
                <th className="py-3.5 px-4 font-semibold">Payment</th>
                <th className="py-3.5 px-4 font-semibold">Total</th>
                <th className="py-3.5 px-4 font-semibold">Order Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EEE9] text-xs">
              {filteredOrders.map(order => {
                const itemCount = order.items.reduce((acc, i) => acc + (i.quantity || 1), 0);
                return (
                  <tr key={order.id} className="hover:bg-[#FAFAF9] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] font-semibold text-[#141414]">
                      #{order.id}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString('en-AE', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#141414]">{order.customerName}</div>
                      <div className="text-[11px] text-neutral-400">{order.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">{order.city}</td>
                    <td className="py-3.5 px-4 text-neutral-600">
                      {itemCount} {itemCount === 1 ? 'piece' : 'pieces'}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">{order.paymentMethod}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#141414] whitespace-nowrap">
                      {formatPrice(order.totalAED)}
                    </td>
                    <td className="py-3.5 px-4">
                      {/* API-READY: Later replace onChange with PATCH /api/orders/:id */}
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                        className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border font-medium cursor-pointer focus:outline-none ${getStatusStyle(order.status)}`}
                      >
                        {ORDER_STATUSES.map(st => (
                          <option key={st} value={st} className="bg-white text-[#141414]">
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#F4F2EE] hover:bg-[#141414] hover:text-white text-[#141414] rounded-full text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-xs text-neutral-500">
              No orders found matching this filter.
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal (rendered via portal above fixed admin navbar & sidebar) */}
      {selectedOrder && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white w-full max-w-2xl max-h-[88vh] flex flex-col rounded-md shadow-2xl border border-[#EAE8E4] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Modal Header */}
            <div className="shrink-0 px-6 py-4 bg-[#FAFAF9] border-b border-[#EAE8E4] flex items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-base font-semibold text-[#141414] font-mono">
                    Order #{selectedOrder.id}
                  </h3>
                  <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-medium ${getStatusStyle(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-AE')}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-neutral-400 hover:text-black hover:bg-[#EAE8E4]/50 rounded-full transition-colors cursor-pointer"
                aria-label="Close order modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
              {/* Status Update Control */}
              <div className="bg-[#FAF9F6] p-4 border border-[#EAE8E4] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block">
                    Update Fulfillment Status
                  </span>
                  <span className="text-neutral-600 font-light">
                    Changes reflect immediately in order tracking
                  </span>
                </div>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    onUpdateOrderStatus(selectedOrder.id, newStatus);
                    setSelectedOrder({ ...selectedOrder, status: newStatus });
                  }}
                  className="bg-white border border-[#DDD8CF] px-4 py-2 rounded-full text-xs font-medium text-[#141414] cursor-pointer focus:outline-none focus:border-black"
                >
                  {ORDER_STATUSES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Customer & Delivery Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-[#EAE8E4] rounded-sm space-y-2.5">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                    Customer Details
                  </span>
                  <div className="font-medium text-sm text-[#141414]">{selectedOrder.customerName}</div>
                  <a
                    href={`https://wa.me/${(selectedOrder.customerPhone || '').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-neutral-600 hover:text-[#25D366] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{selectedOrder.customerPhone}</span>
                  </a>
                  {selectedOrder.customerEmail && (
                    <a
                      href={`mailto:${selectedOrder.customerEmail}?subject=${encodeURIComponent(`HUJRAH Order #${selectedOrder.id}`)}`}
                      className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{selectedOrder.customerEmail}</span>
                    </a>
                  )}
                </div>

                <div className="p-4 border border-[#EAE8E4] rounded-sm space-y-2.5">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                    Delivery & Payment
                  </span>
                  <div className="flex items-start gap-2 text-neutral-600">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{selectedOrder.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <CreditCard className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>Paid via <strong>{selectedOrder.paymentMethod}</strong></span>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="p-3.5 bg-amber-50/50 border border-amber-200/60 rounded-sm text-neutral-700">
                  <strong className="text-[10px] uppercase tracking-wider block text-amber-800 mb-0.5">Order Notes</strong>
                  {selectedOrder.notes}
                </div>
              )}

              {/* Itemized List */}
              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-2.5">
                  Ordered Pieces ({selectedOrder.items.length})
                </h4>
                <div className="border border-[#EAE8E4] rounded-sm divide-y divide-[#F0EEE9]">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-14 object-cover rounded-xs bg-[#F5F4F0] border border-[#EAE8E4] shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-[#141414] truncate">{item.name}</div>
                          <div className="text-[11px] text-neutral-400">
                            {item.sku && <span className="font-mono mr-2">{item.sku}</span>}
                            {item.selectedColor && <span>Finish: {item.selectedColor}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-semibold text-[#141414]">
                          {formatPrice(item.priceAED * (item.quantity || 1))}
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          Qty: {item.quantity || 1} × {formatPrice(item.priceAED)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fixed Modal Footer */}
            <div className="shrink-0 px-6 py-4 bg-[#FAFAF9] border-t border-[#EAE8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Order Total</span>
                <span className="text-lg font-semibold text-[#141414]">
                  {formatPrice(selectedOrder.totalAED)}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleWhatsAppCustomer(selectedOrder)}
                  className="flex-1 sm:flex-initial bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-5 rounded-full text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Customer</span>
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2.5 border border-[#DDD8CF] bg-white hover:border-black rounded-full text-xs uppercase tracking-wider text-neutral-700 hover:text-black cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

