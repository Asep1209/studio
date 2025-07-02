"use client";

import type { Track } from "@/lib/types";
import { useState, useRef, useEffect, useCallback } from "react";
import { FileUploader } from "./FileUploader";
import { PlaylistView } from "./PlaylistView";
import { PlayerControls } from "./PlayerControls";
import { generateTitleAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Disc3, AlertTriangle } from "lucide-react";
import { db, storage, isFirebaseConfigured } from "@/lib/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const currentTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsLoading(false);
      return;
    }

    const fetchTracks = async () => {
      setIsLoading(true);
      try {
        if (!db) return;
        const tracksCollection = collection(db, "tracks");
        const q = query(tracksCollection, orderBy("createdAt"));
        const querySnapshot = await getDocs(q);
        const fetchedTracks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Track[];
        setTracks(fetchedTracks);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        toast({
          variant: "destructive",
          title: "Error fetching playlist",
          description: "Could not load tracks from the cloud.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [toast]);

  const handleFilesAdded = async (files: File[]) => {
    if (!isFirebaseConfigured || !storage || !db) {
        toast({
          variant: "destructive",
          title: "Firebase Not Configured",
          description: "Please provide valid Firebase credentials in .env to upload files.",
        });
        return;
    }

    for (const file of files) {
      toast({
        title: "Uploading...",
        description: `Your track "${file.name}" is being uploaded.`,
      });

      try {
        const storagePath = `music/${Date.now()}-${file.name}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        const trackData = {
          title: file.name.split(".").slice(0, -1).join("."),
          url: downloadURL,
          storagePath,
          fileName: file.name,
          artist: "Unknown Artist",
          createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, "tracks"), trackData);
        
        const newTrack: Track = {
          id: docRef.id,
          title: trackData.title,
          url: trackData.url,
          storagePath: trackData.storagePath,
          fileName: trackData.fileName,
          artist: trackData.artist,
        };
        setTracks((prevTracks) => [...prevTracks, newTrack]);
        
        toast({
          title: "Upload Complete",
          description: `"${newTrack.title}" has been added to your playlist.`,
        });

      } catch (error) {
        console.error("Upload failed:", error);
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: `Could not upload "${file.name}".`,
        });
      }
    }
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
    if (!isFirebaseConfigured || !db) {
      toast({
        variant: "destructive",
        title: "Firebase Not Configured",
        description: "Cannot generate title without Firebase configuration.",
      });
      return;
    }
    
    const trackIndex = tracks.findIndex(t => t.id === trackId);
    if (trackIndex === -1) return;

    const trackToUpdate = tracks[trackIndex];
    const originalTitle = trackToUpdate.title;
    
    setTracks(prev => prev.map(t => t.id === trackId ? { ...t, title: "Generating..." } : t));

    try {
      const newTitle = await generateTitleAction({ fileName: trackToUpdate.fileName });
      
      const trackRef = doc(db, "tracks", trackId);
      await updateDoc(trackRef, { title: newTitle });

      setTracks(prev => prev.map(t => t.id === trackId ? { ...t, title: newTitle } : t));
      
      toast({
        title: "Title Generated",
        description: `New title is "${newTitle}".`,
      });
    } catch (error) {
      console.error("Failed to generate title:", error);
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

  const renderPlaylistContent = () => {
    if (!isFirebaseConfigured) {
      return (
        <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2 text-destructive">
               <AlertTriangle />
               Firebase Not Configured
             </CardTitle>
           </CardHeader>
           <CardContent>
             <p>
               Cloud features are disabled. Please provide your Firebase project configuration in the <code className="bg-muted px-1 py-0.5 rounded-sm font-mono text-sm">.env</code> file.
             </p>
             <p className="mt-2 text-sm text-muted-foreground">
               After updating the <code className="bg-muted px-1 py-0.5 rounded-sm font-mono text-sm">.env</code> file, you will need to restart the development server.
             </p>
           </CardContent>
         </Card>
      );
    }

    if (isLoading) {
      return (
        <Card>
           <CardHeader><CardTitle>My Playlist</CardTitle></CardHeader>
           <CardContent className="h-[400px] space-y-4 pt-2 pr-4">
             <Skeleton className="h-12 w-full" />
             <Skeleton className="h-12 w-full" />
             <Skeleton className="h-12 w-full" />
             <Skeleton className="h-12 w-full" />
           </CardContent>
        </Card>
      );
    }
    
    if (tracks.length > 0) {
      return (
       <PlaylistView
         tracks={tracks}
         currentTrackId={currentTrack?.id}
         isPlaying={isPlaying}
         onPlayTrack={playTrack}
         onGenerateTitle={handleGenerateTitle}
       />
     );
    }
    
    return (
     <Card className="bg-card border-dashed">
         <CardContent className="h-full flex flex-col items-center justify-center p-10 text-center">
             <Disc3 className="w-16 h-16 text-muted-foreground/50 mb-4 animate-spin [animation-duration:3s]" />
             <h3 className="text-xl font-semibold">Your playlist is empty</h3>
             <p className="text-muted-foreground mt-1">Upload some music to get started.</p>
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
        onLoadedMetadata={handleTimeUpdate}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <FileUploader onFilesAdded={handleFilesAdded} />
        </div>
        <div className="lg:col-span-2">
           {renderPlaylistContent()}
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
