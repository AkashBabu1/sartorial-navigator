
import React from 'react';
import { Button } from "@/components/ui/button";

interface CallToActionProps {
  onGetStarted: (e: React.MouseEvent) => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-[15%] w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-[15%] w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
          Ready to Try?
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Transform Your Wardrobe Experience
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of users who have simplified their outfit selection process and rediscovered items in their wardrobe.
        </p>
        
        <div className="relative group inline-block">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 opacity-70 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
          <Button
            onClick={onGetStarted}
            className="relative h-12 px-8 font-medium text-white rounded-lg bg-black dark:bg-slate-900 hover:bg-slate-800 transition-all duration-300"
          >
            Get Started Now
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
