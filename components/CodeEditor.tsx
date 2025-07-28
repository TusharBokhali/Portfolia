'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';

export function CodeEditor() {
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedCode, setDisplayedCode] = useState(['']);
  const intervalRef = useRef<NodeJS.Timeout>();
  
  const codeLines = [
    'import React, { useState } from "react";',
    'import { motion, useSpring, useTransform } from "framer-motion";',
    'import { PanGestureHandler, State } from "react-native-gesture-handler";',
    '',
    'const InteractiveCard = ({ children, onSwipe }) => {',
    '  const [isDragging, setIsDragging] = useState(false);',
    '  const x = useSpring(0, { stiffness: 300, damping: 30 });',
    '  const rotate = useTransform(x, [-200, 200], [-25, 25]);',
    '  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);',
    '',
    '  const handleDrag = (event, info) => {',
    '    setIsDragging(true);',
    '    x.set(info.offset.x);',
    '  };',
    '',
    '  const handleDragEnd = (event, info) => {',
    '    setIsDragging(false);',
    '    if (Math.abs(info.offset.x) > 100) {',
    '      onSwipe?.(info.offset.x > 0 ? "right" : "left");',
    '    }',
    '    x.set(0);',
    '  };',
    '',
    '  return (',
    '    <motion.div',
    '      drag="x"',
    '      dragConstraints={{ left: -200, right: 200 }}',
    '      onDrag={handleDrag}',
    '      onDragEnd={handleDragEnd}',
    '        style={{',
    '          x,',
    '          rotate,',
    '          opacity,',
    '          cursor: isDragging ? "grabbing" : "grab"',
    '        }}',
    '      whileHover={{ scale: 1.02 }}',
    '      whileTap={{ scale: 0.98 }}',
    '      >',
    '        {children}',
    '      </motion.div>',
    '  );',
    '};'
  ];

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    const newDisplayedCode = [''];
    
    const typeCode = () => {
      if (lineIndex < codeLines.length) {
        const currentCodeLine = codeLines[lineIndex];
        
        if (charIndex < currentCodeLine.length) {
          newDisplayedCode[lineIndex] = currentCodeLine.substring(0, charIndex + 1);
          setDisplayedCode([...newDisplayedCode]);
          charIndex++;
          intervalRef.current = setTimeout(typeCode, Math.random() * 50 + 30);
        } else {
          // Line complete, move to next
          lineIndex++;
          charIndex = 0;
          if (lineIndex < codeLines.length) {
            newDisplayedCode[lineIndex] = '';
          }
          setCurrentLine(lineIndex);
          intervalRef.current = setTimeout(typeCode, 200);
        }
      } else {
        // All lines typed, restart after delay
        setTimeout(() => {
          lineIndex = 0;
          charIndex = 0;
          newDisplayedCode.length = 1;
          newDisplayedCode[0] = '';
          setDisplayedCode(['']);
          setCurrentLine(0);
          typeCode();
        }, 3000);
      }
    };

    typeCode();
    
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return (
    <GlassCard className="font-mono text-sm relative overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex space-x-2">
          <motion.div 
            className="w-3 h-3 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full bg-yellow-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </div>
        <span className="text-gray-400 text-xs ml-4">InteractiveCard.tsx</span>
        <div className="ml-auto flex items-center space-x-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs text-green-400">Live</span>
        </div>
      </div>

      {/* Code Content */}
      <div className="space-y-1 max-h-96 overflow-hidden">
        {displayedCode.map((line, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <span className="text-gray-500 text-xs w-6 text-right select-none">
              {index + 1}
            </span>
            <div className="flex-1">
              {line === '' ? (
                <div className="h-4"></div>
              ) : (
                <code className="text-gray-300" dangerouslySetInnerHTML={{
                  __html: line
                    .replace(/(import|from|const|return|new|useState|useSpring|useTransform)/g, '<span class="text-purple-400">$1</span>')
                    .replace(/(React|motion|PanGestureHandler|State)/g, '<span class="text-cyan-400">$1</span>')
                    .replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
                    .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>')
                }} />
              )}
              {index === currentLine && (
                <motion.div
                  className="inline-block w-2 h-4 bg-purple-500 ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
    </GlassCard>
  );
}