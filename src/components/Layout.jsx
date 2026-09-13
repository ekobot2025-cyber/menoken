import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Layout = ({ children, activeTab, setActiveTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { roleInfo } = useAuth();
  const { isDark } = useTheme();

  // If on landing or login page, standalone full-bleed dual-sector view (no white navbar, no left sidebar)
  const isPublicStandalone = activeTab === 'landing' || activeTab === 'login';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0b1220] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {!isPublicStandalone && (
        <Navbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      {isPublicStandalone ? (
        // Full width container with NO left sidebar on landing & login
        <main className={`flex-1 overflow-y-auto transition-colors duration-200 ${
          isDark ? 'bg-[#0b1220]' : 'bg-slate-50'
        }`}>
          {children}
        </main>
      ) : (
        // Authenticated dashboard layout with left sidebar
        <div className={`flex-1 flex overflow-hidden transition-colors duration-200 ${
          isDark ? 'bg-[#0b1220] text-slate-100' : 'bg-slate-50 text-slate-900'
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
            <footer className={`mt-12 pt-6 border-t text-xs flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-500'
            }`}>
              <div className="flex items-center gap-2">
                <img src="/noken_pixar_3d.png" alt="MENOKEN" className="w-4 h-4 object-contain opacity-80" />
                <span>© 2026 MENOKEN • UPA Uncen Platform. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Made With ❤️ by</span>
                <a
                  href="https://www.linkedin.com/in/papedatimur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-cyan-500 hover:text-cyan-400 hover:underline transition"
                >
                  Enterdie
                </a>
              </div>
            </footer>
          </main>
        </div>
      )}
    </div>
  );
};
