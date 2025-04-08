
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import TagBadge from '@/components/TagBadge';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

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

  // Log items for debugging
  console.log("WardrobeGrid items:", items);

  let filteredItems = items;

  // Skip filtering if both are null/empty
  if (activeCategory !== null && activeCategory !== 'all' || activeTags.length > 0) {
    filteredItems = items.filter(item => {
      // Category filter - allow "all" to match everything
      const matchesCategory = activeCategory === null || 
                             activeCategory === 'all' || 
                             item.category === activeCategory;
      
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
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
      {filteredItems.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">No items found</h3>
          <p className="text-muted-foreground text-sm">
            No clothing items match your current filters.
          </p>
        </div>
      ) : (
        filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden border bg-card h-full flex flex-col">
            <div 
              className="relative aspect-square cursor-pointer"
              onClick={() => onItemClick && onItemClick(item)}
            >
              <img 
                src={item.image} 
                alt={item.name || `${item.category} item`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-center bg-white/80 py-1 px-2 rounded">
                <p className="font-medium text-sm">{item.name}</p>
              </div>
            </div>
            
            <CardContent className="p-3 pt-3 flex-grow flex flex-col">
              <div className="text-sm font-medium">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </div>
              <div className="text-xs text-muted-foreground">
                {item.color}
              </div>
              
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.slice(0, 2).map(tag => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="p-3 pt-0 border-t">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full flex items-center justify-center gap-1 text-xs"
                onClick={(e) => handleTagsClick(item.id, e)}
              >
                <Tag size={14} />
                Manage Tags
              </Button>
            </CardFooter>
          </Card>
        ))
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
