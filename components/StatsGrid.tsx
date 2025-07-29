'use client';

import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';

export function StatsGrid() {
  const stats = [
    { label: 'Apps Built', value: '20+', color: 'from-cyan-400 to-blue-500' },
    { label: 'Years Experience', value: '2+', color: 'from-purple-400 to-pink-500' },
    { label: 'GitHub Commits', value: '1.6k+', color: 'from-green-400 to-emerald-500' },
    { label: 'App Store Rating', value: '4.9★', color: 'from-yellow-400 to-orange-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <GlassCard className="text-center">
            <motion.div
              className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {stat.value}
            </motion.div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}