
import React, { useState, useEffect } from "react";
import { Timeline } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Helper component for the vertically scrolling images with one-by-one animation
const VerticalSequentialScroll = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Set up an interval to cycle through images
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      {images.map((src, index) => (
        <motion.div
          key={index}
          className={cn(
            "absolute inset-0 w-full h-full",
            "transition-all duration-500 ease-in-out"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: currentIndex === index ? 1 : 0,
            y: currentIndex === index ? 0 : 20,
          }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={src} 
            alt={`Image ${index}`} 
            className="object-cover w-full h-full rounded-lg shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" 
          />
        </motion.div>
      ))}
    </div>
  );
};

// Grid layout component for image display
const ImageGrid = ({ imageGroups, columns = 3 }: { imageGroups: string[][], columns?: number }) => {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {imageGroups.map((images, index) => (
        <div key={index} className="h-20 md:h-44 lg:h-60 w-full overflow-hidden rounded-lg">
          <VerticalSequentialScroll images={images} />
        </div>
      ))}
    </div>
  );
};

export function TimelineDemo() {
  // Updated clothing categories with more diverse items
  const images = {
    // T-shirts category
    tshirts: [
      "/lovable-uploads/2f676777-5408-49bb-b187-b0e5bcabdc7d.png", // Cricket t-shirt
      "/lovable-uploads/728218e4-767e-4878-bac1-0d96feb68a31.png", // Hitman t-shirt
      "/lovable-uploads/0c34cc36-6117-40c6-b645-ab0b1fb11d70.png",  // Another t-shirt
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" // Additional t-shirt
    ],
    
    // Hoodies category
    hoodies: [
      "/lovable-uploads/47f7ede4-2756-4dd3-916d-f35bb0f13c27.png", // Messi hoodie
      "/lovable-uploads/e22d9e5d-94d5-4904-b0b5-f2f41a4fee28.png", // Another hoodie
      "/lovable-uploads/561a2e7c-5563-4412-b4ae-f35719b3ed12.png"  // Third hoodie
    ],
    
    // Pants/bottoms category
    pants: [
      "/lovable-uploads/645d3be4-8b13-45cb-86c0-ff363cc2d4c3.png", // Blue jeans
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", // Additional pants
      "/lovable-uploads/e30bc1cf-9d72-472a-b45e-6219214de5ca.png"  // Another bottom
    ],
    
    // Complete outfits category
    outfits: [
      "/lovable-uploads/e30bc1cf-9d72-472a-b45e-6219214de5ca.png",
      "/lovable-uploads/47f7ede4-2756-4dd3-916d-f35bb0f13c27.png",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      "/lovable-uploads/728218e4-767e-4878-bac1-0d96feb68a31.png"
    ],
    
    // Accessories category
    accessories: [
      "/lovable-uploads/0c34cc36-6117-40c6-b645-ab0b1fb11d70.png",
      "/lovable-uploads/e22d9e5d-94d5-4904-b0b5-f2f41a4fee28.png",
      "/lovable-uploads/561a2e7c-5563-4412-b4ae-f35719b3ed12.png"
    ],
    
    // Style inspiration category
    inspiration: [
      "/lovable-uploads/e9824bce-dcfb-4d69-b831-abf57c2fca21.png",
      "/lovable-uploads/e30bc1cf-9d72-472a-b45e-6219214de5ca.png",
      "/lovable-uploads/561a2e7c-5563-4412-b4ae-f35719b3ed12.png"
    ]
  };

  const data = [{
    title: "AI-Powered Matching",
    content: <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Our intelligent algorithm combines color theory and style rules to create perfect outfit combinations.
          </p>
          <ImageGrid 
            imageGroups={[
              images.tshirts,
              images.pants,
              images.outfits
            ]} 
          />
        </div>
  }, {
    title: "Simple Organization",
    content: <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Easily categorize and organize your clothing items for quick retrieval and matching.
          </p>
          <ImageGrid 
            imageGroups={[
              images.hoodies,
              images.pants,
              images.accessories
            ]}
          />
        </div>
  }, {
    title: "Style Inspiration",
    content: <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Get inspired by curated collections and trending styles to enhance your fashion sense.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-2 row-span-2 h-44 md:h-64 lg:h-80 overflow-hidden rounded-lg">
              <VerticalSequentialScroll images={images.inspiration} />
            </div>
            <div className="h-20 md:h-30 lg:h-38 overflow-hidden rounded-lg">
              <VerticalSequentialScroll images={images.tshirts} />
            </div>
            <div className="h-20 md:h-30 lg:h-38 overflow-hidden rounded-lg">
              <VerticalSequentialScroll images={images.hoodies} />
            </div>
          </div>
        </div>
  }, {
    title: "Virtual Try-On",
    content: <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            See how outfits would look on you using our advanced AI technology before buying or wearing them.
          </p>
          <ImageGrid 
            imageGroups={[
              images.tshirts,
              images.hoodies, 
              images.pants,
              images.accessories
            ]}
            columns={4}
          />
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a href="/virtual-try-on" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg transition-colors hover:bg-primary/90">
              Try it now
            </a>
            <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 sm:mt-0 sm:self-center">
              Premium feature available for subscribers
            </div>
          </div>
        </div>
  }, {
    title: "Personal Recommendations",
    content: <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Get outfit suggestions tailored to your style preferences and wardrobe items.
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Style matching based on your preferences
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Color coordination for perfect combinations
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Seasonal recommendations
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Occasion-specific outfit suggestions
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Fashion trend integration
            </div>
          </div>
          <ImageGrid 
            imageGroups={[
              images.outfits,
              images.tshirts,
              images.hoodies,
              images.pants
            ]}
            columns={4}
          />
        </div>
  }];
  
  return <div className="w-full">
      <Timeline data={data} />
    </div>;
}
