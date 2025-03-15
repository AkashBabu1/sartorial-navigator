
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className,
  delay = 0
}) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-300 hover-lift",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
