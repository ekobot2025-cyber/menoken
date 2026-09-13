import React from 'react';

export const StatusBadge = ({ status }) => {
  const map = {
    verified: { label: 'Terverifikasi', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    accepted: { label: 'Diterima / Lolos', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    under_review: { label: 'Sedang Direview', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
    submitted: { label: 'Diajukan', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
    process: { label: 'Dalam Proses', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    draft: { label: 'Draft', bg: 'bg-slate-100 text-slate-600 border-slate-200' },
    revision: { label: 'Perlu Revisi', bg: 'bg-orange-50 text-orange-700 border-orange-200' },
    rejected: { label: 'Ditolak', bg: 'bg-rose-50 text-rose-700 border-rose-200' },
    paid: { label: 'Lunas', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  };

  const current = map[status] || { label: status, bg: 'bg-slate-100 text-slate-700 border-slate-200' };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current.bg}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75"></span>
      {current.label}
    </span>
  );
};
