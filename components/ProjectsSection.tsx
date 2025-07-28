'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { GlassCard } from './GlassCard';

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['100px', '-100px']);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const projects = [
    {
      title: 'EcommercePro',
      description: 'Full-featured eCommerce mobile app with advanced animations, real-time inventory, and seamless checkout experience.',
      tech: ['React Native', 'TypeScript', 'Firebase', 'Stripe'],
      image: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#'
    },
    {
      title: 'MapNavigator',
      description: 'Advanced mapping solution with custom markers, route optimization, and offline functionality for delivery services.',
      tech: ['React Native', 'MapBox', 'GraphQL', 'Redux'],
      image: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#'
    },
    {
      title: 'POS Terminal',
      description: 'Modern point-of-sale system with inventory management, analytics dashboard, and multi-payment integration.',
      tech: ['React Native', 'Node.js', 'PostgreSQL', 'WebSocket'],
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#'
    }
  ];

  return (
    <section 
      id="projects"
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
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Showcasing some of my best work in mobile development
          </p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-3 gap-8"
          style={{ y }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <GlassCard className="group overflow-hidden">
                {/* Project Image */}
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Overlay Links */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.a
                      href={project.github}
                      className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={16} />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 text-xs bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-purple-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}