'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  hover = true, 
  glow = false 
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6',
        'shadow-xl shadow-black/20',
        glow && 'shadow-purple-500/20',
        className
      )}
      whileHover={hover ? { 
        scale: 1.02, 
        borderColor: 'rgba(139, 92, 246, 0.5)',
        boxShadow: glow 
          ? '0 25px 50px -12px rgba(139, 92, 246, 0.4)' 
          : '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
      } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}