import React, { useState } from 'react';
import { beachesData } from './data/beachesData';
import { TimeOfDay } from './types';
import { BackgroundLayer } from './components/BackgroundLayer';
import { CustomDropdown } from './components/CustomDropdown';
import { HeroTemperature } from './components/HeroTemperature';
import { WaterSection } from './components/WaterSection';
import { SunSection } from './components/SunSection';
import { WeatherSection } from './components/WeatherSection';
import { LiveStatusBadge } from './components/LiveStatusBadge';
import { useLiveBeachData } from './hooks/useLiveBeachData';
import { Instagram } from 'lucide-react';

export default function App() {
  const [selectedBeachId, setSelectedBeachId] = useState<string>(beachesData[0].id);
  const [overrideTime, setOverrideTime] = useState<TimeOfDay | 'auto'>('auto');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');

  const baseBeach = beachesData.find((b) => b.id === selectedBeachId) ?? beachesData[0];
  const { beach: liveBeach, isLoading, isLive, error } = useLiveBeachData(baseBeach);

  const toggleTempUnit = () => {
    setTempUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  return (
    <div className="min-h-screen relative font-sans text-white pb-12 select-none">
      {/* Dynamic Photographic Background Layer */}
      <BackgroundLayer
        beach={liveBeach}
        overrideTime={overrideTime}
      />

      {/* Top Header / Custom Dropdown Component */}
      <CustomDropdown
        beaches={beachesData}
        selectedBeach={baseBeach}
        onSelectBeach={(b) => setSelectedBeachId(b.id)}
        overrideTime={overrideTime}
        onSelectOverrideTime={setOverrideTime}
        tempUnit={tempUnit}
        onToggleTempUnit={toggleTempUnit}
      />

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-2">
        <LiveStatusBadge isLoading={isLoading} isLive={isLive} error={error} />

        {/* Apple Weather Style Hero Temperature Section */}
        <HeroTemperature
          beach={liveBeach}
          tempUnit={tempUnit}
        />

        {/* Priority Hierarchy Sections */}
        {/* 1. AGUA (Priority 1: Mareas, Oleaje, Temp Agua, Seguridad) */}
        <WaterSection beach={liveBeach} />

        {/* 2. SOL (Priority 2: UV, Salida/Puesta de Sol, Protección) */}
        <SunSection beach={liveBeach} />

        {/* 3. CLIMA (Priority 3: Viento, Humedad, Pronóstico) */}
        <WeatherSection beach={liveBeach} tempUnit={tempUnit} />

        {/* Minimal Footer */}
        <footer className="text-center text-xs text-white/50 pt-4 pb-8 space-y-2">
          <p>Sol de Playa • Clima y oleaje en tiempo real vía Open-Meteo</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href="https://www.instagram.com/solloiello"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors py-1.5 px-3.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 backdrop-blur-md"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram @solloiello</span>
            </a>
            <a
              href="https://www.tiktok.com/@solloiello"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors py-1.5 px-3.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 backdrop-blur-md"
            >
              <svg className="w-3.5 h-3.5 fill-current text-cyan-300" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.43V13a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-3.04-1.08 4.8 4.8 0 0 1-1.35-2.02v-.03c2.18 0 4.35-1.33 5.35-1.73z"/>
              </svg>
              <span>TikTok @solloiello</span>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
