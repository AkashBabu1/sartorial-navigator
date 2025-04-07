import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import UploadSection from '@/components/UploadSection';
import WardrobeGrid, { ClothingItem } from '@/components/WardrobeGrid';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Tag as TagIcon, 
  X,
  PlusCircle
} from 'lucide-react';

const Wardrobe = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { toast } = useToast();
  
  // Get all unique tags from all items
  const allTags = Array.from(new Set(items.flatMap(item => item.tags || [])));
  
  // Get all unique colors from all items
  const allColors = Array.from(new Set(items.map(item => item.color).filter(Boolean) as string[]));
  
  useEffect(() => {
    // Simulate loading data from storage
    const savedItems = localStorage.getItem('wardrobe');
    
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error('Failed to parse wardrobe data', error);
      }
    }
    
    setLoading(false);
  }, []);
  
  useEffect(() => {
    // Save to local storage whenever items change
    if (items.length > 0) {
      localStorage.setItem('wardrobe', JSON.stringify(items));
    }
  }, [items]);
  
  const handleImageUploaded = (
    image: string, 
    category: string, 
    name: string, 
    description: string, 
    color: string, 
    tags: string[]
  ) => {
    const newItem: ClothingItem = {
      id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      image,
      category,
      name,
      description,
      color,
      tags
    };
    
    setItems((prev) => [...prev, newItem]);
  };
  
  const handleItemDelete = (id: string) => {
    setItems((prev) => prev.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The clothing item has been removed from your wardrobe.",
    });
  };
  
  const handleTagsUpdate = (id: string, tags: string[]) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, tags } 
          : item
      )
    );
    
    toast({
      title: "Tags updated",
      description: "The tags for this item have been updated.",
    });
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const clearFilters = () => {
    setActiveCategory(null);
    setActiveTags([]);
    setActiveColor(null);
    setSearchTerm('');
  };
  
  const toggleTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };
  
  // Filter items based on search term, category, tags, and color
  let filteredItems = items;
  
  // Search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredItems = filteredItems.filter(item => 
      (item.name?.toLowerCase().includes(term)) || 
      (item.description?.toLowerCase().includes(term)) ||
      (item.category.toLowerCase().includes(term)) ||
      (item.tags?.some(tag => tag.toLowerCase().includes(term)))
    );
  }

  // Category filter (updated to handle the "all" value)
  if (activeCategory && activeCategory !== "all") {
    filteredItems = filteredItems.filter(item => item.category === activeCategory);
  }
  
  // Color filter
  if (activeColor) {
    filteredItems = filteredItems.filter(item => item.color === activeColor);
  }
  
  // Tags filter
  if (activeTags.length > 0) {
    filteredItems = filteredItems.filter(item => 
      item.tags && activeTags.every(tag => item.tags.includes(tag))
    );
  }
  
  // Get most used tags for suggestions
  const getTopTags = () => {
    const tagCounts: Record<string, number> = {};
    items.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="animate-fade-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              My Wardrobe
            </h1>
            <p className="text-muted-foreground">
              Manage your clothing items and create perfect outfit combinations
            </p>
          </div>
          
          <Button 
            className="mt-4 md:mt-0 flex items-center gap-2"
            onClick={() => window.scrollTo({ top: document.querySelector('h2')?.offsetTop, behavior: 'smooth' })}
          >
            <PlusCircle size={18} />
            Add Item
          </Button>
        </div>
        
        <div className="bg-card border rounded-lg p-4 mb-8 animate-fade-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, description, or tag..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={activeCategory || 'all'} onValueChange={(value) => setActiveCategory(value === 'all' ? null : value)}>
                <SelectTrigger className="min-w-[150px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="tops">Tops</SelectItem>
                  <SelectItem value="bottoms">Bottoms</SelectItem>
                  <SelectItem value="outerwear">Outerwear</SelectItem>
                  <SelectItem value="dresses">Dresses</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowFilterModal(true)}
              >
                <Filter size={18} />
                Filter
              </Button>
            </div>
          </div>
          
          {(activeTags.length > 0 || activeColor) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              
              {activeTags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button 
                    onClick={() => toggleTag(tag)} 
                    className="ml-1 hover:bg-muted rounded-full h-4 w-4 inline-flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
              
              {activeColor && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Color: {activeColor}
                  <button 
                    onClick={() => setActiveColor(null)} 
                    className="ml-1 hover:bg-muted rounded-full h-4 w-4 inline-flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-xs h-7"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
        
        {showFilterModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-semibold mb-4">Filter Items</h3>
              
              {/* Color filter */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Filter by Color</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={activeColor === null ? "default" : "outline"}
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => setActiveColor(null)}
                  >
                    All Colors
                  </Button>
                  
                  {allColors.map(color => (
                    <Button 
                      key={color}
                      variant={activeColor === color ? "default" : "outline"}
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => setActiveColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Tags filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Filter by Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Button
                      key={tag}
                      variant={activeTags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                  
                  {allTags.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No tags available. Add tags to your items first.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline"
                  onClick={() => setShowFilterModal(false)}
                >
                  Close
                </Button>
                <Button 
                  variant="default"
                  onClick={() => {
                    setShowFilterModal(false);
                  }}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <UploadSection 
          onImageUploaded={handleImageUploaded} 
          suggestedTags={getTopTags()}
        />
        
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Your Wardrobe</h2>
          
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square rounded-lg bg-muted"
                  style={{ animationDelay: `${i * 50}ms` }}
                ></div>
              ))}
            </div>
          ) : (
            <WardrobeGrid 
              items={filteredItems} 
              onItemDelete={handleItemDelete} 
              onTagsUpdate={handleTagsUpdate}
              className="animate-fade-up"
              activeCategory={activeCategory}
              activeTags={activeTags}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Wardrobe;
