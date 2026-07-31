# Sol de Playa 🌊

App PWA que muestra clima, mareas y estado del mar en tiempo real para playas de Brasil, con estética tipo Apple Weather (glassmorphism, fondo fotográfico dinámico según hora del día).

## Datos en vivo

100% client-side, sin backend, sin API key:

- **Clima, viento, UV, sol** → [Open-Meteo Forecast API](https://open-meteo.com/en/docs)
- **Oleaje, temperatura del agua, mareas** → [Open-Meteo Marine API](https://open-meteo.com/en/docs/marine-weather-api)

Ambas son gratuitas para uso no comercial (hasta 10.000 consultas/día, sin necesidad de registro ni clave). Las mareas (Pleamar/Bajamar) se calculan detectando picos y valles en la serie de altura del mar (`sea_level_height_msl`) — es una aproximación en tiempo real, no la tabla oficial de la Marina (que no tiene API pública gratuita). Ver comentarios en `src/utils/tides.ts`.

Si no hay conexión o la API falla, la app muestra automáticamente datos de referencia estáticos (`src/data/beachesData.ts`) para que nunca quede rota, con un aviso visible de "Sin conexión".

## Correr localmente

**Requisitos:** Node.js 18+

```bash
npm install
npm run dev
```

## Publicar en GitHub Pages

1. Subí este repo a GitHub.
2. En **Settings → Pages**, elegí como *Source*: **GitHub Actions**.
3. Cada `git push` a `main` dispara el workflow (`.github/workflows/deploy.yml`) que compila y publica automáticamente en `https://tu-usuario.github.io/tu-repo/`.

No hace falta configurar ninguna variable de entorno ni secreto — no hay claves involucradas.

## Estructura

```
src/
  components/     UI (glassmorphism, hero temperatura, secciones agua/sol/clima)
  data/           Playas base (nombre, coordenadas, infraestructura, fotos)
  hooks/          useLiveBeachData — trae y combina los datos en vivo
  services/       Cliente de las APIs de Open-Meteo
  utils/          Mapeo de códigos de clima, formato, detección de mareas
```
