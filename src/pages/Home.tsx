import { Play, MoreHorizontal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { featuredPlaylists, mockPlaylists } from '@/data/mockData';

interface HomeProps {
  onPlayPlaylist: (playlistId: string) => void;
}

export default function Home({ onPlayPlaylist }: HomeProps) {
  const navigate = useNavigate();
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">{greeting}</h1>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-spotify-text-muted hover:text-white">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPlaylists.slice(0, 6).map((playlist) => (
          <Card
            key={playlist.id}
            className="bg-spotify-hover hover:bg-spotify-hover/80 transition-colors cursor-pointer group border-none"
            onClick={() => navigate(`/playlist/${playlist.id}`)}
          >
            <CardContent className="p-0 flex items-center">
              <img
                src={playlist.cover}
                alt={playlist.name}
                className="w-20 h-20 object-cover rounded-l"
              />
              <div className="flex-1 px-4">
                <h3 className="font-semibold text-white text-sm">{playlist.name}</h3>
              </div>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayPlaylist(playlist.id);
                }}
                className="bg-spotify-green hover:bg-spotify-green-hover text-black rounded-full w-12 h-12 mr-4 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <Play className="h-5 w-5 ml-0.5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Made for You */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Made for you</h2>
          <Link to="/library">
            <Button variant="ghost" className="text-spotify-text-muted hover:text-white text-sm">
              Show all
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mockPlaylists.map((playlist) => (
            <Card
              key={playlist.id}
              className="bg-card hover:bg-spotify-hover transition-colors cursor-pointer group border-none"
              onClick={() => navigate(`/playlist/${playlist.id}`)}
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
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Recently played</h2>
          <Link to="/playlist/recent">
            <Button variant="ghost" className="text-spotify-text-muted hover:text-white text-sm">
              Show all
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredPlaylists.map((playlist) => (
            <Card
              key={playlist.id}
              className="bg-card hover:bg-spotify-hover transition-colors cursor-pointer group border-none"
              onClick={() => navigate(`/playlist/${playlist.id}`)}
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
          ))}
        </div>
      </section>
    </div>
  );
}