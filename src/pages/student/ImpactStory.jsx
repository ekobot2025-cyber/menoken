import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { saveGroup } from '../../lib/storage';
import {
  HeartHandshake,
  Leaf,
  Users,
  Award,
  Sparkles,
  Save,
  CheckCircle2,
  Trees
} from 'lucide-react';

export const ImpactStory = () => {
  const { activeGroup } = useAuth();
  const [impactData, setImpactData] = useState({
    before: activeGroup?.storyOfImpact?.before || '',
    intervention: activeGroup?.storyOfImpact?.intervention || '',
    after: activeGroup?.storyOfImpact?.after || '',
    impact: activeGroup?.storyOfImpact?.impact || '',
    localEmployees: activeGroup?.growthMetrics?.localEmployees || 4,
    localSourcingPercent: activeGroup?.growthMetrics?.localSourcingPercent || 95,
    carbonReductionKg: activeGroup?.growthMetrics?.carbonReductionKg || 250
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...activeGroup,
      growthMetrics: {
        ...activeGroup.growthMetrics,
        localEmployees: Number(impactData.localEmployees),
        localSourcingPercent: Number(impactData.localSourcingPercent),
        carbonReductionKg: Number(impactData.carbonReductionKg)
      },
      storyOfImpact: {
        before: impactData.before,
        intervention: impactData.intervention,
        after: impactData.after,
        impact: impactData.impact
      }
    };
    saveGroup(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5" />
            Adopsi Fitur GHG Tracker Hub
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Story of Impact & Green Metrics Papua
          </h1>
          <p className="text-xs text-slate-500">
            Mendokumentasikan transformasi usaha dan kontribusi nyata terhadap kelestarian alam serta masyarakat Papua.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-uncen-navy hover:bg-uncen-navy-dark text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
        >
          <Save className="w-4 h-4" /> Simpan Kisah Dampak
        </button>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Kisah dampak dan indikator hijau berhasil disimpan ke sistem!
        </div>
      )}

      {/* Green Impact Metrics Cards (GHG Hub Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Bahan Baku Lokal Papua</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {impactData.localSourcingPercent}%
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Sagu, Kopi, Serat Kayu</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Tenaga Kerja Tercipta</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {impactData.localEmployees} Orang
            </div>
            <div className="text-[11px] text-blue-600 mt-0.5 font-semibold">Mama Papua & Mahasiswa</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Reduksi Emisi / Limbah</div>
            <div className="text-2xl font-black text-teal-600 mt-1">
              {impactData.carbonReductionKg} kg
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Praktik Zero-Waste</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Trees className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Story Timeline Cards */}
      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900">
            Perjalanan Transformasi (Story of Change)
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                1. Kondisi Sebelum Program (Before Program)
              </label>
              <textarea
                rows={3}
                value={impactData.before}
                onChange={(e) => setImpactData({ ...impactData, before: e.target.value })}
                placeholder="Bagaimana kondisi awal usaha mahasiswa sebelum mendapat pembinaan dari Uncen?"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                2. Intervensi Universitas Cenderawasih (Intervention)
              </label>
              <textarea
                rows={3}
                value={impactData.intervention}
                onChange={(e) => setImpactData({ ...impactData, intervention: e.target.value })}
                placeholder="Bantuan dana, pelatihan teknis, sertifikasi, atau bimbingan mentor apa yang diberikan?"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                3. Capaian Setelah Program (After Program)
              </label>
              <textarea
                rows={3}
                value={impactData.after}
                onChange={(e) => setImpactData({ ...impactData, after: e.target.value })}
                placeholder="Apa kemajuan nyata pada legalitas, packaging, omzet, dan pemasaran digital?"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                4. Dampak Sosial & Lingkungan (Impact)
              </label>
              <textarea
                rows={3}
                value={impactData.impact}
                onChange={(e) => setImpactData({ ...impactData, impact: e.target.value })}
                placeholder="Bagaimana usaha ini memberdayakan masyarakat lokal dan menjaga alam Papua?"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
