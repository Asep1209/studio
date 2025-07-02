'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import PlayerControls from './PlayerControls';
import PlaylistView from './PlaylistView';
import type { Track } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface MusicPlayerProps {
  initialTracks: Track[];
}

export default function MusicPlayer({ initialTracks }: MusicPlayerProps) {
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    initialTracks.length > 0 ? 0 : null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack =
    currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

  const handlePlayPause = useCallback(() => {
    if (!currentTrack) return;
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, currentTrack]);

  const handleNext = useCallback(() => {
    if (tracks.length === 0) return;
    const newIndex =
      currentTrackIndex === null ? 0 : (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(newIndex);
  }, [currentTrackIndex, tracks.length]);

  const handlePrev = useCallback(() => {
    if (tracks.length === 0) return;
    const newIndex =
      currentTrackIndex === null
        ? 0
        : (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(newIndex);
  }, [currentTrackIndex, tracks.length]);

  const handleTrackSelect = (track: Track) => {
    const trackIndex = tracks.findIndex((t) => t.id === track.id);
    if (trackIndex !== -1) {
      setCurrentTrackIndex(trackIndex);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };

    const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
    }

    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [handleNext]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 md:p-8 h-full">
      <audio ref={audioRef} />
      <div className="md:col-span-1 h-[450px] md:h-full">
         <PlaylistView
            tracks={tracks}
            currentTrack={currentTrack}
            onTrackSelect={handleTrackSelect}
          />
      </div>
      <div className="md:col-span-2 flex flex-col items-center justify-center gap-8">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-48 h-48 bg-muted rounded-md mb-6 relative overflow-hidden shadow-lg">
              {currentTrack ? (
                <Image
                  src={currentTrack.cover}
                  alt={currentTrack.album}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground">Select a song</span>
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold truncate w-full">
              {currentTrack?.title ?? 'No song selected'}
            </h2>
            <p className="text-muted-foreground truncate w-full">
              {currentTrack?.artist ?? 'Please select a song from the playlist'}
            </p>
          </CardContent>
        </Card>
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          progress={progress}
          volume={volume}
          duration={duration}
          currentTime={currentTime}
          currentTrack={currentTrack}
        />
      </div>
    </div>
  );
}
