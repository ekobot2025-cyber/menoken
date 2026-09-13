import React, { useState } from 'react';
import { getMasterData, saveMasterData } from '../../lib/storage';
import { Database, Plus, Trash2, Save, CheckCircle2 } from 'lucide-react';

export const MasterData = () => {
  const [data, setData] = useState(getMasterData());
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    saveMasterData(data);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-rose-600 uppercase tracking-widest">
            Super Admin Control
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Konfigurasi Master Data & Bobot Kriteria
          </h1>
          <p className="text-xs text-slate-500">
            Kelola master fakultas, program studi, kategori usaha, dan bobot scoring seleksi proposal.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-uncen-navy text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
        >
          <Save className="w-4 h-4" /> Simpan Perubahan
        </button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Master data sistem berhasil diperbarui!
        </div>
      )}

      {/* Criteria Scoring Weights */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900">
          Bobot Indikator Penilaian Proposal (Total: 100%)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {data.scoringCriteria?.map((cr, idx) => (
            <div key={cr.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-800">{cr.name}</div>
              <div className="text-[11px] text-slate-500">{cr.description}</div>
              <div className="pt-2 flex items-center gap-2">
                <span className="font-semibold text-slate-600">Bobot (%):</span>
                <input
                  type="number"
                  value={cr.weight}
                  onChange={(e) => {
                    const updated = [...data.scoringCriteria];
                    updated[idx].weight = Number(e.target.value);
                    setData({ ...data, scoringCriteria: updated });
                  }}
                  className="w-20 px-2 py-1 bg-white border border-slate-200 rounded-lg font-bold"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
