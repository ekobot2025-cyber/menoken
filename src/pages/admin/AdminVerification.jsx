import React, { useState } from 'react';
import { getGroups, saveGroup } from '../../lib/storage';
import { LegalBadge } from '../../components/LegalBadge';
import { StatusBadge } from '../../components/StatusBadge';
import { ShieldCheck, CheckCircle2, XCircle, Search } from 'lucide-react';

export const AdminVerification = () => {
  const groups = getGroups();
  const [filterType, setFilterType] = useState('all');

  const handleVerify = (groupId, legIndex, newStatus) => {
    const grp = groups.find(g => g.id === groupId);
    if (!grp) return;
    const updatedLegalities = [...grp.legalities];
    updatedLegalities[legIndex].status = newStatus;
    updatedLegalities[legIndex].verifiedBy = 'Admin UPA (Terverifikasi)';
    grp.legalities = updatedLegalities;
    saveGroup(grp);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest">
          Data Quality & Governance
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          Pusat Verifikasi Legalitas & Dokumen Usaha
        </h1>
        <p className="text-xs text-slate-500">
          Setiap perizinan (NIB, P-IRT, Halal, HAKI) yang diunggah mahasiswa harus diverifikasi admin sebelum masuk indikator kinerja resmi.
        </p>
      </div>

      <div className="space-y-4">
        {groups.map((grp) => (
          <div key={grp.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900">{grp.brand || grp.name}</h3>
                <div className="text-xs text-slate-500">
                  {grp.facultyName} • Ketua: {grp.leader?.name} ({grp.leader?.nim})
                </div>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                {grp.legalities?.length || 0} Izin Terdaftar
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {grp.legalities?.map((leg, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{leg.type}</span>
                    <StatusBadge status={leg.status} />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    No: <strong>{leg.number || '-'}</strong>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Verifikator: {leg.verifiedBy || '-'}
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5">
                    {leg.status !== 'verified' ? (
                      <button
                        onClick={() => handleVerify(grp.id, idx, 'verified')}
                        className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verifikasi
                      </button>
                    ) : (
                      <button
                        onClick={() => handleVerify(grp.id, idx, 'under_review')}
                        className="w-full py-1 text-slate-400 hover:text-rose-600 font-semibold text-[10px]"
                      >
                        Batalkan Verifikasi
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
