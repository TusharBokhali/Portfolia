'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export function BackgroundEffects() {
  const { scrollYProgress } = useScroll();
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.4, 0.2]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.3, 0.8], [0.6, 0.8, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Animated Gradient Overlays */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-purple-900/30 to-pink-900/20"
        style={{ opacity: opacity1, scale }}
        animate={{
          background: [
            'linear-gradient(45deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.1))',
            'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(34, 211, 238, 0.2), rgba(168, 85, 247, 0.1))',
            'linear-gradient(225deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.2), rgba(34, 211, 238, 0.1))',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Secondary Moving Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-cyan-500/10"
        style={{ opacity: opacity2 }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      {/* Mesh Gradient Effect */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
            `
          }}
        />
      </div>
    </div>
  );
}