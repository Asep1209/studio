import type { Track } from './types';

/**
 * =========================================
 * PENTING: CARA MENAMBAHKAN LAGU LOKAL ANDA
 * =========================================
 *
 * 1. Buat folder `public` di root project Anda (sejajar dengan folder `src`).
 * 2. Di dalam folder `public`, buat lagi folder bernama `music`.
 * 3. Taruh semua file lagu (misal: my-song.mp3) ke dalam folder `public/music`.
 *
 * 4. Untuk setiap lagu, tambahkan satu objek baru di dalam array `mockTracks` di bawah ini.
 *
 * CONTOH:
 * Kalau Anda punya lagu `keren.mp3` di folder `public/music`, entri-nya akan seperti ini:
 *
 * {
 *   id: 1,
 *   title: 'Lagu Keren Banget',
 *   artist: 'Nama Artisnya',
 *   album: 'Album Terbaik',
 *   cover: 'https://placehold.co/128x128.png', // Link gambar cover album
 *   url: '/music/keren.mp3', // PENTING: Path harus diawali dengan /music/
 *   duration: 180, // Durasi lagu dalam detik
 * }
 */

export const mockTracks: Track[] = [
  {
    id: 1,
    title: 'Echoes of Tomorrow',
    artist: 'Vector Seven',
    album: 'Cybernetic Dreams',
    cover: 'https://placehold.co/128x128.png',
    url: '/music/echoes-of-tomorrow.mp3',
    duration: 215,
  },
  {
    id: 2,
    title: 'Midnight Drive',
    artist: 'Synthwave Rider',
    album: 'Neon Nights',
    cover: 'https://placehold.co/128x128.png',
    url: '/music/midnight-drive.mp3',
    duration: 180,
  },
  {
    id: 3,
    title: 'Cosmic Dust',
    artist: 'Galaxy Runners',
    album: 'Starlight',
    cover: 'https://placehold.co/128x128.png',
    url: '/music/cosmic-dust.mp3',
    duration: 240,
  },
  {
    id: 4,
    title: 'Lost in the Grid',
    artist: 'Digital Nomad',
    album: 'System Failure',
    cover: 'https://placehold.co/128x128.png',
    url: '/music/lost-in-the-grid.mp3',
    duration: 195,
  },
];
