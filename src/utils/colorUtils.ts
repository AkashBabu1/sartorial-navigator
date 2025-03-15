
import { ClothingItem } from '@/components/WardrobeGrid';

// Simple color matching algorithm for the demo version
export const matchOutfits = (wardrobe: ClothingItem[]) => {
  if (wardrobe.length < 2) {
    throw new Error('Not enough items in wardrobe');
  }
  
  const tops = wardrobe.filter(item => item.category === 'tops');
  const bottoms = wardrobe.filter(item => item.category === 'bottoms');
  const outerwear = wardrobe.filter(item => item.category === 'outerwear');
  const shoes = wardrobe.filter(item => item.category === 'shoes');
  const accessories = wardrobe.filter(item => item.category === 'accessories');
  
  // Create outfits based on available items
  const outfits = [];
  const maxOutfits = Math.min(6, tops.length * bottoms.length); // Limit to 6 outfits
  
  for (let i = 0; i < maxOutfits; i++) {
    const topIndex = i % tops.length;
    const bottomIndex = Math.floor(i / tops.length) % bottoms.length;
    
    const outfit: any = {
      id: `outfit-${Date.now()}-${i}`,
      top: tops.length > 0 ? tops[topIndex] : undefined,
      bottom: bottoms.length > 0 ? bottoms[bottomIndex] : undefined,
    };
    
    // Add outerwear if available (randomly for demo)
    if (outerwear.length > 0 && Math.random() > 0.5) {
      outfit.outerwear = outerwear[Math.floor(Math.random() * outerwear.length)];
    }
    
    // Add shoes if available (randomly for demo)
    if (shoes.length > 0 && Math.random() > 0.3) {
      outfit.shoes = shoes[Math.floor(Math.random() * shoes.length)];
    }
    
    // Add accessories if available (randomly for demo)
    if (accessories.length > 0) {
      const accessoryCount = Math.floor(Math.random() * Math.min(3, accessories.length));
      if (accessoryCount > 0) {
        outfit.accessories = [];
        for (let j = 0; j < accessoryCount; j++) {
          outfit.accessories.push(accessories[Math.floor(Math.random() * accessories.length)]);
        }
      }
    }
    
    outfits.push(outfit);
  }
  
  return outfits;
};

// This function would be expanded in a real application to analyze colors
export const analyzeItemColor = (imageUrl: string) => {
  // In a real application, this would use canvas or a color extraction API
  // For now, we'll return a placeholder
  return {
    primaryColor: '#4A90E2',
    secondaryColors: ['#D9E8F7', '#274F82'],
    brightness: 0.7,
    saturation: 0.6
  };
};
