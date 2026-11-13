import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Image as ImageIcon,
  Plus,
  X
} from 'lucide-react';
import { useStore } from '../../hooks/useStore';

const EMPTY_PRODUCT = {
  id: '',
  sku: '',
  name: '',
  arabicName: '',
  category: '',
  categoryName: '',
  priceAED: '',
  compareAtPriceAED: '',
  inStock: true,
  isNew: true,
  isBestSeller: false,
  isBespoke: true,
  materials: '',
  dimensions: '',
  leadTime: 'In Stock — 48h UAE Delivery',
  image: '',
  secondaryImage: '',
  shortDescription: '',
  description: '',
  colors: [{ name: 'Oatmeal Bouclé', hex: '#EFEBE4' }],
  specs: { Origin: 'Handcrafted in the UAE' }
};

export default function AdminAddProductPage({
  categories: propCategories,
  initialProduct: propInitialProduct,
  totalProductsCount: propTotalProductsCount,
  onSaveProduct: propOnSaveProduct,
  onCancel: propOnCancel,
  formatPrice: propFormatPrice
}) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const categories = propCategories ?? store.categories;
  const matchedProduct = productId ? store.products.find(p => p.id === productId) : null;
  const initialProduct = propInitialProduct !== undefined ? propInitialProduct : matchedProduct;
  const totalProductsCount = propTotalProductsCount ?? store.products.length;
  const onSaveProduct = propOnSaveProduct ?? store.saveProductFromAdmin;
  const onCancel = propOnCancel ?? (() => navigate('/admin/products'));
  const formatPrice = propFormatPrice ?? store.formatPrice;

  const defaultCat = categories[0] || { id: 'sofas-seating', name: 'Sofas & Seating' };

  const [formState, setFormState] = useState(() => {
    if (initialProduct) {
      return {
        ...EMPTY_PRODUCT,
        ...initialProduct,
        compareAtPriceAED: initialProduct.compareAtPriceAED || '',
        colors: initialProduct.colors ? [...initialProduct.colors] : [],
        specs: initialProduct.specs ? { ...initialProduct.specs } : {}
      };
    }
    return {
      ...EMPTY_PRODUCT,
      id: `huj-${String(totalProductsCount + 1).padStart(2, '0')}-${Date.now().toString().slice(-3)}`,
      sku: `HUJ-NEW-${String(totalProductsCount + 1).padStart(3, '0')}`,
      category: defaultCat.id,
      categoryName: defaultCat.name
    };
  });

  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#D8CEBE');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');

  if (productId && !matchedProduct && propInitialProduct === undefined) {
    return <Navigate to="/admin/products" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const catObj = categories.find(c => c.id === formState.category) || defaultCat;
    const payload = {
      ...formState,
      category: catObj.id,
      categoryName: catObj.name,
      priceAED: Number(formState.priceAED) || 0,
      compareAtPriceAED: formState.compareAtPriceAED ? Number(formState.compareAtPriceAED) : null,
      image: formState.image.trim() || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
    };

    // API-READY:
    // if (initialProduct) await fetch(`/api/products/${payload.id}`, { method: 'PUT', body: JSON.stringify(payload) })
    // else await fetch('/api/products', { method: 'POST', body: JSON.stringify(payload) })
    onSaveProduct(payload, Boolean(initialProduct));
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setFormState(prev => ({
      ...prev,
      colors: [...(prev.colors || []), { name: newColorName.trim(), hex: newColorHex }]
    }));
    setNewColorName('');
  };

  const handleRemoveColor = (index) => {
    setFormState(prev => ({
      ...prev,
      colors: prev.colors.filter((_, idx) => idx !== index)
    }));
  };

  const handleAddSpec = () => {
    if (!newSpecKey.trim() || !newSpecVal.trim()) return;
    setFormState(prev => ({
      ...prev,
      specs: { ...(prev.specs || {}), [newSpecKey.trim()]: newSpecVal.trim() }
    }));
    setNewSpecKey('');
    setNewSpecVal('');
  };

  const handleRemoveSpec = (key) => {
    setFormState(prev => {
      const copy = { ...prev.specs };
      delete copy[key];
      return { ...prev, specs: copy };
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Back Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-neutral-600 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <span className="text-[11px] font-mono text-neutral-400">
          {initialProduct ? `Editing: ${initialProduct.sku}` : 'New Catalog Entry'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Main Form */}
        <div className="xl:col-span-8 space-y-6 text-xs">
          
          {/* Section 1: Core Details */}
          <div className="bg-white p-6 border border-[#EAE8E4] rounded-sm space-y-4">
            <h3 className="text-sm font-medium text-[#141414] pb-3 border-b border-[#F0EEE9]">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                  Product Name *
                </label>
                <input 
                  type="text" required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Dune Low Modular Sofa"
                  className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                  Arabic Name
                </label>
                <input 
                  type="text"
                  value={formState.arabicName}
                  onChange={(e) => setFormState({ ...formState, arabicName: e.target.value })}
                  placeholder="e.g. كنبة ديون المعيارية"
                  className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                  SKU *
                </label>
                <input 
                  type="text" required
                  value={formState.sku}
                  onChange={(e) => setFormState({ ...formState, sku: e.target.value })}
                  className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs font-mono focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                  Category *
                </label>
                <select
                  value={formState.category}
                  onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                  className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                  Lead Time / Dispatch
                </label>
                <input 
                  type="text"
                  value={formState.leadTime}
                  onChange={(e) => setFormState({ ...formState, leadTime: e.target.value })}
                  className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                  Price (AED) *
                </label>
                <input 
                  type="number" required min="0"
                  value={formState.priceAED}
                  onChange={(e) => setFormState({ ...formState, priceAED: e.target.value })}
                  placeholder="14500"
                  className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                  Compare-at Price (AED, optional)
                </label>
                <input 
                  type="number" min="0"
                  value={formState.compareAtPriceAED}
                  onChange={(e) => setFormState({ ...formState, compareAtPriceAED: e.target.value })}
                  placeholder="16800"
                  className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Media / Images */}
          <div className="bg-white p-6 border border-[#EAE8E4] rounded-sm space-y-4">
            <h3 className="text-sm font-medium text-[#141414] pb-3 border-b border-[#F0EEE9]">
              Product Photography
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                  Primary Image URL *
                </label>
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input 
                    type="text" required
                    value={formState.image}
                    onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                    placeholder="/images/hero.jpg or https://..."
                    className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                  Secondary Hover Image URL
                </label>
                <input 
                  type="text"
                  value={formState.secondaryImage}
                  onChange={(e) => setFormState({ ...formState, secondaryImage: e.target.value })}
                  placeholder="/images/living_scene.jpg or https://..."
                  className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Descriptions & Specifications */}
          <div className="bg-white p-6 border border-[#EAE8E4] rounded-sm space-y-4">
            <h3 className="text-sm font-medium text-[#141414] pb-3 border-b border-[#F0EEE9]">
              Editorial Copy & Measurements
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                  Materials
                </label>
                <input 
                  type="text"
                  value={formState.materials}
                  onChange={(e) => setFormState({ ...formState, materials: e.target.value })}
                  placeholder="e.g. Solid Roman honed travertine"
                  className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                  Dimensions
                </label>
                <input 
                  type="text"
                  value={formState.dimensions}
                  onChange={(e) => setFormState({ ...formState, dimensions: e.target.value })}
                  placeholder="e.g. 280 × 110 × 68 cm"
                  className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                Short Description
              </label>
              <input 
                type="text"
                value={formState.shortDescription}
                onChange={(e) => setFormState({ ...formState, shortDescription: e.target.value })}
                placeholder="One-line editorial summary..."
                className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                Full Product Description
              </label>
              <textarea 
                rows={4}
                value={formState.description}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                placeholder="Detailed craftsmanship and design story..."
                className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black resize-none"
              />
            </div>
          </div>

          {/* Section 4: Finishes & Technical Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Swatches */}
            <div className="bg-white p-6 border border-[#EAE8E4] rounded-sm space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#141414]">
                Finishes & Swatches
              </h4>
              <div className="flex flex-wrap gap-2 min-h-[28px]">
                {(formState.colors || []).map((c, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 bg-[#FAFAF9] border border-[#DDD8CF] px-2.5 py-1 rounded-full text-[11px]">
                    <span style={{ backgroundColor: c.hex }} className="w-3 h-3 rounded-full border border-black/15" />
                    <span>{c.name}</span>
                    <button type="button" onClick={() => handleRemoveColor(idx)} className="text-neutral-400 hover:text-red-600 ml-0.5 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="w-8 h-8 border border-[#DDD8CF] rounded-xs cursor-pointer bg-white shrink-0"
                />
                <input 
                  type="text"
                  placeholder="Finish name"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  className="flex-1 min-w-0 border border-[#DDD8CF] bg-[#FAFAF9] px-3 py-1.5 rounded-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="p-2 bg-[#141414] text-white rounded-xs cursor-pointer shrink-0"
                  title="Add finish"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Dynamic Specs */}
            <div className="bg-white p-6 border border-[#EAE8E4] rounded-sm space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#141414]">
                Technical Specs
              </h4>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {Object.entries(formState.specs || {}).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between bg-[#FAFAF9] px-3 py-1.5 border border-[#EAE8E4] rounded-xs text-[11px]">
                    <span className="truncate mr-2"><strong>{k}:</strong> {v}</span>
                    <button type="button" onClick={() => handleRemoveSpec(k)} className="text-neutral-400 hover:text-red-600 cursor-pointer shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="text"
                  placeholder="Key"
                  value={newSpecKey}
                  onChange={(e) => setNewSpecKey(e.target.value)}
                  className="w-1/3 border border-[#DDD8CF] bg-[#FAFAF9] px-2.5 py-1.5 rounded-xs focus:outline-none"
                />
                <input 
                  type="text"
                  placeholder="Value"
                  value={newSpecVal}
                  onChange={(e) => setNewSpecVal(e.target.value)}
                  className="flex-1 min-w-0 border border-[#DDD8CF] bg-[#FAFAF9] px-2.5 py-1.5 rounded-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="p-2 bg-[#141414] text-white rounded-xs cursor-pointer shrink-0"
                  title="Add specification"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Status Flags, Live Storefront Card Preview & Submit */}
        <div className="xl:col-span-4 space-y-6 text-xs sticky top-24">
          
          {/* Status & Flags */}
          <div className="bg-white p-6 border border-[#EAE8E4] rounded-sm space-y-3">
            <h3 className="text-sm font-medium text-[#141414] pb-3 border-b border-[#F0EEE9]">
              Availability & Badges
            </h3>
            {[
              { key: 'inStock', label: 'In Stock (Ready to Ship)' },
              { key: 'isNew', label: 'New Arrival Badge' },
              { key: 'isBespoke', label: 'Bespoke Sizing Available' },
              { key: 'isBestSeller', label: 'Featured / Best Seller' }
            ].map(flag => (
              <label key={flag.key} className="flex items-center justify-between py-1 cursor-pointer">
                <span className="text-[#141414]">{flag.label}</span>
                <input 
                  type="checkbox"
                  checked={Boolean(formState[flag.key])}
                  onChange={(e) => setFormState({ ...formState, [flag.key]: e.target.checked })}
                  className="accent-black w-4 h-4"
                />
              </label>
            ))}
          </div>

          {/* Live Card Preview */}
          <div className="bg-white p-6 border border-[#EAE8E4] rounded-sm space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block">
              Storefront Card Preview
            </span>
            <div className="max-w-[240px] mx-auto">
              <div className="relative aspect-[3/4] bg-[#F5F4F0] border border-[#EAE8E4] rounded-xs overflow-hidden mb-2.5 flex items-center justify-center">
                {formState.image ? (
                  <img src={formState.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-neutral-400 p-4">
                    <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                    <span className="text-[10px]">Image Preview</span>
                  </div>
                )}
                {formState.isNew && (
                  <span className="absolute top-2 left-2 bg-white/95 text-[#141414] text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 rounded-full font-medium">
                    New
                  </span>
                )}
              </div>
              <div className="text-xs font-normal text-[#141414] truncate">
                {formState.name || 'Untitled Product'}
              </div>
              <div className="text-xs font-semibold text-[#141414] mt-0.5">
                {formState.priceAED ? formatPrice(Number(formState.priceAED)) : 'AED 0'}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              type="submit"
              className="w-full bg-[#141414] hover:bg-neutral-800 text-white py-3.5 px-6 rounded-full text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>{initialProduct ? 'Save Product Changes' : 'Publish Product'}</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-white border border-[#DDD8CF] hover:border-black text-neutral-600 hover:text-black py-3 px-6 rounded-full text-xs uppercase tracking-[0.18em] font-medium cursor-pointer transition-colors"
            >
              Cancel
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}

