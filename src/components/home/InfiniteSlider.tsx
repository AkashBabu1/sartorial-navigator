
import React from 'react';
import { cn } from '@/lib/utils';

interface SliderItem {
  text: string;
  color: string;
}

const InfiniteSlider = () => {
  // Slider items with feature information
  const sliderItems: SliderItem[] = [
    { text: "Outfit Matching", color: "from-blue-500 to-indigo-700" },
    { text: "Wardrobe Management", color: "from-purple-500 to-pink-600" },
    { text: "Virtual Try-On", color: "from-orange-400 to-red-500" },
    { text: "Style Recommendations", color: "from-green-400 to-teal-500" },
    { text: "Color Coordination", color: "from-blue-400 to-cyan-400" },
    { text: "Seasonal Collections", color: "from-amber-400 to-yellow-500" },
  ];

  // Duplicate items for seamless infinite effect
  const items = [...sliderItems, ...sliderItems, ...sliderItems];

  return (
    <div className="relative w-full overflow-hidden bg-muted/30 dark:bg-slate-950/30 py-10 flex flex-col items-center">
      {/* Top decorative element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Infinite slider container */}
      <div className="w-full flex flex-col gap-4 overflow-hidden">
        {/* First row - left to right */}
        <div className="animate-slider-left flex whitespace-nowrap gap-4 py-4">
          {items.map((item, idx) => (
            <div 
              key={`slider-1-${idx}`} 
              className={cn(
                "inline-flex px-8 py-2 bg-gradient-to-r rounded-full",
                item.color
              )}
            >
              <span className="text-white font-playfair font-semibold text-lg md:text-2xl tracking-wider">
                {item.text}
              </span>
            </div>
          ))}
        </div>
        
        {/* Second row - right to left */}
        <div className="animate-slider-right flex whitespace-nowrap gap-4 py-4">
          {[...items].reverse().map((item, idx) => (
            <div 
              key={`slider-2-${idx}`} 
              className={cn(
                "inline-flex px-8 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full",
                "shadow-sm"
              )}
            >
              <span className={cn(
                "bg-gradient-to-r bg-clip-text text-transparent font-playfair font-bold text-lg md:text-2xl tracking-wider",
                item.color
              )}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteSlider;
