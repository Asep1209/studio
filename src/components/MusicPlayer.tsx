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
import { Input } from "./ui/input";
import { Disc3, AlertTriangle, Search } from "lucide-react";
import { db, storage, isFirebaseConfigured } from "@/lib/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { mockTracks } from "@/lib/mock-data";

export function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (track.artist || "Unknown Artist").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setTracks(mockTracks);
      setIsLoading(false);
      return;
    }

    const fetchTracks = async () => {
      setIsLoading(true);
      try {
        if (!db) {
          setTracks(mockTracks);
          return;
        };
        const tracksCollection = collection(db, "tracks");
        const q = query(tracksCollection, orderBy("createdAt"));
        const querySnapshot = await getDocs(q);
        const fetchedTracks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Track[];
        
        if (fetchedTracks.length > 0) {
          setTracks(fetchedTracks);
        } else {
          setTracks(mockTracks);
        }
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setTracks(mockTracks);
        toast({
          variant: "destructive",
          title: "Error fetching playlist",
          description: "Could not load tracks from the cloud. Showing local data.",
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

    const isUsingMockData = tracks.some(track => mockTracks.some(mock => mock.id === track.id));
    if(isUsingMockData) {
      setTracks([]);
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

  const playTrack = useCallback((index: number) => {
    if (index >= 0 && index < filteredTracks.length) {
      const trackToPlay = filteredTracks[index];
      const originalIndex = tracks.findIndex((t) => t.id === trackToPlay.id);
      if (originalIndex !== -1) {
        setCurrentTrackIndex(originalIndex);
        setIsPlaying(true);
      }
    }
  }, [filteredTracks, tracks]);

  const togglePlay = () => {
    if (currentTrackIndex === null && filteredTracks.length > 0) {
      playTrack(0);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const playCycle = useCallback((direction: 'next' | 'prev') => {
    if (filteredTracks.length === 0) return;

    const currentFilteredIndex = currentTrack ? filteredTracks.findIndex((t) => t.id === currentTrack.id) : -1;
    let nextFilteredIndex;

    if (currentFilteredIndex === -1) {
      nextFilteredIndex = 0;
    } else {
      const numTracks = filteredTracks.length;
      if (direction === 'next') {
        nextFilteredIndex = (currentFilteredIndex + 1) % numTracks;
      } else {
        nextFilteredIndex = (currentFilteredIndex - 1 + numTracks) % numTracks;
      }
    }
    playTrack(nextFilteredIndex);
  }, [currentTrack, filteredTracks, playTrack]);

  const playNext = useCallback(() => playCycle('next'), [playCycle]);
  const playPrev = useCallback(() => playCycle('prev'), [playCycle]);
  
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
    
    if (mockTracks.some(mock => mock.id === trackId)) {
       toast({
        variant: "destructive",
        title: "Cannot Generate Title",
        description: "This is a local track. Please upload it to the cloud first.",
      });
      return;
    }

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
      if (isPlaying) {
         audioRef.current.play().catch(e => console.error("Playback error:", e));
      }
    }
  }, [currentTrack, isPlaying]);
  
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
    if (isFirebaseConfigured && isLoading) {
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
    
    if (filteredTracks.length > 0) {
      return (
       <PlaylistView
         tracks={filteredTracks}
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
           <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for tracks..."
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
