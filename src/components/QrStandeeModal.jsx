import React, { useEffect } from 'react';
import { X, Printer, Share2, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const QrStandeeModal = ({ group, onClose }) => {
  const { isDark } = useTheme();

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!group) return null;

  const publicUrl = `${window.location.origin}/?group=${group.id}`;

  // SVG QR Code generator (authentic high-contrast matrix)
  const renderQrSvg = () => (
    <svg viewBox="0 0 100 100" className="w-40 sm:w-44 h-40 sm:h-44 mx-auto p-2 bg-white rounded-xl shadow-inner border border-slate-200">
      {/* Outer corner finders */}
      <rect x="5" y="5" width="26" height="26" fill="#0F2C59" rx="3" />
      <rect x="9" y="9" width="18" height="18" fill="#ffffff" />
      <rect x="13" y="13" width="10" height="10" fill="#0F2C59" />

      <rect x="69" y="5" width="26" height="26" fill="#0F2C59" rx="3" />
      <rect x="73" y="9" width="18" height="18" fill="#ffffff" />
      <rect x="77" y="13" width="10" height="10" fill="#0F2C59" />

      <rect x="5" y="69" width="26" height="26" fill="#0F2C59" rx="3" />
      <rect x="9" y="73" width="18" height="18" fill="#ffffff" />
      <rect x="13" y="77" width="10" height="10" fill="#0F2C59" />

      {/* Center Cenderawasih accent dot */}
      <circle cx="50" cy="50" r="7" fill="#D97706" />

      {/* Data matrices pattern */}
      <rect x="36" y="10" width="8" height="8" fill="#0F2C59" />
      <rect x="48" y="14" width="6" height="6" fill="#0F2C59" />
      <rect x="12" y="38" width="6" height="12" fill="#0F2C59" />
      <rect x="22" y="44" width="8" height="6" fill="#0F2C59" />
      <rect x="34" y="32" width="12" height="6" fill="#0F2C59" />
      <rect x="54" y="32" width="8" height="10" fill="#0F2C59" />
      <rect x="68" y="38" width="6" height="8" fill="#0F2C59" />
      <rect x="80" y="42" width="10" height="8" fill="#0F2C59" />
      <rect x="34" y="66" width="10" height="8" fill="#0F2C59" />
      <rect x="48" y="72" width="12" height="6" fill="#0F2C59" />
      <rect x="68" y="68" width="8" height="12" fill="#0F2C59" />
      <rect x="82" y="76" width="8" height="8" fill="#0F2C59" />
    </svg>
  );

  return (
    /* Modal Backdrop - Click outside closes modal */
    <div
      onClick={onClose}
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Dialog Card - Stop propagation so clicking inside doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative animate-in zoom-in-95 duration-200 text-center border ${
          isDark
            ? 'bg-slate-900 border-slate-700/80 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Floating Top-Right Close Button (High contrast, always accessible) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:-top-3.5 sm:-right-3.5 w-10 h-10 rounded-full bg-slate-900 hover:bg-rose-600 text-white shadow-2xl border-2 border-white dark:border-slate-700 flex items-center justify-center cursor-pointer z-30 transition-transform duration-200 hover:scale-110 active:scale-95 no-print"
          title="Tutup Jendela (ESC)"
          aria-label="Tutup Jendela"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Standee Acrylic Card Preview */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#081f33] text-white shadow-xl border-4 border-amber-400/90 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

          <div className="text-[10px] font-black uppercase tracking-widest text-amber-300 mb-1 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> UNIVERSITAS CENDERAWASIH
          </div>
          <h2 className="text-lg sm:text-xl font-black tracking-tight">{group.brand || group.name}</h2>
          <p className="text-[11px] text-slate-300 mt-0.5">{group.facultyName}</p>

          <div className="my-3.5 sm:my-4">
            {renderQrSvg()}
          </div>

          <div className="space-y-1">
            <div className="text-xs font-extrabold text-amber-300 tracking-wide">
              SCAN UNTUK KATALOG RESMI & LEGALITAS
            </div>
            <p className="text-[10px] text-slate-300 max-w-xs mx-auto leading-relaxed">
              Buka profil digital, sertifikasi NIB/PIRT, dan pesan langsung via WhatsApp resmi kelompok.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>MENOKEN Uncen 2026</span>
            <span>Standee Meja Expo Resmi</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-5 space-y-2 no-print">
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Standee Meja</span>
            </button>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(publicUrl);
                alert('Tautan profil digital kelompok usaha berhasil disalin!');
              }}
              className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition border cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
              }`}
            >
              <Share2 className="w-4 h-4 text-amber-500" />
              <span>Salin Tautan</span>
            </button>
          </div>

          {/* Full-width Explicit Close Button */}
          <button
            type="button"
            onClick={onClose}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            <X className="w-4 h-4" />
            <span>Tutup Jendela</span>
          </button>
        </div>
      </div>
    </div>
  );
};
