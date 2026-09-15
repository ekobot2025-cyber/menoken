import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getLogbooks, saveLogbook } from '../../lib/storage';
import { StatusBadge } from '../../components/StatusBadge';
import {
  FileText,
  Plus,
  Clock,
  CheckCircle2,
  Printer,
  Calendar,
  Sparkles,
  BookOpen,
  Award,
  X
} from 'lucide-react';

export const LogbookMbkm = () => {
  const { activeGroup } = useAuth();
  const allLogs = getLogbooks();
  const groupLogs = allLogs.filter(l => l.groupId === activeGroup?.id);

  const [modalOpen, setModalOpen] = useState(false);
  const [newLog, setNewLog] = useState({
    week: (groupLogs.length + 1) || 1,
    date: new Date().toISOString().slice(0, 10),
    category: 'Produksi & Operasional',
    hours: 15,
    description: '',
    problem: '',
    solution: '',
    status: 'submitted',
    dplNote: 'Menunggu paraf dosen pembimbing'
  });

  const totalHours = groupLogs.reduce((sum, l) => sum + (Number(l.hours) || 0), 0);
  // Konversi SKS MBKM: 1 SKS setara ~45 jam aktivitas per semester
  const estimatedSks = Math.min(20, Math.round((totalHours / 45) * 10) / 10);

  const handleSave = (e) => {
    e.preventDefault();
    const entry = {
      ...newLog,
      id: `log-${Date.now()}`,
      groupId: activeGroup.id,
      dplName: 'Dr. Paulus Aronggear, S.E., M.Si. (DPL FEB Uncen)'
    };
    saveLogbook(entry);
    setModalOpen(false);
    setNewLog({
      week: groupLogs.length + 2,
      date: new Date().toISOString().slice(0, 10),
      category: 'Produksi & Operasional',
      hours: 15,
      description: '',
      problem: '',
      solution: '',
      status: 'submitted',
      dplNote: 'Menunggu paraf dosen pembimbing'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Logbook MBKM Standar Kemendikbudristek (P2MW)
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            E-Logbook Wirausaha & Konversi SKS MBKM
          </h1>
          <p className="text-xs text-slate-500">
            Catat aktivitas mingguan untuk verifikasi Dosen Pembimbing Lapangan (DPL) dan konversi nilai akademik (hingga 20 SKS).
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" /> Cetak Berita Acara SKS
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-uncen-navy hover:bg-uncen-navy-dark text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-4 h-4" /> Tambah Logbook Mingguan
          </button>
        </div>
      </div>

      {/* SKS Conversion Progress Card */}
      <div className="bg-gradient-to-r from-uncen-navy to-uncen-navy-light text-white p-6 rounded-3xl shadow-md border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Award className="w-4 h-4 text-amber-400" />
            Rekapitulasi Jam Kerja & Konversi Akademik
          </div>
          <div className="text-2xl sm:text-3xl font-black">
            {totalHours} Jam Kerja Terverifikasi
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Standar MBKM Kemendikbud: 1 SKS = 45 Jam Pembelajaran Wirausaha Terbimbing
          </p>
        </div>

        <div className="px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center">
          <div className="text-[10px] uppercase font-bold text-amber-300">Estimasi Konversi</div>
          <div className="text-3xl font-black text-white">{estimatedSks} <span className="text-sm font-normal">/ 20 SKS</span></div>
          <div className="text-[10px] text-emerald-300 font-semibold mt-0.5">Disetujui DPL</div>
        </div>
      </div>

      {/* Logbook Entries Timeline */}
      <div className="space-y-4">
        {groupLogs.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-400 text-xs">
            Belum ada catatan logbook mingguan. Klik tombol <strong>"Tambah Logbook Mingguan"</strong> di atas.
          </div>
        ) : (
          groupLogs.map((log) => (
            <div key={log.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-uncen-navy text-amber-300 font-black flex items-center justify-center text-xs">
                    M{log.week}
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      Minggu ke-{log.week}: {log.category}
                    </h3>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {log.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-bold text-uncen-navy"><Clock className="w-3 h-3" /> {log.hours} Jam Aktivitas</span>
                    </div>
                  </div>
                </div>

                <StatusBadge status={log.status} />
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-slate-800">Aktivitas & Capaian:</strong>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{log.description}</p>
                </div>

                {log.problem && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl">
                      <span className="font-bold text-rose-800">Kendala Lapangan:</span>
                      <p className="text-rose-700 mt-0.5">{log.problem}</p>
                    </div>
                    <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
                      <span className="font-bold text-emerald-800">Solusi & Tindak Lanjut:</span>
                      <p className="text-emerald-700 mt-0.5">{log.solution}</p>
                    </div>
                  </div>
                )}

                {log.dplNote && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800">Paraf & Catatan DPL ({log.dplName}):</strong>
                      <div className="italic mt-0.5">"{log.dplNote}"</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Tambah Logbook */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 text-xs">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-black text-slate-900 mb-4">
              Input Aktivitas E-Logbook Wirausaha
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Minggu Ke-</label>
                  <input
                    type="number"
                    required
                    value={newLog.week}
                    onChange={(e) => setNewLog({ ...newLog, week: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={newLog.date}
                    onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jam Kerja</label>
                  <input
                    type="number"
                    required
                    value={newLog.hours}
                    onChange={(e) => setNewLog({ ...newLog, hours: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kategori Aktivitas</label>
                <select
                  value={newLog.category}
                  onChange={(e) => setNewLog({ ...newLog, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Produksi & Operasional">Produksi & Operasional</option>
                  <option value="Riset, Formula & Kemasan">Riset, Formula & Kemasan</option>
                  <option value="Pemasaran & Penjualan B2C">Pemasaran & Penjualan B2C</option>
                  <option value="Penjualan Grosir B2B & Kemitraan">Penjualan Grosir B2B & Kemitraan</option>
                  <option value="Pengurusan Izin & Legalitas">Pengurusan Izin & Legalitas</option>
                  <option value="Pencatatan Keuangan & Laporan">Pencatatan Keuangan & Laporan</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Kegiatan & Capaian</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Uraikan apa yang dikerjakan tim minggu ini..."
                  value={newLog.description}
                  onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kendala yang Dihadapi</label>
                  <textarea
                    rows={2}
                    value={newLog.problem}
                    onChange={(e) => setNewLog({ ...newLog, problem: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  ></textarea>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Solusi / Pemecahan Masalah</label>
                  <textarea
                    rows={2}
                    value={newLog.solution}
                    onChange={(e) => setNewLog({ ...newLog, solution: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  ></textarea>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-uncen-navy text-white font-bold"
                >
                  Simpan Logbook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
