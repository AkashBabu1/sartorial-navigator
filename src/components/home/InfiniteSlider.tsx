import React from 'react';
import { cn } from '@/lib/utils';
import { Shirt, ShoppingBag, UserRoundCog, Palette, BookOpenText, Calendar } from 'lucide-react';

interface SliderItem {
  text: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const InfiniteSlider = () => {
  // Feature information and icons with colors
  const sliderItems: SliderItem[] = [{
    text: "Outfit Matching",
    icon: <Shirt className="w-5 h-5 mr-2" />,
    bgColor: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400"
  }, {
    text: "Wardrobe Management",
    icon: <ShoppingBag className="w-5 h-5 mr-2" />,
    bgColor: "bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-950/40 dark:to-pink-900/30",
    iconColor: "text-pink-600 dark:text-pink-400"
  }, {
    text: "Virtual Try-On",
    icon: <UserRoundCog className="w-5 h-5 mr-2" />,
    bgColor: "bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400"
  }, {
    text: "Style Recommendations",
    icon: <BookOpenText className="w-5 h-5 mr-2" />,
    bgColor: "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/30",
    iconColor: "text-green-600 dark:text-green-400"
  }, {
    text: "Color Coordination",
    icon: <Palette className="w-5 h-5 mr-2" />,
    bgColor: "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400"
  }, {
    text: "Seasonal Collections",
    icon: <Calendar className="w-5 h-5 mr-2" />,
    bgColor: "bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-950/40 dark:to-teal-900/30",
    iconColor: "text-teal-600 dark:text-teal-400"
  }];

  // Duplicate items for seamless infinite effect
  const items = [...sliderItems, ...sliderItems, ...sliderItems];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8">
      {/* Top decorative element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Infinite slider container - only keeping the first row */}
      <div className="w-full flex overflow-hidden">
        {/* First row - left to right */}
        <div className="animate-slider-left-fast flex whitespace-nowrap gap-6 py-2">
          {items.map((item, idx) => (
            <div 
              key={`slider-1-${idx}`} 
              className={cn(
                "inline-flex items-center px-6 py-3 border border-slate-200/50 dark:border-slate-800/50 rounded-full shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105", 
                item.bgColor
              )}
            >
              <div className={cn("flex items-center", item.iconColor)}>
                {item.icon}
              </div>
              <span className="font-playfair font-semibold text-lg md:text-xl tracking-wide text-foreground">
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
