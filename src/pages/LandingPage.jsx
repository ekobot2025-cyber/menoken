import React, { useState, useEffect } from 'react';
import { useAuth, DUMMY_ACCOUNTS } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { SakralEcoBackground } from '../components/SakralEcoBackground';
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
  Leaf,
  Award,
  Sparkles,
  Coffee,
  CheckCircle2,
  KeyRound,
  Globe,
  ShoppingBag,
  Check,
  Building2,
  MapPin,
  Lock,
  Mail,
  User,
  Sun,
  Moon,
  Compass,
  HeartHandshake,
  X,
  Scale,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  Layers
} from 'lucide-react';

export const LandingPage = ({ setActiveTab }) => {
  const { loginAsDummy, login, register } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const groups = getGroups();
  const products = getProducts();
  const masterData = getMasterData();

  // Auth Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'

  // Listen to open-menoken-auth from Navbar
  useEffect(() => {
    const handleOpenAuth = () => {
      setAuthTab('login');
      setShowAuthModal(true);
    };
    window.addEventListener('open-menoken-auth', handleOpenAuth);
    return () => window.removeEventListener('open-menoken-auth', handleOpenAuth);
  }, []);

  // Auto-rotating Hero 3D Animation Slides
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    setTimeout(() => {
      const success = login(loginEmail, loginPassword);
      if (!success) {
        setLoginError('Email atau kata sandi tidak sesuai. Silakan gunakan salah satu akun demo 1-klik.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const newUser = register(regData);
      setIsSubmitting(false);
      if (newUser) {
        setRegSuccess(true);
        setTimeout(() => {
          setShowAuthModal(false);
        }, 1200);
      }
    }, 500);
  };

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    {
      q: 'Apa itu platform MENOKEN Universitas Cenderawasih?',
      a: 'MENOKEN (Manajemen Ekosistem & Networking Kewirausahaan) adalah platform digital terpadu binaan UPA Kewirausahaan UNCEN yang mengintegrasikan pendaftaran proposal wirausaha, pembinaan mentor, sertifikasi legalitas (NIB & Halal), pencatatan transaksi POS, hingga akses lelang B2B dan konversi MBKM 20 SKS.'
    },
    {
      q: 'Bagaimana cara mahasiswa mendaftar dan mengikuti program inkubasi?',
      a: 'Mahasiswa aktif UNCEN dari 8 fakultas dapat mendaftar dengan membuat akun wirausaha, mengisi profil kelompok usaha, memilih sektor bisnis (Jasa Kreatif atau Agromaritim), dan mengunggah ringkasan rencana usaha untuk dikurasi oleh tim reviewer.'
    },
    {
      q: 'Bagaimana cara login akun demo dummy?',
      a: 'Anda dapat langsung mengklik salah satu dari 6 tombol peran instan (student, mentor, admin, superadmin, leader, reviewer) pada bilah demo di hero landing page atau modal login tanpa perlu mengetik kata sandi manual (kata sandi default: Password123).'
    },
    {
      q: 'Bagaimana mitra eksternal atau BUMN dapat memesan produk atau bermitra?',
      a: 'Mitra industri, korporasi, perbankan, dan investor dapat menelusuri etalase publik MENOKEN Market, mengajukan kemitraan B2B, serta mengikuti lelang komoditas unggulan mahasiswa dengan legalitas resmi yang telah terverifikasi.'
    }
  ];

  return (
    <div className={`relative min-h-screen transition-colors duration-300 font-sans ${
      isDark ? 'bg-[#02180e] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Living Ecological Particle Animation Ala SAKRAL FEB UNCEN (Dark Mode Only) */}
      {isDark && <SakralEcoBackground />}

      {/* ========================================================= */}
      {/* 1. HERO SECTION (TOBA-QUEST SPACIOUS + ENLARGED SLIDE)    */}
      {/* ========================================================= */}
      <section id="hero" className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
            
            {/* Left Column: Hero Texts & Toba-Quest CTA Buttons */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              
              {/* Pill Chip (Toba-Quest Style) */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 mb-6 backdrop-blur-md shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Ekosistem Digital • UPA Kewirausahaan UNCEN Papua</span>
              </div>

              {/* 3-Color Layered Headline (Toba-Quest Exact Typography) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
                <span className={`block ${isDark ? 'text-white' : 'text-slate-950'}`}>Rintis Usaha.</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  Inkubasi Mandiri.
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">
                  Tembus Pasar.
                </span>
              </h1>

              {/* Subtitle */}
              <p className={`text-base sm:text-lg max-w-xl leading-relaxed mb-8 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Wadah digital inkubasi & akselerasi wirausaha mahasiswa 8 Fakultas Universitas Cenderawasih — terinspirasi filosofi Noken Papua untuk merajut sinergi dari Kopi Wamena hingga ekonomi kreatif modern.
              </p>

              {/* Dual Action Buttons (Compact, Side-by-Side 1-Baris Saja) */}
              <div className="flex flex-nowrap items-center gap-2.5 sm:gap-3.5 w-full mb-8">
                {/* Primary Button: MULAI WIRAUSAHA (1-Baris Kompak) */}
                <button
                  onClick={() => { setAuthTab('login'); setShowAuthModal(true); }}
                  className="px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-extrabold text-xs sm:text-sm hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer select-none whitespace-nowrap shrink-0"
                >
                  <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950 shrink-0" />
                  <span className="whitespace-nowrap font-extrabold tracking-wide">MULAI WIRAUSAHA</span>
                </button>

                {/* Secondary Button: PELAJARI CARA KERJA (1-Baris Kompak) */}
                <a
                  href="#how-it-works"
                  className={`px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-extrabold text-xs sm:text-sm border transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer select-none text-center whitespace-nowrap shrink-0 ${
                    isDark 
                      ? 'bg-slate-800/80 hover:bg-slate-700 text-white border-white/20 hover:border-white/40' 
                      : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300 hover:border-slate-400 shadow-xs'
                  }`}
                >
                  <span className="whitespace-nowrap font-extrabold tracking-wide">PELAJARI CARA KERJA</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                </a>
              </div>

              {/* 1-Click Instant Demo Login Bar */}
              <div className={`w-full pt-4 border-t flex flex-col gap-2 ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                <span className={`text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Akses Demo Cepat 1-Klik (Default Sandi: Password123)</span>
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {DUMMY_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.role}
                      onClick={() => {
                        loginAsDummy(acc.key);
                        const targetTab = acc.defaultTab || 'admin_dashboard';
                        setActiveTab(targetTab);
                      }}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isDark 
                          ? 'bg-slate-900/90 border-slate-700/80 text-slate-200 hover:border-cyan-400 hover:text-cyan-300 hover:scale-105' 
                          : 'bg-white border-slate-300 text-slate-800 hover:border-cyan-500 hover:text-cyan-600 hover:scale-105 shadow-xs'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>{acc.role}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: ENLARGED SLIDE & PERFECTLY SYMMETRICAL FLANKING MASCOTS */}
            <div className="lg:col-span-7 relative flex items-center justify-center pt-2 lg:pt-14">
              
              {/* Flanking Mascots & Slide Symmetrical Stage (Both Mascots Grounded Symmetrically With Slide) */}
              <div className="relative w-full flex items-end justify-center">
                
                {/* LEFT MASCOT: Mahasiswa Preneur (Symmetrical Position & Compact Scale) */}
                <div className="flex flex-col items-center justify-end z-20 shrink-0 select-none -mr-10 sm:-mr-12 md:-mr-16 lg:-mr-20 xl:-mr-24 animate-mascot-left">
                  {/* Symmetrical Top Badge */}
                  <div className="mb-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px] sm:text-[10.5px] tracking-wide shadow-lg border border-emerald-300 flex items-center gap-1.5 whitespace-nowrap">
                    <span>✌️</span>
                    <span>Mahasiswa Preneur</span>
                  </div>
                  <div className="relative flex flex-col items-center">
                    <img
                      src="/maskot_mahasiswa_3d.png"
                      alt="Maskot Mahasiswa Preneur Papua"
                      className="h-40 sm:h-48 md:h-54 lg:h-[240px] xl:h-[260px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] pointer-events-none"
                    />
                    <div className="w-16 sm:w-20 h-2 bg-black/50 rounded-full blur-sm mx-auto -mt-1 animate-mascot-shadow-left" />
                  </div>
                </div>

                {/* CENTER: 3D Slide Carousel (Landscape Widescreen Frame) */}
                <div className="flex-1 w-full max-w-[500px] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[660px] xl:max-w-[700px] z-10">
                  <div className="relative w-full h-[250px] sm:h-[280px] md:h-[310px] lg:h-[330px] xl:h-[345px] overflow-hidden rounded-[24px] sm:rounded-[30px] border border-white/20 shadow-2xl bg-slate-950 group">
                    {heroSlides.map((slide, idx) => {
                      const isActive = idx === currentSlide;
                      return (
                        <div
                          key={slide.id}
                          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                            isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                          } ${slide.isMap ? 'bg-gradient-to-b from-[#071f33] to-[#041320] flex items-center justify-center p-3 sm:p-4' : ''}`}
                        >
                          <img
                            src={slide.src}
                            alt={slide.alt}
                            className={slide.isMap ? 'w-full h-full object-contain drop-shadow-xl' : 'w-full h-full object-cover'}
                            loading={idx === 0 ? 'eager' : 'lazy'}
                          />
                          {/* Rich Gradient Scrim & Caption (with generous bottom padding so text never overlaps dots) */}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-4 sm:p-5 pt-10 pb-9 flex flex-col justify-end">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-[10px] sm:text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md border ${slide.badgeColor}`}>
                                {slide.badge}
                              </span>
                              <span className="text-[10.5px] sm:text-xs font-mono text-cyan-300 font-bold">{slide.tag}</span>
                            </div>
                            <h4 className="text-white font-black text-sm sm:text-base md:text-lg line-clamp-1 drop-shadow-md">{slide.title}</h4>
                          </div>
                        </div>
                      );
                    })}

                    {/* Carousel Nav Arrows */}
                    <button
                      onClick={handlePrevSlide}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/80 text-white/90 hover:text-white hover:bg-slate-900 border border-white/20 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg"
                      title="Slide sebelumnya"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/80 text-white/90 hover:text-white hover:bg-slate-900 border border-white/20 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg"
                      title="Slide berikutnya"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dot Indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/15">
                      {heroSlides.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentSlide(dotIdx)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            dotIdx === currentSlide ? 'w-6 bg-cyan-400' : 'w-2 bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT MASCOT: Mentor & Pembimbing (Symmetrical Position & Compact Scale) */}
                <div className="flex flex-col items-center justify-end z-20 shrink-0 select-none -ml-10 sm:-ml-12 md:-ml-16 lg:-ml-20 xl:-ml-24 animate-mascot-right">
                  {/* Symmetrical Top Badge */}
                  <div className="mb-1.5 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] sm:text-[10.5px] tracking-wide shadow-lg border border-amber-300 flex items-center gap-1.5 whitespace-nowrap">
                    <span>⭐</span>
                    <span>Mentor & Inkubasi</span>
                  </div>
                  <div className="relative flex flex-col items-center">
                    <img
                      src="/maskot_mentor_3d.png"
                      alt="Maskot Pendamping & Mentor"
                      className="h-40 sm:h-48 md:h-54 lg:h-[240px] xl:h-[260px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] pointer-events-none"
                    />
                    <div className="w-16 sm:w-20 h-2 bg-black/50 rounded-full blur-sm mx-auto -mt-1 animate-mascot-shadow-right" />
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 2. THREE CORE PILLARS (TOBA-QUEST: EXPLORE, COMMUNICATE, SHARE) */}
      {/* ========================================================= */}
      <section id="pillars" className={`py-14 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#02180e]/75 backdrop-blur-xs border-emerald-900/30' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: JELAJAHI (EXPLORE) */}
            <div className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
              isDark 
                ? 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/50 shadow-lg' 
                : 'bg-slate-50 border-slate-200 hover:border-cyan-500/50 shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                JELAJAHI
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Telusuri potensi komoditas 8 fakultas UNCEN. Temukan produk unggulan dari Kopi Wamena, kriya Noken, sagu Sentani, hingga hasil laut pesisir.
              </p>
            </div>

            {/* Card 2: INKUBASI (COMMUNICATE & MENTOR) */}
            <div className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
              isDark 
                ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/50 shadow-lg' 
                : 'bg-slate-50 border-slate-200 hover:border-emerald-500/50 shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <MessageSquare className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                INKUBASI
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Pendampingan intensif dari dosen pembimbing dan mentor praktisi. Kurasi proposal usaha, fasilitasi NIB resmi, dan sertifikasi halal standar.
              </p>
            </div>

            {/* Card 3: AKSELERASI (SHARE & SCALE) */}
            <div className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
              isDark 
                ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/50 shadow-lg' 
                : 'bg-slate-50 border-slate-200 hover:border-amber-500/50 shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <TrendingUp className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                AKSELERASI
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Akses bursa lelang komoditas B2B untuk bermitra dengan BUMN/swasta, transaksi kasir POS terpadu, dan pengakuan konversi 20 SKS MBKM.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 3. WHY MENOKEN BANNER (TOBA-QUEST: WHY SECTION)           */}
      {/* ========================================================= */}
      <section id="why" className="py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`p-8 sm:p-12 rounded-3xl border relative overflow-hidden text-center ${
            isDark 
              ? 'bg-gradient-to-b from-[#032817]/85 to-[#02180e]/90 border-emerald-800/40 shadow-2xl backdrop-blur-xs' 
              : 'bg-gradient-to-b from-emerald-50 to-teal-50/70 border-emerald-200/80 shadow-xl'
          }`}>
            {/* Left Accent: Abstract Modern Papuan Ethnic Motif Strip */}
            <img
              src="/papua_ethnic_totem_strip.png"
              alt="Ornamen Kearifan Papua"
              className="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 h-44 sm:h-56 w-auto object-contain opacity-25 pointer-events-none select-none"
            />

            {/* Right Accent: Papuan Dancers Silhouette Watermark */}
            <img
              src="/papua_dancers_silhouette.png"
              alt="Siluet Generasi Muda Penari Papua"
              className="absolute -right-6 -bottom-6 sm:bottom-0 sm:right-2 h-36 sm:h-48 w-auto object-contain opacity-20 pointer-events-none select-none"
            />
            <div className="inline-block px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30 text-xs font-black tracking-widest uppercase mb-4">
              MENGAPA PLATFORM MENOKEN?
            </div>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight max-w-2xl mx-auto leading-snug mb-6 ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              Mendobrak cara konvensional pembinaan wirausaha kampus yang terpisah-pisah.
            </h2>
            <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Platform MENOKEN hadir sebagai wadah tunggal terpadu yang menghubungkan mahasiswa, dosen pembimbing, mentor praktisi, dan pembeli B2B dalam satu siklus inkubasi berkelanjutan berbasis filosofi rajutan Noken Papua.
            </p>
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 4. HOW IT WORKS (TOBA-QUEST: 4 STEPPER CARDS)             */}
      {/* ========================================================= */}
      <section id="how-it-works" className={`py-16 md:py-20 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#02180e]/75 backdrop-blur-xs border-emerald-900/30' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black tracking-widest uppercase text-amber-400 mb-2 block">
              ALUR PERJALANAN WIRAUSAHA
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Bagaimana MENOKEN Bekerja
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className={`p-6 rounded-3xl border text-center transition-all duration-300 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-amber-400/20">
                1
              </div>
              <h3 className={`text-lg font-black uppercase mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>AJUKAN</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Mahasiswa mendaftarkan profil usaha digital, memilih sektor bisnis, dan mengunggah proposal usaha kelompok.
              </p>
            </div>

            {/* Step 2 */}
            <div className={`p-6 rounded-3xl border text-center transition-all duration-300 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-amber-400/20">
                2
              </div>
              <h3 className={`text-lg font-black uppercase mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>DAMPINGI</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Dipertemukan dengan mentor praktisi dan dosen untuk penyempurnaan produk, kurasi legalitas NIB, dan izin edar.
              </p>
            </div>

            {/* Step 3 */}
            <div className={`p-6 rounded-3xl border text-center transition-all duration-300 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-amber-400/20">
                3
              </div>
              <h3 className={`text-lg font-black uppercase mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>TRANSAKSI</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Pencatatan omzet harian transparan dengan kasir digital POS, timbangan sentral, dan QRIS standee terverifikasi.
              </p>
            </div>

            {/* Step 4 */}
            <div className={`p-6 rounded-3xl border text-center transition-all duration-300 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-amber-400/20">
                4
              </div>
              <h3 className={`text-lg font-black uppercase mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>SKALA & MBKM</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Buka akses lelang komoditas B2B ke mitra BUMN, sertifikat pencapaian, dan konversi penuh ke 20 SKS mata kuliah.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 5. COMMODITIES & SECTORS (TOBA-QUEST: MORE WORLDS ARE COMING) */}
      {/* ========================================================= */}
      <section id="commodities" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black tracking-widest uppercase text-amber-400 mb-2 block">
              POTENSI 8 FAKULTAS UNCEN
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Sektor & Komoditas Unggulan Papua
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            
            {/* Sector 1: Kopi Wamena */}
            <div className={`p-5 rounded-3xl border text-center transition-all hover:scale-105 cursor-pointer ${
              isDark ? 'bg-slate-900/70 border-slate-800 hover:border-amber-400/50' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="text-3xl mb-3">☕</div>
              <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>Kopi Wamena</h4>
              <p className="text-[11px] text-slate-400">Arabika & Robusta Pegunungan Tengah</p>
            </div>

            {/* Sector 2: Noken Papua */}
            <div className={`p-5 rounded-3xl border text-center transition-all hover:scale-105 cursor-pointer ${
              isDark ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-400/50' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="text-3xl mb-3">🎒</div>
              <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>Noken Tradisional</h4>
              <p className="text-[11px] text-slate-400">Anyaman Serat Kayu Warisan UNESCO</p>
            </div>

            {/* Sector 3: Hasil Laut */}
            <div className={`p-5 rounded-3xl border text-center transition-all hover:scale-105 cursor-pointer ${
              isDark ? 'bg-slate-900/70 border-slate-800 hover:border-cyan-400/50' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="text-3xl mb-3">🐟</div>
              <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>Agromaritim Laut</h4>
              <p className="text-[11px] text-slate-400">Tangkapan Segar Teluk Youtefa</p>
            </div>

            {/* Sector 4: Sagu Sentani */}
            <div className={`p-5 rounded-3xl border text-center transition-all hover:scale-105 cursor-pointer ${
              isDark ? 'bg-slate-900/70 border-slate-800 hover:border-teal-400/50' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="text-3xl mb-3">🌴</div>
              <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>Sagu & Pangan</h4>
              <p className="text-[11px] text-slate-400">Olahan Sagu & Ketahanan Pangan</p>
            </div>

            {/* Sector 5: Jasa Kreatif */}
            <div className={`p-5 rounded-3xl border text-center transition-all hover:scale-105 cursor-pointer ${
              isDark ? 'bg-slate-900/70 border-slate-800 hover:border-purple-400/50' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="text-3xl mb-3">✂️</div>
              <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>Jasa & Kreatif</h4>
              <p className="text-[11px] text-slate-400">Barbershop, Salon & Kriya Digital</p>
            </div>

          </div>

          {/* Bottom Big CTA Button (Toba-Quest Style) */}
          <div className="text-center mt-12">
            <button
              onClick={() => { setAuthTab('login'); setShowAuthModal(true); }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-lg hover:scale-105 transition-transform shadow-lg shadow-yellow-500/30 inline-flex items-center gap-2 cursor-pointer select-none"
            >
              <Rocket className="w-5 h-5 text-slate-950" />
              <span>GABUNG EKOSISTEM WIRAUSAHA SEKARANG</span>
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 6. FAQ SECTION                                            */}
      {/* ========================================================= */}
      <section id="faq" className={`py-16 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#02180e]/75 backdrop-blur-xs border-emerald-900/30' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-xs font-black tracking-widest uppercase text-cyan-400 mb-2 block">
              PUSAT BANTUAN
            </span>
            <h2 className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border transition-colors ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className={`w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer ${
                    isDark ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                  }`} />
                </button>
                {openFaq === idx && (
                  <div className={`px-6 pb-4 pt-1 text-sm leading-relaxed border-t ${
                    isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-600'
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
      {/* 7. SINGLE-LINE OFFICIAL FOOTER                            */}
      {/* ========================================================= */}
      <footer className={`border-t py-5 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-[#02180e]/95 border-emerald-900/40 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-2.5 text-[10.5px] sm:text-[11px] lg:text-[11.5px]">
          <div className="flex items-center gap-2 whitespace-nowrap text-center lg:text-left">
            <img src="/noken_pixar_3d.png" alt="MENOKEN" className="w-4 h-4 object-contain shrink-0" />
            <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              © 2026 MENOKEN • Manajemen Ekosistem & Networking Kewirausahaan • UPA Uncen Platform. All rights reserved.
            </span>
          </div>
          <div className="flex items-center justify-center lg:justify-end gap-1.5 whitespace-nowrap text-[10px] sm:text-[10.5px] lg:text-[11px] text-center">
            <span>by</span>
            <a
              href="https://www.instagram.com/kurniawan_patma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-amber-500 hover:text-amber-400 underline underline-offset-2 transition"
            >
              Kurnia Patma
            </a>
            <span className="opacity-50">|</span>
            <span>UI/UX by</span>
            <a
              href="https://www.linkedin.com/in/papedatimur"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-cyan-500 hover:text-cyan-400 underline underline-offset-2 transition"
            >
              Enterdie
            </a>
            <span className="opacity-50">•</span>
            <span className="opacity-80">Hak Cipta Dilindungi Undang-Undang</span>
          </div>
        </div>
      </footer>




      {/* ========================================================= */}
      {/* 9. AUTH MODAL (LOGIN & REGISTRATION)                      */}
      {/* ========================================================= */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className={`relative w-full max-w-md rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all ${
            isDark ? 'bg-[#0b1424] border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Close Button */}
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3">
                <img src="/noken_pixar_3d.png" alt="MENOKEN" className="w-8 h-8 object-contain" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">
                {authTab === 'login' ? 'Selamat Datang' : 'Daftar Wirausaha'}
              </h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {authTab === 'login' 
                  ? 'Masuk untuk melanjutkan operasional bisnis harian Anda' 
                  : 'Mulai rintis usaha mahasiswa bersama UPA Kewirausahaan UNCEN'}
              </p>
            </div>

            {/* Switch Tabs */}
            <div className={`flex rounded-xl p-1 mb-5 border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              <button
                onClick={() => setAuthTab('login')}
                className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                  authTab === 'login' ? 'bg-cyan-500 text-slate-950 shadow-md' : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Masuk
              </button>
              <button
                onClick={() => setAuthTab('register')}
                className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                  authTab === 'register' ? 'bg-cyan-500 text-slate-950 shadow-md' : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Daftar Baru
              </button>
            </div>

            {authTab === 'login' ? (
              <div>
                {/* 1-Click Dummy Roles in Modal */}
                <div className="mb-5">
                  <span className={`text-[11px] font-bold block mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Akses Instan 1-Klik Peran Demo:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {DUMMY_ACCOUNTS.map((acc) => (
                      <button
                        key={acc.role}
                        onClick={() => {
                          loginAsDummy(acc.key);
                          setShowAuthModal(false);
                          const targetTab = acc.defaultTab || 'admin_dashboard';
                          setActiveTab(targetTab);
                        }}
                        className={`p-2 rounded-xl border text-xs font-bold transition text-center cursor-pointer ${
                          isDark 
                            ? 'bg-slate-900 border-slate-800 hover:border-cyan-400 hover:text-cyan-300 text-slate-300' 
                            : 'bg-slate-50 border-slate-200 hover:border-cyan-500 hover:text-cyan-600 text-slate-700 shadow-xs'
                        }`}
                      >
                        {acc.role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative flex py-2 items-center mb-4">
                  <div className={`flex-grow border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}></div>
                  <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase font-mono">atau akun manual</span>
                  <div className={`flex-grow border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}></div>
                </div>

                {loginError && (
                  <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Username / Email</label>
                    <input
                      type="text"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="admin, student, mentor..."
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-cyan-400 ${
                        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Kata Sandi (default: Password123)
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Password123"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-cyan-400 ${
                        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-extrabold text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-cyan-500/30 cursor-pointer mt-2"
                  >
                    {isSubmitting ? 'Memproses...' : 'Masuk ke Ruang Kerja →'}
                  </button>
                </form>
              </div>
            ) : (
              <div>
                {regSuccess ? (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <h4 className="font-bold text-white text-base">Pendaftaran Berhasil!</h4>
                    <p className="text-xs text-slate-300 mt-1">Mengalihkan ke dasbor wirausaha...</p>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-3">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Nama Lengkap Ketua</label>
                      <input
                        type="text"
                        required
                        value={regData.owner_name}
                        onChange={(e) => setRegData({ ...regData, owner_name: e.target.value })}
                        placeholder="cth: Elleser Tabuni"
                        className={`w-full px-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-cyan-400 ${
                          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Nama Usaha</label>
                      <input
                        type="text"
                        required
                        value={regData.business_name}
                        onChange={(e) => setRegData({ ...regData, business_name: e.target.value })}
                        placeholder="cth: Wamena Highland Roast"
                        className={`w-full px-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-cyan-400 ${
                          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Fakultas</label>
                      <select
                        value={regData.location}
                        onChange={(e) => setRegData({ ...regData, location: e.target.value })}
                        className={`w-full px-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-cyan-400 ${
                          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
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
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Email Kampus</label>
                      <input
                        type="email"
                        required
                        value={regData.email}
                        onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                        placeholder="mahasiswa@uncen.ac.id"
                        className={`w-full px-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-cyan-400 ${
                          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Kata Sandi</label>
                      <input
                        type="password"
                        required
                        value={regData.password}
                        onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                        placeholder="Minimal 6 karakter"
                        className={`w-full px-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-cyan-400 ${
                          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-extrabold text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-emerald-500/30 cursor-pointer mt-3"
                    >
                      {isSubmitting ? 'Mendaftarkan...' : 'Buat Akun Wirausaha →'}
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
