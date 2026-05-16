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
