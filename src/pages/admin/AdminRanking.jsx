import React from 'react';
import { getProposals, getGroups } from '../../lib/storage';
import { StatusBadge } from '../../components/StatusBadge';
import { Award, Star, Download, Printer } from 'lucide-react';

export const AdminRanking = () => {
  const proposals = getProposals();
  const groups = getGroups();

  // Sort proposals by weighted score descending
  const rankedProposals = [...proposals].sort((a, b) => {
    return (b.scores?.finalWeighted || 0) - (a.scores?.finalWeighted || 0);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest">
            Hasil Seleksi Digital
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Peringkat & Keputusan Pendanaan Proposal
          </h1>
          <p className="text-xs text-slate-500">
            Perankingan otomatis dihitung dari bobot skor kelima kriteria penilaian juri/reviewer independen.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition"
        >
          <Printer className="w-4 h-4" /> Cetak Papan Peringkat
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <th className="py-3 px-4 text-center w-16">Peringkat</th>
                <th className="py-3 px-4">Nama Usaha / Proposal</th>
                <th className="py-3 px-4">Fakultas</th>
                <th className="py-3 px-4 text-center">Inovasi (20%)</th>
                <th className="py-3 px-4 text-center">Pasar (20%)</th>
                <th className="py-3 px-4 text-center">Finansial (20%)</th>
                <th className="py-3 px-4 text-center">Dampak (20%)</th>
                <th className="py-3 px-4 text-center font-black text-slate-900">Skor Akhir</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rankedProposals.map((prop, idx) => {
                const grp = groups.find(g => g.id === prop.groupId);
                return (
                  <tr key={prop.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 text-center font-black text-sm">
                      {idx === 0 ? (
                        <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 inline-flex items-center justify-center shadow-sm">1</span>
                      ) : idx === 1 ? (
                        <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-950 inline-flex items-center justify-center">2</span>
                      ) : idx === 2 ? (
                        <span className="w-7 h-7 rounded-full bg-amber-700 text-white inline-flex items-center justify-center">3</span>
                      ) : (
                        <span className="text-slate-500">{idx + 1}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{prop.title}</div>
                      <div className="text-[11px] text-slate-500 font-semibold">{grp?.brand || grp?.name}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {grp?.facultyName || 'FEB'}
                    </td>
                    <td className="py-3 px-4 text-center font-mono">{prop.scores?.inovasi || '-'}</td>
                    <td className="py-3 px-4 text-center font-mono">{prop.scores?.pasar || '-'}</td>
                    <td className="py-3 px-4 text-center font-mono">{prop.scores?.finansial || '-'}</td>
                    <td className="py-3 px-4 text-center font-mono">{prop.scores?.dampak || '-'}</td>
                    <td className="py-3 px-4 text-center font-black text-sm text-uncen-navy">
                      {prop.scores?.finalWeighted || '-'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <StatusBadge status={prop.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
