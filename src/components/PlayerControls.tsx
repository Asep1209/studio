'use client';

import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import type { Track } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (value: number[]) => void;
  onVolumeChange: (value: number[]) => void;
  progress: number;
  volume: number;
  duration: number;
  currentTime: number;
  currentTrack: Track | null;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
  progress,
  volume,
  duration,
  currentTime,
  currentTrack,
}: PlayerControlsProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 bg-card/50 backdrop-blur-sm rounded-lg">
      <div className="flex items-center gap-4">
        <Button onClick={onPrev} variant="ghost" size="icon" disabled={!currentTrack}>
          <SkipBack className="h-6 w-6" />
        </Button>
        <Button onClick={onPlayPause} variant="default" size="icon" className="h-14 w-14 rounded-full" disabled={!currentTrack}>
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="h-8 w-8" />
          )}
        </Button>
        <Button onClick={onNext} variant="ghost" size="icon" disabled={!currentTrack}>
          <SkipForward className="h-6 w-6" />
        </Button>
      </div>
      <div className="w-full max-w-md mt-4 flex items-center gap-4">
        <span className="text-xs text-muted-foreground w-10 text-right">
          {formatTime(currentTime)}
        </span>
        <Slider
          value={[progress]}
          onValueChange={onSeek}
          max={100}
          step={1}
          disabled={!currentTrack}
          className="w-full"
        />
        <span className="text-xs text-muted-foreground w-10">
          {formatTime(duration)}
        </span>
      </div>
       <div className="w-40 mt-2 flex items-center gap-2">
        {volume > 0 ? (
            <Volume2 className="h-5 w-5 text-muted-foreground" />
        ) : (
            <VolumeX className="h-5 w-5 text-muted-foreground" />
        )}
        <Slider
            value={[volume * 100]}
            onValueChange={(value) => onVolumeChange([value[0] / 100])}
            max={100}
            step={1}
        />
      </div>
    </div>
  );
}
