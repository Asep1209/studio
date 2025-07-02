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
  // <-- Tambahkan data lagu Anda di sini
  // {
  //   id: 1,
  //   title: 'Judul Lagu Anda',
  //   artist: 'Artis Anda',
  //   album: 'Album Anda',
  //   cover: 'https://placehold.co/128x128.png',
  //   url: '/music/nama-file-lagu-anda.mp3',
  //   duration: 210,
  // },
];
