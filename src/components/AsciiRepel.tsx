import React, { useEffect, useRef } from 'react';

interface AsciiWiggleProps {
  src: string;
  width?: number;
  height?: number;
  resolution?: number; 
  repelRadius?: number; 
}

const ASCII_CHARS = ' .:-=+*#%@';

export const AsciiRepel: React.FC<AsciiWiggleProps> = ({
  src,
  width = 500,
  height = 500,
  resolution = 8,
  repelRadius = 60,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeColorRef = useRef<string>('#64ffda'); 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // --- THEME INTEGRATION ---
    const updateThemeColor = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const newColor = computedStyle.getPropertyValue('--accent').trim();
      if (newColor) themeColorRef.current = newColor;
    };

    updateThemeColor();
    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    // -------------------------

    let particles: any[] = [];
    let animationFrameId: number;
    let frameCount = 0; // Used to stagger the entrance animation
    
    let mouse = { x: -1000, y: -1000, isActive: false };

    // --- ENHANCED MOUSE EVENTS ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseEnter = () => {
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter); // Fixes the reload bug!
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;

    img.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;
      
      offCtx.drawImage(img, 0, 0, width, height);
      const imgData = offCtx.getImageData(0, 0, width, height).data;

      particles = [];
      for (let y = 0; y < height; y += resolution) {
        for (let x = 0; x < width; x += resolution) {
          const idx = (y * width + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          if (a < 128) continue; 

          const brightness = (r + g + b) / 3;
          const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
          
          particles.push({
            baseX: x,
            baseY: y,
            // SCATTER START: Randomize starting position outside the canvas bounds
            x: width / 2 + (Math.random() - 0.5) * (width * 3),
            y: height / 2 + (Math.random() - 0.5) * (height * 3),
            char: ASCII_CHARS[charIndex],
            // ENTRANCE ANIMATION VARS:
            opacity: 0,
            delay: Math.random() * 80 // Stagger their entry over ~80 frames
          });
        }
      }

      ctx.font = '10px "Nunito", monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = themeColorRef.current;
        frameCount++;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Wait until this specific particle's delay is over before animating it
          if (frameCount > p.delay) {
            
            // Fade in
            if (p.opacity < 1) {
              p.opacity += 0.03;
              if (p.opacity > 1) p.opacity = 1;
            }

            // Repel logic (Only starts happening once the particle is active)
            if (mouse.isActive) {
              const dx = mouse.x - p.x;
              const dy = mouse.y - p.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < repelRadius) {
                const force = (repelRadius - distance) / repelRadius;
                const angle = Math.atan2(dy, dx);
                
                const pushX = Math.cos(angle) * force * 15; 
                const pushY = Math.sin(angle) * force * 15;

                p.x -= pushX;
                p.y -= pushY;
              }
            }

            // Spring physics: pulling them toward their correct destination
            p.x += (p.baseX - p.x) * 0.08; 
            p.y += (p.baseY - p.y) * 0.08;
          }

          // Optimization: Don't bother drawing it if it's still completely invisible
          if (p.opacity > 0) {
            ctx.globalAlpha = p.opacity;
            ctx.fillText(p.char, p.x, p.y);
          }
        }

        // Reset global alpha so we don't accidentally fade the whole canvas context
        ctx.globalAlpha = 1;
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    };

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect(); 
    };
  }, [src, width, height, resolution, repelRadius]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height} 
      style={{ 
        cursor: 'crosshair', 
        borderRadius: '8px',
        backgroundColor: 'var(--bg-base)' 
      }} 
    />
  );
};