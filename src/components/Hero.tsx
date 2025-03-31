
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { Button } from './ui/button';

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

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32 px-4 md:px-0">
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
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            <span className="text-shadow">Match Perfect Outfits with </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">OutfitAI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0">
            Eliminate decision fatigue and create stunning outfit combinations from your wardrobe using AI-powered matching technology.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start pt-4">
            <button
              onClick={handleGetStarted}
              className="relative inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute inset-0 rounded-md animate-border-flow bg-gradient-to-r from-blue-400 via-primary to-blue-600 bg-[length:400%_100%]"></span>
              </span>
              <span className="absolute inset-[2px] bg-primary rounded-md transition-colors group-hover:bg-primary/90"></span>
            </button>
            
            <Link to="/outfits" className="relative inline-flex h-12 items-center justify-center rounded-md bg-background px-6 font-medium border border-input text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring overflow-hidden group">
              <span className="relative z-10">Explore Outfits</span>
              <span className="absolute inset-0 overflow-hidden rounded-md opacity-0 group-hover:opacity-100">
                <span className="absolute inset-0 rounded-md animate-border-flow-reverse bg-gradient-to-r from-blue-400 via-primary to-blue-600 bg-[length:400%_100%]"></span>
              </span>
              <span className="absolute inset-[2px] bg-background rounded-md transition-colors group-hover:bg-accent"></span>
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 pt-16 md:pt-0 animate-fade-in">
          <div className="relative mx-auto max-w-sm md:max-w-md">
            <div className="glass-card rounded-2xl shadow-xl overflow-hidden border border-white/20 hover-lift">
              <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="text-sm font-medium">Your Perfect Outfits</div>
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0-4.8L9 21"/><path d="M21 7.8V3m0 4.8h-4.8"/><path d="M9 3 3 3l0 4.8"/></svg>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 p-4 flex-grow">
                    <div className="bg-white rounded-lg shadow-sm aspect-[3/4] overflow-hidden">
                      <img src={clothingItems.shirts[0]} alt="Shirt" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white rounded-lg shadow-sm aspect-[3/4] overflow-hidden">
                      <img src={clothingItems.pants[0]} alt="Pants" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white rounded-lg shadow-sm aspect-[3/4] overflow-hidden">
                      <img src={clothingItems.shirts[1]} alt="Shirt alternative" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white rounded-lg shadow-sm aspect-[3/4] overflow-hidden">
                      <img src={clothingItems.pants[1]} alt="Pants alternative" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-100">
                    <div className="h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                      Create New Outfit
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 parallax-element" data-speed="0.1">
              <div className="glass-card rounded-xl p-4 shadow-lg border border-white/20 animate-float w-40">
                <div className="text-xs font-medium mb-1">Color Match</div>
                <div className="flex space-x-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                  <div className="w-5 h-5 rounded-full bg-orange-400"></div>
                  <div className="w-5 h-5 rounded-full bg-gray-700"></div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -left-6 parallax-element" data-speed="0.15">
              <div className="glass-card rounded-xl p-4 shadow-lg border border-white/20 animate-float w-40" style={{animationDelay: '1s'}}>
                <div className="text-xs font-medium mb-1">AI Suggestions</div>
                <div className="w-full h-2 rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-primary w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
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
