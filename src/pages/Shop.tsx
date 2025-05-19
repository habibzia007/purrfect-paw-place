
import { useState } from "react";
import { usePets } from "@/context/PetContext";
import PetCard from "@/components/PetCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import AddPetModal from "@/components/AddPetModal";
import { PetType } from "@/types/pet";

const Shop = () => {
  const { pets, loading } = usePets();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const filteredPets = pets.filter(pet => {
    // Apply type filter
    if (filterType !== "all" && pet.type !== filterType) {
      return false;
    }
    
    // Apply search filter (case insensitive)
    const searchLower = searchTerm.toLowerCase();
    return (
      pet.name.toLowerCase().includes(searchLower) ||
      pet.breed.toLowerCase().includes(searchLower) ||
      pet.description.toLowerCase().includes(searchLower)
    );
  });
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-pet-dark py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Pet <span className="text-pet-purple">Shop</span></h1>
          
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="pet-button"
          >
            <Plus className="h-5 w-5" />
            <span>Add Pet</span>
          </button>
        </div>
        
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                className="pl-10 bg-secondary border-pet-purple/20 focus:border-pet-purple"
                placeholder="Search pets by name, breed, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Select 
              value={filterType} 
              onValueChange={setFilterType}
            >
              <SelectTrigger className="bg-secondary border-pet-purple/20 focus:border-pet-purple">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-pet-dark border-pet-purple/20">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Dog">Dogs</SelectItem>
                <SelectItem value="Cat">Cats</SelectItem>
                <SelectItem value="Bird">Birds</SelectItem>
                <SelectItem value="Rabbit">Rabbits</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="pet-card">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPets.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {filteredPets.map(pet => (
              <motion.div key={pet.id} variants={item}>
                <PetCard pet={pet} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="text-2xl font-medium text-white mb-2">No pets found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
      
      <AddPetModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default Shop;
