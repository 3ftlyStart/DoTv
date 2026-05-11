import { motion } from 'motion/react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative w-10 h-10">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_8px_16px_rgba(255,255,255,0.15)] transition-transform duration-500 group-hover:scale-110"
        >
          <defs>
            {/* 3D-effect gradient for the circle */}
            <linearGradient id="circle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E5E5E5" />
            </linearGradient>
            
            {/* Subtle inner shadow for the play button cutout */}
            <filter id="inner-shadow">
              <feOffset dx="0" dy="2" />
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceAlpha" in2="blur" operator="arithmetic" k2="-1" k3="1" result="shadow" />
              <feFlood floodColor="black" floodOpacity="0.2" />
              <feComposite in2="shadow" operator="in" />
              <feComposite in2="SourceGraphic" operator="over" />
            </filter>
          </defs>

          {/* Clean circle base */}
          <circle 
            cx="50" 
            cy="50" 
            r="48" 
            fill="url(#circle-grad)" 
          />

          {/* Play button silhouette (cutout) */}
          <path
            d="M68 50L41 66V34L68 50Z"
            fill="#050505"
            filter="url(#inner-shadow)"
          />
          
          {/* Subtle highlight ring */}
          <circle 
            cx="50" 
            cy="50" 
            r="47.5" 
            stroke="white" 
            strokeOpacity="0.5" 
            strokeWidth="1" 
          />
        </svg>
      </div>
      <span className="font-sans font-black text-2xl tracking-tighter text-white group-hover:tracking-tight transition-all duration-500">
        Do<span className="text-white/60">Tv</span>
      </span>
    </div>
  );
}
