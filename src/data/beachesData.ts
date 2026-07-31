import { BeachSpot } from '../types';

export const beachesData: BeachSpot[] = [
  {
    id: 'buzios',
    name: 'Búzios',
    subName: 'Praia de Geribá',
    region: 'Região dos Lagos, RJ',
    coordinates: { lat: -22.776, lng: -41.905 },
    airTemp: 28,
    feelsLike: 30,
    conditionText: 'Soleado & Brisa Marina',
    waterTemp: 23,
    waterCondition: 'Cristalina, olas suaves',
    safetyFlag: 'green',
    safetyMessage: 'Condiciones excelentes para natación y deportes acuáticos',
    tides: {
      currentLevel: 1.4,
      trend: 'rising',
      nextTideTime: '14:30',
      nextTideType: 'Pleamar',
      points: [
        { time: '02:15', height: 1.6, type: 'high' },
        { time: '08:20', height: 0.4, type: 'low' },
        { time: '14:30', height: 1.8, type: 'high' },
        { time: '20:45', height: 0.3, type: 'low' }
      ]
    },
    wave: {
      height: 1.2,
      direction: 'SE',
      period: 10,
      swellDirection: 'E',
      suitability: 'Bueno',
      surfScore: 8
    },
    uv: {
      value: 8.4,
      levelText: 'Muy Alto',
      peakTime: '11:30 - 15:00',
      protectionAdvice: 'FPS 50+, sombrero de ala ancha y lentes con protección UV.'
    },
    sun: {
      sunrise: '06:18',
      sunset: '18:38',
      goldenHourStart: '17:45',
      daylightHours: '12h 20m'
    },
    wind: {
      speed: 18,
      directionDeg: 120,
      directionText: 'ESE',
      gusts: 24,
      isOnshore: false
    },
    humidity: 68,
    pressure: 1014,
    visibility: 10,
    hourly: [
      { time: '08:00', temp: 24, waterTemp: 22, waveHeight: 1.0, uvIndex: 3, pop: 0, condition: 'Despejado' },
      { time: '10:00', temp: 26, waterTemp: 23, waveHeight: 1.1, uvIndex: 6, pop: 0, condition: 'Soleado' },
      { time: '12:00', temp: 28, waterTemp: 23, waveHeight: 1.2, uvIndex: 9, pop: 0, condition: 'Soleado' },
      { time: '14:00', temp: 29, waterTemp: 24, waveHeight: 1.3, uvIndex: 8, pop: 5, condition: 'Soleado' },
      { time: '16:00', temp: 27, waterTemp: 23, waveHeight: 1.2, uvIndex: 4, pop: 10, condition: 'Parcial' },
      { time: '18:00', temp: 25, waterTemp: 23, waveHeight: 1.1, uvIndex: 1, pop: 0, condition: 'Atardecer' },
      { time: '20:00', temp: 23, waterTemp: 22, waveHeight: 1.0, uvIndex: 0, pop: 0, condition: 'Noche Despejada' }
    ],
    daily: [
      { day: 'Hoy', highTemp: 29, lowTemp: 21, waveHeight: 1.2, highTide: '14:30', lowTide: '20:45', condition: 'Soleado' },
      { day: 'Sáb', highTemp: 30, lowTemp: 22, waveHeight: 1.4, highTide: '15:10', lowTide: '21:25', condition: 'Soleado' },
      { day: 'Dom', highTemp: 28, lowTemp: 21, waveHeight: 1.0, highTide: '15:50', lowTide: '22:05', condition: 'Parcial' },
      { day: 'Lun', highTemp: 27, lowTemp: 20, waveHeight: 0.9, highTide: '16:30', lowTide: '22:45', condition: 'Despejado' },
      { day: 'Mar', highTemp: 29, lowTemp: 22, waveHeight: 1.1, highTide: '17:15', lowTide: '23:30', condition: 'Soleado' }
    ],
    bestSwimWindow: '09:00 - 13:00 (Pleamar & Menor Viento)',
    bestSurfWindow: '15:30 - 18:00 (Swell del SE)',
    infrastructure: {
      parking: true,
      kiosks: true,
      rentals: true,
      lifeguard: true
    },
    photos: {
      morning: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
      afternoon: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=85',
      golden: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
      night: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=2000&q=85'
    }
  },
  {
    id: 'rio',
    name: 'Río de Janeiro',
    subName: 'Copacabana & Ipanema',
    region: 'Zona Sul, RJ',
    coordinates: { lat: -22.971, lng: -43.182 },
    airTemp: 31,
    feelsLike: 34,
    conditionText: 'Cielo Claro & Calidez Tropical',
    waterTemp: 24,
    waterCondition: 'Mar templado con oleaje constante',
    safetyFlag: 'yellow',
    safetyMessage: 'Precaución en Posto 8 y Posto 9 por corrientes de resaca leves',
    tides: {
      currentLevel: 1.2,
      trend: 'falling',
      nextTideTime: '16:15',
      nextTideType: 'Bajamar',
      points: [
        { time: '04:10', height: 1.5, type: 'high' },
        { time: '10:05', height: 0.5, type: 'low' },
        { time: '16:15', height: 1.7, type: 'high' },
        { time: '22:30', height: 0.2, type: 'low' }
      ]
    },
    wave: {
      height: 1.6,
      direction: 'S',
      period: 11,
      swellDirection: 'SSW',
      suitability: 'Excelente',
      surfScore: 9
    },
    uv: {
      value: 9.8,
      levelText: 'Muy Alto',
      peakTime: '11:00 - 15:30',
      protectionAdvice: 'Sombra obligatoria en horas pico. Reaplicar protector cada 2 horas.'
    },
    sun: {
      sunrise: '06:15',
      sunset: '18:41',
      goldenHourStart: '17:48',
      daylightHours: '12h 26m'
    },
    wind: {
      speed: 15,
      directionDeg: 190,
      directionText: 'S',
      gusts: 22,
      isOnshore: true
    },
    humidity: 72,
    pressure: 1012,
    visibility: 10,
    hourly: [
      { time: '08:00', temp: 26, waterTemp: 23, waveHeight: 1.4, uvIndex: 4, pop: 0, condition: 'Soleado' },
      { time: '10:00', temp: 29, waterTemp: 24, waveHeight: 1.5, uvIndex: 7, pop: 0, condition: 'Soleado' },
      { time: '12:00', temp: 31, waterTemp: 24, waveHeight: 1.6, uvIndex: 10, pop: 0, condition: 'Soleado' },
      { time: '14:00', temp: 32, waterTemp: 25, waveHeight: 1.7, uvIndex: 9, pop: 5, condition: 'Soleado' },
      { time: '16:00', temp: 30, waterTemp: 24, waveHeight: 1.6, uvIndex: 5, pop: 5, condition: 'Soleado' },
      { time: '18:00', temp: 27, waterTemp: 24, waveHeight: 1.5, uvIndex: 1, pop: 0, condition: 'Golden Hour' },
      { time: '20:00', temp: 25, waterTemp: 23, waveHeight: 1.4, uvIndex: 0, pop: 0, condition: 'Noche' }
    ],
    daily: [
      { day: 'Hoy', highTemp: 32, lowTemp: 23, waveHeight: 1.6, highTide: '16:15', lowTide: '22:30', condition: 'Soleado' },
      { day: 'Sáb', highTemp: 33, lowTemp: 24, waveHeight: 1.8, highTide: '17:00', lowTide: '23:15', condition: 'Soleado' },
      { day: 'Dom', highTemp: 31, lowTemp: 23, waveHeight: 1.5, highTide: '17:40', lowTide: '23:55', condition: 'Parcial' },
      { day: 'Lun', highTemp: 29, lowTemp: 22, waveHeight: 1.3, highTide: '18:20', lowTide: '00:30', condition: 'Despejado' },
      { day: 'Mar', highTemp: 30, lowTemp: 23, waveHeight: 1.4, highTide: '19:00', lowTide: '01:10', condition: 'Soleado' }
    ],
    bestSwimWindow: '08:00 - 11:30 (Posto 6 Copacabana)',
    bestSurfWindow: '14:00 - 17:30 (Arpoador & Ipanema)',
    infrastructure: {
      parking: true,
      kiosks: true,
      rentals: true,
      lifeguard: true
    },
    photos: {
      morning: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=2000&q=85',
      afternoon: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=2000&q=85',
      golden: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85',
      night: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85'
    }
  },
  {
    id: 'arraial',
    name: 'Arraial do Cabo',
    subName: 'As Prainhas do Pontal',
    region: 'Caribe Brasileño, RJ',
    coordinates: { lat: -22.966, lng: -42.027 },
    airTemp: 27,
    feelsLike: 28,
    conditionText: 'Agua Turquesa & Viento Suave',
    waterTemp: 21,
    waterCondition: 'Aguas cristalinas turquesa (Afloramiento)',
    safetyFlag: 'green',
    safetyMessage: 'Mar sin olas, visibilidad superior a 15 metros para snorkel',
    tides: {
      currentLevel: 0.8,
      trend: 'rising',
      nextTideTime: '13:50',
      nextTideType: 'Pleamar',
      points: [
        { time: '01:40', height: 1.4, type: 'high' },
        { time: '07:50', height: 0.3, type: 'low' },
        { time: '13:50', height: 1.6, type: 'high' },
        { time: '20:10', height: 0.2, type: 'low' }
      ]
    },
    wave: {
      height: 0.5,
      direction: 'E',
      period: 8,
      swellDirection: 'ENE',
      suitability: 'Excelente',
      surfScore: 4
    },
    uv: {
      value: 8.8,
      levelText: 'Muy Alto',
      peakTime: '11:00 - 14:30',
      protectionAdvice: 'FPS 50+, la arena blanca intensifica el reflejo UV.'
    },
    sun: {
      sunrise: '06:17',
      sunset: '18:37',
      goldenHourStart: '17:44',
      daylightHours: '12h 20m'
    },
    wind: {
      speed: 12,
      directionDeg: 80,
      directionText: 'E',
      gusts: 16,
      isOnshore: false
    },
    humidity: 65,
    pressure: 1015,
    visibility: 15,
    hourly: [
      { time: '08:00', temp: 23, waterTemp: 20, waveHeight: 0.4, uvIndex: 3, pop: 0, condition: 'Cristalino' },
      { time: '10:00', temp: 25, waterTemp: 21, waveHeight: 0.5, uvIndex: 6, pop: 0, condition: 'Soleado' },
      { time: '12:00', temp: 27, waterTemp: 21, waveHeight: 0.5, uvIndex: 9, pop: 0, condition: 'Soleado' },
      { time: '14:00', temp: 27, waterTemp: 22, waveHeight: 0.6, uvIndex: 8, pop: 0, condition: 'Soleado' },
      { time: '16:00', temp: 26, waterTemp: 21, waveHeight: 0.5, uvIndex: 4, pop: 0, condition: 'Despejado' },
      { time: '18:00', temp: 24, waterTemp: 21, waveHeight: 0.4, uvIndex: 0, pop: 0, condition: 'Golden Sunset' },
      { time: '20:00', temp: 22, waterTemp: 20, waveHeight: 0.4, uvIndex: 0, pop: 0, condition: 'Noche Serena' }
    ],
    daily: [
      { day: 'Hoy', highTemp: 27, lowTemp: 20, waveHeight: 0.5, highTide: '13:50', lowTide: '20:10', condition: 'Soleado' },
      { day: 'Sáb', highTemp: 28, lowTemp: 21, waveHeight: 0.6, highTide: '14:30', lowTide: '20:50', condition: 'Soleado' },
      { day: 'Dom', highTemp: 27, lowTemp: 20, waveHeight: 0.4, highTide: '15:10', lowTide: '21:30', condition: 'Despejado' },
      { day: 'Lun', highTemp: 26, lowTemp: 19, waveHeight: 0.5, highTide: '15:50', lowTide: '22:10', condition: 'Soleado' },
      { day: 'Mar', highTemp: 27, lowTemp: 20, waveHeight: 0.5, highTide: '16:30', lowTide: '22:50', condition: 'Soleado' }
    ],
    bestSwimWindow: '10:00 - 15:00 (Ideales para Buceo & Snorkel)',
    bestSurfWindow: 'Praia Grande (Oeste) para Surf',
    infrastructure: {
      parking: false,
      kiosks: true,
      rentals: true,
      lifeguard: true
    },
    photos: {
      morning: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
      afternoon: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=2000&q=85',
      golden: 'https://images.unsplash.com/photo-1495954222046-2c427ecb546d?auto=format&fit=crop&w=2000&q=85',
      night: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=2000&q=85'
    }
  },
  {
    id: 'pipa',
    name: 'Pipa',
    subName: 'Praia do Amor & Acantilados',
    region: 'Rio Grande do Norte, RN',
    coordinates: { lat: -6.228, lng: -35.045 },
    airTemp: 30,
    feelsLike: 33,
    conditionText: 'Soleado, Piscinas Naturales & Delfines',
    waterTemp: 27,
    waterCondition: 'Cálida 27°C, presencia de delfines',
    safetyFlag: 'green',
    safetyMessage: 'Excelente condición para baño en piscinas con bajamar',
    tides: {
      currentLevel: 0.3,
      trend: 'rising',
      nextTideTime: '11:15',
      nextTideType: 'Bajamar',
      points: [
        { time: '05:00', height: 2.2, type: 'high' },
        { time: '11:15', height: 0.2, type: 'low' },
        { time: '17:30', height: 2.4, type: 'high' },
        { time: '23:45', height: 0.1, type: 'low' }
      ]
    },
    wave: {
      height: 1.4,
      direction: 'SE',
      period: 12,
      swellDirection: 'SE',
      suitability: 'Excelente',
      surfScore: 9
    },
    uv: {
      value: 10.2,
      levelText: 'Extremo',
      peakTime: '10:30 - 14:30',
      protectionAdvice: 'Protección solar alta obligatoria. Bloqueador FPS 50+ re-aplicado constante.'
    },
    sun: {
      sunrise: '05:25',
      sunset: '17:32',
      goldenHourStart: '16:45',
      daylightHours: '12h 07m'
    },
    wind: {
      speed: 22,
      directionDeg: 110,
      directionText: 'ESE',
      gusts: 30,
      isOnshore: false
    },
    humidity: 70,
    pressure: 1011,
    visibility: 12,
    hourly: [
      { time: '08:00', temp: 27, waterTemp: 26, waveHeight: 1.2, uvIndex: 5, pop: 0, condition: 'Soleado' },
      { time: '10:00', temp: 29, waterTemp: 27, waveHeight: 1.3, uvIndex: 8, pop: 0, condition: 'Soleado' },
      { time: '12:00', temp: 30, waterTemp: 27, waveHeight: 1.4, uvIndex: 11, pop: 0, condition: 'Extremo' },
      { time: '14:00', temp: 31, waterTemp: 28, waveHeight: 1.5, uvIndex: 9, pop: 0, condition: 'Soleado' },
      { time: '16:00', temp: 29, waterTemp: 27, waveHeight: 1.4, uvIndex: 4, pop: 0, condition: 'Brisa' },
      { time: '18:00', temp: 26, waterTemp: 27, waveHeight: 1.3, uvIndex: 0, pop: 0, condition: 'Atardecer Dorado' },
      { time: '20:00', temp: 25, waterTemp: 26, waveHeight: 1.2, uvIndex: 0, pop: 0, condition: 'Noche Brisa' }
    ],
    daily: [
      { day: 'Hoy', highTemp: 31, lowTemp: 24, waveHeight: 1.4, highTide: '17:30', lowTide: '11:15', condition: 'Soleado' },
      { day: 'Sáb', highTemp: 31, lowTemp: 24, waveHeight: 1.5, highTide: '18:10', lowTide: '11:55', condition: 'Soleado' },
      { day: 'Dom', highTemp: 30, lowTemp: 23, waveHeight: 1.3, highTide: '18:50', lowTide: '12:35', condition: 'Despejado' },
      { day: 'Lun', highTemp: 30, lowTemp: 24, waveHeight: 1.2, highTide: '19:30', lowTide: '13:15', condition: 'Soleado' },
      { day: 'Mar', highTemp: 31, lowTemp: 24, waveHeight: 1.4, highTide: '20:10', lowTide: '13:55', condition: 'Soleado' }
    ],
    bestSwimWindow: '09:30 - 13:00 (Piscinas en Bajamar Baía dos Golfinhos)',
    bestSurfWindow: '06:00 - 09:00 (Praia do Amor - Marea alta)',
    infrastructure: {
      parking: true,
      kiosks: true,
      rentals: true,
      lifeguard: true
    },
    photos: {
      morning: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
      afternoon: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=85',
      golden: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
      night: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=2000&q=85'
    }
  },
  {
    id: 'florianopolis',
    name: 'Florianópolis',
    subName: 'Praia Mole & Joaquina',
    region: 'Santa Catarina, SC',
    coordinates: { lat: -27.604, lng: -48.428 },
    airTemp: 26,
    feelsLike: 27,
    conditionText: 'Cielo Claro, Olas Surf & Brisa Fresca',
    waterTemp: 22,
    waterCondition: 'Refrescante 22°C, excelente transparencia',
    safetyFlag: 'yellow',
    safetyMessage: 'Atención a la fuerza del oleaje en zona central de Praia Mole',
    tides: {
      currentLevel: 1.1,
      trend: 'rising',
      nextTideTime: '15:20',
      nextTideType: 'Pleamar',
      points: [
        { time: '03:10', height: 1.2, type: 'high' },
        { time: '09:15', height: 0.3, type: 'low' },
        { time: '15:20', height: 1.4, type: 'high' },
        { time: '21:30', height: 0.2, type: 'low' }
      ]
    },
    wave: {
      height: 1.8,
      direction: 'SE',
      period: 12,
      swellDirection: 'S',
      suitability: 'Excelente',
      surfScore: 10
    },
    uv: {
      value: 7.9,
      levelText: 'Alto',
      peakTime: '11:30 - 14:30',
      protectionAdvice: 'Protección solar FPS 30+ recomendada.'
    },
    sun: {
      sunrise: '06:38',
      sunset: '18:52',
      goldenHourStart: '18:02',
      daylightHours: '12h 14m'
    },
    wind: {
      speed: 16,
      directionDeg: 190,
      directionText: 'S',
      gusts: 23,
      isOnshore: false
    },
    humidity: 66,
    pressure: 1016,
    visibility: 12,
    hourly: [
      { time: '08:00', temp: 22, waterTemp: 21, waveHeight: 1.6, uvIndex: 3, pop: 0, condition: 'Soleado' },
      { time: '10:00', temp: 24, waterTemp: 22, waveHeight: 1.7, uvIndex: 6, pop: 0, condition: 'Soleado' },
      { time: '12:00', temp: 26, waterTemp: 22, waveHeight: 1.8, uvIndex: 8, pop: 0, condition: 'Soleado' },
      { time: '14:00', temp: 26, waterTemp: 22, waveHeight: 1.9, uvIndex: 7, pop: 0, condition: 'Soleado' },
      { time: '16:00', temp: 25, waterTemp: 22, waveHeight: 1.8, uvIndex: 4, pop: 0, condition: 'Brisa' },
      { time: '18:00', temp: 23, waterTemp: 21, waveHeight: 1.7, uvIndex: 0, pop: 0, condition: 'Atardecer' },
      { time: '20:00', temp: 21, waterTemp: 21, waveHeight: 1.6, uvIndex: 0, pop: 0, condition: 'Noche' }
    ],
    daily: [
      { day: 'Hoy', highTemp: 26, lowTemp: 19, waveHeight: 1.8, highTide: '15:20', lowTide: '21:30', condition: 'Soleado' },
      { day: 'Sáb', highTemp: 27, lowTemp: 20, waveHeight: 1.9, highTide: '16:00', lowTide: '22:10', condition: 'Soleado' },
      { day: 'Dom', highTemp: 25, lowTemp: 18, waveHeight: 1.6, highTide: '16:40', lowTide: '22:50', condition: 'Parcial' },
      { day: 'Lun', highTemp: 24, lowTemp: 17, waveHeight: 1.4, highTide: '17:20', lowTide: '23:30', condition: 'Despejado' },
      { day: 'Mar', highTemp: 26, lowTemp: 19, waveHeight: 1.5, highTide: '18:00', lowTide: '00:10', condition: 'Soleado' }
    ],
    bestSwimWindow: '10:00 - 13:00 (Zona Norte resguardada)',
    bestSurfWindow: '07:00 - 11:00 & 15:00 - 18:00 (Praia Mole / Joaquina)',
    infrastructure: {
      parking: true,
      kiosks: true,
      rentals: true,
      lifeguard: true
    },
    photos: {
      morning: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
      afternoon: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=85',
      golden: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
      night: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=2000&q=85'
    }
  }
];
