import React from 'react';
import { Reveal } from './Reveal';

export const WhyUs = () => {
  const reasons = [
    { icon: '✨', title: 'Modern Design', desc: 'Contemporary aesthetics aligned with current web standards.', float: true },
    { icon: '📱', title: 'Mobile Responsive', desc: 'Flawless experience across all mobile devices and tablets.' },
    { icon: '🎯', title: 'Clean UI/UX', desc: 'Intuitive navigation and user-focused digital interactions.' },
    { icon: '⚡', title: 'Fast Performance', desc: 'Optimized code and assets for rapid loading speeds.' },
    { icon: '🚀', title: 'Startup-Friendly', desc: 'Agile processes designed to suit growing business needs.' },
    { icon: '🤝', title: 'Personalized Support', desc: 'Direct communication and dedicated attention to your project.' }
  ];

  return (
    <section id="why-us">
      <div className="floating-orb orb-2 orb-light"></div>
      <div className="container">
        <Reveal>
          <div className="section-badge">Why LUNEX TECH</div>
          <h2 className="section-title">Built For <span className="grad">Performance</span></h2>
        </Reveal>
        <div className="why-grid">
          {reasons.map((r, i) => (
            <Reveal delay={i * 0.1} key={i}>
              <div className={`why-item glass-card ${r.float ? 'float-slow' : ''}`}>
                <span className="why-icon">{r.icon}</span>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
