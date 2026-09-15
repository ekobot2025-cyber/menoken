import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  LayoutDashboard,
  Handshake,
  BookOpen,
  QrCode,
  Store,
  User,
  FileText,
  Package,
  Calculator,
  TrendingUp,
  HeartHandshake,
  CheckSquare,
  Award,
  Calendar,
  Layers,
  ShieldCheck,
  DollarSign,
  GraduationCap,
  PieChart,
  Database,
  History,
  Home,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { role, roleInfo, user } = useAuth();
  const { isDark } = useTheme();

  // Navigation schema tailored to roles
  const getNavItems = () => {
    switch (role) {
      case 'public':
        return [
          { id: 'landing', label: 'Beranda Uncen Hub', icon: Home },
          { id: 'market', label: 'MENOKEN Market', icon: Store },
          { id: 'partner_hub', label: 'Temu Mitra & Investor', icon: Handshake, badge: 'F6S Hub' },
          { id: 'leadership_dashboard', label: 'Dashboard Kinerja Publik', icon: PieChart }
        ];

      case 'student':
        return [
          { id: 'student_dashboard', label: 'Dashboard Usaha', icon: LayoutDashboard },
          { id: 'student_profile', label: 'Profil Usaha Digital', icon: User },
          { id: 'student_proposal', label: 'Pengajuan Proposal', icon: FileText },
          { id: 'student_products', label: 'Katalog Produk Saya', icon: Package },
          { id: 'student_pos', label: 'Kasir POS & Struk', icon: Calculator, badge: 'Digital' },
          { id: 'student_logbook', label: 'E-Logbook MBKM', icon: BookOpen, badge: 'SKS' },
          { id: 'student_revenue', label: 'Laporan & Omzet', icon: TrendingUp },
          { id: 'student_impact', label: 'Story of Impact & Green', icon: HeartHandshake, badge: 'GHG' },
          { id: 'market', label: 'Etalase Pasar Publik', icon: Store }
        ];

      case 'reviewer':
        return [
          { id: 'reviewer_dashboard', label: 'Antrean Penilaian', icon: CheckSquare },
          { id: 'admin_ranking', label: 'Peringkat & Seleksi', icon: Award },
          { id: 'market', label: 'Katalog Produk Mahasiswa', icon: Store }
        ];

      case 'admin':
        return [
          { id: 'admin_dashboard', label: 'Dashboard Operasional', icon: LayoutDashboard },
          { id: 'admin_programs', label: 'Program & Tahapan Inkubasi', icon: Calendar },
          { id: 'admin_proposals', label: 'Seleksi & Verifikasi Proposal', icon: FileText },
          { id: 'admin_ranking', label: 'Peringkat Proposal', icon: Award },
          { id: 'admin_verification', label: 'Verifikasi Legalitas & Produk', icon: ShieldCheck },
          { id: 'admin_funding', label: 'Pencairan Dana & RAB', icon: DollarSign },
          { id: 'admin_mentoring', label: 'Pelatihan & Mentoring', icon: GraduationCap },
          { id: 'partner_hub', label: 'Papan Mitra & Investor', icon: Handshake },
          { id: 'leadership_dashboard', label: 'Executive KPI Dashboard', icon: PieChart },
          { id: 'market', label: 'Katalog Pasar', icon: Store }
        ];

      case 'leadership':
        return [
          { id: 'leadership_dashboard', label: 'Executive KPI Dashboard', icon: PieChart },
          { id: 'partner_hub', label: 'Papan Mitra & Investor', icon: Handshake },
          { id: 'admin_ranking', label: 'Hasil Seleksi & Capaian', icon: Award },
          { id: 'market', label: 'Katalog Produk Unggulan', icon: Store }
        ];

      case 'superadmin':
        return [
          { id: 'admin_dashboard', label: 'Dashboard Operasional', icon: LayoutDashboard },
          { id: 'admin_master', label: 'Master Data & Bobot', icon: Database },
          { id: 'admin_audit', label: 'Audit Trail & Log Sistem', icon: History },
          { id: 'partner_hub', label: 'Papan Mitra & Investor', icon: Handshake },
          { id: 'leadership_dashboard', label: 'Executive KPI Dashboard', icon: PieChart },
          { id: 'market', label: 'Katalog Produk', icon: Store }
        ];

      default:
        return [
          { id: 'landing', label: 'Beranda', icon: Home },
          { id: 'market', label: 'MENOKEN Market', icon: Store }
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-30 lg:hidden"
        ></div>
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-16 bottom-0 left-0 w-64 border-r z-40 transition-all duration-300 ease-in-out flex flex-col justify-between no-print shrink-0 ${
          isDark ? 'bg-[#04201b] border-emerald-900/50 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        } ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {/* Active Role Card */}
          <div className={`p-3 rounded-2xl border space-y-1 shadow-xs ${
            isDark ? 'bg-[#062c24] border-emerald-800/40 text-slate-100' : 'bg-slate-50 border-slate-200/90'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                AKUN AKTIF
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${user?.badgeColor || (isDark ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-slate-100 text-slate-700')}`}>
                {user?.badge || roleInfo.label}
              </span>
            </div>
            <div className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {user?.name || roleInfo.label}
            </div>
            <div className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {user?.title || 'Universitas Cenderawasih'}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className={`font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              MENU UTAMA
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/40'
                      : isDark
                        ? 'text-slate-300 hover:bg-[#062c24] hover:text-white'
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-amber-300' : isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        isActive
                          ? 'bg-amber-400 text-slate-950'
                          : isDark
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t text-center font-mono ${isDark ? 'border-emerald-950/60' : 'border-slate-100'}`}>
          <div className={`text-[11px] font-bold ${isDark ? 'text-emerald-400' : 'text-slate-700'}`}>MENOKEN 2026</div>
          <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Universitas Cenderawasih</div>
        </div>
      </aside>
    </>
  );
};
