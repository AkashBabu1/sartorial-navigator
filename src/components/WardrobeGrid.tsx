
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tag, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface ClothingItem {
  id: string;
  image: string;
  category: string;
  name?: string;
  description?: string;
  color?: string;
  tags?: string[];
}

interface WardrobeGridProps {
  items: ClothingItem[];
  onItemClick?: (item: ClothingItem) => void;
  onItemDelete?: (id: string) => void;
  onTagsUpdate?: (id: string, tags: string[]) => void;
  className?: string;
  selectable?: boolean;
  selectedIds?: string[];
  onItemSelect?: (id: string) => void;
  activeCategory?: string | null;
  activeTags?: string[];
}

const WardrobeGrid: React.FC<WardrobeGridProps> = ({
  items,
  onItemClick,
  onItemDelete,
  onTagsUpdate,
  className,
  selectable = false,
  selectedIds = [],
  onItemSelect,
  activeCategory,
  activeTags = []
}) => {
  const [showTagsModal, setShowTagsModal] = useState<string | null>(null);
  const [modalTags, setModalTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  const categories = [
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessories', label: 'Accessories' }
  ];

  let filteredItems = items;

  // Skip filtering if both are null/empty
  if (activeCategory !== null || activeTags.length > 0) {
    filteredItems = items.filter(item => {
      // Category filter
      const matchesCategory = activeCategory === null || item.category === activeCategory;
      
      // Tags filter - only apply if there are active tags
      const matchesTags = activeTags.length === 0 || 
        (item.tags && activeTags.every(tag => item.tags.includes(tag)));
      
      return matchesCategory && matchesTags;
    });
  }

  const handleTagsClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const item = items.find(item => item.id === id);
    if (item) {
      setModalTags(item.tags || []);
      setShowTagsModal(id);
    }
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !modalTags.includes(tagInput.trim())) {
      setModalTags([...modalTags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setModalTags(modalTags.filter(t => t !== tag));
  };
  
  const handleSaveTags = () => {
    if (showTagsModal && onTagsUpdate) {
      onTagsUpdate(showTagsModal, modalTags);
      setShowTagsModal(null);
    }
  };

  return (
    <div className={cn("w-full space-y-6", className)}>
      {filteredItems.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/></svg>
          </div>
          <h3 className="text-lg font-medium mb-1">No items found</h3>
          <p className="text-muted-foreground text-sm">
            {activeCategory || activeTags.length > 0
              ? `No items match your current filters.`
              : "Your wardrobe is empty. Add some clothing items to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                alt={item.name || `${item.category} item`} 
                className="w-full h-full object-cover"
              />
              
              {onItemDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemDelete(item.id);
                  }}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Delete item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              )}
              
              {onTagsUpdate && (
                <button
                  onClick={(e) => handleTagsClick(item.id, e)}
                  className="absolute top-2 left-2 h-8 w-8 rounded-full bg-background/80 text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Manage tags"
                >
                  <Tag size={16} />
                </button>
              )}
              
              {selectable && selectedIds.includes(item.id) && (
                <div className="absolute top-2 left-2 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="text-sm text-white font-medium">
                  {item.name || item.category}
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-primary/80 text-white text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 bg-background/60 text-white text-xs rounded-full">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tags Modal */}
      {showTagsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-4 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">
              Manage Tags for {items.find(item => item.id === showTagsModal)?.name || 'Item'}
            </h3>
            
            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button onClick={handleAddTag} variant="outline">
                <Tag size={16} className="mr-2" />
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {modalTags.map((tag) => (
                <Badge key={tag} className="px-3 py-1 flex items-center gap-1">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-xs">
                    <X size={12} />
                  </button>
                </Badge>
              ))}
              {modalTags.length === 0 && (
                <p className="text-sm text-muted-foreground">No tags added yet.</p>
              )}
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                variant="outline"
                onClick={() => setShowTagsModal(null)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveTags}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WardrobeGrid;
