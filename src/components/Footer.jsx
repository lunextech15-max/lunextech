import React from 'react';

export const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-orb"></div>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">LUNEX<span>TECH</span></div>
            <p>Modern web design for growing brands.</p>
            <div className="msme-badge">
              <div className="msme-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 11 2 2 4-4"/>
                </svg>
              </div>
              <div className="msme-content">
                <span className="msme-title">MSME Registered</span>
                <span className="msme-reg">UDYAM-TN-03-0324784</span>
                <span className="msme-sub">Govt of India Micro Enterprise</span>
              </div>
            </div>
          </div>
          <div className="footer-links">
            <h5>Explore</h5>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Work</a>
            <a href="#process">Process</a>
          </div>
          <div className="footer-links">
            <h5>Connect</h5>
            <a href="https://wa.me/6381231706" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="mailto:lunextech15@gmail.com">Email</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LUNEX TECH. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
