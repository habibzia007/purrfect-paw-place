
import Hero from "@/components/Hero";
import PetCarousel from "@/components/PetCarousel";
import StarPets from "@/components/StarPets";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddPetModal from "@/components/AddPetModal";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const Index = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen bg-pet-dark"
    >
      <Hero />
      <PetCarousel />
      <StarPets />
      
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="floating-button"
        aria-label="Add new pet"
      >
        <Plus className="h-6 w-6" />
      </button>
      
      <AddPetModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </motion.div>
  );
};

export default Index;
