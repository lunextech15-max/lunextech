import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

export const Services = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const services = [
    {
      icon: '⬡',
      title: 'Business Websites',
      desc: 'Professional, conversion-optimized websites designed to represent your company online.',
      price: '₹999',
      tag: 'Most Popular'
    },
    {
      icon: '◈',
      title: 'Portfolio Websites',
      desc: 'Showcase your work with stunning, minimalist portfolio designs that leave an impression.',
      price: '₹1499'
    },
    {
      icon: '⬢',
      title: 'Landing Pages',
      desc: 'High-impact, single-page designs crafted specifically for marketing campaigns and product launches.',
      price: '₹799'
    },
    {
      icon: '◉',
      title: 'UI/UX Design',
      desc: 'Intuitive user interfaces and seamless user experiences focused on usability and aesthetics.',
      price: '₹699'
    },
    {
      icon: '✦',
      title: 'Website Redesign',
      desc: 'Modernize your existing website with a fresh, contemporary look and improved performance.',
      price: '₹1999'
    },
    {
      icon: '⬟',
      title: 'Custom Websites',
      desc: 'Clean, mobile-first code ensuring your website looks perfect on every device and screen size.',
      price: 'Starting at ₹4999'
    }
  ];

  return (
    <section id="services">
      <div className="floating-orb orb-2 orb-dark"></div>
      <div className="container">
        <Reveal>
          <div className="svc-header">
            <div>
              <div className="section-badge">Better Structure</div>
              <h2 className="section-title">
                For Your<br />
                <span className="grad">Page</span>
              </h2>
            </div>
            <p className="svc-header-sub">
              We craft digital experiences that convert visitors into customers. Every pixel purposeful, every interaction intentional.
            </p>
          </div>
        </Reveal>

        <div className="svc-bento">
          {/* Featured large card */}
          <Reveal delay={0.1}>
            <motion.div
              className="svc-card-featured"
              onMouseEnter={() => setHoveredIdx(0)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="svc-featured-bg"></div>
              <div className="svc-featured-content">
                <div className="svc-featured-top">
                  <span className="svc-tag">{services[0].tag}</span>
                  <span className="svc-num">01</span>
                </div>
                <div className="svc-featured-icon">{services[0].icon}</div>
                <h3>{services[0].title}</h3>
                <p>{services[0].desc}</p>
                
                <div className="svc-featured-bottom">
                  <div className="svc-featured-price">{services[0].price}</div>
                  <div className="svc-featured-arrow">
                    <motion.span
                      animate={{ x: hoveredIdx === 0 ? 8 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </div>
              <div className="svc-card-glow"></div>
            </motion.div>
          </Reveal>

          {/* Right column — stacked cards */}
          <div className="svc-stack">
            {services.slice(1, 3).map((svc, i) => (
              <Reveal delay={0.15 + i * 0.1} key={i + 1}>
                <motion.div
                  className="svc-card-compact"
                  onMouseEnter={() => setHoveredIdx(i + 1)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="svc-compact-left">
                    <span className="svc-num">0{i + 2}</span>
                    <div className="svc-compact-icon">{svc.icon}</div>
                  </div>
                  <div className="svc-compact-right">
                    <h4>{svc.title}</h4>
                    <p>{svc.desc}</p>
                    <div className="svc-price">{svc.price}</div>
                  </div>
                  <motion.div
                    className="svc-compact-line"
                    animate={{ scaleX: hoveredIdx === i + 1 ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom row — three equal cards */}
        <div className="svc-bottom-row">
          {services.slice(3).map((svc, i) => (
            <Reveal delay={0.25 + i * 0.1} key={i + 3}>
              <motion.div
                className="svc-card-bottom"
                onMouseEnter={() => setHoveredIdx(i + 3)}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="svc-bottom-num">0{i + 4}</div>
                <div className="svc-bottom-icon">{svc.icon}</div>
                <h4>{svc.title}</h4>
                <p>{svc.desc}</p>
                <div className="svc-price-bottom">{svc.price}</div>
                <motion.div
                  className="svc-bottom-indicator"
                  animate={{ width: hoveredIdx === i + 3 ? '100%' : '0%' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
