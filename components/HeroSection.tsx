'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { TypewriterEffect } from './TypewriterEffect';
import { GlassCard } from './GlassCard';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      <motion.div
        className="max-w-4xl mx-auto text-center z-10"
        style={{ y, scale, opacity }}
      >
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Tushar
            </span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Variya
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle with Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <TypewriterEffect
            words={[
              'React Native Developer',
              'Mobile App Architect', 
              'Animation Specialist',
              'Performance Optimizer'
            ]}
            className="text-xl md:text-2xl text-gray-300"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Crafting high-performance mobile experiences with cutting-edge animations,
          seamless user interfaces, and scalable architectures. Specialized in eCommerce,
          Maps, and POS applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold text-lg shadow-lg shadow-purple-500/25 hoverable"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.5)' 
            }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
          
          <motion.button
            className="px-8 py-4 border border-gray-600 rounded-full text-white font-semibold text-lg hover:border-purple-500 transition-colors hoverable"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-6 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {[
            { icon: Github, href: 'https://github.com/tusharvariya', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/tushar-variya-6192202a6', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:tusharvariya@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 hover:text-white hover:bg-white/20 transition-all hoverable"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8 + index * 0.1 }}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.button
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }}
          className="group flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer hoverable"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
        >
            <span className="text-sm mb-2 font-medium group-hover:text-cyan-400 transition-colors">
              Scroll to explore
            </span>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.2 }}
            >
              <ArrowDown 
                size={24} 
                className="group-hover:text-cyan-400 transition-colors duration-300"
              />
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
          
          {/* Press indicator */}
          <motion.div
            className="mt-2 text-xs text-gray-500 group-hover:text-gray-400 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            Press to scroll down
        </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}