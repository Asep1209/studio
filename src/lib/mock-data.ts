import type { Track } from './types';

// Using a placeholder audio file that is silent and short.
const placeholderAudioUrl = 'https://storage.googleapis.com/ci-prod-media/dev-sizzle/items/222210/versions/222209/streams/233857/1719532296000/mp3_32/file';

export const mockTracks: Track[] = [
  {
    id: 'mock-1',
    title: 'Starlight Echo',
    artist: 'Cosmic Voyager',
    album: 'Galactic Dreams',
    url: placeholderAudioUrl,
    storagePath: 'mock/starlight_echo.mp3',
    fileName: 'starlight_echo.mp3',
  },
  {
    id: 'mock-2',
    title: 'Oceanic Drift',
    artist: 'The Sirens',
    album: 'Deep Blue',
    url: placeholderAudioUrl,
    storagePath: 'mock/oceanic_drift.mp3',
    fileName: 'oceanic_drift.mp3',
  },
  {
    id: 'mock-3',
    title: 'City Glow',
    artist: 'Neon Knights',
    album: 'Urban Pulse',
    url: placeholderAudioUrl,
    storagePath: 'mock/city_glow.mp3',
    fileName: 'city_glow.mp3',
  },
  {
    id: 'mock-4',
    title: 'Forest Lullaby',
    artist: 'Willow Creek',
    album: 'Songs of the Earth',
    url: placeholderAudioUrl,
    storagePath: 'mock/forest_lullaby.flac',
    fileName: 'forest_lullaby.flac',
  },
  {
    id: 'mock-5',
    title: 'Digital Sunset',
    artist: 'Glitch Mob',
    album: 'System Reset',
    url: placeholderAudioUrl,
    storagePath: 'mock/digital_sunset.wav',
    fileName: 'digital_sunset.wav',
  },
];
