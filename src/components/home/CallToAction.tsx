
import React from 'react';

interface CallToActionProps {
  onGetStarted: (e: React.MouseEvent) => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onGetStarted }) => {
  return (
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
        
        <button
          onClick={onGetStarted}
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
