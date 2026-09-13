import React from 'react';
import { getGroups } from '../../lib/storage';
import { DollarSign, Download, CheckCircle2 } from 'lucide-react';

export const AdminFunding = () => {
  const groups = getGroups();
  const totalDisbursed = groups.reduce((sum, g) => sum + (g.funding?.received || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest">
            Akuntabilitas Finansial
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Pencairan Dana Bantuan & Realisasi RAB
          </h1>
          <p className="text-xs text-slate-500">
            Monitoring penyaluran dana stimulan kewirausahaan mahasiswa dan kesesuaian laporan penggunaan dana.
          </p>
        </div>

        <div className="px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-200 text-right">
          <div className="text-[10px] uppercase font-bold text-emerald-700">Total Bantuan Tersalurkan</div>
          <div className="text-xl font-black text-emerald-800">
            Rp{totalDisbursed.toLocaleString('id-ID')}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <th className="py-3 px-4">Kelompok Usaha</th>
                <th className="py-3 px-4">Fakultas</th>
                <th className="py-3 px-4">Dana Diterima</th>
                <th className="py-3 px-4">Sumber Dana</th>
                <th className="py-3 px-4">Realisasi RAB</th>
                <th className="py-3 px-4 text-right">Status Laporan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {groups.map((grp) => (
                <tr key={grp.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{grp.brand || grp.name}</td>
                  <td className="py-3 px-4 text-slate-600">{grp.facultyName}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">
                    Rp{(grp.funding?.received || 0).toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{grp.funding?.source || 'Uncen'}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${grp.funding?.realizationPercentage || 0}%` }}
                        ></div>
                      </div>
                      <span className="font-bold">{grp.funding?.realizationPercentage || 0}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {grp.funding?.rabStatus || 'Sesuai'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
