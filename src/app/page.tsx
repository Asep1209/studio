import { MusicPlayer } from "@/components/MusicPlayer";
import { Music } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center gap-4 mb-8">
           <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <Music className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
              Lossless Audio Player
            </h1>
            <p className="text-muted-foreground">
              Upload and enjoy your music in high-fidelity.
            </p>
          </div>
        </header>
        <MusicPlayer />
      </div>
    </main>
  );
}
