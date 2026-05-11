import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Plus, Check, Star, Clock, Calendar, Info, Share2, Volume2, ThumbsUp } from 'lucide-react';
import { useWatchlist } from '../lib/useWatchlist';
import { cn } from '../lib/utils';

interface MovieDetailsProps {
  movie: any;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (movie: any) => void;
  profileId: string;
}

export default function MovieDetails({ movie, isOpen, onClose, onPlay, profileId }: MovieDetailsProps) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist(profileId);
  const inWatchlist = movie ? isInWatchlist(movie.id) : false;

  const handlePlayContent = (movie: any) => {
    onPlay(movie);
  };

  if (!movie) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-6xl max-h-full bg-[#0A0A0A] rounded-[2.5rem] border border-white/10 overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
          >
            {/* Left side: Poster/Hero Area */}
            <div className="w-full md:w-2/5 h-64 md:h-auto relative">
              <img 
                src={movie.image} 
                alt={movie.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
              
              <button 
                onClick={onClose}
                className="absolute top-6 left-6 md:hidden w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Right side: Info Area */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
              <div className="hidden md:flex justify-end mb-8">
                <button 
                  onClick={onClose}
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all border border-white/5"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                      {movie.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest border border-white/5">
                      {movie.quality || '4K ULTRA HD'}
                    </span>
                    {movie.parentalRating && (
                      <span className="px-3 py-1 rounded-full bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest border border-white/5">
                        {movie.parentalRating}
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight leading-none mb-6">
                    {movie.title}
                  </h1>

                  <div className="flex items-center gap-6 text-sm text-white/50 mb-8">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-white">{movie.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{movie.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>134 min</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
                  {movie.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => onPlay(movie)}
                    className="px-8 py-4 bg-white text-black font-bold rounded-2xl flex items-center gap-3 hover:bg-blue-400 transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                  >
                    <Play size={20} fill="currentColor" />
                    Watch Now
                  </button>
                  <button 
                    onClick={() => toggleWatchlist(movie)}
                    className={cn(
                      "px-8 py-4 font-bold rounded-2xl flex items-center gap-3 transition-all border transform hover:scale-105 active:scale-95",
                      inWatchlist 
                        ? "bg-blue-500/10 border-blue-500/50 text-blue-400" 
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    )}
                  >
                    {inWatchlist ? <Check size={20} /> : <Plus size={20} />}
                    {inWatchlist ? 'In Watchlist' : 'Watchlist'}
                  </button>
                  <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all hover:bg-white/10">
                    <Share2 size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-8 border-t border-white/5">
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">The Cast</h3>
                    <div className="space-y-4">
                      {movie.cast?.map((actor: string) => (
                        <div key={actor} className="flex items-center gap-3 group">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/40 border border-white/5 group-hover:bg-blue-500/20 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all">
                            {actor.charAt(0)}
                          </div>
                          <span className="text-sm text-white/60 group-hover:text-white transition-colors">{actor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Director</h3>
                    <div className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/40 border border-white/5 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all">
                        {movie.director?.charAt(0)}
                      </div>
                      <span className="text-sm text-white/60 group-hover:text-white transition-colors">{movie.director}</span>
                    </div>

                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mt-8 mb-4">Available On</h3>
                    <div className="flex items-center gap-2">
                       <span className="px-3 py-1 rounded-lg bg-white/5 text-white/60 text-xs font-bold border border-white/5 lowercase">
                         {movie.service}
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
