
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Shirt, Settings, Heart } from "lucide-react";

// Helper component for the vertically scrolling images
const VerticalInfiniteImageScroll = ({ images }: { images: string[] }) => {
  // Duplicate the images to create a seamless loop
  const duplicatedImages = [...images, ...images, ...images];
  
  return (
    <div className="relative h-full overflow-hidden rounded-lg">
      <div className="animate-slider-up h-[300%] flex flex-col">
        {duplicatedImages.map((src, index) => (
          <div key={index} className="h-full shrink-0">
            <img 
              src={src} 
              alt={`Slider image ${index}`} 
              className="object-cover w-full h-full rounded-lg shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export function TimelineDemo() {
  const data = [{
    title: "AI-Powered Matching",
    content: <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Our intelligent algorithm combines color theory and style rules to create perfect outfit combinations.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 md:h-44 lg:h-60 w-full overflow-hidden rounded-lg">
              <VerticalInfiniteImageScroll 
                images={[
                  "/lovable-uploads/645d3be4-8b13-45cb-86c0-ff363cc2d4c3.png",
                  "/lovable-uploads/561a2e7c-5563-4412-b4ae-f35719b3ed12.png",
                  "/lovable-uploads/e22d9e5d-94d5-4904-b0b5-f2f41a4fee28.png"
                ]} 
              />
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full overflow-hidden rounded-lg">
              <VerticalInfiniteImageScroll 
                images={[
                  "/lovable-uploads/2f676777-5408-49bb-b187-b0e5bcabdc7d.png",
                  "/lovable-uploads/728218e4-767e-4878-bac1-0d96feb68a31.png",
                  "/lovable-uploads/0c34cc36-6117-40c6-b645-ab0b1fb11d70.png"
                ]} 
              />
            </div>
          </div>
        </div>
  }, {
    title: "Simple Organization",
    content: <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Easily categorize and organize your clothing items for quick retrieval and matching.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 md:h-44 lg:h-60 w-full overflow-hidden rounded-lg">
              <VerticalInfiniteImageScroll 
                images={[
                  "/lovable-uploads/561a2e7c-5563-4412-b4ae-f35719b3ed12.png",
                  "/lovable-uploads/e22d9e5d-94d5-4904-b0b5-f2f41a4fee28.png",
                  "/lovable-uploads/47f7ede4-2756-4dd3-916d-f35bb0f13c27.png"
                ]} 
              />
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full overflow-hidden rounded-lg">
              <VerticalInfiniteImageScroll 
                images={[
                  "/lovable-uploads/0c34cc36-6117-40c6-b645-ab0b1fb11d70.png",
                  "/lovable-uploads/e30bc1cf-9d72-472a-b45e-6219214de5ca.png",
                  "/lovable-uploads/645d3be4-8b13-45cb-86c0-ff363cc2d4c3.png"
                ]} 
              />
            </div>
          </div>
        </div>
  }, {
    title: "Virtual Try-On",
    content: <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            See how outfits would look on you using our advanced AI technology before buying or wearing them.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 md:h-44 lg:h-60 w-full overflow-hidden rounded-lg">
              <VerticalInfiniteImageScroll 
                images={[
                  "/lovable-uploads/728218e4-767e-4878-bac1-0d96feb68a31.png",
                  "/lovable-uploads/2f676777-5408-49bb-b187-b0e5bcabdc7d.png",
                  "/lovable-uploads/e22d9e5d-94d5-4904-b0b5-f2f41a4fee28.png"
                ]} 
              />
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full overflow-hidden rounded-lg">
              <VerticalInfiniteImageScroll 
                images={[
                  "/lovable-uploads/47f7ede4-2756-4dd3-916d-f35bb0f13c27.png",
                  "/lovable-uploads/645d3be4-8b13-45cb-86c0-ff363cc2d4c3.png",
                  "/lovable-uploads/0c34cc36-6117-40c6-b645-ab0b1fb11d70.png"
                ]} 
              />
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full overflow-hidden rounded-lg">
              <VerticalInfiniteImageScroll 
                images={[
                  "/lovable-uploads/2f676777-5408-49bb-b187-b0e5bcabdc7d.png",
                  "/lovable-uploads/e30bc1cf-9d72-472a-b45e-6219214de5ca.png",
                  "/lovable-uploads/561a2e7c-5563-4412-b4ae-f35719b3ed12.png"
                ]} 
              />
            </div>
          </div>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 md:h-44 lg:h-60 w-full overflow-hidden rounded-lg">
              <VerticalInfiniteImageScroll 
                images={[
                  "/lovable-uploads/e22d9e5d-94d5-4904-b0b5-f2f41a4fee28.png",
                  "/lovable-uploads/0c34cc36-6117-40c6-b645-ab0b1fb11d70.png",
                  "/lovable-uploads/47f7ede4-2756-4dd3-916d-f35bb0f13c27.png"
                ]} 
              />
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full overflow-hidden rounded-lg">
              <VerticalInfiniteImageScroll 
                images={[
                  "/lovable-uploads/e30bc1cf-9d72-472a-b45e-6219214de5ca.png",
                  "/lovable-uploads/728218e4-767e-4878-bac1-0d96feb68a31.png",
                  "/lovable-uploads/561a2e7c-5563-4412-b4ae-f35719b3ed12.png"
                ]} 
              />
            </div>
          </div>
        </div>
  }];
  return <div className="w-full">
      <Timeline data={data} />
    </div>;
}
