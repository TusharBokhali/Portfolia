'use client';

import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { FloatingIcons } from '@/components/FloatingIcons';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { ProjectTimeline } from '@/components/ProjectTimeline';
import { SkillsGalaxy } from '@/components/SkillsGalaxy';
import { TerminalConsole } from '@/components/TerminalConsole';
import { AchievementWall } from '@/components/AchievementWall';
import { ThemeCustomizer } from '@/components/ThemeCustomizer';
import { PrivacyNotice } from '@/components/PrivacyNotice';
import { CustomCursor } from '@/components/CustomCursor';

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // Create scroll-based background transformations
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  useEffect(() => {
    // Reduce motion for users who prefer it
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    document.documentElement.classList.toggle('reduce-motion', mediaQuery.matches);
    
    // Enhanced smooth scroll behavior
    document.documentElement.style.scrollBehavior = mediaQuery.matches ? 'auto' : 'smooth';
    
    // Add custom scroll easing for better transitions
    if (!mediaQuery.matches) {
      const style = document.createElement('style');
      style.textContent = `
        html {
          scroll-behavior: smooth;
        }
        @media (prefers-reduced-motion: no-preference) {
          html {
            scroll-behavior: smooth;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Privacy and security enhancements
    const enablePrivacyMode = () => {
      // Disable right-click context menu
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      });

      // Disable keyboard shortcuts for copying (keeping some restrictions for content protection)
      document.addEventListener('keydown', (e) => {
        // Prevent Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+Z, Ctrl+Y (content protection only)
        if (
          (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a' || e.key === 'z' || e.key === 'y'))
        ) {
          e.preventDefault();
          return false;
        }
      });

      // Disable text selection
      document.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
      });

      // Disable drag and drop
      document.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
      });

      // Disable copy events
      document.addEventListener('copy', (e) => {
        e.preventDefault();
        return false;
      });

      // Disable cut events
      document.addEventListener('cut', (e) => {
        e.preventDefault();
        return false;
      });

      // Disable paste events
      document.addEventListener('paste', (e) => {
        e.preventDefault();
        return false;
      });

      // Developer tools are now enabled
      // Removed restrictions for F12, Ctrl+Shift+I, Ctrl+U, PrintScreen, Ctrl+S
    };

    // Enable privacy mode
    enablePrivacyMode();

    // Disable console logging in production
    if (process.env.NODE_ENV === 'production') {
      console.log = () => {};
      console.info = () => {};
      console.warn = () => {};
      console.error = () => {};
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 z-0 theme-background"
        style={{ y: backgroundY, opacity }}
      >
        <BackgroundEffects />
      </motion.div>

      {/* Floating Icons */}
      <FloatingIcons />

      {/* Theme Customizer */}
      <ThemeCustomizer />

      {/* Privacy Notice */}
      <PrivacyNotice />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        
        <main className="space-y-0">
          <HeroSection />
          <AboutSection />
          <SkillsGalaxy />
          <SkillsSection />
          <ProjectTimeline />
          <ProjectsSection />
          <AchievementWall />
          
          {/* Terminal Console Section */}
          <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-6">
                  Live Development
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                  Real-time glimpse into my development workflow
                </p>
              </motion.div>
              <TerminalConsole />
            </div>
          </section>
          
          <ContactSection />
        </main>
      </div>
    </div>
  );
}