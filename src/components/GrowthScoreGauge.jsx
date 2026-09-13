import React from 'react';
import { TrendingUp, Award, Zap } from 'lucide-react';

export const GrowthScoreGauge = ({ score = 0, size = 'md' }) => {
  let stage = 'Ide';
  let color = 'text-slate-600 border-slate-300';
  let badgeColor = 'bg-slate-100 text-slate-700';

  if (score >= 81) {
    stage = 'Scale-Up (Mandiri)';
    color = 'text-emerald-600 border-emerald-500';
    badgeColor = 'bg-emerald-100 text-emerald-800';
  } else if (score >= 61) {
    stage = 'Mapan (Bermitra)';
    color = 'text-teal-600 border-teal-500';
    badgeColor = 'bg-teal-100 text-teal-800';
  } else if (score >= 41) {
    stage = 'Berkembang (NIB Aktif)';
    color = 'text-amber-600 border-amber-500';
    badgeColor = 'bg-amber-100 text-amber-800';
  } else if (score >= 21) {
    stage = 'Tahap Awal (Uji Pasar)';
    color = 'text-blue-600 border-blue-500';
    badgeColor = 'bg-blue-100 text-blue-800';
  }

  if (size === 'sm') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-baseline gap-1">
          <span className="text-base font-black text-slate-800">{score}</span>
          <span className="text-xs text-slate-400">/100</span>
        </div>
        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${badgeColor}`}>
          {stage}
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          MENOKEN Growth Score
        </div>
        <div className="text-xs text-slate-500 mb-2">
          Tahapan saat ini: <strong className="text-slate-800">{stage}</strong>
        </div>
        <div className="w-48 bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
      <div className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-black ${color} bg-slate-50/50`}>
        <span className="text-2xl leading-none">{score}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase">/100</span>
      </div>
    </div>
  );
};
