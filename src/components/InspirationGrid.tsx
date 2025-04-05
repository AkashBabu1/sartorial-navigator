
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface ImageItem {
  id: string;
  src: string;
  alt: string;
  className?: string;
}

interface InspirationGridProps {
  images: ImageItem[];
  title?: string;
  className?: string;
}

const InspirationGrid: React.FC<InspirationGridProps> = ({
  images,
  title,
  className
}) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div className={cn("w-full", className)}>
      {title && (
        <h3 className="text-lg md:text-xl font-semibold mb-3">{title}</h3>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className={cn(
              "relative overflow-hidden rounded-md border transition-all hover:shadow-md",
              index === 0 ? "col-span-2 row-span-2" : "",
              image.className
            )}
          >
            <div className={cn(
              "absolute inset-0 bg-muted skeleton-loading",
              loadedImages[image.id] && "hidden"
            )} />
            
            <img
              src={image.src}
              alt={image.alt}
              className={cn(
                "w-full h-full object-cover aspect-square image-blur-up",
                loadedImages[image.id] && "loaded"
              )}
              onLoad={() => handleImageLoad(image.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspirationGrid;
