import React from 'react';
import { Reveal } from './Reveal';

export const Portfolio = () => {
  const projects = [
    { name: 'Pupil Network', cat: 'SaaS Webapp', desc: 'Modern scalable application', img: 'images/pupilnetwork.png', link: 'https://pupilnetwork.app' },
    { name: 'Star Designs', cat: 'Web Design', desc: 'Premium boutique storefront', img: 'images/star.png', link: 'https://stardesigns.vercel.app/' },
    { name: 'Kaushik Codes', cat: 'Portfolio', desc: 'Personal developer portfolio', img: 'images/kaushik.code.png', link: 'https://kaushik.codes' },
    { name: 'Kanishma', cat: 'Web Application', desc: 'Interactive digital experience', img: 'images/kanishma.png', link: 'https://kanishma.netlify.app/' }
  ];

  return (
    <section id="portfolio">
      <div className="floating-orb orb-1 orb-light"></div>
      <div className="container">
        <Reveal>
          <div className="section-badge">Our Work</div>
          <h2 className="section-title">Featured <span className="grad">Projects</span></h2>
          <p className="section-sub" style={{ marginBottom: '3rem' }}>A selection of our recent work and live applications.</p>
        </Reveal>
        
        <div className="portfolio-grid">
          {projects.map((p, i) => (
            <Reveal delay={i * 0.1} key={i}>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="port-card glass-card tilt-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="port-img">
                  <div className="port-overlay"><span>Visit Live Site ↗</span></div>
                  <img src={p.img} alt={`${p.name} UI`} className="port-image" />
                </div>
                <div className="port-info">
                  <span className="port-cat">{p.cat}</span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
