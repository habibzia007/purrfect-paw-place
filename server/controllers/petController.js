
const db = require('../config/database');

// Get all pets
exports.getAllPets = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pets');
    
    // Parse images from JSON to array
    const pets = rows.map(pet => ({
      ...pet,
      images: JSON.parse(pet.images),
      isFavorite: !!pet.is_favorite
    }));
    
    res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ message: 'Server error while fetching pets' });
  }
};

// Get popular pets
exports.getPopularPets = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pets WHERE is_popular = true LIMIT 6');
    
    // Parse images from JSON to array
    const pets = rows.map(pet => ({
      ...pet,
      images: JSON.parse(pet.images),
      isFavorite: !!pet.is_favorite
    }));
    
    res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching popular pets:', error);
    res.status(500).json({ message: 'Server error while fetching popular pets' });
  }
};

// Get random stars (featured pets)
exports.getRandomStars = async (req, res) => {
  try {
    // Get 3 random pets
    const [rows] = await db.query('SELECT * FROM pets ORDER BY RAND() LIMIT 3');
    
    // Parse images from JSON to array
    const pets = rows.map(pet => ({
      ...pet,
      images: JSON.parse(pet.images),
      isFavorite: !!pet.is_favorite
    }));
    
    res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching star pets:', error);
    res.status(500).json({ message: 'Server error while fetching star pets' });
  }
};

// Get pet by id
exports.getPetById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    // Parse images from JSON to array
    const pet = {
      ...rows[0],
      images: JSON.parse(rows[0].images),
      isFavorite: !!rows[0].is_favorite
    };
    
    res.status(200).json(pet);
  } catch (error) {
    console.error('Error fetching pet by id:', error);
    res.status(500).json({ message: 'Server error while fetching pet' });
  }
};

// Add new pet
exports.addPet = async (req, res) => {
  const { name, type, breed, color, age, price, description, images, is_popular } = req.body;
  
  // Validate required fields
  if (!name || !type || !breed || !age || !price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  try {
    // Convert images array to JSON string
    const imagesJson = JSON.stringify(images);
    
    // Generate a random emotion and rating
    const emotions = ["Happy", "Sleepy", "Excited", "Playful", "Curious", "Hungry"];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const randomRating = (Math.random() * 2 + 3).toFixed(1); // Random number between 3 and 5
    
    const [result] = await db.query(
      'INSERT INTO pets (name, type, breed, color, age, price, description, images, is_popular, emotion, rating, is_favorite) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, type, breed, color, age, price, description, imagesJson, is_popular || false, randomEmotion, randomRating, false]
    );
    
    if (result.affectedRows === 1) {
      // Get the newly created pet
      const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [result.insertId]);
      
      // Parse images from JSON to array
      const newPet = {
        ...rows[0],
        images: JSON.parse(rows[0].images),
        isFavorite: !!rows[0].is_favorite
      };
      
      res.status(201).json(newPet);
    } else {
      res.status(500).json({ message: 'Failed to add pet' });
    }
  } catch (error) {
    console.error('Error adding pet:', error);
    res.status(500).json({ message: 'Server error while adding pet' });
  }
};

// Update pet
exports.updatePet = async (req, res) => {
  const { id } = req.params;
  const { name, type, breed, color, age, price, description, images, is_popular, emotion, rating } = req.body;
  
  try {
    // Check if pet exists
    const [existingPet] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
    
    if (existingPet.length === 0) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    // Prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (type) updateData.type = type;
    if (breed) updateData.breed = breed;
    if (color) updateData.color = color;
    if (age) updateData.age = age;
    if (price) updateData.price = price;
    if (description) updateData.description = description;
    if (images) updateData.images = JSON.stringify(images);
    if (is_popular !== undefined) updateData.is_popular = is_popular;
    if (emotion) updateData.emotion = emotion;
    if (rating) updateData.rating = rating;
    
    // Build query
    const keys = Object.keys(updateData);
    if (keys.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }
    
    const query = `UPDATE pets SET ${keys.map(key => `${key} = ?`).join(', ')} WHERE id = ?`;
    const values = [...Object.values(updateData), id];
    
    // Execute update
    const [result] = await db.query(query, values);
    
    if (result.affectedRows === 1) {
      // Get the updated pet
      const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
      
      // Parse images from JSON to array
      const updatedPet = {
        ...rows[0],
        images: JSON.parse(rows[0].images),
        isFavorite: !!rows[0].is_favorite
      };
      
      res.status(200).json(updatedPet);
    } else {
      res.status(500).json({ message: 'Failed to update pet' });
    }
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({ message: 'Server error while updating pet' });
  }
};

// Delete pet
exports.deletePet = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Check if pet exists
    const [existingPet] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
    
    if (existingPet.length === 0) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    // Delete pet
    const [result] = await db.query('DELETE FROM pets WHERE id = ?', [id]);
    
    if (result.affectedRows === 1) {
      res.status(200).json({ success: true, message: 'Pet deleted successfully' });
    } else {
      res.status(500).json({ message: 'Failed to delete pet' });
    }
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ message: 'Server error while deleting pet' });
  }
};

// Toggle favorite status
exports.toggleFavorite = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Check if pet exists and get current favorite status
    const [existingPet] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
    
    if (existingPet.length === 0) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    // Toggle favorite status
    const newFavoriteStatus = !existingPet[0].is_favorite;
    
    // Update the pet
    const [result] = await db.query('UPDATE pets SET is_favorite = ? WHERE id = ?', [newFavoriteStatus, id]);
    
    if (result.affectedRows === 1) {
      // Get the updated pet
      const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
      
      // Parse images from JSON to array
      const updatedPet = {
        ...rows[0],
        images: JSON.parse(rows[0].images),
        isFavorite: !!rows[0].is_favorite
      };
      
      res.status(200).json(updatedPet);
    } else {
      res.status(500).json({ message: 'Failed to update favorite status' });
    }
  } catch (error) {
    console.error('Error toggling favorite status:', error);
    res.status(500).json({ message: 'Server error while toggling favorite' });
  }
};
