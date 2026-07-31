// Small formatting helpers shared by the live data hook.

// Open-Meteo returns local ISO timestamps like "2026-07-31T14:00" when timezone=auto.
export function isoToHHMM(iso: string): string {
  const timePart = iso.split('T')[1];
  return timePart ? timePart.slice(0, 5) : iso;
}

export function isoToDate(iso: string): string {
  return iso.split('T')[0];
}

const COMPASS_POINTS = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
];

export function degToCompass(deg: number): string {
  const idx = Math.round(((deg % 360) / 22.5)) % 16;
  return COMPASS_POINTS[idx < 0 ? idx + 16 : idx];
}

export function formatDaylightDuration(sunriseISO: string, sunsetISO: string): string {
  const sunrise = new Date(sunriseISO);
  const sunset = new Date(sunsetISO);
  const diffMs = sunset.getTime() - sunrise.getTime();
  const totalMinutes = Math.max(0, Math.round(diffMs / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
}

export function subtractMinutesISO(iso: string, minutes: number): string {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - minutes);
  // Keep the same "local naive" format Open-Meteo uses: YYYY-MM-DDTHH:MM
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export type UVLevel = 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto' | 'Extremo';

export function classifyUV(value: number): UVLevel {
  if (value < 3) return 'Bajo';
  if (value < 6) return 'Moderado';
  if (value < 8) return 'Alto';
  if (value < 11) return 'Muy Alto';
  return 'Extremo';
}

export function uvProtectionAdvice(level: UVLevel): string {
  switch (level) {
    case 'Bajo':
      return 'Protección mínima necesaria. Lentes de sol en días muy luminosos.';
    case 'Moderado':
      return 'FPS 30+ recomendado, especialmente al mediodía.';
    case 'Alto':
      return 'FPS 30-50, sombrero y reaplicar protector cada 2 horas.';
    case 'Muy Alto':
      return 'FPS 50+, sombrero de ala ancha y lentes con protección UV.';
    case 'Extremo':
      return 'Protección solar alta obligatoria. Bloqueador FPS 50+ reaplicado constantemente. Evitar exposición 11h-15h.';
  }
}

// Rough "peak UV window" derived from an hourly uv_index series for a single day:
// the contiguous block of hours where UV stays at or above 80% of the day's max.
export function findUvPeakWindow(times: string[], values: number[]): string {
  if (values.length === 0) return '11:00 - 15:00';
  const max = Math.max(...values);
  const threshold = max * 0.8;
  let start = -1;
  let end = -1;
  for (let i = 0; i < values.length; i++) {
    if (values[i] >= threshold && max > 0) {
      if (start === -1) start = i;
      end = i;
    }
  }
  if (start === -1) return '11:00 - 15:00';
  return `${isoToHHMM(times[start])} - ${isoToHHMM(times[end])}`;
}

export function round(value: number, decimals = 0): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export const SPANISH_WEEKDAY_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export function dayLabel(dateStr: string, index: number): string {
  if (index === 0) return 'Hoy';
  const d = new Date(dateStr + 'T12:00:00');
  return SPANISH_WEEKDAY_SHORT[d.getDay()];
}
