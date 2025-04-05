
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import UploadSection from '@/components/UploadSection';
import WardrobeGrid, { ClothingItem } from '@/components/WardrobeGrid';
import InspirationGrid from '@/components/InspirationGrid';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  // Style inspiration images for the grid
  const styleInspirationImages = [
    {
      id: 'style-1',
      src: 'public/lovable-uploads/7111c273-c407-49e1-954b-90979678ecb7.png',
      alt: 'Style collage inspiration',
      className: 'col-span-2 row-span-2'
    },
    {
      id: 'style-2',
      src: '/lovable-uploads/645d3be4-8b13-45cb-86c0-ff363cc2d4c3.png',
      alt: 'Fashion inspiration'
    },
    {
      id: 'style-3',
      src: '/lovable-uploads/e22d9e5d-94d5-4904-b0b5-f2f41a4fee28.png',
      alt: 'Style inspiration'
    },
    {
      id: 'style-4',
      src: '/lovable-uploads/0c34cc36-6117-40c6-b645-ab0b1fb11d70.png',
      alt: 'Fashion trend'
    },
    {
      id: 'style-5',
      src: '/lovable-uploads/941a253a-56d7-43d5-ad08-16b2a6bff1bf.png',
      alt: 'Style inspiration'
    }
  ];

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
        
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="upload">Upload Items</TabsTrigger>
            <TabsTrigger value="inspiration">Style Inspiration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-8">
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
          </TabsContent>
          
          <TabsContent value="inspiration" className="space-y-8">
            <div className="glass-card p-6 rounded-lg animate-fade-up">
              <h2 className="text-2xl font-semibold mb-6">Style Inspiration</h2>
              <p className="text-muted-foreground mb-8">
                Browse these style inspirations to help you create stunning outfits with your wardrobe items.
              </p>
              
              <InspirationGrid 
                images={styleInspirationImages} 
                className="mb-8"
              />
              
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-medium">Styling Tips</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Build your wardrobe around a consistent color palette for easy mixing and matching</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Invest in versatile pieces that can be styled in multiple ways</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Use accessories to transform basic outfits into statement looks</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Pay attention to proportions - balance loose items with more fitted pieces</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wardrobe;
