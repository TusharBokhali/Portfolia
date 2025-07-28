'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { CodeEditor } from './CodeEditor';
import { StatsGrid } from './StatsGrid';

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['100px', '-100px']);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      id="about"
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
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate about creating exceptional mobile experiences that push the boundaries of what's possible
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            style={{ y }}
            className="space-y-8"
          >
            <GlassCard glow>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Senior React Native Developer
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  With over 5 years of experience in mobile development, I specialize in building 
                  high-performance React Native applications that deliver exceptional user experiences. 
                  My expertise spans from complex eCommerce platforms to sophisticated mapping solutions.
                </p>
                <div className="space-y-4">
                  {[
                    'Cross-platform mobile development',
                    'Advanced animation & micro-interactions',
                    'Performance optimization & scalability',
                    'Real-time applications & WebSocket integration'
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </GlassCard>

            {/* Stats Grid */}
            <StatsGrid />
          </motion.div>

          {/* Right Column - Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <CodeEditor />
          </motion.div>
        </div>
      </div>
    </section>
  );
}