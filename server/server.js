
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const petRoutes = require('./routes/petRoutes');
const db = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test database connection
db.testConnection()
  .then(connected => {
    if (!connected) {
      console.warn('Warning: Starting server without database connection');
    }
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Routes
app.use('/api/pets', petRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Pet Shop API is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
