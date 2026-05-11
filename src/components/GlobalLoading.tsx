import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface GlobalLoadingProps {
  isLoading: boolean;
}

export default function GlobalLoading({ isLoading }: GlobalLoadingProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black"
        >
          <div className="relative flex flex-col items-center gap-8">
            {/* Pulsing ring background */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-64 h-64 rounded-full bg-cyber-pink blur-3xl pointer-events-none"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative z-10"
            >
              <Logo className="scale-150" />
            </motion.div>

            {/* Loading text with animated dots */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[10px] uppercase font-mono font-bold tracking-[0.5em] text-cyber-cyan"
              >
                &gt; INITIALIZING_NEURAL_LINK
              </motion.div>
              <div className="flex gap-2 h-1 items-end">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [4, 16, 4],
                      opacity: [0.2, 1, 0.2]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                    className="w-1 bg-cyber-pink shadow-[0_0_8px_rgba(255,0,255,0.6)]"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
