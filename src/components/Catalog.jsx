import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

export const Catalog = () => {
  const catalogItems = [
    {
      id: '01',
      title: 'Business Websites',
      price: 'Starting at ₹999',
      desc: 'Professional business websites designed to establish your online presence with clean layouts, responsive design, and conversion-focused sections.',
      includes: ['Responsive Design', 'Contact Form', 'Modern UI', 'Fast Loading', 'Mobile Optimization'],
      icon: '⬡'
    },
    {
      id: '02',
      title: 'Portfolio Websites',
      price: 'Starting at ₹1499',
      desc: 'Minimal and creative portfolio websites built to showcase your work, projects, skills, or personal brand with a premium look.',
      includes: ['Custom Portfolio Layout', 'Smooth Animations', 'Project Showcase', 'Social Links', 'Responsive Design'],
      icon: '◈'
    },
    {
      id: '03',
      title: 'Landing Pages',
      price: 'Starting at ₹799',
      desc: 'High-converting single-page websites crafted for product launches, promotions, events, and marketing campaigns.',
      includes: ['Hero Section', 'Call-To-Action Buttons', 'Smooth Scrolling', 'Modern Design', 'Mobile Friendly'],
      icon: '⬢'
    },
    {
      id: '04',
      title: 'UI/UX Design',
      price: 'Starting at ₹699',
      desc: 'Clean and user-focused interface designs created with usability, aesthetics, and modern trends in mind.',
      includes: ['Wireframe Design', 'Modern Interface', 'User-Friendly Layout', 'Mobile UI Concepts', 'Interactive Sections'],
      icon: '◉'
    },
    {
      id: '05',
      title: 'Website Redesign',
      price: 'Starting at ₹1999',
      desc: 'Transform outdated websites into modern, faster, and visually appealing experiences that better represent your brand.',
      includes: ['Fresh Modern Design', 'Improved Layout', 'Better Responsiveness', 'Enhanced Performance', 'UI Improvements'],
      icon: '✦'
    },
    {
      id: '06',
      title: 'Custom Websites',
      price: 'Starting at ₹4999',
      desc: 'Tailor-made websites developed specifically for your business requirements with advanced functionality and scalable architecture.',
      includes: ['Custom UI/UX', 'Advanced Features', 'Admin Dashboard', 'API Integrations', 'Scalable Development'],
      icon: '⬟'
    }
  ];

  const whyChooseUs = [
    'Modern & Minimal Design',
    'Responsive Across All Devices',
    'Fast Delivery',
    'Affordable Pricing',
    'Smooth User Experience',
    'Startup-Friendly Solutions'
  ];

  return (
    <section id="catalog">
      <div className="floating-orb orb-1 orb-light"></div>
      <div className="floating-orb orb-2 orb-dark"></div>
      
      <div className="container">
        <Reveal>
          <div className="catalog-header">
            <div className="section-badge">Our Offerings</div>
            <h1 className="section-title">
              Service <span className="grad">Catalog</span>
            </h1>
            <p className="catalog-header-sub">
              Detailed pricing and feature inclusions for all our digital services.
            </p>
          </div>
        </Reveal>

        <div className="catalog-grid">
          {catalogItems.map((item, i) => (
            <Reveal delay={i * 0.1} key={i}>
              <motion.div 
                className="catalog-card glass-card"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="cat-top">
                  <span className="cat-num">{item.id}</span>
                  <div className="cat-icon">{item.icon}</div>
                </div>
                <h3>{item.title}</h3>
                <div className="cat-price">{item.price}</div>
                <p className="cat-desc">{item.desc}</p>
                
                <div className="cat-includes">
                  <h4>Includes:</h4>
                  <ul>
                    {item.includes.map((inc, j) => (
                      <li key={j}>
                        <span className="cat-check">✓</span> {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="catalog-card-glow"></div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="catalog-why">
            <h2 className="why-title">Why Choose <span className="grad">LUNEXTECH</span></h2>
            <div className="why-pills">
              {whyChooseUs.map((reason, i) => (
                <div className="why-pill" key={i}>
                  <span className="pill-dot"></span> {reason}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={0.3}>
          <div className="catalog-cta-section">
            <h2>Ready to Start?</h2>
            <p>Contact us today and let's build something amazing together.</p>
            <a href="#contact" className="btn-primary">Start a Project</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
