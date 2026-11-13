import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit3,
  Trash2
} from 'lucide-react';

export default function AdminProductsTab({
  products,
  categories = [],
  onOpenAddProduct,
  onOpenEditProduct,
  onUpdateProduct,
  onDeleteProduct,
  formatPrice
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          (p.materials && p.materials.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [products, categoryFilter, searchQuery]);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Fixed Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-sm border border-[#EAE8E4]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, SKU, or material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FAFAF9] border border-[#DDD8CF] rounded-full text-xs text-[#141414] focus:outline-none focus:border-black"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#FAFAF9] border border-[#DDD8CF] rounded-full px-4 py-2 text-xs text-[#141414] focus:outline-none cursor-pointer"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={onOpenAddProduct}
          className="inline-flex items-center justify-center gap-2 bg-[#141414] hover:bg-neutral-800 text-white text-xs uppercase tracking-[0.16em] font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Scrollable Products Table (Desktop) + Card List (Mobile) */}
      <div className="bg-white border border-[#EAE8E4] rounded-sm overflow-hidden">
        <div className="max-h-[calc(100vh-13.5rem)] overflow-auto">
          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-[#F0EEE9]">
            {filteredProducts.map(product => (
              <div key={product.id} className="p-3.5 space-y-2.5 text-xs">
                <div className="flex items-start gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-14 object-cover rounded-xs bg-[#F5F4F0] border border-[#EAE8E4] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#141414] truncate">{product.name}</div>
                    <div className="text-[11px] text-neutral-500 truncate">
                      {product.categoryName} • <span className="font-mono">{product.sku}</span>
                    </div>
                    <div className="font-semibold text-[#141414] mt-1">{formatPrice(product.priceAED)}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => onUpdateProduct({ ...product, inStock: !product.inStock })}
                    className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border font-medium cursor-pointer ${
                      product.inStock
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                    }`}
                  >
                    {product.inStock ? 'In Stock' : 'Made to Order'}
                  </button>
                  <div className="inline-flex items-center gap-1">
                    <button
                      onClick={() => onOpenEditProduct(product)}
                      className="p-2 text-neutral-600 hover:text-black bg-[#FAFAF9] border border-[#EAE8E4] rounded-full cursor-pointer"
                      aria-label={`Edit ${product.name}`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${product.name}" from catalog?`)) {
                          onDeleteProduct(product.id);
                        }
                      }}
                      className="p-2 text-red-500 bg-red-50/60 border border-red-200/70 rounded-full cursor-pointer"
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <table className="hidden md:table w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-[#FAFAF9]">
              <tr className="border-b border-[#EAE8E4] text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                <th className="py-3.5 px-4 font-semibold">Product</th>
                <th className="py-3.5 px-4 font-semibold">SKU</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Price</th>
                <th className="py-3.5 px-4 font-semibold">Stock Status</th>
                <th className="py-3.5 px-4 font-semibold">Tags</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EEE9] text-xs">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-[#FAFAF9] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-11 h-14 object-cover rounded-xs bg-[#F5F4F0] border border-[#EAE8E4] shrink-0"
                      />
                      <div>
                        <div className="font-medium text-[#141414]">{product.name}</div>
                        <div className="text-[11px] text-neutral-400">{product.dimensions || 'Custom dimensions'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500">
                    {product.sku}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600">
                    {product.categoryName}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#141414]">{formatPrice(product.priceAED)}</div>
                    {product.compareAtPriceAED && (
                      <div className="text-[10px] text-neutral-400 line-through">
                        {formatPrice(product.compareAtPriceAED)}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => onUpdateProduct({ ...product, inStock: !product.inStock })}
                      className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border font-medium cursor-pointer transition-colors ${
                        product.inStock
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-300 hover:bg-neutral-200'
                      }`}
                      title="Click to toggle stock status"
                    >
                      {product.inStock ? 'In Stock' : 'Made to Order'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {product.isNew && (
                        <span className="text-[9px] uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded-full">New</span>
                      )}
                      {product.isBespoke && (
                        <span className="text-[9px] uppercase tracking-wider bg-[#F4F2EE] text-[#141414] px-2 py-0.5 rounded-full">Bespoke</span>
                      )}
                      {product.isBestSeller && (
                        <span className="text-[9px] uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">Best</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenEditProduct(product)}
                        className="p-2 text-neutral-500 hover:text-black hover:bg-[#F4F2EE] rounded-full transition-colors cursor-pointer"
                        title="Edit product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${product.name}" from catalog?`)) {
                            onDeleteProduct(product.id);
                          }
                        }}
                        className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-xs text-neutral-500">
              No products match your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
