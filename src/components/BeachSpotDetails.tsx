import React from 'react';
import { BeachSpot } from '../types';
import { MapPin, Car, Coffee, Shield, Anchor, Info } from 'lucide-react';

interface BeachSpotDetailsProps {
  beach: BeachSpot;
}

export const BeachSpotDetails: React.FC<BeachSpotDetailsProps> = ({ beach }) => {
  const { infrastructure } = beach;

  return (
    <div className="glass-clear p-6 sm:p-7 relative overflow-hidden text-white mb-8">
      <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-white/15">
        <div className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-300/30 flex items-center justify-center text-emerald-200">
          <Info className="w-4 h-4" />
        </div>
        <div>
          <h2 className="section-title">Infraestructura & Servicios de la Playa</h2>
          <p className="label-secondary text-xs">Comodidades disponibles en {beach.subName}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className={`p-3 rounded-2xl border flex items-center gap-2.5 ${infrastructure.parking ? 'bg-white/10 border-white/15 text-white' : 'bg-black/20 border-white/5 text-white/40'}`}>
          <Car className="w-4 h-4 text-cyan-300" />
          <span>{infrastructure.parking ? 'Estacionamiento Cercano' : 'Sin Estacionamiento Directo'}</span>
        </div>

        <div className={`p-3 rounded-2xl border flex items-center gap-2.5 ${infrastructure.kiosks ? 'bg-white/10 border-white/15 text-white' : 'bg-black/20 border-white/5 text-white/40'}`}>
          <Coffee className="w-4 h-4 text-amber-300" />
          <span>{infrastructure.kiosks ? 'Quioscos & Restaurantes' : 'Sin Servicio de Comida'}</span>
        </div>

        <div className={`p-3 rounded-2xl border flex items-center gap-2.5 ${infrastructure.rentals ? 'bg-white/10 border-white/15 text-white' : 'bg-black/20 border-white/5 text-white/40'}`}>
          <Anchor className="w-4 h-4 text-indigo-300" />
          <span>{infrastructure.rentals ? 'Alquiler de Sombrillas & Surf' : 'Traer Equipamiento Propio'}</span>
        </div>

        <div className={`p-3 rounded-2xl border flex items-center gap-2.5 ${infrastructure.lifeguard ? 'bg-white/10 border-white/15 text-white' : 'bg-black/20 border-white/5 text-white/40'}`}>
          <Shield className="w-4 h-4 text-emerald-300" />
          <span>{infrastructure.lifeguard ? 'Puesto Guardavidas Activo' : 'Sin Guardavidas Permanente'}</span>
        </div>
      </div>
    </div>
  );
};
