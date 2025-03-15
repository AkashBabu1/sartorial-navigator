
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import OutfitMatcher from '@/components/OutfitMatcher';
import { ClothingItem } from '@/components/WardrobeGrid';

const Outfits = () => {
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  
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
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <span className="ml-3">Loading your wardrobe...</span>
          </div>
        ) : (
          <OutfitMatcher wardrobe={wardrobe} />
        )}
      </div>
    </div>
  );
};

export default Outfits;
