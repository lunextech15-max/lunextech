document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     CUSTOM CURSOR
  ========================================= */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorGlow = document.getElementById('cursor-glow');
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;

    if (cursorDot && cursorGlow) {
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });

  /* =========================================
     ADVANCED MAGNETIC BUTTONS
  ========================================= */
  const magneticEls = document.querySelectorAll('.magnetic');
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const intensity = this.classList.contains('btn-primary') || this.classList.contains('btn-outline') ? 0.3 : 0.15;
      this.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.transform = `translate(0px, 0px) scale(1)`;
    });
  });

  /* =========================================
     NAVBAR SCROLL
  ========================================= */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  /* =========================================
     MOBILE MENU
  ========================================= */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }

  /* =========================================
     ADVANCED REVEAL ANIMATIONS (STAGGERED)
  ========================================= */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -100px 0px', threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  const grids = document.querySelectorAll('.services-grid, .portfolio-grid, .why-grid');
  grids.forEach(grid => {
    const cards = grid.querySelectorAll('.glass-card, .dark-card, .port-card');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.1}s`;
    });
  });

  /* =========================================
     ADVANCED NETWORK CANVAS (HERO)
  ========================================= */
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
      heroCanvas.width = window.innerWidth;
      heroCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > heroCanvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > heroCanvas.height) this.vy = -this.vy;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200, 169, 107, 0.4)';
        ctx.fill();
      }
    }

    const particleCount = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(200, 169, 107, ${0.15 - (dist/150)*0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }

  /* =========================================
     CONTACT FORM
  ========================================= */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('formSuccess').style.display = 'block';
      contactForm.reset();
      setTimeout(() => { document.getElementById('formSuccess').style.display = 'none'; }, 5000);
    });
  }
});
