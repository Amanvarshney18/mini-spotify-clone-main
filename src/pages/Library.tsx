import { useState } from 'react';
import { Play, MoreHorizontal, Search, Grid3X3, List, Users, Disc, Podcast } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockPlaylists, mockArtists, mockAlbums, mockPodcasts } from '@/data/mockData';

interface LibraryProps {
  onPlayPlaylist: (playlistId: string) => void;
}

export default function Library({ onPlayPlaylist }: LibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState<'all' | 'playlists' | 'artists' | 'albums' | 'podcasts'>('all');

  // Filter functions
  const filteredPlaylists = mockPlaylists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArtists = mockArtists.filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlbums = mockAlbums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPodcasts = mockPodcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.host.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const renderGridContent = () => {
    const content = [];

    // Add playlists
    if (activeFilter === 'all' || activeFilter === 'playlists') {
      content.push(
        ...filteredPlaylists.map((playlist) => (
          <Card
            key={`playlist-${playlist.id}`}
            className="bg-card hover:bg-spotify-hover transition-colors cursor-pointer group border-none"
            onClick={() => onPlayPlaylist(playlist.id)}
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
                    onPlayPlaylist(playlist.id);
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
        ))
      );
    }

    // Add artists
    if (activeFilter === 'all' || activeFilter === 'artists') {
      content.push(
        ...filteredArtists.map((artist) => (
          <Card
            key={`artist-${artist.id}`}
            className="bg-card hover:bg-spotify-hover transition-colors cursor-pointer group border-none"
          >
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full aspect-square object-cover rounded-full shadow-lg"
                />
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 bg-spotify-green hover:bg-spotify-green-hover text-black rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-all shadow-lg transform translate-y-2 group-hover:translate-y-0"
                >
                  <Play className="h-5 w-5 ml-0.5" />
                </Button>
              </div>
              <h3 className="font-semibold text-white mb-1 truncate">{artist.name}</h3>
              <div className="flex items-center gap-1 mb-1">
                <Users className="h-3 w-3 text-spotify-text-muted" />
                <span className="text-spotify-text-muted text-xs">{formatNumber(artist.followers)} followers</span>
              </div>
              <p className="text-spotify-text-muted text-xs">Artist</p>
            </CardContent>
          </Card>
        ))
      );
    }

    // Add albums
    if (activeFilter === 'all' || activeFilter === 'albums') {
      content.push(
        ...filteredAlbums.map((album) => (
          <Card
            key={`album-${album.id}`}
            className="bg-card hover:bg-spotify-hover transition-colors cursor-pointer group border-none"
          >
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full aspect-square object-cover rounded-md shadow-lg"
                />
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 bg-spotify-green hover:bg-spotify-green-hover text-black rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-all shadow-lg transform translate-y-2 group-hover:translate-y-0"
                >
                  <Play className="h-5 w-5 ml-0.5" />
                </Button>
              </div>
              <h3 className="font-semibold text-white mb-1 truncate">{album.title}</h3>
              <p className="text-spotify-text-muted text-sm truncate">{album.artist}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs bg-spotify-hover text-spotify-text-muted">
                  {album.year}
                </Badge>
                <span className="text-spotify-text-muted text-xs">{album.genre}</span>
              </div>
            </CardContent>
          </Card>
        ))
      );
    }

    // Add podcasts
    if (activeFilter === 'all' || activeFilter === 'podcasts') {
      content.push(
        ...filteredPodcasts.map((podcast) => (
          <Card
            key={`podcast-${podcast.id}`}
            className="bg-card hover:bg-spotify-hover transition-colors cursor-pointer group border-none"
          >
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img
                  src={podcast.cover}
                  alt={podcast.title}
                  className="w-full aspect-square object-cover rounded-md shadow-lg"
                />
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 bg-spotify-green hover:bg-spotify-green-hover text-black rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-all shadow-lg transform translate-y-2 group-hover:translate-y-0"
                >
                  <Play className="h-5 w-5 ml-0.5" />
                </Button>
              </div>
              <h3 className="font-semibold text-white mb-1 truncate">{podcast.title}</h3>
              <p className="text-spotify-text-muted text-sm truncate">{podcast.host}</p>
              <div className="flex items-center gap-1 mt-1">
                <Podcast className="h-3 w-3 text-spotify-text-muted" />
                <span className="text-spotify-text-muted text-xs">{podcast.episodes} episodes</span>
                {podcast.isFollowing && (
                  <Badge className="text-xs bg-spotify-green text-black ml-auto">Following</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      );
    }

    return content;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Your Library</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="text-spotify-text-muted hover:text-white"
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spotify-text-muted" />
        <Input
          placeholder="Search in Your Library"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-spotify-hover border-none text-white placeholder:text-spotify-text-muted"
        />
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All', icon: null },
          { key: 'playlists', label: 'Playlists', icon: List },
          { key: 'artists', label: 'Artists', icon: Users },
          { key: 'albums', label: 'Albums', icon: Disc },
          { key: 'podcasts', label: 'Podcasts', icon: Podcast }
        ].map((filter) => {
          const Icon = filter.icon;
          return (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveFilter(filter.key as any)}
              className={`transition-colors ${
                activeFilter === filter.key 
                  ? "bg-white text-black hover:bg-white/90" 
                  : "bg-spotify-hover hover:bg-white hover:text-black"
              }`}
            >
              {Icon && <Icon className="h-4 w-4 mr-2" />}
              {filter.label}
            </Button>
          );
        })}
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {renderGridContent()}
      </div>

      {/* No results */}
      {renderGridContent().length === 0 && searchQuery && (
        <div className="text-center py-12">
          <h3 className="text-white text-lg font-semibold mb-2">No results found</h3>
          <p className="text-spotify-text-muted">Try searching for something else.</p>
        </div>
      )}
    </div>
  );
}