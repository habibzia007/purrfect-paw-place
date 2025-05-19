
const runMigrations = require('../migrations/runner');

// Run migrations
async function migrate() {
  try {
    console.log('Starting migrations...');
    await runMigrations();
    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Execute migrations
migrate();
