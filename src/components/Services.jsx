import React from 'react';
import { Reveal } from './Reveal';

export const Services = () => {
  const services = [
    { icon: '⬡', title: 'Business Websites', desc: 'Professional, conversion-optimized websites designed to represent your company online.' },
    { icon: '◈', title: 'Portfolio Websites', desc: 'Showcase your work with stunning, minimalist portfolio designs that leave an impression.' },
    { icon: '⬢', title: 'Landing Pages', desc: 'High-impact, single-page designs crafted specifically for marketing campaigns and product launches.' },
    { icon: '◉', title: 'UI/UX Design', desc: 'Intuitive user interfaces and seamless user experiences focused on usability and aesthetics.' },
    { icon: '✦', title: 'Website Redesign', desc: 'Modernize your existing website with a fresh, contemporary look and improved performance.' },
    { icon: '⬟', title: 'Responsive Web Dev', desc: 'Clean, mobile-first code ensuring your website looks perfect on every device and screen size.' }
  ];

  return (
    <section id="services">
      <div className="floating-orb orb-2 orb-dark"></div>
      <div className="container">
        <Reveal>
          <div className="section-badge">What We Do</div>
          <h2 className="section-title">Digital Solutions For<br /><span className="grad">Modern Brands</span></h2>
        </Reveal>
        <div className="services-grid">
          {services.map((svc, i) => (
            <Reveal delay={i * 0.1} key={i}>
              <div className="svc-card glass-card tilt-card">
                <div className="svc-icon">{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <div className="svc-glow"></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
