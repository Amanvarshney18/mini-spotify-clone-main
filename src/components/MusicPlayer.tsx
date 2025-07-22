import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  audioUrl: string;
}

interface MusicPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function MusicPlayer({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one

  // Handle audio loading and playing
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();
    }
  }, [currentTrack]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  // Update current time from audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(Math.floor(audio.currentTime));
    const handleEnded = () => {
      if (repeatMode === 2) {
        audio.currentTime = 0;
        audio.play();
      } else {
        onNext();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onNext, repeatMode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata" />
      
      <div className="fixed bottom-0 left-0 right-0 bg-spotify-player border-t border-spotify-hover p-4">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center space-x-4 min-w-0 w-1/4">
          <img
            src={currentTrack.cover}
            alt={currentTrack.album}
            className="w-14 h-14 rounded"
          />
          <div className="min-w-0">
            <h4 className="text-white text-sm font-medium truncate">
              {currentTrack.title}
            </h4>
            <p className="text-spotify-text-muted text-xs truncate">
              {currentTrack.artist}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              "p-1 hover:scale-105 transition-transform",
              isLiked ? "text-spotify-green" : "text-spotify-text-muted hover:text-white"
            )}
          >
            <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 w-1/2 max-w-2xl">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsShuffled(!isShuffled)}
              className={cn(
                "p-2",
                isShuffled ? "text-spotify-green" : "text-spotify-text-muted hover:text-white"
              )}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrevious}
              className="text-white hover:scale-105 transition-transform p-2"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={onPlayPause}
              className="bg-white text-black hover:bg-white/90 hover:scale-105 transition-transform rounded-full p-2 w-10 h-10"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onNext}
              className="text-white hover:scale-105 transition-transform p-2"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRepeatMode((prev) => (prev + 1) % 3)}
              className={cn(
                "p-2",
                repeatMode > 0 ? "text-spotify-green" : "text-spotify-text-muted hover:text-white"
              )}
            >
              <Repeat className="h-4 w-4" />
              {repeatMode === 2 && (
                <span className="absolute -top-1 -right-1 bg-spotify-green text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-spotify-text-muted">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={currentTrack.duration}
              step={1}
              onValueChange={handleSeek}
              className="flex-1"
            />
            <span className="text-xs text-spotify-text-muted">
              {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3 w-1/4 justify-end">
          <Volume2 className="h-4 w-4 text-spotify-text-muted" />
          <Slider
            value={volume}
            max={100}
            step={1}
            onValueChange={setVolume}
            className="w-24"
          />
        </div>
      </div>
    </div>
    </>
  );
}