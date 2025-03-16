
import React, { useState, useEffect, useRef } from 'react';
import AnimatedNavbar from '@/components/AnimatedNavbar';
import OutfitMatcher from '@/components/OutfitMatcher';
import { ClothingItem } from '@/components/WardrobeGrid';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Plus, Shirt, Briefcase, Wine, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const Outfits = () => {
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { toast } = useToast();
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
