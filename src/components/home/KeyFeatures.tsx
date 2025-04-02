
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Zap, Shirt, Camera, Heart } from 'lucide-react';

interface KeyFeaturesProps {
  carouselRef: React.RefObject<HTMLDivElement>;
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ carouselRef }) => {
  const keyFeaturesRef = useRef<HTMLDivElement>(null);
  const isKeyFeaturesInView = useInView(keyFeaturesRef, { once: true });
  
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
  );
};

export default KeyFeatures;
