
import React, { useEffect, useRef, useState } from 'react';

interface Pixel {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  speed: number;
}

interface PixelTrailProps {
  className?: string;
}

const PixelTrail: React.FC<PixelTrailProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const colors = [
    'rgba(30, 64, 175, 1)',  // blue-700
    'rgba(79, 70, 229, 1)',  // indigo-600
    'rgba(124, 58, 237, 1)', // purple-600
    'rgba(236, 72, 153, 1)', // pink-500
    'rgba(14, 165, 233, 1)', // sky-500
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsActive(true);
      
      // Add new pixels on mouse move
      if (isActive) {
        const newPixels = [...pixels];
        
        for (let i = 0; i < 3; i++) {
          newPixels.push({
            x: e.clientX + (Math.random() * 20 - 10),
            y: e.clientY + (Math.random() * 20 - 10),
            size: Math.random() * 8 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            speed: Math.random() * 2 + 0.5,
          });
        }
        
        // Limit the number of pixels
        if (newPixels.length > 150) {
          newPixels.splice(0, newPixels.length - 150);
        }
        
        setPixels(newPixels);
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pixels, isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const updatedPixels = pixels.map(pixel => {
        // Draw pixel
        ctx.globalAlpha = pixel.alpha;
        ctx.fillStyle = pixel.color;
        ctx.fillRect(pixel.x - pixel.size / 2, pixel.y - pixel.size / 2, pixel.size, pixel.size);
        
        // Update pixel for next frame
        return {
          ...pixel,
          y: pixel.y - pixel.speed,  // Move up
          alpha: pixel.alpha - 0.01,  // Fade out
          size: Math.max(0, pixel.size - 0.1),  // Shrink
        };
      }).filter(pixel => pixel.alpha > 0);  // Remove completely faded pixels
      
      setPixels(updatedPixels);
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [pixels]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-10 ${className}`}
    />
  );
};

export default PixelTrail;
