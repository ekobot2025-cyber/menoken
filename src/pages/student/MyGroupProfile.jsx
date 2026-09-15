import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { saveGroup, getMasterData } from '../../lib/storage';
import { LegalBadge } from '../../components/LegalBadge';
import { GrowthScoreGauge } from '../../components/GrowthScoreGauge';
import { LevelBadge } from '../../components/LevelBadge';
import { QrStandeeModal } from '../../components/QrStandeeModal';
import { QrCode } from 'lucide-react';
import {
  User,
  Users,
  MapPin,
  Globe,
  Instagram,
  MessageCircle,
  Save,
  Plus,
  Trash2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const MyGroupProfile = () => {
  const { activeGroup } = useAuth();
  const [groupData, setGroupData] = useState({ ...activeGroup });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const masterData = getMasterData();
  const faculties = masterData?.faculties || [];

  const selectedFacultyObj = faculties.find(
    f => f.name === groupData.facultyName || f.short === groupData.faculty || f.short === groupData.facultyName
  ) || faculties[0];

  const availablePrograms = selectedFacultyObj ? selectedFacultyObj.programs : [];

  const handleFacultyChange = (e) => {
    const selectedShort = e.target.value;
    const fac = faculties.find(f => f.short === selectedShort);
    if (fac) {
      setGroupData(prev => ({
        ...prev,
        faculty: fac.short,
        facultyName: fac.name,
        studyProgram: fac.programs[0] || ''
      }));
    }
  };

  const handleStudyProgramChange = (e) => {
    const prog = e.target.value;
    setGroupData(prev => ({
      ...prev,
      studyProgram: prog
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveGroup(groupData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddMember = () => {
    const newMember = {
      name: '',
      nim: '',
      role: 'Anggota',
      faculty: groupData.facultyName || 'FEB',
      prodi: groupData.studyProgram || 'Manajemen'
    };
    setGroupData({
      ...groupData,
      members: [...(groupData.members || []), newMember]
    });
  };

  const handleRemoveMember = (idx) => {
    const updated = groupData.members.filter((_, i) => i !== idx);
    setGroupData({ ...groupData, members: updated });
  };

  const handleMemberChange = (idx, field, val) => {
    const updated = [...groupData.members];
    updated[idx][field] = val;
    setGroupData({ ...groupData, members: updated });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest">
            One Group – One Digital Profile
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Profil Digital Kelompok Usaha
          </h1>
          <p className="text-xs text-slate-500">
            Pusat data tunggal resmi kelompok usaha mahasiswa Universitas Cenderawasih.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQrModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <QrCode className="w-4 h-4" /> QR Standee Meja Expo
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-uncen-navy hover:bg-uncen-navy-dark text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
          >
            <Save className="w-4 h-4" />
            Simpan Profil
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Profil berhasil diperbarui dan tersinkronisasi ke seluruh sistem MENOKEN!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Identitas Bisnis */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-amber-500" />
            Identitas Usaha & Merek
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Kelompok Usaha</label>
              <input
                type="text"
                value={groupData.name || ''}
                onChange={(e) => setGroupData({ ...groupData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Brand / Komersial</label>
              <input
                type="text"
                value={groupData.brand || ''}
                onChange={(e) => setGroupData({ ...groupData, brand: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Fakultas <span className="text-rose-500">*</span>
              </label>
              <select
                value={selectedFacultyObj?.short || ''}
                onChange={handleFacultyChange}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {faculties.map((f) => (
                  <option key={f.id} value={f.short}>
                    {f.short} – {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Program Studi <span className="text-rose-500">*</span>
              </label>
              <select
                value={groupData.studyProgram || (availablePrograms[0] || '')}
                onChange={handleStudyProgramChange}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {availablePrograms.map((prog, idx) => (
                  <option key={idx} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Deskripsi & Keunggulan Usaha</label>
              <textarea
                rows={3}
                value={groupData.description || ''}
                onChange={(e) => setGroupData({ ...groupData, description: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Lokasi Usaha / Dapur Produksi</label>
              <input
                type="text"
                value={groupData.location || ''}
                onChange={(e) => setGroupData({ ...groupData, location: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">WhatsApp Bisnis</label>
              <input
                type="text"
                value={groupData.socials?.whatsapp || ''}
                onChange={(e) =>
                  setGroupData({
                    ...groupData,
                    socials: { ...groupData.socials, whatsapp: e.target.value }
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Data Anggota Kelompok */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" />
              Anggota Tim Usaha ({groupData.members?.length || 0} Mahasiswa)
            </h3>
            <button
              type="button"
              onClick={handleAddMember}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Anggota
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                  <th className="py-2.5 px-3">Nama Mahasiswa</th>
                  <th className="py-2.5 px-3">NIM</th>
                  <th className="py-2.5 px-3">Peran / Jabatan</th>
                  <th className="py-2.5 px-3">Program Studi</th>
                  <th className="py-2.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {groupData.members?.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={m.name}
                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={m.nim}
                        onChange={(e) => handleMemberChange(idx, 'nim', e.target.value)}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={m.role}
                        onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={m.prodi}
                        onChange={(e) => handleMemberChange(idx, 'prodi', e.target.value)}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legalitas Tracker */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Status & Dokumen Legalitas Usaha
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {groupData.legalities?.map((leg, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{leg.type}</span>
                  <LegalBadge type={leg.type} />
                </div>
                <div className="text-xs text-slate-600">
                  <div>No. Dokumen: <strong>{leg.number || '-'}</strong></div>
                  <div>Tanggal Terbit: {leg.issuedDate || '-'}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Verifikator: {leg.verifiedBy || 'Menunggu Admin'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
      {qrModalOpen && (
        <QrStandeeModal group={groupData} onClose={() => setQrModalOpen(false)} />
      )}
    </div>
  );
};
