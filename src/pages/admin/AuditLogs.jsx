import React from 'react';
import { getAuditLogs } from '../../lib/storage';
import { History, Shield } from 'lucide-react';

export const AuditLogs = () => {
  const logs = getAuditLogs();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Security & Audit Trail
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          Audit Trail & Log Aktivitas Sistem
        </h1>
        <p className="text-xs text-slate-500">
          Catatan kronologis seluruh pembaruan profil usaha, verifikasi legalitas, penilaian proposal, dan transaksi kasir.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <th className="py-3 px-4">Waktu</th>
                <th className="py-3 px-4">Pengguna (Aktor)</th>
                <th className="py-3 px-4">Aksi</th>
                <th className="py-3 px-4">Rincian Perubahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 font-mono">
                  <td className="py-2.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-2.5 px-4 font-sans font-bold text-slate-800">{log.user}</td>
                  <td className="py-2.5 px-4">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-700">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-sans text-slate-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
