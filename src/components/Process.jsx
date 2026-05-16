import React from 'react';
import { Reveal } from './Reveal';

export const Process = () => {
  const steps = [
    { num: '01', title: 'Discussion', desc: 'Understanding your brand, goals, and project requirements.' },
    { num: '02', title: 'Planning', desc: 'Creating a structured blueprint and layout for the project.' },
    { num: '03', title: 'Design', desc: 'Crafting modern, clean, and engaging visual interfaces.' },
    { num: '04', title: 'Development', desc: 'Building a responsive, fast-loading, and functional website.' },
    { num: '05', title: 'Launch', desc: 'Final testing, optimization, and deploying your website live.' }
  ];

  return (
    <section id="process">
      <div className="floating-orb orb-3 orb-dark" style={{ opacity: 0.2 }}></div>
      <div className="container">
        <Reveal>
          <div className="section-badge">How We Work</div>
          <h2 className="section-title">Our Streamlined <span className="grad">Process</span></h2>
        </Reveal>
        <div className="process-line">
          {steps.map((step, i) => (
            <Reveal delay={i * 0.15} key={i} className="proc-item">
              <div className="proc-num">{step.num}</div>
              <div className="proc-dot"></div>
              <div className="proc-content dark-card">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
