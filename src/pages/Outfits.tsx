
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import OutfitMatcher from '@/components/OutfitMatcher';
import { ClothingItem } from '@/components/WardrobeGrid';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Plus, Shirt, Briefcase, Wine, Camera } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from 'react-router-dom';

const Outfits = () => {
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { toast } = useToast();
  
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

  // Key features for the carousel
  const keyFeatures = [
    {
      title: "AI-Powered Matching",
      description: "Our intelligent algorithm combines color theory and style rules to create perfect outfit combinations.",
      icon: <Shirt className="h-10 w-10 text-primary" />
    },
    {
      title: "Smart Categorization",
      description: "Automatically categorize your clothing items based on style, color, and occasion.",
      icon: <Briefcase className="h-10 w-10 text-primary" />
    },
    {
      title: "Virtual Try-On",
      description: "Visualize how outfits would look on you with our advanced AI technology.",
      icon: <Camera className="h-10 w-10 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
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
        <div className="mb-12 animate-fade-up" style={{ animationDelay: "50ms" }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Key Features</h2>
          </div>
          
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {keyFeatures.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="glass-card p-6 rounded-lg h-full flex flex-col items-center text-center">
                    <div className="mb-4 bg-primary/10 p-3 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                    {feature.title === "Virtual Try-On" && (
                      <Link to="/virtual-try-on" className="mt-4 text-primary hover:underline text-sm font-medium">
                        Try it now →
                      </Link>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static mx-2 transform-none translate-y-0 left-0" />
              <CarouselNext className="relative static mx-2 transform-none translate-y-0 right-0" />
            </div>
          </Carousel>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="mb-4 sm:mb-0 glass-card p-1 rounded-full">
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
          </div>
          
          <Button 
            onClick={handleUpload}
            className="hover:scale-105 transition-transform duration-300"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Item
          </Button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-20 animate-pulse">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <span className="ml-3">Loading your wardrobe...</span>
          </div>
        ) : (
          <OutfitMatcher wardrobe={wardrobe} filter={activeFilter} />
        )}
        
        {/* How It Works Section */}
        <div className="mt-16 glass-card p-6 rounded-lg animate-fade-up" style={{ animationDelay: "200ms" }}>
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Upload Your Items</h3>
              <p className="text-sm text-muted-foreground">
                Add your clothing items to your digital wardrobe
              </p>
              <div className="mt-3 flex justify-center">
                <svg className="animate-bounce h-5 w-5 text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </div>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Generate Outfits</h3>
              <p className="text-sm text-muted-foreground">
                Our AI creates stylish combinations based on your wardrobe
              </p>
              <div className="mt-3 flex justify-center">
                <svg className="animate-bounce h-5 w-5 text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </div>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Try Them On</h3>
              <p className="text-sm text-muted-foreground">
                Visualize outfits on yourself with our virtual try-on technology
              </p>
              <div className="mt-3 flex justify-center">
                <Link to="/virtual-try-on" className="animate-pulse text-primary hover:underline font-medium">
                  Try it now →
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Virtual Try-On Promotion */}
        <div className="mt-16 glass-card p-6 rounded-lg animate-fade-up" style={{ animationDelay: "300ms" }}>
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
          <Link 
            to="/virtual-try-on"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:scale-105 transition-transform duration-300 mt-4"
          >
            Try It Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Outfits;
