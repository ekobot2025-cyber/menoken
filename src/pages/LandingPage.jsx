import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getGroups, getProducts, getMasterData } from '../lib/storage';
import {
  Rocket,
  ShieldCheck,
  TrendingUp,
  Store,
  Users,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ArrowRight,
  Play,
  Leaf,
  Award,
  Database,
  Sparkles,
  Coffee,
  CheckCircle2,
  KeyRound,
  Globe,
  Scissors,
  ShoppingBag,
  ExternalLink,
  HelpCircle,
  Check,
  Building2,
  MapPin,
  Lock,
  Mail,
  User,
  Sliders,
  ChevronDown,
  Sun,
  Moon,
  Compass,
  HeartHandshake
} from 'lucide-react';

export const LandingPage = ({ setActiveTab }) => {
  const { loginAsDummy, login, register, DUMMY_ACCOUNTS } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const groups = getGroups();
  const products = getProducts();
  const masterData = getMasterData();

  // Auth Tab: 'login' | 'register'
  const [authTab, setAuthTab] = useState('login');

  // Auto-rotating Hero 3D Animation Slides flanked by Mascots
  const heroSlides = [
    {
      id: 'pasar-digital',
      badge: 'PASAR & KASIR DIGITAL',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
      title: 'Pasar Digital SinergiBiz: Timbangan Sentral & Kios',
      src: '/hero_slide_1.jpg',
      alt: 'Pasar Digital SinergiBiz: Timbangan Sentral & Kios Hasil Bumi',
      tag: '#PasarDigital'
    },
    {
      id: 'lelang-transparan',
      badge: 'LELANG B2B TRANSPARAN',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      title: 'Lelang Transparan & Ekosistem Bisnis',
      src: '/hero_slide_2.jpg',
      alt: 'Lelang Transparan & Traktor Pertanian Papua',
      tag: '#LelangTransparan'
    },
    {
      id: 'peta-papua',
      badge: 'PETA 3D KOMODITAS',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      title: 'Jelajah Ekosistem 8 Fakultas UNCEN',
      src: '/peta_papua_3d.png',
      alt: 'Peta Ekosistem 3D Papua UNCEN',
      isMap: true,
      tag: '#8FakultasUncen'
    },
    {
      id: 'hasil-laut',
      badge: 'AGROMARITIM PAPUA',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      title: 'Hasil Laut & Pertanian Berkelanjutan',
      src: '/hero_slide_3.jpg',
      alt: 'Dermaga Hasil Laut & Sawah Berundak Berkelanjutan',
      tag: '#Agromaritim'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-cycle slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // Scroll to Top visibility tracker
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 240) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register form state
  const [regData, setRegData] = useState({
    email: '',
    password: '',
    owner_name: '',
    business_name: '',
    location: 'Fakultas Ekonomi dan Bisnis',
    business_type: 'agromaritim',
    sub_category: 'Kopi Wamena (Arabika/Robusta)'
  });
  const [regSuccess, setRegSuccess] = useState(false);

  // Sub-categories per sector
  const jasaSubs = [
    'Barbershop & Pangkas Rambut',
    'Salon & Perawatan Kecantikan',
    'Laundry & Cuci Sepatu',
    'Kriya & Desain Grafis Digital',
    'Fotografi, Video & Percetakan',
    'Servis Komputer & Jaringan'
  ];

  const agroSubs = [
    'Kopi Wamena (Arabika/Robusta)',
    'Noken Anyaman Tradisional Kulit Kayu',
    'Sagu & Olahan Pangan Lokal Sentani',
    'Perikanan Tangkap & Olahan Ikan Laut',
    'Peternakan Ayam & Pakan Mandiri',
    'Minyak Buah Merah Organik Papua'
  ];

  // Multiplier Calculator
  const [teamSize, setTeamSize] = useState(4);
  const [localSourcing, setLocalSourcing] = useState(90);
  const [targetRevenue, setTargetRevenue] = useState(15000000);

  const growthScore = Math.min(100, Math.round(40 + (localSourcing * 0.3) + (targetRevenue / 1000000) * 1.5));
  const jobsCreated = Math.max(1, Math.round(teamSize * 0.75 + (targetRevenue / 10000000)));
  const economicMultiplier = Math.round(targetRevenue * 1.65);
  const mbkmSks = Math.min(20, Math.round(teamSize * 3.5 + 4));

  // FAQ State
  const [activeFaq, setActiveFaq] = useState(null);

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail || !loginPassword) {
      setLoginError('Harap isi username/email dan kata sandi.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const res = login(loginEmail, loginPassword);
      setIsSubmitting(false);
      if (res.success && res.user) {
        redirectToDashboard(res.user.role, res.user.defaultTab);
      } else {
        setLoginError(res.message || 'Username atau kata sandi salah. Password default: Password123');
      }
    }, 400);
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regData.email || !regData.password || !regData.owner_name || !regData.business_name) {
      alert('Harap lengkapi semua kolom pendaftaran.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const res = register({
        name: regData.owner_name,
        email: regData.email,
        password: regData.password,
        role: 'student',
        groupName: regData.business_name,
        faculty: regData.location,
        sector: regData.business_type,
        subCategory: regData.sub_category
      });
      setIsSubmitting(false);
      if (res.success) {
        setRegSuccess(true);
        setTimeout(() => {
          redirectToDashboard('student', 'student_dashboard');
        }, 1000);
      } else {
        alert(res.message || 'Gagal mendaftar');
      }
    }, 500);
  };

  // Helper redirect
  const redirectToDashboard = (role, defaultTab) => {
    if (defaultTab) {
      setActiveTab(defaultTab);
      return;
    }
    switch (role) {
      case 'student':
        setActiveTab('student_dashboard');
        break;
      case 'admin':
      case 'admin_upa':
      case 'superadmin':
        setActiveTab('admin_dashboard');
        break;
      case 'reviewer':
        setActiveTab('reviewer_dashboard');
        break;
      case 'leadership':
      case 'leader':
        setActiveTab('leadership_dashboard');
        break;
      case 'mentor':
        setActiveTab('admin_mentoring');
        break;
      default:
        setActiveTab('student_dashboard');
    }
  };

  // Quick 1-click dummy login
  const handleDummyClick = (key) => {
    const res = loginAsDummy(key);
    if (res && res.success && res.user) {
      setActiveTab(res.user.defaultTab || 'student_dashboard');
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDark ? 'bg-[#0b1220] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* ========================================================= */}
      {/* 1. DUAL-SECTOR HERO SPLIT SCREEN                          */}
      {/* ========================================================= */}
      <section className="auth-split">
        
        {/* LEFT PANEL: Emerald & Pine Gradient with 3D Pixar Noken & Auto-Rotating 3D Scene */}
        <aside className="auth-hero-panel">
          
          {/* Top Brand with 3D Pixar Noken Icon */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <div className="hero-brand cursor-pointer select-none" onClick={() => setActiveTab('landing')}>
                {/* 3D Pixar Noken Icon with Subtle Pulse */}
                <div className="relative group">
                  <img
                    src="/noken_pixar_3d.png"
                    alt="Noken 3D Pixar Icon"
                    className="w-11 h-11 sm:w-12 sm:h-12 object-contain drop-shadow-xl transform group-hover:scale-110 transition duration-300"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#09191d]" />
                </div>

                <div>
                  <div className="font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-2">
                    MENOKEN
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      UNCEN
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium -mt-0.5">
                    Universitas Cenderawasih Papua
                  </p>
                </div>
              </div>

              {/* Quick Navigation Chips - Pine & Emerald Theme */}
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <button
                  onClick={() => setActiveTab('market')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-500/30 transition flex items-center gap-1.5 shadow-xs"
                >
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  <span>Market</span>
                </button>
                <button
                  onClick={() => setActiveTab('partner_hub')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-500/30 transition flex items-center gap-1.5 shadow-xs"
                >
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Mitra B2B</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero Content: Headline & Subtitle */}
          <div className="hero-content mt-2">
            <div className="hero-eyebrow">
              <img src="/noken_pixar_3d.png" alt="Mini Noken" className="w-4 h-4 object-contain" />
              <span>#OPERASI LEBIH SINERGIS · EKOSISTEM NOKEN DIGITAL</span>
            </div>

            <h1 className="hero-title">
              Kerja lebih ringan,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-200">
                tumbuh bersama.
              </span>
            </h1>

            <p className="hero-sub">
              Satu wadah digital wirausaha mahasiswa UNCEN — terinspirasi filosofi Noken Papua untuk merajut sinergi dari Kopi Wamena hingga ekonomi kreatif.
            </p>
          </div>

          {/* 3D SLIDE WITH MASCOTS STANDING ON BOTH SIDES */}
          <div className="hero-illustration-wrap my-3">
            <div className="relative w-full flex items-end justify-center">
              
              {/* LEFT MASCOT: Mahasiswa Preneur standing beside slide with slow-motion float */}
              <div className="flex flex-col items-center z-20 shrink-0 select-none -mr-2 sm:-mr-4 md:-mr-6 mb-1 sm:mb-2">
                {/* Speech Bubble Badge */}
                <div className="mb-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/95 text-slate-950 font-bold text-[8px] sm:text-[9px] tracking-wide shadow-lg border border-emerald-300 flex items-center gap-1 animate-mascot-left">
                  <span>✌️</span>
                  <span>Mahasiswa Preneur</span>
                </div>
                {/* Mascot Image with Slow Motion Animation & Real Transparent Cutout */}
                <div className="relative">
                  <img
                    src="/maskot_mahasiswa_3d.png"
                    alt="Maskot Mahasiswa Preneur Papua"
                    className="h-32 sm:h-52 md:h-60 lg:h-64 w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.55)] animate-mascot-left pointer-events-none"
                  />
                  {/* Slow-motion pulsing contact shadow */}
                  <div className="w-16 sm:w-24 h-2.5 bg-black/45 rounded-full blur-sm mx-auto -mt-1 animate-mascot-shadow-left" />
                </div>
              </div>

              {/* CENTER: The Animated 3D Slide Carousel */}
              <div className="flex-1 max-w-[340px] sm:max-w-[370px] md:max-w-[400px] z-10">
                <figure className="hero-illustration relative group">
                  
                  {/* Slides Container */}
                  <div className="relative w-full aspect-square max-h-[230px] sm:max-h-[260px] md:max-h-[280px] overflow-hidden rounded-[20px]">
                    {heroSlides.map((slide, idx) => {
                      const isActive = idx === currentSlide;
                      return (
                        <div
                          key={slide.id}
                          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                            isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                          } ${slide.isMap ? 'bg-gradient-to-b from-[#071f33] to-[#041320] flex items-center justify-center p-3' : ''}`}
                        >
                          <img
                            src={slide.src}
                            alt={slide.alt}
                            className={slide.isMap ? 'w-full h-full object-contain drop-shadow-xl' : 'w-full h-full object-cover'}
                            loading={idx === 0 ? 'eager' : 'lazy'}
                          />

                          {/* Gradient Scrim & Caption */}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-3 pt-6 flex flex-col justify-end">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className={`text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded border ${slide.badgeColor}`}>
                                {slide.badge}
                              </span>
                              <span className="text-[9.5px] font-mono text-cyan-300 font-bold">{slide.tag}</span>
                            </div>
                            <h4 className="text-white font-bold text-xs line-clamp-1 drop-shadow">{slide.title}</h4>
                          </div>
                        </div>
                      );
                    })}

                    {/* Left / Right Hover Arrows */}
                    <button
                      onClick={handlePrevSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-slate-950/70 text-white/80 hover:text-white hover:bg-slate-900 border border-white/10 opacity-0 group-hover:opacity-100 transition duration-200"
                      title="Slide sebelumnya"
                      aria-label="Slide sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-slate-950/70 text-white/80 hover:text-white hover:bg-slate-900 border border-white/10 opacity-0 group-hover:opacity-100 transition duration-200"
                      title="Slide berikutnya"
                      aria-label="Slide berikutnya"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Bottom Slide Indicators (Dots) */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 px-2.5 py-1 rounded-full bg-slate-950/60 backdrop-blur-xs border border-white/10">
                      {heroSlides.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentSlide(dotIdx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            dotIdx === currentSlide
                              ? 'w-5 bg-cyan-400'
                              : 'w-1.5 bg-white/40 hover:bg-white/70'
                          }`}
                          title={`Slide ${dotIdx + 1}`}
                          aria-label={`Pindah ke slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Category Pills Strip beneath image */}
                  <ul className="hero-worker-strip">
                    <li>PETANI</li>
                    <li>NELAYAN</li>
                    <li>PETERNAK</li>
                    <li>BARBER</li>
                    <li>SALON</li>
                    <li>LAUNDRY</li>
                  </ul>
                </figure>
              </div>

              {/* RIGHT MASCOT: Mentor & Pembimbing standing beside slide with slow-motion float */}
              <div className="flex flex-col items-center z-20 shrink-0 select-none -ml-2 sm:-ml-4 md:-ml-6 mb-1 sm:mb-2">
                {/* Speech Bubble Badge */}
                <div className="mb-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-500/95 text-slate-950 font-bold text-[8px] sm:text-[9px] tracking-wide shadow-lg border border-amber-300 flex items-center gap-1 animate-mascot-right">
                  <span>⭐</span>
                  <span>Mentor & Inkubasi</span>
                </div>
                {/* Mascot Image with Slow Motion Animation & Real Transparent Cutout */}
                <div className="relative">
                  <img
                    src="/maskot_mentor_3d.png"
                    alt="Maskot Pendamping & Mentor"
                    className="h-32 sm:h-52 md:h-60 lg:h-64 w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.55)] animate-mascot-right pointer-events-none"
                  />
                  {/* Slow-motion pulsing contact shadow */}
                  <div className="w-14 sm:w-20 h-2.5 bg-black/45 rounded-full blur-sm mx-auto -mt-1 animate-mascot-shadow-right" />
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Trust Chips */}
          <ul className="hero-badges">
            <li className="hero-badge-card">
              <span className="hero-badge-icon">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <div>
                <strong className="text-white text-xs font-bold block">Legalitas NIB</strong>
                <small className="text-slate-300 text-[10.5px] block">OSS Berizin resmi terverifikasi</small>
              </div>
            </li>

            <li className="hero-badge-card">
              <span className="hero-badge-icon">
                <TrendingUp className="w-4 h-4" />
              </span>
              <div>
                <strong className="text-white text-xs font-bold block">Harga Transparan</strong>
                <small className="text-slate-300 text-[10.5px] block">Pelacakan omzet & POS kasir</small>
              </div>
            </li>

            <li className="hero-badge-card">
              <span className="hero-badge-icon">
                <Award className="w-4 h-4" />
              </span>
              <div>
                <strong className="text-white text-xs font-bold block">50+ Kelompok Binaan</strong>
                <small className="text-slate-300 text-[10.5px] block">Mahasiswa 8 Fakultas UNCEN</small>
              </div>
            </li>
          </ul>

        </aside>

        {/* RIGHT PANEL: Form Panel with Dark/Light Toggle & Concise Dummy Accounts */}
        <section className={`auth-form-panel transition-colors duration-300 ${
          isDark ? 'bg-[#0b1320] text-slate-100' : 'bg-white text-slate-900 border-l border-slate-200'
        }`}>
          
          {/* Top Panel Actions: Language toggle & THEME TOGGLE (Dark / Light) */}
          <header className="auth-panel-top">
            <div className="lg:hidden flex items-center gap-2">
              <img src="/noken_pixar_3d.png" alt="MENOKEN Noken" className="w-7 h-7 object-contain drop-shadow" />
              <span className={`font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                MENOKEN UNCEN
              </span>
            </div>

            <div className="auth-top-actions">
              {/* THEME TOGGLE BUTTON (Light / Dark) - Emerald Theme */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-[#062c24] border-emerald-800/60 text-amber-300 hover:bg-[#093d32] hover:text-amber-200 shadow-xs'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900 shadow-xs'
                }`}
                title={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
                aria-label="Toggle tema gelap terang"
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mode Terang</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span>Mode Gelap</span>
                  </>
                )}
              </button>

              {/* Language Switcher */}
              <button
                type="button"
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-[#062c24] border-emerald-800/60 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
                title="Pilih Bahasa"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>ID / EN</span>
              </button>
            </div>
          </header>

          <div className="auth-form-inner">
            
            {/* Heading with Mascots mini helper badge */}
            <div className="auth-form-heading">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h2 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {authTab === 'login' ? 'Selamat datang kembali' : 'Mulai perjalanan Anda'}
                </h2>
                <div className="flex items-center -space-x-2">
                  <img
                    src="/maskot_mahasiswa_3d.png"
                    alt="Maskot Mahasiswa"
                    title="Maskot Mahasiswa Preneur"
                    className="w-7 h-7 rounded-full border-2 border-emerald-400 object-cover bg-emerald-100 shadow-sm"
                  />
                  <img
                    src="/maskot_mentor_3d.png"
                    alt="Maskot Mentor"
                    title="Maskot Pendamping & Mentor"
                    className="w-7 h-7 rounded-full border-2 border-amber-400 object-cover bg-amber-100 shadow-sm"
                  />
                </div>
              </div>
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                {authTab === 'login'
                  ? 'Masuk untuk melanjutkan operasi wirausaha harian Anda.'
                  : 'Daftar gratis dan pilih sektor bisnis mahasiswa Anda.'}
              </p>
            </div>

            {/* Segmented Tab Switch */}
            <div className="auth-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={authTab === 'login'}
                className={authTab === 'login' ? 'active' : ''}
                onClick={() => { setAuthTab('login'); setLoginError(''); }}
              >
                Masuk
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={authTab === 'register'}
                className={authTab === 'register' ? 'active' : ''}
                onClick={() => { setAuthTab('register'); setLoginError(''); }}
              >
                Daftar
              </button>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={() => handleDummyClick('student')}
              className="google-btn"
            >
              <span className="g-logo" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.44c-.28 1.51-1.13 2.79-2.4 3.65v3.03h3.87c2.27-2.09 3.58-5.17 3.58-8.92z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.94-2.92l-3.87-3.03c-1.07.72-2.45 1.16-4.07 1.16-3.13 0-5.79-2.11-6.74-4.96H1.24v3.12C3.22 21.3 7.31 24 12 24z" />
                  <path fill="#FBBC05" d="M5.26 14.25a7.21 7.21 0 010-4.5V6.63H1.24a11.996 11.996 0 000 10.74l4.02-3.12z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.18 15.24 0 12 0 7.31 0 3.22 2.7 1.24 6.63l4.02 3.12C6.21 6.86 8.87 4.75 12 4.75z" />
                </svg>
              </span>
              <span>Lanjutkan dengan Google SSO UNCEN</span>
            </button>

            {/* Divider */}
            <div className="auth-divider">
              <span>ATAU</span>
            </div>

            {/* TAB CONTENT: LOGIN */}
            {authTab === 'login' && (
              <div className="space-y-5">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {loginError && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <Lock className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Username / Email Akun
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="admin, student, mentor, superadmin, leader, reviewer"
                        className="input-field-dark pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Kata Sandi <span className="text-[11px] font-mono text-cyan-500 font-normal">(default: Password123)</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setLoginPassword('Password123')}
                        className="text-[11px] text-cyan-500 hover:underline"
                        title="Isi otomatis sandi default Password123"
                      >
                        Isi Sandi
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Password123"
                        className="input-field-dark pl-10"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Memproses...</span>
                    ) : (
                      <>
                        <span>Masuk ke ruang kerja</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* 1-CLICK DUMMY LOGIN SECTION - SHORT & CONCISE WITH AVATARS */}
                <div className={`pt-2 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-500 uppercase flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-cyan-500" />
                      AKUN LOGIN DUMMY
                    </span>
                    <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Password: <strong className="text-cyan-500 font-bold">Password123</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { key: 'admin', label: 'admin', img: '/noken_pixar_3d.png', color: isDark ? 'border-blue-500/40 text-blue-300 hover:bg-blue-500/10' : 'border-blue-300 text-blue-800 bg-blue-50/60 hover:bg-blue-100/70', dot: 'bg-blue-500' },
                      { key: 'student', label: 'student', img: '/maskot_mahasiswa_3d.png', color: isDark ? 'border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10' : 'border-emerald-300 text-emerald-800 bg-emerald-50/60 hover:bg-emerald-100/70', dot: 'bg-emerald-500' },
                      { key: 'mentor', label: 'mentor', img: '/maskot_mentor_3d.png', color: isDark ? 'border-teal-500/40 text-teal-300 hover:bg-teal-500/10' : 'border-teal-300 text-teal-800 bg-teal-50/60 hover:bg-teal-100/70', dot: 'bg-teal-500' },
                      { key: 'superadmin', label: 'superadmin', img: '/noken_pixar_3d.png', color: isDark ? 'border-rose-500/40 text-rose-300 hover:bg-rose-500/10' : 'border-rose-300 text-rose-800 bg-rose-50/60 hover:bg-rose-100/70', dot: 'bg-rose-500' },
                      { key: 'leader', label: 'leader', img: '/noken_pixar_3d.png', color: isDark ? 'border-amber-500/40 text-amber-300 hover:bg-amber-500/10' : 'border-amber-300 text-amber-800 bg-amber-50/60 hover:bg-amber-100/70', dot: 'bg-amber-500' },
                      { key: 'reviewer', label: 'reviewer', img: '/maskot_mentor_3d.png', color: isDark ? 'border-purple-500/40 text-purple-300 hover:bg-purple-500/10' : 'border-purple-300 text-purple-800 bg-purple-50/60 hover:bg-purple-100/70', dot: 'bg-purple-500' },
                    ].map((acc) => (
                      <button
                        key={acc.key}
                        type="button"
                        onClick={() => handleDummyClick(acc.key)}
                        className={`py-2 px-2.5 rounded-lg border ${acc.color} transition flex items-center justify-between group font-mono text-xs font-bold shadow-xs`}
                        title={`Masuk sebagai ${acc.label}`}
                      >
                        <div className="flex items-center gap-1.5 min-w-0 truncate">
                          <img
                            src={acc.img}
                            alt={acc.label}
                            className="w-4 h-4 rounded-full object-cover shrink-0 border border-white/20"
                          />
                          <span className="truncate">{acc.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition shrink-0" />
                      </button>
                    ))}
                  </div>
                  <p className={`text-[10.5px] mt-2 text-center font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Klik peran di atas untuk masuk instan, atau ketik dengan sandi <span className="text-cyan-500 font-semibold">Password123</span>.
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: REGISTER */}
            {authTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {regSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Akun berhasil didaftarkan! Mengarahkan ke ruang kerja...</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Email Mahasiswa / Kelompok
                    </label>
                    <input
                      type="email"
                      required
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                      placeholder="ketua@uncen.ac.id"
                      className="input-field-dark"
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Kata Sandi
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={regData.password}
                      onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                      placeholder="Min. 6 karakter"
                      className="input-field-dark"
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Nama Ketua Kelompok
                    </label>
                    <input
                      type="text"
                      required
                      value={regData.owner_name}
                      onChange={(e) => setRegData({ ...regData, owner_name: e.target.value })}
                      placeholder="cth: Yan Wayangkau"
                      className="input-field-dark"
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Nama Usaha Mahasiswa
                    </label>
                    <input
                      type="text"
                      required
                      value={regData.business_name}
                      onChange={(e) => setRegData({ ...regData, business_name: e.target.value })}
                      placeholder="cth: Kopi Wamena Mandiri"
                      className="input-field-dark"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Fakultas Asal Mahasiswa
                  </label>
                  <select
                    value={regData.location}
                    onChange={(e) => setRegData({ ...regData, location: e.target.value })}
                    className="input-field-dark"
                  >
                    <option value="Fakultas Ekonomi dan Bisnis">Fakultas Ekonomi dan Bisnis (FEB)</option>
                    <option value="Fakultas Sains dan Teknologi">Fakultas Sains dan Teknologi (FST)</option>
                    <option value="Fakultas Keguruan dan Ilmu Pendidikan">Fakultas Keguruan dan Ilmu Pendidikan (FKIP)</option>
                    <option value="Fakultas Ilmu Sosial dan Ilmu Politik">Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)</option>
                    <option value="Fakultas Hukum">Fakultas Hukum (FH)</option>
                    <option value="Fakultas Kedokteran">Fakultas Kedokteran (FK)</option>
                    <option value="Fakultas Kesehatan Masyarakat">Fakultas Kesehatan Masyarakat (FKM)</option>
                    <option value="Fakultas Matematika dan IPA">Fakultas Matematika dan IPA (FMIPA)</option>
                  </select>
                </div>

                {/* Sektor Bisnis Selector (Dual Cards) */}
                <div>
                  <label className={`block text-xs font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Pilih Sektor Usaha Anda
                  </label>
                  <div className="sector-picker-grid">
                    {/* Services Card */}
                    <div
                      onClick={() => setRegData({
                        ...regData,
                        business_type: 'jasa',
                        sub_category: jasaSubs[0]
                      })}
                      className={`sector-mini-card ${regData.business_type === 'jasa' ? 'selected' : ''}`}
                    >
                      {regData.business_type === 'jasa' && (
                        <div className="mini-check">
                          <Check className="w-3 h-3 text-cyan-500" />
                        </div>
                      )}
                      <div className="sector-avatar bg-gradient-to-br from-indigo-500 to-purple-600">
                        <Scissors className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold tracking-wider text-indigo-400 uppercase">
                          SERVICES
                        </p>
                        <strong className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Jasa & Kreatif
                        </strong>
                        <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Barbershop, Salon, Laundry, Kriya Digital
                        </span>
                      </div>
                    </div>

                    {/* Agromaritime Card */}
                    <div
                      onClick={() => setRegData({
                        ...regData,
                        business_type: 'agromaritim',
                        sub_category: agroSubs[0]
                      })}
                      className={`sector-mini-card ${regData.business_type === 'agromaritim' ? 'selected' : ''}`}
                    >
                      {regData.business_type === 'agromaritim' && (
                        <div className="mini-check">
                          <Check className="w-3 h-3 text-cyan-500" />
                        </div>
                      )}
                      <div className="sector-avatar bg-gradient-to-br from-emerald-500 to-teal-600">
                        <Leaf className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                          AGROMARITIME
                        </p>
                        <strong className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Agromaritim Papua
                        </strong>
                        <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Kopi Wamena, Noken Papua, Sagu, Nelayan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-Category Dropdown */}
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Sub-Kategori Komoditas / Layanan
                  </label>
                  <select
                    value={regData.sub_category}
                    onChange={(e) => setRegData({ ...regData, sub_category: e.target.value })}
                    className="input-field-dark"
                  >
                    {(regData.business_type === 'jasa' ? jasaSubs : agroSubs).map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Membuat akun...</span>
                  ) : (
                    <>
                      <span>Buat akun wirausaha</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Bottom Tagline Box */}
            <p className="auth-tagline">
              Platform lelang & ekosistem wirausaha digital terpadu Universitas Cenderawasih Papua.
            </p>

          </div>
        </section>

      </section>


      {/* ========================================================= */}
      {/* 2. PHILOSOPHY OF NOKEN PAPUA & 3 KEY PILLARS              */}
      {/* ========================================================= */}
      <section className={`border-t py-14 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-[#091524] border-slate-800 text-slate-100' : 'bg-emerald-50/60 border-emerald-100 text-slate-900'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: 3D Pixar Noken Showcase */}
            <div className="lg:col-span-4 flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-emerald-500/20 to-amber-500/15 p-5 border border-cyan-500/30 shadow-2xl flex items-center justify-center">
                  <img
                    src="/noken_pixar_3d.png"
                    alt="Noken Pixar 3D"
                    className="w-full h-full object-contain transform group-hover:scale-105 group-hover:rotate-1 transition duration-500 drop-shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-3 -right-2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-mono text-[10px] font-black uppercase tracking-wider shadow-lg">
                  Kearifan Papua
                </div>
              </div>

              <div className="text-center">
                <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 uppercase block">
                  WARISAN DUNIA UNESCO
                </span>
                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Simbol Wadah Sinergi & Gotong Royong
                </span>
              </div>
            </div>

            {/* Right Column: Philosophy Narrative & 3 Pillars */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>FILOSOFI NOKEN PAPUA · IDENTITAS RESMI MENOKEN</span>
              </div>

              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Noken: Merajut Gagasan, Mengangkat Martabat Wirausaha Mahasiswa
              </h2>

              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Sebagai warisan budaya takbenda dunia UNESCO, <strong>Noken</strong> melambangkan rahim kehidupan, kejujuran, dan gotong royong masyarakat Papua. Di Universitas Cenderawasih, <strong>MENOKEN</strong> mengadopsi nilai luhur ini menjadi wadah digital yang menampung ide bisnis mahasiswa, merajut pendampingan mentor praktisi, hingga memasarkan produk unggulan Tanah Papua ke pasar nasional.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-emerald-200/80 shadow-xs'}`}>
                  <strong className="text-xs font-bold text-cyan-400 block mb-1">1. Wadah Inkubasi</strong>
                  <p className={`text-[11.5px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Menampung proposal, data legalitas NIB OSS, dan pelaporan kasir omzet.</p>
                </div>
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-emerald-200/80 shadow-xs'}`}>
                  <strong className="text-xs font-bold text-emerald-400 block mb-1">2. Rajutan Jejaring</strong>
                  <p className={`text-[11.5px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Kolaborasi 8 fakultas Uncen, mentor praktisi, dan reviewer independen.</p>
                </div>
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-emerald-200/80 shadow-xs'}`}>
                  <strong className="text-xs font-bold text-amber-400 block mb-1">3. Multiplier Mandiri</strong>
                  <p className={`text-[11.5px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Menciptakan lapangan kerja lokal dan konversi capaian ke 20 SKS MBKM.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 3. PETA SEBARAN 3D KOMODITAS & EKOSISTEM WIRAUSAHA PAPUA  */}
      {/* ========================================================= */}
      <section className={`border-t py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-[#08121f] border-slate-800/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>PETA SEBARAN POTENSI WIRAUSAHA 3D PAPUA</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Jelajah Komoditas & Ekosistem 8 Fakultas UNCEN
            </h2>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Dari puncak salju Cartensz hingga perairan Teluk Youtefa, wirausaha binaan Universitas Cenderawasih tersebar di seluruh pelosok Tanah Papua.
            </p>
          </div>

          {/* 3D Map Container */}
          <div className={`p-4 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden group ${
            isDark ? 'bg-gradient-to-b from-[#0b192c] to-[#081322] border-[#1b2d47]' : 'bg-gradient-to-b from-teal-50/50 to-emerald-50/30 border-emerald-100'
          }`}>
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Map Illustration with Gentle Float */}
              <div className="w-full lg:w-3/5 flex justify-center">
                <img
                  src="/peta_papua_3d.png"
                  alt="Peta 3D Wirausaha Papua UNCEN"
                  className="w-full max-w-[620px] object-contain drop-shadow-[0_20px_40px_rgba(6,182,212,0.25)] transform group-hover:scale-102 transition duration-500"
                />
              </div>

              {/* Geographic Commodity Cards */}
              <div className="w-full lg:w-2/5 space-y-3">
                <div className={`p-3.5 rounded-xl border transition ${
                  isDark ? 'bg-[#0f1f35] border-cyan-500/30 hover:border-cyan-400' : 'bg-white border-cyan-200 hover:border-cyan-400 shadow-xs'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">☕</span>
                    <strong className="text-xs font-bold text-cyan-400">Pegunungan Jayawijaya & Wamena</strong>
                  </div>
                  <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Kopi Arabika Organik Specialty ditanam di ketinggian 1.600+ mdpl dengan metode fair-trade kelompok binaan FEB & FST Uncen.
                  </p>
                </div>

                <div className={`p-3.5 rounded-xl border transition ${
                  isDark ? 'bg-[#0f1f35] border-emerald-500/30 hover:border-emerald-400' : 'bg-white border-emerald-200 hover:border-emerald-400 shadow-xs'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">🧺</span>
                    <strong className="text-xs font-bold text-emerald-400">Lembah Baliem & Mee Pago</strong>
                  </div>
                  <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Sentra pengrajin anyaman Noken kulit kayu alami mahkota anggrek dan kriya etnik khas Papua berstandar kurasi ekspor.
                  </p>
                </div>

                <div className={`p-3.5 rounded-xl border transition ${
                  isDark ? 'bg-[#0f1f35] border-amber-500/30 hover:border-amber-400' : 'bg-white border-amber-200 hover:border-amber-400 shadow-xs'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">🥣</span>
                    <strong className="text-xs font-bold text-amber-400">Danau Sentani & Dataran Pantai</strong>
                  </div>
                  <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Pengolahan tepung sagu murni, kue kering sagu lempeng, dan budidaya ikan air tawar terintegrasi dengan kearifan adat.
                  </p>
                </div>

                <div className={`p-3.5 rounded-xl border transition ${
                  isDark ? 'bg-[#0f1f35] border-indigo-500/30 hover:border-indigo-400' : 'bg-white border-indigo-200 hover:border-indigo-400 shadow-xs'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">🏛️</span>
                    <strong className="text-xs font-bold text-indigo-400">Kampus Abepura & Waena</strong>
                  </div>
                  <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Pusat Komando UPA Kewirausahaan: seleksi proposal berstandar Dikti, sertifikasi NIB OSS, dan mentoring inkubasi intensif.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 4. OFFICIAL UNCEN YOUTUBE SHOWCASE                        */}
      {/* ========================================================= */}
      <section className={`border-t py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              <span>DOKUMENTASI RESMI UNIVERSITAS CENDERAWASIH</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Liputan & Profil Kewirausahaan UNCEN TV
            </h2>
            <p className={`text-sm max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Simak tayangan video resmi kegiatan expo, pembinaan usaha mahasiswa, dan hilirisasi produk unggulan Papua di Universitas Cenderawasih.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video 1 */}
            <div className={`rounded-2xl border overflow-hidden shadow-xl hover:border-cyan-500/40 transition ${
              isDark ? 'bg-[#0f1a2c] border-[#1f2e45]' : 'bg-white border-slate-200'
            }`}>
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/n1XFWB472UI"
                  title="Video Dokumentasi Kewirausahaan Uncen 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-500 font-bold">
                  <span>RESMI UNCEN TV</span>
                  <span>DOKUMENTASI #1</span>
                </div>
                <h3 className={`font-bold text-base sm:text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Profil & Pendampingan Wirausaha Muda Universitas Cenderawasih
                </h3>
                <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Tayangan menyeluruh alur pendampingan mahasiswa dari proposal hingga menghasilkan produk berdaya saing pasar.
                </p>
              </div>
            </div>

            {/* Video 2 */}
            <div className={`rounded-2xl border overflow-hidden shadow-xl hover:border-emerald-500/40 transition ${
              isDark ? 'bg-[#0f1a2c] border-[#1f2e45]' : 'bg-white border-slate-200'
            }`}>
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/PIFzs7mCmZ0"
                  title="Video Dokumentasi Kewirausahaan Uncen 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-500 font-bold">
                  <span>EXPO & KOMODITAS</span>
                  <span>DOKUMENTASI #2</span>
                </div>
                <h3 className={`font-bold text-base sm:text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Expo Inovasi Produk Mahasiswa & Hilirisasi Potensi Papua
                </h3>
                <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Pameran inovasi Kopi Arabika Wamena, kerajinan anyaman Noken, olahan pangan Sagu Sentani, dan jasa kreatif.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 5. MENOKEN MARKET PRODUCTS SHOWCASE                       */}
      {/* ========================================================= */}
      <section className={`border-t py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-[#0b1320] border-slate-800/80' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-500 uppercase tracking-wider block mb-1">
                KATALOG ETALASE DIGITAL
              </span>
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Produk Unggulan Mahasiswa Papua
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Karya asli mahasiswa 8 fakultas Uncen — siap pesan retail atau pengadaan kemitraan institusi.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('market')}
              className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 border border-cyan-500/30 text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Buka Market Lengkap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className={`rounded-2xl border overflow-hidden hover:border-cyan-500/40 transition group flex flex-col justify-between ${
                  isDark ? 'bg-[#0f1a2c] border-[#1f2e45]' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="aspect-square w-full bg-slate-900 overflow-hidden relative">
                    <img
                      src={product.imageUrl || '/hero_slide_1.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-slate-900/85 text-cyan-300 border border-slate-700">
                      {product.category || 'Agromaritim'}
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {product.groupName || 'Wirausaha Uncen'}
                    </p>
                    <h4 className={`font-bold text-sm line-clamp-1 group-hover:text-cyan-400 transition ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {product.name}
                    </h4>
                    <p className="text-cyan-500 font-extrabold text-base font-mono">
                      Rp {Number(product.price || 0).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => setActiveTab('market')}
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Lihat di Katalog</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 6. MULTIPLIER IMPACT CALCULATOR                           */}
      {/* ========================================================= */}
      <section className={`border-t py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider">
              SIMULASI DAMPAK EKONOMI MBKM
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kalkulator Multiplier Kewirausahaan Papua
            </h2>
            <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Hitung potensi penciptaan lapangan kerja lokal dan konversi SKS MBKM berdasarkan kapasitas usaha mahasiswa.
            </p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl border shadow-2xl ${
            isDark ? 'bg-[#0f1a2c] border-[#1f2e45]' : 'bg-white border-slate-200'
          }`}>
            {/* Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Jumlah Anggota Tim Mahasiswa</span>
                  <span className="font-mono text-cyan-500 font-bold">{teamSize} Orang</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Sourcing Bahan Baku Lokal Papua</span>
                  <span className="font-mono text-emerald-500 font-bold">{localSourcing}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={localSourcing}
                  onChange={(e) => setLocalSourcing(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Target Omzet Bulanan</span>
                  <span className="font-mono text-cyan-500 font-bold">
                    Rp {(targetRevenue / 1000000).toFixed(0)} Juta
                  </span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="50000000"
                  step="1000000"
                  value={targetRevenue}
                  onChange={(e) => setTargetRevenue(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Skor Pertumbuhan</span>
                <p className="text-3xl font-extrabold text-cyan-500 font-mono my-2">{growthScore}/100</p>
                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Potensi skala inkubasi</span>
              </div>

              <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Lapangan Kerja</span>
                <p className="text-3xl font-extrabold text-emerald-500 font-mono my-2">+{jobsCreated}</p>
                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Pekerja terserap</span>
              </div>

              <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Multiplier Ekonomi</span>
                <p className={`text-2xl font-extrabold font-mono my-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Rp {(economicMultiplier / 1000000).toFixed(1)}Jt
                </p>
                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Peredaran uang lokal</span>
              </div>

              <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Rekomendasi MBKM</span>
                <p className="text-3xl font-extrabold text-purple-500 font-mono my-2">{mbkmSks} SKS</p>
                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Konversi mata kuliah</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 7. FAQ ACCORDION                                          */}
      {/* ========================================================= */}
      <section className={`border-t py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-[#0b1220] border-slate-800/80' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-500 uppercase tracking-wider">
              PUSAT BANTUAN
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-3 pt-4">
            {[
              {
                q: "Apa itu platform MENOKEN Universitas Cenderawasih?",
                a: "MENOKEN (Manajemen Ekosistem & Networking Kewirausahaan) adalah platform digital terpadu UNCEN yang memfasilitasi wirausaha mahasiswa dari proses seleksi proposal berstandar Dikti, pencatatan legalitas NIB/P-IRT OSS, pendampingan mentor praktisi, kasir POS & omzet harian, hingga etalase pasar produk lokal Papua."
              },
              {
                q: "Bagaimana cara mahasiswa mendaftar dan mengikuti program inkubasi?",
                a: "Mahasiswa dapat langsung mendaftar melalui form 'Daftar' di sebelah kanan, memilih sektor (Services / Agromaritime), kemudian mengisi proposal dan data tim untuk diverifikasi oleh Admin UPA Kewirausahaan."
              },
              {
                q: "Bagaimana cara login akun demo dummy?",
                a: "Tersedia 6 akun ringkas: admin, student, mentor, superadmin, leader, dan reviewer. Anda cukup mengklik tombol peran tersebut untuk langsung masuk instan, atau mengetik username dan kata sandi default: Password123."
              },
              {
                q: "Bagaimana mitra eksternal atau BUMN dapat memesan produk atau bermitra?",
                a: "Mitra dapat membuka tab 'MENOKEN Market' untuk membeli produk eceran via WhatsApp atau tab 'Hub Mitra' untuk mengajukan kontrak pasokan rutin komoditas Kopi Wamena, Sagu Sentani, Noken, dan produk lainnya."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-xl border overflow-hidden ${
                  isDark ? 'bg-[#0f1a2c] border-[#1f2e45]' : 'bg-white border-slate-200'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className={`w-full p-4 text-left flex items-center justify-between text-sm font-semibold transition ${
                    isDark ? 'text-white hover:text-cyan-300' : 'text-slate-900 hover:text-cyan-600'
                  }`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180 text-cyan-500' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className={`p-4 pt-0 text-xs border-t leading-relaxed ${
                    isDark ? 'text-slate-400 border-slate-800/60' : 'text-slate-600 border-slate-100'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 8. MAIN LANDING PAGE FOOTER                               */}
      {/* ========================================================= */}
      <footer className={`border-t py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-[#050b14] border-slate-800/80 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-center md:text-left">
            <img src="/noken_pixar_3d.png" alt="MENOKEN" className="w-5 h-5 object-contain shrink-0" />
            <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              © 2026 MENOKEN • Manajemen Ekosistem & Networking Kewirausahaan • UPA Uncen Platform. All rights reserved.
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-1.5 text-xs sm:text-sm text-center">
            <span>by</span>
            <a
              href="https://www.instagram.com/kurniawan_patma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-amber-500 hover:text-amber-400 underline underline-offset-4 transition"
            >
              Kurnia Patma
            </a>
            <span className="opacity-50">|</span>
            <span>UI/UX by</span>
            <a
              href="https://www.linkedin.com/in/papedatimur"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-cyan-500 hover:text-cyan-400 underline underline-offset-4 transition"
            >
              Enterdie
            </a>
            <span className="opacity-50">•</span>
            <span className="text-[11px] sm:text-xs opacity-80">Hak Cipta Dilindungi Undang-Undang</span>
          </div>
        </div>
      </footer>


      {/* ========================================================= */}
      {/* 9. FLOATING SCROLL TO TOP BUTTON (KANAN BAWAH)            */}
      {/* ========================================================= */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 sm:p-3.5 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group flex items-center justify-center cursor-pointer border ${
          showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        } ${
          isDark
            ? 'bg-gradient-to-br from-cyan-500 to-teal-500 border-cyan-400/40 text-slate-950 shadow-cyan-500/30 hover:shadow-cyan-400/60'
            : 'bg-gradient-to-br from-emerald-600 to-teal-600 border-emerald-400/40 text-white shadow-emerald-600/30 hover:shadow-emerald-500/60'
        }`}
        title="Kembali ke halaman paling atas"
        aria-label="Kembali ke halaman paling atas"
      >
        <ChevronUp className="w-5 h-5 stroke-[2.8] group-hover:-translate-y-0.5 transition-transform duration-200" />
        <span className="sr-only">Kembali ke atas</span>
      </button>

    </div>
  );
};
