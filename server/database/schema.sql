
-- Create database
CREATE DATABASE IF NOT EXISTS petshop_db;
USE petshop_db;

-- Create pets table
CREATE TABLE IF NOT EXISTS pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  color VARCHAR(20) NOT NULL,
  age VARCHAR(10) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  images TEXT NOT NULL,
  is_popular BOOLEAN DEFAULT FALSE,
  emotion VARCHAR(20) DEFAULT 'Happy',
  rating DECIMAL(2,1) DEFAULT 4.0,
  is_favorite BOOLEAN DEFAULT FALSE
);

-- Insert sample data
INSERT INTO `pets`
(`name`, `type`, `breed`, `color`, `age`, `price`, `description`, `images`, `is_popular`, `emotion`, `rating`, `is_favorite`)
VALUES
('Bella', 'Dog', 'Golden Retriever', '#FFD700', '2 years', 30000.00,
'A friendly and loyal golden retriever, perfect for families.',
'["https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg", "https://cdn.pixabay.com/photo/2018/08/28/12/41/golden-retriever-3636983_1280.jpg"]',
true, 'Happy', 4.7, false),

('Milo', 'Cat', 'Persian', '#D2B48C', '1 year', 18000.00,
'An elegant Persian cat with soft fur and calm personality.',
'["https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg", "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934723_1280.jpg"]',
true, 'Sleepy', 4.3, false),

('Chirpy', 'Bird', 'Budgerigar', '#90EE90', '6 months', 5000.00,
'A playful budgie that sings and brings joy.',
'["https://cdn.pixabay.com/photo/2019/11/04/20/47/parrot-4600930_1280.jpg", "https://cdn.pixabay.com/photo/2020/03/28/14/26/parakeet-4976536_1280.jpg"]',
false, 'Excited', 4.0, false),

('Thumper', 'Rabbit', 'Netherland Dwarf', '#FFFFFF', '4 months', 8000.00,
'A small white rabbit, great for children and homes.',
'["https://cdn.pixabay.com/photo/2020/05/11/07/49/rabbit-5152386_1280.jpg", "https://cdn.pixabay.com/photo/2017/07/21/23/57/rabbit-2529764_1280.jpg"]',
true, 'Curious', 4.5, false),

('Max', 'Dog', 'German Shepherd', '#A0522D', '3 years', 35000.00,
'A protective and highly intelligent German shepherd.',
'["https://cdn.pixabay.com/photo/2018/02/21/17/53/german-shepherd-3162360_1280.jpg", "https://cdn.pixabay.com/photo/2020/11/30/17/03/german-shepherd-5792271_1280.jpg"]',
false, 'Playful', 4.8, false);
