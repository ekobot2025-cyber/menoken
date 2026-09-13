import React, { useState, useMemo } from 'react';
import { getProducts, getGroups, getMasterData } from '../lib/storage';
import { LegalBadge } from '../components/LegalBadge';
import {
  Search,
  Filter,
  Store,
  ExternalLink,
  MessageCircle,
  FileSpreadsheet,
  X,
  CheckCircle2,
  MapPin,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const MarketPublic = () => {
  const allProducts = getProducts();
  const groups = getGroups();
  const masterData = getMasterData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [selectedLegality, setSelectedLegality] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqProduct, setRfqProduct] = useState(null);
  const [rfqSuccess, setRfqSuccess] = useState(false);

  // RFQ Form state
  const [rfqForm, setRfqForm] = useState({
    buyerName: '',
    company: '',
    email: '',
    phone: '',
    quantity: '50',
    targetDate: '',
    notes: ''
  });

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchFaculty = selectedFaculty === 'all' || p.facultyName === selectedFaculty;
      const matchLeg =
        selectedLegality === 'all' || (p.legalities && p.legalities.includes(selectedLegality));

      return matchSearch && matchCat && matchFaculty && matchLeg;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });
  }, [allProducts, searchQuery, selectedCategory, selectedFaculty, selectedLegality, sortBy]);

  const handleWhatsAppOrder = (product) => {
    const phone = product.whatsappNumber || '6281248901122';
    const text = encodeURIComponent(
      `Halo *${product.groupName}*, saya tertarik memesan produk:

*${product.name}*
Harga: Rp${product.price.toLocaleString('id-ID')}
Satuan: ${product.unit}

Mohon info ketersediaan stok dan estimasi ongkir ke alamat saya. Terima kasih!`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleRfqSubmit = (e) => {
    e.preventDefault();
    setRfqSuccess(true);
    setTimeout(() => {
      setRfqSuccess(false);
      setRfqModalOpen(false);
      alert(`Permintaan Penawaran B2B untuk "${rfqProduct?.name}" berhasil dikirimkan ke kelompok usaha! Tim mahasiswa akan menghubungi Anda.`);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Marketplace Banner (Agro-Commerce Style) */}
      <div className="rounded-3xl bg-gradient-to-r from-uncen-navy to-uncen-teal text-white p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            Katalog Publik Produk Mahasiswa
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            MENOKEN Market
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Dukung kemandirian ekonomi mahasiswa Universitas Cenderawasih. Temukan produk kuliner, kriya noken, olahan pertanian sagu & buah merah berkualitas dengan legalitas terverifikasi.
          </p>
        </div>
      </div>

      {/* Visual Category Cards (Agro-Commerce Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
            selectedCategory === 'all'
              ? 'bg-uncen-navy text-white border-uncen-navy shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
          }`}
        >
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold">Semua Produk</span>
          <span className="text-[10px] opacity-75">{allProducts.length} Item</span>
        </button>

        {masterData.categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-uncen-navy text-white border-uncen-navy shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs">
              {cat.name.substring(0, 1)}
            </div>
            <span className="text-xs font-bold line-clamp-1">{cat.name}</span>
            <span className="text-[10px] opacity-75">
              {allProducts.filter((p) => p.category === cat.id).length} Item
            </span>
          </button>
        ))}
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari produk atau nama kelompok usaha..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Faculty Filter */}
          <select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">Semua Fakultas</option>
            {masterData.faculties?.map((f) => (
              <option key={f.id} value={f.short}>
                {f.short} - {f.name}
              </option>
            ))}
          </select>

          {/* Legality Filter */}
          <select
            value={selectedLegality}
            onChange={(e) => setSelectedLegality(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">Semua Legalitas</option>
            <option value="NIB">NIB Resmi</option>
            <option value="PIRT">P-IRT Dinkes</option>
            <option value="Halal">Halal MUI</option>
            <option value="BPOM">BPOM RI</option>
            <option value="HAKI">HAKI / Merek</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="popular">Paling Populer</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="price_asc">Harga Terendah</option>
            <option value="price_desc">Harga Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <Store className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Tidak ada produk yang cocok</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Coba sesuaikan kata kunci pencarian atau reset filter kategori/fakultas yang Anda pilih.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedFaculty('all');
              setSelectedLegality('all');
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div
                  className="relative h-48 overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => setActiveModalProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {product.legalities?.map((leg) => (
                      <LegalBadge key={leg} type={leg} showIcon={false} />
                    ))}
                  </div>

                  {product.wholesalePrice && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-slate-900/80 backdrop-blur-sm text-amber-300 text-[10px] font-bold">
                      Grosir B2B: Rp{product.wholesalePrice.toLocaleString('id-ID')}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-uncen-navy flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {product.groupName}
                    </span>
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-bold">
                      {product.facultyName}
                    </span>
                  </div>

                  <h3
                    onClick={() => setActiveModalProduct(product)}
                    className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition line-clamp-2 cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="p-4 pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400">Harga Satuan</div>
                    <div className="text-base font-black text-slate-900">
                      Rp{product.price.toLocaleString('id-ID')}
                      <span className="text-[10px] font-normal text-slate-500 ml-1">
                        /{product.unit || 'pcs'}
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-amber-600">
                    ★ {product.rating || '4.9'} ({product.reviewsCount || 20})
                  </div>
                </div>

                {/* Action Buttons: Dual Mode (B2C WhatsApp Quick Order + B2B RFQ) */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleWhatsAppOrder(product)}
                    className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Pesan WA
                  </button>

                  <button
                    onClick={() => {
                      setRfqProduct(product);
                      setRfqModalOpen(true);
                    }}
                    className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center gap-1.5 transition border border-slate-200"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-uncen-navy" />
                    RFQ B2B
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden aspect-square bg-slate-100 border border-slate-200">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProduct.legalities?.map((leg) => (
                    <LegalBadge key={leg} type={leg} />
                  ))}
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                    {activeModalProduct.groupName} • {activeModalProduct.facultyName}
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    {activeModalProduct.name}
                  </h2>
                  <div className="text-xl font-black text-uncen-navy mt-2">
                    Rp{activeModalProduct.price.toLocaleString('id-ID')}
                    <span className="text-xs font-normal text-slate-500 ml-1">
                      /{activeModalProduct.unit}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {activeModalProduct.description}
                  </p>

                  {/* Wholesale Pricing Tier */}
                  {activeModalProduct.wholesalePrice && (
                    <div className="mt-4 p-3 bg-amber-50 rounded-2xl border border-amber-200/60 text-xs">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        Harga Grosir & Pengadaan B2B:
                      </div>
                      <div className="text-slate-700 mt-0.5">
                        <strong>Rp{activeModalProduct.wholesalePrice.toLocaleString('id-ID')}</strong> (Min. {activeModalProduct.wholesaleMin || 10} {activeModalProduct.unit})
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      handleWhatsAppOrder(activeModalProduct);
                      setActiveModalProduct(null);
                    }}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Pesan Retail via WhatsApp Resmi
                  </button>

                  {activeModalProduct.shopeeUrl && (
                    <a
                      href={activeModalProduct.shopeeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 font-bold text-xs flex items-center justify-center gap-2 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Beli di Shopee Toko Mahasiswa
                    </a>
                  )}

                  <button
                    onClick={() => {
                      setRfqProduct(activeModalProduct);
                      setActiveModalProduct(null);
                      setRfqModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-uncen-navy" />
                    Ajukan Penawaran Grosir / Kemitraan (B2B RFQ)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* B2B Wholesale / RFQ Modal (Agro-Commerce Feature) */}
      {rfqModalOpen && rfqProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setRfqModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-uncen-navy uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                B2B Request for Quotation (RFQ)
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Formulir Pengadaan Grosir
              </h3>
              <p className="text-xs text-slate-500">
                Produk: <strong>{rfqProduct.name}</strong> ({rfqProduct.groupName})
              </p>
            </div>

            {rfqSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-slate-900">RFQ Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-500">
                  Permintaan Anda telah tercatat dan dikirimkan langsung ke kontak resmi kelompok usaha.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Pemohon / PIC</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bpk. Gunawan"
                    value={rfqForm.buyerName}
                    onChange={(e) => setRfqForm({ ...rfqForm, buyerName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Perusahaan / Instansi</label>
                    <input
                      type="text"
                      placeholder="Hotel / Cafe / Dinas"
                      value={rfqForm.company}
                      onChange={(e) => setRfqForm({ ...rfqForm, company: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">WhatsApp / No. HP</label>
                    <input
                      type="tel"
                      required
                      placeholder="0812..."
                      value={rfqForm.phone}
                      onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Jumlah Kebutuhan</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 100 kg / 50 pcs"
                      value={rfqForm.quantity}
                      onChange={(e) => setRfqForm({ ...rfqForm, quantity: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Target Pengiriman</label>
                    <input
                      type="date"
                      value={rfqForm.targetDate}
                      onChange={(e) => setRfqForm({ ...rfqForm, targetDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Spesifikasi Tambahan / Catatan</label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Kemasan custom, tingkat sangrai medium dark..."
                    value={rfqForm.notes}
                    onChange={(e) => setRfqForm({ ...rfqForm, notes: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setRfqModalOpen(false)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-uncen-navy text-white font-bold hover:bg-uncen-navy-dark transition shadow-sm"
                  >
                    Kirim Permintaan Penawaran
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
