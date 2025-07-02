import type { Track } from './types';

/**
 * =================================================================================
 * PENTING: CARA MENAMBAHKAN LAGU LOKAL ANDA
 * =================================================================================
 * 1. Buat folder baru bernama `music` di dalam folder `public`.
 *    Struktur akhirnya akan menjadi: `public/music/`
 * 
 * 2. Salin semua file lagu Anda (misal: .mp3, .flac) ke dalam folder `public/music` tersebut.
 * 
 * 3. Daftarkan setiap lagu di dalam array `mockTracks` di bawah ini.
 *    - `id`: harus unik untuk setiap lagu.
 *    - `title`: Judul lagu yang akan tampil.
 *    - `artist`: Nama artis.
 *    - `url`: Path ke file lagu, harus diawali dengan `/music/`. 
 *             Contoh: `/music/nama-file-lagu-anda.mp3`
 * =================================================================================
 */

export const mockTracks: Track[] = [
  // Contoh - Ganti atau hapus dan tambahkan lagu Anda sendiri
  {
    id: 1,
    title: "Contoh Lagu 1",
    artist: "Musisi Lokal",
    url: "/music/contoh1.mp3",
  },
  {
    id: 2,
    title: "Contoh Lagu 2",
    artist: "Musisi Lokal",
    url: "/music/contoh2.mp3",
  },
];
