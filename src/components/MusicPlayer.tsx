"use client";

import type { Track } from "@/lib/types";
import { useState, useRef, useEffect, useCallback } from "react";
import { FileUploader } from "./FileUploader";
import { PlaylistView } from "./PlaylistView";
import { PlayerControls } from "./PlayerControls";
import { generateTitleAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "./ui/card";
import { Disc3 } from "lucide-react";

export function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const currentTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

  const handleFilesAdded = (files: File[]) => {
    const newTracks: Track[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      title: file.name.split(".").slice(0, -1).join("."),
      url: URL.createObjectURL(file),
    }));
    setTracks((prevTracks) => [...prevTracks, ...newTracks]);
  };

  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (currentTrackIndex === null && tracks.length > 0) {
      setCurrentTrackIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = useCallback(() => {
    if (currentTrackIndex !== null) {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      setCurrentTrackIndex(nextIndex);
      setIsPlaying(true);
    }
  }, [currentTrackIndex, tracks.length]);

  const playPrev = () => {
    if (currentTrackIndex !== null) {
      const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
      setCurrentTrackIndex(prevIndex);
      setIsPlaying(true);
    }
  };
  
  const handleGenerateTitle = async (trackId: string) => {
    const trackIndex = tracks.findIndex(t => t.id === trackId);
    if (trackIndex === -1) return;

    const originalTitle = tracks[trackIndex].title;
    
    // Optimistic update
    setTracks(prev => prev.map(t => t.id === trackId ? { ...t, title: "Generating..." } : t));

    try {
      const newTitle = await generateTitleAction({ fileName: tracks[trackIndex].file.name });
      setTracks(prev => prev.map(t => t.id === trackId ? { ...t, title: newTitle } : t));
      toast({
        title: "Title Generated",
        description: `New title is "${newTitle}".`,
      });
    } catch (error) {
      console.error("Failed to generate title:", error);
      // Revert on error
      setTracks(prev => prev.map(t => t.id === trackId ? { ...t, title: originalTitle } : t));
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate a new title.",
      });
    }
  };


  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.url;
      setProgress(0);
    }
  }, [currentTrack]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(newProgress);
    }
  };

  const handleSeek = (value: number) => {
    if (audioRef.current && currentTrack) {
      const newTime = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value);
    }
  };

  return (
    <div className="relative pb-32">
       <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
        onLoadedMetadata={handleTimeUpdate}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <FileUploader onFilesAdded={handleFilesAdded} />
        </div>
        <div className="lg:col-span-2">
           {tracks.length > 0 ? (
            <PlaylistView
              tracks={tracks}
              currentTrackId={currentTrack?.id}
              isPlaying={isPlaying}
              onPlayTrack={playTrack}
              onGenerateTitle={handleGenerateTitle}
            />
          ) : (
            <Card className="bg-card border-dashed">
                <CardContent className="h-full flex flex-col items-center justify-center p-10 text-center">
                    <Disc3 className="w-16 h-16 text-muted-foreground/50 mb-4 animate-spin [animation-duration:3s]" />
                    <h3 className="text-xl font-semibold">Your playlist is empty</h3>
                    <p className="text-muted-foreground mt-1">Upload some music to get started.</p>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
     
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <PlayerControls
          track={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
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
