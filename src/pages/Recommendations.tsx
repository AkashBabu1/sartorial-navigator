
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import InspirationGrid from '@/components/InspirationGrid';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageItem } from '@/components/InspirationGrid';

const Recommendations = () => {
  const { toast } = useToast();
  
  // Sample inspiration images
  const casualInspiration: ImageItem[] = [
    {
      id: 'casual-1',
      src: 'public/lovable-uploads/7111c273-c407-49e1-954b-90979678ecb7.png',
      alt: 'Fashion inspiration collage',
      className: 'col-span-2 row-span-2'
    },
    {
      id: 'casual-2',
      src: '/lovable-uploads/91c19fa7-bd0e-4534-a988-1a7e15cdbdaa.png',
      alt: 'Casual outfit inspiration'
    },
    {
      id: 'casual-3',
      src: '/lovable-uploads/e22d9e5d-94d5-4904-b0b5-f2f41a4fee28.png',
      alt: 'Casual style inspiration'
    },
    {
      id: 'casual-4',
      src: '/lovable-uploads/641c19fa7-bd0e-4534-a988-2b7e15cdbdaa.png',
      alt: 'Modern casual style',
      // Using a placeholder image if the above doesn't exist
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    },
    {
      id: 'casual-5',
      src: '/lovable-uploads/645d3be4-8b13-45cb-86c0-ff363cc2d4c3.png',
      alt: 'Casual outfit example'
    }
  ];
  
  const formalInspiration: ImageItem[] = [
    {
      id: 'formal-1',
      src: '/lovable-uploads/a903b6b2-c3c3-42b6-af8d-99b03a149613.png',
      alt: 'Formal outfit inspiration',
      className: 'col-span-2 row-span-2'
    },
    {
      id: 'formal-2',
      src: '/lovable-uploads/bbcf8161-a234-4b01-b532-ab3317291382.png',
      alt: 'Formal style example'
    },
    {
      id: 'formal-3',
      src: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      alt: 'Evening formal wear'
    },
    {
      id: 'formal-4',
      src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      alt: 'Formal occasion outfit'
    },
    {
      id: 'formal-5',
      src: '/lovable-uploads/2f676777-5408-49bb-b187-b0e5bcabdc7d.png',
      alt: 'Business formal style'
    }
  ];
  
  const artInspiration: ImageItem[] = [
    {
      id: 'art-1',
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      alt: 'Artistic inspiration',
      className: 'col-span-2 row-span-2'
    },
    {
      id: 'art-2',
      src: '/lovable-uploads/0c34cc36-6117-40c6-b645-ab0b1fb11d70.png',
      alt: 'Creative style'
    },
    {
      id: 'art-3',
      src: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
      alt: 'Artistic fashion'
    },
    {
      id: 'art-4',
      src: '/lovable-uploads/941a253a-56d7-43d5-ad08-16b2a6bff1bf.png',
      alt: 'Creative outfit ideas'
    },
    {
      id: 'art-5',
      src: '/lovable-uploads/561a2e7c-5563-4412-b4ae-f35719b3ed12.png',
      alt: 'Avant-garde fashion'
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24 animate-fade-up">
        <div className="text-center mb-12">
          <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
            Style Inspiration
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Your Style
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse curated collections and get personalized style recommendations based on your wardrobe.
          </p>
        </div>
        
        <Tabs defaultValue="casual" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="casual">Casual</TabsTrigger>
            <TabsTrigger value="formal">Formal</TabsTrigger>
            <TabsTrigger value="artistic">Artistic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="casual" className="space-y-8">
            <div className="glass-card p-6 rounded-lg">
              <InspirationGrid 
                images={casualInspiration} 
                title="Casual Style Inspiration"
                className="mb-8"
              />
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Casual Style Tips</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Mix and match neutral colors for a timeless look</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Invest in quality basics that can be dressed up or down</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Add a statement accessory to elevate simple outfits</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="formal" className="space-y-8">
            <div className="glass-card p-6 rounded-lg">
              <InspirationGrid 
                images={formalInspiration} 
                title="Formal Style Inspiration"
                className="mb-8"
              />
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Formal Style Tips</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Ensure proper fit - tailoring makes all the difference</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Pay attention to details like pocket squares and cufflinks</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Keep colors classic and coordinated for professional settings</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="artistic" className="space-y-8">
            <div className="glass-card p-6 rounded-lg">
              <InspirationGrid 
                images={artInspiration} 
                title="Artistic Style Inspiration"
                className="mb-8"
              />
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Artistic Style Tips</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Experiment with bold colors and unexpected combinations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Mix textures and patterns to create visual interest</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="ml-3 text-sm">Don't be afraid to incorporate vintage and unique pieces</span>
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

export default Recommendations;
