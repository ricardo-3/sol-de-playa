import React from 'react';
import { BeachSpot } from '../types';
import { Sun, Sunrise, Sunset, Shield, AlertTriangle, Clock, Sparkles } from 'lucide-react';

interface SunSectionProps {
  beach: BeachSpot;
}

export const SunSection: React.FC<SunSectionProps> = ({ beach }) => {
  const { uv, sun } = beach;

  // Determine UV color indicator class
  const getUvBadgeClass = (val: number) => {
    if (val < 3) return 'bg-emerald-500/30 text-emerald-100 border-emerald-400/30';
    if (val < 6) return 'bg-yellow-500/30 text-yellow-100 border-yellow-400/30';
    if (val < 8) return 'bg-orange-500/30 text-orange-100 border-orange-400/30';
    if (val < 11) return 'bg-rose-500/30 text-rose-100 border-rose-400/30';
    return 'bg-purple-500/30 text-purple-100 border-purple-400/30';
  };

  // UV bar percentage width
  const uvPercent = Math.min(100, Math.round((uv.value / 12) * 100));

  return (
    <div className="glass-clear p-6 sm:p-7 relative overflow-hidden text-white mb-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15 gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-200 shrink-0">
            <Sun className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-medium text-white/95 uppercase tracking-tight truncate">2. Radiación Solar & Sol</h2>
            <p className="text-[10px] sm:text-[11px] text-white/60 font-normal truncate">Índice UV • Salida & Puesta del Sol • Protección</p>
          </div>
        </div>

        <div className={`px-2.5 py-1 rounded-full text-[11px] font-medium border backdrop-blur-md whitespace-nowrap shrink-0 ${getUvBadgeClass(uv.value)}`}>
          UV {uv.value} • {uv.levelText}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module A: UV Index & Protection Advice */}
        <div className="space-y-4">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-3">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-white/65 block">Índice UV Máximo Hoy</span>
                <span className="text-3xl font-light text-white">{uv.value}</span>
                <span className="text-xs text-amber-200 block font-normal">{uv.levelText}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-white/65 block">Pico Solar</span>
                <span className="text-xs text-white font-medium">{uv.peakTime}</span>
              </div>
            </div>

            {/* Multi-color UV Spectrum Gauge */}
            <div className="space-y-1">
              <div className="relative w-full h-2.5 bg-black/25 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-yellow-400 via-orange-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${uvPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-white/50 px-0.5">
                <span>0 (Bajo)</span>
                <span>6 (Alto)</span>
                <span>11+ (Extremo)</span>
              </div>
            </div>
          </div>

          {/* Protection Advice Box */}
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-400/25 flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div className="text-xs text-white/90 space-y-1">
              <span className="font-medium text-amber-200 block">Recomendación Solar</span>
              <p className="leading-relaxed text-white/80">{uv.protectionAdvice}</p>
            </div>
          </div>
        </div>

        {/* Module B: Sunrise / Sunset Arc Visualizer */}
        <div className="space-y-4">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
              <span className="text-white/70">Duración del Sol</span>
              <span className="text-white font-medium">{sun.daylightHours}</span>
            </div>

            {/* Sun Arc Curve Graphic */}
            <div className="relative my-4 flex items-center justify-center">
              <svg className="w-full max-w-[240px] h-24 overflow-visible" viewBox="0 0 200 90">
                {/* Arc path */}
                <path
                  d="M 10 80 Q 100 0 190 80"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Horizon line */}
                <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
                {/* Sun icon along arc */}
                <circle cx="100" cy="22" r="8" fill="#FBBF24" />
                <circle cx="100" cy="22" r="14" fill="#FBBF24" opacity="0.3" />
              </svg>
            </div>

            {/* Timings */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-white/10">
              <div className="p-1">
                <span className="text-[10px] text-white/60 block flex items-center justify-center gap-1">
                  <Sunrise className="w-3 h-3 text-amber-300" /> Amanecer
                </span>
                <span className="font-semibold text-white mt-0.5 block">{sun.sunrise}</span>
              </div>

              <div className="p-1">
                <span className="text-[10px] text-orange-200 block flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-orange-300" /> Golden Hour
                </span>
                <span className="font-semibold text-white mt-0.5 block">{sun.goldenHourStart}</span>
              </div>

              <div className="p-1">
                <span className="text-[10px] text-white/60 block flex items-center justify-center gap-1">
                  <Sunset className="w-3 h-3 text-rose-300" /> Atardecer
                </span>
                <span className="font-semibold text-white mt-0.5 block">{sun.sunset}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
