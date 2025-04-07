
import React from 'react';

type AISuggestionsCardProps = {
  className?: string;
  speed?: string;
};

const AISuggestionsCard: React.FC<AISuggestionsCardProps> = ({ className, speed = "0.15" }) => {
  return (
    <div className={`absolute -top-6 -left-6 parallax-element ${className}`} data-speed={speed}>
      <div className="glass-card rounded-xl p-4 shadow-lg border border-white/20 animate-float w-40" style={{animationDelay: '1s'}}>
        <div className="text-xs font-medium mb-1">AI Suggestions</div>
        <div className="w-full h-2 rounded-full bg-gray-200">
          <div className="h-2 rounded-full bg-primary w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionsCard;
