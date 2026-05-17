import React from 'react';
import { motion } from 'framer-motion';

export const Reveal = ({ children, delay = 0, y = 50, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: y, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};
