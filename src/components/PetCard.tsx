
import { Link } from "react-router-dom";
import { Pet } from "@/types/pet";
import { Heart, Eye } from "lucide-react";
import { usePets } from "@/context/PetContext";
import { Badge } from "@/components/ui/badge";
import PetRating from "./PetRating";
import { formatCurrency } from "@/lib/utils";

const getEmotionEmoji = (emotion: string) => {
  switch (emotion) {
    case "Happy": return "😄";
    case "Sleepy": return "😴";
    case "Excited": return "🤩";
    case "Playful": return "🎮";
    case "Curious": return "🧐";
    case "Hungry": return "🍖";
    default: return "😊";
  }
};

const PetCard = ({ pet }: { pet: Pet }) => {
  const { togglePetFavorite } = usePets();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    togglePetFavorite(pet.id);
  };

  return (
    <div className="pet-card group">
      <div className="relative">
        <Link to={`/pet/${pet.id}`} className="block">
          <div className="overflow-hidden h-48 sm:h-56">
            <img 
              src={pet.images[0]} 
              alt={pet.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {pet.emotion && (
            <div className="emotion-badge flex items-center gap-1">
              <span>{pet.emotion}</span>
              <span className="text-base">{getEmotionEmoji(pet.emotion)}</span>
            </div>
          )}
          
          <button 
            onClick={handleFavoriteToggle}
            className="absolute top-4 right-4 p-2 bg-pet-dark/60 backdrop-blur-sm rounded-full hover:bg-pet-dark/80 transition-colors duration-300"
          >
            <Heart 
              className={`h-5 w-5 ${pet.isFavorite ? 'text-red-400 fill-red-400' : 'text-white'}`}
            />
          </button>
        </Link>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white">{pet.name}</h3>
          <Badge variant="outline" className="bg-pet-purple/10 text-pet-purple border-pet-purple/30">
            {pet.type}
          </Badge>
        </div>
        
        <div className="mb-2">
          <PetRating rating={pet.rating || 4} />
        </div>
        
        <p className="text-gray-300 text-sm line-clamp-2 mb-3">
          {pet.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-pet-purple">{formatCurrency(pet.price)}</span>
          <Link 
            to={`/pet/${pet.id}`} 
            className="inline-flex items-center text-white bg-pet-purple/90 hover:bg-pet-purple transition-colors px-3 py-1 rounded-full text-sm"
          >
            <Eye className="mr-1 h-4 w-4" /> View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
