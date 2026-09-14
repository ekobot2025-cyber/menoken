import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Layout = ({ children, activeTab, setActiveTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { roleInfo } = useAuth();
  const { isDark } = useTheme();

  // If on landing, login, market, or partner hub, full width standalone container (no left sidebar, but WITH the unified top navbar!)
  const isPublicStandalone = activeTab === 'landing' || activeTab === 'login' || activeTab === 'market' || activeTab === 'partner_hub' || activeTab === 'group_public_profile';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#060c18] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Universal Top Navbar visible on EVERY page as requested by user */}
      <Navbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {isPublicStandalone ? (
        // Full width container with NO left sidebar on landing & login
        <main className={`flex-1 overflow-y-auto transition-colors duration-200 ${
          isDark ? 'bg-[#060c18]' : 'bg-slate-50'
        }`}>
          {children}
        </main>
      ) : (
        // Authenticated dashboard layout with left sidebar
        <div className={`flex-1 flex overflow-hidden transition-colors duration-200 ${
          isDark ? 'bg-[#060c18] text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}>
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
            <div className="max-w-7xl mx-auto space-y-6 w-full">
              {children}
            </div>

            {/* Dashboard Footer */}
            <footer className={`mt-12 pt-6 border-t text-[10.5px] sm:text-[11px] lg:text-[11.5px] flex flex-col lg:flex-row items-center justify-between gap-2.5 ${
              isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-500'
            }`}>
              <div className="flex items-center gap-2 whitespace-nowrap text-center lg:text-left">
                <img src="/noken_pixar_3d.png" alt="MENOKEN" className="w-3.5 h-3.5 object-contain opacity-80 shrink-0" />
                <span>© 2026 MENOKEN • Manajemen Ekosistem & Networking Kewirausahaan • UPA Uncen Platform. All rights reserved.</span>
              </div>
              <div className="flex items-center justify-center lg:justify-end gap-1.5 whitespace-nowrap text-[10px] sm:text-[10.5px] lg:text-[11px]">
                <span>by</span>
                <a
                  href="https://www.instagram.com/kurniawan_patma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-500 hover:text-amber-400 underline underline-offset-2 transition"
                >
                  Kurnia Patma
                </a>
                <span className="opacity-50">|</span>
                <span>UI/UX by</span>
                <a
                  href="https://www.linkedin.com/in/papedatimur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-cyan-500 hover:text-cyan-400 underline underline-offset-2 transition"
                >
                  Enterdie
                </a>
                <span className="opacity-50">•</span>
                <span className="opacity-80">Hak Cipta Dilindungi Undang-Undang</span>
              </div>
            </footer>
          </main>
        </div>
      )}
    </div>
  );
};
