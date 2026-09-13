import React, { useState } from 'react';
import { LevelBadge } from '../../components/LevelBadge';
import { getGroups, getProposals, getProducts, getMasterData } from '../../lib/storage';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  PieChart as PieIcon,
  TrendingUp,
  Award,
  Users,
  Building2,
  Package,
  ShieldCheck,
  Printer,
  Calendar,
  Sparkles
} from 'lucide-react';

export const ExecutiveDashboard = () => {
  const groups = getGroups();
  const proposals = getProposals();
  const products = getProducts();
  const masterData = getMasterData();

  const [selectedYear, setSelectedYear] = useState('2026');

  // Multi-year comparison data
  const comparisonData = [
    { year: '2024', groups: 80, students: 260, funding: 950000000, revenue: 1800000000, nibPercent: 55 },
    { year: '2025', groups: 105, students: 340, funding: 1200000000, revenue: 2900000000, nibPercent: 72 },
    { year: '2026', groups: 126, students: 428, funding: 1500000000, revenue: 3800000000, nibPercent: 81 }
  ];

  // Faculty distribution data
  const facultyCounts = masterData.faculties?.map(f => ({
    name: f.short,
    fullName: f.name,
    count: groups.filter(g => g.facultyId === f.id || g.facultyName?.includes(f.short)).length
  })) || [];

  // Business Category distribution
  const categoryCounts = masterData.categories?.map(c => ({
    name: c.name.split(' ')[0],
    value: groups.filter(g => g.categoryId === c.id).length
  })) || [];

  const COLORS = ['#0F2C59', '#006666', '#D97706', '#10B981', '#6366F1', '#EC4899'];

  const totalRevenue = groups.reduce((sum, g) => {
    return sum + (g.monthlyRevenues?.reduce((a, b) => a + b.gross, 0) || 0);
  }, 0);

  const totalStudents = groups.reduce((sum, g) => sum + (g.members?.length || 3), 0);
  const activeNIB = groups.filter(g => g.legalities?.some(l => l.type === 'NIB' && l.status === 'verified')).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with Print Report Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest">
            Executive Leadership Information System
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Executive KPI Dashboard – Universitas Cenderawasih
          </h1>
          <p className="text-xs text-slate-500">
            Laporan Kinerja Agregat Kewirausahaan Mahasiswa untuk Rektor, Wakil Rektor, dan Pimpinan Fakultas.
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer shadow-sm"
          >
            <option value="2026">Tahun Anggaran 2026</option>
            <option value="2025">Tahun Anggaran 2025</option>
            <option value="2024">Tahun Anggaran 2024</option>
          </select>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-uncen-navy text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-uncen-navy-dark transition"
          >
            <Printer className="w-4 h-4" />
            Cetak / Ekspor Laporan PDF
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] text-slate-400 font-medium">Kelompok Usaha</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{groups.length}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">+20% vs 2025</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] text-slate-400 font-medium">Mahasiswa Terlibat</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalStudents}</div>
          <div className="text-[10px] text-blue-600 font-semibold mt-0.5">8 Fakultas Aktif</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] text-slate-400 font-medium">Legalitas NIB</div>
          <div className="text-2xl font-black text-teal-600 mt-1">
            {Math.round((activeNIB / (groups.length || 1)) * 100)}%
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{activeNIB} Berizin Resmi</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] text-slate-400 font-medium">Katalog Produk</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{products.length}</div>
          <div className="text-[10px] text-amber-600 font-semibold mt-0.5">MENOKEN Market</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] text-slate-400 font-medium">Alokasi Bantuan</div>
          <div className="text-xl font-black text-slate-900 mt-1">Rp1,5 M</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">92% Realisasi</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] text-slate-400 font-medium">Total Omzet Usaha</div>
          <div className="text-xl font-black text-amber-600 mt-1">
            Rp{(totalRevenue / 1000000).toFixed(0)} Jt
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Pertumbuhan Positif</div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Faculty Distribution Bar Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900">
            Distribusi Kelompok Wirausaha per Fakultas (Uncen)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facultyCounts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" name="Jumlah Kelompok" fill="#0F2C59" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-Year Growth Trend */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900">
            Perbandingan Kinerja Antar-Tahun (2024 - 2026)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="groups" name="Kelompok Usaha" fill="#D97706" radius={[6, 6, 0, 0]} />
                <Bar dataKey="nibPercent" name="% Legalitas NIB" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Jakpreneur Style Leveling Distribution (P1 - P5) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900">
              Distribusi Tingkat Kematangan Usaha Mahasiswa (Akreditasi Level 1 – 5)
            </h3>
            <p className="text-xs text-slate-500">
              Klasifikasi kurasi perkembangan bisnis mahasiswa Universitas Cenderawasih.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="font-extrabold text-slate-700">Level 1: Ide & Proposal</div>
            <div className="text-2xl font-black text-slate-900 mt-1">24%</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Tahap Seleksi Awal</div>
          </div>
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl">
            <div className="font-extrabold text-amber-800">Level 2: Inkubasi</div>
            <div className="text-2xl font-black text-amber-900 mt-1">31%</div>
            <div className="text-[10px] text-amber-600 mt-0.5">Pelatihan & Dana Stimulan</div>
          </div>
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl">
            <div className="font-extrabold text-blue-800">Level 3: Berlegalitas</div>
            <div className="text-2xl font-black text-blue-900 mt-1">26%</div>
            <div className="text-[10px] text-blue-600 mt-0.5">NIB & P-IRT Terverifikasi</div>
          </div>
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <div className="font-extrabold text-emerald-800">Level 4: Pasar Aktif</div>
            <div className="text-2xl font-black text-emerald-900 mt-1">12%</div>
            <div className="text-[10px] text-emerald-600 mt-0.5">Omzet Rutin Bulanan</div>
          </div>
          <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl">
            <div className="font-extrabold text-purple-800">Level 5: Scale-Up / B2B</div>
            <div className="text-2xl font-black text-purple-900 mt-1">7%</div>
            <div className="text-[10px] text-purple-600 mt-0.5">Bermitra & Serap Pekerja</div>
          </div>
        </div>
      </div>
    </div>
  );
};
