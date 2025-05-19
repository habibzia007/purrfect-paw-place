
export type PetEmotion = "Happy" | "Sleepy" | "Excited" | "Playful" | "Curious" | "Hungry";

export type PetType = "Dog" | "Cat" | "Bird" | "Rabbit";

export interface Pet {
  id: number;
  name: string;
  type: PetType;
  breed: string;
  color: string;
  age: string;
  price: number;
  description: string;
  images: string[];
  is_popular: boolean;
  emotion?: PetEmotion;
  rating?: number;
  isFavorite?: boolean;
}
