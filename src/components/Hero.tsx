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
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-cyber-bg">
      {/* Gritty Cyberpunk Overlays */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyber-cyan/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyber-pink/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-8 sm:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative min-h-[500px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: 'circOut' }}
                className="absolute inset-x-0"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-[1px] w-8 bg-cyber-cyan shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-cyber-cyan drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                    Link Established // {current.category}
                  </span>
                </div>
                
                <h1 className="font-display text-7xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase italic">
                  {current.title.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? 'text-cyber-pink block drop-shadow-[0_0_15px_rgba(255,0,255,0.6)]' : 'block text-white glitch-hover'}>
                      {word}
                    </span>
                  ))}
                </h1>
                
                <p className="text-sm font-mono text-white/50 mb-12 max-w-lg leading-relaxed border-l-2 border-cyber-cyan/20 pl-6">
                  &gt; {current.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => onPlay?.(current)}
                    className="cyber-border bg-cyber-pink text-white px-10 py-5 font-display font-black flex items-center gap-3 hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(255,0,255,0.4)] active:scale-95 uppercase tracking-widest text-xs"
                  >
                    <Play fill="currentColor" size={18} />
                    Initiate Stream
                  </button>
                  <button 
                    onClick={() => onDetails?.(current)}
                    className="cyber-border bg-white/5 backdrop-blur-xl text-white border border-white/10 px-10 py-5 font-display font-black flex items-center gap-3 hover:bg-cyber-cyan/20 hover:border-cyber-cyan/50 transition-all active:scale-95 uppercase tracking-widest text-xs"
                  >
                    <Info size={18} />
                    Data Specs
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Carousel Indicators */}
            <div className="absolute -bottom-12 left-0 flex gap-4">
              {FEATURED_CONTENT.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 transition-all duration-500 ${
                    index === i ? 'w-16 bg-cyber-cyan shadow-[0_0_10px_rgba(0,255,255,0.8)]' : 'w-6 bg-white/10 hover:bg-white/30'
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
                initial={{ opacity: 0, filter: 'blur(20px)', skewX: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', skewX: 0 }}
                exit={{ opacity: 0, filter: 'blur(20px)', skewX: -10 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 cyber-border overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,255,255,0.1)] group"
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-[4s]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* HUD Elements */}
                <div className="absolute top-4 right-4 text-[8px] font-mono text-cyber-cyan uppercase tracking-widest animate-pulse">
                  Rec: Live // Buffer: 100%
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-cyber-pink/20 blur-[100px] -z-10 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
