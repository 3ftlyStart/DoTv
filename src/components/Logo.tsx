import { motion } from 'motion/react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative w-10 h-10 group">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(0,255,255,0.4)] transition-transform duration-500 group-hover:scale-110"
        >
          <defs>
            <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="100%" stopColor="#ff00ff" />
            </linearGradient>
            
            <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Glitchy hexagonal base */}
          <path 
            d="M50 5 L90 27.5 V72.5 L50 95 L10 72.5 V27.5 Z" 
            fill="black" 
            stroke="url(#cyber-grad)" 
            strokeWidth="3"
            opacity="0.8"
          />

          {/* Play button silhouette */}
          <path
            d="M68 50L41 66V34L68 50Z"
            fill="white"
            filter="url(#neon-glow)"
            className="animate-pulse"
          />
          
          {/* Scanning lines effect */}
          <line x1="20" y1="40" x2="80" y2="40" stroke="cyan" strokeWidth="0.5" opacity="0.3" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="magenta" strokeWidth="0.5" opacity="0.3" />
          <line x1="20" y1="60" x2="80" y2="60" stroke="cyan" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>
      <span className="font-display font-black text-2xl tracking-tighter text-white group-hover:tracking-widest transition-all duration-500 glitch-hover">
        Do<span className="text-cyber-cyan">Tv</span>
      </span>
    </div>
  );
}
