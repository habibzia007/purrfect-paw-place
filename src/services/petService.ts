
import { Pet } from '../types/pet';

// Dummy data for development
const dummyPets: Pet[] = [
  {
    id: 1,
    name: 'Bella',
    type: 'Dog',
    breed: 'Golden Retriever',
    color: '#FFD700',
    age: '2 years',
    price: 30000.00,
    description: 'A friendly and loyal golden retriever, perfect for families.',
    images: ['https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg', 'https://cdn.pixabay.com/photo/2018/08/28/12/41/golden-retriever-3636983_1280.jpg'],
    emotion: 'Happy',
    rating: 4.7,
    isFavorite: false
  },
  {
    id: 2,
    name: 'Milo',
    type: 'Cat',
    breed: 'Persian',
    color: '#D2B48C',
    age: '1 year',
    price: 18000.00,
    description: 'An elegant Persian cat with soft fur and calm personality.',
    images: ['https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg', 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934723_1280.jpg'],
    emotion: 'Sleepy',
    rating: 4.3,
    isFavorite: false
  },
  {
    id: 3,
    name: 'Rocky',
    type: 'Dog',
    breed: 'Bulldog',
    color: '#8B4513',
    age: '3 years',
    price: 25000.00,
    description: 'A strong and protective bulldog with a heart of gold.',
    images: ['https://cdn.pixabay.com/photo/2015/11/17/13/13/bulldog-1047518_1280.jpg', 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg'],
    emotion: 'Playful',
    rating: 4.5,
    isFavorite: false
  },
  {
    id: 4,
    name: 'Luna',
    type: 'Cat',
    breed: 'Siamese',
    color: '#E8DCD0',
    age: '1.5 years',
    price: 20000.00,
    description: 'A vocal and intelligent Siamese cat with striking blue eyes.',
    images: ['https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg', 'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189_1280.jpg'],
    emotion: 'Curious',
    rating: 4.6,
    isFavorite: true
  },
  {
    id: 5,
    name: 'Charlie',
    type: 'Dog',
    breed: 'Beagle',
    color: '#8B4513',
    age: '2 years',
    price: 22000.00,
    description: 'An adventurous beagle with an excellent sense of smell.',
    images: ['https://cdn.pixabay.com/photo/2019/08/19/07/45/dog-4415649_1280.jpg', 'https://cdn.pixabay.com/photo/2016/01/05/17/51/dog-1123016_1280.jpg'],
    emotion: 'Excited',
    rating: 4.4,
    isFavorite: false
  },
  {
    id: 6,
    name: 'Leo',
    type: 'Cat',
    breed: 'Maine Coon',
    color: '#A0522D',
    age: '3 years',
    price: 28000.00,
    description: 'A majestic Maine Coon with a fluffy coat and friendly demeanor.',
    images: ['https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_1280.jpg', 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg'],
    emotion: 'Sleepy',
    rating: 4.8,
    isFavorite: false
  },
  {
    id: 7,
    name: 'Max',
    type: 'Dog',
    breed: 'German Shepherd',
    color: '#A0522D',
    age: '3 years',
    price: 35000.00,
    description: 'A protective and highly intelligent German shepherd.',
    images: ['https://cdn.pixabay.com/photo/2018/02/21/17/53/german-shepherd-3162360_1280.jpg', 'https://cdn.pixabay.com/photo/2020/11/30/17/03/german-shepherd-5792271_1280.jpg'],
    emotion: 'Playful',
    rating: 4.8,
    isFavorite: false
  },
  {
    id: 8,
    name: 'Daisy',
    type: 'Dog',
    breed: 'Dachshund',
    color: '#D2691E',
    age: '1 year',
    price: 18000.00,
    description: 'A curious and brave dachshund, perfect for apartment living.',
    images: ['https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_1280.jpg', 'https://cdn.pixabay.com/photo/2017/09/25/13/14/dog-2785077_1280.jpg'],
    emotion: 'Happy',
    rating: 4.2,
    isFavorite: true
  },
  {
    id: 9,
    name: 'Oliver',
    type: 'Cat',
    breed: 'British Shorthair',
    color: '#808080',
    age: '2 years',
    price: 22000.00,
    description: 'A laid-back British Shorthair with a plush coat and calm temperament.',
    images: ['https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg', 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg'],
    emotion: 'Sleepy',
    rating: 4.3,
    isFavorite: false
  },
  {
    id: 10,
    name: 'Chloe',
    type: 'Cat',
    breed: 'Ragdoll',
    color: '#F5F5DC',
    age: '1 year',
    price: 24000.00,
    description: 'A gentle Ragdoll cat that loves to be held and cuddled.',
    images: ['https://cdn.pixabay.com/photo/2017/02/15/12/12/cat-2068462_1280.jpg', 'https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg'],
    emotion: 'Relaxed',
    rating: 4.7,
    isFavorite: false
  }
];

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all pets
export const getAllPets = async (): Promise<Pet[]> => {
  await delay(500); // Simulate network delay
  return [...dummyPets];
};

// Get popular pets
export const getPopularPets = async (): Promise<Pet[]> => {
  await delay(300); // Simulate network delay
  return dummyPets.filter((pet, index) => index % 3 === 0 || pet.id === 2 || pet.id === 4);
};

// Get random stars
export const getRandomStars = async (): Promise<Pet[]> => {
  await delay(400); // Simulate network delay
  const shuffled = [...dummyPets].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

// Get pet by id
export const getPetById = async (id: number): Promise<Pet> => {
  await delay(200); // Simulate network delay
  const pet = dummyPets.find(pet => pet.id === id);
  if (!pet) {
    throw new Error(`Pet with id ${id} not found`);
  }
  return { ...pet };
};

// Get favorites
export const getFavorites = async (): Promise<Pet[]> => {
  await delay(300); // Simulate network delay
  return dummyPets.filter(pet => pet.isFavorite);
};

// Add new pet
export const addPet = async (pet: Omit<Pet, 'id' | 'emotion' | 'rating' | 'isFavorite'>): Promise<Pet> => {
  await delay(600); // Simulate network delay
  
  // Generate a new pet with additional properties
  const emotions = ["Happy", "Sleepy", "Excited", "Playful", "Curious", "Hungry"];
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  const randomRating = Number((Math.random() * 2 + 3).toFixed(1)); // Random number between 3 and 5
  
  const newPet: Pet = {
    ...pet,
    id: Math.max(...dummyPets.map(p => p.id)) + 1,
    emotion: randomEmotion,
    rating: randomRating,
    isFavorite: false
  };
  
  dummyPets.push(newPet);
  return { ...newPet };
};

// Update pet
export const updatePet = async (id: number, pet: Partial<Pet>): Promise<Pet> => {
  await delay(400); // Simulate network delay
  
  const index = dummyPets.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error(`Pet with id ${id} not found`);
  }
  
  dummyPets[index] = { ...dummyPets[index], ...pet };
  return { ...dummyPets[index] };
};

// Delete pet
export const deletePet = async (id: number): Promise<boolean> => {
  await delay(500); // Simulate network delay
  
  const index = dummyPets.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error(`Pet with id ${id} not found`);
  }
  
  dummyPets.splice(index, 1);
  return true;
};

// Toggle favorite
export const toggleFavorite = async (id: number): Promise<Pet> => {
  await delay(300); // Simulate network delay
  
  const index = dummyPets.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error(`Pet with id ${id} not found`);
  }
  
  dummyPets[index].isFavorite = !dummyPets[index].isFavorite;
  return { ...dummyPets[index] };
};
