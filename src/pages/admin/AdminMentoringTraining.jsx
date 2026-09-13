import React from 'react';
import { GraduationCap, Users, Calendar, CheckCircle2 } from 'lucide-react';

export const AdminMentoringTraining = () => {
  const trainings = [
    { name: 'Pelatihan Business Model Canvas (BMC) & Value Proposition', date: '12 April 2026', attendance: 96, speaker: 'Prof. Dr. Ir. Apolo Safanpo' },
    { name: 'Standardisasi Higienitas & Pengurusan P-IRT Dinkes', date: '20 April 2026', attendance: 92, speaker: 'Dra. Fransiska Dimara' },
    { name: 'Strategi Digital Marketing & Onboarding MENOKEN Market', date: '28 April 2026', attendance: 98, speaker: 'Konsultan E-Commerce Jayapura' },
    { name: 'Pitch Deck & Presentasi Demo Day Mahasiswa', date: '5 Mei 2026', attendance: 88, speaker: 'Venture Partner Indonesia Timur' }
  ];

  const mentoringSessions = [
    { group: 'Kopi Arabika Tiom Jaya', mentor: 'Bpk. Markus (Praktisi Kopi)', problem: 'Standardisasi derajat roasting untuk kemasan drip bag', intervention: 'Pelatihan cupping & profiling rasa', status: 'Selesai' },
    { group: 'Noken Mahkota Anyaman', mentor: 'Ibu Ruth (Desainer Kriya)', problem: 'Pengadaan furing laptop tahan benturan', intervention: 'Koneksi supplier bahan tekstil premium di Surabaya', status: 'Selesai' },
    { group: 'Sagu Snack Bar Jaya', mentor: 'Dr. Paulus (Ahli Pangan)', problem: 'Masa simpan kue bar yang cepat tengik', intervention: 'Penggunaan kemasan aluminium foil nitrogen flush', status: 'Dalam Proses' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest">
          Pengembangan Kapabilitas
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          Pelatihan & Pendampingan Mentor (Mentorship)
        </h1>
        <p className="text-xs text-slate-500">
          Catatan kehadiran pelatihan wajib dan log pendampingan berkala mahasiswa bersama mentor praktisi.
        </p>
      </div>

      {/* Trainings Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-uncen-navy" />
          Pelatihan Wirausaha Terjadwal (Attendance Rate: 94%)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <th className="py-3 px-4">Materi Pelatihan</th>
                <th className="py-3 px-4">Tanggal Pelaksanaan</th>
                <th className="py-3 px-4">Narasumber / Instruktur</th>
                <th className="py-3 px-4 text-right">Tingkat Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trainings.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{t.name}</td>
                  <td className="py-3 px-4 text-slate-600">{t.date}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{t.speaker}</td>
                  <td className="py-3 px-4 text-right font-black text-emerald-600">
                    {t.attendance}% Hadir
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mentoring Log Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-500" />
          Log Pendampingan Mentoring (Masalah → Intervensi → Hasil)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <th className="py-3 px-4">Kelompok Usaha</th>
                <th className="py-3 px-4">Mentor Pendamping</th>
                <th className="py-3 px-4">Kendala / Permasalahan</th>
                <th className="py-3 px-4">Intervensi Rekomendasi</th>
                <th className="py-3 px-4 text-right">Status Tindak Lanjut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mentoringSessions.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{m.group}</td>
                  <td className="py-3 px-4 text-slate-700 font-semibold">{m.mentor}</td>
                  <td className="py-3 px-4 text-slate-600">{m.problem}</td>
                  <td className="py-3 px-4 text-slate-800">{m.intervention}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      m.status === 'Selesai' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
