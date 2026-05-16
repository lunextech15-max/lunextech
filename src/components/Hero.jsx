import React from 'react';
import { motion } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { NetworkBackground } from './NetworkBackground';

export const Hero = () => {
  return (
    <section id="hero">
      <NetworkBackground />
      
      {/* Floating Tech Icons */}
      <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg" className="tech-float tech-1" alt="React" />
      <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg" className="tech-float tech-2" alt="JS" />
      <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/html5.svg" className="tech-float tech-3" alt="HTML5" />
      <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/css3.svg" className="tech-float tech-4" alt="CSS3" />
      <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg" className="tech-float tech-5" alt="Node.js" />
      <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/figma.svg" className="tech-float tech-6" alt="Figma" />
      <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg" className="tech-float tech-7" alt="Next.js" />

      <div className="hero-grid"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="text-reveal-wrap">
            <motion.span 
              className="text-reveal"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Modern Websites
            </motion.span>
          </span><br />
          <span className="text-reveal-wrap">
            <motion.span 
              className="text-reveal"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Built For <span className="grad">Growing Brands</span>
            </motion.span>
          </span>
        </h1>
        <div className="text-reveal-wrap">
          <motion.p 
            className="hero-sub text-reveal"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            LUNEX TECH creates clean, responsive, and modern digital experiences for startups, creators, and businesses.
          </motion.p>
        </div>
        <div className="text-reveal-wrap">
          <motion.div 
            className="hero-btns text-reveal"
            style={{ display: 'flex', gap: '20px' }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic>
              <a href="#services" className="btn-primary magnetic">View Services</a>
            </Magnetic>
            <Magnetic>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="btn-outline light magnetic">Contact on WhatsApp</a>
            </Magnetic>
          </motion.div>
        </div>
      </div>
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="scroll-wheel"></div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
};
