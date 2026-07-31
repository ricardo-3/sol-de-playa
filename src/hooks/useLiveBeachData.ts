import { useEffect, useRef, useState } from 'react';
import { BeachSpot, DailyForecast, HourlyForecast, SafetyFlag, WaveData } from '../types';
import { fetchForecast, fetchMarine, ForecastResponse, MarineResponse } from '../services/openMeteoApi';
import { buildConditionText, getWeatherCondition } from '../utils/weatherCodes';
import {
  classifyUV,
  dayLabel,
  degToCompass,
  findUvPeakWindow,
  formatDaylightDuration,
  isoToDate,
  isoToHHMM,
  round,
  subtractMinutesISO,
  uvProtectionAdvice,
} from '../utils/format';
import { computeCurrentTideState, dayHighLowTide, detectTidePoints } from '../utils/tides';
import { isOnshoreWind } from '../data/beachOrientation';

interface LiveBeachState {
  beach: BeachSpot;
  isLoading: boolean;
  isLive: boolean;
  lastUpdated: Date | null;
  error: string | null;
}

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const cache = new Map<string, { beach: BeachSpot; timestamp: number }>();

function classifySafety(waveHeight: number, windSpeed: number): SafetyFlag {
  if (waveHeight >= 2.0 || windSpeed >= 35) return 'red';
  if (waveHeight >= 1.4 || windSpeed >= 25) return 'yellow';
  return 'green';
}

function waveSuitability(waveHeight: number): WaveData['suitability'] {
  if (waveHeight < 0.8) return 'Excelente';
  if (waveHeight < 1.5) return 'Bueno';
  if (waveHeight < 2.5) return 'Moderado';
  return 'Precaución';
}

function surfScoreFrom(waveHeight: number, period: number): number {
  const score = waveHeight * 3 + period * 0.4;
  return Math.max(1, Math.min(10, Math.round(score)));
}

function waterConditionText(waterTemp: number, waveHeight: number): string {
  const clarity = waveHeight < 1 ? 'Cristalina' : 'Con oleaje moderado';
  return `${clarity}, ${waveHeight < 1 ? 'olas suaves' : 'olas presentes'}`;
}

function mergeLiveData(
  base: BeachSpot,
  forecast: ForecastResponse,
  marine: MarineResponse
): BeachSpot {
  const { current, hourly, daily } = forecast;

  // --- Find "now" index in the hourly arrays (nearest past or equal hour) ---
  const nowISO = current.time;
  let nowIndex = hourly.time.findIndex((t) => t >= nowISO);
  if (nowIndex === -1) nowIndex = 0;

  // --- Air / condition ---
  const airTemp = round(current.temperature_2m);
  const feelsLike = round(current.apparent_temperature);
  const conditionText = buildConditionText(current.weather_code, current.wind_speed_10m);

  // --- Wind ---
  const windDirectionDeg = current.wind_direction_10m;
  const wind = {
    speed: round(current.wind_speed_10m),
    directionDeg: windDirectionDeg,
    directionText: degToCompass(windDirectionDeg),
    gusts: round(current.wind_gusts_10m),
    isOnshore: isOnshoreWind(base.id, windDirectionDeg),
  };

  // --- Humidity / pressure / visibility ---
  const humidity = round(current.relative_humidity_2m);
  const pressure = round(current.pressure_msl);
  const visibilityMeters = hourly.visibility[nowIndex] ?? 10000;
  const visibility = round(visibilityMeters / 1000);

  // --- UV ---
  const uvValue = round(daily.uv_index_max[0] ?? hourly.uv_index[nowIndex] ?? 0, 1);
  const uvLevel = classifyUV(uvValue);
  const todayUvTimes = hourly.time.filter((t) => isoToDate(t) === isoToDate(nowISO));
  const todayUvValues = hourly.uv_index.slice(0, todayUvTimes.length);
  const uv = {
    value: uvValue,
    levelText: uvLevel,
    peakTime: findUvPeakWindow(todayUvTimes, todayUvValues),
    protectionAdvice: uvProtectionAdvice(uvLevel),
  };

  // --- Sun ---
  const sunriseISO = daily.sunrise[0];
  const sunsetISO = daily.sunset[0];
  const sun = {
    sunrise: isoToHHMM(sunriseISO),
    sunset: isoToHHMM(sunsetISO),
    goldenHourStart: isoToHHMM(subtractMinutesISO(sunsetISO, 45)),
    daylightHours: formatDaylightDuration(sunriseISO, sunsetISO),
  };

  // --- Marine: waves, sea temp, tides ---
  const mHourly = marine.hourly;
  let mNowIndex = mHourly.time.findIndex((t) => t >= nowISO);
  if (mNowIndex === -1) mNowIndex = 0;

  const waveHeight = round(mHourly.wave_height[mNowIndex] ?? 1, 1);
  const wavePeriod = round(mHourly.wave_period[mNowIndex] ?? 8);
  const waterTemp = round(mHourly.sea_surface_temperature[mNowIndex] ?? base.waterTemp);

  const wave: WaveData = {
    height: waveHeight,
    direction: degToCompass(mHourly.wave_direction[mNowIndex] ?? 0),
    period: wavePeriod,
    swellDirection: degToCompass(mHourly.swell_wave_direction[mNowIndex] ?? 0),
    suitability: waveSuitability(waveHeight),
    surfScore: surfScoreFrom(waveHeight, wavePeriod),
  };

  const waterCondition = waterConditionText(waterTemp, waveHeight);

  // Tide points from sea_level_height_msl (approximate — see tides.ts)
  const allTidePoints = detectTidePoints(mHourly.time, mHourly.sea_level_height_msl);
  const todayDateStr = isoToDate(nowISO);
  // Recompute points restricted to today's slice of the series, so the
  // "today" tide table only shows today's Pleamar/Bajamar events.
  const todayIndices = mHourly.time
    .map((t, idx) => ({ t, idx }))
    .filter(({ t }) => isoToDate(t) === todayDateStr);
  const todayTimes = todayIndices.map((x) => x.t);
  const todayHeights = todayIndices.map((x) => mHourly.sea_level_height_msl[x.idx]);
  const todayTidePoints = detectTidePoints(todayTimes, todayHeights);

  const tideState = computeCurrentTideState(
    mHourly.time,
    mHourly.sea_level_height_msl,
    allTidePoints,
    mNowIndex
  );

  const tides = {
    currentLevel: tideState.currentLevel,
    trend: tideState.trend,
    nextTideTime: tideState.nextTideTime,
    nextTideType: tideState.nextTideType,
    points: todayTidePoints.length > 0 ? todayTidePoints : allTidePoints.slice(0, 4),
  };

  // --- Safety flag (heuristic, not an official lifeguard flag) ---
  const safetyFlag = classifySafety(waveHeight, wind.speed);

  // --- Hourly forecast list: next 7 hours, rolling from now ---
  const hourlyForecast: HourlyForecast[] = [];
  for (let i = nowIndex; i < Math.min(nowIndex + 7, hourly.time.length); i++) {
    const t = hourly.time[i];
    let waveAtT = base.hourly[0]?.waveHeight ?? 1;
    const mIdx = mHourly.time.indexOf(t);
    if (mIdx !== -1) waveAtT = round(mHourly.wave_height[mIdx], 1);

    hourlyForecast.push({
      time: isoToHHMM(t),
      temp: round(hourly.temperature_2m[i]),
      waterTemp,
      waveHeight: waveAtT,
      uvIndex: round(hourly.uv_index[i] ?? 0, 1),
      pop: round(hourly.precipitation_probability[i] ?? 0),
      condition: getWeatherCondition(hourly.weather_code[i]).text,
    });
  }

  // --- Daily forecast list: 5 days ---
  const dailyForecast: DailyForecast[] = daily.time.map((dateStr, i) => {
    const dayStart = `${dateStr}T00:00`;
    const dayEnd = `${dateStr}T23:59`;
    const dayTideSlice = mHourly.time
      .map((t, idx) => ({ t, idx }))
      .filter(({ t }) => t >= dayStart && t <= dayEnd);
    const dayTideTimes = dayTideSlice.map((x) => x.t);
    const dayTideHeights = dayTideSlice.map((x) => mHourly.sea_level_height_msl[x.idx]);
    const dayPoints = detectTidePoints(dayTideTimes, dayTideHeights);
    const { highTide, lowTide } = dayHighLowTide(dayPoints);

    const dayWaveSlice = dayTideSlice.map((x) => mHourly.wave_height[x.idx]).filter((v) => v != null);
    const maxWave = dayWaveSlice.length > 0 ? Math.max(...dayWaveSlice) : waveHeight;

    return {
      day: dayLabel(dateStr, i),
      highTemp: round(daily.temperature_2m_max[i]),
      lowTemp: round(daily.temperature_2m_min[i]),
      waveHeight: round(maxWave, 1),
      highTide,
      lowTide,
      condition: getWeatherCondition(daily.weather_code[i]).text,
    };
  });

  return {
    ...base,
    airTemp,
    feelsLike,
    conditionText,
    waterTemp,
    waterCondition,
    safetyFlag,
    tides,
    wave,
    uv,
    sun,
    wind,
    humidity,
    pressure,
    visibility,
    hourly: hourlyForecast.length > 0 ? hourlyForecast : base.hourly,
    daily: dailyForecast.length > 0 ? dailyForecast : base.daily,
  };
}

export function useLiveBeachData(baseBeach: BeachSpot): LiveBeachState {
  const [state, setState] = useState<LiveBeachState>({
    beach: baseBeach,
    isLoading: true,
    isLive: false,
    lastUpdated: null,
    error: null,
  });

  // Avoid setting state after unmount / stale beach switch
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    const cached = cache.get(baseBeach.id);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      setState({
        beach: cached.beach,
        isLoading: false,
        isLive: true,
        lastUpdated: new Date(cached.timestamp),
        error: null,
      });
      return;
    }

    setState((prev) => ({ ...prev, beach: baseBeach, isLoading: true, error: null }));

    const { lat, lng } = baseBeach.coordinates;

    Promise.all([fetchForecast(lat, lng), fetchMarine(lat, lng)])
      .then(([forecast, marine]) => {
        if (requestIdRef.current !== requestId) return; // stale response, ignore
        const merged = mergeLiveData(baseBeach, forecast, marine);
        cache.set(baseBeach.id, { beach: merged, timestamp: Date.now() });
        setState({
          beach: merged,
          isLoading: false,
          isLive: true,
          lastUpdated: new Date(),
          error: null,
        });
      })
      .catch((err: Error) => {
        if (requestIdRef.current !== requestId) return;
        setState({
          beach: baseBeach,
          isLoading: false,
          isLive: false,
          lastUpdated: null,
          error: err.message || 'No se pudo conectar con el servicio meteorológico',
        });
      });
  }, [baseBeach]);

  return state;
}
