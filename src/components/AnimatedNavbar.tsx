
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, Shirt, Camera, Heart, Menu, X, Moon, Sun, Palette } from 'lucide-react';
import AuthModal from './AuthModal';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
  { path: '/wardrobe', label: 'Wardrobe', icon: <Shirt className="h-5 w-5" /> },
  { path: '/outfits', label: 'Outfits Matching', icon: <Shirt className="h-5 w-5" /> },
  { path: '/recommendations', label: 'Recommendations', icon: <Heart className="h-5 w-5" /> },
  { path: '/virtual-try-on', label: 'Virtual Try-On', icon: <Camera className="h-5 w-5" /> },
];

const AnimatedNavbar: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'glass-card border-b border-gray-200 py-3 dark:glass-card-dark dark:border-gray-800' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center z-10">
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            OutfitAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-full p-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'relative rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors duration-200',
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                  onClick={() => setActiveTab(item.path)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  
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
                      {/* Tubelight glowing effect */}
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

        {/* Theme Toggle and Actions */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                {theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Palette className="h-5 w-5" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="h-4 w-4 mr-2" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Palette className="h-4 w-4 mr-2" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-gray-200 shadow-lg md:hidden dark:bg-background/90 dark:border-gray-800"
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
        </AnimatePresence>

        <div className="hidden md:flex items-center space-x-4">
          <motion.button 
            className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
          >
            Get Started
          </motion.button>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
};

export default AnimatedNavbar;
