import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoonLogo } from './MoonLogo';

const techIcons = [
  { name: 'React', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg' },
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg' },
  { name: 'HTML5', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/html5.svg' },
  { name: 'CSS3', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/css3.svg' },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg' },
  { name: 'Figma', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/figma.svg' },
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg' },
  { name: 'Tailwind', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg' },
  { name: 'Vite', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vite.svg' },
];

export const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const logoTimer = setTimeout(() => setShowLogo(true), 1800);
    const exitTimer = setTimeout(() => setExiting(true), 3200);
    const completeTimer = setTimeout(() => onComplete(), 3800);

    return () => {
      clearInterval(timer);
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="loader-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Orbiting ring of icons — pure CSS positioning */}
          <div className="loader-orbit-ring">
            {techIcons.map((icon, i) => (
              <div 
                key={icon.name} 
                className="loader-orbit-slot"
                style={{ '--i': i, '--total': techIcons.length }}
              >
                <div className="loader-orbit-icon" style={{ animationDelay: `${i * 0.15}s` }}>
                  <img src={icon.src} alt={icon.name} />
                  <span>{icon.name}</span>
                </div>
              </div>
            ))}
            {/* Center glow */}
            <div className="loader-center-glow" />
          </div>

          {/* Running tech strip at bottom */}
          <div className="loader-runner">
            <div className="loader-runner-track">
              {[...techIcons, ...techIcons, ...techIcons].map((icon, i) => (
                <div className="runner-item" key={i}>
                  <img src={icon.src} alt={icon.name} />
                </div>
              ))}
            </div>
          </div>

          {/* Logo */}
          <motion.div
            className="loader-logo"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={showLogo ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="loader-logo-text">LUNEX</span>
            <span className="loader-logo-accent">TECH</span>
          </motion.div>

          {/* Progress */}
          <div className="loader-bar-wrap">
            <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
            <span className="loader-bar-pct">{progress}%</span>
          </div>

          <motion.p
            className="loader-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Building digital experiences
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
