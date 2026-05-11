import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon, Filter, Film, Calendar, Globe, Star, Cpu, Users } from 'lucide-react';
import { useState, useMemo } from 'react';
import { RECOMMENDATIONS, GENRES, SERVICES, YEARS, QUALITIES, PARENTAL_RATINGS, MIN_RATINGS } from '../constants';
import { cn } from '../lib/utils';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick?: (item: any) => void;
}

export default function SearchOverlay({ isOpen, onClose, onItemClick }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const [selectedParentalRating, setSelectedParentalRating] = useState<string | null>(null);

  const filteredResults = useMemo(() => {
    return RECOMMENDATIONS.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = !selectedGenre || item.genre === selectedGenre;
      const matchesService = !selectedService || item.service === selectedService;
      const matchesYear = !selectedYear || (item as any).year === selectedYear;
      const matchesRating = !minRating || (item as any).rating >= minRating;
      const matchesQuality = !selectedQuality || (item as any).quality === selectedQuality;
      const matchesParental = !selectedParentalRating || (item as any).parentalRating === selectedParentalRating;
      
      return matchesSearch && matchesGenre && matchesService && matchesYear && matchesRating && matchesQuality && matchesParental;
    });
  }, [searchTerm, selectedGenre, selectedService, selectedYear, minRating, selectedQuality, selectedParentalRating]);

  const clearFilters = () => {
    setSelectedGenre(null);
    setSelectedService(null);
    setSelectedYear(null);
    setMinRating(null);
    setSelectedQuality(null);
    setSelectedParentalRating(null);
    setSearchTerm('');
  };

  const hasActiveFilters = selectedGenre || selectedService || selectedYear || minRating || selectedQuality || selectedParentalRating || searchTerm;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-3xl overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-12">
              <div className="relative flex-1 max-w-2xl group">
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-500 transition-colors" size={24} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search movies, shows, channels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-2xl font-bold font-display outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </div>
              <button 
                onClick={onClose}
                className="ml-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all transform hover:rotate-90"
              >
                <X size={32} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
              {/* Filters Sidebar */}
              <div className="space-y-10">
                <div>
                  <div className="flex items-center gap-2 mb-6 text-white/40">
                    <Film size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Genres</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {GENRES.map(genre => (
                      <button
                        key={genre}
                        onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                          selectedGenre === genre 
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                            : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-6 text-white/40">
                    <Globe size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Services</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map(service => (
                      <button
                        key={service}
                        onClick={() => setSelectedService(selectedService === service ? null : service)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                          selectedService === service 
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                            : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-6 text-white/40">
                    <Calendar size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Release Year</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {YEARS.map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                          selectedYear === year 
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                            : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-6 text-white/40">
                    <Star size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Minimum Rating</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {MIN_RATINGS.map(rating => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(minRating === rating ? null : rating)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                          minRating === rating 
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                            : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {rating === 0 ? 'Any' : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-6 text-white/40">
                    <Cpu size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Quality</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {QUALITIES.map(quality => (
                      <button
                        key={quality}
                        onClick={() => setSelectedQuality(selectedQuality === quality ? null : quality)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                          selectedQuality === quality 
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                            : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {quality}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-6 text-white/40">
                    <Users size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Parental Rating</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PARENTAL_RATINGS.map(rating => (
                      <button
                        key={rating}
                        onClick={() => setSelectedParentalRating(selectedParentalRating === rating ? null : rating)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                          selectedParentalRating === rating 
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                            : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="text-blue-500 text-xs font-black uppercase tracking-widest hover:text-blue-400 transition-colors pt-4 flex items-center gap-2"
                  >
                    <X size={14} />
                    Clear All Filters
                  </button>
                )}
              </div>

              {/* Results Grid */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold font-display">
                    {filteredResults.length} {filteredResults.length === 1 ? 'Result' : 'Results'} Found
                  </h3>
                </div>

                {filteredResults.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredResults.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          onItemClick?.(item);
                          onClose();
                        }}
                        className="group relative aspect-[2/3] rounded-2xl overflow-hidden bg-white/5 shadow-xl border border-white/5 cursor-pointer"
                      >
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-black text-yellow-500 flex items-center gap-1 border border-white/10">
                            <Star size={10} fill="currentColor" />
                            {(item as any).rating}
                          </span>
                          <span className="px-2 py-1 bg-blue-500 rounded text-[10px] font-black text-white text-center shadow-lg">
                            {(item as any).quality}
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{(item as any).genre}</p>
                            <span className="text-[10px] text-white/40 font-bold border border-white/10 px-1 rounded">{(item as any).parentalRating}</span>
                          </div>
                          <h4 className="font-bold text-sm truncate">{item.title}</h4>
                          <div className="flex items-center justify-between mt-2">
                             <span className="text-[10px] text-white/40">{(item as any).year}</span>
                             <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded font-bold">{(item as any).service}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-white/20">
                    <Filter size={64} strokeWidth={1} className="mb-4" />
                    <p className="text-xl font-bold font-display">No results match your filters</p>
                    <p className="text-sm mt-2">Try adjusting your terms or filters to find what you're looking for.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
