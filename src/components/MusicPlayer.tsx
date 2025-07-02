"use client";

import type { Track } from "@/lib/types";
import { useState, useRef, useEffect, useCallback } from "react";
import { PlaylistView } from "./PlaylistView";
import { PlayerControls } from "./PlayerControls";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Disc3, Search } from "lucide-react";
import { mockTracks } from "@/lib/mock-data";

export function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>(mockTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const audioRef = useRef<HTMLAudioElement>(null);

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (track.artist || "Unknown Artist").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentTrack = currentTrackIndex !== null ? filteredTracks[currentTrackIndex] : null;

  const playTrack = useCallback((index: number) => {
    if (index >= 0 && index < filteredTracks.length) {
      const trackToPlay = filteredTracks[index];
      setCurrentTrackIndex(index);
      setIsPlaying(true);
      setDuration(0);
      setProgress(0);

      if (audioRef.current) {
        audioRef.current.src = trackToPlay.url;
        audioRef.current.load();
        audioRef.current.play().catch(e => console.error("Playback error:", e));
      }
    }
  }, [filteredTracks]);

  const togglePlay = () => {
    if (currentTrackIndex === null && filteredTracks.length > 0) {
      playTrack(0);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const playCycle = useCallback((direction: 'next' | 'prev') => {
    if (filteredTracks.length === 0) return;

    let nextFilteredIndex;
    if (currentTrackIndex === null) {
      nextFilteredIndex = 0;
    } else {
      const numTracks = filteredTracks.length;
      if (direction === 'next') {
        nextFilteredIndex = (currentTrackIndex + 1) % numTracks;
      } else {
        nextFilteredIndex = (currentTrackIndex - 1 + numTracks) % numTracks;
      }
    }
    playTrack(nextFilteredIndex);
  }, [currentTrackIndex, filteredTracks, playTrack]);

  const playNext = useCallback(() => playCycle('next'), [playCycle]);
  const playPrev = useCallback(() => playCycle('prev'), [playCycle]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => { 
          console.error("Playback error:", e);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration && isFinite(audioRef.current.duration)) {
      const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(newProgress);
    }
  };

  const handleMetadataLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }

  const handleSeek = (value: number) => {
    if (audioRef.current && currentTrack) {
      const newTime = (value / 100) * duration;
      if (isFinite(newTime)) {
          audioRef.current.currentTime = newTime;
          setProgress(value);
      }
    }
  };

  const renderPlaylistContent = () => {
    if (filteredTracks.length > 0) {
      return (
       <PlaylistView
         tracks={filteredTracks}
         currentTrackId={currentTrack?.id}
         isPlaying={isPlaying}
         onPlayTrack={playTrack}
       />
     );
    }
    
    return (
     <Card className="bg-card border-dashed">
         <CardContent className="h-full flex flex-col items-center justify-center p-10 text-center">
             <Disc3 className="w-16 h-16 text-muted-foreground/50 mb-4 animate-spin [animation-duration:3s]" />
             <h3 className="text-xl font-semibold">Playlist Kosong</h3>
             <p className="text-muted-foreground mt-1">Tambahkan lagu di `src/lib/mock-data.ts`.</p>
         </CardContent>
     </Card>
   );
 };

  return (
    <div className="relative pb-32">
       <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
        onLoadedMetadata={handleMetadataLoaded}
      />
      <div className="grid grid-cols-1 gap-8">
        <div className="col-span-1">
           <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Cari lagu di playlist..."
                className="w-full pl-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
           {renderPlaylistContent()}
        </div>
      </div>
     
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <PlayerControls
          track={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          volume={volume}
          onTogglePlay={togglePlay}
          onNext={playNext}
          onPrev={playPrev}
          onSeek={handleSeek}
          onVolumeChange={setVolume}
        />
      </div>
    </div>
  );
}
