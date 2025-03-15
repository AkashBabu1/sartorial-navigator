
import React, { useState, useEffect } from 'react';
import { ClothingItem } from './WardrobeGrid';
import { useToast } from '@/components/ui/use-toast';
import { matchOutfits } from '@/utils/colorUtils';
import { motion } from 'framer-motion';

interface OutfitMatcherProps {
  wardrobe: ClothingItem[];
  filter?: string;
}

interface Outfit {
  id: string;
  top?: ClothingItem;
  bottom?: ClothingItem;
  outerwear?: ClothingItem;
  shoes?: ClothingItem;
  accessories?: ClothingItem[];
  occasion?: string;
}

const OutfitMatcher: React.FC<OutfitMatcherProps> = ({ wardrobe, filter = 'all' }) => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [filteredOutfits, setFilteredOutfits] = useState<Outfit[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Apply filtering
    if (filter === 'all') {
      setFilteredOutfits(outfits);
    } else {
      const filtered = outfits.filter(outfit => outfit.occasion === filter);
      setFilteredOutfits(filtered);
    }
  }, [filter, outfits]);
  
  const generateOutfits = () => {
    setIsGenerating(true);
    
    // Simulate API call or processing time
    setTimeout(() => {
      try {
        const generatedOutfits = matchOutfits(wardrobe);
        
        // Assign random occasions to outfits (in a real app, this would use AI)
        const occasions = ['casual', 'formal'];
        const outfitsWithOccasions = generatedOutfits.map(outfit => ({
          ...outfit,
          occasion: occasions[Math.floor(Math.random() * occasions.length)]
        }));
        
        setOutfits(outfitsWithOccasions);
        
        toast({
          title: "Outfits Generated",
          description: `${generatedOutfits.length} outfit combinations created based on your wardrobe.`,
        });
      } catch (error) {
        toast({
          title: "Error generating outfits",
          description: "Please make sure your wardrobe has enough items.",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    }, 1500);
  };
  
  useEffect(() => {
    // Generate initial outfits if wardrobe has items
    if (wardrobe.length >= 2) {
      generateOutfits();
    }
  }, []);
  
  const saveOutfit = (outfit: Outfit) => {
    toast({
      title: "Outfit Saved",
      description: "This outfit has been saved to your collection.",
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Your Outfit Combinations</h2>
          <p className="text-muted-foreground">
            AI-generated outfits based on color theory and style matching
          </p>
        </div>
        
        <button
          onClick={generateOutfits}
          disabled={isGenerating || wardrobe.length < 2}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              Generating...
            </>
          ) : (
            "Generate Outfits"
          )}
        </button>
      </div>
      
      {wardrobe.length < 2 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12 text-center border rounded-lg"
        >
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><line x1="16" x2="22" y1="17" y2="17"/><line x1="19" x2="19" y1="14" y2="20"/></svg>
          </div>
          <h3 className="text-lg font-medium mb-1">Add More Items</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            You need at least 2 items in your wardrobe to generate outfit combinations.
          </p>
        </motion.div>
      )}
      
      {wardrobe.length >= 2 && filteredOutfits.length === 0 && isGenerating && (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[1, 2, 3].map((i) => (
            <motion.div key={i} variants={item} className="glass-card rounded-lg overflow-hidden">
              <div className="aspect-[4/3] bg-muted skeleton-loading"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 w-2/3 bg-muted skeleton-loading rounded"></div>
                <div className="h-4 w-full bg-muted skeleton-loading rounded"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {filteredOutfits.length > 0 && (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredOutfits.map((outfit) => (
            <motion.div 
              key={outfit.id} 
              variants={item}
              whileHover={{ y: -5 }}
              className="glass-card rounded-lg overflow-hidden hover-lift"
            >
              <div className="aspect-[4/3] bg-gray-50 relative">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                  {outfit.top && (
                    <div className="row-span-1 col-span-1 overflow-hidden rounded-md">
                      <img 
                        src={outfit.top.image} 
                        alt="Top" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {outfit.bottom && (
                    <div className="row-span-1 col-span-1 overflow-hidden rounded-md">
                      <img 
                        src={outfit.bottom.image} 
                        alt="Bottom" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {outfit.outerwear && (
                    <div className="row-span-1 col-span-1 overflow-hidden rounded-md">
                      <img 
                        src={outfit.outerwear.image} 
                        alt="Outerwear" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {outfit.shoes && (
                    <div className="row-span-1 col-span-1 overflow-hidden rounded-md">
                      <img 
                        src={outfit.shoes.image} 
                        alt="Shoes" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Outfit #{outfit.id.substring(0, 4)}</h3>
                  <button 
                    onClick={() => saveOutfit(outfit)}
                    className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                  </button>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  {outfit.top && (
                    <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      Top
                    </div>
                  )}
                  {outfit.bottom && (
                    <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Bottom
                    </div>
                  )}
                  {outfit.outerwear && (
                    <div className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                      Outerwear
                    </div>
                  )}
                  {outfit.shoes && (
                    <div className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      Shoes
                    </div>
                  )}
                  {outfit.occasion && (
                    <div className={`text-xs px-2 py-1 rounded-full ml-auto ${
                      outfit.occasion === 'casual' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {outfit.occasion.charAt(0).toUpperCase() + outfit.occasion.slice(1)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default OutfitMatcher;
