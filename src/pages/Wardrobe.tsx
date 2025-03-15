
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import UploadSection from '@/components/UploadSection';
import WardrobeGrid, { ClothingItem } from '@/components/WardrobeGrid';
import { useToast } from '@/components/ui/use-toast';

const Wardrobe = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
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
  
  const handleImageUploaded = (image: string, category: string) => {
    const newItem: ClothingItem = {
      id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      image,
      category
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

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
            My Wardrobe
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Manage Your Clothing Items
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload and organize your clothing items to create perfect outfit combinations.
          </p>
        </div>
        
        <UploadSection onImageUploaded={handleImageUploaded} />
        
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Your Wardrobe</h2>
          
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-pulse">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square rounded-lg bg-muted"
                  style={{ animationDelay: `${i * 50}ms` }}
                ></div>
              ))}
            </div>
          ) : (
            <WardrobeGrid 
              items={items} 
              onItemDelete={handleItemDelete} 
              className="animate-fade-up"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Wardrobe;
