import { Home, Search, Library, Plus, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Your Library', href: '/library', icon: Library },
];

const initialPlaylists = [
  { name: 'Liked Songs', id: 'liked' },
  { name: 'Recently Played', id: 'recent' },
  { name: 'Made For You', id: 'discover' },
  { name: 'Discover Weekly', id: 'discover' },
  { name: 'My Playlist #1', id: 'playlist1' },
  { name: 'Chill Vibes', id: 'chill' },
  { name: 'Workout Mix', id: 'workout' }
];

export function Sidebar() {
  const [playlistName, setPlaylistName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [playlists, setPlaylists] = useState(initialPlaylists);

  const handleCreatePlaylist = () => {
    if (playlistName.trim()) {
      const newPlaylist = {
        name: playlistName.trim(),
        id: `playlist-${Date.now()}` // Simple unique ID
      };
      setPlaylists(prev => [...prev, newPlaylist]);
      setPlaylistName('');
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-spotify-sidebar text-spotify-text">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">Spotify</h1>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 mb-6">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                'hover:bg-spotify-hover hover:text-white',
                isActive 
                  ? 'bg-spotify-hover text-white' 
                  : 'text-spotify-text-muted'
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Create Playlist */}
      <div className="px-3 mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-spotify-text-muted hover:text-white hover:bg-spotify-hover"
            >
              <Plus className="mr-3 h-5 w-5" />
              Create Playlist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Playlist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="playlist-name">Playlist Name</Label>
                <Input
                  id="playlist-name"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  placeholder="My Playlist #1"
                  onKeyDown={(e) => e.key === 'Enter' && handleCreatePlaylist()}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePlaylist}>
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <NavLink
          to="/playlist/liked"
          className="flex items-center w-full px-3 py-2 text-spotify-text-muted hover:text-white hover:bg-spotify-hover rounded-md transition-colors"
        >
          <Heart className="mr-3 h-5 w-5" />
          Liked Songs
        </NavLink>
      </div>

      {/* Divider */}
      <div className="border-t border-spotify-hover mx-3 mb-4" />

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3">
          {playlists.map((playlist) => (
            <NavLink
              key={playlist.name}
              to={`/playlist/${playlist.id}`}
              className={({ isActive }) =>
                cn(
                  'block px-3 py-2 text-sm transition-colors rounded-md',
                  isActive 
                    ? 'text-white bg-spotify-hover' 
                    : 'text-spotify-text-muted hover:text-white hover:bg-spotify-hover'
                )
              }
            >
              {playlist.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-spotify-hover">
        <p className="text-xs text-spotify-text-muted">
          Install the app for a better experience
        </p>
      </div>
    </div>
  );
}