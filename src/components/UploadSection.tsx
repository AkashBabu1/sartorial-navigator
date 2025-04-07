
import React, { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Upload, X, Tag as TagIcon } from 'lucide-react';

interface UploadSectionProps {
  onImageUploaded: (image: string, category: string, name: string, description: string, color: string, tags: string[]) => void;
  suggestedTags?: string[];
}

const COLORS = [
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'gray', label: 'Gray' },
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
  { value: 'pink', label: 'Pink' },
  { value: 'brown', label: 'Brown' },
  { value: 'orange', label: 'Orange' },
  { value: 'navy', label: 'Navy' },
];

const DEFAULT_TAGS = {
  tops: ['casual', 'formal', 'work', 'everyday', 'party'],
  bottoms: ['casual', 'formal', 'jeans', 'shorts', 'slim-fit'],
  outerwear: ['winter', 'lightweight', 'waterproof', 'cozy', 'warm'],
  dresses: ['formal', 'casual', 'party', 'summer', 'wedding'],
  shoes: ['casual', 'formal', 'sports', 'winter', 'summer'],
  accessories: ['formal', 'casual', 'statement', 'everyday', 'functional']
};

const UploadSection: React.FC<UploadSectionProps> = ({ onImageUploaded, suggestedTags = [] }) => {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState('tops');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }
    
    // Check if file size is less than 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSuggestedTagClick = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    // When category changes, suggest tags based on the category
    setTags([]);
  };

  const saveItem = () => {
    if (!image) {
      toast({
        title: "Image required",
        description: "Please upload an image of your clothing item",
        variant: "destructive"
      });
      return;
    }

    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please provide a name for your clothing item",
        variant: "destructive"
      });
      return;
    }

    onImageUploaded(image, category, name, description, color, tags);
    
    // Reset form
    setImage(null);
    setName('');
    setDescription('');
    setColor('');
    setTags([]);
    
    toast({
      title: "Item added!",
      description: `${name} has been added to your wardrobe.`,
    });
  };

  // Get suggested tags based on selected category
  const categoryTags = category ? DEFAULT_TAGS[category as keyof typeof DEFAULT_TAGS] || [] : [];
  const allSuggestedTags = [...new Set([...categoryTags, ...suggestedTags])];

  return (
    <div className="w-full py-8 animate-fade-up">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Add to Your Wardrobe</h2>
        
        {!image ? (
          <div 
            className={`border-2 border-dashed rounded-lg p-12 text-center ${dragActive ? 'border-primary bg-primary/5' : 'border-border'}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
            
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Upload size={24} />
            </div>
            
            <p className="text-muted-foreground mb-2">Drag & drop your clothing item here</p>
            <p className="text-sm text-muted-foreground mb-6">or</p>
            
            <Button variant="default" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Select Image
              </label>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="aspect-square max-w-xs mx-auto relative overflow-hidden rounded-lg border">
              {uploading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : (
                <img 
                  src={image} 
                  alt="Clothing item" 
                  className="w-full h-full object-cover" 
                />
              )}
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Blue Oxford Shirt"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="tops">Tops</SelectItem>
                        <SelectItem value="bottoms">Bottoms</SelectItem>
                        <SelectItem value="outerwear">Outerwear</SelectItem>
                        <SelectItem value="dresses">Dresses</SelectItem>
                        <SelectItem value="shoes">Shoes</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details about material, fit, etc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select value={color} onValueChange={setColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {COLORS.map(colorOption => (
                        <SelectItem key={colorOption.value} value={colorOption.value}>
                          {colorOption.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tags (e.g., casual, winter)"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    <TagIcon size={16} className="mr-2" />
                    Add
                  </Button>
                </div>
                
                {/* Tags list */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map(tag => (
                      <Badge key={tag} className="px-2 py-1 flex items-center gap-1">
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveTag(tag)} 
                          className="ml-1 hover:bg-primary-foreground/20 rounded-full h-4 w-4 inline-flex items-center justify-center"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                
                {/* Suggested tags */}
                {allSuggestedTags.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Suggested tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {allSuggestedTags.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleSuggestedTagClick(tag)}
                          className={`text-xs px-2 py-1 rounded-full border ${
                            tags.includes(tag) 
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setImage(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveItem}
                  className="flex-1"
                >
                  Add to Wardrobe
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
