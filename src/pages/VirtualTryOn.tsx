import React, { useState, useEffect, useCallback } from 'react';
import AnimatedNavbar from '@/components/AnimatedNavbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronRight, Camera, Shirt, User, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const VirtualTryOn = () => {
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outfits, setOutfits] = useState<{ id: string, name: string, image: string }[]>([]);
  const [isDraggingModel, setIsDraggingModel] = useState(false);
  const [isDraggingOutfit, setIsDraggingOutfit] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Mock outfits data
    // In a real app, this would come from an API or local storage
    setOutfits([
      { id: '1', name: 'Casual Summer', image: '/placeholder.svg' },
      { id: '2', name: 'Business Meeting', image: '/placeholder.svg' },
      { id: '3', name: 'Weekend Brunch', image: '/placeholder.svg' },
      { id: '4', name: 'Formal Event', image: '/placeholder.svg' },
      { id: '5', name: 'Workout Attire', image: '/placeholder.svg' },
    ]);
  }, []);

  const handleModelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setModelImage(URL.createObjectURL(file));
      toast({
        title: "Image uploaded",
        description: "Your photo has been uploaded successfully.",
      });
    }
  };

  const handleOutfitSelect = (outfitId: string) => {
    const outfit = outfits.find(o => o.id === outfitId);
    if (outfit) {
      setSelectedOutfit(outfit.image);
      toast({
        title: "Outfit Selected",
        description: `You've selected "${outfit.name}"`,
      });
    }
  };

  const handleTryOn = () => {
    if (!selectedOutfit) {
      toast({
        title: "No outfit selected",
        description: "Please select an outfit first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Virtual Try-On Complete",
        description: "This is a preview of how the virtual try-on would work when fully implemented.",
      });
    }, 2000);
  };

  // Fix the acceptedFiles parameter to be a change event instead
  const handleModelDrop = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setModelImage(URL.createObjectURL(file));
      toast({
        title: "Image uploaded",
        description: "Your photo has been uploaded successfully.",
      });
    }
  }, [toast]);

  // Fix the acceptedFiles parameter to be a change event instead
  const handleOutfitDrop = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedOutfit(URL.createObjectURL(file));
      toast({
        title: "Outfit uploaded",
        description: "Your outfit has been uploaded successfully.",
      });
    }
  }, [toast]);

  const handleDragOver = (e: React.DragEvent, type: 'model' | 'outfit') => {
    e.preventDefault();
    if (type === 'model') {
      setIsDraggingModel(true);
    } else {
      setIsDraggingOutfit(true);
    }
  };

  const handleDragLeave = (type: 'model' | 'outfit') => {
    if (type === 'model') {
      setIsDraggingModel(false);
    } else {
      setIsDraggingOutfit(false);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'model' | 'outfit') => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    if (type === 'model') {
      setIsDraggingModel(false);
      if (files.length > 0) {
        const file = files[0];
        setModelImage(URL.createObjectURL(file));
        toast({
          title: "Image uploaded",
          description: "Your photo has been uploaded successfully.",
        });
      }
    } else {
      setIsDraggingOutfit(false);
      if (files.length > 0) {
        const file = files[0];
        setSelectedOutfit(URL.createObjectURL(file));
        toast({
          title: "Outfit uploaded",
          description: "Your outfit has been uploaded successfully.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <AnimatedNavbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
            Premium Feature
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Virtual Try-On
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how outfits would look on you using our advanced AI technology.
            Upload a photo of yourself to get started.
          </p>
        </div>
        
        {/* Modified layout: Two columns side by side for uploads and processing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* First column: Upload Your Photo */}
          <div className="glass-card p-6 rounded-lg animate-fade-up" style={{ animationDelay: "100ms" }}>
            <h2 className="text-xl font-semibold mb-4">Upload Your Photo</h2>
            <p className="text-muted-foreground mb-6">
              Upload a full-body photo with a neutral pose and background for best results.
              Your photo is processed securely and never shared with third parties.
            </p>
            
            <div 
              className={cn(
                "aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-4 flex items-center justify-center drop-area",
                isDraggingModel && "drop-area-active"
              )}
              onDragOver={(e) => handleDragOver(e, 'model')}
              onDragLeave={() => handleDragLeave('model')}
              onDrop={(e) => handleDrop(e, 'model')}
            >
              {modelImage ? (
                <img src={modelImage} alt="Your model" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Upload a full-body photo</p>
                  <p className="text-xs text-muted-foreground">Drag & drop your photo here</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center mb-4">
              <Button className="relative" variant="outline">
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleModelUpload}
                />
                Upload Photo
              </Button>
            </div>
          </div>
          
          {/* Second column: Upload Your Outfit */}
          <div className="glass-card p-6 rounded-lg animate-fade-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-xl font-semibold mb-4">Upload Your Outfit</h2>
            <p className="text-muted-foreground mb-6">
              Upload your own clothing items and our AI will help you visualize 
              how they would look when worn.
            </p>
            
            <div 
              className={cn(
                "aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-4 flex items-center justify-center drop-area",
                isDraggingOutfit && "drop-area-active"
              )}
              onDragOver={(e) => handleDragOver(e, 'outfit')}
              onDragLeave={() => handleDragLeave('outfit')}
              onDrop={(e) => handleDrop(e, 'outfit')}
            >
              {selectedOutfit ? (
                <img src={selectedOutfit} alt="Virtual try-on" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                    <Shirt className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Outfit visualization will appear here</p>
                  <p className="text-xs text-muted-foreground">Drag & drop an outfit image here</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center">
              <Button className="relative" variant="outline">
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleOutfitDrop}
                />
                Upload Outfit
              </Button>
            </div>
          </div>
        </div>
        
        {/* Try On Action Section */}
        <div className="mt-8 text-center animate-fade-up" style={{ animationDelay: "300ms" }}>
          <Button 
            onClick={handleTryOn} 
            disabled={!modelImage || isProcessing || !selectedOutfit}
            size="lg"
            className="mx-auto"
          >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Processing...
              </>
            ) : "Try On Outfit"}
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto">
            Premium feature: Virtual try-on is available to premium subscribers with enhanced accuracy and additional customization options.
          </p>
        </div>
        
        {/* Outfit Selection Carousel */}
        <div className="mt-12 animate-fade-up" style={{ animationDelay: "350ms" }}>
          <h2 className="text-xl font-semibold mb-6">Select an Outfit</h2>
          
          <Carousel className="w-full">
            <CarouselContent>
              {outfits.map((outfit) => (
                <CarouselItem key={outfit.id} className="md:basis-1/3 lg:basis-1/4">
                  <div 
                    className={`glass-card p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${selectedOutfit === outfit.image ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleOutfitSelect(outfit.id)}
                  >
                    <div className="aspect-square bg-muted rounded-md overflow-hidden mb-3">
                      <img src={outfit.image} alt={outfit.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="font-medium text-center">{outfit.name}</p>
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
        
        {/* How It Works Section */}
        <div className="mt-16 glass-card p-6 rounded-lg animate-fade-up" style={{ animationDelay: "400ms" }}>
          <h2 className="text-xl font-semibold mb-6 text-center">How Virtual Try-On Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 text-center p-4">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Camera className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-2">Upload Photo</h3>
              <p className="text-sm text-muted-foreground">
                Upload a full-body photo with a neutral background
              </p>
            </div>
            
            <div className="hidden md:block">
              <ChevronRight className="h-8 w-8 text-muted-foreground animate-pulse" />
            </div>
            
            <div className="flex-1 text-center p-4">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Shirt className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-2">Select Outfit</h3>
              <p className="text-sm text-muted-foreground">
                Choose from your saved outfits or create a new combination
              </p>
            </div>
            
            <div className="hidden md:block">
              <ChevronRight className="h-8 w-8 text-muted-foreground animate-pulse" />
            </div>
            
            <div className="flex-1 text-center p-4">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-2">View Result</h3>
              <p className="text-sm text-muted-foreground">
                Our AI visualizes how the outfit would look on your body
              </p>
            </div>
          </div>
          
          <div className="mt-8 border-t border-muted pt-6">
            <h3 className="font-medium mb-4 text-center">Tips for Best Results</h3>
            <ul className="space-y-2 max-w-2xl mx-auto">
              <li className="flex items-start">
                <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="ml-3 text-sm">Use a full-body photo with a neutral pose and even lighting</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="ml-3 text-sm">A solid background works best for accurate results</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="ml-3 text-sm">Wear form-fitting clothes for the most accurate outfit simulation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
