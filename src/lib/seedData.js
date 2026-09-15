// Master Data and Authentic Seed Data for MENOKEN - Universitas Cenderawasih

export const INITIAL_MASTER_DATA = {
  faculties: [
    {
      id: "feb",
      name: "Fakultas Ekonomi dan Bisnis",
      short: "FEB",
      programs: [
        "S1 Manajemen",
        "S1 Akuntansi",
        "S1 Ekonomi Pembangunan",
        "D3 Akuntansi",
        "D3 Keuangan & Perbankan",
        "S2 Magister Manajemen (MM)",
        "S2 Magister Ilmu Ekonomi (MIE)",
        "S2 Magister Keuangan Daerah",
        "S3 Doktor Ilmu Manajemen"
      ]
    },
    {
      id: "fkip",
      name: "Fakultas Keguruan dan Ilmu Pendidikan",
      short: "FKIP",
      programs: [
        "S1 Pendidikan Bahasa Inggris",
        "S1 Pendidikan Bahasa dan Sastra Indonesia",
        "S1 Pendidikan Biologi",
        "S1 Pendidikan Matematika",
        "S1 Pendidikan Fisika",
        "S1 Pendidikan Kimia",
        "S1 Pendidikan Guru Sekolah Dasar (PGSD)",
        "S1 Pendidikan Guru PAUD (PGPAUD)",
        "S1 Pendidikan Jasmani, Kesehatan dan Rekreasi (PJKR)",
        "S1 Pendidikan Geografi",
        "S1 Pendidikan Sejarah",
        "S1 Pendidikan Pancasila dan Kewarganegaraan (PPKn)",
        "S1 Bimbingan dan Konseling",
        "S2 Pendidikan IPS",
        "S2 Pendidikan Bahasa Inggris",
        "S2 Manajemen Pendidikan"
      ]
    },
    {
      id: "fmipa",
      name: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
      short: "FMIPA",
      programs: [
        "S1 Matematika",
        "S1 Fisika",
        "S1 Kimia",
        "S1 Biologi",
        "S1 Farmasi",
        "S1 Sistem Informasi",
        "S1 Ilmu Kelautan",
        "S1 Statistika",
        "S1 Geofisika",
        "D3 Farmasi",
        "S2 Magister Biologi"
      ]
    },
    {
      id: "fisip",
      name: "Fakultas Ilmu Sosial dan Ilmu Politik",
      short: "FISIP",
      programs: [
        "S1 Ilmu Administrasi Publik",
        "S1 Ilmu Administrasi Bisnis",
        "S1 Ilmu Pemerintahan",
        "S1 Ilmu Komunikasi",
        "S1 Sosiologi",
        "S1 Hubungan Internasional",
        "S1 Antropologi Sosial",
        "S1 Ilmu Kesejahteraan Sosial",
        "S2 Magister Ilmu Administrasi Publik",
        "S2 Magister Sosiologi",
        "S3 Doktor Ilmu Sosial"
      ]
    },
    {
      id: "ft",
      name: "Fakultas Teknik",
      short: "FT",
      programs: [
        "S1 Teknik Sipil",
        "S1 Teknik Mesin",
        "S1 Teknik Elektro",
        "S1 Teknik Pertambangan",
        "S1 Teknik Informatika",
        "S1 Perencanaan Wilayah dan Kota (PWK)",
        "S1 Teknik Lingkungan",
        "D3 Teknik Sipil",
        "D3 Teknik Mesin",
        "D3 Teknik Elektro",
        "S2 Magister Teknik Sipil"
      ]
    },
    {
      id: "fh",
      name: "Fakultas Hukum",
      short: "FH",
      programs: [
        "S1 Ilmu Hukum",
        "S2 Magister Ilmu Hukum",
        "S3 Doktor Ilmu Hukum"
      ]
    },
    {
      id: "fk",
      name: "Fakultas Kedokteran",
      short: "FK",
      programs: [
        "S1 Pendidikan Dokter",
        "Profesi Dokter",
        "S1 Ilmu Keperawatan",
        "Profesi Ners",
        "S1 Farmasi Klinis"
      ]
    },
    {
      id: "fkm",
      name: "Fakultas Kesehatan Masyarakat",
      short: "FKM",
      programs: [
        "S1 Ilmu Kesehatan Masyarakat",
        "S1 Ilmu Gizi",
        "S2 Magister Kesehatan Masyarakat"
      ]
    },
    {
      id: "pps",
      name: "Program Pascasarjana",
      short: "PPs",
      programs: [
        "S2 Magister Ilmu Lingkungan",
        "S3 Doktor Ilmu Lingkungan"
      ]
    }
  ],
  categories: [
    { id: "kuliner", name: "Kuliner & Olahan Pangan Lokal", icon: "Utensils", color: "bg-amber-100 text-amber-800" },
    { id: "kerajinan", name: "Kriya & Kerajinan Noken", icon: "Palette", color: "bg-emerald-100 text-emerald-800" },
    { id: "agribisnis", name: "Agribisnis & Pertanian Organik", icon: "Leaf", color: "bg-green-100 text-green-800" },
    { id: "fashion", name: "Fashion & Tekstil Etnik Papua", icon: "Shirt", color: "bg-purple-100 text-purple-800" },
    { id: "teknologi", name: "Teknologi & Digital Kreatif", icon: "Cpu", color: "bg-blue-100 text-blue-800" },
    { id: "jasa", name: "Jasa & Pariwisata Berkelanjutan", icon: "Compass", color: "bg-cyan-100 text-cyan-800" }
  ],
  scoringCriteria: [
    { id: "inovasi", name: "Inovasi & Kebaruan Solusi", weight: 20, description: "Tingkat keunikan ide, nilai tambah, dan diferensiasi pasar." },
    { id: "pasar", name: "Potensi Pasar & Kelayakan Bisnis", weight: 20, description: "Ukuran target pasar, model bisnis, dan proyeksi permintaan." },
    { id: "finansial", name: "Kelayakan Finansial & Efisiensi Biaya", weight: 20, description: "Kewajaran Rencana Anggaran Biaya (RAB) dan potensi margin laba." },
    { id: "tim", name: "Kesiapan Tim & Kapabilitas Eksekusi", weight: 20, description: "Komposisi keahlian tim, komitmen, dan rencana pembagian peran." },
    { id: "dampak", name: "Dampak Sosial & Pemanfaatan Sumber Daya Papua", weight: 20, description: "Serapan bahan baku lokal, penciptaan lapangan kerja, dan keberlanjutan." }
  ],
  growthStages: [
    { stage: "Ide", min: 0, max: 20, color: "text-slate-600 bg-slate-100", label: "Validasi Ide & Konsep" },
    { stage: "Tahap Awal", min: 21, max: 40, color: "text-blue-700 bg-blue-100", label: "Prototipe & Uji Pasar" },
    { stage: "Berkembang", min: 41, max: 60, color: "text-amber-700 bg-amber-100", label: "Penjualan Rutin & NIB" },
    { stage: "Mapan", min: 61, max: 80, color: "text-teal-700 bg-teal-100", label: "Profitabel & Bermitra" },
    { stage: "Scale-Up", min: 81, max: 100, color: "text-emerald-700 bg-emerald-100", label: "Ekspansi Nasional/Ekspor" }
  ]
};

export const INITIAL_PROGRAMS = [
  {
    id: "prog-2026",
    title: "Program Wirausaha Mahasiswa Uncen (PWMU) 2026",
    year: 2026,
    budget: 1500000000,
    status: "active",
    currentStage: "Mentoring & Pendampingan",
    stages: [
      { name: "Pendaftaran & Proposal", status: "completed", date: "Januari - Februari 2026" },
      { name: "Seleksi & Penilaian", status: "completed", date: "Maret 2026" },
      { name: "Pelatihan Wirausaha", status: "completed", date: "April 2026" },
      { name: "Pencairan Dana Tahap I", status: "completed", date: "Mei 2026" },
      { name: "Mentoring & Legalitas", status: "active", date: "Juni - Agustus 2026" },
      { name: "Demo Day Kampus", status: "upcoming", date: "Oktober 2026" },
      { name: "Festival Kewirausahaan Papua", status: "upcoming", date: "Desember 2026" }
    ],
    targetQuota: 120,
    enrolledGroups: 114,
    passedProposals: 85
  },
  {
    id: "prog-2025",
    title: "Program Akselerasi Startup Mahasiswa Uncen 2025",
    year: 2025,
    budget: 1200000000,
    status: "completed",
    currentStage: "Selesai",
    stages: [],
    targetQuota: 100,
    enrolledGroups: 98,
    passedProposals: 72
  }
];

export const INITIAL_GROUPS = [
  {
    id: "grp-wamena-kopi",
    name: "Kopi Arabika Tiom Jaya",
    brand: "Wamena Highland Roast",
    facultyId: "feb",
    facultyName: "Fakultas Ekonomi dan Bisnis",
    studyProgram: "Manajemen",
    yearJoined: 2025,
    foundedYear: 2024,
    leader: {
      name: "Elieser Tabuni",
      nim: "20230104012",
      phone: "+6281248901122",
      email: "elieser.tabuni@student.uncen.ac.id"
    },
    members: [
      { name: "Elieser Tabuni", nim: "20230104012", role: "Ketua (CEO)", faculty: "FEB", prodi: "Manajemen" },
      { name: "Maria Kogoya", nim: "20230104045", role: "Keuangan & Operasional", faculty: "FEB", prodi: "Akuntansi" },
      { name: "Yohanes Wenda", nim: "20220302018", role: "Quality Control & Roaster", faculty: "FMIPA", prodi: "Kimia" }
    ],
    categoryId: "kuliner",
    categoryName: "Kuliner & Olahan Pangan Lokal",
    location: "Abepura, Kota Jayapura & Tiom, Lanny Jaya",
    description: "Kopi Arabika organik single-origin yang dipetik langsung dari kebun rakyat di Lembah Baliem dan Tiom dengan ketinggian 1.800–2.200 mdpl. Diproses secara natural dan honey process dengan aroma buah eksotis khas Papua.",
    businessStage: "Berkembang",
    growthScore: 78,
    socials: {
      instagram: "@wamenahighland.coffee",
      whatsapp: "6281248901122",
      shopee: "https://shopee.co.id/wamenahighland",
      tokopedia: "https://tokopedia.com/wamenahighland",
      website: "https://wamenahighland.id"
    },
    legalities: [
      { type: "NIB", number: "1903240012891", status: "verified", issuedDate: "2025-03-15", verifiedBy: "Admin UPA" },
      { type: "PIRT", number: "P-IRT 5109171010321-29", status: "verified", issuedDate: "2025-05-20", verifiedBy: "Admin UPA" },
      { type: "Sertifikat Halal", number: "ID91110001892010625", status: "verified", issuedDate: "2025-07-10", verifiedBy: "Admin UPA" },
      { type: "Hak Merek (HAKI)", number: "D222025019821", status: "process", issuedDate: "-", verifiedBy: "-" }
    ],
    funding: {
      received: 25000000,
      source: "Bantuan PWMU Kemendikbudristek & Rektorat Uncen",
      disbursedDate: "2025-06-01",
      realizationPercentage: 92,
      rabStatus: "Laporan Lengkap & Terverifikasi"
    },
    growthMetrics: {
      avgMonthlyRevenue: 14500000,
      totalSoldUnits: 1420,
      localEmployees: 4,
      localSourcingPercent: 95,
      carbonReductionKg: 350
    },
    monthlyRevenues: [
      { month: "Jan 2026", gross: 11200000, expense: 6200000, net: 5000000, units: 140 },
      { month: "Feb 2026", gross: 12800000, expense: 6800000, net: 6000000, units: 160 },
      { month: "Mar 2026", gross: 14500000, expense: 7100000, net: 7400000, units: 185 },
      { month: "Apr 2026", gross: 16000000, expense: 7800000, net: 8200000, units: 200 }
    ],
    storyOfImpact: {
      before: "Sebelum mengikuti program MENOKEN, kelompok hanya menjual biji kopi mentah ke tengkulak dengan harga rendah tanpa kemasan dan tanpa izin usaha.",
      intervention: "Mengikuti pelatihan packaging & barista roasting MENOKEN, menerima dana stimulan Rp25 juta, serta pendampingan pembuatan NIB dan Sertifikasi Halal.",
      after: "Kini memiliki kemasan aluminium foil premium bervalve, izin NIB & PIRT lengkap, menyuplai 6 coffee shop di Jayapura dan penjualan via Shopee.",
      impact: "Meningkatkan pendapatan 8 petani mitra di Lanny Jaya hingga 45% dan mempekerjakan 2 rekan mahasiswa sebagai tim roasting dan packaging."
    }
  },
  {
    id: "grp-noken-modern",
    name: "Noken Mahkota Anyaman",
    brand: "NokenCraft Papua",
    facultyId: "fkip",
    facultyName: "Fakultas Keguruan dan Ilmu Pendidikan",
    studyProgram: "Pendidikan Guru Sekolah Dasar",
    yearJoined: 2025,
    foundedYear: 2024,
    leader: {
      name: "Dorkas Pakage",
      nim: "20220201034",
      phone: "+6282199883441",
      email: "dorkas.pakage@student.uncen.ac.id"
    },
    members: [
      { name: "Dorkas Pakage", nim: "20220201034", role: "Ketua (Desainer)", faculty: "FKIP", prodi: "PGSD" },
      { name: "Ruth Kayame", nim: "20220201012", role: "Produksi & Hubungan Pengrajin", faculty: "FKIP", prodi: "Pendidikan Biologi" },
      { name: "Yulius Mote", nim: "20230501009", role: "Pemasaran Digital", faculty: "FT", prodi: "Teknik Informatika" }
    ],
    categoryId: "kerajinan",
    categoryName: "Kriya & Kerajinan Noken",
    location: "Waena, Heram, Kota Jayapura",
    description: "Inovasi tas Noken warisan budaya takbenda UNESCO yang dibuat dari serat kulit kayu mahkota dan anggrek liar Papua dengan sentuhan desain kontemporer, tali ergonomis, dan kompartemen laptop.",
    businessStage: "Berkembang",
    growthScore: 82,
    socials: {
      instagram: "@nokencraft.papua",
      whatsapp: "6282199883441",
      shopee: "https://shopee.co.id/nokencraft",
      tiktok: "https://tiktok.com/@nokencraft"
    },
    legalities: [
      { type: "NIB", number: "2404240058190", status: "verified", issuedDate: "2025-04-10", verifiedBy: "Admin UPA" },
      { type: "Perseroan Perorangan", number: "AHU-0019281.AH.01.30.Tahun 2025", status: "verified", issuedDate: "2025-06-18", verifiedBy: "Admin UPA" },
      { type: "Hak Cipta / HAKI", number: "EC00202519280", status: "verified", issuedDate: "2025-08-01", verifiedBy: "Admin UPA" }
    ],
    funding: {
      received: 20000000,
      source: "Dana Pembinaan Kewirausahaan Uncen",
      disbursedDate: "2025-06-10",
      realizationPercentage: 95,
      rabStatus: "Laporan Lengkap & Terverifikasi"
    },
    growthMetrics: {
      avgMonthlyRevenue: 18200000,
      totalSoldUnits: 380,
      localEmployees: 6,
      localSourcingPercent: 100,
      carbonReductionKg: 180
    },
    monthlyRevenues: [
      { month: "Jan 2026", gross: 14500000, expense: 7000000, net: 7500000, units: 30 },
      { month: "Feb 2026", gross: 17200000, expense: 7800000, net: 9400000, units: 36 },
      { month: "Mar 2026", gross: 19800000, expense: 8500000, net: 11300000, units: 42 },
      { month: "Apr 2026", gross: 21300000, expense: 9100000, net: 12200000, units: 46 }
    ],
    storyOfImpact: {
      before: "Mama-mama pengrajin noken di kampung menjual karya mereka tanpa standardisasi ukuran dan harga yang tidak menentu kepada perantara.",
      intervention: "Kelompok mahasiswa Uncen mengorganisir paguyuban pengrajin, mendesain model noken modern untuk pekerja kantor & mahasiswa, serta memasarkannya secara digital.",
      after: "Omzet melampaui Rp20 juta/bulan, rutin mengirim ke instansi pemerintah untuk cinderamata resmi dan ekshibisi nasional.",
      impact: "Memberdayakan 12 mama Papua di Distrik Sentani Timur dengan penghasilan tambahan tetap Rp1,8 juta/bulan/pengrajin."
    }
  },
  {
    id: "grp-sagu-bar",
    name: "Sagu Snack Bar Jaya",
    brand: "Sagoo Bar Papua",
    facultyId: "fmipa",
    facultyName: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    studyProgram: "Farmasi",
    yearJoined: 2026,
    foundedYear: 2025,
    leader: {
      name: "Fransina Rumkabu",
      nim: "20230303021",
      phone: "+6281355449901",
      email: "fransina.rumkabu@student.uncen.ac.id"
    },
    members: [
      { name: "Fransina Rumkabu", nim: "20230303021", role: "Ketua (R&D Produk)", faculty: "FMIPA", prodi: "Farmasi" },
      { name: "Markus Mansnembra", nim: "20230302008", role: "Teknologi Pangan", faculty: "FMIPA", prodi: "Kimia" },
      { name: "Agustina Rumbiak", nim: "20240101015", role: "Pemasaran", faculty: "FEB", prodi: "Manajemen" }
    ],
    categoryId: "kuliner",
    categoryName: "Kuliner & Olahan Pangan Lokal",
    location: "Kampwolker, Jayapura",
    description: "Snack bar sehat bebas gluten (gluten-free) berbasis tepung sagu murni Sentani yang dipadukan dengan kacang kenari Morotai dan buah merah. Tinggi serat, indeks glikemik rendah, sangat cocok untuk gaya hidup sehat dan atlet.",
    businessStage: "Startup",
    growthScore: 65,
    socials: {
      instagram: "@sagoobar.papua",
      whatsapp: "6281355449901"
    },
    legalities: [
      { type: "NIB", number: "1201260089123", status: "verified", issuedDate: "2026-02-10", verifiedBy: "Admin UPA" },
      { type: "PIRT", number: "P-IRT 5069171020114-30", status: "verified", issuedDate: "2026-03-25", verifiedBy: "Admin UPA" },
      { type: "Sertifikat Halal", number: "-", status: "under_review", issuedDate: "-", verifiedBy: "-" }
    ],
    funding: {
      received: 15000000,
      source: "Dana Hibah PWMU Uncen 2026",
      disbursedDate: "2026-04-15",
      realizationPercentage: 80,
      rabStatus: "Proses Pelaporan Tahap 1"
    },
    growthMetrics: {
      avgMonthlyRevenue: 7500000,
      totalSoldUnits: 620,
      localEmployees: 2,
      localSourcingPercent: 90,
      carbonReductionKg: 120
    },
    monthlyRevenues: [
      { month: "Jan 2026", gross: 3200000, expense: 2100000, net: 1100000, units: 160 },
      { month: "Feb 2026", gross: 4800000, expense: 2700000, net: 2100000, units: 240 },
      { month: "Mar 2026", gross: 6900000, expense: 3600000, net: 3300000, units: 345 },
      { month: "Apr 2026", gross: 8200000, expense: 4100000, net: 4100000, units: 410 }
    ],
    storyOfImpact: {
      before: "Pati sagu di Danau Sentani sering membusuk atau dijual mentah dengan nilai jual yang sangat rendah ke pasar tradisional.",
      intervention: "Melalui riset di laboratorium Farmasi FMIPA Uncen, mahasiswa mengembangkan formula snack bar renyah bernilai gizi tinggi dengan masa simpan 6 bulan.",
      after: "Kini menjadi camilan resmi seminar kampus dan tersedia di beberapa minimarket lokal Jayapura.",
      impact: "Membeli langsung 200 kg pati sagu basah setiap bulan dari petani lokal dengan harga di atas rata-rata pasar."
    }
  },
  {
    id: "grp-buah-merah",
    name: "Herbal Papua Mandiri",
    brand: "Minyak Buah Merah Murni",
    facultyId: "fk",
    facultyName: "Fakultas Kedokteran",
    studyProgram: "Pendidikan Dokter",
    yearJoined: 2025,
    foundedYear: 2024,
    leader: {
      name: "drg. Septinus Paiki (Inkubasi)",
      nim: "20220601004",
      phone: "+6281240998811",
      email: "septinus.paiki@student.uncen.ac.id"
    },
    members: [
      { name: "Septinus Paiki", nim: "20220601004", role: "Ketua (Riset Khasiat)", faculty: "FK", prodi: "Pendidikan Dokter" },
      { name: "Kezia Ohee", nim: "20230303040", role: "Formulasi", faculty: "FMIPA", prodi: "Farmasi" },
      { name: "Petrus Numberi", nim: "20230102030", role: "Logistik & Pemasaran", faculty: "FEB", prodi: "Ekonomi Pembangunan" }
    ],
    categoryId: "agribisnis",
    categoryName: "Agribisnis & Pertanian Organik",
    location: "Padang Bulan, Jayapura",
    description: "Ekstrak minyak buah merah (Pandanus conoideus) kualitas premium yang diekstraksi dengan metode dingin (cold-pressed) untuk mempertahankan kandungan tokoferol, betakaroten, dan antioksidan alami tinggi.",
    businessStage: "Mapan",
    growthScore: 88,
    socials: {
      instagram: "@buahmerah.cenderawasih",
      whatsapp: "6281240998811",
      shopee: "https://shopee.co.id/buahmerahuncen"
    },
    legalities: [
      { type: "NIB", number: "1802240091001", status: "verified", issuedDate: "2025-01-20", verifiedBy: "Admin UPA" },
      { type: "BPOM / PIRT", number: "TR 226019281", status: "verified", issuedDate: "2025-06-12", verifiedBy: "Admin UPA" },
      { type: "Sertifikat Halal", number: "ID912100009128", status: "verified", issuedDate: "2025-08-04", verifiedBy: "Admin UPA" },
      { type: "Hak Paten Sederhana", number: "S00202500129", status: "process", issuedDate: "-", verifiedBy: "-" }
    ],
    funding: {
      received: 35000000,
      source: "Program Inovasi Wirausaha Berbasis Riset Uncen",
      disbursedDate: "2025-03-20",
      realizationPercentage: 98,
      rabStatus: "Laporan Lengkap & Terverifikasi"
    },
    growthMetrics: {
      avgMonthlyRevenue: 24000000,
      totalSoldUnits: 510,
      localEmployees: 5,
      localSourcingPercent: 95,
      carbonReductionKg: 290
    },
    monthlyRevenues: [
      { month: "Jan 2026", gross: 21000000, expense: 9500000, net: 11500000, units: 105 },
      { month: "Feb 2026", gross: 23500000, expense: 10200000, net: 13300000, units: 118 },
      { month: "Mar 2026", gross: 25800000, expense: 11000000, net: 14800000, units: 130 },
      { month: "Apr 2026", gross: 27200000, expense: 11500000, net: 15700000, units: 136 }
    ],
    storyOfImpact: {
      before: "Minyak buah merah tradisional banyak dimasak dengan panas tinggi sehingga merusak vitamin dan cepat tengik.",
      intervention: "Kolaborasi laboratorium Fakultas Kedokteran dan Farmasi Uncen berhasil menemukan parameter ekstraksi dingin higienis yang tahan 12 bulan.",
      after: "Mendapatkan sertifikasi BPOM dan menjadi produk rujukan kesehatan unggulan Provinsi Papua dengan pesanan rutin dari Jakarta dan Surabaya.",
      impact: "Membangun kemitraan dengan 15 keluarga petani buah merah di Wamena dengan sistem bagi hasil yang adil."
    }
  },
  {
    id: "grp-cenderawasih-edutech",
    name: "Cenderawasih EduTech",
    brand: "Numbay Belajar",
    facultyId: "ft",
    facultyName: "Fakultas Teknik",
    studyProgram: "Teknik Informatika",
    yearJoined: 2026,
    foundedYear: 2025,
    leader: {
      name: "Barnabas Maniani",
      nim: "20220405019",
      phone: "+6285244119933",
      email: "barnabas.maniani@student.uncen.ac.id"
    },
    members: [
      { name: "Barnabas Maniani", nim: "20220405019", role: "Ketua (Fullstack Dev)", faculty: "FT", prodi: "Teknik Informatika" },
      { name: "Deborah Ireeuw", nim: "20230201011", role: "Kurikulum & Bahasa Daerah", faculty: "FKIP", prodi: "Pendidikan Bahasa Inggris" },
      { name: "Samuel Ronsumbre", nim: "20230405030", role: "UI/UX & Mobile Dev", faculty: "FT", prodi: "Teknik Informatika" }
    ],
    categoryId: "teknologi",
    categoryName: "Teknologi & Digital Kreatif",
    location: "Kampus Uncen Waena, Jayapura",
    description: "Platform web & mobile gamifikasi edukasi berbasis kurikulum lokal untuk pelestarian bahasa ibu Papua (Port Numbay, Biak, Dani) dan peningkatan literasi sains bagi siswa SD di daerah 3T Papua.",
    businessStage: "Startup",
    growthScore: 71,
    socials: {
      website: "https://numbaybelajar.id",
      whatsapp: "6285244119933",
      instagram: "@numbaybelajar"
    },
    legalities: [
      { type: "NIB", number: "1905260019280", status: "verified", issuedDate: "2026-03-01", verifiedBy: "Admin UPA" },
      { type: "Hak Cipta Program Komputer", number: "EC00202601928", status: "verified", issuedDate: "2026-04-10", verifiedBy: "Admin UPA" }
    ],
    funding: {
      received: 20000000,
      source: "Dana Inkubasi Startup Inovasi Uncen",
      disbursedDate: "2026-03-15",
      realizationPercentage: 85,
      rabStatus: "Laporan Pembelian Server & Lisensi Berjalan"
    },
    growthMetrics: {
      avgMonthlyRevenue: 5200000,
      totalSoldUnits: 180,
      localEmployees: 3,
      localSourcingPercent: 100,
      carbonReductionKg: 80
    },
    monthlyRevenues: [
      { month: "Jan 2026", gross: 2500000, expense: 1200000, net: 1300000, units: 25 },
      { month: "Feb 2026", gross: 4100000, expense: 1800000, net: 2300000, units: 45 },
      { month: "Mar 2026", gross: 5800000, expense: 2100000, net: 3700000, units: 60 },
      { month: "Apr 2026", gross: 6600000, expense: 2400000, net: 4200000, units: 70 }
    ],
    storyOfImpact: {
      before: "Kurangnya media belajar interaktif digital bertema kearifan lokal menyebabkan generasi muda Papua semakin jarang menguasai bahasa daerahnya.",
      intervention: "Tim mahasiswa Teknik Informatika dan FKIP berkolaborasi membuat modul pembelajaran berbasis web gamifikasi yang bisa dibuka offline.",
      after: "Digunakan oleh 12 sekolah mitra di Kota Jayapura dan Kabupaten Keerom dengan lebih dari 1.200 siswa aktif.",
      impact: "Mendokumentasikan lebih dari 800 kosakata dan 40 cerita rakyat Papua dalam format audio visual interaktif."
    }
  },
  {
    id: "grp-keladi-crisp",
    name: "Keladi Sentani Crispy",
    brand: "Keladiku Papua",
    facultyId: "feb",
    facultyName: "Fakultas Ekonomi dan Bisnis",
    studyProgram: "Akuntansi",
    yearJoined: 2026,
    foundedYear: 2025,
    leader: {
      name: "Sarah Suebu",
      nim: "20230102055",
      phone: "+6281344991200",
      email: "sarah.suebu@student.uncen.ac.id"
    },
    members: [
      { name: "Sarah Suebu", nim: "20230102055", role: "Ketua", faculty: "FEB", prodi: "Akuntansi" },
      { name: "Korneles Taime", nim: "20230101018", role: "Produksi", faculty: "FEB", prodi: "Manajemen" }
    ],
    categoryId: "kuliner",
    categoryName: "Kuliner & Olahan Pangan Lokal",
    location: "Sentani, Jayapura",
    description: "Keripik keladi (taro) ungu renyah tanpa pengawet dengan bumbu rempah asli Indonesia, kaya serat dan rendah kolesterol.",
    businessStage: "Tahap Awal",
    growthScore: 54,
    socials: {
      whatsapp: "6281344991200",
      instagram: "@keladiku.sentani"
    },
    legalities: [
      { type: "NIB", number: "1902260049112", status: "verified", issuedDate: "2026-02-18", verifiedBy: "Admin UPA" },
      { type: "PIRT", number: "P-IRT 2159171010041-31", status: "under_review", issuedDate: "-", verifiedBy: "-" }
    ],
    funding: {
      received: 10000000,
      source: "Dana Stimulan Wirausaha Mahasiswa Uncen",
      disbursedDate: "2026-04-10",
      realizationPercentage: 70,
      rabStatus: "Proses Pembelian Mesin Spinner Minyak"
    },
    growthMetrics: {
      avgMonthlyRevenue: 4200000,
      totalSoldUnits: 280,
      localEmployees: 2,
      localSourcingPercent: 95,
      carbonReductionKg: 60
    },
    monthlyRevenues: [
      { month: "Jan 2026", gross: 1800000, expense: 1100000, net: 700000, units: 90 },
      { month: "Feb 2026", gross: 2900000, expense: 1500000, net: 1400000, units: 145 },
      { month: "Mar 2026", gross: 3800000, expense: 1900000, net: 1900000, units: 190 },
      { month: "Apr 2026", gross: 4500000, expense: 2200000, net: 2300000, units: 225 }
    ],
    storyOfImpact: {
      before: "Umbi keladi petani Sentani sering membusuk saat panen raya karena daya simpan yang singkat.",
      intervention: "Melalui pelatihan teknologi pengeringan dan spinner minyak MENOKEN, kelompok menciptakan varian keripik awet 6 bulan.",
      after: "Menjadi oleh-oleh populer di Bandara Sentani dan gerai UMKM Jayapura.",
      impact: "Menyerap 150 kg keladi segar per minggu dari petani kampung Nolokla Sentani."
    }
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    groupId: "grp-wamena-kopi",
    groupName: "Kopi Arabika Tiom Jaya",
    facultyName: "FEB",
    name: "Kopi Arabika Wamena Single Origin 250g",
    category: "kuliner",
    price: 75000,
    unit: "Pouch 250g",
    stock: 120,
    wholesalePrice: 65000,
    wholesaleMin: 10,
    rating: 4.9,
    reviewsCount: 48,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80",
    description: "Kopi Arabika murni dari dataran tinggi Papua (ketinggian 1.800+ mdpl). Karakter rasa lembut dengan aroma fruity, herbal, dan clean aftertaste. Tersedia dalam bentuk Biji (Beans) atau Bubuk (Ground).",
    legalities: ["NIB", "PIRT", "Halal"],
    isBestSeller: true,
    isPapuaOrigin: true,
    shopeeUrl: "https://shopee.co.id/wamenahighland",
    whatsappNumber: "6281248901122"
  },
  {
    id: "prod-2",
    groupId: "grp-wamena-kopi",
    groupName: "Kopi Arabika Tiom Jaya",
    facultyName: "FEB",
    name: "Kopi Arabika Honey Process Drip Bag (Isi 5 Sachet)",
    category: "kuliner",
    price: 55000,
    unit: "Kotak",
    stock: 85,
    wholesalePrice: 48000,
    wholesaleMin: 15,
    rating: 4.8,
    reviewsCount: 32,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    description: "Kopi sachet praktis tinggal seduh dengan filter gantung (drip bag). Menggunakan biji kopi pilihan proses honey dengan manis alami karamel dan asam sitrus yang menyegarkan.",
    legalities: ["NIB", "PIRT", "Halal"],
    isBestSeller: false,
    isPapuaOrigin: true,
    shopeeUrl: "https://shopee.co.id/wamenahighland",
    whatsappNumber: "6281248901122"
  },
  {
    id: "prod-3",
    groupId: "grp-noken-modern",
    groupName: "Noken Mahkota Anyaman",
    facultyName: "FKIP",
    name: "Noken Serat Mahkota Laptop Bag 14 Inch",
    category: "kerajinan",
    price: 320000,
    unit: "Pcs",
    stock: 25,
    wholesalePrice: 285000,
    wholesaleMin: 5,
    rating: 5.0,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
    description: "Tas noken anyaman tangan dari serat kulit kayu mahkota asli Papua yang dipadukan dengan furing beludru lembut dan bantalan busa pelindung laptop hingga 14 inch. Tahan lama, elegan, dan berkarakter budaya tinggi.",
    legalities: ["NIB", "HAKI"],
    isBestSeller: true,
    isPapuaOrigin: true,
    shopeeUrl: "https://shopee.co.id/nokencraft",
    whatsappNumber: "6282199883441"
  },
  {
    id: "prod-4",
    groupId: "grp-noken-modern",
    groupName: "Noken Mahkota Anyaman",
    facultyName: "FKIP",
    name: "Noken Selempang Mini Etnik Pewarna Alami",
    category: "kerajinan",
    price: 145000,
    unit: "Pcs",
    stock: 40,
    wholesalePrice: 125000,
    wholesaleMin: 10,
    rating: 4.9,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    description: "Tas noken mini multifungsi cocok untuk smartphone, dompet, dan aksesoris harian. Diwarnai dengan ekstrak akar dan daun alami tanpa bahan kimia sintetis.",
    legalities: ["NIB", "HAKI"],
    isBestSeller: false,
    isPapuaOrigin: true,
    shopeeUrl: "https://shopee.co.id/nokencraft",
    whatsappNumber: "6282199883441"
  },
  {
    id: "prod-5",
    groupId: "grp-sagu-bar",
    groupName: "Sagu Snack Bar Jaya",
    facultyName: "FMIPA",
    name: "Sagoo Energy Bar Kenari & Cokelat 40g",
    category: "kuliner",
    price: 18000,
    unit: "Pcs",
    stock: 200,
    wholesalePrice: 15000,
    wholesaleMin: 24,
    rating: 4.8,
    reviewsCount: 56,
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80",
    description: "Bar energi bebas terigu (gluten-free) terbuat dari pati sagu murni Sentani yang dicampur kacang kenari renyah dan cokelat asli Papua. Sumber karbohidrat kompleks rendah gula yang mengenyangkan lebih lama.",
    legalities: ["NIB", "PIRT"],
    isBestSeller: true,
    isPapuaOrigin: true,
    whatsappNumber: "6281355449901"
  },
  {
    id: "prod-6",
    groupId: "grp-buah-merah",
    groupName: "Herbal Papua Mandiri",
    facultyName: "FK",
    name: "Minyak Buah Merah Cold-Pressed Premium 100ml",
    category: "agribisnis",
    price: 135000,
    unit: "Botol 100ml",
    stock: 90,
    wholesalePrice: 115000,
    wholesaleMin: 12,
    rating: 4.9,
    reviewsCount: 71,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    description: "Minyak buah merah murni diekstrak tanpa pemanasan tinggi (cold-pressed) di bawah pengawasan riset Fakultas Kedokteran Uncen. Kaya tokoferol dan betakaroten untuk menjaga daya tahan tubuh dan vitalitas.",
    legalities: ["NIB", "BPOM", "Halal"],
    isBestSeller: true,
    isPapuaOrigin: true,
    shopeeUrl: "https://shopee.co.id/buahmerahuncen",
    whatsappNumber: "6281240998811"
  },
  {
    id: "prod-7",
    groupId: "grp-keladi-crisp",
    groupName: "Keladi Sentani Crispy",
    facultyName: "FEB",
    name: "Keripik Keladi Sentani Rasa Pedas Manis 150g",
    category: "kuliner",
    price: 22000,
    unit: "Pouch 150g",
    stock: 150,
    wholesalePrice: 18000,
    wholesaleMin: 20,
    rating: 4.7,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&auto=format&fit=crop&q=80",
    description: "Irisan keladi ungu pilihan khas tanah Sentani yang digoreng garing lalu di-spinner hingga kadar minyak minimal. Dibalut bumbu cabai rawit merah dan gula aren alami.",
    legalities: ["NIB"],
    isBestSeller: false,
    isPapuaOrigin: true,
    whatsappNumber: "6281344991200"
  },
  {
    id: "prod-8",
    groupId: "grp-cenderawasih-edutech",
    groupName: "Cenderawasih EduTech",
    facultyName: "FT",
    name: "Lisensi Akun Numbay Belajar Pro (1 Tahun)",
    category: "teknologi",
    price: 120000,
    unit: "Akun/Tahun",
    stock: 999,
    wholesalePrice: 90000,
    wholesaleMin: 20,
    rating: 4.9,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    description: "Akses penuh platform gamifikasi edukasi bahasa daerah Papua dan modul sains interaktif untuk sekolah dan keluarga. Dilengkapi laporan perkembangan anak otomatis.",
    legalities: ["NIB", "HAKI"],
    isBestSeller: false,
    isPapuaOrigin: true,
    whatsappNumber: "6285244119933"
  }
];

export const INITIAL_PROPOSALS = [
  {
    id: "prop-001",
    groupId: "grp-wamena-kopi",
    programId: "prog-2026",
    title: "Pengembangan Roasting Modern dan Penetrasi Pasar Nasional Kopi Arabika Wamena",
    submittedAt: "2026-02-14",
    status: "accepted", // draft, submitted, under_review, accepted, revision, rejected
    totalBudget: 35000000,
    requestedAmount: 25000000,
    scores: {
      inovasi: 85,
      pasar: 88,
      finansial: 82,
      tim: 90,
      dampak: 92,
      finalWeighted: 87.4
    },
    reviewerNotes: "Proposal sangat matang dengan rantai pasok lokal yang solid dari Tiom Lanny Jaya. Direkomendasikan untuk menerima pendanaan penuh tahap 1.",
    reviewerName: "Dr. Paulus Aronggear, S.E., M.Si."
  },
  {
    id: "prop-002",
    groupId: "grp-noken-modern",
    programId: "prog-2026",
    title: "Modernisasi Desain dan Standardisasi Mutu Tas Noken Serat Kulit Kayu untuk Pasar B2B",
    submittedAt: "2026-02-18",
    status: "accepted",
    totalBudget: 28000000,
    requestedAmount: 20000000,
    scores: {
      inovasi: 92,
      pasar: 86,
      finansial: 84,
      tim: 88,
      dampak: 95,
      finalWeighted: 89.0
    },
    reviewerNotes: "Sangat inovatif dalam pelestarian warisan budaya UNESCO. Aspek pemberdayaan mama-mama Papua sangat kuat.",
    reviewerName: "Ir. Yohana Yembise, M.Sc."
  },
  {
    id: "prop-003",
    groupId: "grp-sagu-bar",
    programId: "prog-2026",
    title: "Formulasi dan Hilirisasi Sagu Bar Bebas Gluten Berbasis Pati Sagu Lokal Sentani",
    submittedAt: "2026-02-22",
    status: "accepted",
    totalBudget: 22000000,
    requestedAmount: 15000000,
    scores: {
      inovasi: 80,
      pasar: 78,
      finansial: 76,
      tim: 82,
      dampak: 85,
      finalWeighted: 80.2
    },
    reviewerNotes: "Ide produk relevan dengan tren kesehatan global. Perlu perbaikan pada strategi distribusi awal di Jayapura.",
    reviewerName: "Dr. Paulus Aronggear, S.E., M.Si."
  },
  {
    id: "prop-004",
    groupId: "grp-keladi-crisp",
    programId: "prog-2026",
    title: "Optimasi Mesin Peniris Minyak untuk Peningkatan Kapasitas Produksi Keripik Keladi Sentani",
    submittedAt: "2026-02-25",
    status: "under_review",
    totalBudget: 15000000,
    requestedAmount: 10000000,
    scores: {
      inovasi: 72,
      pasar: 74,
      finansial: 75,
      tim: 70,
      dampak: 78,
      finalWeighted: 73.8
    },
    reviewerNotes: "Usaha potensial, masih dalam proses evaluasi kesiapan izin P-IRT dan higienitas dapur produksi.",
    reviewerName: "Dra. Fransiska Dimara, M.Pd."
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "TRX-2026-0401-01",
    groupId: "grp-wamena-kopi",
    groupName: "Kopi Arabika Tiom Jaya",
    date: "2026-04-12 10:15",
    type: "kasir_festival",
    customerName: "Bpk. Markus (Dosen FEB)",
    customerPhone: "081248001199",
    items: [
      { productId: "prod-1", name: "Kopi Arabika Wamena 250g", price: 75000, qty: 2, subtotal: 150000 },
      { productId: "prod-2", name: "Kopi Drip Bag (5 Sachet)", price: 55000, qty: 1, subtotal: 55000 }
    ],
    totalAmount: 205000,
    paymentMethod: "QRIS",
    status: "paid"
  },
  {
    id: "TRX-2026-0401-02",
    groupId: "grp-noken-modern",
    groupName: "Noken Mahkota Anyaman",
    date: "2026-04-12 11:30",
    type: "kasir_festival",
    customerName: "Ibu Linda (Wisatawan)",
    customerPhone: "081344882211",
    items: [
      { productId: "prod-3", name: "Noken Serat Mahkota Laptop Bag", price: 320000, qty: 1, subtotal: 320000 }
    ],
    totalAmount: 320000,
    paymentMethod: "Tunai",
    status: "paid"
  },
  {
    id: "TRX-2026-0401-03",
    groupId: "grp-sagu-bar",
    groupName: "Sagu Snack Bar Jaya",
    date: "2026-04-12 13:45",
    type: "kasir_festival",
    customerName: "Mahasiswa FMIPA",
    customerPhone: "-",
    items: [
      { productId: "prod-5", name: "Sagoo Energy Bar Kenari", price: 18000, qty: 4, subtotal: 72000 }
    ],
    totalAmount: 72000,
    paymentMethod: "QRIS",
    status: "paid"
  }
];

export const INITIAL_AUDIT_LOGS = [
  { id: "log-1", timestamp: "2026-04-12 09:30", user: "Admin UPA (Dra. Yuliana)", action: "VERIFY_LEGALITY", details: "Memverifikasi NIB dan PIRT kelompok Kopi Arabika Tiom Jaya" },
  { id: "log-2", timestamp: "2026-04-11 15:20", user: "Reviewer (Dr. Paulus Aronggear)", action: "SUBMIT_SCORE", details: "Menilai Proposal prop-001 (Skor Akhir: 87.4)" },
  { id: "log-3", timestamp: "2026-04-10 11:00", user: "Super Admin (Sistem IT Uncen)", action: "SYSTEM_CONFIG", details: "Pembaruan bobot penilaian kriteria seleksi program 2026" },
  { id: "log-4", timestamp: "2026-04-09 14:15", user: "Mahasiswa (Elieser Tabuni)", action: "UPDATE_REVENUE", details: "Memperbarui data omzet bulan Maret 2026 (Rp14.500.000)" }
];
export const INITIAL_LOGBOOKS = [
  {
    id: "log-1",
    groupId: "grp-wamena-kopi",
    week: 1,
    date: "2026-03-05",
    category: "Produksi & Pengadaan",
    hours: 12,
    description: "Penyortiran biji kopi arabika green beans panen pertama dari petani Tiom Lanny Jaya dan uji kadar air 12%.",
    problem: "Sebagian biji kopi mengalami defect akibat cuaca hujan saat penjemuran di kebun rakyat.",
    solution: "Melakukan sortasi manual ulang meja ganda dan memisahkan biji grade 1 specialty untuk roasting batch premium.",
    status: "approved",
    dplNote: "Bagus, perhatikan konsistensi moisture content agar cita rasa tetap stabil.",
    dplName: "Dr. Paulus Aronggear, S.E., M.Si. (DPL FEB)"
  },
  {
    id: "log-2",
    groupId: "grp-wamena-kopi",
    week: 2,
    date: "2026-03-12",
    category: "Riset & Packaging",
    hours: 15,
    description: "Pemberian label NIB dan P-IRT pada kemasan drip bag baru serta kalibrasi mesin roaster suhu 205°C.",
    problem: "Warna cetak stiker kemasan batch pertama sedikit pudar dibanding sampel digital.",
    solution: "Mengganti vendor percetakan lokal dengan bahan laminasi doff tahan air.",
    status: "approved",
    dplNote: "Kemasan sudah memenuhi standar label BPOM, siap edar.",
    dplName: "Dr. Paulus Aronggear, S.E., M.Si. (DPL FEB)"
  },
  {
    id: "log-3",
    groupId: "grp-wamena-kopi",
    week: 3,
    date: "2026-03-19",
    category: "Pemasaran & B2B",
    hours: 18,
    description: "Penawaran sampel kopi ke 4 coffee shop di Abepura dan Kota Jayapura serta input produk ke MENOKEN Market.",
    problem: "Coffee shop meminta termin pembayaran 14 hari.",
    solution: "Menyepakati sistem konsinyasi batch awal 5 kg per kedai.",
    status: "submitted",
    dplNote: "Menunggu verifikasi laporan minggu ke-3",
    dplName: "Dr. Paulus Aronggear, S.E., M.Si. (DPL FEB)"
  },
  {
    id: "log-4",
    groupId: "grp-noken-modern",
    week: 1,
    date: "2026-03-08",
    category: "Produksi Anyaman",
    hours: 16,
    description: "Pendampingan 6 mama pengrajin di Sentani untuk standardisasi ukuran kompartemen laptop 14 inch.",
    problem: "Kerapatan serat kulit kayu berbeda-beda antar pengrajin.",
    solution: "Menyediakan mal pola kayu presisi ukuran 35 x 25 cm.",
    status: "approved",
    dplNote: "Inovasi pola presisi sangat membantu konsistensi produk kriya.",
    dplName: "Ir. Yohana Yembise, M.Sc. (DPL FKIP)"
  }
];

export const INITIAL_PARTNERSHIP_INQUIRIES = [
  {
    id: "inq-1",
    groupId: "grp-wamena-kopi",
    groupName: "Kopi Arabika Tiom Jaya",
    partnerName: "Bpk. Hendra Wijaya",
    institution: "Hotel Grand Abepura Jayapura",
    partnerType: "Pengadaan / Supplier Rutin",
    estimatedValue: "Rp15.000.000 / bulan",
    message: "Kami berminat menjadikan Kopi Arabika Wamena sebagai kopi resmi welcome drink dan sarapan tamu hotel kami. Mohon info pengiriman sampel dan draf kontrak B2B.",
    date: "2026-04-10",
    status: "in_discussion"
  },
  {
    id: "inq-2",
    groupId: "grp-noken-modern",
    groupName: "Noken Mahkota Anyaman",
    partnerName: "Ibu Desi Ratnasari",
    institution: "Bank Papua Cabang Utama",
    partnerType: "Cinderamata Resmi & Souvenir Korporasi",
    estimatedValue: "Rp28.000.000 (100 Pcs)",
    message: "Permintaan pengadaan 100 pcs tas noken laptop untuk cinderamata perayaan HUT Bank Papua tahun 2026.",
    date: "2026-04-11",
    status: "accepted"
  }
];
