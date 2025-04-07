
import React from 'react';
import { motion } from 'framer-motion';
import ColorMatchCard from './ColorMatchCard';
import AISuggestionsCard from './AISuggestionsCard';

type ClothingItems = {
  shirts: string[];
  pants: string[];
};

type OutfitPreviewCardProps = {
  clothingItems: ClothingItems;
  titleWords: string[];
  brandText: string;
};

const OutfitPreviewCard: React.FC<OutfitPreviewCardProps> = ({ 
  clothingItems, 
  titleWords, 
  brandText 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: (titleWords.length + brandText.length) * 0.05 + 0.4, 
        duration: 0.8, 
        type: "spring" 
      }}
      className="relative mx-auto max-w-sm md:max-w-md"
    >
      <div className="glass-card rounded-2xl shadow-xl overflow-hidden border border-white/20 hover-lift">
        <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="absolute inset-0 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="text-sm font-medium">Your Perfect Outfits</div>
              <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0-4.8L9 21"/><path d="M21 7.8V3m0 4.8h-4.8"/><path d="M9 3 3 3l0 4.8"/></svg>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 p-4 flex-grow">
              <div className="bg-white rounded-lg shadow-sm aspect-[3/4] overflow-hidden">
                <img src={clothingItems.shirts[0]} alt="Shirt" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white rounded-lg shadow-sm aspect-[3/4] overflow-hidden">
                <img src={clothingItems.pants[0]} alt="Pants" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white rounded-lg shadow-sm aspect-[3/4] overflow-hidden">
                <img src={clothingItems.shirts[1]} alt="Shirt alternative" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white rounded-lg shadow-sm aspect-[3/4] overflow-hidden">
                <img src={clothingItems.pants[1]} alt="Pants alternative" className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <div className="h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                Create New Outfit
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ColorMatchCard />
      <AISuggestionsCard />
    </motion.div>
  );
};

export default OutfitPreviewCard;
