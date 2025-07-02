import type { Track } from './types';

/**
 * =========================================
 * PENTING: DAFTARKAN SEMUA LAGU ANDA DI SINI
 * =========================================
 *
 * 1. Pastikan semua file MP3 sudah ada di folder `public/music`.
 * 2. Copy-paste blok template di bawah ini untuk setiap lagu.
 * 3. Isi datanya sesuai lagu Anda.
 *
 */

export const mockTracks: Track[] = [
  // --- MULAI DAFTARKAN LAGU ANDA DI SINI ---
  // Copy-paste blok di bawah ini untuk setiap lagu yang Anda punya.
  // Jangan lupa hapus tanda comment (/* dan */) nya.




  {
    id: 1, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'No Surprises',
    artist: 'Radiohead',
    album: 'OK COMPUTER',
    cover: '/cover/nospr.png', // Ganti dengan URL gambar album jika ada
    url: '/music/No Surprises.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 228, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },


  {
    id: 2, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Let Down',
    artist: 'Radiohead',
    album: 'OK COMPUTER',
    cover: '/cover/nospr.png', // Ganti dengan URL gambar album jika ada
    url: '/music/LetDown.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 299, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },



  {
    id: 3, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Aku Milikmu',
    artist: 'Dewa 19',
    album: 'Format Masa Depan',
    cover: '/cover/Format.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Aku milikmu.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 332, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 4, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Masihkah Ada',
    artist: 'Dewa 19',
    album: 'Format Masa Depan',
    cover: '/cover/Format.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Masihkah ada.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 227, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 5, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Still Im Sure We Love Again',
    artist: 'Dewa 19',
    album: 'Format Masa Depan',
    cover: '/cover/Format.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Still im.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 236, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 6, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Takkan Ada Cinta yang Lain',
    artist: 'Dewa 19',
    album: 'Format Masa Depan',
    cover: '/cover/Format.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Takkan ada.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 269, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },
  /*
  {
    id: 1, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'GANTI DENGAN JUDUL LAGU',
    artist: 'GANTI DENGAN NAMA ARTIS',
    album: 'GANTI DENGAN NAMA ALBUM',
    cover: 'https://placehold.co/128x128.png', // Ganti dengan URL gambar album jika ada
    url: '/musi/NAMA-FILE-LAGU.mp3', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 180, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },
  */
  /*
  {
    id: 2, // <-- GANTI NOMOR ID
    title: 'JUDUL LAGU KEDUA',
    artist: 'ARTIS KEDUA',
    album: 'ALBUM KEDUA',
    cover: 'https://placehold.co/128x128.png',
    url: '/music/NAMA-FILE-LAGU-2.mp3', // <-- GANTI NAMA FILE
    duration: 210, // <-- GANTI DURASI (detik)
  },
  */

  // --- BATAS AKHIR DAFTAR LAGU ---
];
