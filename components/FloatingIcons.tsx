'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export function FloatingIcons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const icons = [
    {
      component: FirebaseIcon,
      x: '10%',
      y: '20%',
      scale: 0.8,
      rotation: 0,
      speed: 1
    },
    {
      component: TypeScriptIcon,
      x: '85%',
      y: '15%',
      scale: 1,
      rotation: 45,
      speed: 1.2
    },
    {
      component: GitHubIcon,
      x: '15%',
      y: '70%',
      scale: 0.9,
      rotation: -30,
      speed: 0.8
    },
    {
      component: ReactIcon,
      x: '80%',
      y: '60%',
      scale: 1.1,
      rotation: 15,
      speed: 1.5
    },
    {
      component: JavaScriptIcon,
      x: '50%',
      y: '10%',
      scale: 0.7,
      rotation: -15,
      speed: 1.1
    },
    {
      component: CSSIcon,
      x: '90%',
      y: '80%',
      scale: 0.8,
      rotation: 30,
      speed: 0.9
    }
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-5">
      {icons.map((icon, index) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [0, -200 * icon.speed]
        );
        
        const x = useTransform(springX, [-0.5, 0.5], [-20, 20]);
        const mouseY2 = useTransform(springY, [-0.5, 0.5], [-20, 20]);

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: icon.x,
              top: icon.y,
              x,
              y: useTransform([y, mouseY2], ([yVal, mouseVal]) => yVal + mouseVal),
              scale: icon.scale,
              rotate: icon.rotation,
            }}
            animate={{
              rotate: [icon.rotation, icon.rotation + 360],
              scale: [icon.scale, icon.scale * 1.1, icon.scale],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="drop-shadow-2xl"
            >
              <icon.component />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function FirebaseIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <defs>
        <filter id="glow-firebase">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d="M5.803 21.503l4.529-7.32L7.728 6.729c-.141-.278-.502-.237-.579.065L5.803 21.503z"
        fill="url(#firebase-gradient-1)"
        filter="url(#glow-firebase)"
      />
      <path
        d="M18.197 21.503l-4.529-7.32 2.604-7.454c.141-.278.502-.237.579.065l1.346 14.709z"
        fill="url(#firebase-gradient-2)"
        filter="url(#glow-firebase)"
      />
      <defs>
        <linearGradient id="firebase-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA726" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FF7043" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="firebase-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFCC02" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFA726" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TypeScriptIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <defs>
        <filter id="glow-ts">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect
        width="20"
        height="20"
        x="2"
        y="2"
        rx="2"
        fill="url(#ts-gradient)"
        filter="url(#glow-ts)"
      />
      <path
        d="M8 8h8M12 8v8M16 16h-4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="ts-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3178C6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#235A97" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <defs>
        <filter id="glow-github">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        fill="url(#github-gradient)"
        filter="url(#glow-github)"
      />
      <defs>
        <linearGradient id="github-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <defs>
        <filter id="glow-react">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="12" cy="12" r="2" fill="url(#react-gradient)" filter="url(#glow-react)" />
      <path
        d="M12 1c-4.5 4.5-6 8.5-6 11s1.5 6.5 6 11c4.5-4.5 6-8.5 6-11S16.5 5.5 12 1z"
        stroke="url(#react-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow-react)"
      />
      <path
        d="M1 12c4.5-4.5 8.5-6 11-6s6.5 1.5 11 6c-4.5 4.5-8.5 6-11 6S5.5 16.5 1 12z"
        stroke="url(#react-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow-react)"
      />
      <defs>
        <linearGradient id="react-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#61DAFB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#21D4FD" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function JavaScriptIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <defs>
        <filter id="glow-js">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect
        width="20"
        height="20"
        x="2"
        y="2"
        rx="2"
        fill="url(#js-gradient)"
        filter="url(#glow-js)"
      />
      <path
        d="M7 15.5c0 1.5 1 2.5 2.5 2.5S12 17 12 15.5V9h2m3 6.5c0 1.5-1 2.5-2.5 2.5S12 17 12 15.5"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="js-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7DF1E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFCA28" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CSSIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <defs>
        <filter id="glow-css">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d="M5 3l-.65 3.34h13.59L17.5 8.5H3.92l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64H2.85l-.79 3.97 8.55 3.26L19 15.62l1.34-6.86.79-3.93L22 3H5z"
        fill="url(#css-gradient)"
        filter="url(#glow-css)"
      />
      <defs>
        <linearGradient id="css-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1572B6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#33A9DC" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}