
import React from 'react';

type ColorMatchCardProps = {
  className?: string;
  speed?: string;
};

const ColorMatchCard: React.FC<ColorMatchCardProps> = ({ className, speed = "0.1" }) => {
  return (
    <div className={`absolute -bottom-6 -right-6 parallax-element ${className}`} data-speed={speed}>
      <div className="glass-card rounded-xl p-4 shadow-lg border border-white/20 animate-float w-40">
        <div className="text-xs font-medium mb-1">Color Match</div>
        <div className="flex space-x-2">
          <div className="w-5 h-5 rounded-full bg-blue-500"></div>
          <div className="w-5 h-5 rounded-full bg-orange-400"></div>
          <div className="w-5 h-5 rounded-full bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default ColorMatchCard;
