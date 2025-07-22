import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, MoreHorizontal, Heart, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPlaylists, mockTracks } from '@/data/mockData';

interface PlaylistProps {
  currentTrack: any;
  isPlaying: boolean;
  onPlayTrack: (track: any) => void;
  onPlayPause: () => void;
}

export default function Playlist({ currentTrack, isPlaying, onPlayTrack, onPlayPause }: PlaylistProps) {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  
  // Find playlist or use default
  const playlist = mockPlaylists.find(p => p.id === id) || {
    id: 'default',
    name: 'My Playlist',
    description: 'A collection of great songs',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    tracks: mockTracks
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = playlist.tracks.reduce((acc, track) => acc + track.duration, 0);
  const formatTotalTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;
  };

  return (
    <div className="min-h-screen">
      {/* Header with gradient */}
      <div className="relative bg-gradient-to-b from-purple-800 via-purple-900 to-spotify-dark p-6 pb-8">
        <div className="flex items-end space-x-6">
          <img
            src={playlist.cover}
            alt={playlist.name}
            className="w-60 h-60 shadow-2xl rounded"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white mb-2">PLAYLIST</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 break-words">
              {playlist.name}
            </h1>
            <p className="text-spotify-text-muted mb-4">{playlist.description}</p>
            <div className="flex items-center text-sm text-white">
              <span className="font-semibold">Spotify</span>
              <span className="mx-1">•</span>
              <span>{playlist.tracks.length} songs, </span>
              <span className="text-spotify-text-muted ml-1">
                {formatTotalTime(totalDuration)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-b from-spotify-dark/20 to-spotify-dark p-6">
        <div className="flex items-center space-x-6 mb-6">
          <Button
            onClick={onPlayPause}
            className="bg-spotify-green hover:bg-spotify-green-hover text-black rounded-full w-14 h-14 shadow-lg hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 hover:scale-105 transition-transform ${
              isLiked ? 'text-spotify-green' : 'text-spotify-text-muted hover:text-white'
            }`}
          >
            <Heart className="h-6 w-6" fill={isLiked ? 'currentColor' : 'none'} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-spotify-text-muted hover:text-white p-2"
          >
            <Download className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-spotify-text-muted hover:text-white p-2"
          >
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </div>

        {/* Track List Header */}
        <div className="grid grid-cols-[16px_6fr_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-2 text-sm text-spotify-text-muted border-b border-spotify-hover">
          <span>#</span>
          <span>TITLE</span>
          <span>ALBUM</span>
          <span>DATE ADDED</span>
          <span className="text-right">⏱</span>
        </div>

        {/* Track List */}
        <div className="space-y-1">
          {playlist.tracks.map((track, index) => {
            const isCurrentTrack = currentTrack?.id === track.id;
            return (
              <div
                key={track.id}
                className={`grid grid-cols-[16px_6fr_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-3 rounded-md hover:bg-spotify-hover group cursor-pointer ${
                  isCurrentTrack ? 'bg-spotify-hover' : ''
                }`}
                onClick={() => onPlayTrack(track)}
              >
                <div className="flex items-center">
                  {isCurrentTrack && isPlaying ? (
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="flex space-x-0.5">
                        <div className="w-0.5 h-4 bg-spotify-green animate-pulse"></div>
                        <div className="w-0.5 h-4 bg-spotify-green animate-pulse" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-0.5 h-4 bg-spotify-green animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className={`group-hover:hidden ${isCurrentTrack ? 'text-spotify-green' : 'text-spotify-text-muted'}`}>
                        {index + 1}
                      </span>
                      <Play className="h-4 w-4 hidden group-hover:block text-white" />
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={track.cover}
                    alt={track.album}
                    className="w-10 h-10 rounded"
                  />
                  <div className="min-w-0">
                    <p className={`font-medium truncate ${isCurrentTrack ? 'text-spotify-green' : 'text-white'}`}>
                      {track.title}
                    </p>
                    <p className="text-spotify-text-muted text-sm truncate">{track.artist}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <p className="text-spotify-text-muted text-sm truncate">{track.album}</p>
                </div>
                
                <div className="flex items-center">
                  <p className="text-spotify-text-muted text-sm">3 days ago</p>
                </div>
                
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 p-1"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <span className="text-spotify-text-muted text-sm">
                    {formatTime(track.duration)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 p-1"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}