'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Moon, Sun, Zap, Sparkles } from 'lucide-react';
import { GlassCard } from './GlassCard';

type Theme = 'ultra-dark' | 'neon-tech' | 'soft-minimal';

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>('ultra-dark');

  const themes = [
    {
      id: 'ultra-dark' as Theme,
      name: 'Ultra Dark',
      icon: <Moon size={20} />,
      description: 'Deep space aesthetic',
      colors: {
        primary: '#8B5CF6',
        secondary: '#06B6D4',
        accent: '#EC4899',
        background: 'from-slate-900 via-purple-900 to-slate-900'
      }
    },
    {
      id: 'neon-tech' as Theme,
      name: 'Neon Tech',
      icon: <Zap size={20} />,
      description: 'Cyberpunk vibes',
      colors: {
        primary: '#00FF88',
        secondary: '#FF0080',
        accent: '#00D4FF',
        background: 'from-gray-900 via-green-900 to-gray-900'
      }
    },
    {
      id: 'soft-minimal' as Theme,
      name: 'Soft Minimal',
      icon: <Sparkles size={20} />,
      description: 'Clean and elegant',
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        background: 'from-gray-50 via-blue-50 to-gray-50'
      }
    }
  ];

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    const selectedTheme = themes.find(t => t.id === theme);
    
    if (!selectedTheme) return;

    // Apply CSS custom properties
    root.style.setProperty('--theme-primary', selectedTheme.colors.primary);
    root.style.setProperty('--theme-secondary', selectedTheme.colors.secondary);
    root.style.setProperty('--theme-accent', selectedTheme.colors.accent);
    
    // Apply background gradient
    const backgroundElement = document.querySelector('.theme-background') as HTMLElement;
    if (backgroundElement) {
      backgroundElement.style.background = `linear-gradient(135deg, ${selectedTheme.colors.background})`;
    }

    // Update body classes for theme-specific styles
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);
  };

  return (
    <>
      {/* Theme Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
      >
        <Palette size={24} />
      </motion.button>

      {/* Theme Customizer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-20 right-6 z-40 w-80"
          >
            <GlassCard className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Palette className="text-purple-400" size={24} />
                <h3 className="text-xl font-bold text-white">Theme Customizer</h3>
              </div>

              <div className="space-y-4">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => setCurrentTheme(theme.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      currentTheme === theme.id
                        ? 'border-purple-400 bg-purple-400/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        currentTheme === theme.id ? 'bg-purple-400' : 'bg-white/10'
                      }`}>
                        {theme.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-white">{theme.name}</div>
                        <div className="text-sm text-gray-400">{theme.description}</div>
                      </div>
                    </div>

                    {/* Color Preview */}
                    <div className="flex space-x-2 mt-3">
                      <div 
                        className="w-6 h-6 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div 
                        className="w-6 h-6 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div 
                        className="w-6 h-6 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Theme Preview */}
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-sm text-gray-400 mb-2">Preview</div>
                <div className="space-y-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ backgroundColor: themes.find(t => t.id === currentTheme)?.colors.primary }}
                  />
                  <div 
                    className="h-2 rounded-full w-3/4"
                    style={{ backgroundColor: themes.find(t => t.id === currentTheme)?.colors.secondary }}
                  />
                  <div 
                    className="h-2 rounded-full w-1/2"
                    style={{ backgroundColor: themes.find(t => t.id === currentTheme)?.colors.accent }}
                  />
                </div>
              </div>

              {/* Apply Button */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Theme
              </motion.button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>
    </>
  );
}