import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';

const CountUp = ({ target, suffix = '' }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const WhyUs = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const reasons = [
    {
      icon: '✨',
      title: 'Modern Design',
      desc: 'Contemporary aesthetics aligned with current web standards. We stay ahead of trends to deliver cutting-edge designs.',
      stat: { value: 100, suffix: '%', label: 'Modern Stack' }
    },
    {
      icon: '📱',
      title: 'Mobile Responsive',
      desc: 'Flawless experience across all mobile devices and tablets. Every breakpoint tested, every interaction smooth.',
      stat: { value: 100, suffix: '%', label: 'Responsive' }
    },
    {
      icon: '🎯',
      title: 'Clean UI/UX',
      desc: 'Intuitive navigation and user-focused digital interactions. We put your users first in every design decision.',
      stat: { value: 98, suffix: '%', label: 'User Satisfaction' }
    },
    {
      icon: '⚡',
      title: 'Fast Performance',
      desc: 'Optimized code and assets for rapid loading speeds. Sub-second load times that keep your audience engaged.',
      stat: { value: 99, suffix: '%', label: 'Lighthouse Score' }
    },
    {
      icon: '🚀',
      title: 'Startup-Friendly',
      desc: 'Agile processes designed to suit growing business needs. Scalable solutions that grow with your brand.',
      stat: { value: 50, suffix: '+', label: 'Projects Delivered' }
    },
    {
      icon: '🤝',
      title: 'Personalized Support',
      desc: 'Direct communication and dedicated attention to your project. No ticket queues, just real conversations.',
      stat: { value: 24, suffix: '/7', label: 'Available' }
    }
  ];

  return (
    <section id="why-us">
      <div className="floating-orb orb-2 orb-light"></div>
      <div className="container">
        <Reveal>
          <div className="why-header">
            <div className="section-badge">Why LUNEX TECH</div>
            <h2 className="section-title">
              Built For <span className="grad">Performance</span>
            </h2>
            <p className="section-sub">
              We don't just build websites — we engineer digital experiences that drive results.
            </p>
          </div>
        </Reveal>

        {/* Stats bar */}
        <Reveal delay={0.1}>
          <div className="why-stats-bar">
            {[
              { value: 50, suffix: '+', label: 'Projects' },
              { value: 100, suffix: '%', label: 'Responsive' },
              { value: 99, suffix: '%', label: 'Uptime' },
              { value: 24, suffix: 'hr', label: 'Turnaround' }
            ].map((stat, i) => (
              <div className="why-stat" key={i}>
                <span className="why-stat-value">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="why-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Interactive accordion + preview */}
        <div className="why-showcase">
          <Reveal delay={0.2}>
            <div className="why-accordion">
              {reasons.map((r, i) => (
                <motion.div
                  key={i}
                  className={`why-acc-item ${activeIdx === i ? 'active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                  layout
                >
                  <div className="why-acc-header">
                    <div className="why-acc-left">
                      <span className="why-acc-num">0{i + 1}</span>
                      <span className="why-acc-icon">{r.icon}</span>
                      <h4>{r.title}</h4>
                    </div>
                    <motion.span
                      className="why-acc-toggle"
                      animate={{ rotate: activeIdx === i ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      +
                    </motion.span>
                  </div>
                  <AnimatePresence>
                    {activeIdx === i && (
                      <motion.div
                        className="why-acc-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p>{r.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div
                    className="why-acc-progress"
                    animate={{ scaleX: activeIdx === i ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="why-preview">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  className="why-preview-card"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="why-preview-icon">{reasons[activeIdx].icon}</div>
                  <div className="why-preview-stat">
                    <span className="why-preview-stat-value">
                      <CountUp
                        target={reasons[activeIdx].stat.value}
                        suffix={reasons[activeIdx].stat.suffix}
                      />
                    </span>
                    <span className="why-preview-stat-label">
                      {reasons[activeIdx].stat.label}
                    </span>
                  </div>
                  <h3>{reasons[activeIdx].title}</h3>
                  <p>{reasons[activeIdx].desc}</p>
                  <div className="why-preview-glow"></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
