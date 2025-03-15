
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const VirtualTryOn = () => {
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

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

  const handleTryOn = () => {
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

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
            Beta Feature
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Virtual Try-On
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how outfits would look on you using our advanced AI technology.
            Upload a photo of yourself to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="glass-card p-6 rounded-lg animate-fade-up" style={{ animationDelay: "100ms" }}>
            <h2 className="text-xl font-semibold mb-4">Upload Your Photo</h2>
            <p className="text-muted-foreground mb-6">
              Upload a full-body photo with a neutral pose and background for best results.
              Your photo is processed securely and never shared with third parties.
            </p>
            
            <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-4 flex items-center justify-center">
              {modelImage ? (
                <img src={modelImage} alt="Your model" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7v12h14V7l-7-7z"/></svg>
                  </div>
                  <p className="text-sm text-muted-foreground">Upload a full-body photo</p>
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
          
          <div className="glass-card p-6 rounded-lg animate-fade-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-xl font-semibold mb-4">Try On Outfits</h2>
            <p className="text-muted-foreground mb-6">
              Select an outfit from your generated combinations or choose individual items to visualize how they would look on you.
            </p>
            
            <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-4 flex items-center justify-center">
              {selectedOutfit ? (
                <img src={selectedOutfit} alt="Virtual try-on" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="20.5" r="1"/><path d="M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"/><path d="M14 13.5V18"/><path d="M7 13.5V18"/><path d="M10 15.5v-2"/><path d="M7 10.5V5"/><path d="M14 10.5V5"/><path d="M10 8.5v2"/></svg>
                  </div>
                  <p className="text-sm text-muted-foreground">Outfit visualization will appear here</p>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <Button 
                onClick={handleTryOn} 
                disabled={!modelImage || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Processing...
                  </>
                ) : "Try On Outfit"}
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Premium feature: Virtual try-on is available to premium subscribers with enhanced accuracy and additional customization options.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 glass-card p-6 rounded-lg animate-fade-up" style={{ animationDelay: "300ms" }}>
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Upload Your Photo</h3>
              <p className="text-sm text-muted-foreground">
                Provide a full-body photo with a neutral pose for best results
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Select an Outfit</h3>
              <p className="text-sm text-muted-foreground">
                Choose from your generated outfits or individual items
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">See the Result</h3>
              <p className="text-sm text-muted-foreground">
                AI visualizes how the outfit would look on your body
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
