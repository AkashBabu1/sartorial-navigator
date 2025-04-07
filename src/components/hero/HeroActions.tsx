
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

type HeroActionsProps = {
  onGetStarted: (e: React.MouseEvent) => void;
  animationDelay: number;
};

const HeroActions: React.FC<HeroActionsProps> = ({ onGetStarted, animationDelay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay, duration: 0.6 }}
      className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start pt-4"
    >
      <div
        className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
        dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
        overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <Button
          onClick={onGetStarted}
          variant="ghost"
          className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
          bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
          text-black dark:text-white transition-all duration-300 
          group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
          hover:shadow-md dark:hover:shadow-neutral-800/50"
        >
          <span className="opacity-90 group-hover:opacity-100 transition-opacity">
            Get Started
          </span>
          <span
            className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
            transition-all duration-300"
          >
            →
          </span>
        </Button>
      </div>
      
      <Link 
        to="/outfits" 
        className="relative inline-flex h-12 items-center justify-center rounded-md bg-background px-6 font-medium border border-input text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring overflow-hidden group"
      >
        <span className="relative z-10">Explore Outfits</span>
        <span className="absolute inset-0 overflow-hidden rounded-md opacity-0 group-hover:opacity-100">
          <span className="absolute inset-0 rounded-md animate-border-flow-reverse bg-gradient-to-r from-blue-400 via-primary to-blue-600 bg-[length:400%_100%]"></span>
        </span>
        <span className="absolute inset-[2px] bg-background rounded-md transition-colors group-hover:bg-accent"></span>
      </Link>
    </motion.div>
  );
};

export default HeroActions;
