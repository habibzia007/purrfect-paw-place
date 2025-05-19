
import { useState, useEffect } from "react";
import { getPopularPets } from "@/services/petService";
import { Pet } from "@/types/pet";
import PetCard from "./PetCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PetCarousel = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const fetchPopularPets = async () => {
      try {
        const popularPets = await getPopularPets();
        setPets(popularPets);
      } catch (error) {
        console.error("Error fetching popular pets:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPopularPets();
  }, []);
  
  useEffect(() => {
    // Auto-advance the carousel
    if (pets.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(pets.length / 3));
    }, 5000);
    
    return () => clearInterval(timer);
  }, [pets]);
  
  const goToNext = () => {
    if (pets.length <= 3) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(pets.length / 3));
  };
  
  const goToPrev = () => {
    if (pets.length <= 3) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.ceil(pets.length / 3) - 1 : prevIndex - 1
    );
  };
  
  // Calculate visible pets based on currentIndex
  const visiblePets = () => {
    const petsPerPage = 3;
    const start = currentIndex * petsPerPage;
    return pets.slice(start, start + petsPerPage);
  };
  
  return (
    <section className="py-12 bg-pet-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Popular <span className="text-pet-purple">Pets</span>
          </h2>
          
          {pets.length > 3 && (
            <div className="flex space-x-2">
              <button 
                onClick={goToPrev}
                className="p-2 rounded-full bg-pet-purple/20 hover:bg-pet-purple/40 transition-colors"
                aria-label="Previous pets"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button 
                onClick={goToNext}
                className="p-2 rounded-full bg-pet-purple/20 hover:bg-pet-purple/40 transition-colors"
                aria-label="Next pets"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visiblePets().map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PetCarousel;
