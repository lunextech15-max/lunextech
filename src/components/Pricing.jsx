import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

export const Pricing = () => {
  const plans = [
    {
      id: '01',
      title: 'Business Website',
      price: '₹4,999',
      desc: 'Professional websites for businesses that need a strong online presence.',
      includes: [
        'Responsive Design',
        'Up to 5 Pages',
        'Contact Form',
        'Modern UI',
        'Fast Loading',
        'Mobile Optimization',
        'Basic SEO',
        'Domain Connection'
      ],
      buttonText: 'Get Started',
      popular: true
    },
    {
      id: '02',
      title: 'Portfolio Website',
      price: '₹5,999',
      desc: 'Showcase your work with a premium portfolio experience.',
      includes: [
        'Custom Layout',
        'Smooth Animations',
        'Project Showcase',
        'Social Links',
        'Mobile Responsive',
        'Contact Section'
      ],
      buttonText: 'View Package'
    },
    {
      id: '03',
      title: 'Landing Page',
      price: '₹3,999',
      desc: 'High-converting pages for products and campaigns.',
      includes: [
        'Hero Section',
        'CTA Buttons',
        'Smooth Scrolling',
        'Conversion Layout',
        'SEO Ready',
        'Fast Performance'
      ],
      buttonText: 'Launch Page'
    },
    {
      id: '04',
      title: 'E-Commerce Store',
      price: '₹8,999',
      desc: 'Launch your online store with full shopping functionality.',
      includes: [
        'Product Catalog',
        'Cart & Checkout',
        'Payment Gateway',
        'Admin Dashboard',
        'Initial Domain Setup',
        'Initial Hosting Setup (Plan Dependent)'
      ],
      optional: '+ Delivery Integration',
      buttonText: 'Build Store'
    },
    {
      id: '05',
      title: 'E-Commerce + Delivery',
      price: '₹10,999',
      desc: 'Complete online store with shipping support.',
      includes: [
        'Everything in Store',
        'Delivery Tracking',
        'Shipping Dashboard',
        'Order Management'
      ],
      recurring: 'Shipping Usage Charges',
      buttonText: 'Start Selling'
    },
    {
      id: '06',
      title: 'Custom Website',
      price: '₹12,999+',
      desc: 'Advanced websites tailored for business growth.',
      includes: [
        'Custom UI/UX',
        'Admin Panel',
        'API Integration',
        'Scalable Architecture',
        'Premium Features'
      ],
      buttonText: 'Request Quote'
    }
  ];

  const standardInclusions = [
    { title: 'Hosting Setup', desc: 'Initial server deployment and configuration setup (plan dependent).' },
    { title: 'Mobile Responsive', desc: 'Pixel-perfect on phones, tablets & desktops.' },
    { title: 'Basic SEO', desc: 'Proper meta tags and clean URL structure.' },
    { title: 'Performance Optimization', desc: 'Fast load speeds and optimized assets.' },
    { title: 'Security Setup', desc: 'SSL certificate configuration & security headers.' },
    { title: 'Deployment Support', desc: 'End-to-end assistance launching your site.' }
  ];

  const CheckIcon = () => (
    <svg className="plan-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  return (
    <section id="plans">
      <div className="floating-orb orb-1 orb-light"></div>
      <div className="floating-orb orb-2 orb-dark"></div>
      
      <div className="container">
        <Reveal>
          <div className="plans-header">
            <div className="section-badge">Service Plans</div>
            <h2 className="section-title">
              Transparent pricing.<br />
              <span className="grad">Modern solutions.</span>
            </h2>
            <p className="plans-header-sub">
              Built to grow with your business.
            </p>
            <div className="plans-badges">
              <span className="plans-badge-item">✓ Transparent renewal pricing</span>
              <span className="plans-badge-item">✓ No hidden recurring charges</span>
              <span className="plans-badge-item">✓ Client-owned domain</span>
            </div>
          </div>
        </Reveal>

        <div className="plans-grid">
          {plans.map((plan, i) => (
            <Reveal delay={i * 0.08} key={i}>
              <motion.div 
                className={`plan-card glass-card ${plan.popular ? 'popular' : ''}`}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {plan.popular && <span className="popular-badge">Best Value</span>}
                <div className="plan-top">
                  <span className="plan-num">{plan.id}</span>
                  <h3 className="plan-title">{plan.title}</h3>
                </div>
                <div className="plan-price-wrap">
                  <span className="price-start">Starting at</span>
                  <div className="plan-price">{plan.price}</div>
                </div>
                <p className="plan-desc">{plan.desc}</p>
                
                <div className="plan-includes">
                  <ul className="plan-features-list">
                    {plan.includes.map((inc, j) => (
                      <li key={j} className="plan-feature-item">
                        <CheckIcon />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.optional && (
                  <div className="plan-extra optional">
                    <span className="extra-label">Optional:</span>
                    <span className="extra-value">{plan.optional}</span>
                  </div>
                )}

                {plan.recurring && (
                  <div className="plan-extra recurring">
                    <span className="extra-label">Recurring:</span>
                    <span className="extra-value">{plan.recurring}</span>
                  </div>
                )}

                <div className="plan-action">
                  <a href="#contact" className={`btn-plan ${plan.popular ? 'btn-plan-primary' : 'btn-plan-outline'}`}>
                    {plan.buttonText}
                  </a>
                </div>
                <div className="plan-card-glow"></div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Inclusions section */}
        <div className="inclusions-divider"></div>
        
        <Reveal>
          <div className="inclusions-header">
            <h3 className="inc-title">What's Included In <span className="grad">Every Plan?</span></h3>
          </div>
        </Reveal>

        <div className="inclusions-grid">
          {standardInclusions.map((inc, i) => (
            <Reveal delay={i * 0.05} key={i}>
              <div className="inc-item">
                <div className="inc-icon-wrap">
                  <CheckIcon />
                </div>
                <div className="inc-content">
                  <h4>{inc.title}</h4>
                  <p>{inc.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="plans-disclaimer-wrap">
            <p className="plans-disclaimer">
              * <strong>Domain (Year 1):</strong> Included (for package-supported plans). 
              <strong> Domain Renewal (After Year 1):</strong> Separate charge at applicable renewal rates.
            </p>
            <p className="plans-disclaimer">
              * Domain renewal, server hosting, payment gateway, API usage, and shipping charges are billed directly by respective providers. 
              Client retains full ownership and control of all accounts. See our <a href="/transparency" className="disclaimer-link">Pricing &amp; Ownership Transparency Policy</a> for details.
            </p>
            <div className="plans-trust-badge">
              Transparent Pricing • Client Ownership • No Hidden Charges
            </div>
          </div>
        </Reveal>

        {/* Bottom CTA section */}
        <Reveal>
          <div className="plans-cta-box">
            <div className="plans-cta-bg"></div>
            <div className="plans-cta-content">
              <h2>Ready to Build?</h2>
              <a href="#contact" className="btn-primary plans-cta-btn">
                Start Your Project <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
