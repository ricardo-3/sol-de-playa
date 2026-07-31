import { TidePoint } from '../types';
import { isoToHHMM, round } from './format';

/**
 * Open-Meteo's Marine API does not return discrete high/low tide events —
 * it returns `sea_level_height_msl` as a continuous hourly series (tides +
 * atmospheric effects included). We derive approximate Pleamar/Bajamar
 * points by detecting local maxima/minima in that series.
 *
 * Open-Meteo explicitly documents that tide accuracy in coastal areas is
 * limited and not suitable for navigation — this is a reasonable live
 * approximation for a tourist-facing app, not an official tide table.
 */
export function detectTidePoints(times: string[], heights: number[]): TidePoint[] {
  const points: TidePoint[] = [];

  for (let i = 1; i < heights.length - 1; i++) {
    const prev = heights[i - 1];
    const curr = heights[i];
    const next = heights[i + 1];

    if (curr >= prev && curr >= next && curr > prev) {
      points.push({ time: isoToHHMM(times[i]), height: round(curr, 2), type: 'high' });
    } else if (curr <= prev && curr <= next && curr < prev) {
      points.push({ time: isoToHHMM(times[i]), height: round(curr, 2), type: 'low' });
    }
  }

  return points;
}

export interface CurrentTideState {
  currentLevel: number;
  trend: 'rising' | 'falling';
  nextTideTime: string;
  nextTideType: 'Pleamar' | 'Bajamar';
}

export function computeCurrentTideState(
  times: string[],
  heights: number[],
  points: TidePoint[],
  nowIndex: number
): CurrentTideState {
  const currentLevel = round(heights[nowIndex] ?? heights[0] ?? 1, 2);
  const nextValue = heights[nowIndex + 1] ?? currentLevel;
  const trend: 'rising' | 'falling' = nextValue >= currentLevel ? 'rising' : 'falling';

  const nowTime = times[nowIndex] ?? times[0];
  const nextPoint = points.find((p) => p.time > isoToHHMM(nowTime)) ?? points[0];

  return {
    currentLevel,
    trend,
    nextTideTime: nextPoint?.time ?? '--:--',
    nextTideType: nextPoint?.type === 'low' ? 'Bajamar' : 'Pleamar',
  };
}

// For the 5-day forecast list: pick the highest high and lowest low of each day.
export function dayHighLowTide(dayPoints: TidePoint[]): { highTide: string; lowTide: string } {
  const highs = dayPoints.filter((p) => p.type === 'high');
  const lows = dayPoints.filter((p) => p.type === 'low');
  const highest = highs.sort((a, b) => b.height - a.height)[0];
  const lowest = lows.sort((a, b) => a.height - b.height)[0];
  return {
    highTide: highest?.time ?? '--:--',
    lowTide: lowest?.time ?? '--:--',
  };
}
