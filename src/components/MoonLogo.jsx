import React from 'react';

export const MoonLogo = ({ size = 36, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a8d4f0" />
          <stop offset="40%" stopColor="#5ba3d9" />
          <stop offset="100%" stopColor="#2a6fad" />
        </linearGradient>
        <linearGradient id="moonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5E3A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF9A44" stopOpacity="0" />
        </linearGradient>
        <filter id="moonBlur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
        </filter>
      </defs>
      
      {/* Outer glow */}
      <circle cx="45" cy="50" r="38" fill="url(#moonGlow)" filter="url(#moonBlur)" opacity="0.4" />
      
      {/* Crescent moon */}
      <path
        d="M 45 12 
           A 38 38 0 1 0 45 88 
           A 28 28 0 1 1 45 12 Z"
        fill="url(#moonGrad)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.5"
      />
      
      {/* "L" letter inside */}
      <text
        x="52"
        y="62"
        fontFamily="'Outfit', sans-serif"
        fontSize="36"
        fontWeight="700"
        fill="white"
        textAnchor="middle"
        opacity="0.9"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.3))' }}
      >
        L
      </text>
      
      {/* Subtle circuit dots */}
      <circle cx="30" cy="40" r="1.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="35" cy="70" r="1" fill="rgba(255,255,255,0.4)" />
      <circle cx="25" cy="55" r="1.2" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
};
