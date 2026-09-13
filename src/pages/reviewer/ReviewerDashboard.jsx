import React, { useState } from 'react';
import { getProposals, saveProposal } from '../../lib/storage';
import { StatusBadge } from '../../components/StatusBadge';
import {
  CheckSquare,
  Sparkles,
  Search,
  FileText,
  Star,
  ChevronRight,
  Sliders,
  CheckCircle2,
  X
} from 'lucide-react';

export const ReviewerDashboard = () => {
  const proposals = getProposals();
  const [activeScoringProposal, setActiveScoringProposal] = useState(null);
  const [scores, setScores] = useState({
    inovasi: 85,
    pasar: 85,
    finansial: 80,
    tim: 85,
    dampak: 90
  });
  const [notes, setNotes] = useState('');
  const [recommendation, setRecommendation] = useState('accepted');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const openScoring = (prop) => {
    setActiveScoringProposal(prop);
    setScores(prop.scores || { inovasi: 80, pasar: 80, finansial: 80, tim: 80, dampak: 80 });
    setNotes(prop.reviewerNotes || '');
    setRecommendation(prop.status === 'accepted' ? 'accepted' : 'under_review');
  };

  // Weighted calculation: each criteria is 20%
  const finalScore = Number(
    (
      (scores.inovasi * 0.2) +
      (scores.pasar * 0.2) +
      (scores.finansial * 0.2) +
      (scores.tim * 0.2) +
      (scores.dampak * 0.2)
    ).toFixed(1)
  );

  const handleSaveScore = (e) => {
    e.preventDefault();
    if (!activeScoringProposal) return;

    const updated = {
      ...activeScoringProposal,
      status: recommendation,
      scores: {
        ...scores,
        finalWeighted: finalScore
      },
      reviewerNotes: notes,
      reviewerName: 'Dr. Paulus Aronggear, S.E., M.Si. (Reviewer)'
    };

    saveProposal(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveScoringProposal(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5" />
            Portal Reviewer & Juri Wirausaha
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Antrean Penilaian Proposal Mahasiswa
          </h1>
          <p className="text-xs text-slate-500">
            Berikan evaluasi kuantitatif berbobot dan catatan kualitatif untuk seleksi pendanaan program 2026.
          </p>
        </div>

        <div className="px-3.5 py-1.5 bg-purple-50 border border-purple-200 rounded-xl text-purple-800 text-xs font-bold">
          {proposals.length} Proposal Ditugaskan
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proposals.map((prop) => (
          <div
            key={prop.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-slate-400">{prop.id}</span>
                <StatusBadge status={prop.status} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{prop.title}</h3>
              <div className="text-xs text-slate-500">
                Pengajuan Dana: <strong>Rp{prop.requestedAmount?.toLocaleString('id-ID')}</strong>
              </div>
              {prop.scores?.finalWeighted && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block">
                  Nilai Akhir: {prop.scores.finalWeighted} / 100
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Diajukan: {prop.submittedAt}</span>
              <button
                onClick={() => openScoring(prop)}
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Star className="w-3.5 h-3.5" /> Beri Penilaian
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scoring Modal */}
      {activeScoringProposal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveScoringProposal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <div className="text-[10px] uppercase font-bold text-purple-600">Lembar Penilaian Juri</div>
              <h3 className="text-base font-black text-slate-900 mt-0.5">{activeScoringProposal.title}</h3>
            </div>

            {savedSuccess ? (
              <div className="py-10 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Penilaian Berhasil Disimpan!</h4>
                <p className="text-slate-500">Skor terakumulasi ke papan peringkat otomatis.</p>
              </div>
            ) : (
              <form onSubmit={handleSaveScore} className="space-y-4">
                {/* Scoring criteria sliders */}
                <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-800">1. Inovasi & Kebaruan (Bobot 20%)</div>
                      <div className="text-[10px] text-slate-400">Keunikan diferensiasi produk</div>
                    </div>
                    <span className="font-black text-sm text-slate-900">{scores.inovasi}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scores.inovasi}
                    onChange={(e) => setScores({ ...scores, inovasi: Number(e.target.value) })}
                    className="w-full accent-purple-600"
                  />

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <div className="font-bold text-slate-800">2. Potensi Pasar (Bobot 20%)</div>
                      <div className="text-[10px] text-slate-400">Target konsumen & prospek revenue</div>
                    </div>
                    <span className="font-black text-sm text-slate-900">{scores.pasar}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scores.pasar}
                    onChange={(e) => setScores({ ...scores, pasar: Number(e.target.value) })}
                    className="w-full accent-purple-600"
                  />

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <div className="font-bold text-slate-800">3. Kelayakan Finansial (Bobot 20%)</div>
                      <div className="text-[10px] text-slate-400">Kewajaran RAB & efisiensi biaya</div>
                    </div>
                    <span className="font-black text-sm text-slate-900">{scores.finansial}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scores.finansial}
                    onChange={(e) => setScores({ ...scores, finansial: Number(e.target.value) })}
                    className="w-full accent-purple-600"
                  />

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <div className="font-bold text-slate-800">4. Kesiapan Tim (Bobot 20%)</div>
                      <div className="text-[10px] text-slate-400">Kompak, pembagian kerja & komitmen</div>
                    </div>
                    <span className="font-black text-sm text-slate-900">{scores.tim}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scores.tim}
                    onChange={(e) => setScores({ ...scores, tim: Number(e.target.value) })}
                    className="w-full accent-purple-600"
                  />

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <div className="font-bold text-slate-800">5. Dampak Sosial & Kearifan Papua (Bobot 20%)</div>
                      <div className="text-[10px] text-slate-400">Pemanfaatan sagu, noken, kopi dll.</div>
                    </div>
                    <span className="font-black text-sm text-slate-900">{scores.dampak}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scores.dampak}
                    onChange={(e) => setScores({ ...scores, dampak: Number(e.target.value) })}
                    className="w-full accent-purple-600"
                  />
                </div>

                {/* Final Weighted Score Banner */}
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-purple-900">Skor Terbobot Akhir:</div>
                    <div className="text-[10px] text-purple-600">Rata-rata tertimbang kelima kriteria</div>
                  </div>
                  <div className="text-2xl font-black text-purple-900">
                    {finalScore} <span className="text-xs font-normal">/100</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Rekomendasi Keputusan</label>
                  <select
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="accepted">Rekomendasi Lolos Didanai (Accepted)</option>
                    <option value="revision">Perlu Revisi Dokumen / RAB (Revision)</option>
                    <option value="rejected">Belum Memenuhi Syarat (Rejected)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Catatan & Masukan Reviewer</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Berikan saran konkret perbaikan pengembangan produk atau pasar..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveScoringProposal(null)}
                    className="px-4 py-2 text-slate-600 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                  >
                    Simpan Nilai Reviewer
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
