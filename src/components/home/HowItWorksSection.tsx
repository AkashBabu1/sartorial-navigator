
import React from 'react';

interface HowItWorksSectionProps {
  clothingItems: {
    shirts: Array<{ src: string; alt: string; }>;
    pants: Array<{ src: string; alt: string; }>;
  };
  onGetStarted: (e: React.MouseEvent) => void;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ clothingItems, onGetStarted }) => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium">
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              A Better Way to Plan Your Outfits
            </h2>
            <p className="text-muted-foreground">
              Upload your clothing items, categorize them, and let our AI system suggest perfect combinations based on color theory, patterns, and style principles.
            </p>
            
            <ul className="space-y-4">
              {[
                "Upload your clothing items with our easy-to-use interface",
                "Organize items by category and occasion",
                "Generate outfit ideas with one click",
                "Save your favorite combinations for later"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="h-6 w-6 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="ml-3">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              <button 
                onClick={onGetStarted}
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Get Started
              </button>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="glass-card rounded-2xl overflow-hidden shadow-xl border border-white/20">
              <div className="p-6 aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="grid grid-cols-3 grid-rows-3 gap-3 h-full">
                  {/* Shirts */}
                  <div className="col-span-2 row-span-2 grid grid-cols-2 gap-3">
                    {clothingItems.shirts.slice(0, 2).map((shirt, index) => (
                      <div key={`shirt-${index}`} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <img 
                          src={shirt.src} 
                          alt={shirt.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="col-span-2 bg-white rounded-xl shadow-sm p-2">
                      <div className="flex justify-between items-center h-full">
                        <span className="text-xs font-medium text-gray-500">Shirts & Tops</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          12 items
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pants */}
                  <div className="row-span-3 grid grid-rows-3 gap-3">
                    {clothingItems.pants.map((pant, index) => (
                      <div key={`pant-${index}`} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <img 
                          src={pant.src} 
                          alt={pant.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Additional shirt */}
                  <div className="col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
                    <img 
                      src={clothingItems.shirts[2].src} 
                      alt={clothingItems.shirts[2].alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6">
              <div className="glass-card rounded-xl p-4 shadow-lg border border-white/20 animate-float w-48">
                <div className="text-xs font-medium mb-1">Style Match</div>
                <div className="w-full h-2 rounded-full bg-gray-200 mb-1">
                  <div className="h-2 rounded-full bg-primary w-4/5"></div>
                </div>
                <div className="text-xs text-muted-foreground">Great combination!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
