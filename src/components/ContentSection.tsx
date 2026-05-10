import { motion } from 'motion/react';
import { ChevronRight, Plus, Check, SortDesc, SortAsc, Star } from 'lucide-react';
import { useWatchlist } from '../lib/useWatchlist';
import { useRatings } from '../lib/useRatings';
import { useState, useMemo } from 'react';
import { cn } from '../lib/utils';

interface ContentItem {
  id: string;
  title: string;
  category: string;
  image: string;
  isLive?: boolean;
  addedAt?: number;
}

interface ContentSectionProps {
  title: string;
  items: ContentItem[];
  variant?: 'poster' | 'thumbnail';
  id?: string;
  profileId?: string;
  onItemClick?: (item: ContentItem) => void;
}

type SortType = 'newest' | 'alpha';

export default function ContentSection({ title, items, variant = 'poster', id, profileId, onItemClick }: ContentSectionProps) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist(profileId);
  const { setRating, getRating } = useRatings(profileId);
  const [sort, setSort] = useState<SortType>('newest');

  const sortedItems = useMemo(() => {
    const sorted = [...items];
    if (sort === 'alpha') {
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return sorted.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
    }
  }, [items, sort]);

  return (
    <section id={id} className="py-12 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 px-2 gap-4">
        <h2 className="text-2xl font-bold font-display">{title}</h2>
        
        <div className="flex items-center gap-6">
          {id === 'watchlist' && (
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              <button 
                onClick={() => setSort('newest')}
                className={cn(
                  "p-2 rounded-lg flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all",
                  sort === 'newest' ? "bg-blue-500 text-white shadow-lg" : "text-white/40 hover:text-white"
                )}
              >
                <SortDesc size={14} />
                Newest
              </button>
              <button 
                onClick={() => setSort('alpha')}
                className={cn(
                  "p-2 rounded-lg flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all",
                  sort === 'alpha' ? "bg-blue-500 text-white shadow-lg" : "text-white/40 hover:text-white"
                )}
              >
                <SortAsc size={14} />
                A-Z
              </button>
            </div>
          )}

          <button className="text-sm font-medium text-white/50 hover:text-white flex items-center gap-1 transition-colors group whitespace-nowrap">
            View All
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x">
        {sortedItems.map((item, index) => {
          const inWatchlist = isInWatchlist(item.id);
          const currentRating = getRating(item.id);
          
          return (
            <motion.div
              key={`${item.id}-${sort}`} // Key includes sort to trigger animation on sort change
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onItemClick?.(item)}
              className={cn(
                "flex-none snap-start group cursor-pointer",
                variant === 'poster' ? 'w-56 sm:w-64' : 'w-80 sm:w-[320px]'
              )}
            >
              <div className={`relative overflow-hidden rounded-[1.5rem] bg-white/5 border border-white/10 transition-all duration-500 ${
                index === 0 && variant === 'thumbnail' ? 'card-active-ring' : 'hover:scale-105 hover:border-white/30'
              } ${
                variant === 'poster' ? 'aspect-[2/3]' : 'aspect-video'
              }`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Watchlist Toggle Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWatchlist(item);
                  }}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all z-20 ${
                    inWatchlist 
                      ? 'bg-blue-500 border-blue-400 text-white shadow-lg' 
                      : 'bg-black/40 border-white/10 text-white/60 hover:text-white hover:bg-black/60'
                  }`}
                >
                  {inWatchlist ? <Check size={18} /> : <Plus size={18} />}
                </button>

                {/* Progress bar for featured row or first items */}
                {variant === 'thumbnail' && index === 0 && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[10px] font-black text-white/90 uppercase tracking-wider mb-2 drop-shadow-md">
                      {item.title}
                    </div>
                    <div className="h-1 bg-white/20 w-full rounded-full overflow-hidden backdrop-blur-sm">
                      <div className="h-full bg-blue-500 w-[65%]" />
                    </div>
                  </div>
                )}

                {item.isLive && (
                  <div className="absolute top-4 left-4 px-2 py-0.5 bg-red-600 text-[10px] font-black rounded text-white tracking-widest flex items-center gap-1 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    LIVE
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">{item.category}</span>
                  <p className="font-bold text-lg truncate leading-tight mb-3">{item.title}</p>
                  
                  {/* Rating UI */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-white/10">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        onClick={(e) => {
                          e.stopPropagation();
                          setRating(item.id, star);
                        }}
                        className={cn(
                          "transition-all hover:scale-125 cursor-pointer",
                          star <= currentRating 
                            ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" 
                            : "text-white/20 hover:text-white/60"
                        )}
                      />
                    ))}
                    {currentRating > 0 && (
                      <span className="ml-2 text-[10px] font-black text-white/40">{currentRating}/5</span>
                    )}
                  </div>
                </div>
              </div>
              {/* Title below for posters */}
              {variant === 'poster' && (
                <div className="mt-4 px-1">
                  <p className="text-sm font-bold text-white/90 truncate">{item.title}</p>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-wider font-semibold">{item.category}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
