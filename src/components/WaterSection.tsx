import React from 'react';
import { BeachSpot } from '../types';
import { Waves, ArrowUpRight, Clock, ShieldCheck, ShieldAlert, Sparkles, Navigation, TrendingUp, TrendingDown } from 'lucide-react';

interface WaterSectionProps {
  beach: BeachSpot;
}

export const WaterSection: React.FC<WaterSectionProps> = ({ beach }) => {
  const { tides, wave, waterTemp, waterCondition, safetyFlag, safetyMessage, bestSwimWindow, bestSurfWindow } = beach;

  // Calculate percentage of tide curve progress for visualization
  const currentHeight = tides.currentLevel;
  const maxTide = Math.max(...tides.points.map((p) => p.height), 2.0);
  const minTide = Math.min(...tides.points.map((p) => p.height), 0.1);
  const tidePercentage = Math.round(((currentHeight - minTide) / (maxTide - minTide)) * 100);

  return (
    <div className="glass-clear p-6 sm:p-7 relative overflow-hidden text-white mb-6">
      {/* Header with Monochromatic Line Icon */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15 gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-cyan-400/20 border border-cyan-300/30 flex items-center justify-center text-cyan-200 shrink-0">
            <Waves className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="section-title truncate">1. Estado del Agua</h2>
            <p className="label-secondary text-xs truncate">Mareas • Oleaje • Temperatura del Mar</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-normal text-white/90 whitespace-nowrap shrink-0 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
          <span className="whitespace-nowrap">{tides.trend === 'rising' ? 'Marea Subiendo' : 'Marea Bajando'}</span>
          {tides.trend === 'rising' ? (
            <TrendingUp className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
          )}
        </div>
      </div>

      {/* Grid: Tides & Wave Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module A: Tides (Mareas) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/90">Curva de Mareas en Vivo</span>
            <span className="text-xs text-white/60">
              Próxima: <strong className="text-white font-medium">{tides.nextTideType}</strong> ({tides.nextTideTime})
            </span>
          </div>

          {/* Tide Level Progress Bar */}
          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-3">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-white/65 block">Nivel Actual de Marea</span>
                <span className="text-2xl font-light tracking-tight text-white">{currentHeight.toFixed(1)} m</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-white/65 block">Estado</span>
                <span className="text-xs font-medium text-cyan-200">
                  {tidePercentage}% Pleamar
                </span>
              </div>
            </div>

            {/* Visual Tide Progress Curve / Bar */}
            <div className="relative w-full h-3 bg-black/20 rounded-full overflow-hidden border border-white/10">
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.max(10, Math.min(100, tidePercentage))}%` }}
              />
            </div>

            {/* Tide Points Timetable */}
            <div className="grid grid-cols-4 gap-1 pt-1 text-center border-t border-white/10">
              {tides.points.map((pt, index) => (
                <div key={index} className="p-1">
                  <span className="text-[10px] text-white/60 block uppercase">{pt.type}</span>
                  <span className="text-xs font-semibold text-white block">{pt.time}</span>
                  <span className="text-[10px] text-white/70 block">{pt.height}m</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module B: Oleaje (Waves) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-white/90 truncate">Reporte de Oleaje & Surf</span>
            <span className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-cyan-400/25 text-cyan-100 border border-cyan-300/40 font-medium whitespace-nowrap shrink-0">
              {wave.suitability} para Baño
            </span>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 grid grid-cols-3 gap-3">
            <div>
              <span className="text-xs text-white/65 block">Altura Olas</span>
              <span className="text-2xl font-light text-white">{wave.height} m</span>
              <span className="text-[11px] text-white/60 block mt-0.5">Swell {wave.swellDirection}</span>
            </div>

            <div>
              <span className="text-xs text-white/65 block">Dirección</span>
              <div className="flex items-center gap-1 mt-1">
                <Navigation className="w-4 h-4 text-cyan-300" style={{ transform: 'rotate(135deg)' }} />
                <span className="text-xl font-light text-white">{wave.direction}</span>
              </div>
              <span className="text-[11px] text-white/60 block mt-0.5">Mar Abierto</span>
            </div>

            <div>
              <span className="text-xs text-white/65 block">Período</span>
              <span className="text-2xl font-light text-white">{wave.period} s</span>
              <span className="text-[11px] text-cyan-200 block mt-0.5">Surf: {wave.surfScore}/10</span>
            </div>
          </div>

          {/* Water Temp Summary */}
          <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-xs">
            <span className="text-white/75 font-normal">Temperatura del Agua:</span>
            <span className="text-white font-medium">{waterTemp}°C • {waterCondition}</span>
          </div>
        </div>
      </div>

      {/* Safety & Best Windows Footer */}
      <div className="mt-5 pt-4 border-t border-white/15 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Flag Status */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/10">
          {safetyFlag === 'green' ? (
            <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0" />
          )}
          <span className="text-white/85">{safetyMessage}</span>
        </div>

        {/* Best Swim & Surf Window */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/10">
          <Clock className="w-4 h-4 text-cyan-300 shrink-0" />
          <div className="text-white/85">
            <span className="block"><strong className="text-white">Mejor hora baño:</strong> {bestSwimWindow}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
