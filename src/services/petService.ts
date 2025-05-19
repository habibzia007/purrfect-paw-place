import { Pet, PetEmotion } from "../types/pet";

// Initial pets data
const emotions: PetEmotion[] = ["Happy", "Sleepy", "Excited", "Playful", "Curious", "Hungry"];

const getRandomEmotion = (): PetEmotion => {
  const randomIndex = Math.floor(Math.random() * emotions.length);
  return emotions[randomIndex];
};

let petsData: Pet[] = [
  {
    id: 1,
    name: "Bella",
    type: "Dog",
    breed: "Golden Retriever",
    color: "#FFD700",
    age: "2 years",
    price: 30000,
    description: "A friendly and loyal golden retriever, perfect for families. Bella loves to play fetch and is great with children. She's fully trained and has all her vaccinations.",
    images: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?q=80&w=1000&auto=format&fit=crop"
    ],
    is_popular: true,
    emotion: getRandomEmotion(),
    rating: 4.8,
    isFavorite: false
  },
  {
    id: 2,
    name: "Milo",
    type: "Cat",
    breed: "Persian",
    color: "#D2B48C",
    age: "1 year",
    price: 18000,
    description: "An elegant Persian cat with soft fur and calm personality. Milo is house-trained and loves to cuddle. He's good with other pets and enjoys quiet environments.",
    images: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1000&auto=format&fit=crop"
    ],
    is_popular: true,
    emotion: getRandomEmotion(),
    rating: 4.6,
    isFavorite: true
  },
  {
    id: 3,
    name: "Chirpy",
    type: "Bird",
    breed: "Budgerigar",
    color: "#90EE90",
    age: "6 months",
    price: 5000,
    description: "A playful budgie that sings and brings joy. Chirpy has beautiful plumage and can learn to mimic sounds. Comes with a spacious cage and starter food kit.",
    images: [
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544923408-75c5cef46f14?q=80&w=1000&auto=format&fit=crop"
    ],
    is_popular: false,
    emotion: getRandomEmotion(),
    rating: 4.3,
    isFavorite: false
  },
  {
    id: 4,
    name: "Thumper",
    type: "Rabbit",
    breed: "Netherland Dwarf",
    color: "#FFFFFF",
    age: "4 months",
    price: 8000,
    description: "A small white rabbit, great for children and homes. Thumper is adorable and loves to hop around. Very clean and comes with a starter hutch setup.",
    images: [
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535241749838-299277b6305f?q=80&w=1000&auto=format&fit=crop"
    ],
    is_popular: true,
    emotion: getRandomEmotion(),
    rating: 4.5,
    isFavorite: false
  },
  {
    id: 5,
    name: "Max",
    type: "Dog",
    breed: "German Shepherd",
    color: "#A0522D",
    age: "3 years",
    price: 35000,
    description: "A protective and highly intelligent German shepherd. Max is well-trained and excellent as a guard dog. He's loyal, alert, and good with families.",
    images: [
      "https://images.unsplash.com/photo-1589941013453-ec89f98c6e8e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=1000&auto=format&fit=crop"
    ],
    is_popular: false,
    emotion: getRandomEmotion(),
    rating: 4.7,
    isFavorite: true
  },
  {
    id: 6,
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    color: "#E8DAEF",
    age: "8 months",
    price: 22000,
    description: "A beautiful Siamese cat with striking blue eyes. Luna is playful, vocal, and forms strong bonds with her owners. She's litter-trained and very clean.",
    images: [
      "https://images.unsplash.com/photo-1569591159212-b02241bce9c2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618189063538-7eb83017be47?q=80&w=1000&auto=format&fit=crop"
    ],
    is_popular: true,
    emotion: getRandomEmotion(),
    rating: 4.9,
    isFavorite: false
  },
  {
    id: 7,
    name: "Rio",
    type: "Bird",
    breed: "Parrot",
    color: "#FF5733",
    age: "1 year",
    price: 12000,
    description: "A colorful parrot with the ability to learn words. Rio is intelligent and social, bringing vibrant energy to any home. Includes training resources.",
    images: [
      "https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604826875118-78378601bc78?q=80&w=1000&auto=format&fit=crop"
    ],
    is_popular: false,
    emotion: getRandomEmotion(),
    rating: 4.2,
    isFavorite: true
  },
  {
    id: 8,
    name: "Oreo",
    type: "Rabbit",
    breed: "Dutch",
    color: "#000000",
    age: "7 months",
    price: 7500,
    description: "A black and white Dutch rabbit with a friendly disposition. Oreo is gentle, easy to handle, and makes a wonderful first pet for responsible children.",
    images: [
      "https://images.unsplash.com/photo-1583301286816-f4f05e1e8b25?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517129572668-5bee7a1a5f1f?q=80&w=1000&auto=format&fit=crop"
    ],
    is_popular: true,
    emotion: getRandomEmotion(),
    rating: 4.4,
    isFavorite: false
  }
];

// Get all pets
export const getAllPets = (): Promise<Pet[]> => {
  return new Promise((resolve) => {
    // Add random emotions to pets that don't have one
    const petsWithEmotions = petsData.map(pet => ({
      ...pet,
      emotion: pet.emotion || getRandomEmotion()
    }));
    
    setTimeout(() => {
      resolve(petsWithEmotions);
    }, 500); // Simulate network delay
  });
};

// Get popular pets
export const getPopularPets = (): Promise<Pet[]> => {
  return new Promise((resolve) => {
    const popularPets = petsData.filter(pet => pet.is_popular);
    setTimeout(() => {
      resolve(popularPets);
    }, 500);
  });
};

// Get random featured pets (3)
export const getRandomStars = (): Promise<Pet[]> => {
  return new Promise((resolve) => {
    // Shuffle array and get first 3
    const shuffled = [...petsData].sort(() => 0.5 - Math.random());
    const randomStars = shuffled.slice(0, 3);
    
    setTimeout(() => {
      resolve(randomStars);
    }, 500);
  });
};

// Get pet by ID
export const getPetById = (id: number): Promise<Pet | undefined> => {
  return new Promise((resolve) => {
    const pet = petsData.find(p => p.id === id);
    setTimeout(() => {
      resolve(pet);
    }, 300);
  });
};

// Add new pet
export const addPet = (pet: Omit<Pet, 'id' | 'emotion' | 'rating' | 'isFavorite'>): Promise<Pet> => {
  return new Promise((resolve) => {
    const newId = Math.max(...petsData.map(p => p.id)) + 1;
    const newPet: Pet = {
      ...pet,
      id: newId,
      emotion: getRandomEmotion(),
      rating: 4.0,
      isFavorite: false
    };
    
    petsData = [...petsData, newPet];
    
    setTimeout(() => {
      resolve(newPet);
    }, 600);
  });
};

// Update pet
export const updatePet = (id: number, petData: Partial<Pet>): Promise<Pet | undefined> => {
  return new Promise((resolve) => {
    const index = petsData.findIndex(p => p.id === id);
    
    if (index !== -1) {
      // Keep the existing emotion if not provided
      if (!petData.emotion) {
        petData.emotion = petsData[index].emotion;
      }
      
      petsData[index] = { ...petsData[index], ...petData };
      setTimeout(() => {
        resolve(petsData[index]);
      }, 600);
    } else {
      setTimeout(() => {
        resolve(undefined);
      }, 600);
    }
  });
};

// Delete pet
export const deletePet = (id: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const index = petsData.findIndex(p => p.id === id);
    
    if (index !== -1) {
      petsData = petsData.filter(p => p.id !== id);
      setTimeout(() => {
        resolve(true);
      }, 600);
    } else {
      setTimeout(() => {
        resolve(false);
      }, 600);
    }
  });
};

// Toggle favorite
export const toggleFavorite = (id: number): Promise<Pet | undefined> => {
  return new Promise((resolve) => {
    const index = petsData.findIndex(p => p.id === id);
    
    if (index !== -1) {
      petsData[index] = { 
        ...petsData[index], 
        isFavorite: !petsData[index].isFavorite 
      };
      
      setTimeout(() => {
        resolve(petsData[index]);
      }, 300);
    } else {
      setTimeout(() => {
        resolve(undefined);
      }, 300);
    }
  });
};

// Get favorites
export const getFavorites = (): Promise<Pet[]> => {
  return new Promise((resolve) => {
    const favorites = petsData.filter(pet => pet.isFavorite);
    setTimeout(() => {
      resolve(favorites);
    }, 500);
  });
};
