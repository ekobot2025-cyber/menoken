// LocalStorage and State Manager for MENOKEN
import {
  INITIAL_MASTER_DATA,
  INITIAL_PROGRAMS,
  INITIAL_GROUPS,
  INITIAL_PRODUCTS,
  INITIAL_PROPOSALS,
  INITIAL_TRANSACTIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_LOGBOOKS,
  INITIAL_PARTNERSHIP_INQUIRIES
} from './seedData';

const STORAGE_KEYS = {
  MASTER: 'menoken_master_data_v1',
  PROGRAMS: 'menoken_programs_v1',
  GROUPS: 'menoken_groups_v1',
  PRODUCTS: 'menoken_products_v1',
  PROPOSALS: 'menoken_proposals_v1',
  TRANSACTIONS: 'menoken_transactions_v1',
  AUDIT: 'menoken_audit_logs_v1',
  ACTIVE_ROLE: 'menoken_active_role_v1',
  LOGBOOKS: 'menoken_logbooks_v1',
  PARTNERSHIPS: 'menoken_partnerships_v1'
};

export const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.GROUPS)) {
    localStorage.setItem(STORAGE_KEYS.MASTER, JSON.stringify(INITIAL_MASTER_DATA));
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(INITIAL_PROGRAMS));
    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(INITIAL_GROUPS));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(INITIAL_PROPOSALS));
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(INITIAL_AUDIT_LOGS,
  INITIAL_LOGBOOKS,
  INITIAL_PARTNERSHIP_INQUIRIES));
  }
};

// Safe JSON getter
const getItem = (key, defaultVal) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch (e) {
    console.error('Failed to parse storage item:', key, e);
    return defaultVal;
  }
};

const setItem = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new Event('menoken-storage-update'));
  } catch (e) {
    console.error('Failed to save to storage:', key, e);
  }
};

// Master Data
export const getMasterData = () => {
  const data = getItem(STORAGE_KEYS.MASTER, INITIAL_MASTER_DATA);
  const initialTotalProdi = INITIAL_MASTER_DATA.faculties.reduce((sum, f) => sum + (f.programs?.length || 0), 0);
  const currentTotalProdi = (data?.faculties || []).reduce((sum, f) => sum + (f.programs?.length || 0), 0);

  if (!data || !data.faculties || currentTotalProdi < initialTotalProdi) {
    const updated = {
      ...(data || {}),
      faculties: INITIAL_MASTER_DATA.faculties
    };
    setItem(STORAGE_KEYS.MASTER, updated);
    return updated;
  }
  return data;
};
export const saveMasterData = (data) => {
  setItem(STORAGE_KEYS.MASTER, data);
  addAuditLog('Pembaruan Master Data Sistem', 'Admin mengubah konfigurasi fakultas/prodi/bobot');
};

// Programs
export const getPrograms = () => getItem(STORAGE_KEYS.PROGRAMS, INITIAL_PROGRAMS);
export const saveProgram = (program) => {
  const progs = getPrograms();
  const idx = progs.findIndex(p => p.id === program.id);
  if (idx >= 0) progs[idx] = program;
  else progs.unshift(program);
  setItem(STORAGE_KEYS.PROGRAMS, progs);
};

// Groups
export const getGroups = () => getItem(STORAGE_KEYS.GROUPS, INITIAL_GROUPS);
export const getGroupById = (id) => getGroups().find(g => g.id === id);
export const saveGroup = (group) => {
  const groups = getGroups();
  const idx = groups.findIndex(g => g.id === group.id);
  if (idx >= 0) groups[idx] = group;
  else groups.unshift(group);
  setItem(STORAGE_KEYS.GROUPS, groups);
  addAuditLog('Simpan Profil Kelompok', `Pembaruan data profil kelompok ${group.brand || group.name}`);
};

// Products
export const getProducts = () => getItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
export const saveProduct = (product) => {
  const products = getProducts();
  const idx = products.findIndex(p => p.id === product.id);
  if (idx >= 0) products[idx] = product;
  else products.unshift(product);
  setItem(STORAGE_KEYS.PRODUCTS, products);
  addAuditLog('Simpan Produk', `Pembaruan katalog produk: ${product.name}`);
};
export const deleteProduct = (id) => {
  const products = getProducts().filter(p => p.id !== id);
  setItem(STORAGE_KEYS.PRODUCTS, products);
  addAuditLog('Hapus Produk', `Produk ID ${id} dihapus dari katalog`);
};

// Proposals
export const getProposals = () => getItem(STORAGE_KEYS.PROPOSALS, INITIAL_PROPOSALS);
export const saveProposal = (proposal) => {
  const proposals = getProposals();
  const idx = proposals.findIndex(p => p.id === proposal.id);
  if (idx >= 0) proposals[idx] = proposal;
  else proposals.unshift(proposal);
  setItem(STORAGE_KEYS.PROPOSALS, proposals);
  addAuditLog('Pengajuan/Update Proposal', `Proposal ${proposal.title} diperbarui (Status: ${proposal.status})`);
};

// Transactions & POS
export const getTransactions = () => getItem(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
export const addTransaction = (trx) => {
  const trxs = getTransactions();
  trxs.unshift(trx);
  setItem(STORAGE_KEYS.TRANSACTIONS, trxs);

  // Auto-sync to Group monthly revenue!
  const groups = getGroups();
  const grp = groups.find(g => g.id === trx.groupId);
  if (grp) {
    if (!grp.monthlyRevenues) grp.monthlyRevenues = [];
    const currentMonth = 'Apr 2026';
    let mRev = grp.monthlyRevenues.find(m => m.month === currentMonth);
    if (!mRev) {
      mRev = { month: currentMonth, gross: 0, expense: 0, net: 0, units: 0 };
      grp.monthlyRevenues.push(mRev);
    }
    mRev.gross += trx.totalAmount;
    mRev.net += Math.round(trx.totalAmount * 0.5); // estimate profit
    const unitsBought = trx.items.reduce((sum, it) => sum + (it.qty || 1), 0);
    mRev.units += unitsBought;
    
    // update group metrics
    if (!grp.growthMetrics) grp.growthMetrics = {};
    grp.growthMetrics.avgMonthlyRevenue = Math.round(
      grp.monthlyRevenues.reduce((a, b) => a + b.gross, 0) / grp.monthlyRevenues.length
    );
    grp.growthMetrics.totalSoldUnits = (grp.growthMetrics.totalSoldUnits || 0) + unitsBought;

    // Recalculate Growth Score
    let score = 50;
    if (grp.legalities?.some(l => l.status === 'verified')) score += 15;
    if (grp.monthlyRevenues.length > 2) score += 15;
    if (grp.growthMetrics.avgMonthlyRevenue > 10000000) score += 10;
    grp.growthScore = Math.min(100, score);

    saveGroup(grp);
  }
  addAuditLog('Transaksi Kasir Baru', `Transaksi kasir ${trx.id} tercatat Rp${trx.totalAmount.toLocaleString('id-ID')}`);
};

// Audit Trail
export const getAuditLogs = () => getItem(STORAGE_KEYS.AUDIT, INITIAL_AUDIT_LOGS,
  INITIAL_LOGBOOKS,
  INITIAL_PARTNERSHIP_INQUIRIES);
export const addAuditLog = (action, details, user = 'Pengguna Aktif') => {
  const logs = getAuditLogs();
  const newLog = {
    id: 'log-' + Date.now(),
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    user,
    action,
    details
  };
  logs.unshift(newLog);
  // keep max 100 logs
  setItem(STORAGE_KEYS.AUDIT, logs.slice(0, 100));
};

// Backup & Reset Utilities
export const exportDataJSON = () => {
  const data = {
    master: getMasterData(),
    programs: getPrograms(),
    groups: getGroups(),
    products: getProducts(),
    proposals: getProposals(),
    transactions: getTransactions(),
    audit: getAuditLogs(),
    exportDate: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
};

export const importDataJSON = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    if (data.groups) setItem(STORAGE_KEYS.GROUPS, data.groups);
    if (data.products) setItem(STORAGE_KEYS.PRODUCTS, data.products);
    if (data.master) setItem(STORAGE_KEYS.MASTER, data.master);
    if (data.programs) setItem(STORAGE_KEYS.PROGRAMS, data.programs);
    if (data.proposals) setItem(STORAGE_KEYS.PROPOSALS, data.proposals);
    if (data.transactions) setItem(STORAGE_KEYS.TRANSACTIONS, data.transactions);
    addAuditLog('Import Database', 'Database berhasil diimpor dari file cadangan JSON');
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
};


// E-Logbook & SKS MBKM (Simbelmawa Style)
export const getLogbooks = () => getItem(STORAGE_KEYS.LOGBOOKS, INITIAL_LOGBOOKS);
export const saveLogbook = (logbook) => {
  const logs = getLogbooks();
  const idx = logs.findIndex(l => l.id === logbook.id);
  if (idx >= 0) logs[idx] = logbook;
  else logs.unshift(logbook);
  setItem(STORAGE_KEYS.LOGBOOKS, logs);
  addAuditLog('Input E-Logbook Wirausaha', `Logbook minggu ke-${logbook.week} disimpan (${logbook.hours} jam aktivitas)`);
};

// Investor & Mitra Inquiries (F6S / Gust Style)
export const getPartnershipInquiries = () => getItem(STORAGE_KEYS.PARTNERSHIPS, INITIAL_PARTNERSHIP_INQUIRIES);
export const addPartnershipInquiry = (inquiry) => {
  const inqs = getPartnershipInquiries();
  inqs.unshift(inquiry);
  setItem(STORAGE_KEYS.PARTNERSHIPS, inqs);
  addAuditLog('Pengajuan Kemitraan Baru', `Mitra ${inquiry.institution || inquiry.partnerName} mengajukan minat kemitraan`);
};

// Jakpreneur Style Leveling Calculator (Level 1 - 5)
export const getGroupLevel = (group) => {
  if (!group) return { level: 1, label: 'Level 1: Ide & Proposal', color: 'bg-slate-100 text-slate-700 border-slate-300' };

  const hasNIB = group.legalities?.some(l => l.type === 'NIB' && l.status === 'verified');
  const hasRevenue = group.monthlyRevenues && group.monthlyRevenues.length >= 2;
  const isHighRevenue = group.growthMetrics?.avgMonthlyRevenue >= 15000000;
  const hasEmployees = (group.growthMetrics?.localEmployees || 0) >= 3;

  if (isHighRevenue && hasNIB && hasEmployees) {
    return { level: 5, label: 'Level 5: Scale-Up & B2B Ready', color: 'bg-purple-100 text-purple-800 border-purple-300' };
  }
  if (hasRevenue && hasNIB) {
    return { level: 4, label: 'Level 4: Pasar Aktif & Omzet Rutin', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  }
  if (hasNIB) {
    return { level: 3, label: 'Level 3: Berlegalitas Resmi', color: 'bg-blue-100 text-blue-800 border-blue-300' };
  }
  if (group.funding?.received > 0) {
    return { level: 2, label: 'Level 2: Terinkubasi & Didanai', color: 'bg-amber-100 text-amber-800 border-amber-300' };
  }
  return { level: 1, label: 'Level 1: Ide & Proposal', color: 'bg-slate-100 text-slate-700 border-slate-300' };
};

export const resetToDefaultSeed = () => {
  localStorage.setItem(STORAGE_KEYS.MASTER, JSON.stringify(INITIAL_MASTER_DATA));
  localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(INITIAL_PROGRAMS));
  localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(INITIAL_GROUPS));
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(INITIAL_PROPOSALS));
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
  localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(INITIAL_AUDIT_LOGS,
  INITIAL_LOGBOOKS,
  INITIAL_PARTNERSHIP_INQUIRIES));
  window.dispatchEvent(new Event('menoken-storage-update'));
};
