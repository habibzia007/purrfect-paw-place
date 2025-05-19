
const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Get all pets
router.get('/', petController.getAllPets);

// Get popular pets
router.get('/popular', petController.getPopularPets);

// Get random stars (featured pets)
router.get('/stars', petController.getRandomStars);

// Get pet by ID
router.get('/:id', petController.getPetById);

// Add new pet
router.post('/', petController.addPet);

// Update pet
router.put('/:id', petController.updatePet);

// Delete pet
router.delete('/:id', petController.deletePet);

// Toggle favorite status
router.patch('/:id/favorite', petController.toggleFavorite);

module.exports = router;
