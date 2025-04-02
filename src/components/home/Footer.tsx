
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;
