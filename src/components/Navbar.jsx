import React, { useState } from 'react';
import { useAuth, DUMMY_ACCOUNTS } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { exportDataJSON, importDataJSON, resetToDefaultSeed } from '../lib/storage';
import {
  Rocket,
  Sun,
  Moon,
  Store,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Compass,
  Layers,
  HelpCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';

export const Navbar = ({ onToggleSidebar, sidebarOpen, activeTab, setActiveTab }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const {
    user,
    role,
    roleInfo,
    switchRole,
    logout,
    availableRoles
  } = useAuth();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [dbModalOpen, setDbModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isLanding = activeTab === 'landing';
  const isDashboardView = !isLanding && activeTab !== 'login' && activeTab !== 'market' && activeTab !== 'partner_hub';

  const navLinks = [
    { id: 'hero', label: 'HOME' },
    { id: 'pillars', label: 'PILAR INTI' },
    { id: 'why', label: 'MENGAPA MENOKEN' },
    { id: 'how-it-works', label: 'CARA KERJA' },
    { id: 'commodities', label: 'KOMODITAS' },
    { id: 'faq', label: 'FAQ' }
  ];

  const handleNavClick = (sectionId) => {
    setMobileNavOpen(false);
    if (activeTab !== 'landing') {
      setActiveTab('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenLogin = () => {
    if (activeTab !== 'landing') {
      setActiveTab('landing');
    }
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-menoken-auth'));
    }, 80);
  };

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
      alert('Data sistem telah direset ke seed default.');
      window.location.reload();
    }
  };

  const handleLogout = () => {
    logout();
    setActiveTab('landing');
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b shadow-xs transition-colors duration-200 no-print ${
      isDark ? 'bg-[#060c18]/95 border-slate-800/80 text-slate-100' : 'bg-white/95 border-slate-200/90 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Mobile Hamburger (on dashboard) + Brand Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {isDashboardView && (
            <button
              onClick={onToggleSidebar}
              className={`lg:hidden p-2 rounded-xl border transition cursor-pointer ${
                isDark ? 'border-slate-800 text-slate-200 hover:bg-slate-900' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
              title="Buka / Tutup Menu Navigasi Dashboard"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 shadow-md group-hover:scale-105 transition-transform">
              <img src="/noken_pixar_3d.png" alt="MENOKEN" className="w-6 h-6 sm:w-7 sm:h-7 object-contain drop-shadow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-black text-lg sm:text-2xl tracking-tight flex items-center ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  MENOKEN
                </span>
                <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs">
                  UNCEN
                </span>
              </div>
              <p className="text-[10px] sm:text-[10.5px] font-semibold text-emerald-500 hidden sm:block tracking-wide">
                UPA Kewirausahaan Universitas Cenderawasih
              </p>
            </div>
          </div>
        </div>

        {/* Center: Main Universal Website Navigation Links (Visible across ALL pages!) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-xs xl:text-[13px] font-extrabold tracking-wide uppercase">
          {navLinks.map((link) => {
            const isLinkActive = isLanding && link.id === 'hero';
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition cursor-pointer py-1 select-none ${
                  isLinkActive
                    ? 'text-cyan-400 font-black border-b-2 border-cyan-400'
                    : isDark
                      ? 'text-slate-300 hover:text-cyan-300'
                      : 'text-slate-700 hover:text-cyan-600'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions, Theme Toggle, and User Auth */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Mobile Menu Dropdown Toggle for screen < lg */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className={`lg:hidden p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mobileNavOpen
                ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                : isDark ? 'border-slate-800 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Navigasi Halaman"
          >
            <Compass className="w-4 h-4" />
            <span className="hidden xs:inline">Menu</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileNavOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Quick Market Link */}
          <button
            onClick={() => setActiveTab('market')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              activeTab === 'market'
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                : isDark ? 'border-slate-800 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span>Market</span>
          </button>

          {/* Database Backup Tool */}
          <button
            onClick={() => setDbModalOpen(true)}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              isDark
                ? 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700/60 hover:bg-slate-800'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200 shadow-xs'
            }`}
            title="Kelola & Cadangkan Data"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Data DB</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-amber-300 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
            }`}
            title={isDark ? 'Beralih ke Tema Terang' : 'Beralih ke Tema Gelap'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Logged In vs Logged Out State */}
          {user ? (
            <div className="relative flex items-center gap-2">
              
              {/* Shortcut to Dashboard Workspace */}
              <button
                onClick={() => {
                  const targetView = role === 'student' ? 'student_dashboard' : `${role}_dashboard`;
                  setActiveTab(targetView);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-950/30 transition cursor-pointer"
                title="Buka Ruang Kerja / Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Ruang Kerja</span>
              </button>

              {/* Role Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className={`flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border transition cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-800 text-slate-100 hover:bg-slate-800'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100 shadow-xs'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-[11px] font-black shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-xs font-bold leading-none truncate max-w-[100px]">{user.name}</p>
                    <span className="text-[10px] font-mono text-emerald-500 font-semibold">{roleInfo.label}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {roleMenuOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border p-2 z-50 transition-all ${
                      isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <div className="px-3 py-2 border-b border-slate-800/40 mb-1">
                      <p className="text-xs font-bold">{user.name}</p>
                      <p className="text-[11px] text-emerald-400">{user.email}</p>
                      <span className="inline-block mt-1 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {roleInfo.label}
                      </span>
                    </div>

                    <div className="py-1">
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                        Beralih Peran (1-Klik):
                      </div>
                      {availableRoles.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => {
                            switchRole(r.id);
                            setRoleMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                            role === r.id
                              ? 'bg-emerald-500/10 text-emerald-400 font-bold'
                              : isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span>{r.label}</span>
                          {role === r.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-slate-800/40 mt-1 pt-1">
                      <button
                        onClick={() => {
                          const targetView = role === 'student' ? 'student_dashboard' : `${role}_dashboard`;
                          setActiveTab(targetView);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                          isDark ? 'hover:bg-slate-800 text-cyan-400' : 'hover:bg-slate-100 text-cyan-600'
                        }`}
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Buka Dashboard ({roleInfo.label})</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Keluar / Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          ) : (
            // Logged Out Button: Toba-Quest Glowing Action
            <button
              onClick={handleOpenLogin}
              className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <Rocket className="w-4 h-4 text-slate-950" />
              <span>Masuk / Ruang Kerja</span>
            </button>
          )}

        </div>

      </div>

      {/* Mobile Nav Links Drawer (Visible when mobile menu toggle is opened on screens < lg) */}
      {mobileNavOpen && (
        <div className={`lg:hidden border-t px-4 py-3 space-y-1 backdrop-blur-xl ${
          isDark ? 'bg-[#060c18]/98 border-slate-800 text-slate-200' : 'bg-white/98 border-slate-200 text-slate-800'
        }`}>
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            Navigasi Platform
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                isLanding && link.id === 'hero'
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
              }`}
            >
              <span>{link.label}</span>
              {isLanding && link.id === 'hero' && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between">
            <button
              onClick={() => { setActiveTab('market'); setMobileNavOpen(false); }}
              className="text-xs font-bold text-amber-400 flex items-center gap-1.5 px-3 py-1.5"
            >
              <Store className="w-4 h-4" />
              <span>MENOKEN Market</span>
            </button>
            <button
              onClick={() => { setDbModalOpen(true); setMobileNavOpen(false); }}
              className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 px-3 py-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Data DB</span>
            </button>
          </div>
        </div>
      )}

      {/* Database Backup & Restore Modal */}
      {dbModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl border ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base">Cadangkan & Pulihkan Data</h3>
              </div>
              <button
                onClick={() => setDbModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs leading-relaxed text-slate-400">
              <p>
                Platform MENOKEN menyimpan seluruh data operasional (produk, proposal, pembukuan kasir, MBKM) di peramban lokal. Anda dapat mengekspor atau memulihkan data kapan saja.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleExport}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md shadow-emerald-950/40"
                >
                  <Download className="w-4 h-4" />
                  <span>Ekspor Backup JSON</span>
                </button>

                <label className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed font-semibold transition cursor-pointer ${
                  isDark
                    ? 'border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/40'
                    : 'border-slate-300 hover:border-cyan-600 text-slate-700 hover:text-cyan-600 hover:bg-slate-50'
                }`}>
                  <Upload className="w-4 h-4" />
                  <span>Impor / Pulihkan dari File JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Data ke Standar Seed UNCEN</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/50 flex justify-end">
              <button
                onClick={() => setDbModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
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
