import { motion, AnimatePresence } from 'motion/react';
import { Play, Info, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FEATURED_CONTENT } from '../constants';

interface HeroProps {
  onPlay?: (item: any) => void;
  onDetails?: (item: any) => void;
}

export default function Hero({ onPlay, onDetails }: HeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % FEATURED_CONTENT.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const current = FEATURED_CONTENT[index];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Atmospheric Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] immersive-glow-blue pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] immersive-glow-purple pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-8 sm:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative min-h-[500px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-blue-600/20 border border-blue-500/20 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-blue-400">
                    Featured: {current.category}
                  </span>
                </div>
                
                <h1 className="font-display text-7xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase">
                  {current.title.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? 'text-blue-500 block' : 'block'}>
                      {word}
                    </span>
                  ))}
                </h1>
                
                <p className="text-xl text-white/50 mb-12 max-w-lg leading-relaxed font-medium">
                  {current.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => onPlay?.(current)}
                    className="bg-white text-black px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-blue-400 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-white/5 uppercase tracking-widest text-xs"
                  >
                    <Play fill="black" size={18} />
                    Watch Now
                  </button>
                  <button 
                    onClick={() => onDetails?.(current)}
                    className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-white/10 transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest text-xs"
                  >
                    <Info size={18} />
                    More Info
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Carousel Indicators */}
            <div className="absolute -bottom-12 left-0 flex gap-2">
              {FEATURED_CONTENT.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === i ? 'w-12 bg-blue-500' : 'w-4 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
                transition={{ duration: 1, ease: 'circOut' }}
                className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/20 group"
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] -z-10 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
