import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGroups } from '../lib/storage';

export const AuthContext = createContext();

export const DUMMY_ACCOUNTS = [
  {
    key: 'admin',
    username: 'admin',
    email: 'admin@uncen.ac.id',
    password: 'Password123',
    name: 'Admin UPA',
    role: 'admin',
    badge: 'Admin',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    avatar: 'AD',
    avatarImg: '/noken_pixar_3d.png',
    defaultTab: 'admin_dashboard'
  },
  {
    key: 'student',
    username: 'student',
    email: 'student@uncen.ac.id',
    password: 'Password123',
    name: 'Mahasiswa Preneur',
    nim: '2022011044001',
    role: 'student',
    badge: 'Student',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    avatar: 'MP',
    avatarImg: '/maskot_mahasiswa_3d.png',
    defaultTab: 'student_dashboard'
  },
  {
    key: 'mentor',
    username: 'mentor',
    email: 'mentor@uncen.ac.id',
    password: 'Password123',
    name: 'Mentor Pendamping UMKM',
    role: 'mentor',
    badge: 'Mentor',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    avatar: 'MT',
    avatarImg: '/maskot_mentor_3d.png',
    defaultTab: 'admin_mentoring'
  },
  {
    key: 'superadmin',
    username: 'superadmin',
    email: 'superadmin@uncen.ac.id',
    password: 'Password123',
    name: 'Superadmin',
    role: 'superadmin',
    badge: 'Superadmin',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    avatar: 'SA',
    avatarImg: '/noken_pixar_3d.png',
    defaultTab: 'admin_dashboard'
  },
  {
    key: 'leader',
    username: 'leader',
    email: 'leader@uncen.ac.id',
    password: 'Password123',
    name: 'Leader Rektorat',
    role: 'leadership',
    badge: 'Leader',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    avatar: 'LD',
    avatarImg: '/noken_pixar_3d.png',
    defaultTab: 'leadership_dashboard'
  },
  {
    key: 'reviewer',
    username: 'reviewer',
    email: 'reviewer@uncen.ac.id',
    password: 'Password123',
    name: 'Reviewer Dikti',
    role: 'reviewer',
    badge: 'Reviewer',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    avatar: 'RV',
    avatarImg: '/maskot_mentor_3d.png',
    defaultTab: 'reviewer_dashboard'
  }
];

export const ROLES = {
  PUBLIC: { id: 'public', label: 'Pengunjung Publik', badgeColor: 'bg-slate-100 text-slate-700' },
  STUDENT: { id: 'student', label: 'Mahasiswa / Wirausaha', badgeColor: 'bg-emerald-100 text-emerald-800' },
  REVIEWER: { id: 'reviewer', label: 'Reviewer / Juri', badgeColor: 'bg-purple-100 text-purple-800' },
  ADMIN: { id: 'admin', label: 'Admin UPA Kewirausahaan', badgeColor: 'bg-blue-100 text-blue-800' },
  LEADERSHIP: { id: 'leadership', label: 'Pimpinan Universitas / Rektorat', badgeColor: 'bg-amber-100 text-amber-800' },
  SUPERADMIN: { id: 'superadmin', label: 'Super Admin Sistem', badgeColor: 'bg-rose-100 text-rose-800' },
  MENTOR: { id: 'mentor', label: 'Mentor Kewirausahaan', badgeColor: 'bg-cyan-100 text-cyan-800' }
};

export const AuthProvider = ({ children }) => {
  // Current user state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('menoken_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default to admin for initial exploration or null
    return DUMMY_ACCOUNTS.find(a => a.key === 'admin') || null;
  });

  const [role, setRole] = useState(() => {
    return currentUser?.role || localStorage.getItem('menoken_current_role') || 'admin';
  });

  // For student role, current active group
  const [selectedGroupId, setSelectedGroupId] = useState('grp-wamena-kopi');
  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    const updateActiveGroup = () => {
      const groups = getGroups();
      const g = groups.find(x => x.id === selectedGroupId) || groups[0];
      setActiveGroup(g);
    };
    updateActiveGroup();
    window.addEventListener('menoken-storage-update', updateActiveGroup);
    return () => window.removeEventListener('menoken-storage-update', updateActiveGroup);
  }, [selectedGroupId]);

  const switchRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('menoken_current_role', newRole);
    const matchingAcc = DUMMY_ACCOUNTS.find(a => a.role === newRole);
    if (matchingAcc) {
      setCurrentUser(matchingAcc);
      localStorage.setItem('menoken_current_user', JSON.stringify(matchingAcc));
    }
  };

  const login = (identifier, password) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const acc = DUMMY_ACCOUNTS.find(
      a => (
        a.email.toLowerCase() === cleanId ||
        a.key.toLowerCase() === cleanId ||
        a.username.toLowerCase() === cleanId ||
        (cleanId === 'leadership' && a.key === 'leader') ||
        (cleanId === 'leader' && a.key === 'leader')
      ) && (
        cleanPass === 'Password123' ||
        cleanPass === a.password ||
        cleanPass === 'password'
      )
    );
    if (acc) {
      setCurrentUser(acc);
      setRole(acc.role);
      localStorage.setItem('menoken_current_user', JSON.stringify(acc));
      localStorage.setItem('menoken_current_role', acc.role);
      return { success: true, user: acc };
    }

    // Check if user is registered student
    const customUsers = JSON.parse(localStorage.getItem('menoken_registered_users') || '[]');
    const foundCustom = customUsers.find(
      u => (u.email.toLowerCase() === cleanId || u.name?.toLowerCase() === cleanId) &&
           (u.password === cleanPass || cleanPass === 'Password123')
    );
    if (foundCustom) {
      setCurrentUser(foundCustom);
      setRole(foundCustom.role || 'student');
      localStorage.setItem('menoken_current_user', JSON.stringify(foundCustom));
      localStorage.setItem('menoken_current_role', foundCustom.role || 'student');
      return { success: true, user: foundCustom };
    }

    return { success: false, message: 'Username / kata sandi salah. Password default: Password123' };
  };

  const loginAsDummy = (accountKey) => {
    const cleanKey = (accountKey || '').trim().toLowerCase();
    const acc = DUMMY_ACCOUNTS.find(
      a => a.key === cleanKey ||
           a.username === cleanKey ||
           (cleanKey === 'leadership' && a.key === 'leader') ||
           (cleanKey === 'leader' && a.key === 'leader')
    );
    if (acc) {
      setCurrentUser(acc);
      setRole(acc.role);
      localStorage.setItem('menoken_current_user', JSON.stringify(acc));
      localStorage.setItem('menoken_current_role', acc.role);
      return { success: true, user: acc };
    }
    return { success: false };
  };

  const logout = () => {
    setCurrentUser(null);
    setRole('public');
    localStorage.removeItem('menoken_current_user');
    localStorage.setItem('menoken_current_role', 'public');
  };

  const register = ({ name, email, password, faculty, nim }) => {
    const newUser = {
      key: 'custom_' + Date.now(),
      email,
      password,
      name,
      nim: nim || '2026' + Math.floor(100000 + Math.random() * 900000),
      role: 'student',
      title: 'Mahasiswa Wirausaha Uncen',
      faculty: faculty || 'Fakultas Ekonomi dan Bisnis',
      badge: 'Mahasiswa Baru',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      avatar: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'MH',
      defaultTab: 'student_dashboard'
    };

    const customUsers = JSON.parse(localStorage.getItem('menoken_registered_users') || '[]');
    customUsers.push(newUser);
    localStorage.setItem('menoken_registered_users', JSON.stringify(customUsers));

    setCurrentUser(newUser);
    setRole('student');
    localStorage.setItem('menoken_current_user', JSON.stringify(newUser));
    localStorage.setItem('menoken_current_role', 'student');
    return { success: true, user: newUser };
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        currentUser,
        role,
        roleInfo: ROLES[role?.toUpperCase()] || ROLES.ADMIN,
        switchRole,
        login,
        loginAsDummy,
        logout,
        register,
        dummyAccounts: DUMMY_ACCOUNTS,
        selectedGroupId,
        setSelectedGroupId,
        activeGroup,
        availableRoles: Object.values(ROLES)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
