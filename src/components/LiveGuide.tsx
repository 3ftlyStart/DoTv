import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHANNELS, Program, Channel } from '../constants';
import { Bell, Play, ChevronRight, Clock, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LiveGuide() {
  const [selectedChannel, setSelectedChannel] = useState<Channel>(CHANNELS[0]);
  const [reminders, setReminders] = useState<string[]>([]);

  const toggleReminder = (programId: string) => {
    setReminders(prev => 
      prev.includes(programId) 
        ? prev.filter(id => id !== programId) 
        : [...prev, programId]
    );
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section id="live-guide" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 blur-[100px] pointer-events-none -z-10" />
      
      <div className="flex flex-col md:flex-row gap-12">
        {/* Channel Grid */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="mb-6">
            <h2 className="text-3xl font-bold font-display mb-2">Live Guide</h2>
            <p className="text-white/40 text-sm">Real-time programming at your fingertips.</p>
          </div>
          
          <div className="flex flex-col gap-3">
            {CHANNELS.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel)}
                className={cn(
                  "p-5 rounded-2xl border transition-all text-left flex items-center justify-between group",
                  selectedChannel.id === channel.id
                    ? "bg-white/10 border-white/20 shadow-xl"
                    : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/7"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 p-2 flex items-center justify-center overflow-hidden">
                    <img 
                      src={channel.logo} 
                      alt={channel.name} 
                      className="w-full h-full object-contain filter grayscale invert brightness-200" 
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{channel.name}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-black mt-0.5">
                      {channel.category}
                    </p>
                  </div>
                </div>
                <ChevronRight 
                  size={18} 
                  className={cn(
                    "transition-transform group-hover:translate-x-1",
                    selectedChannel.id === channel.id ? "text-blue-500 opacity-100" : "text-white/20 opacity-0"
                  )} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Schedule View */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedChannel.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 font-black text-6xl pointer-events-none uppercase">
                {selectedChannel.category}
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 bg-red-600 rounded text-[10px] font-black tracking-widest text-white shadow-lg shadow-red-600/20">
                      ON AIR
                    </div>
                    <h3 className="text-2xl font-bold">{selectedChannel.schedule[0].title}</h3>
                  </div>
                  <button className="px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-blue-400 transition-all scale-100 active:scale-95 group">
                    <Play size={18} fill="black" />
                    Watch Now
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-bold text-white/50 uppercase tracking-[0.2em] mb-6">Upcoming Next</p>
                  
                  {selectedChannel.schedule.slice(1).map((program, idx) => (
                    <div 
                      key={program.id}
                      className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-8">
                        <div className="text-white/40 font-mono text-sm">
                          {formatTime(program.startTime)}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                            {program.title}
                          </h4>
                          <p className="text-xs text-white/40 max-w-sm line-clamp-1">{program.description}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => toggleReminder(program.id)}
                        className={cn(
                          "p-4 rounded-xl border transition-all transform hover:scale-105 active:scale-95",
                          reminders.includes(program.id)
                            ? "bg-blue-500/20 border-blue-500 text-blue-500"
                            : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                        )}
                      >
                        <Bell size={18} className={reminders.includes(program.id) ? "fill-current" : ""} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 rounded-[2rem] bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-500/10 flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                    <Info size={20} />
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed italic">
                    Reminders will send a push notification to your DoTv and linked mobile devices 5 minutes before the show starts.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
