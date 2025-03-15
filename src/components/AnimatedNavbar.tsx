
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, Shirt, Camera, Heart, Menu, X } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
  { path: '/wardrobe', label: 'Wardrobe', icon: <Shirt className="h-5 w-5" /> },
  { path: '/outfits', label: 'Outfits', icon: <Shirt className="h-5 w-5" /> },
  { path: '/virtual-try-on', label: 'Virtual Try-On', icon: <Camera className="h-5 w-5" /> },
];

const AnimatedNavbar: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

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

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="relative flex items-center bg-black/5 backdrop-blur-sm rounded-full p-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                  onClick={() => setActiveTab(item.path)}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="hidden sm:inline-block">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-background/80 to-background/40 backdrop-blur-md border border-white/10 shadow-md"
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
                      <div className="absolute inset-0 opacity-20 rounded-full bg-primary blur-sm" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <button 
          className="md:hidden rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-gray-200 shadow-lg md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                    onClick={() => {
                      setActiveTab(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="hidden md:flex items-center space-x-4">
          <button className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AnimatedNavbar;
