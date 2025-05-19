
const fs = require('fs');
const path = require('path');
const db = require('../config/database');
const setupMigrations = require('./setup');

// Function to run all pending migrations
async function runMigrations() {
  try {
    // Setup migrations table
    await setupMigrations();
    
    // Get list of executed migrations
    const [executedMigrations] = await db.query('SELECT name FROM migrations');
    const executedMigrationNames = executedMigrations.map(m => m.name);
    
    // Get all migration files
    const migrationsDir = path.join(__dirname, 'files');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.js'))
      .sort(); // Sort to ensure migrations run in order
    
    // Run pending migrations
    for (const file of migrationFiles) {
      if (!executedMigrationNames.includes(file)) {
        console.log(`Running migration: ${file}`);
        
        const migration = require(path.join(migrationsDir, file));
        await migration.up();
        
        // Record migration as executed
        await db.query('INSERT INTO migrations (name) VALUES (?)', [file]);
        
        console.log(`Migration ${file} completed successfully`);
      } else {
        console.log(`Migration ${file} already executed, skipping...`);
      }
    }
    
    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
}

module.exports = runMigrations;
