import React, { useEffect, useRef } from 'react';

interface AsciiWiggleProps {
  src: string;
  width?: number;
  height?: number;
  resolution?: number; // Distance between characters
  repelRadius?: number; // How large the mouse interaction area is
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
  // We store the current color in a ref so the animation loop can always access the freshest color
  const themeColorRef = useRef<string>('#64ffda'); 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // --- THEME INTEGRATION ---
    const updateThemeColor = () => {
      // Read from document.documentElement because that is where your App component applies 'theme-sand'
      const computedStyle = getComputedStyle(document.documentElement);
      // Grab the --accent variable (not --color-navy, since accent is your mint/orange text color)
      const newColor = computedStyle.getPropertyValue('--accent').trim();
      if (newColor) {
        themeColorRef.current = newColor;
      }
    };

    // 1. Get the color immediately on load
    updateThemeColor();

    // 2. Set up an observer to watch the <html> tag for any class changes
    const observer = new MutationObserver(() => {
      updateThemeColor();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    // -------------------------

    let particles: any[] = [];
    let animationFrameId: number;
    
    // Track mouse position
    let mouse = { x: -1000, y: -1000, isActive: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
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
            x: x,
            y: y,
            char: ASCII_CHARS[charIndex],
          });
        }
      }

      ctx.font = '10px "Nunito", monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // 3. Apply the dynamic color from the ref right before drawing!
        ctx.fillStyle = themeColorRef.current;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

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

          p.x += (p.baseX - p.x) * 0.1; 
          p.y += (p.baseY - p.y) * 0.1;

          ctx.fillText(p.char, p.x, p.y);
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    };

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      // Disconnect the observer when the component unmounts
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