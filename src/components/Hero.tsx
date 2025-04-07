
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AuthModal from './AuthModal';
import PixelTrail from './effects/PixelTrail';
import Meteors from './effects/Meteors';
import HeroTitle from './hero/HeroTitle';
import HeroActions from './hero/HeroActions';
import OutfitPreviewCard from './hero/OutfitPreviewCard';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
  };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position as a percentage
      const xPos = (clientX / innerWidth) - 0.5;
      const yPos = (clientY / innerHeight) - 0.5;
      
      // Get all elements with the parallax-element class
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      
      // Apply slight transforms based on mouse position
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.2');
        const xOffset = xPos * speed * 40;
        const yOffset = yPos * speed * 40;
        
        element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Clothing item images for the AI suggestions
  const clothingItems = {
    shirts: [
      '/lovable-uploads/9520bb0b-42fc-4143-88e8-83a9e0c182ca.png',
      '/public/placeholder.svg',
    ],
    pants: [
      '/public/placeholder.svg',
      '/public/placeholder.svg',
    ],
  };

  // Split the title text for animated rendering
  const titleText = "Match Perfect Outfits with";
  const brandText = "OutfitAI";
  const titleWords = titleText.split(" ");

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32 px-4 md:px-0">
      {/* Meteors Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <Meteors number={20} />
        <Meteors number={15} className="opacity-70" />
      </div>
      
      {/* Pixel Trail Animation */}
      <PixelTrail />
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 parallax-element" data-speed="-0.2"></div>
        <div className="absolute bottom-40 right-[10%] w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 parallax-element" data-speed="0.3"></div>
        <div className="absolute bottom-20 left-[35%] w-60 h-60 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 parallax-element" data-speed="0.25"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center md:space-x-12 z-10 pt-10">
        <div className="w-full md:w-1/2 space-y-6 md:space-y-8 text-center md:text-left animate-fade-up">
          <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium">
            Effortless Style with AI
          </div>
          
          <HeroTitle titleText={titleText} brandText={brandText} />
          
          <HeroActions 
            onGetStarted={handleGetStarted} 
            animationDelay={(titleWords.length + brandText.length) * 0.05 + 0.2}
          />
        </div>
        
        <div className="w-full md:w-1/2 pt-16 md:pt-0 animate-fade-in">
          <OutfitPreviewCard 
            clothingItems={clothingItems} 
            titleWords={titleWords}
            brandText={brandText}
          />
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Hero;
