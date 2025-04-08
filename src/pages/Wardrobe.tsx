
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import UploadSection from '@/components/UploadSection';
import WardrobeGrid, { ClothingItem } from '@/components/WardrobeGrid';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Filter } from 'lucide-react';
import TagBadge from '@/components/TagBadge';

const Wardrobe = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { toast } = useToast();
  
  // Predefined common tags
  const commonTags = ['casual', 'cozy', 'everyday', 'formal', 'smart-casual', 'summer', 'weekend', 'winter', 'work'];
  
  useEffect(() => {
    // Load data from storage
    const loadWardrobeItems = () => {
      const savedItems = localStorage.getItem('wardrobe');
      console.log("Loading wardrobe from localStorage:", savedItems);
      
      if (savedItems) {
        try {
          const parsedItems = JSON.parse(savedItems);
          console.log("Parsed wardrobe items:", parsedItems);
          setItems(parsedItems);
        } catch (error) {
          console.error('Failed to parse wardrobe data', error);
          // In case of error, initialize with empty array
          setItems([]);
        }
      }
      
      setLoading(false);
    };
    
    loadWardrobeItems();
  }, []);
  
  useEffect(() => {
    // Save to local storage whenever items change
    if (items.length > 0) {
      console.log("Saving to localStorage:", items);
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
    
    console.log("Adding new item:", newItem);
    setItems(prevItems => [...prevItems, newItem]);
    setShowUploadForm(false);
    
    toast({
      title: "Item added!",
      description: `${name} has been added to your wardrobe.`,
    });
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
  
  const toggleTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };
  
  const toggleCategory = (category: string | null) => {
    if (activeCategory === category) {
      setActiveCategory('all');
    } else {
      setActiveCategory(category);
    }
  };
  
  // Filter items based on search term, category, and tags
  let filteredItems = items;
  
  // Search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredItems = filteredItems.filter(item => 
      (item.name?.toLowerCase().includes(term)) || 
      (item.description?.toLowerCase().includes(term)) ||
      (item.category.toLowerCase().includes(term)) ||
      (item.color?.toLowerCase().includes(term)) ||
      (item.tags?.some(tag => tag.toLowerCase().includes(term)))
    );
  }

  // Log current state for debugging
  console.log("Current state:", {
    totalItems: items.length,
    filteredItems: filteredItems.length,
    activeCategory,
    activeTags,
    searchTerm
  });

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Wardrobe</h1>
            <p className="text-muted-foreground">
              Manage your clothing items and create outfit combinations
            </p>
          </div>
          
          <Button 
            className="flex items-center gap-2 self-start"
            onClick={() => setShowUploadForm(true)}
          >
            <PlusCircle size={18} />
            Add Item
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or color..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filter
            </Button>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Filter by tag:</p>
            <div className="flex flex-wrap gap-2">
              {commonTags.map(tag => (
                <TagBadge 
                  key={tag} 
                  tag={tag} 
                  active={activeTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto py-2">
            <Button 
              variant={activeCategory === 'all' ? "default" : "outline"} 
              size="sm"
              onClick={() => toggleCategory('all')}
            >
              All Items
            </Button>
            <Button 
              variant={activeCategory === "tops" ? "default" : "outline"} 
              size="sm"
              onClick={() => toggleCategory("tops")}
            >
              Tops
            </Button>
            <Button 
              variant={activeCategory === "bottoms" ? "default" : "outline"} 
              size="sm"
              onClick={() => toggleCategory("bottoms")}
            >
              Bottoms
            </Button>
            <Button 
              variant={activeCategory === "shoes" ? "default" : "outline"} 
              size="sm"
              onClick={() => toggleCategory("shoes")}
            >
              Shoes
            </Button>
            <Button 
              variant={activeCategory === "outerwear" ? "default" : "outline"} 
              size="sm"
              onClick={() => toggleCategory("outerwear")}
            >
              Outerwear
            </Button>
            <Button 
              variant={activeCategory === "dresses" ? "default" : "outline"} 
              size="sm"
              onClick={() => toggleCategory("dresses")}
            >
              Dresses
            </Button>
            <Button 
              variant={activeCategory === "accessories" ? "default" : "outline"} 
              size="sm"
              onClick={() => toggleCategory("accessories")}
            >
              Accessories
            </Button>
          </div>
        </div>
        
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
        ) : filteredItems.length === 0 && items.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/></svg>
            </div>
            <h3 className="text-lg font-medium mb-1">No items found</h3>
            <p className="text-muted-foreground text-sm">
              {activeCategory || activeTags.length > 0 || searchTerm
                ? `No items match your current filters.`
                : "Your wardrobe is empty. Add some clothing items to get started."}
            </p>
          </div>
        ) : (
          <WardrobeGrid 
            items={filteredItems} 
            onItemDelete={handleItemDelete} 
            onTagsUpdate={handleTagsUpdate}
            activeCategory={activeCategory}
            activeTags={activeTags}
          />
        )}
      </div>
      
      {showUploadForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-background rounded-lg w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add New Item</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowUploadForm(false)}>
                ✕
              </Button>
            </div>
            <div className="p-4">
              <UploadSection 
                onImageUploaded={handleImageUploaded} 
                suggestedTags={commonTags}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wardrobe;
