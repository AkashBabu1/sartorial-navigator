
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import AuthModal from '@/components/AuthModal';
import KeyFeatures from '@/components/home/KeyFeatures';
import TimelineSection from '@/components/home/TimelineSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import CallToAction from '@/components/home/CallToAction';
import Footer from '@/components/home/Footer';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
  };
  
  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const carousel = carouselRef.current;
        // Check if there is a "next" control and simulate a click
        const nextButton = carousel.querySelector('[data-carousel-next]') as HTMLElement;
        if (nextButton) {
          nextButton.click();
        }
      }
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, []);
  
  // Reference clothing items for the "How It Works" section
  const clothingItems = {
    shirts: [
      {
        src: "/lovable-uploads/47f7ede4-2756-4dd3-916d-f35bb0f13c27.png",
        alt: "Messi hoodie"
      },
      {
        src: "/lovable-uploads/2f676777-5408-49bb-b187-b0e5bcabdc7d.png",
        alt: "Cricket t-shirt"
      },
      {
        src: "/lovable-uploads/728218e4-767e-4878-bac1-0d96feb68a31.png",
        alt: "Hitman t-shirt"
      }
    ],
    pants: [
      {
        src: "/lovable-uploads/645d3be4-8b13-45cb-86c0-ff363cc2d4c3.png", 
        alt: "Blue jeans"
      },
      {
        src: "/lovable-uploads/728218e4-767e-4878-bac1-0d96feb68a31.png",
        alt: "Hitman t-shirt back"
      },
      {
        src: "/lovable-uploads/47f7ede4-2756-4dd3-916d-f35bb0f13c27.png",
        alt: "Messi hoodie"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero />
      
      {/* Key Features Carousel */}
      <KeyFeatures carouselRef={carouselRef} />
      
      {/* Timeline Features Section */}
      <TimelineSection />
      
      {/* How It Works Section */}
      <HowItWorksSection 
        clothingItems={clothingItems} 
        onGetStarted={handleGetStarted} 
      />
      
      {/* FAQ Section */}
      <FAQ />
      
      {/* Call to Action */}
      <CallToAction onGetStarted={handleGetStarted} />
      
      {/* Footer */}
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
