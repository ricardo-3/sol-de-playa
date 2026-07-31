// Approximate compass direction the beach FACES (i.e. the direction wind
// needs to blow FROM, roughly, to be considered "onshore" / blowing toward
// the sand). This is a simplification used only to label the wind badge —
// it is not survey-grade coastal geometry.
export const BEACH_FACING_DEG: Record<string, number> = {
  buzios: 170, // Geribá faces roughly south
  rio: 170, // Copacabana / Ipanema face south
  arraial: 160, // Prainhas face south-southeast
  pipa: 100, // Praia do Amor faces east
  florianopolis: 110, // Praia Mole / Joaquina face east-southeast
};

export function isOnshoreWind(beachId: string, windDirectionDeg: number): boolean {
  const facing = BEACH_FACING_DEG[beachId] ?? 180;
  let diff = Math.abs(windDirectionDeg - facing);
  if (diff > 180) diff = 360 - diff;
  return diff <= 90;
}
