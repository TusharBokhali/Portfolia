'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff, X } from 'lucide-react';
import { GlassCard } from './GlassCard';

export function PrivacyNotice() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed bottom-4 right-4 z-50 max-w-sm"
      >
        <GlassCard className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <h3 className="text-sm font-semibold text-white">Privacy Protected</h3>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-xs text-gray-300 mb-3">
            This site implements full privacy protection to safeguard content and user experience.
          </p>

          <div className="space-y-2 mb-3">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Lock size={12} />
              <span>Text selection disabled</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <EyeOff size={12} />
              <span>Right-click context menu disabled</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Shield size={12} />
              <span>Copy/paste shortcuts blocked</span>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1"
          >
            <span>{isExpanded ? 'Show less' : 'Learn more'}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Eye size={12} />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-white/10"
              >
                <div className="space-y-2 text-xs text-gray-400">
                  <div>• Developer tools access blocked</div>
                  <div>• View source disabled</div>
                  <div>• Print screen prevented</div>
                  <div>• Image dragging disabled</div>
                  <div>• Save page shortcuts blocked</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>
    </AnimatePresence>
  );
} 