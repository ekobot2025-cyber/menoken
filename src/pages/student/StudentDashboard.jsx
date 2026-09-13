import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { GrowthScoreGauge } from '../../components/GrowthScoreGauge';
import { StatusBadge } from '../../components/StatusBadge';
import { LegalBadge } from '../../components/LegalBadge';
import { LevelBadge } from '../../components/LevelBadge';
import { BookOpen } from 'lucide-react';
import {
  User,
  FileText,
  Package,
  Calculator,
  TrendingUp,
  HeartHandshake,
  Store,
  ShieldCheck,
  Award,
  AlertCircle,
  ArrowUpRight,
  Sparkles,
  Users,
  Building2,
  DollarSign
} from 'lucide-react';

export const StudentDashboard = ({ setActiveTab }) => {
  const { activeGroup } = useAuth();

  if (!activeGroup) {
    return <div className="p-8 text-center text-slate-500">Memuat profil kelompok...</div>;
  }

  const latestRevenue = activeGroup.monthlyRevenues?.[activeGroup.monthlyRevenues.length - 1];

  const miniApps = [
    {
      id: 'student_profile',
      title: 'Profil Usaha Digital',
      desc: 'One Group – One Digital Profile, data tim & legalitas',
      icon: User,
      color: 'bg-blue-500 text-white',
      badge: 'Utama'
    },
    {
      id: 'student_proposal',
      title: 'Proposal & Seleksi',
      desc: 'Pengajuan proposal, status review & scoring juri',
      icon: FileText,
      color: 'bg-purple-500 text-white',
      badge: 'Tahap 1'
    },
    {
      id: 'student_products',
      title: 'Katalog Produk',
      desc: 'Kelola varian harga retail & grosir B2B',
      icon: Package,
      color: 'bg-amber-500 text-white',
      badge: 'Etalase'
    },
    {
      id: 'student_pos',
      title: 'Kasir POS (Festival & Bazar)',
      desc: 'Pencatatan kasir instan, struk digital & auto-sync omzet',
      icon: Calculator,
      color: 'bg-emerald-500 text-white',
      badge: 'Toko ID'
    },
    {
      id: 'student_revenue',
      title: 'Laporan & Omzet',
      desc: 'Grafik performa bulanan & margin laba bersih',
      icon: TrendingUp,
      color: 'bg-teal-500 text-white',
      badge: 'Finansial'
    },
    {
      id: 'student_impact',
      title: 'Story of Impact & Green',
      desc: 'Kalkulator dampak lokal Papua & cerita perubahan',
      icon: HeartHandshake,
      color: 'bg-rose-500 text-white',
      badge: 'GHG Hub'
    },
    {
      id: 'student_logbook',
      title: 'E-Logbook & SKS MBKM',
      desc: 'Catatan aktivitas mingguan & verifikasi konversi nilai SKS DPL',
      icon: BookOpen,
      color: 'bg-indigo-500 text-white',
      badge: 'P2MW / MBKM'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Welcome & Group Banner */}
      <div className="bg-gradient-to-r from-uncen-navy to-uncen-navy-dark text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Wirausaha Binaan Uncen 2026
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {activeGroup.brand || activeGroup.name}
          </h1>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            {activeGroup.facultyName} • {activeGroup.studyProgram} • Ketua: <strong>{activeGroup.leader?.name}</strong>
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <LevelBadge group={activeGroup} />
            {activeGroup.legalities?.map((leg) => (
              <LegalBadge key={leg.type} type={leg.type} />
            ))}
          </div>
        </div>

        {/* Growth Score Gauge Widget */}
        <div className="w-full md:w-auto">
          <GrowthScoreGauge score={activeGroup.growthScore || 75} />
        </div>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Omzet Bulan Terakhir</div>
            <div className="text-xl font-black text-slate-900 mt-1">
              Rp{(latestRevenue?.gross || 0).toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-0.5">
              Laba Bersih: Rp{(latestRevenue?.net || 0).toLocaleString('id-ID')}
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Bantuan Dana Disetujui</div>
            <div className="text-xl font-black text-slate-900 mt-1">
              Rp{(activeGroup.funding?.received || 0).toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] text-blue-600 font-bold mt-0.5">
              Realisasi: {activeGroup.funding?.realizationPercentage || 0}%
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Status Inkubasi</div>
            <div className="text-xl font-black text-slate-900 mt-1">
              {activeGroup.businessStage || 'Berkembang'}
            </div>
            <div className="text-[11px] text-amber-600 font-bold mt-0.5">
              Tahap: Mentoring Aktif
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Mini-App Ecosystem Grid (Mini-App Ecosystem Style) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Peluncur Ekosistem Mini-App MENOKEN
            </h2>
            <p className="text-xs text-slate-500">
              Akses seluruh modul operasional bisnis mahasiswa dalam satu pintu terintegrasi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {miniApps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                onClick={() => setActiveTab(app.id)}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${app.color} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {app.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition">
                      {app.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {app.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-uncen-navy group-hover:text-amber-600">
                  <span>Buka Modul</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
