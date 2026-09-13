import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProducts, saveProduct, deleteProduct } from '../../lib/storage';
import { LegalBadge } from '../../components/LegalBadge';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Store,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export const ProductManager = () => {
  const { activeGroup } = useAuth();
  const allProducts = getProducts();
  const groupProducts = allProducts.filter(p => p.groupId === activeGroup?.id);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenAdd = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      groupId: activeGroup.id,
      groupName: activeGroup.brand || activeGroup.name,
      facultyName: activeGroup.facultyName || 'FEB',
      name: '',
      category: 'kuliner',
      price: 50000,
      unit: 'Pcs',
      stock: 50,
      wholesalePrice: 40000,
      wholesaleMin: 10,
      rating: 5.0,
      reviewsCount: 1,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
      description: '',
      legalities: ['NIB'],
      whatsappNumber: activeGroup.socials?.whatsapp || '6281248901122'
    });
    setEditModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveProduct(editingProduct);
    setEditModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus produk ini dari etalase MENOKEN Market?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest">
            Katalog Produk Mandiri
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Kelola Produk & Etalase Usaha
          </h1>
          <p className="text-xs text-slate-500">
            Produk yang ditambahkan di sini akan otomatis tampil di katalog MENOKEN Market publik dan Web Kasir POS.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-uncen-navy hover:bg-uncen-navy-dark text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Produk Baru
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupProducts.map(prod => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 bg-slate-100">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {prod.legalities?.map(leg => (
                    <LegalBadge key={leg} type={leg} showIcon={false} />
                  ))}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{prod.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{prod.description}</p>
                <div className="text-base font-black text-uncen-navy">
                  Rp{prod.price.toLocaleString('id-ID')}
                  <span className="text-xs font-normal text-slate-400">/{prod.unit}</span>
                </div>
                {prod.wholesalePrice && (
                  <div className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold">
                    Grosir: Rp{prod.wholesalePrice.toLocaleString('id-ID')} (Min {prod.wholesaleMin || 10})
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Stok: <strong>{prod.stock || 0}</strong></span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setEditingProduct({ ...prod });
                    setEditModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(prod.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95 text-xs">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-black text-slate-900 mb-4">
              Informasi Produk & Harga
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Harga Retail (Rp)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Satuan</label>
                  <input
                    type="text"
                    placeholder="Pouch 250g / Pcs"
                    value={editingProduct.unit}
                    onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Harga Grosir B2B (Rp)</label>
                  <input
                    type="number"
                    value={editingProduct.wholesalePrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, wholesalePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Min. Order Grosir</label>
                  <input
                    type="number"
                    value={editingProduct.wholesaleMin || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, wholesaleMin: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">URL Foto Produk</label>
                <input
                  type="url"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Produk</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-uncen-navy text-white font-bold"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
