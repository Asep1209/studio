import MusicPlayer from '@/components/MusicPlayer';
import { mockTracks } from '@/lib/mock-data';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-7xl mx-auto h-screen">
        <MusicPlayer initialTracks={mockTracks} />
      </div>
    </main>
  );
}
