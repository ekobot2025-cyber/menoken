import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProducts, addTransaction } from '../../lib/storage';
import { generateReceiptJpeg, downloadReceiptJpeg } from '../../utils/receiptCanvas';
import {
  Calculator,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Printer,
  MessageCircle,
  Receipt,
  X,
  CreditCard,
  Banknote,
  Sparkles,
  Download,
  Share2
} from 'lucide-react';

export const PosCashier = () => {
  const { activeGroup } = useAuth();
  const allProducts = getProducts();
  const groupProducts = allProducts.filter(p => p.groupId === activeGroup?.id);

  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Tunai');
  const [cashGiven, setCashGiven] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [receiptTrx, setReceiptTrx] = useState(null);
  const [isGeneratingJpeg, setIsGeneratingJpeg] = useState(false);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => {
    setCart([]);
    setCashGiven('');
    setCustomerName('');
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const changeAmount = Number(cashGiven) >= totalAmount ? Number(cashGiven) - totalAmount : 0;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newTrx = {
      id: `TRX-${Date.now().toString().slice(-6)}`,
      groupId: activeGroup.id,
      groupName: activeGroup.brand || activeGroup.name,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      type: 'kasir_festival',
      customerName: customerName.trim() || 'Pelanggan Stan Expo',
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        subtotal: item.price * item.qty
      })),
      totalAmount,
      paymentMethod,
      status: 'paid'
    };

    addTransaction(newTrx);
    setReceiptTrx(newTrx);
    clearCart();
  };

  const handlePrintReceipt = () => {
    document.body.classList.add('printing-receipt');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-receipt');
    }, 1000);
  };

  const handleShareReceiptWhatsApp = async () => {
    if (!receiptTrx) return;
    setIsGeneratingJpeg(true);

    try {
      // 1. Generate high-resolution JPEG receipt
      const { dataUrl, blob, filename } = await generateReceiptJpeg(receiptTrx);

      // 2. Automatically download the JPEG receipt to device
      downloadReceiptJpeg(dataUrl, filename);

      // 3. Format message text
      const itemsList = receiptTrx.items
        .map(it => `• ${it.name} x${it.qty} = Rp${it.subtotal.toLocaleString('id-ID')}`)
        .join('\n');

      const msg = encodeURIComponent(
        `*STRUK PEMBELIAN RESMI MENOKEN*\n` +
        `Stan: *${receiptTrx.groupName}*\n` +
        `No. Transaksi: *${receiptTrx.id}*\n` +
        `Tanggal: ${receiptTrx.date}\n` +
        `Pelanggan: ${receiptTrx.customerName}\n\n` +
        `*Rincian Belanja:*\n${itemsList}\n\n` +
        `*Total: Rp${receiptTrx.totalAmount.toLocaleString('id-ID')}*\n` +
        `Metode: ${receiptTrx.paymentMethod}\n` +
        `Status: *LUNAS (PAID)*\n\n` +
        `📎 *Struk Digital (JPEG)* telah tersimpan otomatis di perangkat Anda dan siap dilampirkan.\n` +
        `Terima kasih telah mendukung produk wirausaha muda Universitas Cenderawasih!`
      );

      // 4. If device supports Web Share API with files (Android/iOS WhatsApp), share directly!
      if (blob && navigator.canShare) {
        const file = new File([blob], filename, { type: 'image/jpeg' });
        if (navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `Struk MENOKEN - ${receiptTrx.id}`,
              text: `Struk Pembelian MENOKEN - ${receiptTrx.groupName}`
            });
            setIsGeneratingJpeg(false);
            return;
          } catch (err) {
            if (err.name !== 'AbortError') {
              console.log('Web Share fallback to wa.me');
            }
          }
        }
      }

      // 5. Open WhatsApp
      window.open(`https://wa.me/?text=${msg}`, '_blank');
    } catch (err) {
      console.error('Failed to generate receipt JPEG:', err);
    } finally {
      setIsGeneratingJpeg(false);
    }
  };

  const handleDownloadJpeg = async () => {
    if (!receiptTrx) return;
    setIsGeneratingJpeg(true);
    try {
      const { dataUrl, filename } = await generateReceiptJpeg(receiptTrx);
      downloadReceiptJpeg(dataUrl, filename);
    } catch (err) {
      console.error('Failed to download JPEG:', err);
    } finally {
      setIsGeneratingJpeg(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            Kasir POS & Toko Digital ID
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Kasir Digital POS (Festival & Penjualan Harian)
          </h1>
          <p className="text-xs text-slate-500">
            Catat penjualan stan pameran/bazar kampus secara instan. Semua transaksi langsung mensinkronkan laporan omzet kelompok.
          </p>
        </div>

        <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Auto-Sync ke Omzet & KPI
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Product Catalog Grid (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800">
              Pilih Produk Stan ({groupProducts.length} Produk Binaan)
            </h3>
            <span className="text-[11px] text-slate-400">Klik item untuk menambah ke keranjang</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
            {groupProducts.map(prod => (
              <div
                key={prod.id}
                onClick={() => addToCart(prod)}
                className="bg-white p-3 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow transition cursor-pointer flex gap-3 group"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition line-clamp-1">
                      {prod.name}
                    </h4>
                    <div className="text-[11px] font-black text-uncen-navy mt-0.5">
                      Rp{prod.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Stok: {prod.stock || 50}</span>
                    <span className="text-amber-600 font-bold group-hover:underline">+ Tambah</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cashier Register & Checkout (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-amber-500" />
                Keranjang Kasir
              </h3>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-rose-600 hover:underline font-semibold"
                >
                  Kosongkan
                </button>
              )}
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-xs">
                Keranjang kosong. Pilih produk di sebelah kiri untuk memulai transaksi.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-56 overflow-y-auto divide-y divide-slate-100 pr-1">
                {cart.map(item => (
                  <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                    <div className="flex-1 pr-2">
                      <div className="font-bold text-slate-900 line-clamp-1">{item.name}</div>
                      <div className="text-slate-500 text-[11px]">
                        Rp{item.price.toLocaleString('id-ID')} x {item.qty}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-bold text-slate-800">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="w-20 text-right font-black text-slate-900 pl-2">
                      Rp{(item.price * item.qty).toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Checkout Form */}
            <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Pembeli (Opsional)</label>
                <input
                  type="text"
                  placeholder="Nama Pelanggan / Stan Kampus"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Metode Pembayaran</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Tunai')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'Tunai'
                        ? 'bg-uncen-navy text-white border-uncen-navy'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Banknote className="w-3.5 h-3.5" /> Tunai
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('QRIS')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'QRIS'
                        ? 'bg-uncen-navy text-white border-uncen-navy'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" /> QRIS / Transfer
                  </button>
                </div>
              </div>

              {paymentMethod === 'Tunai' && totalAmount > 0 && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Uang Diterima (Rp)</label>
                  <input
                    type="number"
                    placeholder="Contoh: 100000"
                    value={cashGiven}
                    onChange={(e) => setCashGiven(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-bold"
                  />
                  {Number(cashGiven) > 0 && (
                    <div className="mt-1 text-[11px] font-bold text-slate-600 flex justify-between">
                      <span>Kembalian:</span>
                      <span className={changeAmount >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                        Rp{changeAmount.toLocaleString('id-ID')}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Total Summary */}
              <div className="pt-2 flex items-baseline justify-between">
                <span className="text-xs font-bold text-slate-500">Total Tagihan:</span>
                <span className="text-2xl font-black text-slate-900">
                  Rp{totalAmount.toLocaleString('id-ID')}
                </span>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md disabled:opacity-50 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                Bayar & Terbitkan Struk Digital
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Receipt Modal (Toko Digital ID Feature) */}
      {receiptTrx && (
        <div
          id="printable-receipt-modal"
          onClick={() => setReceiptTrx(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            id="printable-receipt"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative animate-in zoom-in-95 font-mono text-xs text-slate-900 border border-slate-200"
          >
            <button
              type="button"
              onClick={() => setReceiptTrx(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 no-print cursor-pointer"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-3 border-b border-dashed border-slate-300">
              <div className="font-black text-sm text-slate-900 tracking-wider">MENOKEN UNCEN</div>
              <div className="text-[11px] text-emerald-700 font-bold">{receiptTrx.groupName}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{receiptTrx.date}</div>
              <div className="text-[10px] text-slate-500 font-bold">ID: {receiptTrx.id}</div>
            </div>

            <div className="py-3 space-y-2 border-b border-dashed border-slate-300">
              <div className="text-[10px] text-slate-600 font-semibold">Pelanggan: {receiptTrx.customerName}</div>
              {receiptTrx.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-[11px] text-slate-900">
                  <span>{item.name} x{item.qty}</span>
                  <span className="font-bold">Rp{item.subtotal.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            <div className="py-3 space-y-1 border-b border-dashed border-slate-300">
              <div className="flex justify-between text-xs font-black text-slate-900">
                <span>TOTAL:</span>
                <span>Rp{receiptTrx.totalAmount.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>Metode:</span>
                <span className="font-semibold">{receiptTrx.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[10px] text-emerald-600 font-bold">
                <span>STATUS:</span>
                <span>LUNAS (PAID)</span>
              </div>
            </div>

            <div className="text-center pt-2 pb-4 text-[10px] text-slate-500">
              Terima kasih atas dukungan Anda untuk wirausaha muda Universitas Cenderawasih!
            </div>

            {/* Action Buttons: Cetak Struk, Unduh JPEG, Kirim WA JPEG */}
            <div className="pt-2 border-t border-slate-100 font-sans space-y-2 no-print">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-slate-200"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Struk</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadJpeg}
                  disabled={isGeneratingJpeg}
                  className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-amber-200"
                >
                  <Download className="w-3.5 h-3.5 text-amber-600" />
                  <span>Unduh JPEG</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleShareReceiptWhatsApp}
                disabled={isGeneratingJpeg}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20 transition cursor-pointer"
              >
                {isGeneratingJpeg ? (
                  <span className="flex items-center gap-1.5">Memproses Struk JPEG...</span>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    <span>Kirim Struk (JPEG ke WA)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
