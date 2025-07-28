'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Star, Download, Users, Code, Zap } from 'lucide-react';
import { GlassCard } from './GlassCard';

export function AchievementWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const achievements = [
    {
      id: 1,
      title: 'App Store Featured',
      description: 'Featured in App Store "Apps We Love"',
      icon: <Star className="w-8 h-8" />,
      color: 'from-yellow-400 to-orange-500',
      rarity: 'legendary',
      date: '2024',
      progress: 100
    },
    {
      id: 2,
      title: '1M+ Downloads',
      description: 'Reached 1 million total downloads',
      icon: <Download className="w-8 h-8" />,
      color: 'from-green-400 to-emerald-500',
      rarity: 'epic',
      date: '2024',
      progress: 100
    },
    {
      id: 3,
      title: 'Performance Master',
      description: '60 FPS animations in all apps',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-purple-400 to-pink-500',
      rarity: 'rare',
      date: '2023',
      progress: 100
    },
    {
      id: 4,
      title: 'Code Warrior',
      description: '10,000+ lines of quality code',
      icon: <Code className="w-8 h-8" />,
      color: 'from-cyan-400 to-blue-500',
      rarity: 'epic',
      date: '2023',
      progress: 100
    },
    {
      id: 5,
      title: 'User Champion',
      description: '100K+ active monthly users',
      icon: <Users className="w-8 h-8" />,
      color: 'from-indigo-400 to-purple-500',
      rarity: 'epic',
      date: '2024',
      progress: 100
    },
    {
      id: 6,
      title: 'Innovation Leader',
      description: 'First to implement AR in eCommerce',
      icon: <Trophy className="w-8 h-8" />,
      color: 'from-pink-400 to-red-500',
      rarity: 'legendary',
      date: '2024',
      progress: 100
    },
    {
      id: 7,
      title: 'Speed Demon',
      description: 'App launch time under 2 seconds',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-orange-400 to-red-500',
      rarity: 'rare',
      date: '2023',
      progress: 85
    },
    {
      id: 8,
      title: 'Global Reach',
      description: 'Apps available in 50+ countries',
      icon: <Star className="w-8 h-8" />,
      color: 'from-teal-400 to-cyan-500',
      rarity: 'epic',
      date: '2024',
      progress: 92
    }
  ];

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400/50 shadow-yellow-400/25';
      case 'epic': return 'border-purple-400/50 shadow-purple-400/25';
      case 'rare': return 'border-blue-400/50 shadow-blue-400/25';
      default: return 'border-gray-400/50 shadow-gray-400/25';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'shadow-2xl shadow-yellow-400/30';
      case 'epic': return 'shadow-2xl shadow-purple-400/30';
      case 'rare': return 'shadow-2xl shadow-blue-400/30';
      default: return 'shadow-2xl shadow-gray-400/30';
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-32 px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6">
            Achievement Wall
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Milestones and accomplishments in my development journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.8,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                y: -10, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <GlassCard 
                className={`relative overflow-hidden border-2 ${getRarityBorder(achievement.rarity)} ${getRarityGlow(achievement.rarity)} group-hover:${getRarityGlow(achievement.rarity)}`}
              >
                {/* Rarity Badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold capitalize ${
                  achievement.rarity === 'legendary' ? 'bg-yellow-400/20 text-yellow-400' :
                  achievement.rarity === 'epic' ? 'bg-purple-400/20 text-purple-400' :
                  'bg-blue-400/20 text-blue-400'
                }`}>
                  {achievement.rarity}
                </div>

                {/* Achievement Icon */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    className={`p-4 rounded-full bg-gradient-to-r ${achievement.color} text-white`}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(255,255,255,0.1)',
                        '0 0 30px rgba(255,255,255,0.2)',
                        '0 0 20px rgba(255,255,255,0.1)'
                      ]
                    }}
                    transition={{ 
                      boxShadow: { duration: 2, repeat: Infinity },
                      scale: { duration: 0.3 },
                      rotate: { duration: 0.3 }
                    }}
                  >
                    {achievement.icon}
                  </motion.div>
                </div>

                {/* Achievement Info */}
                <div className="text-center space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {achievement.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-400">{achievement.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${achievement.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${achievement.progress}%` } : {}}
                        transition={{ 
                          delay: index * 0.1 + 0.5,
                          duration: 1,
                          ease: 'easeOut'
                        }}
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="text-xs text-gray-500 pt-2 border-t border-white/10">
                    Achieved in {achievement.date}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                />

                {/* Sparkle Effect */}
                {achievement.rarity === 'legendary' && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}