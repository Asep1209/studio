"use client";

import type { Track } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Music, Play, Pause } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface PlaylistViewProps {
  tracks: Track[];
  currentTrackId?: string | null;
  isPlaying: boolean;
  onPlayTrack: (index: number) => void;
}

export function PlaylistView({ tracks, currentTrackId, isPlaying, onPlayTrack }: PlaylistViewProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>My Playlist</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="flex flex-col gap-2">
            {tracks.map((track, index) => {
              const isActive = track.id === currentTrackId;
              return (
                <div
                  key={track.id}
                  className={cn(
                    "group flex items-center gap-4 p-2 rounded-md transition-colors hover:bg-secondary",
                    isActive && "bg-secondary"
                  )}
                >
                  <Button variant="ghost" size="icon" onClick={() => onPlayTrack(index)} className="w-10 h-10">
                    {isActive && isPlaying ? (
                      <Pause className="w-5 h-5 text-primary" />
                    ) : (
                      <>
                        <Play className="w-5 h-5 text-primary hidden group-hover:block" />
                        <Music className="w-5 h-5 text-muted-foreground group-hover:hidden" />
                      </>
                    )}
                  </Button>
                  <div className="flex-grow overflow-hidden">
                    <p className={cn("font-medium truncate", isActive && "text-primary")}>
                      {track.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">{track.artist || "Unknown Artist"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
