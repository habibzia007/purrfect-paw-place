
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Pet, PetType } from "@/types/pet";
import { usePets } from "@/context/PetContext";

interface EditPetModalProps {
  pet: Pet;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (pet: Pet) => void;
}

const EditPetModal = ({ pet, isOpen, onClose, onUpdate }: EditPetModalProps) => {
  const { updateExistingPet } = usePets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    name: pet.name,
    type: pet.type,
    breed: pet.breed,
    color: pet.color,
    age: pet.age,
    price: pet.price.toString(),
    description: pet.description,
    images: [...pet.images],
    is_popular: pet.is_popular
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm(prev => ({ ...prev, images: newImages }));
  };
  
  const handleAddImage = () => {
    setForm(prev => ({
      ...prev,
      images: [...prev.images, ""]
    }));
  };
  
  const handleRemoveImage = (index: number) => {
    if (form.images.length <= 1) return;
    
    const newImages = form.images.filter((_, i) => i !== index);
    setForm(prev => ({
      ...prev,
      images: newImages
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Filter out empty image URLs
      const filteredImages = form.images.filter(img => img.trim() !== "");
      
      if (filteredImages.length === 0) {
        filteredImages.push("https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?q=80&w=1000&auto=format&fit=crop");
      }
      
      // Convert price to number
      const updatedPet: Partial<Pet> = {
        ...form,
        images: filteredImages,
        price: parseFloat(form.price)
      };
      
      const updated = await updateExistingPet(pet.id, updatedPet);
      if (updated) {
        onUpdate(updated);
      }
      onClose();
    } catch (error) {
      console.error("Error updating pet:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-secondary text-white border-pet-purple/30">
        <DialogHeader>
          <DialogTitle className="text-white">Edit {pet.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Pet Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={form.name} 
                onChange={handleInputChange} 
                required 
                className="bg-pet-dark/50 border-pet-purple/20 focus:border-pet-purple"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Pet Type</Label>
              <Select 
                value={form.type} 
                onValueChange={(value) => handleSelectChange("type", value as PetType)}
                required
              >
                <SelectTrigger className="bg-pet-dark/50 border-pet-purple/20 focus:border-pet-purple">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-pet-dark border-pet-purple/20">
                  <SelectItem value="Dog">Dog</SelectItem>
                  <SelectItem value="Cat">Cat</SelectItem>
                  <SelectItem value="Bird">Bird</SelectItem>
                  <SelectItem value="Rabbit">Rabbit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="breed">Breed</Label>
              <Input 
                id="breed" 
                name="breed" 
                value={form.breed} 
                onChange={handleInputChange} 
                required 
                className="bg-pet-dark/50 border-pet-purple/20 focus:border-pet-purple"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                name="age" 
                value={form.age} 
                onChange={handleInputChange} 
                required 
                className="bg-pet-dark/50 border-pet-purple/20 focus:border-pet-purple"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  id="color" 
                  name="color" 
                  value={form.color} 
                  onChange={handleInputChange} 
                  className="w-12 h-9 p-1 bg-pet-dark/50 border-pet-purple/20"
                />
                <Input 
                  type="text" 
                  value={form.color} 
                  onChange={handleInputChange} 
                  name="color" 
                  className="flex-1 bg-pet-dark/50 border-pet-purple/20 focus:border-pet-purple"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                value={form.price} 
                onChange={handleInputChange} 
                required 
                min="0" 
                className="bg-pet-dark/50 border-pet-purple/20 focus:border-pet-purple"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={form.description} 
              onChange={handleInputChange} 
              required 
              rows={3} 
              className="bg-pet-dark/50 border-pet-purple/20 focus:border-pet-purple"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Images</Label>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={handleAddImage}
                className="text-xs text-pet-purple hover:text-pet-purple-dark"
              >
                + Add Image
              </Button>
            </div>
            
            {form.images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={image} 
                  onChange={(e) => handleImageChange(index, e.target.value)} 
                  placeholder="Image URL" 
                  className="bg-pet-dark/50 border-pet-purple/20 focus:border-pet-purple"
                />
                {form.images.length > 1 && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => handleRemoveImage(index)}
                    className="h-10 w-10"
                  >
                    &times;
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="is_popular" 
              checked={form.is_popular} 
              onChange={(e) => setForm(prev => ({ ...prev, is_popular: e.target.checked }))} 
              className="mr-2 h-4 w-4 accent-pet-purple"
            />
            <Label htmlFor="is_popular" className="cursor-pointer">Mark as Popular</Label>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-pet-purple text-pet-purple hover:bg-pet-purple/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-pet-purple hover:bg-pet-purple-dark text-white"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPetModal;
