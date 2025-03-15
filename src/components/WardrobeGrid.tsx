
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface ClothingItem {
  id: string;
  image: string;
  category: string;
}

interface WardrobeGridProps {
  items: ClothingItem[];
  onItemClick?: (item: ClothingItem) => void;
  onItemDelete?: (id: string) => void;
  className?: string;
  selectable?: boolean;
  selectedIds?: string[];
  onItemSelect?: (id: string) => void;
}

const WardrobeGrid: React.FC<WardrobeGridProps> = ({
  items,
  onItemClick,
  onItemDelete,
  className,
  selectable = false,
  selectedIds = [],
  onItemSelect
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const filteredItems = activeCategory 
    ? items.filter(item => item.category === activeCategory)
    : items;

  return (
    <div className={cn("w-full space-y-6", className)}>
      <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap",
            activeCategory === null
              ? "bg-primary text-white"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          All Items
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap",
              activeCategory === category.id
                ? "bg-primary text-white"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {filteredItems.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/></svg>
          </div>
          <h3 className="text-lg font-medium mb-1">No items found</h3>
          <p className="text-muted-foreground text-sm">
            {activeCategory 
              ? `You haven't added any ${activeCategory} to your wardrobe yet.`
              : "Your wardrobe is empty. Add some clothing items to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className={cn(
                "group relative aspect-square rounded-lg overflow-hidden border bg-card transition-all duration-300 hover:shadow-md",
                selectable && "cursor-pointer",
                selectedIds.includes(item.id) && "ring-2 ring-primary"
              )}
              onClick={() => {
                if (selectable && onItemSelect) {
                  onItemSelect(item.id);
                } else if (onItemClick) {
                  onItemClick(item);
                }
              }}
            >
              <img 
                src={item.image} 
                alt={`${item.category} item`} 
                className="w-full h-full object-cover"
              />
              
              {onItemDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemDelete(item.id);
                  }}
                  className="absolute top-2 right-2 h-6 w-6 rounded-full bg-background/80 text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Delete item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              )}
              
              {selectable && selectedIds.includes(item.id) && (
                <div className="absolute top-2 left-2 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                <div className="text-xs text-white font-medium capitalize">
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WardrobeGrid;
