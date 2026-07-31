import React, { useState } from 'react';
import { BeachSpot } from '../types';
import { Wind, Droplets, Gauge, Eye, Calendar, Clock, Compass, Sun, Cloud, CloudRain, SunMedium } from 'lucide-react';

interface WeatherSectionProps {
  beach: BeachSpot;
  tempUnit: 'C' | 'F';
}

export const WeatherSection: React.FC<WeatherSectionProps> = ({ beach, tempUnit }) => {
  const [activeTab, setActiveTab] = useState<'hourly' | 'daily'>('hourly');
  const { wind, humidity, pressure, visibility, hourly, daily } = beach;

  const convertTemp = (celsius: number) => {
    if (tempUnit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return celsius;
  };

  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('rain') || c.includes('lluvia')) return <CloudRain className="w-4 h-4 text-cyan-300" />;
    if (c.includes('parcial') || c.includes('nube')) return <Cloud className="w-4 h-4 text-slate-300" />;
    if (c.includes('despejado') || c.includes('atardecer')) return <SunMedium className="w-4 h-4 text-amber-300" />;
    return <Sun className="w-4 h-4 text-yellow-300" />;
  };

  return (
    <div className="glass-clear p-6 sm:p-7 relative overflow-hidden text-white mb-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15 gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-blue-400/20 border border-blue-300/30 flex items-center justify-center text-blue-200 shrink-0">
            <Wind className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-medium text-white/95 uppercase tracking-tight truncate">3. Viento & Clima General</h2>
            <p className="text-[10px] sm:text-[11px] text-white/60 font-normal truncate">Velocidad del Viento • Humedad • Pronóstico</p>
          </div>
        </div>

        {/* Tab Switcher for Hourly vs Daily Forecast */}
        <div className="flex items-center p-0.5 rounded-full bg-black/20 border border-white/15 text-xs shrink-0">
          <button
            onClick={() => setActiveTab('hourly')}
            className={`px-3 py-1 rounded-full transition cursor-pointer ${
              activeTab === 'hourly' ? 'bg-white/20 text-white font-medium' : 'text-white/60 hover:text-white'
            }`}
          >
            Por Hora
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-3 py-1 rounded-full transition cursor-pointer ${
              activeTab === 'daily' ? 'bg-white/20 text-white font-medium' : 'text-white/60 hover:text-white'
            }`}
          >
            5 Días
          </button>
        </div>
      </div>

      {/* Wind & Atmosphere Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {/* Wind Speed & Direction */}
        <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
          <div className="flex items-center justify-between text-white/65 text-xs mb-1">
            <span>Viento</span>
            <Wind className="w-3.5 h-3.5 text-blue-300" />
          </div>
          <div className="text-xl font-light text-white">{wind.speed} km/h</div>
          <div className="text-[11px] text-white/70 mt-1 flex items-center gap-1">
            <Compass className="w-3 h-3 text-cyan-300" style={{ transform: `rotate(${wind.directionDeg}deg)` }} />
            <span>{wind.directionText} (Ráfagas {wind.gusts})</span>
          </div>
        </div>

        {/* Offshore / Onshore Indicator */}
        <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
          <div className="text-white/65 text-xs mb-1">Tipo de Viento</div>
          <div className="text-sm font-medium text-cyan-200 mt-1">
            {wind.isOnshore ? 'Onshore (Hacia Costa)' : 'Offshore (Terral)'}
          </div>
          <div className="text-[11px] text-white/60 mt-1">
            {wind.isOnshore ? 'Crea marejada' : 'Ideal para surf & baño'}
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
          <div className="flex items-center justify-between text-white/65 text-xs mb-1">
            <span>Humedad</span>
            <Droplets className="w-3.5 h-3.5 text-cyan-300" />
          </div>
          <div className="text-xl font-light text-white">{humidity}%</div>
          <div className="text-[11px] text-white/60 mt-1">Ambiente de Playa</div>
        </div>

        {/* Pressure & Visibility */}
        <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
          <div className="flex items-center justify-between text-white/65 text-xs mb-1">
            <span>Presión / Visib.</span>
            <Gauge className="w-3.5 h-3.5 text-indigo-300" />
          </div>
          <div className="text-sm font-medium text-white mt-1">{pressure} hPa</div>
          <div className="text-[11px] text-white/60 mt-1">Visibilidad: {visibility} km</div>
        </div>
      </div>

      {/* Forecast Section */}
      {activeTab === 'hourly' ? (
        <div className="space-y-2">
          <div className="text-xs text-white/70 font-medium mb-2 flex items-center justify-between">
            <span>Pronóstico por Hora</span>
            <span>Temp. / Olas / UV</span>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
            {hourly.map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-24 p-3 rounded-2xl bg-white/10 border border-white/15 text-center flex flex-col items-center gap-1.5 hover:bg-white/15 transition"
              >
                <span className="text-xs text-white/70 font-medium">{item.time}</span>
                {getWeatherIcon(item.condition)}
                <span className="text-lg font-light text-white">{convertTemp(item.temp)}°</span>
                <div className="text-[10px] text-white/60 border-t border-white/10 pt-1 w-full space-y-0.5">
                  <div className="text-cyan-200">🌊 {item.waveHeight}m</div>
                  <div className="text-amber-200">☀️ UV {item.uvIndex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-xs text-white/70 font-medium mb-2">Pronóstico 5 Días de Playa</div>
          <div className="space-y-2">
            {daily.map((dayItem, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/10 text-xs text-white"
              >
                <div className="w-16 font-semibold">{dayItem.day}</div>
                <div className="flex items-center gap-2 text-white/80">
                  {getWeatherIcon(dayItem.condition)}
                  <span className="capitalize">{dayItem.condition}</span>
                </div>
                <div className="text-cyan-200">🌊 Olas: {dayItem.waveHeight}m</div>
                <div className="text-white/70">Marea Alta: {dayItem.highTide}</div>
                <div className="font-medium text-right">
                  <span>{convertTemp(dayItem.highTemp)}°</span>
                  <span className="text-white/50 ml-1.5">{convertTemp(dayItem.lowTemp)}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
