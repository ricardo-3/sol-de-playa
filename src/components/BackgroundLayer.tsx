import React, { useState, useEffect } from 'react';
import { BeachSpot, TimeOfDay } from '../types';

interface BackgroundLayerProps {
  beach: BeachSpot;
  overrideTime?: TimeOfDay | 'auto';
  onTimeDetected?: (time: TimeOfDay) => void;
}

export const getTimeOfDayFromHour = (hour: number): TimeOfDay => {
  if (hour >= 6 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 19) return 'golden';
  return 'night';
};

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  beach,
  overrideTime = 'auto',
  onTimeDetected,
}) => {
  const [currentTimeSlot, setCurrentTimeSlot] = useState<TimeOfDay>('afternoon');
  const [currentImgUrl, setCurrentImgUrl] = useState<string>('');
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    const slot: TimeOfDay =
      overrideTime && overrideTime !== 'auto'
        ? (overrideTime as TimeOfDay)
        : getTimeOfDayFromHour(new Date().getHours());

    setCurrentTimeSlot(slot);
    if (onTimeDetected) {
      onTimeDetected(slot);
    }

    const targetUrl = beach.photos[slot];
    setImgLoaded(false);
    setImgError(false);

    // Preload image
    const img = new Image();
    img.src = targetUrl;
    img.onload = () => {
      setCurrentImgUrl(targetUrl);
      setImgLoaded(true);
    };
    img.onerror = () => {
      setImgError(true);
      // Fallback url
      setCurrentImgUrl(beach.photos.afternoon);
    };
  }, [beach, overrideTime, onTimeDetected]);

  // Fallback linear gradient per time slot
  const fallbackGradients: Record<TimeOfDay, string> = {
    morning: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6dd5ed 100%)',
    afternoon: 'linear-gradient(180deg, #1f4037 0%, #2980b9 50%, #6dd5fa 100%)',
    golden: 'linear-gradient(180deg, #2c3e50 0%, #fd746c 50%, #ff9966 100%)',
    night: 'linear-gradient(180deg, #050505 0%, #0b1d33 50%, #1a365d 100%)',
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-900 transform-gpu">
      {/* Fallback Gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: fallbackGradients[currentTimeSlot],
          opacity: imgLoaded && !imgError ? 0.3 : 1,
        }}
      />

      {/* Real Photography Background */}
      {currentImgUrl && (
        <div
          className="app-background transform scale-105"
          style={{
            backgroundImage: `url(${currentImgUrl})`,
            opacity: imgLoaded ? 1 : 0,
          }}
        />
      )}

      {/* Vignette / Dark Contrast Mask for Text Legibility.
          Plain gradient only — no backdrop-filter here. Stacking a
          backdrop-filter on top of another fixed, full-viewport layer is a
          known WebKit (iOS Safari) bug that causes a hairline seam/tear to
          flash in during fast scroll. The gradient's own alpha already
          darkens the photo underneath, so the filter was redundant. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
    </div>
  );
};
