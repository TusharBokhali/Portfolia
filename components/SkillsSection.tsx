'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { GlassCard } from './GlassCard';

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['50px', '-50px']);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      title: 'Mobile Development',
      skills: [
        { name: 'React Native', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript', level: 95 },
        { name: 'Swift/Kotlin', level: 60 },
      ]
    },
    {
      title: 'Backend & Tools',
      skills: [
        { name: 'Firebase', level: 85 },
        { name: 'Node.js', level: 80 },
        { name: 'GraphQL', level: 60 },
        { name: 'REST APIs', level: 90 },
      ]
    },
    {
      title: 'Animation & UI',
      skills: [
        { name: 'Reanimated', level: 90 },
        { name: 'Lottie', level: 95 },
        { name: 'Gesture Handler', level: 90 },
        { name: 'Custom Animations', level: 92 },
      ]
    }
  ];

  return (
    <section 
      id="skills"
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
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          style={{ y }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
            >
              <GlassCard glow>
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
                            duration: 1,
                            ease: 'easeOut'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}