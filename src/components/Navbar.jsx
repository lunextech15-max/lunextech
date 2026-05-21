import React, { useState, useEffect } from 'react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">LUNEX<span>TECH</span></a>
        <ul className="nav-links">
          <li><a href="/#about">About</a></li>

          <li><a href="/#portfolio">Work</a></li>
          <li><a href="/#process">Process</a></li>
          <li><a href="/#plans">Plans</a></li>
        </ul>
        <a href="/#contact" className="nav-cta">Start Project</a>
        <button 
          className={`nav-hamburger ${menuOpen ? 'active' : ''}`} 
          id="hamburger" 
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={`nav-mobile ${menuOpen ? 'active' : ''}`} id="mobileMenu">
        <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>

        <a href="/#portfolio" onClick={() => setMenuOpen(false)}>Work</a>
        <a href="/#process" onClick={() => setMenuOpen(false)}>Process</a>
        <a href="/#plans" onClick={() => setMenuOpen(false)}>Plans</a>
        <a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>
    </nav>
  );
};
