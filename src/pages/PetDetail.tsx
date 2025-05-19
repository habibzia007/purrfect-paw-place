
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePets } from "@/context/PetContext";
import { getPetById } from "@/services/petService";
import { Pet } from "@/types/pet";
import { formatCurrency, getEmotionEmoji } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import PetRating from "@/components/PetRating";
import { motion } from "framer-motion";
import EditPetModal from "@/components/EditPetModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { togglePetFavorite, deleteExistingPet } = usePets();
  
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  useEffect(() => {
    const fetchPet = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const petData = await getPetById(parseInt(id));
        if (petData) {
          setPet(petData);
        } else {
          navigate("/shop", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching pet details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPet();
  }, [id, navigate]);
  
  const handleFavoriteToggle = () => {
    if (pet) {
      togglePetFavorite(pet.id);
      setPet(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };
  
  const handleDelete = async () => {
    if (pet) {
      const success = await deleteExistingPet(pet.id);
      if (success) {
        navigate("/shop", { replace: true });
      }
    }
    setIsDeleteDialogOpen(false);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-pet-dark py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-80 w-full rounded-lg mb-4" />
              <div className="flex gap-2 mt-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-20 w-20 rounded" />
                ))}
              </div>
            </div>
            
            <div>
              <Skeleton className="h-10 w-40 mb-4" />
              <Skeleton className="h-6 w-32 mb-6" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <Skeleton className="h-8 w-32 mb-8" />
              <div className="flex gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!pet) {
    return (
      <div className="min-h-screen bg-pet-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🙀</div>
          <h2 className="text-2xl font-bold text-white mb-2">Pet Not Found</h2>
          <p className="text-gray-400 mb-6">We couldn't find the pet you're looking for.</p>
          <Button onClick={() => navigate("/shop")} className="bg-pet-purple hover:bg-pet-purple-dark">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="min-h-screen bg-pet-dark py-8 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-300 hover:text-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <div className="relative rounded-lg overflow-hidden mb-4 border border-pet-purple/20">
              <img 
                src={pet.images[activeImage]} 
                alt={pet.name} 
                className="w-full h-80 object-cover"
              />
              
              {pet.emotion && (
                <div className="emotion-badge text-base">
                  <span>{pet.emotion}</span>
                  <span className="ml-1">{getEmotionEmoji(pet.emotion)}</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-2">
              {pet.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`h-20 w-20 rounded overflow-hidden border-2 transition-all ${
                    activeImage === index ? 'border-pet-purple' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${pet.name} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-bold text-white">{pet.name}</h1>
              <Badge variant="outline" className="bg-pet-purple/10 text-pet-purple border-pet-purple/30">
                {pet.type}
              </Badge>
            </div>
            
            <div className="text-lg text-gray-300 mb-2">{pet.breed}</div>
            
            <div className="mb-4">
              <PetRating rating={pet.rating || 4} size="md" />
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4 mb-6 border border-pet-purple/10">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <span className="text-gray-400 text-sm">Age:</span>
                  <p className="text-white">{pet.age}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Color:</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-4 w-4 rounded-full" 
                      style={{ backgroundColor: pet.color }}
                    ></div>
                    <span className="text-white">{pet.color}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-2">About {pet.name}</h3>
              <p className="text-gray-300">{pet.description}</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 mt-auto">
              <div className="text-2xl font-bold text-pet-purple self-center md:mr-auto">
                {formatCurrency(pet.price)}
              </div>
              
              <Button
                variant="outline"
                onClick={handleFavoriteToggle}
                className={`border-pet-purple ${pet.isFavorite ? 'bg-pet-purple/10 text-pet-purple' : 'text-pet-purple hover:bg-pet-purple/10'}`}
              >
                <Heart 
                  className={`mr-2 h-5 w-5 ${pet.isFavorite ? 'fill-pet-purple' : ''}`} 
                />
                {pet.isFavorite ? 'Favorited' : 'Add to Favorites'}
              </Button>
              
              <Button
                onClick={() => setIsEditModalOpen(true)}
                className="bg-pet-purple hover:bg-pet-purple-dark text-white"
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Edit Modal */}
      {pet && (
        <EditPetModal
          pet={pet}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={(updatedPet) => setPet(updatedPet)}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-secondary text-white border-pet-purple/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete {pet.name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {pet.name} from the shop.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-pet-purple text-pet-purple hover:bg-pet-purple/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default PetDetail;
