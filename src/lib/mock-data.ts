import type { Track } from './types';

/**
 * =========================================
 * PENTING: CARA MENDAFTARKAN LAGU ANDA
 * =========================================
 *
 * 1. Pastikan semua file lagu sudah ada di dalam folder `public/music`.
 * 2. Hapus atau ganti semua contoh lagu di bawah ini dengan koleksi pribadi Anda.
 * 3. Untuk setiap lagu, cukup copy-paste salah satu blok di bawah dan isi datanya.
 *
 * CONTOH:
 * Kalau Anda punya lagu `keren.mp3` di folder `public/music`, entri-nya akan seperti ini:
 *
 * {
 *   id: 1, // Ganti dengan nomor urut
 *   title: 'Judul Lagu Keren',
 *   artist: 'Artisnya Siapa',
 *   album: 'Nama Albumnya',
 *   cover: 'https://placehold.co/128x128.png', // Boleh pake ini atau ganti link gambar lain
 *   url: '/music/keren.mp3', // PENTING: Sesuaikan nama file lagunya
 *   duration: 180, // Ganti dengan durasi lagu dalam detik (kira-kira juga boleh)
 * },
 *
 */

export const mockTracks: Track[] = [
  // HAPUS ATAU GANTI SEMUA LAGU DI BAWAH INI DENGAN KOLEKSI ANDA
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

  // --- TEMPLATE UNTUK LAGU BARU (COPY-PASTE BLOK INI & EDIT ISINYA) ---
  /*
  {
    id: 5, // <-- GANTI NOMOR ID
    title: 'GANTI DENGAN JUDUL LAGU',
    artist: 'GANTI DENGAN NAMA ARTIS',
    album: 'GANTI DENGAN NAMA ALBUM',
    cover: 'https://placehold.co/128x128.png',
    url: '/music/NAMA-FILE-LAGU.mp3', // <-- GANTI NAMA FILE
    duration: 180, // <-- GANTI DURASI (detik)
  },
  */
];
