
import React, { useState, useEffect, useRef } from 'react';
import AnimatedNavbar from '@/components/AnimatedNavbar';
import OutfitMatcher from '@/components/OutfitMatcher';
import { ClothingItem } from '@/components/WardrobeGrid';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Plus, Shirt, Briefcase, Wine, Camera, Zap, Heart, Lightbulb } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const Outfits = () => {
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { toast } = useToast();
  const carouselRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const isHowItWorksInView = useInView(howItWorksRef, { once: true });
  
  useEffect(() => {
    // Load wardrobe from local storage
    const savedItems = localStorage.getItem('wardrobe');
    
    if (savedItems) {
      try {
        setWardrobe(JSON.parse(savedItems));
      } catch (error) {
        console.error('Failed to parse wardrobe data', error);
      }
    }
    
    setLoading(false);
  }, []);

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

  const filters = [
    { id: 'all', label: 'All Outfits', icon: <Shirt className="h-4 w-4 mr-2" /> },
    { id: 'casual', label: 'Casual', icon: <Wine className="h-4 w-4 mr-2" /> },
    { id: 'formal', label: 'Formal', icon: <Briefcase className="h-4 w-4 mr-2" /> }
  ];

  const handleUpload = () => {
    // In a real implementation, this would open a file picker
    // For now, we'll just show a toast
    toast({
      title: "Upload Feature",
      description: "This would allow you to upload a new clothing item.",
    });
  };

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
      link: "/outfits"
    }
  ];

  // Staggered animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const arrowVariants = {
    initial: { y: 0 },
    animate: { y: [0, 5, 0], transition: { repeat: Infinity, duration: 1.5 } }
  };

  return (
    <div className="min-h-screen pb-20">
      <AnimatedNavbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
            My Outfits
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Generated Outfit Combinations
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create perfect outfit matches based on color theory and style principles.
          </p>
        </div>
        
        {/* Key Features Carousel */}
        <div className="mb-12 animate-fade-up" style={{ animationDelay: "50ms" }} ref={carouselRef}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Key Features</h2>
          </div>
          
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
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="mb-4 sm:mb-0 glass-card p-1 rounded-full" variants={item}>
            <div className="flex space-x-1">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-full ${activeFilter === filter.id ? '' : 'text-muted-foreground'} transition-all duration-300`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.icon}
                  {filter.label}
                </Button>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={item}>
            <Button 
              onClick={handleUpload}
              className="hover:scale-105 transition-transform duration-300"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Item
            </Button>
          </motion.div>
        </motion.div>
        
        {loading ? (
          <div className="flex items-center justify-center py-20 animate-pulse">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <span className="ml-3">Loading your wardrobe...</span>
          </div>
        ) : (
          <OutfitMatcher wardrobe={wardrobe} filter={activeFilter} />
        )}
        
        {/* How It Works Section */}
        <div ref={howItWorksRef} className="mt-16 glass-card p-6 rounded-lg">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">How It Works</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            animate={isHowItWorksInView ? "show" : "hidden"}
            variants={container}
          >
            <motion.div className="text-center" variants={item}>
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Upload Your Items</h3>
              <p className="text-sm text-muted-foreground">
                Add your clothing items to your digital wardrobe
              </p>
              <motion.div 
                className="mt-3 flex justify-center"
                variants={arrowVariants}
                initial="initial"
                animate="animate"
              >
                <svg className="h-5 w-5 text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </motion.div>
            </motion.div>
            
            <motion.div className="text-center" variants={item}>
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Generate Outfits</h3>
              <p className="text-sm text-muted-foreground">
                Our AI creates stylish combinations based on your wardrobe
              </p>
              <motion.div 
                className="mt-3 flex justify-center"
                variants={arrowVariants}
                initial="initial"
                animate="animate"
              >
                <svg className="h-5 w-5 text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </motion.div>
            </motion.div>
            
            <motion.div className="text-center" variants={item}>
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Try Them On</h3>
              <p className="text-sm text-muted-foreground">
                Visualize outfits on yourself with our virtual try-on technology
              </p>
              <motion.div className="mt-3 flex justify-center">
                <Link to="/virtual-try-on" className="text-primary hover:underline font-medium inline-flex items-center">
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
            </motion.div>
          </motion.div>
        </div>
        
        {/* Virtual Try-On Promotion */}
        <motion.div 
          className="mt-16 glass-card p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="md:flex">
            <div className="md:w-2/3 mb-6 md:mb-0 pr-0 md:pr-8">
              <div className="inline-block bg-muted/70 px-3 py-1 rounded-full text-xs font-medium mb-2">
                Premium Feature
              </div>
              <h2 className="text-xl md:text-2xl font-semibold mb-2">Virtual Try-On</h2>
              <p className="text-muted-foreground">
                See how these outfit combinations would look on you with our virtual try-on technology. 
                Upload a photo and visualize before deciding what to wear.
              </p>
            </div>
            <div className="md:w-1/3 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link 
                  to="/virtual-try-on"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Try It Now
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Outfits;
