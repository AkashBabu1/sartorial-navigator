
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import FAQ from '@/components/FAQ';
import AuthModal from '@/components/AuthModal';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Zap, Shirt, Camera, Heart, Lightbulb } from 'lucide-react';
import { TimelineDemo } from '@/components/TimelineDemo';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const keyFeaturesRef = useRef<HTMLDivElement>(null);
  const isKeyFeaturesInView = useInView(keyFeaturesRef, { once: true });
  
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
        src: "/lovable-uploads/e30bc1cf-9d72-472a-b45e-6219214de5ca.png",
        alt: "Man in blue suit"
      },
      {
        src: "/lovable-uploads/941a253a-56d7-43d5-ad08-16b2a6bff1bf.png",
        alt: "Green t-shirts on hangers"
      },
      {
        src: "/lovable-uploads/91c19fa7-bd0e-4534-a988-1a7e15cdbdaa.png",
        alt: "Green cricket t-shirt"
      }
    ],
    pants: [
      {
        src: "/lovable-uploads/91c19fa7-bd0e-4534-a988-1a7e15cdbdaa.png",
        alt: "Green cricket t-shirt" 
      },
      {
        src: "/lovable-uploads/e30bc1cf-9d72-472a-b45e-6219214de5ca.png",
        alt: "Man in blue suit"
      },
      {
        src: "/lovable-uploads/941a253a-56d7-43d5-ad08-16b2a6bff1bf.png",
        alt: "Green t-shirts on hangers"
      }
    ]
  };
  
  const features = [
    {
      title: 'AI-Powered Matching',
      description: 'Our intelligent algorithm combines color theory and style rules to create perfect outfit combinations.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></svg>
      ),
      delay: 100
    },
    {
      title: 'Simple Organization',
      description: 'Easily categorize and organize your clothing items for quick retrieval and matching.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
      ),
      delay: 200
    },
    {
      title: 'Personal Recommendations',
      description: 'Get outfit suggestions tailored to your style preferences and wardrobe items.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
      ),
      delay: 300
    }
  ];

  // Key features for the carousel
  const keyFeatures = [
    {
      title: "AI-Powered Matching",
      description: "Our intelligent algorithm combines color theory and style rules to create perfect outfit combinations.",
      icon: <Zap className="h-10 w-10 text-primary" />,
      link: "/outfits"
    },
    {
      title: "Smart Wardrobe Management",
      description: "Organize and categorize all your clothing items in one place with intelligent tagging.",
      icon: <Shirt className="h-10 w-10 text-primary" />,
      link: "/wardrobe"
    },
    {
      title: "Virtual Try-On",
      description: "Visualize how outfits would look on you with our advanced AI technology.",
      icon: <Camera className="h-10 w-10 text-primary" />,
      link: "/virtual-try-on"
    },
    {
      title: "Style Recommendations",
      description: "Get personalized style advice based on your preferences and trending fashion.",
      icon: <Heart className="h-10 w-10 text-primary" />,
      link: "/recommendations"
    }
  ];

  const arrowVariants = {
    initial: { y: 0 },
    animate: { y: [0, 5, 0], transition: { repeat: Infinity, duration: 1.5 } }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero />
      
      {/* Key Features Carousel */}
      <section ref={keyFeaturesRef} className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 animate-fade-up">
            <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
              Core Features
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Discover What OutfitAI Can Do For You
            </h2>
          </div>
          
          <div className="mb-12 animate-fade-up" style={{ animationDelay: "50ms" }} ref={carouselRef}>
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {keyFeatures.map((feature, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <motion.div 
                      className="glass-card p-6 rounded-lg h-full flex flex-col items-center text-center"
                      whileHover={{ 
                        scale: 1.03, 
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)" 
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.div 
                        className="mb-4 bg-primary/10 p-3 rounded-full"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [0.8, 1.2, 1] }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                      <Link 
                        to={feature.link} 
                        className="mt-4 text-primary hover:underline text-sm font-medium inline-flex items-center"
                      >
                        Try it now
                        <motion.div
                          className="ml-1"
                          variants={arrowVariants}
                          initial="initial"
                          animate="animate"
                        >
                          →
                        </motion.div>
                      </Link>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static mx-2 transform-none translate-y-0 left-0" data-carousel-prev />
                <CarouselNext className="relative static mx-2 transform-none translate-y-0 right-0" data-carousel-next />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      
      {/* Timeline Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
              Key Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Say Goodbye to Outfit Indecision
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              OutfitAI combines cutting-edge technology with style principles to transform the way you create outfits from your existing wardrobe.
            </p>
          </div>
          
          <TimelineDemo />
        </div>
      </section>
      
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-up">
              <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium">
                How It Works
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                A Better Way to Plan Your Outfits
              </h2>
              <p className="text-muted-foreground">
                Upload your clothing items, categorize them, and let our AI system suggest perfect combinations based on color theory, patterns, and style principles.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Upload your clothing items with our easy-to-use interface",
                  "Organize items by category and occasion",
                  "Generate outfit ideas with one click",
                  "Save your favorite combinations for later"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="h-6 w-6 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <button 
                  onClick={handleGetStarted}
                  className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Get Started
                </button>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="glass-card rounded-2xl overflow-hidden shadow-xl border border-white/20">
                <div className="p-6 aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="grid grid-cols-3 grid-rows-3 gap-3 h-full">
                    {/* Shirts */}
                    <div className="col-span-2 row-span-2 grid grid-cols-2 gap-3">
                      {clothingItems.shirts.slice(0, 2).map((shirt, index) => (
                        <div key={`shirt-${index}`} className="bg-white rounded-xl shadow-sm overflow-hidden">
                          <img 
                            src={shirt.src} 
                            alt={shirt.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      <div className="col-span-2 bg-white rounded-xl shadow-sm p-2">
                        <div className="flex justify-between items-center h-full">
                          <span className="text-xs font-medium text-gray-500">Shirts & Tops</span>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            12 items
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pants */}
                    <div className="row-span-3 grid grid-rows-3 gap-3">
                      {clothingItems.pants.map((pant, index) => (
                        <div key={`pant-${index}`} className="bg-white rounded-xl shadow-sm overflow-hidden">
                          <img 
                            src={pant.src} 
                            alt={pant.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    
                    {/* Additional shirt */}
                    <div className="col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
                      <img 
                        src={clothingItems.shirts[2].src} 
                        alt={clothingItems.shirts[2].alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6">
                <div className="glass-card rounded-xl p-4 shadow-lg border border-white/20 animate-float w-48">
                  <div className="text-xs font-medium mb-1">Style Match</div>
                  <div className="w-full h-2 rounded-full bg-gray-200 mb-1">
                    <div className="h-2 rounded-full bg-primary w-4/5"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">Great combination!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQ />
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
            Ready to Try?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transform Your Wardrobe Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who have simplified their outfit selection process and rediscovered items in their wardrobe.
          </p>
          
          <button
            onClick={handleGetStarted}
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Get Started Now
          </button>
        </div>
      </section>
      
      <footer className="bg-muted py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-2">
                OutfitAI
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered outfit matching and wardrobe management
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link to="/wardrobe" className="text-sm text-muted-foreground hover:text-foreground">
                Wardrobe
              </Link>
              <Link to="/outfits" className="text-sm text-muted-foreground hover:text-foreground">
                Outfits
              </Link>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} OutfitAI. All rights reserved.
          </div>
        </div>
      </footer>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
