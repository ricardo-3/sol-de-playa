import React from 'react';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';

interface LiveStatusBadgeProps {
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
}

export const LiveStatusBadge: React.FC<LiveStatusBadgeProps> = ({ isLoading, isLive, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center mb-2">
        <div className="glass-clear-sm inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-white/80">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Actualizando datos en vivo…</span>
        </div>
      </div>
    );
  }

  if (!isLive) {
    return (
      <div className="flex justify-center mb-2">
        <div className="glass-clear-sm inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-amber-100 border border-amber-300/30">
          <WifiOff className="w-3 h-3" />
          <span>Sin conexión — mostrando datos de referencia{error ? '' : ''}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-2">
      <div className="glass-clear-sm inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-emerald-100">
        <Wifi className="w-3 h-3" />
        <span>En vivo · Open-Meteo</span>
      </div>
    </div>
  );
};
