import React from 'react';
import { getProposals, getGroups } from '../../lib/storage';
import { StatusBadge } from '../../components/StatusBadge';
import { FileText, Search, UserCheck } from 'lucide-react';

export const AdminProposals = () => {
  const proposals = getProposals();
  const groups = getGroups();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest">
          Administrasi Seleksi
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          Verifikasi Administrasi & Penugasan Reviewer
        </h1>
        <p className="text-xs text-slate-500">
          Periksa kelengkapan administrasi proposal sebelum diteruskan ke reviewer independen.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <th className="py-3 px-4">Judul Proposal Usaha</th>
                <th className="py-3 px-4">Kelompok & Fakultas</th>
                <th className="py-3 px-4">Pengajuan Dana</th>
                <th className="py-3 px-4">Reviewer Ditugaskan</th>
                <th className="py-3 px-4">Skor</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {proposals.map((prop) => {
                const grp = groups.find(g => g.id === prop.groupId);
                return (
                  <tr key={prop.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{prop.title}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{grp?.brand || grp?.name}</div>
                      <div className="text-[11px] text-slate-500">{grp?.facultyName}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                      Rp{prop.requestedAmount?.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {prop.reviewerName || 'Menunggu Penugasan'}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-uncen-navy">
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
