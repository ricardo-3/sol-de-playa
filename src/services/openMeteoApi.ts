// Open-Meteo — free weather & marine forecast APIs.
// No API key required for non-commercial use (up to 10,000 calls/day).
// Docs: https://open-meteo.com/en/docs · https://open-meteo.com/en/docs/marine-weather-api

const FORECAST_BASE = 'https://api.open-meteo.com/v1/forecast';
const MARINE_BASE = 'https://marine-api.open-meteo.com/v1/marine';

export interface ForecastResponse {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    pressure_msl: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    uv_index: number[];
    visibility: number[];
    precipitation_probability: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    uv_index_max: number[];
    sunrise: string[];
    sunset: string[];
  };
}

export interface MarineResponse {
  hourly: {
    time: string[];
    wave_height: number[];
    wave_direction: number[];
    wave_period: number[];
    swell_wave_direction: number[];
    sea_surface_temperature: number[];
    sea_level_height_msl: number[];
  };
  daily: {
    time: string[];
    wave_height_max: number[];
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Open-Meteo request failed: ${res.status}`);
  }
  const json = await res.json();
  if (json.error) {
    throw new Error(json.reason || 'Open-Meteo returned an error');
  }
  return json as T;
}

export async function fetchForecast(lat: number, lng: number): Promise<ForecastResponse> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
      'pressure_msl',
    ].join(','),
    hourly: [
      'temperature_2m',
      'weather_code',
      'uv_index',
      'visibility',
      'precipitation_probability',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'uv_index_max',
      'sunrise',
      'sunset',
    ].join(','),
    timezone: 'auto',
    forecast_days: '5',
    wind_speed_unit: 'kmh',
  });

  return fetchJson<ForecastResponse>(`${FORECAST_BASE}?${params.toString()}`);
}

export async function fetchMarine(lat: number, lng: number): Promise<MarineResponse> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    hourly: [
      'wave_height',
      'wave_direction',
      'wave_period',
      'swell_wave_direction',
      'sea_surface_temperature',
      'sea_level_height_msl',
    ].join(','),
    daily: ['wave_height_max'].join(','),
    timezone: 'auto',
    forecast_days: '5',
    cell_selection: 'sea',
  });

  return fetchJson<MarineResponse>(`${MARINE_BASE}?${params.toString()}`);
}
