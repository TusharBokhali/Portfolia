'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap, GitBranch, CheckCircle, AlertCircle } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface LogEntry {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'command';
  message: string;
  timestamp: string;
  icon?: React.ReactNode;
}

export function TerminalConsole() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isActive, setIsActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const logTemplates = [
    { type: 'command', message: '$ npm run build', icon: <Terminal size={14} /> },
    { type: 'info', message: 'Building React Native bundle...', icon: <Zap size={14} /> },
    { type: 'success', message: '✓ Bundle built successfully (2.3s)', icon: <CheckCircle size={14} /> },
    { type: 'command', message: '$ git commit -m "feat: add swipe gestures"', icon: <GitBranch size={14} /> },
    { type: 'success', message: '✓ Committed changes to main branch', icon: <CheckCircle size={14} /> },
    { type: 'info', message: 'Deploying to production...', icon: <Zap size={14} /> },
    { type: 'success', message: '🚀 Deployed to App Store successfully', icon: <CheckCircle size={14} /> },
    { type: 'info', message: 'Running automated tests...', icon: <Zap size={14} /> },
    { type: 'success', message: '✓ All tests passed (47/47)', icon: <CheckCircle size={14} /> },
    { type: 'command', message: '$ npx react-native run-ios', icon: <Terminal size={14} /> },
    { type: 'info', message: 'Starting Metro bundler...', icon: <Zap size={14} /> },
    { type: 'success', message: '✓ Metro bundler ready on port 8081', icon: <CheckCircle size={14} /> },
    { type: 'info', message: 'AI: Optimizing animation performance...', icon: <Zap size={14} /> },
    { type: 'success', message: '✓ Performance improved by 23%', icon: <CheckCircle size={14} /> },
    { type: 'warning', message: '⚠ Bundle size increased by 2KB', icon: <AlertCircle size={14} /> },
    { type: 'command', message: '$ firebase deploy --only functions', icon: <Terminal size={14} /> },
    { type: 'success', message: '✓ Functions deployed successfully', icon: <CheckCircle size={14} /> },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
        const newLog: LogEntry = {
          id: Date.now().toString(),
          type: randomLog.type as LogEntry['type'],
          message: randomLog.message,
          timestamp: new Date().toLocaleTimeString(),
          icon: randomLog.icon,
        };

        setLogs(prev => {
          const updated = [...prev, newLog];
          return updated.slice(-20); // Keep only last 20 logs
        });
      }, Math.random() * 2000 + 1000); // Random interval between 1-3 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'command': return 'text-cyan-400';
      default: return 'text-gray-300';
    }
  };

  const getLogBg = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return 'bg-green-500/10';
      case 'error': return 'bg-red-500/10';
      case 'warning': return 'bg-yellow-500/10';
      case 'command': return 'bg-cyan-500/10';
      default: return 'bg-gray-500/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto"
    >
      <GlassCard className="font-mono text-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-xs">Live Development Console</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={() => setIsActive(!isActive)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                isActive 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive ? '● Live' : '○ Paused'}
            </motion.button>
            
            <motion.button
              onClick={() => setLogs([])}
              className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear
            </motion.button>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={scrollRef}
          className="h-80 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          <AnimatePresence mode="popLayout">
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start space-x-3 p-2 rounded-lg ${getLogBg(log.type)} border border-white/5`}
              >
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <div className={`flex-shrink-0 ${getLogColor(log.type)}`}>
                    {log.icon}
                  </div>
                  <span className={`text-xs ${getLogColor(log.type)} break-all`}>
                    {log.message}
                  </span>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {log.timestamp}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {logs.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Terminal size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-sm">Terminal ready. Click "Live" to start monitoring.</p>
              </div>
            </div>
          )}
          
          {/* Cursor */}
          {isActive && (
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-cyan-400">$</span>
              <motion.div
                className="w-2 h-4 bg-cyan-400"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}