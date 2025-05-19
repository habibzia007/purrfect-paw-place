
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Pet } from "../types/pet";
import { getAllPets, addPet, updatePet, deletePet, toggleFavorite } from "../services/petService";
import { useToast } from "@/hooks/use-toast";

interface PetContextType {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  addNewPet: (pet: Omit<Pet, 'id' | 'emotion' | 'rating' | 'isFavorite'>) => Promise<void>;
  updateExistingPet: (id: number, pet: Partial<Pet>) => Promise<void>;
  deleteExistingPet: (id: number) => Promise<boolean>;
  togglePetFavorite: (id: number) => Promise<void>;
  refreshPets: () => Promise<void>;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: ReactNode }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getAllPets();
      setPets(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching pets:", err);
      setError("Failed to fetch pets. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to fetch pets. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const addNewPet = async (pet: Omit<Pet, 'id' | 'emotion' | 'rating' | 'isFavorite'>) => {
    try {
      const newPet = await addPet(pet);
      setPets([...pets, newPet]);
      toast({
        title: "Success!",
        description: `${newPet.name} has been added to the shop.`,
      });
    } catch (err) {
      console.error("Error adding pet:", err);
      toast({
        title: "Error",
        description: "Failed to add pet. Please try again.",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateExistingPet = async (id: number, petData: Partial<Pet>) => {
    try {
      const updatedPet = await updatePet(id, petData);
      if (updatedPet) {
        setPets(pets.map(p => p.id === id ? updatedPet : p));
        toast({
          title: "Updated!",
          description: `${updatedPet.name}'s information has been updated.`,
        });
      }
    } catch (err) {
      console.error("Error updating pet:", err);
      toast({
        title: "Error",
        description: "Failed to update pet information.",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteExistingPet = async (id: number): Promise<boolean> => {
    try {
      const success = await deletePet(id);
      if (success) {
        setPets(pets.filter(p => p.id !== id));
        toast({
          title: "Deleted",
          description: "Pet has been removed from the shop.",
        });
      }
      return success;
    } catch (err) {
      console.error("Error deleting pet:", err);
      toast({
        title: "Error",
        description: "Failed to delete pet.",
        variant: "destructive",
      });
      throw err;
    }
  };

  const togglePetFavorite = async (id: number) => {
    try {
      const updatedPet = await toggleFavorite(id);
      if (updatedPet) {
        setPets(pets.map(p => p.id === id ? updatedPet : p));
        toast({
          title: updatedPet.isFavorite ? "Added to Favorites" : "Removed from Favorites",
          description: `${updatedPet.name} has been ${updatedPet.isFavorite ? "added to" : "removed from"} your favorites.`,
        });
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      toast({
        title: "Error",
        description: "Failed to update favorites.",
        variant: "destructive",
      });
    }
  };

  const refreshPets = async () => {
    await fetchPets();
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        loading,
        error,
        addNewPet,
        updateExistingPet,
        deleteExistingPet,
        togglePetFavorite,
        refreshPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePets = () => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error("usePets must be used within a PetProvider");
  }
  return context;
};
