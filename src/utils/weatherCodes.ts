// WMO Weather interpretation codes (used by Open-Meteo).
// Reference: https://open-meteo.com/en/docs (WMO Weather interpretation codes table)

export interface WeatherCondition {
  text: string;
  category: 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'storm';
}

const WEATHER_CODE_MAP: Record<number, WeatherCondition> = {
  0: { text: 'Despejado', category: 'clear' },
  1: { text: 'Mayormente Despejado', category: 'clear' },
  2: { text: 'Parcialmente Nublado', category: 'cloudy' },
  3: { text: 'Nublado', category: 'cloudy' },
  45: { text: 'Niebla', category: 'fog' },
  48: { text: 'Niebla Escarchada', category: 'fog' },
  51: { text: 'Llovizna Ligera', category: 'drizzle' },
  53: { text: 'Llovizna Moderada', category: 'drizzle' },
  55: { text: 'Llovizna Intensa', category: 'drizzle' },
  56: { text: 'Llovizna Helada Ligera', category: 'drizzle' },
  57: { text: 'Llovizna Helada Intensa', category: 'drizzle' },
  61: { text: 'Lluvia Ligera', category: 'rain' },
  63: { text: 'Lluvia Moderada', category: 'rain' },
  65: { text: 'Lluvia Intensa', category: 'rain' },
  66: { text: 'Lluvia Helada Ligera', category: 'rain' },
  67: { text: 'Lluvia Helada Intensa', category: 'rain' },
  71: { text: 'Nevada Ligera', category: 'rain' },
  73: { text: 'Nevada Moderada', category: 'rain' },
  75: { text: 'Nevada Intensa', category: 'rain' },
  77: { text: 'Granos de Nieve', category: 'rain' },
  80: { text: 'Chubascos Ligeros', category: 'rain' },
  81: { text: 'Chubascos Moderados', category: 'rain' },
  82: { text: 'Chubascos Violentos', category: 'rain' },
  85: { text: 'Chubascos de Nieve Ligeros', category: 'rain' },
  86: { text: 'Chubascos de Nieve Intensos', category: 'rain' },
  95: { text: 'Tormenta Eléctrica', category: 'storm' },
  96: { text: 'Tormenta con Granizo Ligero', category: 'storm' },
  99: { text: 'Tormenta con Granizo Intenso', category: 'storm' },
};

export function getWeatherCondition(code: number | undefined | null): WeatherCondition {
  if (code === undefined || code === null || !(code in WEATHER_CODE_MAP)) {
    return { text: 'Despejado', category: 'clear' };
  }
  return WEATHER_CODE_MAP[code];
}

// Contextual condition text combining sky + sea breeze, similar in spirit
// to the original curated copy (e.g. "Soleado & Brisa Marina").
export function buildConditionText(code: number, windSpeedKmh: number): string {
  const base = getWeatherCondition(code).text;
  if (windSpeedKmh >= 25) return `${base} & Viento Fuerte`;
  if (windSpeedKmh >= 12) return `${base} & Brisa Marina`;
  return base;
}
