
import React from 'react';
import { TimelineDemo } from '@/components/TimelineDemo';

const TimelineSection: React.FC = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background elements for visual interest */}
      <div className="absolute top-[10%] right-[5%] w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-[20%] left-[5%] w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
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
        
        <TimelineDemo />
      </div>
    </section>
  );
};

export default TimelineSection;
