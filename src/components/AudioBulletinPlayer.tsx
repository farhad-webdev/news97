import React, { useState, useEffect } from 'react';
import { Play, Pause, X, Volume2, VolumeX, RotateCcw, FastForward } from 'lucide-react';

interface AudioBulletinPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioBulletinPlayer: React.FC<AudioBulletinPlayerProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(15);
  const [duration] = useState(180); // 3 minutes = 180 seconds
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Timer simulation
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, duration, playbackSpeed]);

  if (!isOpen) return null;

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSpeedChange = () => {
    if (playbackSpeed === 1) setPlaybackSpeed(1.25);
    else if (playbackSpeed === 1.25) setPlaybackSpeed(1.5);
    else setPlaybackSpeed(1);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-t border-red-600/40 shadow-2xl p-3 sm:p-4 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Info & Soundwave */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Animated sound wave bars */}
          <div className="flex items-center gap-0.5 h-6 px-2 bg-red-600/20 border border-red-500/30 rounded-md">
            <span className={`w-1 bg-red-500 rounded-full ${isPlaying ? 'animate-wave-1' : 'h-1.5'}`} />
            <span className={`w-1 bg-red-500 rounded-full ${isPlaying ? 'animate-wave-2' : 'h-3'}`} />
            <span className={`w-1 bg-red-500 rounded-full ${isPlaying ? 'animate-wave-3' : 'h-2'}`} />
            <span className={`w-1 bg-red-500 rounded-full ${isPlaying ? 'animate-wave-4' : 'h-4'}`} />
            <span className={`w-1 bg-red-500 rounded-full ${isPlaying ? 'animate-wave-5' : 'h-2'}`} />
          </div>

          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded uppercase">
                অডিও সংবাদ
              </span>
              <h4 className="font-bold text-xs sm:text-sm truncate text-slate-100">
                আজকের ৩ মিনিটের বিশেষ সংবাদ বুলেটিন
              </h4>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate hidden sm:block">
              ২৮ সেপ্টেম্বর ২০২৪ • বাচনিক উপস্থাপনা: দেশবার্তা স্টুডিও
            </p>
          </div>
        </div>

        {/* Middle: Controls & Scrub Slider */}
        <div className="flex items-center gap-3 w-full sm:w-1/2 justify-center">
          <button
            type="button"
            onClick={() => setCurrentTime(0)}
            className="text-slate-400 hover:text-white transition-colors p-1"
            title="শুরু থেকে শুনুন"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Progress bar */}
          <div className="flex-1 flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-mono w-8 text-right">
              {formatSeconds(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <span className="text-[11px] text-slate-400 font-mono w-8">
              {formatSeconds(duration)}
            </span>
          </div>

          {/* Playback Speed */}
          <button
            type="button"
            onClick={handleSpeedChange}
            className="bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-[11px] font-bold text-slate-300 transition-colors"
            title="গতি পরিবর্তন করুন"
          >
            {playbackSpeed}x
          </button>
        </div>

        {/* Right: Mute & Close */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="text-slate-400 hover:text-white transition-colors p-1"
            title={isMuted ? 'আনমিউট' : 'মিউট'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="প্লেয়ার বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
