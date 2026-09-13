import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Store,
  Sparkles,
  KeyRound,
  AlertCircle,
  Coffee,
  Briefcase
} from 'lucide-react';

export const LoginPage = ({ setActiveTab }) => {
  const { login, loginAsDummy, register, dummyAccounts } = useAuth();
  const [activeMode, setActiveMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regNim, setRegNim] = useState('');
  const [regFaculty, setRegFaculty] = useState('Fakultas Ekonomi dan Bisnis');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleManualLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const res = login(email, password);
    if (res.success) {
      setSuccessMsg(`Selamat datang, ${res.user.name}!`);
      setTimeout(() => {
        setActiveTab(res.user.defaultTab || 'admin_dashboard');
      }, 350);
    } else {
      setErrorMsg(res.message || 'Email atau kata sandi tidak cocok.');
    }
  };

  const handleQuickLogin = (acc) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setErrorMsg('');
    const res = loginAsDummy(acc.key);
    if (res.success) {
      setSuccessMsg(`Login berhasil sebagai ${acc.name} (${acc.badge})`);
      setTimeout(() => {
        setActiveTab(acc.defaultTab || 'admin_dashboard');
      }, 300);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regName || !regEmail || !regPassword) {
      setErrorMsg('Harap lengkapi semua kolom.');
      return;
    }

    const res = register({
      name: regName,
      nim: regNim,
      faculty: regFaculty,
      email: regEmail,
      password: regPassword
    });

    if (res.success) {
      setSuccessMsg(`Akun mahasiswa berhasil dibuat! Selamat datang, ${res.user.name}.`);
      setTimeout(() => {
        setActiveTab('student_dashboard');
      }, 450);
    }
  };

  return (
    <div className="min-h-screen dot-grid-bg py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* 1. LEFT COLUMN: Calm Dual-Sector Showcase (No pitch-dark boxes) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Brand Mark */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => setActiveTab('landing')}
              className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-slate-800 transition"
            >
              <Rocket className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div
                onClick={() => setActiveTab('landing')}
                className="font-extrabold text-xl tracking-tight text-slate-900 leading-none cursor-pointer"
              >
                MENOKEN
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                Universitas Cenderawasih
              </div>
            </div>
          </div>

          {/* Eyebrow & Hero Copy */}
          <div className="space-y-3 pt-2">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SISTEM TERPADU KEWIRAUSAHAAN UNCEN 2026
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Kerja lebih ringan, tumbuh bersama wirausaha Papua.
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
              Satu ruang kerja digital untuk mengelola usaha mahasiswa Universitas Cenderawasih — praktis, transparan, data-driven, dan siap dipakai dari mana saja.
            </p>
          </div>

          {/* Dual-Sector Cards (Inspired by dual-sector-ops) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-slate-300 transition">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs text-slate-900">Program & Inkubasi</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Proposal bertahap, bimbingan mentor, POS kasir expo, dan konversi SKS MBKM resmi.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-slate-300 transition">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center">
                <Coffee className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs text-slate-900">Komoditas Unggulan</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Hilirisasi Kopi Wamena, Noken UNESCO, Sagu Sentani, dan produk lokal Papua berlegalitas OSS.
              </p>
            </div>
          </div>

          {/* Friendly Demo Hint */}
          <div className="p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-slate-600 text-xs flex items-center gap-3">
            <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-[11px] leading-relaxed">
              <strong>Evaluasi Cepat:</strong> Klik kartu akun demo di sebelah kanan untuk langsung masuk tanpa perlu mengetik kata sandi.
            </span>
          </div>

          {/* Quick back link */}
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('landing')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Halaman Depan
            </button>
          </div>
        </div>

        {/* 2. RIGHT COLUMN: Clean White Auth Card */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900 tracking-tight">
                  {activeMode === 'login' ? 'Masuk ke Ruang Kerja' : 'Daftar Akun Mahasiswa'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeMode === 'login'
                    ? 'Kelola kewirausahaan Anda dengan data yang terintegrasi.'
                    : 'Daftarkan kelompok wirausaha mahasiswa Anda di Universitas Cenderawasih.'}
                </p>
              </div>

              {/* Mode Switcher */}
              <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveMode('login');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    activeMode === 'login'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveMode('register');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    activeMode === 'register'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Daftar
                </button>
              </div>
            </div>

            {/* Notifications */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Mode: Login Form */}
            {activeMode === 'login' ? (
              <form onSubmit={handleManualLogin} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Email Pengguna
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="nama@uncen.ac.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 text-xs bg-slate-50/50 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 text-xs bg-slate-50/50 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
                >
                  <span>Masuk ke Ruang Kerja</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </form>
            ) : (
              /* Mode: Register Mahasiswa */
              <form onSubmit={handleRegister} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Nama Lengkap Ketua Kelompok
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Samuel Mandowen"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 text-xs bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">NIM Mahasiswa</label>
                    <input
                      type="text"
                      required
                      placeholder="2022011044..."
                      value={regNim}
                      onChange={(e) => setRegNim(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 text-xs bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Fakultas</label>
                    <select
                      value={regFaculty}
                      onChange={(e) => setRegFaculty(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 text-xs bg-slate-50/50"
                    >
                      <option value="Fakultas Ekonomi dan Bisnis">FEB</option>
                      <option value="Fakultas Teknik">FT</option>
                      <option value="Fakultas MIPA">FMIPA</option>
                      <option value="Fakultas Pertanian">FAPERTA</option>
                      <option value="Fakultas Ilmu Sosial dan Ilmu Politik">FISIP</option>
                      <option value="Fakultas Hukum">FH</option>
                      <option value="Fakultas Kedokteran">FK</option>
                      <option value="Fakultas Keguruan dan Ilmu Pendidikan">FKIP</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email Mahasiswa</label>
                  <input
                    type="email"
                    required
                    placeholder="mahasiswa@uncen.ac.id"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 text-xs bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kata Sandi</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="Minimal 6 karakter"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 text-xs bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 mt-1"
                >
                  <span>Daftar Akun Mahasiswa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* 3. ONE-CLICK DEMO ACCOUNTS (User friendly, neat, eye-pleasing) */}
            <div className="border-t border-slate-100 pt-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                  <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                  Pilih Akun Demo (1-Click Login):
                </span>
                <span className="font-mono text-[10px] text-slate-400">pass: password</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {dummyAccounts.map((acc) => (
                  <button
                    key={acc.key}
                    type="button"
                    onClick={() => handleQuickLogin(acc)}
                    className="text-left p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 hover:border-slate-300 transition group flex items-start gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0 group-hover:bg-slate-900 transition">
                      {acc.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-800 text-[11px] line-clamp-1">
                        {acc.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono truncate">{acc.email}</div>
                      <div className="mt-0.5">
                        <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-bold border ${acc.badgeColor}`}>
                          {acc.badge}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Links */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
              <button
                onClick={() => setActiveTab('landing')}
                className="hover:text-slate-900 flex items-center gap-1 transition"
              >
                <ArrowLeft className="w-3 h-3" /> Beranda
              </button>
              <button
                onClick={() => setActiveTab('market')}
                className="hover:text-slate-900 flex items-center gap-1 transition"
              >
                Buka MENOKEN Market <Store className="w-3.5 h-3.5 text-emerald-600" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
