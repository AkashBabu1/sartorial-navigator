
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import AuthModal from './AuthModal';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Wardrobe', path: '/wardrobe' },
    { name: 'Outfits', path: '/outfits' },
    { name: 'Recommendations', path: '/recommendations' },
    { name: 'Virtual Try-On', path: '/virtual-try-on' },
  ];

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'glass-card border-b border-gray-200 py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            OutfitAI
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <div className="relative flex items-center bg-black/5 backdrop-blur-sm rounded-full p-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      layoutId="navbar-pill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        type: "spring", 
                        bounce: 0.25, 
                        stiffness: 130, 
                        damping: 12 
                      }}
                    >
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40 backdrop-blur-md border border-white/10 shadow-md" />
                        <div className="absolute inset-0 opacity-20 rounded-full bg-primary blur-sm" />
                        <div className="absolute inset-0 rounded-full bg-primary/5" />
                        <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-sm" />
                        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/50 blur-sm" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button 
            className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
          >
            Get Started
          </motion.button>
          
          <button className="md:hidden rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
