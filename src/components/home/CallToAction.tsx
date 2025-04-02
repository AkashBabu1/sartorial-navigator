
import React from 'react';

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
        
        <button
          onClick={onGetStarted}
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring relative overflow-hidden group"
        >
          <span className="absolute inset-0 overflow-hidden rounded-md">
            <span className="absolute inset-0 rounded-md animate-border-flow bg-gradient-to-r from-blue-400 via-primary to-blue-600 bg-[length:400%_100%]"></span>
          </span>
          <span className="absolute inset-[2px] bg-primary rounded-md transition-colors group-hover:bg-primary/90"></span>
          <span className="relative z-10">Get Started Now</span>
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
