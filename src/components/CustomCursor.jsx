import React, { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let glowX = 0, glowY = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animateCursor = () => {
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;

      if (dotRef.current && glowRef.current) {
        dotRef.current.style.left = `${dotX}px`;
        dotRef.current.style.top = `${dotY}px`;
        glowRef.current.style.left = `${glowX}px`;
        glowRef.current.style.top = `${glowY}px`;
      }
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    const handleMouseEnter = () => document.body.classList.add('hovering');
    const handleMouseLeave = () => document.body.classList.remove('hovering');

    // Simple observer to attach listeners to newly rendered interactive elements
    const observer = new MutationObserver(() => {
      const interactables = document.querySelectorAll('a, button, .magnetic, input, textarea');
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-glow" ref={glowRef}></div>
      <div id="cursor-dot" ref={dotRef}></div>
    </>
  );
};
