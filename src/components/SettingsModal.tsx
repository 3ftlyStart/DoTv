import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Settings, Tv, Globe, Shield, Zap, Sparkles } from 'lucide-react';
import { GENRES, SERVICES, QUALITIES } from '../constants';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [preferences, setPreferences] = useState({
    genres: [] as string[],
    services: [] as string[],
    quality: '4K',
  });

  useEffect(() => {
    const saved = localStorage.getItem('dotv-preferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const savePreferences = (newPrefs: typeof preferences) => {
    setPreferences(newPrefs);
    localStorage.setItem('dotv-preferences', JSON.stringify(newPrefs));
  };

  const toggleGenre = (genre: string) => {
    const newGenres = preferences.genres.includes(genre)
      ? preferences.genres.filter(g => g !== genre)
      : [...preferences.genres, genre];
    savePreferences({ ...preferences, genres: newGenres });
  };

  const toggleService = (service: string) => {
    const newServices = preferences.services.includes(service)
      ? preferences.services.filter(s => s !== service)
      : [...preferences.services, service];
    savePreferences({ ...preferences, services: newServices });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 overflow-hidden"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="w-full max-w-4xl bg-[#080808] border-2 border-cyber-cyan/30 overflow-hidden relative shadow-[0_0_50px_rgba(0,255,255,0.1)] flex flex-col max-h-[85vh] cyber-border"
          >
            {/* Header */}
            <div className="p-8 md:p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan border border-cyber-cyan/30 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                  <Settings size={22} className="animate-spin-slow" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display tracking-tight text-white uppercase italic glitch-hover">User Prefs</h2>
                  <p className="text-[10px] text-cyber-cyan/60 uppercase font-mono tracking-widest mt-1">Status: Access Granted // ID: 0x9842</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 bg-white/5 hover:bg-cyber-pink hover:text-white flex items-center justify-center text-white/50 transition-all border border-white/5 cyber-border"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-12 custom-scrollbar relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
              
              {/* Quality Selection */}
              <section className="space-y-6 relative z-10">
                <div className="flex items-center gap-3">
                  <Zap size={16} className="text-cyber-cyan" />
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">Data Fidelity</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {QUALITIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => savePreferences({ ...preferences, quality: q })}
                      className={cn(
                        "p-6 border transition-all flex items-center justify-between group rounded-none cyber-border",
                        preferences.quality === q
                          ? "bg-cyber-cyan/10 border-cyber-cyan text-white shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                          : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                      )}
                    >
                      <div className="text-left">
                        <span className="block font-bold text-lg font-display uppercase tracking-widest">{q}</span>
                        <span className="text-[9px] uppercase font-mono tracking-tighter opacity-60">
                          {q === '4K' ? 'UltraHighRes:Alpha' : 'HighRes:Stable'}
                        </span>
                      </div>
                      <div className={cn(
                        "w-6 h-6 rounded-none flex items-center justify-center transition-all cyber-border",
                        preferences.quality === q ? "bg-cyber-cyan text-black" : "bg-white/10"
                      )}>
                        {preferences.quality === q && <Check size={14} strokeWidth={4} />}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Genres Selection */}
              <section className="space-y-6 relative z-10">
                <div className="flex items-center gap-3">
                  <Sparkles size={16} className="text-cyber-pink" />
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">Neural Tags</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {GENRES.map((g) => (
                    <button
                      key={g}
                      onClick={() => toggleGenre(g)}
                      className={cn(
                        "px-6 py-3 border text-[10px] font-mono font-bold transition-all flex items-center gap-2 cyber-border",
                        preferences.genres.includes(g)
                          ? "bg-cyber-pink/10 border-cyber-pink text-white shadow-[0_0_10px_rgba(255,0,255,0.2)]"
                          : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"
                      )}
                    >
                      {preferences.genres.includes(g) && <div className="w-1.5 h-1.5 bg-cyber-pink animate-pulse" />}
                      {g.toUpperCase()}
                    </button>
                  ))}
                </div>
              </section>

              {/* Streaming Services */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Tv size={16} className="text-emerald-400" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/60">My Services</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleService(s)}
                      className={cn(
                        "px-6 py-4 rounded-2xl border text-sm font-bold transition-all flex items-center gap-3",
                        preferences.services.includes(s)
                          ? "bg-emerald-500/10 border-emerald-500/50 text-white"
                          : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center transition-all",
                        preferences.services.includes(s) ? "bg-emerald-500 text-white" : "bg-white/10"
                      )}>
                        {preferences.services.includes(s) && <Check size={12} strokeWidth={3} />}
                      </div>
                      {s}
                    </button>
                  ))}
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                <Shield size={12} />
                <span>Changes saved locally</span>
              </div>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-blue-400 transition-all text-sm"
              >
                Close Preferences
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
