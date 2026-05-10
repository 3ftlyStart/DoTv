import { motion } from 'motion/react';
import { UserProfile } from '../constants';
import { Plus } from 'lucide-react';

interface ProfileSelectionProps {
  profiles: UserProfile[];
  onSelect: (profile: UserProfile) => void;
}

export default function ProfileSelection({ profiles, onSelect }: ProfileSelectionProps) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight mb-4">
          Who's Watching?
        </h1>
        <p className="text-white/40 font-medium uppercase tracking-[0.2em] text-sm">
          Select a profile to continue
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl">
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer flex flex-col items-center"
            onClick={() => onSelect(profile)}
          >
            <div className={`relative w-28 h-28 md:w-40 md:h-40 rounded-[2rem] bg-gradient-to-br ${profile.color} p-1 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-active:scale-95 shadow-2xl`}>
              <div className="w-full h-full bg-[#050505] rounded-[1.8rem] overflow-hidden p-2">
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-full h-full object-cover filter transition-all duration-500 group-hover:brightness-110" 
                />
              </div>
              <div className="absolute inset-0 ring-4 ring-white/0 group-hover:ring-blue-500/50 rounded-[2rem] transition-all" />
            </div>
            <span className="mt-6 font-bold text-lg md:text-xl text-white/50 group-hover:text-white transition-colors">
              {profile.name}
            </span>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: profiles.length * 0.1 }}
          className="group cursor-pointer flex flex-col items-center"
        >
          <div className="w-28 h-28 md:w-40 md:h-40 rounded-[2.5rem] bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-105">
            <Plus size={40} className="text-white/20 group-hover:text-blue-500 transition-colors" />
          </div>
          <span className="mt-6 font-bold text-lg text-white/20 group-hover:text-white/40">Add Profile</span>
        </motion.div>
      </div>

      <div className="mt-24">
        <button className="px-10 py-3 rounded-xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-xs font-black">
          Manage Profiles
        </button>
      </div>
    </div>
  );
}
