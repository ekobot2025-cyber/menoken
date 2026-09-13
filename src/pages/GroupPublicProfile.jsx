import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getGroups, getProducts } from '../lib/storage';
import { LevelBadge } from '../components/LevelBadge';
import { LegalBadge } from '../components/LegalBadge';
import { GrowthScoreGauge } from '../components/GrowthScoreGauge';
import {
  User,
  Users,
  MapPin,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Package,
  Sparkles,
  HeartHandshake,
  Share2,
  CheckCircle2
} from 'lucide-react';

export const GroupPublicProfile = ({ groupIdOverride, setActiveTab }) => {
  const { selectedGroupId } = useAuth();
  const groups = getGroups();
  const currentGroupId = groupIdOverride || selectedGroupId || groups[0]?.id;
  const group = groups.find(g => g.id === currentGroupId) || groups[0];

  const products = getProducts().filter(p => p.groupId === group?.id);
  const [activeTab, setLocalTab] = useState('products');

  if (!group) {
    return <div className="p-8 text-center text-slate-500">Profil kelompok tidak ditemukan.</div>;
  }

  const handleOrderWa = (prod) => {
    const phone = prod.whatsappNumber || group.socials?.whatsapp || '6281248901122';
    const text = encodeURIComponent(
      `Halo *${group.brand || group.name}*, saya tertarik memesan produk:

*${prod.name}*
Harga: Rp${prod.price.toLocaleString('id-ID')}

Mohon info ketersediaan stok.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Group Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-36 bg-gradient-to-r from-uncen-navy via-uncen-teal to-amber-600 relative">
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <LevelBadge group={group} />
          </div>
        </div>

        <div className="p-6 sm:p-8 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-3xl bg-white p-2 shadow-lg border border-slate-200 flex items-center justify-center font-black text-3xl text-uncen-navy">
              {group.brand?.substring(0, 1) || 'M'}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {group.brand || group.name}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {group.facultyName} • {group.studyProgram}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`https://wa.me/${group.socials?.whatsapp || '6281248901122'}?text=Halo%20${encodeURIComponent(group.brand || group.name)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4" /> Hubungi WhatsApp
            </a>
          </div>
        </div>

        {/* Legalities Badges Strip */}
        <div className="px-6 sm:px-8 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-2">Legalitas Terverifikasi:</span>
          {group.legalities?.map((leg) => (
            <LegalBadge key={leg.type} type={leg.type} />
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setLocalTab('products')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'products'
              ? 'bg-uncen-navy text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Katalog Produk ({products.length})
        </button>
        <button
          onClick={() => setLocalTab('about')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'about'
              ? 'bg-uncen-navy text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Tentang Usaha & Tim Mahasiswa
        </button>
        <button
          onClick={() => setLocalTab('impact')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'impact'
              ? 'bg-uncen-navy text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Story of Impact & Kearifan Lokal
        </button>
      </div>

      {/* Tab Content: Products */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-100">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {prod.legalities?.map((leg) => (
                      <LegalBadge key={leg} type={leg} showIcon={false} />
                    ))}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{prod.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{prod.description}</p>
                  <div className="text-base font-black text-uncen-navy">
                    Rp{prod.price.toLocaleString('id-ID')}
                    <span className="text-xs font-normal text-slate-400">/{prod.unit}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => handleOrderWa(prod)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Pesan via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: About */}
      {activeTab === 'about' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs">
          <div>
            <h3 className="text-sm font-black text-slate-900 mb-2">Deskripsi & Nilai Tambah Usaha</h3>
            <p className="text-slate-600 leading-relaxed">{group.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-900 mb-3">Anggota Tim Wirausaha Mahasiswa</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.members?.map((m, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="font-bold text-slate-800">{m.name}</div>
                  <div className="text-[11px] text-amber-700 font-semibold">{m.role}</div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    NIM: {m.nim} • {m.prodi}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Impact */}
      {activeTab === 'impact' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="text-[10px] uppercase font-bold text-emerald-700">Bahan Baku Lokal Papua</div>
              <div className="text-2xl font-black text-emerald-900 mt-1">
                {group.growthMetrics?.localSourcingPercent || 90}%
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <div className="text-[10px] uppercase font-bold text-blue-700">Tenaga Kerja Tercipta</div>
              <div className="text-2xl font-black text-blue-900 mt-1">
                {group.growthMetrics?.localEmployees || 4} Orang
              </div>
            </div>
            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200">
              <div className="text-[10px] uppercase font-bold text-teal-700">Reduksi Limbah / Karbon</div>
              <div className="text-2xl font-black text-teal-900 mt-1">
                {group.growthMetrics?.carbonReductionKg || 250} kg
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-black text-slate-900">Perjalanan Transformasi Usaha</h3>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 leading-relaxed">
              <strong className="text-slate-900">Dampak Nyata:</strong>
              <p className="text-slate-600">{group.storyOfImpact?.impact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
