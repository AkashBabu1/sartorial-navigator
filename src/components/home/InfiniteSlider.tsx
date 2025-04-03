
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Shirt, 
  ShoppingBag, 
  UserRoundCog, 
  Palette, 
  BookOpenText, 
  Calendar 
} from 'lucide-react';

interface SliderItem {
  text: string;
  icon: React.ReactNode;
}

const InfiniteSlider = () => {
  // First row items with feature information and icons
  const sliderItems: SliderItem[] = [
    { text: "Outfit Matching", icon: <Shirt className="w-5 h-5 mr-2" /> },
    { text: "Wardrobe Management", icon: <ShoppingBag className="w-5 h-5 mr-2" /> },
    { text: "Virtual Try-On", icon: <UserRoundCog className="w-5 h-5 mr-2" /> },
    { text: "Style Recommendations", icon: <BookOpenText className="w-5 h-5 mr-2" /> },
    { text: "Color Coordination", icon: <Palette className="w-5 h-5 mr-2" /> },
    { text: "Seasonal Collections", icon: <Calendar className="w-5 h-5 mr-2" /> },
  ];

  // Duplicate items for seamless infinite effect
  const items = [...sliderItems, ...sliderItems, ...sliderItems];

  // Images/logos for the second row
  const logoItems = [
    { name: "OutfitMatch", logo: "/lovable-uploads/a903b6b2-c3c3-42b6-af8d-99b03a149613.png" },
    { name: "StyleSync", logo: "/lovable-uploads/a903b6b2-c3c3-42b6-af8d-99b03a149613.png" },
    { name: "FashionAI", logo: "/lovable-uploads/a903b6b2-c3c3-42b6-af8d-99b03a149613.png" },
    { name: "WardrobeGenius", logo: "/lovable-uploads/a903b6b2-c3c3-42b6-af8d-99b03a149613.png" },
    { name: "TrendSetterAI", logo: "/lovable-uploads/a903b6b2-c3c3-42b6-af8d-99b03a149613.png" },
  ];

  // Duplicate logo items for seamless infinite effect
  const logos = [...logoItems, ...logoItems, ...logoItems];

  return (
    <div className="relative w-full overflow-hidden bg-muted/30 dark:bg-slate-950/30 py-8">
      {/* Top decorative element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Infinite slider container */}
      <div className="w-full flex flex-col gap-6 overflow-hidden">
        {/* First row - left to right */}
        <div className="animate-slider-left flex whitespace-nowrap gap-6 py-2">
          {items.map((item, idx) => (
            <div 
              key={`slider-1-${idx}`} 
              className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm"
            >
              {item.icon}
              <span className="font-playfair font-semibold text-lg md:text-xl tracking-wide text-foreground">
                {item.text}
              </span>
            </div>
          ))}
        </div>
        
        {/* Second row - right to left with logos */}
        <div className="animate-slider-right flex whitespace-nowrap gap-10 py-2 items-center">
          {logos.map((item, idx) => (
            <div 
              key={`logo-${idx}`} 
              className="inline-flex items-center justify-center h-12"
            >
              {/* This would be a logo, but we're using the uploaded image as a placeholder */}
              <div className="opacity-60 hover:opacity-100 transition-opacity">
                <img 
                  src={item.logo}
                  alt={item.name}
                  className="h-6 md:h-8 object-contain dark:invert"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteSlider;
