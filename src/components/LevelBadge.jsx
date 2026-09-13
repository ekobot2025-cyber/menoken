import React from 'react';
import { Award, Zap, ShieldCheck, TrendingUp, Rocket } from 'lucide-react';
import { getGroupLevel } from '../lib/storage';

export const LevelBadge = ({ group, levelOverride, showIcon = true }) => {
  const levelInfo = levelOverride || getGroupLevel(group);

  const getIcon = () => {
    switch (levelInfo.level) {
      case 5:
        return <Rocket className="w-3.5 h-3.5 text-purple-600" />;
      case 4:
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />;
      case 3:
        return <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />;
      case 2:
        return <Zap className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Award className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-extrabold border tracking-wide shadow-xs ${levelInfo.color}`}
      title="Akreditasi Tingkat Kematangan Usaha Mahasiswa (Jakpreneur Style Leveling)"
    >
      {showIcon && getIcon()}
      {levelInfo.label}
    </span>
  );
};
