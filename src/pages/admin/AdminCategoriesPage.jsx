import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  Check,
  FolderTree
} from 'lucide-react';
import { useStore } from '../../hooks/useStore';

export default function AdminCategoriesPage({
  categories: propCategories,
  products: propProducts,
  onAddCategory: propOnAddCategory,
  onUpdateCategory: propOnUpdateCategory,
  onDeleteCategory: propOnDeleteCategory
}) {
  const store = useStore();
  const categories = propCategories ?? store.categories;
  const products = propProducts ?? store.products;
  const onAddCategory = propOnAddCategory ?? store.addCategory;
  const onUpdateCategory = propOnUpdateCategory ?? store.updateCategory;
  const onDeleteCategory = propOnDeleteCategory ?? store.deleteCategory;

  const [editingCat, setEditingCat] = useState(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [arabicName, setArabicName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const toSlug = (val) =>
    val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const handleNameChange = (val) => {
    setName(val);
    if (!editingCat) {
      setSlug(toSlug(val));
    }
  };

  const resetForm = () => {
    setEditingCat(null);
    setName('');
    setSlug('');
    setArabicName('');
    setDescription('');
    setError('');
  };

  const handleEdit = (cat) => {
    setEditingCat(cat);
    setName(cat.name);
    setSlug(cat.id);
    setArabicName(cat.arabicName || '');
    setDescription(cat.description || '');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanSlug = toSlug(slug || cleanName);

    if (!cleanName || !cleanSlug) {
      setError('Category name and slug are required.');
      return;
    }

    if (!editingCat && categories.some(c => c.id === cleanSlug)) {
      setError(`A category with slug "${cleanSlug}" already exists.`);
      return;
    }

    const payload = {
      id: editingCat ? editingCat.id : cleanSlug,
      name: cleanName,
      arabicName: arabicName.trim(),
      description: description.trim()
    };

    if (editingCat) {
      // API-READY: Later replace with await fetch(`/api/categories/${payload.id}`, { method: 'PUT', body: JSON.stringify(payload) })
      onUpdateCategory(payload);
    } else {
      // API-READY: Later replace with await fetch('/api/categories', { method: 'POST', body: JSON.stringify(payload) })
      onAddCategory(payload);
    }

    resetForm();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
      
      {/* Left: Create / Edit Category Form */}
      <div className="lg:col-span-5 bg-white border border-[#EAE8E4] rounded-sm p-6 space-y-5">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7A58] font-semibold block mb-1">
            {editingCat ? 'Update Category' : 'New Category'}
          </span>
          <h3 className="text-base font-medium text-[#141414]">
            {editingCat ? `Edit "${editingCat.name}"` : 'Create Product Category'}
          </h3>
          <p className="text-[11px] text-neutral-400 font-light mt-0.5">
            Categories automatically appear in the Storefront Shop menu and Add Product form.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
              Category Name *
            </label>
            <input 
              type="text" required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Dining Tables"
              className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
              URL Slug / ID *
            </label>
            <input 
              type="text" required
              disabled={Boolean(editingCat)}
              value={slug}
              onChange={(e) => setSlug(toSlug(e.target.value))}
              placeholder="e.g. dining-tables"
              className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs font-mono focus:outline-none focus:border-black disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
              Arabic Name (Optional)
            </label>
            <input 
              type="text"
              value={arabicName}
              onChange={(e) => setArabicName(e.target.value)}
              placeholder="e.g. طاولات الطعام"
              className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs text-right focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
              Description (Optional)
            </label>
            <textarea 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short collection summary..."
              className="w-full border border-[#DDD8CF] bg-[#FAFAF9] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-black resize-none"
            />
          </div>

          <div className="pt-2 flex items-center gap-2.5">
            <button
              type="submit"
              className="flex-1 bg-[#141414] hover:bg-neutral-800 text-white py-3 px-5 rounded-full text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {editingCat ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{editingCat ? 'Save Category' : 'Create Category'}</span>
            </button>

            {editingCat && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-3 border border-[#DDD8CF] rounded-full text-xs uppercase tracking-wider text-neutral-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Right: Existing Categories Table */}
      <div className="lg:col-span-7 bg-white border border-[#EAE8E4] rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#EAE8E4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-[#141414]" />
            <h3 className="text-sm font-medium text-[#141414]">
              Active Categories ({categories.length})
            </h3>
          </div>
          <span className="text-[11px] text-neutral-400">API-Ready</span>
        </div>

        <div className="max-h-[calc(100vh-13rem)] overflow-auto">
          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-[#F0EEE9]">
            {categories.map(cat => {
              const prodCount = products.filter(p => p.category === cat.id).length;
              return (
                <div key={cat.id} className="p-4 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <div className="font-medium text-[#141414] truncate">{cat.name}</div>
                    <div className="text-[11px] font-mono text-neutral-400 truncate">
                      {cat.id} • {prodCount} {prodCount === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="p-2 text-neutral-600 hover:text-black bg-[#FAFAF9] border border-[#EAE8E4] rounded-full cursor-pointer"
                      title="Edit category"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        const warn = prodCount > 0
                          ? `"${cat.name}" currently has ${prodCount} product(s). Delete anyway?`
                          : `Delete category "${cat.name}"?`;
                        if (window.confirm(warn)) {
                          onDeleteCategory(cat.id);
                          if (editingCat?.id === cat.id) resetForm();
                        }
                      }}
                      className="p-2 text-red-500 bg-red-50/60 border border-red-200/70 rounded-full cursor-pointer"
                      title="Delete category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <table className="hidden md:table w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-[#FAFAF9]">
              <tr className="border-b border-[#EAE8E4] text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                <th className="py-3.5 px-5 font-semibold">Category Name</th>
                <th className="py-3.5 px-4 font-semibold">Slug / ID</th>
                <th className="py-3.5 px-4 font-semibold">Products</th>
                <th className="py-3.5 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EEE9] text-xs">
              {categories.map(cat => {
                const prodCount = products.filter(p => p.category === cat.id).length;
                return (
                  <tr key={cat.id} className="hover:bg-[#FAFAF9] transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-medium text-[#141414]">{cat.name}</div>
                      {cat.arabicName && (
                        <div className="text-[11px] text-neutral-400">{cat.arabicName}</div>
                      )}
                      {cat.description && (
                        <div className="text-[11px] text-neutral-500 font-light mt-0.5 line-clamp-1">
                          {cat.description}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-neutral-500">
                      {cat.id}
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-[#F4F2EE] text-[#141414] text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                        {prodCount} {prodCount === 1 ? 'item' : 'items'}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="p-2 text-neutral-500 hover:text-black hover:bg-[#F4F2EE] rounded-full transition-colors cursor-pointer"
                          title="Edit category"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            const warn = prodCount > 0 
                              ? `"${cat.name}" currently has ${prodCount} product(s). Delete anyway?`
                              : `Delete category "${cat.name}"?`;
                            if (window.confirm(warn)) {
                              onDeleteCategory(cat.id);
                              if (editingCat?.id === cat.id) resetForm();
                            }
                          }}
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                          title="Delete category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {categories.length === 0 && (
            <div className="text-center py-12 text-xs text-neutral-500">
              No categories created yet. Use the form on the left to add one.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

