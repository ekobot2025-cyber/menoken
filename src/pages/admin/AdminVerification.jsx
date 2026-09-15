import React, { useState, useEffect } from 'react';
import { getGroups, saveGroup } from '../../lib/storage';
import { LegalBadge } from '../../components/LegalBadge';
import { StatusBadge } from '../../components/StatusBadge';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Search,
  Edit2,
  Plus,
  Trash2,
  X
} from 'lucide-react';

const LEGALITY_TYPES = [
  'NIB',
  'PIRT',
  'Sertifikat Halal',
  'Hak Merek (HAKI)',
  'BPOM',
  'Izin Edar Dinkes',
  'NPWP Usaha',
  'Lainnya'
];

export const AdminVerification = () => {
  const [groups, setGroups] = useState(() => getGroups());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Edit / Add Legality Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [activeLegIndex, setActiveLegIndex] = useState(null); // null = Add new
  const [formData, setFormData] = useState({
    type: 'NIB',
    number: '',
    issuedDate: '',
    status: 'verified',
    verifiedBy: 'Admin UPA'
  });

  // Listen for storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      setGroups(getGroups());
    };
    window.addEventListener('menoken-storage-update', handleStorageUpdate);
    return () => window.removeEventListener('menoken-storage-update', handleStorageUpdate);
  }, []);

  // Instant Toggle Verify / Batalkan
  const handleVerify = (groupId, legIndex, newStatus) => {
    const allGroups = getGroups();
    const grpIndex = allGroups.findIndex(g => g.id === groupId);
    if (grpIndex === -1) return;

    const grp = allGroups[grpIndex];
    const updatedLegalities = [...(grp.legalities || [])];
    updatedLegalities[legIndex] = {
      ...updatedLegalities[legIndex],
      status: newStatus,
      verifiedBy: newStatus === 'verified' ? 'Admin UPA (Terverifikasi)' : 'Menunggu Review'
    };

    grp.legalities = updatedLegalities;
    saveGroup(grp);
    setGroups(getGroups());
  };

  // Open Edit Modal for an existing legality
  const handleOpenEdit = (groupId, legIndex, leg) => {
    setActiveGroupId(groupId);
    setActiveLegIndex(legIndex);
    setFormData({
      type: leg.type || 'NIB',
      number: leg.number || '',
      issuedDate: leg.issuedDate || '',
      status: leg.status || 'verified',
      verifiedBy: leg.verifiedBy || 'Admin UPA'
    });
    setIsModalOpen(true);
  };

  // Open Add Modal for a new legality
  const handleOpenAdd = (groupId) => {
    setActiveGroupId(groupId);
    setActiveLegIndex(null);
    setFormData({
      type: 'NIB',
      number: '',
      issuedDate: new Date().toISOString().slice(0, 10),
      status: 'verified',
      verifiedBy: 'Admin UPA'
    });
    setIsModalOpen(true);
  };

  // Save changes from Modal
  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!activeGroupId) return;

    const allGroups = getGroups();
    const grp = allGroups.find(g => g.id === activeGroupId);
    if (!grp) return;

    const currentLegalities = [...(grp.legalities || [])];

    if (activeLegIndex !== null) {
      // Update existing
      currentLegalities[activeLegIndex] = {
        ...currentLegalities[activeLegIndex],
        type: formData.type,
        number: formData.number.trim(),
        issuedDate: formData.issuedDate || '-',
        status: formData.status,
        verifiedBy: formData.status === 'verified' ? (formData.verifiedBy || 'Admin UPA') : '-'
      };
    } else {
      // Add new
      currentLegalities.push({
        type: formData.type,
        number: formData.number.trim(),
        issuedDate: formData.issuedDate || '-',
        status: formData.status,
        verifiedBy: formData.status === 'verified' ? (formData.verifiedBy || 'Admin UPA') : '-'
      });
    }

    grp.legalities = currentLegalities;
    saveGroup(grp);
    setGroups(getGroups());
    setIsModalOpen(false);
  };

  // Delete legality
  const handleDeleteLegality = (groupId, legIndex) => {
    if (!window.confirm('Hapus dokumen legalitas ini dari kelompok?')) return;
    const allGroups = getGroups();
    const grp = allGroups.find(g => g.id === groupId);
    if (!grp) return;

    const updatedLegalities = grp.legalities.filter((_, idx) => idx !== legIndex);
    grp.legalities = updatedLegalities;
    saveGroup(grp);
    setGroups(getGroups());
  };

  const filteredGroups = groups.filter(g => {
    const matchesSearch =
      (g.brand || g.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.leader?.name || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'has_unverified') {
      return matchesSearch && g.legalities?.some(l => l.status !== 'verified');
    }
    if (filterStatus === 'all_verified') {
      return matchesSearch && g.legalities?.length > 0 && g.legalities.every(l => l.status === 'verified');
    }
    return matchesSearch;
  });

  const activeGroupObj = groups.find(g => g.id === activeGroupId);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Data Quality & Governance
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Pusat Verifikasi & Kelola Legalitas Usaha
          </h1>
          <p className="text-xs text-slate-500">
            Admin UPA dapat memverifikasi, membatalkan, menyunting nomor dokumen resmi, serta menambahkan perizinan baru untuk setiap kelompok usaha binaan.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari stan/ketua usaha..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 shadow-sm"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-2 px-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 shadow-sm font-semibold text-slate-700"
          >
            <option value="all">Semua Status Legalitas</option>
            <option value="has_unverified">Perlu Verifikasi / Review</option>
            <option value="all_verified">Semua Terverifikasi</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredGroups.map((grp) => (
          <div key={grp.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">{grp.brand || grp.name}</h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  {grp.facultyName} • Ketua: <strong className="text-slate-700">{grp.leader?.name}</strong> ({grp.leader?.nim})
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full">
                  {grp.legalities?.length || 0} Izin Terdaftar
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenAdd(grp.id)}
                  className="py-1.5 px-3 rounded-xl bg-uncen-navy hover:bg-uncen-navy-dark text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah Izin
                </button>
              </div>
            </div>

            {/* Grid of Legalities */}
            {(!grp.legalities || grp.legalities.length === 0) ? (
              <div className="py-6 text-center text-slate-400 text-xs italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                Belum ada dokumen legalitas terdaftar untuk kelompok ini. Klik "Tambah Izin" di atas untuk menambahkan.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {grp.legalities.map((leg, idx) => {
                  const isVerified = leg.status === 'verified';
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition flex flex-col justify-between space-y-3 text-xs ${
                        isVerified
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-extrabold text-slate-900 line-clamp-1">{leg.type}</span>
                          <StatusBadge status={leg.status} />
                        </div>

                        <div className="space-y-1 text-slate-600">
                          <div className="text-[11px]">
                            No. Dokumen:{' '}
                            <strong className="text-slate-900 font-mono select-all">
                              {leg.number || '-'}
                            </strong>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Tanggal Terbit: {leg.issuedDate || '-'}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Verifikator: <span className="font-semibold text-slate-600">{leg.verifiedBy || '-'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2.5 border-t border-slate-200/80 space-y-1.5">
                        <div className="grid grid-cols-2 gap-1.5">
                          {isVerified ? (
                            <button
                              type="button"
                              onClick={() => handleVerify(grp.id, idx, 'under_review')}
                              className="py-1.5 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
                              title="Batalkan verifikasi (kembalikan ke status review)"
                            >
                              <XCircle className="w-3.5 h-3.5 text-amber-600" />
                              Batalkan
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleVerify(grp.id, idx, 'verified')}
                              className="py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-sm transition cursor-pointer"
                              title="Verifikasi dokumen legalitas resmi"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Verifikasi
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleOpenEdit(grp.id, idx, leg)}
                            className="py-1.5 px-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
                            title="Edit data nomor dokumen, tanggal terbit, & status"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                            Edit
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteLegality(grp.id, idx)}
                          className="w-full py-1 text-slate-400 hover:text-rose-600 text-[10px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" /> Hapus Izin Ini
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit / Add Legality Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95 text-xs text-slate-900 border border-slate-200"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <div className="text-[11px] font-bold text-uncen-teal uppercase tracking-widest">
                {activeGroupObj?.brand || activeGroupObj?.name}
              </div>
              <h3 className="text-base font-black text-slate-900">
                {activeLegIndex !== null ? 'Sunting Dokumen Legalitas' : 'Tambah Izin Legalitas Baru'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Perubahan data akan langsung tersimpan dan tampil realtime di profil usaha mahasiswa.
              </p>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Jenis Legalitas</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs focus:outline-none focus:border-amber-500"
                >
                  {LEGALITY_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nomor Dokumen / Surat Izin</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 1903240012891 atau P-IRT 5109171010321-29"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Terbit</label>
                  <input
                    type="date"
                    value={formData.issuedDate}
                    onChange={(e) => setFormData({ ...formData, issuedDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Verifikasi</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="verified">Terverifikasi (Resmi)</option>
                    <option value="under_review">Menunggu Review</option>
                    <option value="process">Dalam Proses</option>
                    <option value="rejected">Ditolak / Perlu Revisi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Verifikator</label>
                <input
                  type="text"
                  value={formData.verifiedBy}
                  onChange={(e) => setFormData({ ...formData, verifiedBy: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 font-sans">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-uncen-navy hover:bg-uncen-navy-dark text-white font-bold shadow-md cursor-pointer transition"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
