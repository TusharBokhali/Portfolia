'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ExternalLink, Github, Calendar, Users, Star } from 'lucide-react';
import { GlassCard } from './GlassCard';

export function ProjectTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const projects = [
    {
      id: 1,
      title: 'EcommercePro Mobile',
      description: 'Revolutionary eCommerce platform with AI-powered recommendations, real-time inventory sync, and seamless payment integration. Built with React Native and Firebase.',
      tech: ['React Native', 'TypeScript', 'Firebase', 'Stripe', 'Redux Toolkit'],
      image: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#',
      date: '2024',
      stats: { users: '50K+', rating: 4.8, downloads: '100K+' },
      featured: true
    },
    {
      id: 2,
      title: 'MapNavigator Pro',
      description: 'Advanced mapping solution with custom markers, route optimization, offline functionality, and real-time traffic updates for delivery services.',
      tech: ['React Native', 'MapBox', 'GraphQL', 'Node.js', 'PostgreSQL'],
      image: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#',
      date: '2023',
      stats: { users: '25K+', rating: 4.9, downloads: '75K+' },
      featured: true
    },
    {
      id: 3,
      title: 'POS Terminal Suite',
      description: 'Modern point-of-sale system with inventory management, analytics dashboard, multi-payment integration, and cloud synchronization.',
      tech: ['React Native', 'Node.js', 'MongoDB', 'WebSocket', 'Express'],
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#',
      date: '2023',
      stats: { users: '15K+', rating: 4.7, downloads: '40K+' },
      featured: false
    },
    {
      id: 4,
      title: 'FinanceTracker AI',
      description: 'Intelligent personal finance management app with AI-driven insights, expense categorization, and investment recommendations.',
      tech: ['React Native', 'TensorFlow', 'Python', 'FastAPI', 'SQLite'],
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#',
      date: '2022',
      stats: { users: '30K+', rating: 4.6, downloads: '60K+' },
      featured: false
    }
  ];

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
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent mb-6">
            Project Timeline
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A journey through innovative mobile solutions that have impacted thousands of users
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-emerald-400 to-cyan-500 rounded-full"
              style={{ height: lineHeight }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Project Cards */}
          <div className="space-y-24">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isLeft }: { 
  project: any; 
  index: number; 
  isLeft: boolean; 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.8, type: 'spring' }}
    >
      <div className={`w-full max-w-lg ${isLeft ? 'pr-12' : 'pl-12'}`}>
        <GlassCard className="group relative overflow-hidden" glow={project.featured}>
          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⭐ Featured
            </motion.div>
          )}

          {/* Project Image */}
          <div className="relative mb-6 overflow-hidden rounded-lg">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Overlay Links */}
            <div className="absolute top-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.a
                href={project.github}
                className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={16} />
              </motion.a>
              <motion.a
                href={project.demo}
                className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={16} />
              </motion.a>
            </div>

            {/* Date Badge */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-1 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs text-white">
              <Calendar size={12} />
              <span>{project.date}</span>
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all duration-300">
              {project.title}
            </h3>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              {project.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-emerald-400 font-bold">
                  <Users size={14} />
                  <span className="text-sm">{project.stats.users}</span>
                </div>
                <div className="text-xs text-gray-500">Users</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-yellow-400 font-bold">
                  <Star size={14} />
                  <span className="text-sm">{project.stats.rating}</span>
                </div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-cyan-400 font-bold text-sm">{project.stats.downloads}</div>
                <div className="text-xs text-gray-500">Downloads</div>
              </div>
            </div>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 text-xs bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-full text-emerald-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.2 + techIndex * 0.1 + 0.5 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Timeline Node */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full border-4 border-slate-900 z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
        whileHover={{ scale: 1.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full"
          animate={{ 
            boxShadow: [
              '0 0 0 0 rgba(52, 211, 153, 0.7)',
              '0 0 0 10px rgba(52, 211, 153, 0)',
              '0 0 0 0 rgba(52, 211, 153, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}