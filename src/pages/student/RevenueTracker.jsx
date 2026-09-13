import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { getTransactions } from '../../lib/storage';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import {
  TrendingUp,
  Receipt,
  DollarSign,
  ArrowUpRight,
  Download
} from 'lucide-react';

export const RevenueTracker = () => {
  const { activeGroup } = useAuth();
  const transactions = getTransactions().filter(t => t.groupId === activeGroup?.id);

  const revenueData = activeGroup?.monthlyRevenues || [
    { month: 'Jan 2026', gross: 11200000, expense: 6200000, net: 5000000 },
    { month: 'Feb 2026', gross: 12800000, expense: 6800000, net: 6000000 },
    { month: 'Mar 2026', gross: 14500000, expense: 7100000, net: 7400000 },
    { month: 'Apr 2026', gross: 16000000, expense: 7800000, net: 8200000 }
  ];

  const totalGross = revenueData.reduce((sum, d) => sum + d.gross, 0);
  const totalNet = revenueData.reduce((sum, d) => sum + d.net, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-uncen-teal uppercase tracking-widest">
            Outcome & Perkembangan Ekonomi
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Pelacakan Omzet & Kinerja Finansial
          </h1>
          <p className="text-xs text-slate-500">
            Grafik pertumbuhan omzet bulanan dan riwayat transaksi kasir stan.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
        >
          <Download className="w-3.5 h-3.5" /> Unduh Laporan PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Akumulasi Omzet Kotor</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            Rp{totalGross.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +24% dibanding semester lalu
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Laba Bersih</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            Rp{totalNet.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Rata-rata Margin Laba: {Math.round((totalNet / (totalGross || 1)) * 100)}%
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Transaksi Kasir Tercatat</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {transactions.length} Transaksi
          </div>
          <div className="text-[11px] text-blue-600 mt-1 font-semibold">
            Terkoneksi POS Kasir Toko ID
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900">
          Tren Pertumbuhan Omzet vs Laba Bersih (2026)
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `Rp${(v/1000000).toFixed(0)}Jt`} />
              <Tooltip formatter={(val) => `Rp${val.toLocaleString('id-ID')}`} />
              <Bar dataKey="gross" name="Omzet Kotor" fill="#0F2C59" radius={[6, 6, 0, 0]} />
              <Bar dataKey="net" name="Laba Bersih" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-uncen-navy" />
          Riwayat Transaksi Kasir Mahasiswa
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                <th className="py-2.5 px-3">ID Transaksi</th>
                <th className="py-2.5 px-3">Waktu</th>
                <th className="py-2.5 px-3">Pelanggan</th>
                <th className="py-2.5 px-3">Metode</th>
                <th className="py-2.5 px-3 text-right">Total Pembayaran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Belum ada riwayat transaksi kasir.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{t.id}</td>
                    <td className="py-2.5 px-3 text-slate-500">{t.date}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700">{t.customerName}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-bold text-slate-700">
                        {t.paymentMethod}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-black text-slate-900">
                      Rp{t.totalAmount.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
