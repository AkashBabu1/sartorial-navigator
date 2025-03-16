
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedNavbar from '@/components/AnimatedNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { ClothingItem } from '@/components/WardrobeGrid';
import { matchOutfits } from '@/utils/colorUtils';
import { Palette, Ruler, Wind, User, ChevronDown } from 'lucide-react';

interface UserTraits {
  colorPreference: string;
  bodyShape: string;
  style: string;
  season: string;
}

interface Outfit {
  id: string;
  top?: ClothingItem;
  bottom?: ClothingItem;
  outerwear?: ClothingItem;
  shoes?: ClothingItem;
  accessories?: ClothingItem[];
  occasion?: string;
  matchScore: number;
}

const bodyShapes = [
  "Rectangle", "Apple", "Pear", "Hourglass", "Triangle", "Inverted Triangle"
];

const styles = [
  "Casual", "Formal", "Sporty", "Bohemian", "Vintage", "Minimalist", "Street"
];

const seasons = [
  "Spring", "Summer", "Fall", "Winter", "All Seasons"
];

const Recommendations = () => {
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);
  const [recommendations, setRecommendations] = useState<Outfit[]>([]);
  const [userTraits, setUserTraits] = useState<UserTraits | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<UserTraits>({
    defaultValues: {
      colorPreference: '',
      bodyShape: '',
      style: '',
      season: ''
    }
  });

  useEffect(() => {
    // Load wardrobe from local storage
    const savedItems = localStorage.getItem('wardrobe');
    
    if (savedItems) {
      try {
        setWardrobe(JSON.parse(savedItems));
      } catch (error) {
        console.error('Failed to parse wardrobe data', error);
      }
    }
    
    // Load previous user traits if available
    const savedTraits = localStorage.getItem('userTraits');
    if (savedTraits) {
      try {
        const traits = JSON.parse(savedTraits);
        setUserTraits(traits);
        form.reset(traits);
      } catch (error) {
        console.error('Failed to parse user traits', error);
      }
    }
  }, [form]);

  const onSubmit = (data: UserTraits) => {
    setLoading(true);
    setUserTraits(data);
    
    // Save user traits to local storage
    localStorage.setItem('userTraits', JSON.stringify(data));
    
    // Generate recommendations after a delay to simulate processing
    setTimeout(() => {
      if (wardrobe.length > 0) {
        // Generate outfits using the existing matchOutfits function
        const generatedOutfits = matchOutfits(wardrobe);
        
        // In a real application, you would filter and score these outfits based on user traits
        // Here we'll just add a random match score for demonstration
        const scoredOutfits = generatedOutfits.map(outfit => ({
          ...outfit,
          matchScore: Math.floor(Math.random() * 100)
        }));
        
        // Sort by match score
        scoredOutfits.sort((a, b) => b.matchScore - a.matchScore);
        
        setRecommendations(scoredOutfits);
        
        toast({
          title: "Recommendations Ready",
          description: `Found ${scoredOutfits.length} outfits that match your style preferences.`,
        });
      } else {
        toast({
          title: "No Wardrobe Items",
          description: "Please add some items to your wardrobe first.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const arrowVariants = {
    initial: { y: 0 },
    animate: { y: [0, 5, 0], transition: { repeat: Infinity, duration: 1.5 } }
  };

  return (
    <div className="min-h-screen pb-20">
      <AnimatedNavbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
            Personal Style
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your Personalized Style Recommendations
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tell us about your preferences, and we'll recommend outfits just for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          <motion.div 
            className="lg:col-span-2 glass-card p-6 rounded-lg"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <h2 className="text-xl font-semibold mb-6">Your Style Profile</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={item}>
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Color Preference
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="E.g., Blue, Earth tones, Pastels..."
                        {...form.register("colorPreference")} 
                      />
                    </FormControl>
                    <FormDescription>
                      What colors do you usually prefer to wear?
                    </FormDescription>
                  </FormItem>
                </motion.div>
                
                <motion.div variants={item}>
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Body Shape
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select 
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                          {...form.register("bodyShape")}
                        >
                          <option value="">Select your body shape</option>
                          {bodyShapes.map(shape => (
                            <option key={shape} value={shape.toLowerCase()}>
                              {shape}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 pointer-events-none text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormDescription>
                      This helps us suggest flattering silhouettes.
                    </FormDescription>
                  </FormItem>
                </motion.div>
                
                <motion.div variants={item}>
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <Wind className="h-4 w-4" />
                      Style Preference
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select 
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                          {...form.register("style")}
                        >
                          <option value="">Select your style</option>
                          {styles.map(style => (
                            <option key={style} value={style.toLowerCase()}>
                              {style}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 pointer-events-none text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormDescription>
                      What style of clothing do you prefer?
                    </FormDescription>
                  </FormItem>
                </motion.div>
                
                <motion.div variants={item}>
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <Ruler className="h-4 w-4" />
                      Season
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select 
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                          {...form.register("season")}
                        >
                          <option value="">Select season</option>
                          {seasons.map(season => (
                            <option key={season} value={season.toLowerCase()}>
                              {season}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 pointer-events-none text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormDescription>
                      What season are you planning outfits for?
                    </FormDescription>
                  </FormItem>
                </motion.div>
                
                <motion.div variants={item}>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Generating Recommendations...
                      </>
                    ) : (
                      "Generate Recommendations"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
          
          <div className="lg:col-span-3">
            <div className="glass-card p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Recommended Outfits</h2>
              
              {!userTraits && recommendations.length === 0 && (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No Recommendations Yet</h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Fill out your style profile to get personalized outfit recommendations.
                  </p>
                  <motion.div 
                    className="mt-4"
                    variants={arrowVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <svg className="h-5 w-5 mx-auto text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                  </motion.div>
                </div>
              )}
              
              {loading && (
                <div className="py-12 text-center">
                  <div className="h-12 w-12 mx-auto mb-4 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="text-muted-foreground">Analyzing your style preferences...</p>
                </div>
              )}
              
              {recommendations.length > 0 && (
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {recommendations.map((outfit) => (
                    <motion.div 
                      key={outfit.id} 
                      variants={item}
                      whileHover={{ y: -5 }}
                      className="glass-card rounded-lg overflow-hidden hover-lift"
                    >
                      <div className="aspect-[4/3] bg-gray-50 relative">
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                          {outfit.top && (
                            <div className="row-span-1 col-span-1 overflow-hidden rounded-md">
                              <img 
                                src={outfit.top.image} 
                                alt="Top" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {outfit.bottom && (
                            <div className="row-span-1 col-span-1 overflow-hidden rounded-md">
                              <img 
                                src={outfit.bottom.image} 
                                alt="Bottom" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {outfit.outerwear && (
                            <div className="row-span-1 col-span-1 overflow-hidden rounded-md">
                              <img 
                                src={outfit.outerwear.image} 
                                alt="Outerwear" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {outfit.shoes && (
                            <div className="row-span-1 col-span-1 overflow-hidden rounded-md">
                              <img 
                                src={outfit.shoes.image} 
                                alt="Shoes" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Outfit #{outfit.id.substring(0, 4)}</h3>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">Match</span>
                            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                              {outfit.matchScore}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-2">
                          {outfit.occasion && (
                            <div className={`text-xs px-2 py-1 rounded-full ${
                              outfit.occasion === 'casual' 
                                ? 'bg-orange-100 text-orange-800' 
                                : 'bg-indigo-100 text-indigo-800'
                            }`}>
                              {outfit.occasion.charAt(0).toUpperCase() + outfit.occasion.slice(1)}
                            </div>
                          )}
                          {userTraits?.style && (
                            <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {userTraits.style.charAt(0).toUpperCase() + userTraits.style.slice(1)}
                            </div>
                          )}
                          {userTraits?.season && (
                            <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                              {userTraits.season.charAt(0).toUpperCase() + userTraits.season.slice(1)}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
            
            {/* How It Works Section */}
            <motion.div 
              className="mt-8 glass-card p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-semibold mb-6 text-center">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="font-bold">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Share Your Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Tell us about your style, body shape, and color preferences
                  </p>
                  <motion.div 
                    className="mt-3 flex justify-center"
                    variants={arrowVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <svg className="h-5 w-5 text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.div>
                </div>
                
                <div className="text-center">
                  <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="font-bold">2</span>
                  </div>
                  <h3 className="font-medium mb-2">AI Analyzes Your Style</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI matches you with outfits based on your unique profile
                  </p>
                  <motion.div 
                    className="mt-3 flex justify-center"
                    variants={arrowVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <svg className="h-5 w-5 text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.div>
                </div>
                
                <div className="text-center">
                  <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="font-bold">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Try Them Virtually</h3>
                  <p className="text-sm text-muted-foreground">
                    See how outfits look before deciding what to wear
                  </p>
                  <motion.div className="mt-3">
                    <Button asChild size="sm" className="mx-auto">
                      <Link to="/virtual-try-on">Try Now</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
