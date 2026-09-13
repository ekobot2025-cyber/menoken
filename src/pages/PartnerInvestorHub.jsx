import React, { useState } from 'react';
import { getGroups, getPartnershipInquiries, addPartnershipInquiry } from '../lib/storage';
import { LevelBadge } from '../components/LevelBadge';
import {
  Handshake,
  Building2,
  ExternalLink,
  Send,
  CheckCircle2,
  X,
  Sparkles,
  TrendingUp,
  Award,
  DollarSign
} from 'lucide-react';

export const PartnerInvestorHub = () => {
  const groups = getGroups();
  const inquiries = getPartnershipInquiries();

  const [activeGroupModal, setActiveGroupModal] = useState(null);
  const [partnerForm, setPartnerForm] = useState({
    partnerName: '',
    institution: '',
    partnerType: 'Pengadaan / Vendor Rutin',
    message: ''
  });
  const [successSent, setSuccessSent] = useState(false);

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!activeGroupModal) return;

    addPartnershipInquiry({
      id: `inq-${Date.now()}`,
      groupId: activeGroupModal.id,
      groupName: activeGroupModal.brand || activeGroupModal.name,
      partnerName: partnerForm.partnerName,
      institution: partnerForm.institution,
      partnerType: partnerForm.partnerType,
      message: partnerForm.message,
      date: new Date().toISOString().slice(0, 10),
      status: 'in_discussion'
    });

    setSuccessSent(true);
    setTimeout(() => {
      setSuccessSent(false);
      setActiveGroupModal(null);
    }, 1800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-uncen-navy to-uncen-navy-dark text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
            <Handshake className="w-3.5 h-3.5" />
            Adopsi Fitur F6S & Gust
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Papan Temu Mitra & Investor Cenderawasih
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Menghubungkan wirausaha mahasiswa binaan Universitas Cenderawasih dengan BUMN, korporasi swasta, perbankan, perhotelan, dan program CSR untuk kemitraan rantai pasok dan permodalan lanjutan.
          </p>
        </div>
      </div>

      {/* Grid of Business Ready for Partnership */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((grp) => (
          <div
            key={grp.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <LevelBadge group={grp} />
                <span className="text-[10px] font-bold text-slate-400">{grp.facultyName}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{grp.brand || grp.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                  {grp.description}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Rata-rata Omzet:</span>
                  <strong className="text-slate-800">
                    Rp{(grp.growthMetrics?.avgMonthlyRevenue || 0).toLocaleString('id-ID')}/bln
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bahan Baku Papua:</span>
                  <strong className="text-emerald-600">
                    {grp.growthMetrics?.localSourcingPercent || 90}%
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Peluang Kemitraan:</span>
                  <span className="text-amber-700 font-bold">Supplier B2B / CSR</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveGroupModal(grp)}
              className="w-full py-2.5 rounded-xl bg-uncen-navy hover:bg-uncen-navy-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
            >
              <Handshake className="w-4 h-4" /> Ajukan Minat Kemitraan
            </button>
          </div>
        ))}
      </div>

      {/* Inquiry Form Modal */}
      {activeGroupModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 text-xs">
            <button
              onClick={() => setActiveGroupModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <div className="text-[10px] uppercase font-bold text-uncen-navy">Formulir Kemitraan Resmi</div>
              <h3 className="text-base font-black text-slate-900 mt-0.5">
                Kemitraan dengan {activeGroupModal.brand || activeGroupModal.name}
              </h3>
            </div>

            {successSent ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Pengajuan Kemitraan Terkirim!</h4>
                <p className="text-slate-500">Pengelola UPA dan tim mahasiswa akan menghubungi Anda via WhatsApp/Email.</p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama PIC / Pejabat Mitra</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bpk. Gunawan"
                    value={partnerForm.partnerName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, partnerName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Perusahaan / BUMN / Instansi</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bank Papua / Hotel / PT Freeport"
                    value={partnerForm.institution}
                    onChange={(e) => setPartnerForm({ ...partnerForm, institution: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bentuk Kemitraan</label>
                  <select
                    value={partnerForm.partnerType}
                    onChange={(e) => setPartnerForm({ ...partnerForm, partnerType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Pengadaan / Vendor Rutin">Pengadaan / Vendor Rutin (B2B)</option>
                    <option value="Cinderamata Resmi & Souvenir">Cinderamata Resmi & Souvenir Korporasi</option>
                    <option value="Pendanaan Investasi Lanjutan">Pendanaan Investasi Lanjutan</option>
                    <option value="Program Pembinaan CSR">Program Pembinaan CSR / Hibah Alat</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pesan / Draf Bentuk Kolaborasi</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Jelaskan kebutuhan pengadaan atau rencana kemitraan Anda..."
                    value={partnerForm.message}
                    onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveGroupModal(null)}
                    className="px-4 py-2 text-slate-600 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-uncen-navy text-white font-bold shadow-sm"
                  >
                    Kirim Pengajuan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
