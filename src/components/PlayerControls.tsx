"use client";

import type { Track } from "@/lib/types";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Pause, Play, SkipBack, SkipForward, Volume1, Volume2, VolumeX, Music2 } from "lucide-react";
import Image from 'next/image';

interface PlayerControlsProps {
  track: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (value: number) => void;
  onVolumeChange: (value: number) => void;
}

export function PlayerControls({
  track,
  isPlaying,
  progress,
  volume,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
}: PlayerControlsProps) {

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  
  // This is a placeholder as we don't have audio duration yet
  const duration = 200; // Mock duration
  const currentTime = (progress / 100) * duration;

  return (
    <div className="bg-card/80 backdrop-blur-lg border-t border-border/50 p-4 w-full">
      <div className="container mx-auto flex items-center gap-4">
        <div className="flex items-center gap-4 w-1/4">
          <div className="w-14 h-14 bg-secondary rounded-md flex items-center justify-center">
            {track ? (
              <Music2 className="w-8 h-8 text-muted-foreground" />
            ) : (
               <Music2 className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-grow overflow-hidden">
            <p className="font-semibold truncate text-foreground">{track?.title || "No track selected"}</p>
            <p className="text-sm text-muted-foreground truncate">{track?.artist || "..."}</p>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center gap-2 w-1/2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onPrev} disabled={!track}>
              <SkipBack className="w-6 h-6" />
            </Button>
            <Button variant="default" size="icon" className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90" onClick={onTogglePlay} disabled={!track}>
              {isPlaying ? <Pause className="w-6 h-6 fill-primary-foreground" /> : <Play className="w-6 h-6 fill-primary-foreground" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onNext} disabled={!track}>
              <SkipForward className="w-6 h-6" />
            </Button>
          </div>
          <div className="w-full flex items-center gap-2">
             <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={[progress]}
              onValueChange={([value]) => onSeek(value)}
              max={100}
              step={1}
              disabled={!track}
            />
             <span className="text-xs text-muted-foreground w-10 text-left">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-1/4 justify-end">
          {volume === 0 ? <VolumeX className="w-5 h-5 text-muted-foreground" /> : volume < 0.5 ? <Volume1 className="w-5 h-5 text-muted-foreground" /> : <Volume2 className="w-5 h-5 text-muted-foreground" />}
          <Slider
            value={[volume * 100]}
            onValueChange={([value]) => onVolumeChange(value / 100)}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}
