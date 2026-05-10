import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Search } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { useState } from 'react';
import { cn } from '../lib/utils';

import { UserProfile } from '../constants';

interface NavbarProps {
  activeProfile: UserProfile | null;
  onSwitchProfile: () => void;
  onSearch: () => void;
}

export default function Navbar({ activeProfile, onSwitchProfile, onSearch }: NavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide when scrolling down, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    // Change appearance after scrolling a bit
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6">
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1, scale: 1 },
          hidden: { y: -100, opacity: 0, scale: 0.95 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex items-center justify-between px-8 py-4 rounded-full border transition-all duration-500 w-full max-w-4xl",
          scrolled 
            ? "bg-black/60 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
            : "bg-white/5 backdrop-blur-xl border-white/5"
        )}
      >
        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center group">
            <span className="font-display font-black text-xl tracking-tighter italic bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              OGLE TV
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all transform hover:scale-105"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onSearch}
            className="p-2 text-white/50 hover:text-white transition-all transform hover:scale-110"
          >
            <Search size={18} />
          </button>
          
          <div 
            onClick={onSwitchProfile}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${activeProfile?.color || 'from-zinc-800 to-zinc-900'} border border-white/20 shadow-lg group-hover:ring-2 ring-blue-500/50 transition-all overflow-hidden p-0.5`}>
              {activeProfile && (
                <img src={activeProfile.avatar} alt={activeProfile.name} className="w-full h-full object-cover rounded-full" />
              )}
            </div>
            <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
              {activeProfile?.name || 'Sign In'}
            </span>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
