import { useState } from 'react';
import { Search as SearchIcon, Play, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockTracks, featuredPlaylists } from '@/data/mockData';

interface SearchProps {
  onPlayTrack: (track: any) => void;
}

const genres = [
  { name: 'Pop', color: 'bg-pink-500', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
  { name: 'Hip-Hop', color: 'bg-orange-500', cover: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300&h=300&fit=crop' },
  { name: 'Rock', color: 'bg-red-500', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop' },
  { name: 'Electronic', color: 'bg-purple-500', cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop' },
  { name: 'Country', color: 'bg-yellow-500', cover: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=300&fit=crop' },
  { name: 'R&B', color: 'bg-indigo-500', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
  { name: 'Jazz', color: 'bg-green-500', cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop' },
  { name: 'Classical', color: 'bg-blue-500', cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop' },
];

export default function Search({ onPlayTrack }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = mockTracks.filter(track =>
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()) ||
        track.album.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 space-y-8">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">Search</h1>
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spotify-text-muted" />
          <Input
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-white text-black placeholder:text-gray-500 border-none h-12"
          />
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Search Results</h2>
          <div className="space-y-2">
            {searchResults.map((track, index) => (
              <div
                key={track.id}
                className="flex items-center p-2 rounded-md hover:bg-spotify-hover group cursor-pointer"
                onClick={() => onPlayTrack(track)}
              >
                <span className="w-4 text-center text-spotify-text-muted group-hover:hidden">
                  {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayTrack(track);
                  }}
                  className="w-4 hidden group-hover:flex items-center justify-center p-0"
                >
                  <Play className="h-4 w-4" />
                </Button>
                <img
                  src={track.cover}
                  alt={track.album}
                  className="w-10 h-10 rounded ml-4"
                />
                <div className="flex-1 ml-4 min-w-0">
                  <p className="text-white font-medium truncate">{track.title}</p>
                  <p className="text-spotify-text-muted text-sm truncate">{track.artist}</p>
                </div>
                <p className="text-spotify-text-muted text-sm mr-4 hidden md:block">{track.album}</p>
                <p className="text-spotify-text-muted text-sm mr-4">{formatTime(track.duration)}</p>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Browse All */}
      {searchQuery === '' && (
        <>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {genres.map((genre) => (
                <Card
                  key={genre.name}
                  className={`${genre.color} border-none cursor-pointer hover:scale-105 transition-transform relative overflow-hidden h-32`}
                >
                  <CardContent className="p-4 h-full flex flex-col justify-between">
                    <h3 className="text-white text-lg font-bold">{genre.name}</h3>
                    <img
                      src={genre.cover}
                      alt={genre.name}
                      className="absolute -bottom-2 -right-2 w-20 h-20 object-cover rounded-md transform rotate-12 shadow-lg"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Featured Playlists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {featuredPlaylists.map((playlist) => (
                <Card
                  key={playlist.id}
                  className="bg-card hover:bg-spotify-hover transition-colors cursor-pointer group border-none"
                >
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={playlist.cover}
                        alt={playlist.name}
                        className="w-full aspect-square object-cover rounded-md shadow-lg"
                      />
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // For featured playlists, play the first track from mockTracks
                          onPlayTrack(mockTracks[0]);
                        }}
                        className="absolute bottom-2 right-2 bg-spotify-green hover:bg-spotify-green-hover text-black rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-all shadow-lg transform translate-y-2 group-hover:translate-y-0"
                      >
                        <Play className="h-5 w-5 ml-0.5" />
                      </Button>
                    </div>
                    <h3 className="font-semibold text-white mb-2 truncate">{playlist.name}</h3>
                    <p className="text-spotify-text-muted text-sm line-clamp-2">{playlist.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}