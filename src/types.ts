export type TimeOfDay = 'morning' | 'afternoon' | 'golden' | 'night';

export type SafetyFlag = 'green' | 'yellow' | 'red';

export interface TidePoint {
  time: string; // e.g. "14:30"
  height: number; // e.g. 1.8 in meters
  type: 'high' | 'low';
}

export interface WaveData {
  height: number; // in meters (e.g., 1.2)
  direction: string; // e.g. "SE"
  period: number; // in seconds (e.g. 9)
  swellDirection: string;
  suitability: 'Excelente' | 'Bueno' | 'Moderado' | 'Precaución';
  surfScore: number; // 1-10
}

export interface UVData {
  value: number; // e.g. 8.5
  levelText: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto' | 'Extremo';
  peakTime: string; // e.g. "12:00 - 15:00"
  protectionAdvice: string;
}

export interface SunData {
  sunrise: string; // "06:24"
  sunset: string; // "18:45"
  goldenHourStart: string; // "17:30"
  daylightHours: string; // "12h 21m"
}

export interface WindData {
  speed: number; // km/h
  directionDeg: number;
  directionText: string;
  gusts: number; // km/h
  isOnshore: boolean; // true = offshore (ideal for surf/beach), false = onshore
}

export interface HourlyForecast {
  time: string; // "09:00"
  temp: number;
  waterTemp: number;
  waveHeight: number;
  uvIndex: number;
  pop: number; // precipitation probability %
  condition: string;
}

export interface DailyForecast {
  day: string; // "Hoy", "Sáb", "Dom"
  highTemp: number;
  lowTemp: number;
  waveHeight: number;
  highTide: string;
  lowTide: string;
  condition: string;
}

export interface BeachSpot {
  id: string;
  name: string; // e.g. "Búzios"
  subName: string; // e.g. "Praia de Geribá"
  region: string; // e.g. "Río de Janeiro, Brasil"
  coordinates: { lat: number; lng: number };
  airTemp: number;
  feelsLike: number;
  conditionText: string;
  waterTemp: number;
  waterCondition: string; // "Templada, cristalina"
  safetyFlag: SafetyFlag;
  safetyMessage: string;
  tides: {
    currentLevel: number;
    trend: 'rising' | 'falling';
    nextTideTime: string;
    nextTideType: 'Pleamar' | 'Bajamar';
    points: TidePoint[];
  };
  wave: WaveData;
  uv: UVData;
  sun: SunData;
  wind: WindData;
  humidity: number; // %
  pressure: number; // hPa
  visibility: number; // km
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  bestSwimWindow: string; // "09:00 - 12:30"
  bestSurfWindow: string; // "16:00 - 18:30"
  infrastructure: {
    parking: boolean;
    kiosks: boolean;
    rentals: boolean;
    lifeguard: boolean;
  };
  photos: {
    morning: string;
    afternoon: string;
    golden: string;
    night: string;
  };
}
