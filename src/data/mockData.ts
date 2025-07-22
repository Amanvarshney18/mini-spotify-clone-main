export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  audioUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  tracks: Track[];
}

export interface Artist {
  id: string;
  name: string;
  description: string;
  image: string;
  followers: number;
  monthlyListeners: number;
  topTracks: Track[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  cover: string;
  tracks: Track[];
  genre: string;
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  description: string;
  cover: string;
  episodes: number;
  category: string;
  isFollowing?: boolean;
}

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    cover: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: '4',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: '5',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'Stay',
    duration: 141,
    cover: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    id: '6',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    duration: 238,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
  },
  {
    id: '7',
    title: 'Peaches',
    artist: 'Justin Bieber ft. Daniel Caesar & Giveon',
    album: 'Justice',
    duration: 198,
    cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'
  },
  {
    id: '8',
    title: 'drivers license',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 242,
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: 'liked',
    name: 'Liked Songs',
    description: 'Your favorite tracks',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    tracks: mockTracks.slice(0, 4)
  },
  {
    id: 'recent',
    name: 'Recently Played',
    description: 'Your recently played songs',
    cover: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300&h=300&fit=crop',
    tracks: mockTracks.slice(2, 6)
  },
  {
    id: 'discover',
    name: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    tracks: mockTracks.slice(1, 5)
  },
  {
    id: 'chill',
    name: 'Chill Vibes',
    description: 'Relax and unwind with these chill tracks',
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    tracks: mockTracks.slice(3, 7)
  }
];

// Additional tracks for featured playlists
export const additionalTracks: Track[] = [
  {
    id: '9',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: 234,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3'
  },
  {
    id: '10',
    title: 'Someone Like You',
    artist: 'Adele',
    album: '21',
    duration: 285,
    cover: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3'
  },
  {
    id: '11',
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    album: 'Uptown Special',
    duration: 270,
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3'
  },
  {
    id: '12',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: 263,
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3'
  },
  {
    id: '13',
    title: 'Believer',
    artist: 'Imagine Dragons',
    album: 'Evolve',
    duration: 204,
    cover: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3'
  },
  {
    id: '14',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    album: 'x (Multiply)',
    duration: 281,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3'
  },
  {
    id: '15',
    title: 'Radioactive',
    artist: 'Imagine Dragons',
    album: 'Night Visions',
    duration: 187,
    cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3'
  },
  {
    id: '16',
    title: 'Hello',
    artist: 'Adele',
    album: '25',
    duration: 295,
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3'
  }
];

export const featuredPlaylists: Playlist[] = [
  {
    id: 'pop-hits',
    name: 'Pop Hits',
    description: 'The biggest pop songs right now',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    tracks: [mockTracks[0], mockTracks[1], additionalTracks[0], additionalTracks[1]]
  },
  {
    id: 'indie-mix',
    name: 'Indie Mix',
    description: 'Fresh indie tracks for your day',
    cover: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300&h=300&fit=crop',
    tracks: [mockTracks[2], mockTracks[5], additionalTracks[4], additionalTracks[6]]
  },
  {
    id: 'workout',
    name: 'Workout Beats',
    description: 'High energy songs to power your workout',
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    tracks: [mockTracks[3], mockTracks[4], additionalTracks[2], additionalTracks[4]]
  },
  {
    id: 'acoustic',
    name: 'Acoustic Favorites',
    description: 'Stripped down versions of your favorite songs',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    tracks: [mockTracks[6], mockTracks[7], additionalTracks[3], additionalTracks[5]]
  }
];

// Artists data
export const mockArtists: Artist[] = [
  {
    id: 'weeknd',
    name: 'The Weeknd',
    description: 'Canadian singer, songwriter, and record producer',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    followers: 25000000,
    monthlyListeners: 85000000,
    topTracks: [mockTracks[0], additionalTracks[0]]
  },
  {
    id: 'harry-styles',
    name: 'Harry Styles',
    description: 'English singer, songwriter, and actor',
    image: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=400&h=400&fit=crop',
    followers: 18000000,
    monthlyListeners: 65000000,
    topTracks: [mockTracks[1], additionalTracks[3]]
  },
  {
    id: 'dua-lipa',
    name: 'Dua Lipa',
    description: 'English singer and songwriter',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    followers: 22000000,
    monthlyListeners: 72000000,
    topTracks: [mockTracks[2]]
  },
  {
    id: 'ed-sheeran',
    name: 'Ed Sheeran',
    description: 'English singer-songwriter',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    followers: 30000000,
    monthlyListeners: 88000000,
    topTracks: [additionalTracks[0], additionalTracks[3], additionalTracks[5]]
  },
  {
    id: 'olivia-rodrigo',
    name: 'Olivia Rodrigo',
    description: 'American singer-songwriter and actress',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    followers: 12000000,
    monthlyListeners: 55000000,
    topTracks: [mockTracks[3], mockTracks[7]]
  },
  {
    id: 'adele',
    name: 'Adele',
    description: 'English singer-songwriter',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop',
    followers: 20000000,
    monthlyListeners: 45000000,
    topTracks: [additionalTracks[1], additionalTracks[7]]
  }
];

// Albums data
export const mockAlbums: Album[] = [
  {
    id: 'after-hours',
    title: 'After Hours',
    artist: 'The Weeknd',
    year: 2020,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    tracks: [mockTracks[0]],
    genre: 'Pop'
  },
  {
    id: 'fine-line',
    title: 'Fine Line',
    artist: 'Harry Styles',
    year: 2019,
    cover: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=400&h=400&fit=crop',
    tracks: [mockTracks[1]],
    genre: 'Pop Rock'
  },
  {
    id: 'future-nostalgia',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    year: 2020,
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    tracks: [mockTracks[2]],
    genre: 'Disco Pop'
  },
  {
    id: 'sour',
    title: 'SOUR',
    artist: 'Olivia Rodrigo',
    year: 2021,
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    tracks: [mockTracks[3], mockTracks[7]],
    genre: 'Alternative Pop'
  },
  {
    id: 'divide',
    title: '÷ (Divide)',
    artist: 'Ed Sheeran',
    year: 2017,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    tracks: [additionalTracks[0], additionalTracks[3]],
    genre: 'Pop Folk'
  },
  {
    id: '25',
    title: '25',
    artist: 'Adele',
    year: 2015,
    cover: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop',
    tracks: [additionalTracks[7]],
    genre: 'Soul Pop'
  }
];

// Podcasts data
export const mockPodcasts: Podcast[] = [
  {
    id: 'joe-rogan',
    title: 'The Joe Rogan Experience',
    host: 'Joe Rogan',
    description: 'Long form conversations with a wide range of guests',
    cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
    episodes: 2000,
    category: 'Comedy',
    isFollowing: true
  },
  {
    id: 'smartless',
    title: 'SmartLess',
    host: 'Jason Bateman, Sean Hayes, Will Arnett',
    description: 'Three friends surprise each other with guest interviews',
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
    episodes: 150,
    category: 'Comedy',
    isFollowing: false
  },
  {
    id: 'lex-fridman',
    title: 'Lex Fridman Podcast',
    host: 'Lex Fridman',
    description: 'Conversations about science, technology, history, philosophy and the nature of intelligence',
    cover: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
    episodes: 400,
    category: 'Technology',
    isFollowing: true
  },
  {
    id: 'tim-ferriss',
    title: 'The Tim Ferriss Show',
    host: 'Tim Ferriss',
    description: 'Deconstruct world-class performers to find the tools and tactics you can use',
    cover: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop',
    episodes: 700,
    category: 'Business',
    isFollowing: false
  },
  {
    id: 'serial',
    title: 'Serial',
    host: 'Sarah Koenig',
    description: 'Investigative journalism in podcast form',
    cover: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop',
    episodes: 50,
    category: 'True Crime',
    isFollowing: true
  },
  {
    id: 'conan-obrien',
    title: 'Conan O\'Brien Needs a Friend',
    host: 'Conan O\'Brien',
    description: 'Conan talks to people he finds funny about things that make him curious',
    cover: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop',
    episodes: 200,
    category: 'Comedy',
    isFollowing: false
  }
];