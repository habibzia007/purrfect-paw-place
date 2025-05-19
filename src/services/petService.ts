import axios from 'axios';
import { Pet } from '../types/pet';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all pets
export const getAllPets = async (): Promise<Pet[]> => {
  try {
    const response = await api.get('/pets');
    return response.data;
  } catch (error) {
    console.error('Error fetching all pets:', error);
    throw error;
  }
};

// Get popular pets
export const getPopularPets = async (): Promise<Pet[]> => {
  try {
    const response = await api.get('/pets/popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular pets:', error);
    throw error;
  }
};

// Get random stars
export const getRandomStars = async (): Promise<Pet[]> => {
  try {
    const response = await api.get('/pets/stars');
    return response.data;
  } catch (error) {
    console.error('Error fetching star pets:', error);
    throw error;
  }
};

// Get pet by id
export const getPetById = async (id: number): Promise<Pet> => {
  try {
    const response = await api.get(`/pets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pet ${id}:`, error);
    throw error;
  }
};

// Get favorites
export const getFavorites = async (): Promise<Pet[]> => {
  try {
    const response = await api.get('/pets/favorites');
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite pets:', error);
    throw error;
  }
};

// Add new pet
export const addPet = async (pet: Omit<Pet, 'id' | 'emotion' | 'rating' | 'isFavorite'>): Promise<Pet> => {
  try {
    const response = await api.post('/pets', pet);
    return response.data;
  } catch (error) {
    console.error('Error adding pet:', error);
    throw error;
  }
};

// Update pet
export const updatePet = async (id: number, pet: Partial<Pet>): Promise<Pet> => {
  try {
    const response = await api.put(`/pets/${id}`, pet);
    return response.data;
  } catch (error) {
    console.error(`Error updating pet ${id}:`, error);
    throw error;
  }
};

// Delete pet
export const deletePet = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/pets/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting pet ${id}:`, error);
    throw error;
  }
};

// Toggle favorite
export const toggleFavorite = async (id: number): Promise<Pet> => {
  try {
    const response = await api.patch(`/pets/${id}/favorite`);
    return response.data;
  } catch (error) {
    console.error(`Error toggling favorite for pet ${id}:`, error);
    throw error;
  }
};
