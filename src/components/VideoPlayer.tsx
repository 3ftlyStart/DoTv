import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  Settings, RotateCcw, RotateCw, SkipForward,
  FastForward, Music, Subtitles, Airplay
} from 'lucide-react';
import { cn } from '../lib/utils';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle?: string;
  videoUrl?: string;
  nextItem?: any;
  onPlayNext?: (item: any) => void;
  isPiP?: boolean;
  onTogglePiP?: (enabled: boolean) => void;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const SAMPLE_SUBTITLES = [
  { start: 1, end: 5, text: "DoTv presents: A Cinematic Journey." },
  { start: 6, end: 10, text: "In a world where technology and passion collide..." },
  { start: 11, end: 15, text: "One app brings all your favorite content into one place." },
  { start: 16, end: 20, text: "Experience the next generation of entertainment." },
  { start: 22, end: 28, text: "Stream in ultra high-definition with personalized picks." },
  { start: 30, end: 35, text: "Your watchlist, your ratings, your rules." },
  { start: 40, end: 45, text: "Let the story unfold before your eyes." },
];

export default function VideoPlayer({ 
  isOpen, 
  onClose, 
  videoTitle, 
  videoUrl, 
  nextItem, 
  onPlayNext,
  isPiP = false,
  onTogglePiP
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [showControls, setShowControls] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAirPlayAvailable, setIsAirPlayAvailable] = useState(false);
  
  // Auto-play state
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(10);
  
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying && !isSettingsOpen && !isCountingDown) setShowControls(false);
    }, 3000);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setIsCountingDown(false);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (videoRef.current) {
      videoRef.current.currentTime = (val / 100) * duration;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setIsSettingsOpen(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleAirPlay = () => {
    const video = videoRef.current;
    if (video && (video as any).webkitShowPlaybackTargetPicker) {
      (video as any).webkitShowPlaybackTargetPicker();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // AirPlay availability
    const video = videoRef.current;
    if (video && 'WebKitPlaybackTargetAvailabilityEvent' in window) {
      const handleAvailabilityChange = (event: any) => {
        if (event.availability === 'available') {
          setIsAirPlayAvailable(true);
        } else {
          setIsAirPlayAvailable(false);
        }
      };

      video.addEventListener('webkitplaybacktargetavailabilitychanged', handleAvailabilityChange);
      
      return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        video.removeEventListener('webkitplaybacktargetavailabilitychanged', handleAvailabilityChange);
      };
    }

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isOpen]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const currentTime = video.currentTime;
      setProgress((currentTime / video.duration) * 100);

      // Update Subtitles
      if (showSubtitles) {
        const activeSub = SAMPLE_SUBTITLES.find(
          s => currentTime >= s.start && currentTime <= s.end
        );
        setCurrentSubtitle(activeSub ? activeSub.text : '');
      } else {
        setCurrentSubtitle('');
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (isAutoPlayEnabled && nextItem) {
        setIsCountingDown(true);
        setCountdown(10);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [showSubtitles, isAutoPlayEnabled, nextItem]);

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountingDown && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isCountingDown && countdown === 0) {
      onPlayNext?.(nextItem);
      setIsCountingDown(false);
    }
    return () => clearInterval(timer);
  }, [isCountingDown, countdown, nextItem, onPlayNext]);

  useEffect(() => {
    if (!isOpen) {
      setIsCountingDown(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Show controls on any interaction
      handleMouseMove();

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          toggleMute();
          break;
        case 'arrowright':
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5);
          }
          break;
        case 'arrowleft':
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying, isMuted, isCountingDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed z-[500] bg-black flex items-center justify-center group/player overflow-hidden",
            isPiP 
              ? "bottom-8 right-8 w-[320px] md:w-[400px] aspect-video rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.8)] border border-white/10 ring-1 ring-white/5" 
              : "inset-0"
          )}
          onMouseMove={handleMouseMove}
        >
          <video
            key={videoUrl || "default"}
            ref={videoRef}
            src={(videoUrl && videoUrl.length > 0) ? videoUrl : "https://vjs.zencdn.net/v/oceans.mp4"}
            className="w-full h-full object-contain"
            onClick={togglePlay}
            playsInline
            x-webkit-airplay="allow"
            preload="metadata"
            onError={(e) => {
              const video = e.currentTarget;
              console.error("Video Error:", {
                code: video.error?.code,
                message: video.error?.message,
                src: video.src
              });
            }}
          />

          {/* PiP Overlay Controls */}
          {isPiP && (
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/player:opacity-100 transition-opacity flex flex-col justify-between p-4">
              <div className="flex justify-between items-center">
                 <button 
                  onClick={() => onTogglePiP?.(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all"
                  title="Expand"
                >
                  <Maximize size={16} />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 bg-black/40 hover:bg-red-500 rounded-full text-white backdrop-blur-md transition-all"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex justify-center gap-4">
                 <button 
                  onClick={togglePlay}
                  className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all"
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </button>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* Subtitle Overlay */}
          <AnimatePresence>
            {showSubtitles && currentSubtitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-32 left-1/2 -translate-x-1/2 z-[450] pointer-events-none"
              >
                <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 text-center max-w-2xl">
                  <p className="text-white text-lg md:text-xl font-medium tracking-wide drop-shadow-lg">
                    {currentSubtitle}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Up Next Overlay */}
          <AnimatePresence>
            {isCountingDown && nextItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl z-[480] flex flex-col items-center justify-center text-center p-8"
              >
                <div className="max-w-md w-full space-y-8">
                  <div className="space-y-2">
                    <p className="text-blue-400 font-black uppercase tracking-widest text-xs">Up Next in {countdown}s</p>
                    <h2 className="text-4xl font-bold font-display">{nextItem.title}</h2>
                    <p className="text-white/60 text-sm line-clamp-2">{nextItem.description}</p>
                  </div>

                  <div className="relative w-64 aspect-video mx-auto rounded-2xl overflow-hidden group/next shadow-2xl">
                    <img 
                      src={nextItem.image} 
                      className="w-full h-full object-cover group-hover/next:scale-110 transition-transform duration-700" 
                      alt={nextItem.title} 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                       <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                         <Play fill="white" size={24} className="ml-1" />
                       </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button 
                      onClick={() => onPlayNext?.(nextItem)}
                      className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-blue-400 transition-colors"
                    >
                      Play Now
                    </button>
                    <button 
                      onClick={() => setIsCountingDown(false)}
                      className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-xl font-bold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls Overlay */}
          <motion.div
            animate={{ opacity: showControls && !isCountingDown && !isPiP ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-8 pointer-events-none group-hover/player:pointer-events-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold font-display">{videoTitle || "Big Buck Bunny"}</h3>
                <p className="text-xs text-white/40 uppercase tracking-widest font-black mt-1">Do Premium Stream</p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onTogglePiP?.(true)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/50 hover:text-white transition-all border border-white/5 flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                  title="Picture-in-Picture"
                >
                  <Minimize size={18} />
                  <span className="hidden sm:inline">Minimize</span>
                </button>
                <button 
                  onClick={onClose}
                  className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Middle Big Buttons (Visible only when hovering or paused) */}
            <div className="flex-1 flex items-center justify-center gap-12">
               {!isPlaying && !isCountingDown && (
                 <motion.button
                   initial={{ scale: 0.8 }}
                   animate={{ scale: 1 }}
                   onClick={togglePlay}
                   className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors shadow-2xl"
                 >
                   <Play fill="black" size={40} className="ml-2" />
                 </motion.button>
               )}
            </div>

            {/* Bottom Controls */}
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="relative group/progress flex items-center">
                <div className="absolute left-0 right-0 h-1 bg-white/20 rounded-full overflow-hidden group-hover/progress:h-2 transition-all">
                  <motion.div 
                    className="h-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleProgressChange}
                  className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer z-10"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button onClick={togglePlay} className="hover:text-blue-400 transition-colors">
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <button onClick={toggleMute} className="hover:text-blue-400 transition-colors">
                      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                    />
                  </div>

                  <span className="text-xs font-mono text-white/60">
                    {formatTime((progress / 100) * duration)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-6 relative">
                  {isAirPlayAvailable && (
                    <button 
                      onClick={handleAirPlay}
                      className="text-white/60 hover:text-blue-400 transition-colors"
                      title="AirPlay"
                    >
                      <Airplay size={22} />
                    </button>
                  )}

                  <button 
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      showSubtitles ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "text-white/60 hover:text-white bg-white/5"
                    )}
                  >
                    <Subtitles size={20} />
                  </button>

                  {/* Playback Speed Menu */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold border border-white/10"
                    >
                      <Settings size={16} />
                      <span className="min-w-[40px]">{playbackSpeed}x</span>
                    </button>

                    <AnimatePresence>
                      {isSettingsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full right-0 mb-4 bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl min-w-[180px] py-2"
                        >
                          <div className="px-4 py-2 text-[10px] uppercase font-black text-white/30 tracking-widest border-b border-white/5">
                            Settings
                          </div>
                          
                          {/* Auto-Play Toggle */}
                          <div className="px-4 py-3 flex items-center justify-between border-b border-white/5">
                            <span className="text-xs font-bold text-white/60">Auto-play</span>
                            <button 
                              onClick={() => setIsAutoPlayEnabled(!isAutoPlayEnabled)}
                              className={cn(
                                "w-10 h-5 rounded-full transition-colors relative",
                                isAutoPlayEnabled ? "bg-blue-500" : "bg-white/10"
                              )}
                            >
                              <motion.div 
                                animate={{ x: isAutoPlayEnabled ? 22 : 2 }}
                                className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full"
                              />
                            </button>
                          </div>

                          <div className="px-4 py-2 text-[10px] uppercase font-black text-white/30 tracking-widest bg-white/5">
                            Playback Speed
                          </div>
                          {SPEEDS.map(speed => (
                            <button
                              key={speed}
                              onClick={() => handleSpeedChange(speed)}
                              className={cn(
                                "w-full text-left px-4 py-3 text-sm font-bold transition-colors hover:bg-blue-500 hover:text-white",
                                playbackSpeed === speed ? "text-blue-400" : "text-white/60"
                              )}
                            >
                              {speed}x {speed === 1 && <span className="text-[10px] opacity-50 ml-2">(Normal)</span>}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button 
                    onClick={toggleFullscreen}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
