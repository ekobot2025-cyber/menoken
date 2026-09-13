import React from 'react';
import { getGroups, getProposals, getProducts, getPrograms } from '../../lib/storage';
import { StatusBadge } from '../../components/StatusBadge';
import {
  LayoutDashboard,
  Users,
  FileText,
  ShieldCheck,
  Award,
  DollarSign,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AdminDashboard = ({ setActiveTab }) => {
  const groups = getGroups();
  const proposals = getProposals();
  const products = getProducts();
  const programs = getPrograms();

  const pendingVerification = groups.reduce((count, g) => {
    return count + (g.legalities?.filter(l => l.status === 'under_review' || l.status === 'process').length || 0);
  }, 0);

  const pendingProposals = proposals.filter(p => p.status === 'submitted' || p.status === 'under_review').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest">
            Pusat Komando Operasional
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Dashboard Pengelola UPA Kewirausahaan
          </h1>
          <p className="text-xs text-slate-500">
            Kelola program, seleksi proposal, verifikasi legalitas, penyaluran bantuan, dan pemantauan wirausaha Uncen.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('leadership_dashboard')}
          className="px-4 py-2 rounded-xl bg-uncen-navy text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
        >
          Lihat Executive KPI <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Actionable Notice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('admin_proposals')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 cursor-pointer transition flex justify-between items-center"
        >
          <div>
            <div className="text-xs text-slate-500 font-medium">Proposal Menunggu Seleksi</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{pendingProposals} Proposal</div>
            <div className="text-[11px] text-amber-700 font-semibold mt-0.5">Perlu Penilaian Reviewer</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab('admin_verification')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 cursor-pointer transition flex justify-between items-center"
        >
          <div>
            <div className="text-xs text-slate-500 font-medium">Verifikasi Legalitas</div>
            <div className="text-2xl font-black text-blue-600 mt-1">{pendingVerification} Dokumen</div>
            <div className="text-[11px] text-blue-700 font-semibold mt-0.5">NIB / PIRT / Halal</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab('admin_ranking')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 cursor-pointer transition flex justify-between items-center"
        >
          <div>
            <div className="text-xs text-slate-500 font-medium">Proposal Lolos / Siap Didanai</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {proposals.filter(p => p.status === 'accepted').length} Kelompok
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Siap Pencairan Dana</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab('market')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-400 cursor-pointer transition flex justify-between items-center"
        >
          <div>
            <div className="text-xs text-slate-500 font-medium">Produk Siap Dipasarkan</div>
            <div className="text-2xl font-black text-teal-600 mt-1">{products.length} Produk</div>
            <div className="text-[11px] text-teal-700 font-semibold mt-0.5">Etalase MENOKEN Market</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Program Summary & Stage Tracker */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900">
              Tahapan Program Inkubasi Aktif: {programs[0]?.title}
            </h3>
            <p className="text-xs text-slate-500">
              Target Quota: {programs[0]?.targetQuota} Kelompok • Pendaftar: {programs[0]?.enrolledGroups} Kelompok
            </p>
          </div>
          <button
            onClick={() => setActiveTab('admin_programs')}
            className="text-xs font-bold text-uncen-navy hover:underline"
          >
            Kelola Detail Program →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2">
          {programs[0]?.stages?.map((stg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border text-center text-xs space-y-1 ${
                stg.status === 'completed'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : stg.status === 'active'
                  ? 'bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-400/30 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider font-extrabold opacity-75">
                Tahap {idx + 1}
              </div>
              <div className="font-bold line-clamp-1">{stg.name}</div>
              <div className="text-[9px] opacity-75">{stg.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
