'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(true); // Start as visible
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth following
  const cursorX = useSpring(mouseX, {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  });
  
  const cursorY = useSpring(mouseY, {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  });
  
  // Follower dot with more delay
  const followerX = useSpring(mouseX, {
    stiffness: 100,
    damping: 20,
    mass: 0.2,
  });
  
  const followerY = useSpring(mouseY, {
    stiffness: 100,
    damping: 20,
    mass: 0.2,
  });
  
  // Transform values for effects
  const cursorScale = useTransform(cursorX, [0, 1920], [1, 1.1]);
  const followerScale = useTransform(followerX, [0, 1920], [0.8, 1]);
  
  // Hover effects
  const hoverScale = useSpring(isHovering ? 2.5 : 1, {
    stiffness: 400,
    damping: 25,
  });
  
  const followerHoverScale = useSpring(isHovering ? 0.5 : 1, {
    stiffness: 400,
    damping: 25,
  });
  
  // Click effects
  const clickScale = useSpring(isClicking ? 0.8 : 1, {
    stiffness: 600,
    damping: 20,
  });
  
  // Opacity for smooth appearance
  const cursorOpacity = useSpring(isVisible ? 1 : 0, {
    stiffness: 300,
    damping: 30,
  });
  
  // Throttled mouse move handler
  let ticking = false;
  const updateMousePosition = (e: MouseEvent) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        ticking = false;
      });
      ticking = true;
    }
  };
  
  useEffect(() => {
    // Mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      updateMousePosition(e);
    };
    
    // Hover detection for interactive elements
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('hoverable') ||
        target.closest('.hoverable')
      ) {
        setIsHovering(true);
      }
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    
    // Click detection
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    // Hide cursor when leaving window
    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    
    // Add hover detection to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, .hoverable, [role="button"], [tabindex]'
    );
    
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  // Hide default cursor
  useEffect(() => {
    // Only hide cursor if custom cursor is working
    if (typeof window !== 'undefined') {
      document.body.style.cursor = 'none';
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.cursor = 'auto';
      }
    };
  }, []);
  
  return (
    <>
      {/* Simple test cursor - always visible */}
      <div
        className="fixed w-8 h-8 bg-blue-500 rounded-full pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference cursor-gpu"
        style={{
          x: cursorX,
          y: cursorY,
          scale: hoverScale,
          opacity: cursorOpacity,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-white shadow-lg"
          style={{
            scale: clickScale,
            boxShadow: isHovering 
              ? '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.3)' 
              : '0 0 15px rgba(255, 255, 255, 0.5)',
          }}
          animate={{
            boxShadow: isHovering 
              ? [
                  '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.3)',
                  '0 0 40px rgba(139, 92, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.4)',
                  '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.3)',
                ]
              : '0 0 15px rgba(255, 255, 255, 0.5)',
          }}
          transition={{
            duration: 2,
            repeat: isHovering ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
        
        {/* Ripple effect on click */}
        {isClicking && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/50"
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
      </motion.div>
      
      {/* Follower dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-[9998] cursor-gpu"
        style={{
          x: followerX,
          y: followerY,
          scale: followerHoverScale,
          opacity: cursorOpacity,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-cyan-400/70"
          style={{
            scale: clickScale,
            filter: 'blur(1px)',
          }}
          animate={{
            boxShadow: isHovering 
              ? '0 0 20px rgba(6, 182, 212, 0.8)' 
              : '0 0 5px rgba(6, 182, 212, 0.5)',
          }}
          transition={{
            duration: 0.3,
          }}
        />
      </motion.div>
      
      {/* Trail effect for fast movement */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[9997] cursor-trail"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: cursorOpacity,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-purple-400/40"
          animate={{
            scale: [1, 0.5, 0],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.div>
      
      {/* Fallback cursor for debugging */}
      <div
        className="fixed w-4 h-4 bg-red-500 rounded-full pointer-events-none z-[9996]"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
} 