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
    title: 'Dancing Queen',
    artist: 'ABBA',
    album: 'Arrival',
    cover: '/cover/abba.png', // Ganti dengan URL gambar album jika ada
    url: '/music/Dancing Queen.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 230, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },


  {
    id: 2, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Only You',
    artist: 'The Platters',
    album: 'Only You',
    cover: '/cover/only you.png', // Ganti dengan URL gambar album jika ada
    url: '/music/Only You.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 159, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },



  {
    id: 3, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'No 1. Party Anthem',
    artist: 'Arctic Monkeys',
    album: 'AM',
    cover: '/cover/AM.png', // Ganti dengan URL gambar album jika ada
    url: '/music/NUMEROUNO.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 243, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 4, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Do I Wanna Know?',
    artist: 'Arctic Monkeys',
    album: 'AM',
    cover: '/cover/AM.png', // Ganti dengan URL gambar album jika ada
    url: '/music/DOIWK.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 271, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 5, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Piano Man',
    artist: 'Billy Joel',
    album: 'Piano Man',
    cover: '/cover/billy.png', // Ganti dengan URL gambar album jika ada
    url: '/music/Piano Man.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 338, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 6, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Uptown Girl',
    artist: 'Billy Joel',
    album: 'Piano Man',
    cover: '/cover/billy.png', // Ganti dengan URL gambar album jika ada
    url: '/music/Uptown Girl.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 196, // <-- GANTI DURASI (detik, kira-kira juga boleh)
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
