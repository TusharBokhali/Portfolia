'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export function SkillsGalaxy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const skills = [
    { name: 'React Native', level: 95, color: '#61DAFB', icon: '⚛️', orbit: 120, speed: 1 },
    { name: 'TypeScript', level: 90, color: '#3178C6', icon: '📘', orbit: 160, speed: 0.8 },
    { name: 'Firebase', level: 85, color: '#FFCA28', icon: '🔥', orbit: 200, speed: 1.2 },
    { name: 'Node.js', level: 80, color: '#339933', icon: '🟢', orbit: 140, speed: 0.9 },
    { name: 'GraphQL', level: 75, color: '#E10098', icon: '🔗', orbit: 180, speed: 1.1 },
    { name: 'MongoDB', level: 85, color: '#47A248', icon: '🍃', orbit: 220, speed: 0.7 },
    { name: 'Reanimated', level: 92, color: '#8B5CF6', icon: '✨', orbit: 100, speed: 1.3 },
    { name: 'Redux', level: 88, color: '#764ABC', icon: '🔄', orbit: 240, speed: 0.6 },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        mouseX.set((e.clientX - centerX) / 10);
        mouseY.set((e.clientY - centerY) / 10);
        
        setMousePosition({
          x: (e.clientX - centerX) / rect.width,
          y: (e.clientY - centerY) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const galaxyRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section 
      ref={containerRef}
      className="py-32 px-6 relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
            Skills Galaxy
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            An interactive constellation of technologies I master
          </p>
        </motion.div>

        {/* Galaxy Container */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          {/* Central Avatar */}
          <motion.div
            className="absolute z-10 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-2xl"
            style={{ x: springX, y: springY }}
            whileHover={{ scale: 1.2 }}
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(168, 85, 247, 0.5)',
                '0 0 40px rgba(168, 85, 247, 0.8)',
                '0 0 20px rgba(168, 85, 247, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            👨‍💻
          </motion.div>

          {/* Orbiting Skills */}
          {skills.map((skill, index) => (
            <SkillOrbit
              key={skill.name}
              skill={skill}
              index={index}
              mousePosition={mousePosition}
              galaxyRotation={galaxyRotation}
            />
          ))}

          {/* Background Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillOrbit({ skill, index, mousePosition, galaxyRotation }: {
  skill: any;
  index: number;
  mousePosition: { x: number; y: number };
  galaxyRotation: any;
}) {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const baseAngle = (index * 360) / 8; // Distribute evenly
  const orbitRadius = skill.orbit;

  return (
    <motion.div
      ref={orbitRef}
      className="absolute"
      style={{
        rotate: galaxyRotation,
      }}
      animate={{
        rotate: baseAngle + (skill.speed * 360),
      }}
      transition={{
        duration: 20 / skill.speed,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <motion.div
        className="relative"
        style={{
          x: orbitRadius,
          y: 0,
        }}
        animate={{
          x: orbitRadius + (mousePosition.x * 20),
          y: mousePosition.y * 20,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full backdrop-blur-md border border-white/20 flex flex-col items-center justify-center cursor-pointer group"
          style={{
            backgroundColor: `${skill.color}20`,
            borderColor: `${skill.color}40`,
          }}
          whileHover={{ 
            scale: 1.3,
            backgroundColor: `${skill.color}40`,
            borderColor: skill.color,
          }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          animate={{
            boxShadow: isHovered 
              ? `0 0 30px ${skill.color}80`
              : `0 0 10px ${skill.color}40`,
          }}
        >
          <div className="text-2xl mb-1">{skill.icon}</div>
          
          {/* Skill Info Tooltip */}
          <motion.div
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-black/80 backdrop-blur-md rounded-lg text-xs whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-white font-semibold">{skill.name}</div>
            <div className="text-gray-300">{skill.level}% Proficiency</div>
            
            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-600 rounded-full mt-1 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={isHovered ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Orbit Trail */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed opacity-20"
          style={{
            borderColor: skill.color,
            width: orbitRadius * 2,
            height: orbitRadius * 2,
            left: -orbitRadius,
            top: -orbitRadius,
          }}
          animate={{
            rotate: -baseAngle - (skill.speed * 360),
          }}
          transition={{
            duration: 20 / skill.speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
    </motion.div>
  );
}