
import { useState, useEffect } from "react";
import { getRandomStars } from "@/services/petService";
import { Pet } from "@/types/pet";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { usePets } from "@/context/PetContext";

const petVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    }
  })
};

const StarPets = () => {
  const [stars, setStars] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const { togglePetFavorite } = usePets();
  
  useEffect(() => {
    const fetchStars = async () => {
      try {
        const randomStars = await getRandomStars();
        setStars(randomStars);
      } catch (error) {
        console.error("Error fetching star pets:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStars();
  }, []);
  
  const handleFavoriteToggle = (e: React.MouseEvent, petId: number) => {
    e.preventDefault();
    e.stopPropagation();
    togglePetFavorite(petId);
  };
  
  const getEmotionAnimation = (emotion: string) => {
    switch(emotion) {
      case 'Excited': return 'animate-bounce-small';
      case 'Playful': return 'animate-wiggle';
      case 'Happy': return 'animate-pulse';
      default: return '';
    }
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-pet-dark to-[#191d29]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet Our <span className="text-pet-purple">Stars</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            These adorable pets are the stars of our shop! Each time you visit, we showcase different pets with unique personalities.
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-secondary">
                <Skeleton className="h-64 w-full" />
                <div className="p-6">
                  <Skeleton className="h-7 w-36 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-10 w-32 rounded-full mx-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {stars.map((pet, index) => (
              <motion.div
                key={pet.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={petVariants}
                className="rounded-xl overflow-hidden bg-secondary border border-pet-purple/20 shadow-xl"
              >
                <div className="relative">
                  <Link to={`/pet/${pet.id}`}>
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={pet.images[0]} 
                        alt={pet.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  </Link>
                  
                  <button 
                    onClick={(e) => handleFavoriteToggle(e, pet.id)}
                    className="absolute top-4 right-4 p-2 bg-pet-dark/60 backdrop-blur-sm rounded-full hover:bg-pet-dark/80 transition-colors duration-300"
                  >
                    <Heart 
                      className={`h-5 w-5 ${pet.isFavorite ? 'text-red-400 fill-red-400' : 'text-white'}`}
                    />
                  </button>
                </div>
                
                <div className="p-6 text-center">
                  <div className={`inline-block mb-4 ${getEmotionAnimation(pet.emotion || '')}`}>
                    <div className="text-4xl">
                      {pet.type === 'Dog' && '🐶'}
                      {pet.type === 'Cat' && '🐱'}
                      {pet.type === 'Bird' && '🐦'}
                      {pet.type === 'Rabbit' && '🐰'}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{pet.name}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{pet.breed} · {pet.age}</p>
                  
                  <Link 
                    to={`/pet/${pet.id}`}
                    className="paw-button inline-block"
                  >
                    <span className="absolute inset-0 w-full h-full"></span>
                    <span className="paw-button-inner"></span>
                    <span className="relative text-white">Meet {pet.name}</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StarPets;
