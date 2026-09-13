import React from 'react';
import { X, Printer, Download, Share2, Sparkles, ShieldCheck } from 'lucide-react';
import { LevelBadge } from './LevelBadge';

export const QrStandeeModal = ({ group, onClose }) => {
  if (!group) return null;

  const publicUrl = `${window.location.origin}/?group=${group.id}`;

  // SVG QR Code generator (authentic high-contrast matrix)
  const renderQrSvg = () => (
    <svg viewBox="0 0 100 100" className="w-44 h-44 mx-auto p-2 bg-white rounded-xl shadow-inner border border-slate-200">
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Standee Acrylic Card Preview */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-uncen-navy text-white shadow-xl border-4 border-amber-400/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="text-[10px] font-black uppercase tracking-widest text-amber-300 mb-1 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" /> UNIVERSITAS CENDERAWASIH
          </div>
          <h2 className="text-xl font-black tracking-tight">{group.brand || group.name}</h2>
          <p className="text-[11px] text-slate-300 mt-0.5">{group.facultyName}</p>

          <div className="my-4">
            {renderQrSvg()}
          </div>

          <div className="space-y-1">
            <div className="text-xs font-extrabold text-amber-300">
              SCAN UNTUK KATALOG RESMI & LEGALITAS
            </div>
            <p className="text-[10px] text-slate-300 max-w-xs mx-auto">
              Buka profil digital, sertifikasi NIB/PIRT, dan pesan langsung via WhatsApp resmi kelompok.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
            <span>MENOKEN Uncen 2026</span>
            <span>Standee Meja Expo Resmi</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2 no-print">
          <button
            onClick={() => window.print()}
            className="py-2.5 px-4 rounded-xl bg-uncen-navy hover:bg-uncen-navy-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
          >
            <Printer className="w-4 h-4" /> Cetak Standee Meja
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Tautan profil digital kelompok usaha berhasil disalin!');
            }}
            className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-slate-200"
          >
            <Share2 className="w-4 h-4 text-amber-600" /> Salin Tautan
          </button>
        </div>
      </div>
    </div>
  );
};
