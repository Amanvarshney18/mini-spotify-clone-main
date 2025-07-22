import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Playlist from "./pages/Playlist";
import NotFound from "./pages/NotFound";
import { mockTracks, mockPlaylists } from "@/data/mockData";

const queryClient = new QueryClient();

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(mockTracks);

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPlaylist = (playlistId: string) => {
    const playlist = mockPlaylists.find(p => p.id === playlistId);
    if (playlist && playlist.tracks.length > 0) {
      setCurrentPlaylist(playlist.tracks);
      setCurrentTrack(playlist.tracks[0]);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = currentPlaylist.findIndex(track => track.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % currentPlaylist.length;
    setCurrentTrack(currentPlaylist[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = currentPlaylist.findIndex(track => track.id === currentTrack?.id);
    const prevIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1;
    setCurrentTrack(currentPlaylist[prevIndex]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex h-screen bg-spotify-dark overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <main className="flex-1 overflow-y-auto pb-24">
                <Routes>
                  <Route 
                    path="/" 
                    element={<Home onPlayPlaylist={handlePlayPlaylist} />} 
                  />
                  <Route 
                    path="/search" 
                    element={<Search onPlayTrack={handlePlayTrack} />} 
                  />
                  <Route 
                    path="/library" 
                    element={<Library onPlayPlaylist={handlePlayPlaylist} />} 
                  />
                  <Route 
                    path="/playlist/:id" 
                    element={
                      <Playlist 
                        currentTrack={currentTrack}
                        isPlaying={isPlaying}
                        onPlayTrack={handlePlayTrack}
                        onPlayPause={handlePlayPause}
                      />
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Music Player */}
              <MusicPlayer
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
