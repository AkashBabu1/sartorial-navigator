
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      title: 'AI-Powered Matching',
      description: 'Our intelligent algorithm combines color theory and style rules to create perfect outfit combinations.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></svg>
      ),
      delay: 100
    },
    {
      title: 'Simple Organization',
      description: 'Easily categorize and organize your clothing items for quick retrieval and matching.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
      ),
      delay: 200
    },
    {
      title: 'Personal Recommendations',
      description: 'Get outfit suggestions tailored to your style preferences and wardrobe items.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
      ),
      delay: 300
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero />
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
              Key Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Say Goodbye to Outfit Indecision
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              OutfitAI combines cutting-edge technology with style principles to transform the way you create outfits from your existing wardrobe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                className="animate-fade-up"
                delay={feature.delay}
              />
            ))}
          </div>
        </div>
      </section>
      
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
                <Link to="/wardrobe" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  Get Started
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="glass-card rounded-2xl overflow-hidden shadow-xl border border-white/20">
                <div className="p-6 aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="grid grid-cols-3 grid-rows-3 gap-3 h-full">
                    <div className="col-span-2 row-span-2 bg-white rounded-xl shadow-sm animate-pulse"></div>
                    <div className="bg-white rounded-xl shadow-sm animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="bg-white rounded-xl shadow-sm animate-pulse" style={{animationDelay: '0.3s'}}></div>
                    <div className="col-span-2 bg-white rounded-xl shadow-sm animate-pulse" style={{animationDelay: '0.4s'}}></div>
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
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
            Ready to Try?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transform Your Wardrobe Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who have simplified their outfit selection process and rediscovered items in their wardrobe.
          </p>
          
          <Link to="/wardrobe" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            Get Started Now
          </Link>
        </div>
      </section>
      
      <footer className="bg-muted py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-2">
                OutfitAI
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered outfit matching and wardrobe management
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link to="/wardrobe" className="text-sm text-muted-foreground hover:text-foreground">
                Wardrobe
              </Link>
              <Link to="/outfits" className="text-sm text-muted-foreground hover:text-foreground">
                Outfits
              </Link>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} OutfitAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
