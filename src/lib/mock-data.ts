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
    cover: '/cover/only you.jpg', // Ganti dengan URL gambar album jika ada
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
    cover: '/cover/billy.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Piano Man.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 338, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 6, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Uptown Girl',
    artist: 'Billy Joel',
    album: 'Piano Man',
    cover: '/cover/billy.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Uptown Girl.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 196, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  
  {
    id: 7, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Africa',
    artist: 'Toto',
    album: 'TOTOIV',
    cover: '/cover/totoiv.jpeg', // Ganti dengan URL gambar album jika ada
    url: '/music/Africa.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 295, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },


  {
    id: 8, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Chiquitita',
    artist: 'ABBA',
    album: 'Chiquitita',
    cover: '/cover/abba2.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Chiquitita.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 326, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 9, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Come Together',
    artist: 'The Beatles',
    album: 'Abbey Road',
    cover: '/cover/beatles.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Come Together.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 259, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 10, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Dont Stop Me Now',
    artist: 'Queen',
    album: 'Jazz',
    cover: '/cover/queen.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Dont Stop Me Now.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 209, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 11, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Fernando',
    artist: 'ABBA',
    album: 'Frida Ensam',
    cover: '/cover/abba2.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Fernando.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 255, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 12, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Here Comes The Sun',
    artist: 'The Beatles',
    album: 'Abbey Road',
    cover: '/cover/beatles.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Here Comes The Sun.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 185, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 13, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Hey Jude',
    artist: 'The Beatles',
    album: 'Hey Jude',
    cover: '/cover/beatles.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Hey Jude.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 431, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 14, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Killer Queen',
    artist: 'Queen',
    album: 'Sheer Heart Attack',
    cover: '/cover/queen.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Killer Queen.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 180, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 15, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Let It Be',
    artist: 'The Beatles',
    album: 'Let It Be',
    cover: '/cover/beatles.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Let It Be.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 243, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 16, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Rosanna',
    artist: 'TOTO',
    album: 'TOTOIV',
    cover: '/cover/totoiv.jpeg', // Ganti dengan URL gambar album jika ada
    url: '/music/Rosanna.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 331, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 17, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'Thank You for the Music',
    artist: 'ABBA',
    album: 'Thank You for the Music',
    cover: '/cover/abba2.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/Thank You for the Music.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 289, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 18, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'The Winner Takes It All',
    artist: 'ABBA',
    album: 'The Winner Takes It All',
    cover: '/cover/abba2.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/The Winner Takes It All.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 296, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 19, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'We Are The Champions',
    artist: 'Queen',
    album: 'News of The World',
    cover: '/cover/queen.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/We Are The Champions.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 180, // <-- GANTI DURASI (detik, kira-kira juga boleh)
  },

  {
    id: 20, // <-- GANTI NOMOR ID (mulai dari 1, 2, 3, dst.)
    title: 'We Will Rock You',
    artist: 'Queen',
    album: 'News of The World',
    cover: '/cover/queen.jpg', // Ganti dengan URL gambar album jika ada
    url: '/music/We Will Rock You.flac', // <-- GANTI NAMA FILE (HARUS SAMA DENGAN DI FOLDER public/music)
    duration: 122, // <-- GANTI DURASI (detik, kira-kira juga boleh)
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
