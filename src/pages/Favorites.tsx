
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFavorites } from "@/services/petService";
import { Pet } from "@/types/pet";
import PetCard from "@/components/PetCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const favoriteData = await getFavorites();
        setFavorites(favoriteData);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, []);
  
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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center">
            Your <span className="text-pet-purple mx-2">Favorites</span> 
            <Heart className="h-6 w-6 text-pet-purple" fill="#9b87f5" />
          </h1>
          <p className="text-gray-300 mt-2">Pets you've marked as favorites</p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
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
        ) : favorites.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {favorites.map(pet => (
              <motion.div key={pet.id} variants={item}>
                <PetCard pet={pet} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="text-8xl mb-6">💔</div>
            <h3 className="text-2xl font-medium text-white mb-3">No favorites yet</h3>
            <p className="text-gray-400 mb-6">
              Start adding pets to your favorites list
            </p>
            <Button 
              onClick={() => navigate("/shop")} 
              className="bg-pet-purple hover:bg-pet-purple-dark text-white"
            >
              Browse Pets
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
