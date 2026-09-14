import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  Store,
  Sparkles,
  CheckCircle2,
  Building2
} from 'lucide-react';

export const CartDrawer = ({ setActiveTab }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    toastMessage
  } = useCart();
  const { isDark } = useTheme();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isCartOpen) {
    return (
      <>
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-24 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{toastMessage}</span>
          </div>
        )}
      </>
    );
  }

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    // Group items for WhatsApp message
    let itemsText = '';
    cartItems.forEach((item, idx) => {
      const itemPrice =
        item.wholesaleMin && item.qty >= item.wholesaleMin && item.wholesalePrice
          ? item.wholesalePrice
          : item.price;
      const subtotal = itemPrice * item.qty;
      itemsText += `${idx + 1}. *${item.name}*\n   - Jumlah: ${item.qty} ${item.unit}\n   - Produsen: ${item.groupName} (${item.facultyName})\n   - Subtotal: Rp${subtotal.toLocaleString('id-ID')}\n`;
    });

    const buyerName = customerInfo.name.trim() || 'Pelanggan MENOKEN';
    const buyerAddress = customerInfo.address.trim() ? `\n📍 Alamat Kirim: ${customerInfo.address}` : '';
    const buyerNotes = customerInfo.notes.trim() ? `\n📝 Catatan: ${customerInfo.notes}` : '';

    const message = encodeURIComponent(
      `Halo Tim Pengelola MENOKEN Market & UPA Uncen,\nSaya ingin melakukan pemesanan untuk daftar belanja berikut:\n\n` +
      `👤 *Nama Pembeli:* ${buyerName}\n` +
      `📞 *Kontak:* ${customerInfo.phone || '-'}` +
      buyerAddress +
      buyerNotes +
      `\n\n🛒 *DAFTAR PRODUK PESANAN:*\n` +
      itemsText +
      `\n💰 *TOTAL ESTIMASI BELANJA:* Rp${cartTotal.toLocaleString('id-ID')}\n\n` +
      `Mohon info ketersediaan stok produk dan petunjuk konfirmasi pembayaran / pengiriman. Terima kasih!`
    );

    // Official UPA Uncen Business Centre WhatsApp
    window.open(`https://wa.me/6281248901122?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
      />

      {/* Slide-over Drawer */}
      <aside className={`fixed top-0 right-0 bottom-0 w-full max-w-md z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 ${
        isDark ? 'bg-[#091524] border-l border-slate-800 text-slate-100' : 'bg-white border-l border-slate-200 text-slate-900'
      }`}>
        
        {/* Drawer Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-500">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base tracking-tight">Keranjang Belanja</h3>
              <p className="text-[11px] text-slate-400">{cartCount} Produk Terpilih</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl hover:bg-slate-800/40 text-slate-400 hover:text-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Keranjang Masih Kosong</h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Pilih produk Kopi Wamena, Kriya Noken, atau olahan pangan lokal favorit Anda di MENOKEN Market.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  if (setActiveTab) setActiveTab('market');
                }}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md cursor-pointer"
              >
                Mulai Belanja Sekarang
              </button>
            </div>
          ) : (
            <>
              {/* Product Cards in Cart */}
              <div className="space-y-2.5">
                {cartItems.map((item) => {
                  const isWholesale = item.wholesaleMin && item.qty >= item.wholesaleMin;
                  const unitPrice = isWholesale && item.wholesalePrice ? item.wholesalePrice : item.price;
                  const subtotal = unitPrice * item.qty;

                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border flex items-center gap-3 transition ${
                        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-950"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/noken_pixar_3d.png';
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="font-bold text-xs truncate">{item.name}</h5>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-400 transition p-1 cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[10px] text-slate-400 truncate">
                          {item.groupName} ({item.facultyName})
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="text-xs font-black text-emerald-500">
                              Rp{subtotal.toLocaleString('id-ID')}
                            </span>
                            {isWholesale && (
                              <span className="ml-1 text-[9px] font-bold text-amber-400">
                                (Grosir)
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className={`flex items-center border rounded-lg px-1 ${
                            isDark ? 'border-slate-700 bg-slate-950' : 'border-slate-300 bg-white'
                          }`}>
                            <button
                              onClick={() => updateQuantity(item.id, item.qty - 1)}
                              className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold font-mono min-w-[20px] text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.qty + 1)}
                              className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Optional Buyer Details */}
              <div className={`p-3.5 rounded-2xl border space-y-2.5 text-xs ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="font-bold text-slate-400 text-[10.5px] uppercase tracking-wider">
                  Informasi Pembeli (Opsional)
                </div>
                <input
                  type="text"
                  placeholder="Nama Lengkap / Instansi"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className={`w-full px-3 py-1.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <input
                  type="text"
                  placeholder="Alamat Pengiriman (cth: Abepura, Jayapura)"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className={`w-full px-3 py-1.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </>
          )}

        </div>

        {/* Drawer Footer: Total & Checkout CTA */}
        {cartItems.length > 0 && (
          <div className={`p-4 sm:p-5 border-t space-y-3 ${
            isDark ? 'border-slate-800 bg-[#07101c]' : 'border-slate-100 bg-slate-50'
          }`}>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Belanja:</span>
              <div className="text-xl sm:text-2xl font-black text-emerald-500">
                Rp{cartTotal.toLocaleString('id-ID')}
              </div>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/40 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Checkout & Kirim Pesanan via WA</span>
            </button>

            <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
              <button
                onClick={clearCart}
                className="text-rose-400 hover:underline cursor-pointer"
              >
                Kosongkan Keranjang
              </button>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Langsung ke Wirausaha UNCEN</span>
              </span>
            </div>
          </div>
        )}

      </aside>
    </>
  );
};
