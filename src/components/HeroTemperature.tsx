import React from 'react';
import { BeachSpot } from '../types';
import { Waves, ArrowUp, ArrowDown, ShieldCheck, ShieldAlert } from 'lucide-react';

interface HeroTemperatureProps {
  beach: BeachSpot;
  tempUnit: 'C' | 'F';
}

export const HeroTemperature: React.FC<HeroTemperatureProps> = ({ beach, tempUnit }) => {
  const convertTemp = (celsius: number) => {
    if (tempUnit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return celsius;
  };

  const displayTemp = convertTemp(beach.airTemp);
  const displayFeelsLike = convertTemp(beach.feelsLike);
  const displayHigh = convertTemp(beach.hourly.reduce((max, h) => Math.max(max, h.temp), beach.airTemp));
  const displayLow = convertTemp(beach.hourly.reduce((min, h) => Math.min(min, h.temp), beach.airTemp));

  const flagColors = {
    green: 'bg-emerald-500/30 text-emerald-100 border-emerald-400/40',
    yellow: 'bg-amber-500/30 text-amber-100 border-amber-400/40',
    red: 'bg-rose-500/30 text-rose-100 border-rose-400/40',
  };

  const flagLabels = {
    green: 'Banderín Verde: Mar Apto',
    yellow: 'Banderín Amarillo: Precaución',
    red: 'Banderín Rojo: Mar Peligroso',
  };

  return (
    <section className="text-center pt-2 pb-6 px-4 max-w-3xl mx-auto flex flex-col items-center select-none">
      {/* City / Beach Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight drop-shadow-md">
        {beach.name}
      </h1>
      <p className="text-sm sm:text-base text-white/75 font-normal mt-1 tracking-wide drop-shadow">
        {beach.subName} • {beach.region}
      </p>

      {/* Main Ultra-Light Temperature Display (Apple Weather Style) */}
      <div className="relative my-1 flex items-start justify-center">
        <span className="temp-hero leading-none">
          {displayTemp}
        </span>
        <span className="text-4xl sm:text-6xl font-extralight text-white/90 mt-2 sm:mt-4 ml-1">
          °
        </span>
      </div>

      {/* Condition Description */}
      <div className="text-lg sm:text-xl font-normal text-white/95 capitalize tracking-tight drop-shadow">
        {beach.conditionText}
      </div>

      {/* High / Low & Feels Like */}
      <div className="flex items-center gap-3 text-sm text-white/80 font-normal mt-2 drop-shadow">
        <span className="flex items-center gap-0.5">
          <ArrowUp className="w-3.5 h-3.5 text-white/70" />
          Máx: {displayHigh}°
        </span>
        <span className="text-white/40">•</span>
        <span className="flex items-center gap-0.5">
          <ArrowDown className="w-3.5 h-3.5 text-white/70" />
          Mín: {displayLow}°
        </span>
        <span className="text-white/40">•</span>
        <span>Sensación: {displayFeelsLike}°</span>
      </div>

      {/* Quick Water & Flag Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-4">
        {/* Sea Temp Badge */}
        <div className="glass-clear-sm px-5 py-2.5 rounded-full flex items-center justify-center gap-2 text-xs font-medium text-white shadow-sm border border-white/20 min-h-[38px]">
          <Waves className="w-4 h-4 text-cyan-300 shrink-0" />
          <span>Agua del Mar: <strong className="font-semibold text-cyan-200">{beach.waterTemp}°C</strong> <span className="text-white/85">({beach.waterCondition})</span></span>
        </div>

        {/* Safety Flag Badge */}
        <div className={`px-5 py-2.5 rounded-full border flex items-center justify-center gap-2 text-xs font-medium shadow-sm backdrop-blur-md min-h-[38px] ${flagColors[beach.safetyFlag]}`}>
          {beach.safetyFlag === 'green' ? (
            <ShieldCheck className="w-4 h-4 shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 shrink-0" />
          )}
          <span>{flagLabels[beach.safetyFlag]}</span>
        </div>
      </div>
    </section>
  );
};
