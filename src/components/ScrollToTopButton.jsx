import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ScrollToTopButton = ({ activeTab }) => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const scrollY = Math.max(
        window.scrollY || 0,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0
      );
      
      const mainEl = document.querySelector('main');
      const mainScroll = mainEl ? mainEl.scrollTop : 0;
      
      const currentScroll = Math.max(scrollY, mainScroll);
      if (currentScroll > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    checkScroll();

    window.addEventListener('scroll', checkScroll, { passive: true });
    
    // Also listen to main container scroll
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.addEventListener('scroll', checkScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', checkScroll);
      if (mainEl) {
        mainEl.removeEventListener('scroll', checkScroll);
      }
    };
  }, [activeTab]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Stack cleanly above the WhatsApp floating button on Market tab
  const isMarket = activeTab === 'market';
  const bottomPosition = isMarket ? 'bottom-24' : 'bottom-6';

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      className={`fixed right-6 ${bottomPosition} z-50 p-3 sm:p-3.5 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group flex items-center justify-center cursor-pointer border ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-4 pointer-events-none scale-90'
      } ${
        isDark
          ? 'bg-gradient-to-br from-emerald-500 to-teal-500 border-emerald-400/50 text-slate-950 shadow-emerald-500/30 hover:shadow-emerald-400/60'
          : 'bg-gradient-to-br from-emerald-600 to-teal-600 border-emerald-400/50 text-white shadow-emerald-600/30 hover:shadow-emerald-500/60'
      }`}
      title="Kembali ke halaman paling atas"
      aria-label="Kembali ke halaman paling atas"
    >
      <ChevronUp className="w-5 h-5 stroke-[2.8] group-hover:-translate-y-0.5 transition-transform duration-200" />
    </button>
  );
};
