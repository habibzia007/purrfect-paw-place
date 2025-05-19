const fs = require('fs');
const path = require('path');
const db = require('../config/database');

// Create migrations table if it doesn't exist
async function setupMigrations() {
  try {
    console.log('Setting up migrations table...');
    
    // Create migrations table to keep track of executed migrations
    await db.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Migrations table created successfully');
  } catch (error) {
    console.error('Error setting up migrations:', error);
    throw error;
  }
}

module.exports = setupMigrations;
