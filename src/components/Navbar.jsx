import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { exportDataJSON, importDataJSON, resetToDefaultSeed, getGroups } from '../lib/storage';
import {
  Rocket,
  Sparkles,
  Search,
  Bell,
  UserCheck,
  ChevronDown,
  Download,
  Upload,
  RotateCcw,
  Sun,
  Moon,
  Store,
  Handshake,
  Compass,
  CheckCircle2,
  Menu,
  X,
  LogIn,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

export const Navbar = ({ onToggleSidebar, sidebarOpen, activeTab, setActiveTab }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const {
    user,
    role,
    roleInfo,
    switchRole,
    logout,
    availableRoles,
    selectedGroupId,
    setSelectedGroupId,
    activeGroup
  } = useAuth();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [dbModalOpen, setDbModalOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const groups = getGroups();

  const isPublicPage = activeTab === 'landing' || activeTab === 'login';

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `menoken_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importDataJSON(event.target.result);
      if (res.success) {
        alert('Database MENOKEN berhasil dipulihkan!');
        window.location.reload();
      } else {
        alert('Gagal mengimpor file: ' + res.error);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Kembalikan seluruh data ke setelan awal (default Uncen authentic seed data)?')) {
      resetToDefaultSeed();
      alert('Data telah direset ke default!');
      window.location.reload();
    }
  };

  const handleLogout = () => {
    logout();
    setActiveTab('landing');
  };

  return (
    <header className={`sticky top-0 z-30 backdrop-blur-md border-b shadow-sm no-print transition-colors duration-200 ${isDark ? "bg-[#04201b]/95 border-emerald-900/50 text-slate-100" : "bg-white/95 border-emerald-100/80 text-slate-900"}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Hamburger (only on dashboard views) + Brand */}
        <div className="flex items-center gap-3">
          {!isPublicPage && (
            <button
              onClick={onToggleSidebar}
              className={`lg:hidden p-2 rounded-xl border transition ${isDark ? 'border-emerald-800 text-slate-200 hover:bg-emerald-950' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}
              title="Buka / Tutup Menu Navigasi"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 flex items-center justify-center group-hover:scale-105 transition">
              <img src="/noken_pixar_3d.png" alt="MENOKEN Noken 3D" className="w-9 h-9 object-contain drop-shadow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-extrabold tracking-tight text-lg leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  MENOKEN
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded">
                  UNCEN
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Universitas Cenderawasih
              </p>
            </div>
          </div>
        </div>

        {/* Center/Right Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Links */}
          {/* Quick Links */}
          <button
            onClick={() => setActiveTab('market')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'market'
                ? isDark ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-amber-50 text-amber-800 border border-amber-200'
                : isDark ? 'text-slate-300 hover:text-white hover:bg-emerald-950/40' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-amber-500" />
            <span>Market</span>
          </button>

          {/* Database Backup Tool */}
          <button
            onClick={() => setDbModalOpen(true)}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              isDark
                ? 'bg-emerald-950/40 text-slate-300 hover:text-white border-emerald-800/40 hover:bg-emerald-900/40'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
            }`}
            title="Kelola & Cadangkan Data"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Data DB</span>
          </button>

          {/* Theme Toggle Button (Dark / Light) */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition flex items-center justify-center ${
              isDark
                ? 'bg-[#062c24] border-emerald-800/50 text-amber-400 hover:bg-[#093d32]'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title={isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
            aria-label="Toggle tema gelap terang"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* User Auth Controls */}
          {user ? (
            <div className="flex items-center gap-2">
              {/* Role Switcher Pill */}
              <div className="relative">
                <button
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border transition text-xs font-bold ${
                    isDark
                      ? 'bg-[#062c24] border-emerald-800/50 text-slate-200 hover:bg-[#093d32]'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-800 text-white text-[10px] flex items-center justify-center font-bold shrink-0 border border-slate-300/40">
                    {user.avatarImg ? (
                      <img src={user.avatarImg} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.avatar || 'U'
                    )}
                  </div>
                  <span className="hidden sm:inline max-w-[120px] truncate">{user.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold border ${user.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                    {user.badge || roleInfo.label}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {roleMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-xl border p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDark ? 'bg-[#04201b] border-emerald-800 text-slate-200' : 'bg-white border-slate-200 text-slate-900'
                  }`}>
                    <div className={`px-3 py-2 border-b mb-1 ${isDark ? 'border-emerald-900/60' : 'border-slate-100'}`}>
                      <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{user.name}</div>
                      <div className={`text-[11px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{user.email}</div>
                      <div className="text-[10px] text-amber-400 mt-0.5 font-medium">{user.title || user.faculty}</div>
                    </div>

                    <div className="py-1">
                      <div className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                        Ganti Peran Demo:
                      </div>
                      {availableRoles.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => {
                            switchRole(r.id);
                            setRoleMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition ${
                            role === r.id
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold'
                              : isDark ? 'text-slate-300 hover:bg-emerald-950/60' : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{r.label}</span>
                          {role === r.id && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 pt-1 mt-1 space-y-1">
                      <button
                        onClick={() => {
                          setRoleMenuOpen(false);
                          setActiveTab(user.defaultTab || 'admin_dashboard');
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                          isDark ? 'text-emerald-400 hover:bg-emerald-950/60' : 'text-emerald-700 hover:bg-slate-100'
                        }`}
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" /> Buka Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setRoleMenuOpen(false);
                          handleLogout();
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold text-rose-500 flex items-center gap-2 transition ${
                          isDark ? 'hover:bg-rose-950/30' : 'hover:bg-rose-50'
                        }`}
                      >
                        <LogOut className="w-3.5 h-3.5" /> Keluar (Logout)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dashboard Shortcut Button if on landing */}
              {isPublicPage && (
                <button
                  onClick={() => setActiveTab(user.defaultTab || 'admin_dashboard')}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:from-emerald-500 hover:to-teal-500 transition flex items-center gap-1.5 shadow-sm shadow-emerald-900/30"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
              )}
            </div>
          ) : (
            /* If Not Logged In */
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('login')}
                style={{ backgroundColor: '#0F2C59' }}
                className="px-4 py-2 rounded-xl text-white text-xs font-bold hover:opacity-95 transition flex items-center gap-1.5 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Masuk</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Database Backup Modal */}
      {dbModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Download className="w-5 h-5 text-uncen-navy" />
                Manajemen Data & Backup
              </div>
              <button
                onClick={() => setDbModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Seluruh data kelompok, proposal, produk, POS kasir, dan transaksi disimpan otomatis di Local Storage browser. Anda dapat mengekspor atau mengimpor file cadangan JSON kapan saja.
            </p>

            <div className="space-y-2.5 text-xs">
              <button
                onClick={handleExport}
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 font-bold text-slate-800 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Ekspor Cadangan (Download JSON)</span>
                </div>
                <span className="text-[10px] text-slate-400">Full State</span>
              </button>

              <label className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 font-bold text-slate-800 flex items-center justify-between cursor-pointer transition">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span>Impor Cadangan (Upload JSON)</span>
                </div>
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                <span className="text-[10px] text-slate-400">Pilih File</span>
              </label>

              <button
                onClick={handleReset}
                className="w-full p-3 rounded-2xl bg-rose-50 border border-rose-200 hover:bg-rose-100 font-bold text-rose-700 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>Reset ke Data Awal Uncen</span>
                </div>
                <span className="text-[10px] text-rose-500">Seed Default</span>
              </button>
            </div>

            <div className="border-t border-slate-100 pt-3 text-right">
              <button
                onClick={() => setDbModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
