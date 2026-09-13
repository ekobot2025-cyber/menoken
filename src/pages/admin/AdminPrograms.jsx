import React, { useState } from 'react';
import { getPrograms, saveProgram } from '../../lib/storage';
import { Calendar, Plus, Save, CheckCircle2, Award, Users } from 'lucide-react';

export const AdminPrograms = () => {
  const programs = getPrograms();
  const [selectedProg, setSelectedProg] = useState(programs[0]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest">
          Siklus Pembinaan Tahunan
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          Manajemen Program & Tahapan Kewirausahaan
        </h1>
        <p className="text-xs text-slate-500">
          Kelola program wirausaha tahunan dari tahap pendaftaran proposal hingga festival dan tracking pasca program.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          {programs.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProg(p)}
              className={`p-4 rounded-2xl border transition cursor-pointer ${
                selectedProg?.id === p.id
                  ? 'bg-uncen-navy text-white border-uncen-navy shadow-md'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-amber-400'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                <span className={selectedProg?.id === p.id ? 'text-amber-300' : 'text-slate-400'}>
                  Tahun {p.year}
                </span>
                <span className={`px-2 py-0.5 rounded-full ${p.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-100 text-slate-600'}`}>
                  {p.status === 'active' ? 'Aktif Berjalan' : 'Selesai'}
                </span>
              </div>
              <h3 className="font-bold text-sm leading-snug">{p.title}</h3>
              <div className="mt-2 text-xs opacity-80">
                Pagu Anggaran: <strong>Rp{(p.budget / 1000000000).toFixed(1)} Miliar</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-black text-slate-900">{selectedProg.title}</h2>
            <div className="text-xs text-slate-500 mt-1">
              Target Kuota: <strong>{selectedProg.targetQuota}</strong> Kelompok • Pendaftar: <strong>{selectedProg.enrolledGroups}</strong> Kelompok
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Tahapan & Jadwal Pelaksanaan (Workflow):
            </h4>
            <div className="space-y-2.5">
              {selectedProg.stages?.map((stg, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[11px]">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">{stg.name}</div>
                      <div className="text-[11px] text-slate-500">{stg.date}</div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    stg.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : stg.status === 'active'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {stg.status === 'completed' ? 'Selesai' : stg.status === 'active' ? 'Sedang Berlangsung' : 'Mendatang'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
