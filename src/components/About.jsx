import React from 'react';
import { Reveal } from './Reveal';

export const About = () => {
  return (
    <section id="about">
      <div className="floating-orb orb-1 orb-light"></div>
      <div className="floating-orb orb-3 orb-light"></div>
      <div className="container">
        <div className="about-grid">
          <Reveal>
            <div className="about-text">
              <div className="section-badge">About Us</div>
              <h2 className="section-title">Designing For The <span className="grad">Modern Web</span></h2>
              <p className="section-sub">At LUNEX TECH, we believe that your digital presence is your most powerful asset. We
                focus on building clean, mobile-first, and highly optimized websites that help startups and growing brands
                stand out.</p>
              <p className="section-sub">Our approach combines intuitive UI/UX design with modern development practices to
                deliver fast, responsive, and engaging digital experiences tailored to your unique goals.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2} className="tilt-card float-slow">
            <div className="about-visual">
              <div className="glass-card visual-card">
                <div className="visual-glow"></div>
                <div className="visual-content">
                  <span className="v-icon">✦</span>
                  <h3>Clean UI/UX</h3>
                  <p>Designed for humans, engineered for performance.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
