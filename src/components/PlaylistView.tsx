'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Music2 } from 'lucide-react';
import type { Track } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PlaylistViewProps {
  tracks: Track[];
  currentTrack: Track | null;
  onTrackSelect: (track: Track) => void;
}

export default function PlaylistView({
  tracks,
  currentTrack,
  onTrackSelect,
}: PlaylistViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search songs or artists..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-2">
          {filteredTracks.length > 0 ? (
            <ul>
              {filteredTracks.map((track) => (
                <li
                  key={track.id}
                  onClick={() => onTrackSelect(track)}
                  className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                    currentTrack?.id === track.id
                      ? 'bg-primary/20'
                      : 'hover:bg-primary/10'
                  }`}
                >
                  <div className="w-12 h-12 bg-muted rounded-md flex-shrink-0 mr-4 relative overflow-hidden">
                    <Image
                      src={track.cover}
                      alt={track.album}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-semibold truncate">{track.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {track.artist}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
              <Music2 className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-semibold">No Songs Found</h3>
              <p className="text-sm">
                {tracks.length === 0
                  ? "Your playlist is empty. Add songs to 'src/lib/mock-data.ts' to get started."
                  : "Try a different search term."}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
