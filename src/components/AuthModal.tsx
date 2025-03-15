
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would be replaced with actual authentication logic in a real app
    toast({
      title: isSignIn ? "Sign In Successful" : "Account Created",
      description: "This is a demo. In a real app, you would be authenticated now.",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isSignIn ? "Sign In to Your Account" : "Create an Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSignIn 
              ? "Enter your email and password to access your wardrobe" 
              : "Join OutfitAI to start building your digital wardrobe"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full">
            {isSignIn ? "Sign In" : "Create Account"}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          {isSignIn ? (
            <p>
              Don't have an account?{" "}
              <button 
                className="text-primary hover:underline" 
                onClick={() => setIsSignIn(false)}
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button 
                className="text-primary hover:underline" 
                onClick={() => setIsSignIn(true)}
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
