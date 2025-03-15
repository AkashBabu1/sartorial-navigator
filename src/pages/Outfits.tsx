
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import OutfitMatcher from '@/components/OutfitMatcher';
import { ClothingItem } from '@/components/WardrobeGrid';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Plus, Tshirt, Briefcase, Wine } from 'lucide-react';

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
    { id: 'all', label: 'All Outfits', icon: <Tshirt className="h-4 w-4 mr-2" /> },
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
        
        {/* Virtual Try-On Promotion */}
        <div className="mt-16 glass-card p-6 rounded-lg animate-fade-up flex flex-col md:flex-row items-center justify-between" style={{ animationDelay: "300ms" }}>
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
          <Button 
            onClick={() => window.location.href = '/virtual-try-on'}
            size="lg"
            className="hover:scale-105 transition-transform duration-300"
          >
            Try It Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Outfits;
