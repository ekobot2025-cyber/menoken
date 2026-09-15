import React, { useState, useEffect } from 'react';
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
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Check
} from 'lucide-react';

const PRESET_IMAGES = [
  { name: 'Kopi Arabika Wamena', url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800' },
  { name: 'Noken Tradisional', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800' },
  { name: 'Olahan Sagu Papua', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800' },
  { name: 'Madu Organik Wamena', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800' },
  { name: 'Keripik Keladi Renyah', url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800' },
  { name: 'Cokelat Ransiki Papua', url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800' },
  { name: 'Ikan Asap Papua', url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800' },
  { name: 'Minyak Buah Merah', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800' }
];

export const ProductManager = () => {
  const { activeGroup } = useAuth();
  const [products, setProducts] = useState(() => getProducts());

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Real-time synchronization on storage events
  useEffect(() => {
    const handleStorageUpdate = () => {
      setProducts(getProducts());
    };
    window.addEventListener('menoken-storage-update', handleStorageUpdate);
    return () => window.removeEventListener('menoken-storage-update', handleStorageUpdate);
  }, []);

  const groupProducts = products.filter(p => p.groupId === activeGroup?.id);

  const handleOpenAdd = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      groupId: activeGroup?.id || 'grp-wamena-kopi',
      groupName: activeGroup?.brand || activeGroup?.name || 'Kelompok Usaha',
      facultyName: activeGroup?.facultyName || 'FEB',
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
      whatsappNumber: activeGroup?.socials?.whatsapp || '6281248901122'
    });
    setEditModalOpen(true);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: warn if > 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setEditingProduct(prev => ({ ...prev, image: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    saveProduct(editingProduct);
    setProducts(getProducts()); // Instant real-time update in state
    setEditModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus produk ini dari etalase MENOKEN Market?')) {
      deleteProduct(id);
      setProducts(getProducts()); // Instant real-time update in state
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
            Produk yang ditambahkan di sini akan otomatis tampil di katalog MENOKEN Market publik dan Web Kasir POS secara realtime.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-uncen-navy hover:bg-uncen-navy-dark text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
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
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover transition duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800';
                  }}
                />
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
              <span className="text-slate-400">Stok: <strong className="text-slate-700">{prod.stock || 0}</strong></span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct({ ...prod });
                    setEditModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  title="Edit Produk & Ganti Foto"
                >
                  <Edit2 className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(prod.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                  title="Hapus Produk"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit & Add Product Modal */}
      {editModalOpen && editingProduct && (
        <div
          onClick={() => setEditModalOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95 text-xs text-slate-900 border border-slate-200 my-8"
          >
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-black text-slate-900 mb-1">
              {editingProduct.id.startsWith('prod-') && !products.some(p => p.id === editingProduct.id)
                ? 'Tambah Produk Baru'
                : 'Sunting Informasi & Foto Produk'}
            </h3>
            <p className="text-[11px] text-slate-500 mb-4">
              Perubahan nama, harga, dan foto akan langsung diterapkan di seluruh sistem.
            </p>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* IMAGE UPLOAD & PREVIEW SECTION */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="block font-bold text-slate-800">
                  Foto Produk (Pilih Berkas atau Masukkan Tautan)
                </label>

                <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                  {/* Live Image Preview */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 flex-shrink-0 shadow-inner">
                    {editingProduct.image ? (
                      <img
                        src={editingProduct.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[10px]">
                        <ImageIcon className="w-5 h-5 mb-0.5 opacity-50" />
                        <span>Pratinjau</span>
                      </div>
                    )}
                  </div>

                  {/* Upload File & URL Controls */}
                  <div className="flex-1 space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-600 block mb-1">
                        1. Unggah dari Laptop/HP:
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-uncen-navy file:text-white hover:file:bg-uncen-navy-dark cursor-pointer"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-600 block mb-1">
                        2. Atau Tempel Tautan Gambar:
                      </span>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={editingProduct.image}
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Preset Gallery */}
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block mb-1">
                    Atau gunakan contoh foto Papua berikut:
                  </span>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {PRESET_IMAGES.map((preset, pIdx) => {
                      const isSelected = editingProduct.image === preset.url;
                      return (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setEditingProduct({ ...editingProduct, image: preset.url })}
                          className={`flex-shrink-0 px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition cursor-pointer ${
                            isSelected
                              ? 'border-uncen-navy bg-uncen-navy text-white shadow-sm'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <img src={preset.url} alt="" className="w-3.5 h-3.5 rounded object-cover" />
                          <span>{preset.name}</span>
                          {isSelected && <Check className="w-3 h-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
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
                <label className="block font-semibold text-slate-700 mb-1">Stok Tersedia</label>
                <input
                  type="number"
                  value={editingProduct.stock || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Produk</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 font-sans">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-uncen-navy hover:bg-uncen-navy-dark text-white font-bold cursor-pointer transition shadow"
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
