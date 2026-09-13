import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProposals, saveProposal } from '../../lib/storage';
import { StatusBadge } from '../../components/StatusBadge';
import {
  FileText,
  CheckCircle2,
  Save,
  Send,
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export const ProposalForm = () => {
  const { activeGroup } = useAuth();
  const proposals = getProposals();
  const currentProposal = proposals.find(p => p.groupId === activeGroup?.id) || proposals[0];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: currentProposal?.title || 'Pengembangan Usaha Binaan 2026',
    requestedAmount: currentProposal?.requestedAmount || 20000000,
    background: 'Potensi komoditas lokal Papua memiliki nilai ekonomis tinggi namun terkendala pada pengolahan modern dan pemasaran digital.',
    solution: 'Menghadirkan produk turunan berkualitas dengan kemasan berstandar ekspor dan perizinan NIB serta P-IRT lengkap.',
    targetMarket: 'Mahasiswa, instansi pemerintah provinsi Papua, hotel di Jayapura, dan pasar e-commerce nasional.',
    budgetPlan: '1. Pembelian mesin pengolahan: Rp12.000.000\n2. Desain kemasan & cetak batch 1: Rp5.000.000\n3. Biaya pendaftaran uji lab & legalitas: Rp3.000.000'
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...currentProposal,
      title: formData.title,
      requestedAmount: Number(formData.requestedAmount),
      status: 'submitted',
      submittedAt: new Date().toISOString().slice(0, 10)
    };
    saveProposal(updated);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      <div>
        <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest">
          Sistem Seleksi Wirausaha
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          Pengajuan & Status Proposal Usaha
        </h1>
        <p className="text-xs text-slate-500">
          Program Kewirausahaan Mahasiswa Universitas Cenderawasih (PKM-Uncen) 2026.
        </p>
      </div>

      {/* Review Status Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="text-[11px] text-slate-400">Status Seleksi Proposal Saat Ini:</div>
            <div className="flex items-center gap-2 mt-1">
              <h3 className="text-base font-bold text-slate-900">{currentProposal?.title}</h3>
              <StatusBadge status={currentProposal?.status || 'submitted'} />
            </div>
          </div>
          {currentProposal?.scores?.finalWeighted && (
            <div className="px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
              <div className="text-[10px] uppercase font-bold text-emerald-700">Skor Reviewer</div>
              <div className="text-xl font-black text-emerald-800">
                {currentProposal.scores.finalWeighted}
                <span className="text-xs font-normal text-emerald-600">/100</span>
              </div>
            </div>
          )}
        </div>

        {currentProposal?.reviewerNotes && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Catatan Evaluasi Reviewer ({currentProposal.reviewerName}):
            </div>
            <p className="text-slate-600 italic leading-relaxed">
              "{currentProposal.reviewerNotes}"
            </p>
          </div>
        )}
      </div>

      {/* Multi-step Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-bold border-b border-slate-100 pb-4">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 ${step === 1 ? 'text-uncen-navy' : 'text-slate-400'}`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? 'bg-uncen-navy text-white' : 'bg-slate-100'}`}>1</span>
            Latar Belakang
          </button>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-2 ${step === 2 ? 'text-uncen-navy' : 'text-slate-400'}`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? 'bg-uncen-navy text-white' : 'bg-slate-100'}`}>2</span>
            Solusi & Pasar
          </button>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <button
            onClick={() => setStep(3)}
            className={`flex items-center gap-2 ${step === 3 ? 'text-uncen-navy' : 'text-slate-400'}`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-uncen-navy text-white' : 'bg-slate-100'}`}>3</span>
            Rencana Anggaran
          </button>
        </div>

        {submitSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Proposal berhasil disimpan dan dikirim ke antrean reviewer!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Proposal Usaha</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Latar Belakang & Masalah</label>
                <textarea
                  rows={4}
                  required
                  value={formData.background}
                  onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2 rounded-xl bg-uncen-navy text-white font-bold"
                >
                  Lanjut: Solusi & Pasar →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Solusi & Keunggulan Produk</label>
                <textarea
                  rows={3}
                  required
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Pasar & Strategi Pemasaran</label>
                <textarea
                  rows={3}
                  required
                  value={formData.targetMarket}
                  onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2 rounded-xl bg-uncen-navy text-white font-bold"
                >
                  Lanjut: Rencana Anggaran →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jumlah Bantuan Dana yang Diajukan (Rp)</label>
                <input
                  type="number"
                  required
                  value={formData.requestedAmount}
                  onChange={(e) => setFormData({ ...formData, requestedAmount: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rincian Rencana Anggaran Biaya (RAB)</label>
                <textarea
                  rows={4}
                  required
                  value={formData.budgetPlan}
                  onChange={(e) => setFormData({ ...formData, budgetPlan: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-mono"
                ></textarea>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  ← Kembali
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 shadow-sm transition"
                >
                  <Send className="w-4 h-4" />
                  Kirim Pengajuan Proposal Final
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
