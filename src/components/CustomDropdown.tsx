import React, { useState, useRef, useEffect } from 'react';
import { BeachSpot, TimeOfDay } from '../types';
import { ChevronDown, MapPin, Check, Sun, Sunset, Moon, Sunrise, Sparkles, Thermometer } from 'lucide-react';

interface CustomDropdownProps {
  beaches: BeachSpot[];
  selectedBeach: BeachSpot;
  onSelectBeach: (beach: BeachSpot) => void;
  overrideTime: TimeOfDay | 'auto';
  onSelectOverrideTime: (time: TimeOfDay | 'auto') => void;
  tempUnit: 'C' | 'F';
  onToggleTempUnit: () => void;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  beaches,
  selectedBeach,
  onSelectBeach,
  overrideTime,
  onSelectOverrideTime,
  tempUnit,
  onToggleTempUnit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const timeSlotLabels: Record<TimeOfDay | 'auto', { label: string; icon: React.ReactNode }> = {
    auto: { label: 'Hora Real', icon: <Sparkles className="w-4 h-4 text-amber-300" /> },
    morning: { label: 'Mañana', icon: <Sunrise className="w-4 h-4 text-amber-300" /> },
    afternoon: { label: 'Tarde', icon: <Sun className="w-4 h-4 text-yellow-300" /> },
    golden: { label: 'Golden Hour', icon: <Sunset className="w-4 h-4 text-orange-400" /> },
    night: { label: 'Noche', icon: <Moon className="w-4 h-4 text-indigo-300" /> },
  };

  // Simple click-to-cycle order: no dropdown, no overlay — just advances
  // to the next atmosphere and swaps the icon. Removes the whole class of
  // "menu overlaps content" bug for this control.
  const timeCycleOrder: (TimeOfDay | 'auto')[] = ['auto', 'morning', 'afternoon', 'golden', 'night'];
  const cycleTime = () => {
    const currentIndex = timeCycleOrder.indexOf(overrideTime);
    const nextIndex = (currentIndex + 1) % timeCycleOrder.length;
    onSelectOverrideTime(timeCycleOrder[nextIndex]);
  };

  return (
    <header className="sticky top-0 z-50 w-full pt-4 pb-2 px-4 sm:px-6 max-w-5xl mx-auto flex items-center justify-between gap-3">
      {/* Dark scrim behind the beach dropdown — keeps content underneath from
          bleeding through and visually separates the menu from the page. */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Custom Beach Selector Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          id="beach-selector"
          onClick={() => setIsOpen(!isOpen)}
          className="glass-clear px-4 py-2.5 rounded-full flex items-center gap-2.5 text-white hover:bg-white/20 transition-all duration-200 shadow-lg active:scale-95 group cursor-pointer"
          aria-expanded={isOpen}
          aria-label="Seleccionar Playa"
        >
          <MapPin className="w-4 h-4 text-white/80 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold tracking-tight leading-none text-white">
              {selectedBeach.name}
            </span>
            <span className="text-[11px] text-white/70 font-normal leading-tight mt-0.5">
              {selectedBeach.subName}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-white/70 transition-transform duration-200 ml-1 ${
              isOpen ? 'rotate-180 text-white' : ''
            }`}
          />
        </button>

        {/* Floating Custom Glass Panel Dropdown */}
        {isOpen && (
          <div
            id="beach-dropdown"
            className="absolute top-full mt-2 left-0 sm:left-auto w-72 glass-menu rounded-2xl overflow-hidden z-50 py-1.5 shadow-2xl border border-white/25 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="px-3.5 py-2 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Playas Destacadas
              </span>
              <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-white/80">
                {beaches.length} ubicaciones
              </span>
            </div>

            <div className="max-h-72 overflow-y-auto custom-scrollbar">
              {beaches.map((beach) => {
                const isSelected = beach.id === selectedBeach.id;
                return (
                  <button
                    key={beach.id}
                    onClick={() => {
                      onSelectBeach(beach);
                      setIsOpen(false);
                    }}
                    className={`dropdown-item w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-white/20 text-white font-medium'
                        : 'hover:bg-white/10 text-white/90'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium leading-none text-white">
                        {beach.name}
                      </div>
                      <span className="text-xs text-white/65 block mt-0.5 font-normal">
                        {beach.subName}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right Controls: Time-of-Day Cycle Button + Temperature Unit Toggle */}
      <div className="flex items-center gap-2">
        {/* Time of Day — single click-to-cycle button, no dropdown/overlay */}
        <button
          onClick={cycleTime}
          className="glass-clear px-3 py-2 rounded-full flex items-center gap-1.5 text-xs text-white/90 hover:bg-white/20 active:scale-90 transition-all duration-200 cursor-pointer"
          title="Tocá para cambiar la atmósfera horaria"
          aria-label={`Atmósfera actual: ${timeSlotLabels[overrideTime].label}. Tocá para cambiar.`}
        >
          <span className="transition-transform duration-300">
            {timeSlotLabels[overrideTime].icon}
          </span>
          <span className="hidden sm:inline text-xs font-medium">
            {timeSlotLabels[overrideTime].label}
          </span>
        </button>

        {/* Temp Unit Toggle */}
        <button
          onClick={onToggleTempUnit}
          className="glass-clear px-3 py-2 rounded-full text-xs font-semibold text-white/90 hover:bg-white/20 transition cursor-pointer flex items-center gap-1"
          aria-label="Cambiar unidad de temperatura"
        >
          <Thermometer className="w-3.5 h-3.5 text-white/80" />
          <span>°{tempUnit}</span>
        </button>
      </div>
    </header>
  );
};
