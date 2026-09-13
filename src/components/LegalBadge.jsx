import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

export const LegalBadge = ({ type, showIcon = true }) => {
  const map = {
    NIB: { label: 'NIB Resmi', bg: 'bg-blue-600 text-white' },
    PIRT: { label: 'P-IRT Dinkes', bg: 'bg-teal-600 text-white' },
    Halal: { label: 'Halal MUI/BPJPH', bg: 'bg-emerald-700 text-white' },
    BPOM: { label: 'BPOM RI', bg: 'bg-indigo-700 text-white' },
    HAKI: { label: 'Hak Merek HAKI', bg: 'bg-amber-600 text-white' },
    SNI: { label: 'Standar SNI', bg: 'bg-purple-600 text-white' }
  };

  const item = map[type] || { label: type, bg: 'bg-slate-700 text-white' };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide shadow-sm ${item.bg}`}>
      {showIcon && <ShieldCheck className="w-3 h-3" />}
      {item.label}
    </span>
  );
};
