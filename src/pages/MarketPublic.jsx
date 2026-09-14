import React, { useState, useMemo } from 'react';
import { getProducts, getGroups, getMasterData } from '../lib/storage';
import { LegalBadge } from '../components/LegalBadge';
import { useTheme } from '../context/ThemeContext';
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
  ChevronRight,
  ShieldCheck,
  Award,
  Check,
  ArrowRight,
  Truck,
  Building2,
  PhoneCall,
  Flame,
  Coffee,
  ShoppingBag as BagIcon,
  Sprout,
  Shirt,
  Laptop,
  Compass
} from 'lucide-react';

export const MarketPublic = () => {
  const { isDark } = useTheme();
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
        (p.groupName && p.groupName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
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
      `Halo Tim Wirausaha *${product.groupName || 'MENOKEN UNCEN'}*, saya tertarik memesan produk berikut:

📦 *${product.name}*
💰 Harga: Rp${product.price.toLocaleString('id-ID')} / ${product.unit || 'pcs'}
🏛️ Kelompok: ${product.groupName} (${product.facultyName})

Mohon informasi ketersediaan stok, opsi pengiriman, dan estimasi ongkos kirim. Terima kasih!`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleGeneralWhatsApp = () => {
    const phone = '6281248901122';
    const text = encodeURIComponent(
      `Halo Pengelola MENOKEN Market & UPA Kewirausahaan Universitas Cenderawasih, saya ingin berkonsultasi mengenai produk wirausaha mahasiswa dan kerja sama kemitraan / pengadaan B2B.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleRfqSubmit = (e) => {
    e.preventDefault();
    setRfqSuccess(true);
    setTimeout(() => {
      setRfqSuccess(false);
      setRfqModalOpen(false);
      alert(`Permintaan Penawaran B2B untuk "${rfqProduct?.name}" berhasil diajukan! Tim pengelola wirausaha UNCEN akan segera menghubungi Anda.`);
    }, 1500);
  };

  // Category Icon Resolver
  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'kuliner':
        return <Coffee className="w-5 h-5 text-amber-500" />;
      case 'kerajinan':
        return <BagIcon className="w-5 h-5 text-emerald-500" />;
      case 'agribisnis':
        return <Sprout className="w-5 h-5 text-lime-500" />;
      case 'fashion':
        return <Shirt className="w-5 h-5 text-cyan-500" />;
      case 'teknologi':
        return <Laptop className="w-5 h-5 text-blue-500" />;
      case 'jasa':
        return <Compass className="w-5 h-5 text-purple-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-[#060c18] text-slate-100' : 'bg-[#faf9f5] text-slate-900'
    }`}>
      
      {/* ========================================================= */}
      {/* 1. AGRODYKE & MENOKEN HERO SECTION                       */}
      {/* ========================================================= */}
      <section className={`relative overflow-hidden pt-8 pb-14 border-b ${
        isDark 
          ? 'bg-gradient-to-b from-[#081726] via-[#060f1c] to-[#060c18] border-slate-800/80' 
          : 'bg-gradient-to-b from-[#fefbf0] via-[#fbf8ed] to-[#faf9f5] border-amber-200/50'
      }`}>
        {/* Glow accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Column: Heading & Mission */}
            <div className="max-w-2xl text-left space-y-4">
              
              {/* Category Pill Tag (Agrodyke Style) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
                <Sprout className="w-3.5 h-3.5" />
                <span>100% PRODUK ASLI MAHASISWA UNCEN PAPUA</span>
              </div>

              {/* Big Bold Agrodyke-Style Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase">
                <span className={`block ${isDark ? 'text-white' : 'text-[#0e4438]'}`}>
                  PASAR DIGITAL
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">
                  KOMODITAS PAPUA
                </span>
              </h1>

              {/* Subtitle */}
              <p className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Dukung kemandirian ekonomi mahasiswa 8 Fakultas Universitas Cenderawasih. Temukan <strong>Kopi Arabika Wamena</strong> petik merah, <strong>Kriya Noken</strong> serat mahkota asli, olahan pangan sagu bernutrisi, hingga minyak buah merah farmasi dengan legalitas resmi terverifikasi.
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href="#katalog-produk"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-950/20 hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>JELAJAHI KATALOG</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <button
                  onClick={handleGeneralWhatsApp}
                  className={`px-6 py-3.5 rounded-2xl border font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                    isDark 
                      ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-emerald-400 hover:text-emerald-300' 
                      : 'bg-white border-slate-300 text-slate-800 hover:border-emerald-600 hover:text-emerald-700 shadow-xs'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span>KONSULTASI PENGADAAN (WA)</span>
                </button>
              </div>

            </div>

            {/* Right Column: Agrodyke Trust Metrics Cards */}
            <div className="w-full lg:w-auto shrink-0 grid grid-cols-2 gap-4 sm:gap-6">
              
              <div className={`p-5 rounded-3xl border shadow-sm flex flex-col justify-between ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-amber-200/60'
              }`}>
                <div className="text-3xl sm:text-4xl font-black text-emerald-500">8</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Fakultas Terpadu</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">FEB, FST, FKIP, FISIP, FH, FK, FKM, FMIPA</div>
              </div>

              <div className={`p-5 rounded-3xl border shadow-sm flex flex-col justify-between ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-amber-200/60'
              }`}>
                <div className="text-3xl sm:text-4xl font-black text-amber-500">30+</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Komoditas Siap Kirim</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Kopi, Kriya, Pangan & Herbal</div>
              </div>

              <div className={`p-5 rounded-3xl border shadow-sm flex flex-col justify-between ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-amber-200/60'
              }`}>
                <div className="text-3xl sm:text-4xl font-black text-cyan-500">100%</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Legalitas Resmi</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">NIB, P-IRT, Halal & BPOM</div>
              </div>

              <div className={`p-5 rounded-3xl border shadow-sm flex flex-col justify-between ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-amber-200/60'
              }`}>
                <div className="text-3xl sm:text-4xl font-black text-teal-500">B2B</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Siap Skala Grosir</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Kemitraan Hotel, Kafe & BUMN</div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 2. VISUAL CATEGORIES SECTION (AGRODYKE TABS)             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            Pilih Kategori Produk
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Temukan produk unggulan dari sektor agromaritim, kuliner lokal, hingga kriya khas Papua
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          
          {/* Semua Produk */}
          <button
            onClick={() => setSelectedCategory('all')}
            className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 cursor-pointer select-none group ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-500 shadow-md scale-102'
                : isDark 
                  ? 'bg-slate-900/80 text-slate-200 border-slate-800 hover:border-emerald-500/60' 
                  : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500 shadow-xs'
            }`}
          >
            <div className={`p-2 rounded-xl transition ${
              selectedCategory === 'all' ? 'bg-white/20' : isDark ? 'bg-slate-800' : 'bg-emerald-50'
            }`}>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xs font-black">Semua Produk</span>
            <span className={`text-[10px] font-bold ${selectedCategory === 'all' ? 'text-emerald-100' : 'text-slate-400'}`}>
              {allProducts.length} Item
            </span>
          </button>

          {/* Dynamic Master Categories */}
          {masterData.categories?.map((cat) => {
            const count = allProducts.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 cursor-pointer select-none group ${
                  isSelected
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-500 shadow-md scale-102'
                    : isDark 
                      ? 'bg-slate-900/80 text-slate-200 border-slate-800 hover:border-emerald-500/60' 
                      : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500 shadow-xs'
                }`}
              >
                <div className={`p-2 rounded-xl transition ${
                  isSelected ? 'bg-white/20' : isDark ? 'bg-slate-800' : 'bg-slate-50'
                }`}>
                  {getCategoryIcon(cat.id)}
                </div>
                <span className="text-xs font-bold line-clamp-1">{cat.name}</span>
                <span className={`text-[10px] font-bold ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {count} Item
                </span>
              </button>
            );
          })}
        </div>
      </section>


      {/* ========================================================= */}
      {/* 3. SEARCH & FILTERS BAR (CLEAN AGRODYKE TOOLBAR)         */}
      {/* ========================================================= */}
      <section id="katalog-produk" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className={`p-4 rounded-3xl border shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari produk (kopi, noken, sagu, buah merah)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs font-semibold focus:outline-none focus:border-emerald-500 transition border ${
                isDark 
                  ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            
            {/* Faculty Filter */}
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold border focus:outline-none focus:border-emerald-500 cursor-pointer ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="all">Semua Fakultas (8 Fakultas)</option>
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
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold border focus:outline-none focus:border-emerald-500 cursor-pointer ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="all">Semua Legalitas</option>
              <option value="NIB">NIB Resmi</option>
              <option value="PIRT">P-IRT Dinkes</option>
              <option value="Halal">Halal MUI</option>
              <option value="BPOM">BPOM RI</option>
              <option value="HAKI">HAKI / Hak Cipta</option>
            </select>

            {/* Sort Order */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold border focus:outline-none focus:border-emerald-500 cursor-pointer ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="popular">Paling Populer</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="price_asc">Harga Terendah</option>
              <option value="price_desc">Harga Tertinggi</option>
            </select>

            {/* Reset Filter Button */}
            {(searchQuery || selectedCategory !== 'all' || selectedFaculty !== 'all' || selectedLegality !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedFaculty('all');
                  setSelectedLegality('all');
                }}
                className="p-2.5 rounded-2xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 text-xs font-bold flex items-center gap-1 transition"
                title="Reset Filter"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 4. PRODUCT GRID (AGRODYKE CARD ARCHITECTURE)            */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        
        {filteredProducts.length === 0 ? (
          <div className={`p-12 rounded-3xl border text-center space-y-4 ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <Store className="w-14 h-14 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold">Produk Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Tidak ada produk yang cocok dengan kombinasi kata kunci atau filter saat ini. Silakan coba atur ulang filter pencarian Anda.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedFaculty('all');
                setSelectedLegality('all');
              }}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              
              /* Agrodyke Style Product Card */
              <div
                key={product.id}
                className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-xl ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/60'
                    : 'bg-white border-slate-200/90 hover:border-emerald-600/60 shadow-sm'
                }`}
              >
                {/* Top Badge: Agrodyke Style Category Tag */}
                <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    {product.facultyName ? `PRODUK ${product.facultyName} UNCEN` : 'PRODUK LOKAL PAPUA'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-black text-amber-500">
                    ★ {product.rating || '4.9'} <span className="text-[10px] font-normal text-slate-400">({product.reviewsCount || 20})</span>
                  </div>
                </div>

                {/* Product Photo with Badges */}
                <div
                  onClick={() => setActiveModalProduct(product)}
                  className="relative mx-4 rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-950 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay Legality Badges (Top Left) */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                    {product.legalities?.map((leg) => (
                      <LegalBadge key={leg} type={leg} showIcon={false} />
                    ))}
                  </div>

                  {/* Wholesale Pricing Tag (Bottom Right) */}
                  {product.wholesalePrice && (
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md text-amber-300 border border-white/10 text-[10.5px] font-mono font-bold shadow-md">
                      Grosir B2B: Rp{product.wholesalePrice.toLocaleString('id-ID')}
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  
                  <div>
                    {/* Producer & Faculty */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{product.groupName}</span>
                    </div>

                    {/* Bold Product Title (Agrodyke Big Bold Style) */}
                    <h3
                      onClick={() => setActiveModalProduct(product)}
                      className="text-base sm:text-lg font-black uppercase tracking-tight leading-snug line-clamp-2 cursor-pointer hover:text-emerald-500 transition"
                    >
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Minimum Order (Agrodyke Pricing Row) */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Harga Satuan:</span>
                        <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                          Rp{product.price.toLocaleString('id-ID')}
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1">
                            /{product.unit || 'pcs'}
                          </span>
                        </div>
                      </div>

                      {/* Minimum Purchase Pill */}
                      <span className="px-2.5 py-1 rounded-lg bg-amber-400/15 text-amber-600 dark:text-amber-400 border border-amber-400/30 text-[10.5px] font-black">
                        Min. {product.wholesaleMin ? `1 ${product.unit || 'pcs'}` : '1 pcs'}
                      </span>
                    </div>

                    {/* Agrodyke-Style Bullet Checklist Points */}
                    <div className="mt-3 space-y-1 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>100% Bahan Alami Asli Papua</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Legalitas NIB & Izin Resmi Terdaftar</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Dukungan Inkubasi UPA Uncen Siap Kirim</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons: Agrodyke Dual Action (Pesan WA + B2B RFQ) */}
                  <div className="pt-2 grid grid-cols-2 gap-2.5">
                    
                    {/* Primary Button: WhatsApp Direct Order */}
                    <button
                      onClick={() => handleWhatsAppOrder(product)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition shadow-md shadow-emerald-950/20 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Pesan WA</span>
                    </button>

                    {/* Secondary Button: RFQ B2B */}
                    <button
                      onClick={() => {
                        setRfqProduct(product);
                        setRfqModalOpen(true);
                      }}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition border cursor-pointer ${
                        isDark
                          ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                      <span>Detail & B2B</span>
                    </button>

                  </div>

                </div>

              </div>

            ))}
          </div>
        )}

      </section>


      {/* ========================================================= */}
      {/* 5. AGRODYKE B2B WHOLESALE & EXPORT PROCUREMENT BANNER    */}
      {/* ========================================================= */}
      <section className={`py-14 border-t ${
        isDark ? 'bg-[#081524] border-slate-800' : 'bg-[#f4efe4] border-amber-200/70'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 sm:p-10 rounded-3xl border shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 ${
            isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            
            <div className="space-y-3 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-500 border border-amber-400/30 text-xs font-black uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>PENGADAAN GROSIR & KEMITRAAN INSTITUSI (B2B)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Pemesanan Jumlah Besar untuk Hotel, Kafe, Perusahaan & BUMN
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Kami melayani pengadaan resmi biji kopi Wamena (green beans & roasted beans) per kwintal, cinderamata Noken resmi untuk instansi, hingga konsumsi snack bar & agromaritim segar dengan faktur legal dan kontrak kerja sama terverifikasi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => {
                  setRfqProduct(allProducts[0] || null);
                  setRfqModalOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>AJUKAN PENAWARAN B2B</span>
              </button>

              <button
                onClick={handleGeneralWhatsApp}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl border font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                  isDark ? 'border-slate-700 hover:bg-slate-800 text-white' : 'border-slate-300 hover:bg-slate-100 text-slate-900'
                }`}
              >
                <PhoneCall className="w-4 h-4 text-emerald-500" />
                <span>HUBUNGI PENGELOLA</span>
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 6. FLOATING WHATSAPP ASSISTANCE BUTTON (AGRODYKE CHAT)   */}
      {/* ========================================================= */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleGeneralWhatsApp}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl hover:scale-110 transition-transform cursor-pointer border-2 border-white/40"
          title="Chat WhatsApp dengan UPA Uncen Market"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
          <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-slate-950 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Chat WhatsApp Market
          </span>
        </button>
      </div>


      {/* ========================================================= */}
      {/* 7. PRODUCT DETAIL MODAL                                   */}
      {/* ========================================================= */}
      {activeModalProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden aspect-square bg-slate-950 border border-slate-800">
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
                  <div className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeModalProduct.groupName} • {activeModalProduct.facultyName}</span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-1">
                    {activeModalProduct.name}
                  </h2>

                  <div className="text-2xl font-black text-emerald-500 mt-2">
                    Rp{activeModalProduct.price.toLocaleString('id-ID')}
                    <span className="text-xs font-normal text-slate-400 ml-1">
                      /{activeModalProduct.unit}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    {activeModalProduct.description}
                  </p>

                  {/* Wholesale Pricing Tier */}
                  {activeModalProduct.wholesalePrice && (
                    <div className={`mt-4 p-3.5 rounded-2xl border text-xs ${
                      isDark ? 'bg-amber-950/20 border-amber-800/40 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Harga Grosir & Pengadaan B2B:</span>
                      </div>
                      <div className="mt-1">
                        <strong>Rp{activeModalProduct.wholesalePrice.toLocaleString('id-ID')}</strong> (Min. {activeModalProduct.wholesaleMin || 10} {activeModalProduct.unit})
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => handleWhatsAppOrder(activeModalProduct)}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pesan Langsung via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      setRfqProduct(activeModalProduct);
                      setRfqModalOpen(true);
                      setActiveModalProduct(null);
                    }}
                    className={`w-full py-2.5 rounded-2xl border font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                      isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-200' : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                    <span>Ajukan Penawaran Grosir (RFQ)</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}


      {/* ========================================================= */}
      {/* 8. RFQ B2B MODAL                                          */}
      {/* ========================================================= */}
      {rfqModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setRfqModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base">Permintaan Penawaran B2B (RFQ)</h3>
            </div>

            {rfqProduct && (
              <div className={`my-3 p-3 rounded-2xl border text-xs flex items-center gap-3 ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <img
                  src={rfqProduct.image}
                  alt={rfqProduct.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold">{rfqProduct.name}</h4>
                  <p className="text-[11px] text-slate-400">
                    Produsen: {rfqProduct.groupName} ({rfqProduct.facultyName})
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleRfqSubmit} className="space-y-3 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Nama Pemohon</label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Bpk. Kurnia"
                    value={rfqForm.buyerName}
                    onChange={(e) => setRfqForm({ ...rfqForm, buyerName: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Instansi / Perusahaan</label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Hotel Papua / BUMN"
                    value={rfqForm.company}
                    onChange={(e) => setRfqForm({ ...rfqForm, company: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="0812xxxx"
                    value={rfqForm.phone}
                    onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Estimasi Kuantitas</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={rfqForm.quantity}
                    onChange={(e) => setRfqForm({ ...rfqForm, quantity: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Catatan Tambahan & Spesifikasi</label>
                <textarea
                  rows="3"
                  placeholder="Sebutkan kebutuhan kemasan, pengiriman, atau jadwal pengadaan..."
                  value={rfqForm.notes}
                  onChange={(e) => setRfqForm({ ...rfqForm, notes: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRfqModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md cursor-pointer"
                >
                  {rfqSuccess ? 'Mengirim...' : 'Kirim Pengajuan RFQ'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Official 1-Line Footer */}
      <footer className={`py-6 border-t text-[10.5px] sm:text-[11px] lg:text-[11.5px] transition-colors duration-200 ${
        isDark ? 'bg-[#040810] border-slate-800/80 text-slate-500' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 whitespace-nowrap text-center lg:text-left">
            <img src="/noken_pixar_3d.png" alt="MENOKEN" className="w-3.5 h-3.5 object-contain opacity-80 shrink-0" />
            <span>© 2026 MENOKEN • Manajemen Ekosistem & Networking Kewirausahaan • UPA Uncen Platform. All rights reserved.</span>
          </div>
          <div className="flex items-center justify-center lg:justify-end gap-1.5 whitespace-nowrap text-[10px] sm:text-[10.5px] lg:text-[11px]">
            <span>by</span>
            <a
              href="https://www.instagram.com/kurniawan_patma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 font-semibold transition"
            >
              Kurnia Patma
            </a>
            <span>|</span>
            <span>UI/UX by</span>
            <a
              href="https://www.linkedin.com/in/papedatimur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              Enterdie
            </a>
            <span>• Hak Cipta Dilindungi Undang-Undang</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
