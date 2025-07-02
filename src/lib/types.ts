export type Track = {
  id: number;
  title: string;
  artist: string;
  album: string;
  cover: string; // URL to album art
  url: string; // URL to audio file
  duration: number; // in seconds
};
