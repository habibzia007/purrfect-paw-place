
const db = require('../../config/database');

// Migration to create pets table
exports.up = async function() {
  try {
    // Drop table if exists to recreate it
    await db.query('DROP TABLE IF EXISTS pets');
    
    // Create pets table
    await db.query(`
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
      )
    `);
    
    console.log('Pets table created successfully');
    
    // Insert 20 dummy records
    await insertDummyData();
  } catch (error) {
    console.error('Error creating pets table:', error);
    throw error;
  }
};

// Function to insert dummy data
async function insertDummyData() {
  const pets = [
    {
      name: 'Bella',
      type: 'Dog',
      breed: 'Golden Retriever',
      color: '#FFD700',
      age: '2 years',
      price: 30000.00,
      description: 'A friendly and loyal golden retriever, perfect for families.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg', 'https://cdn.pixabay.com/photo/2018/08/28/12/41/golden-retriever-3636983_1280.jpg']),
      is_popular: true,
      emotion: 'Happy',
      rating: 4.7,
      is_favorite: false
    },
    {
      name: 'Milo',
      type: 'Cat',
      breed: 'Persian',
      color: '#D2B48C',
      age: '1 year',
      price: 18000.00,
      description: 'An elegant Persian cat with soft fur and calm personality.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg', 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934723_1280.jpg']),
      is_popular: true,
      emotion: 'Sleepy',
      rating: 4.3,
      is_favorite: false
    },
    {
      name: 'Rocky',
      type: 'Dog',
      breed: 'Bulldog',
      color: '#8B4513',
      age: '3 years',
      price: 25000.00,
      description: 'A strong and protective bulldog with a heart of gold.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2015/11/17/13/13/bulldog-1047518_1280.jpg', 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg']),
      is_popular: false,
      emotion: 'Playful',
      rating: 4.5,
      is_favorite: false
    },
    {
      name: 'Luna',
      type: 'Cat',
      breed: 'Siamese',
      color: '#E8DCD0',
      age: '1.5 years',
      price: 20000.00,
      description: 'A vocal and intelligent Siamese cat with striking blue eyes.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg', 'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189_1280.jpg']),
      is_popular: true,
      emotion: 'Curious',
      rating: 4.6,
      is_favorite: false
    },
    {
      name: 'Charlie',
      type: 'Dog',
      breed: 'Beagle',
      color: '#8B4513',
      age: '2 years',
      price: 22000.00,
      description: 'An adventurous beagle with an excellent sense of smell.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2019/08/19/07/45/dog-4415649_1280.jpg', 'https://cdn.pixabay.com/photo/2016/01/05/17/51/dog-1123016_1280.jpg']),
      is_popular: false,
      emotion: 'Excited',
      rating: 4.4,
      is_favorite: false
    },
    {
      name: 'Leo',
      type: 'Cat',
      breed: 'Maine Coon',
      color: '#A0522D',
      age: '3 years',
      price: 28000.00,
      description: 'A majestic Maine Coon with a fluffy coat and friendly demeanor.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_1280.jpg', 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg']),
      is_popular: true,
      emotion: 'Sleepy',
      rating: 4.8,
      is_favorite: false
    },
    {
      name: 'Daisy',
      type: 'Dog',
      breed: 'Dachshund',
      color: '#D2691E',
      age: '1 year',
      price: 18000.00,
      description: 'A curious and brave dachshund, perfect for apartment living.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_1280.jpg', 'https://cdn.pixabay.com/photo/2017/09/25/13/14/dog-2785077_1280.jpg']),
      is_popular: false,
      emotion: 'Happy',
      rating: 4.2,
      is_favorite: false
    },
    {
      name: 'Oliver',
      type: 'Cat',
      breed: 'British Shorthair',
      color: '#808080',
      age: '2 years',
      price: 22000.00,
      description: 'A laid-back British Shorthair with a plush coat and calm temperament.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg', 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg']),
      is_popular: false,
      emotion: 'Sleepy',
      rating: 4.3,
      is_favorite: false
    },
    {
      name: 'Max',
      type: 'Dog',
      breed: 'German Shepherd',
      color: '#8B4513',
      age: '3 years',
      price: 35000.00,
      description: 'A loyal and intelligent German Shepherd, great for families and protection.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2019/07/18/18/58/german-shepherd-4347477_1280.jpg', 'https://cdn.pixabay.com/photo/2019/03/11/13/30/german-shepherd-4049830_1280.jpg']),
      is_popular: true,
      emotion: 'Alert',
      rating: 4.9,
      is_favorite: false
    },
    {
      name: 'Chloe',
      type: 'Cat',
      breed: 'Ragdoll',
      color: '#F5F5DC',
      age: '1 year',
      price: 24000.00,
      description: 'A gentle Ragdoll cat that loves to be held and cuddled.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2017/02/15/12/12/cat-2068462_1280.jpg', 'https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg']),
      is_popular: false,
      emotion: 'Relaxed',
      rating: 4.7,
      is_favorite: false
    },
    {
      name: 'Cooper',
      type: 'Dog',
      breed: 'Labrador Retriever',
      color: '#000000',
      age: '2 years',
      price: 28000.00,
      description: 'An energetic black Labrador with a friendly and outgoing personality.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2016/02/19/15/46/labrador-retriever-1210559_1280.jpg', 'https://cdn.pixabay.com/photo/2016/11/22/19/41/animal-1850276_1280.jpg']),
      is_popular: true,
      emotion: 'Excited',
      rating: 4.6,
      is_favorite: false
    },
    {
      name: 'Lily',
      type: 'Cat',
      breed: 'Bengal',
      color: '#D2B48C',
      age: '2 years',
      price: 30000.00,
      description: 'An active Bengal cat with a striking spotted coat and playful nature.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg', 'https://cdn.pixabay.com/photo/2015/01/07/11/33/tiger-591359_1280.jpg']),
      is_popular: true,
      emotion: 'Curious',
      rating: 4.8,
      is_favorite: false
    },
    {
      name: 'Teddy',
      type: 'Dog',
      breed: 'Pomeranian',
      color: '#F5DEB3',
      age: '1 year',
      price: 20000.00,
      description: 'A fluffy Pomeranian with a fox-like face and spirited personality.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2015/11/17/13/13/puppy-1047521_1280.jpg', 'https://cdn.pixabay.com/photo/2019/08/19/07/45/dog-4415649_1280.jpg']),
      is_popular: false,
      emotion: 'Playful',
      rating: 4.2,
      is_favorite: false
    },
    {
      name: 'Simba',
      type: 'Cat',
      breed: 'Scottish Fold',
      color: '#F5DEB3',
      age: '1.5 years',
      price: 26000.00,
      description: 'A Scottish Fold with adorable folded ears and a sweet disposition.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg', 'https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_1280.jpg']),
      is_popular: false,
      emotion: 'Relaxed',
      rating: 4.5,
      is_favorite: false
    },
    {
      name: 'Ruby',
      type: 'Dog',
      breed: 'Cavalier King Charles Spaniel',
      color: '#8B4513',
      age: '2 years',
      price: 32000.00,
      description: 'A gentle and affectionate Cavalier with beautiful silky ears.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2018/01/05/22/48/dog-3064292_1280.jpg', 'https://cdn.pixabay.com/photo/2018/05/07/10/48/golden-cocker-spaniel-3380548_1280.jpg']),
      is_popular: true,
      emotion: 'Happy',
      rating: 4.7,
      is_favorite: false
    },
    {
      name: 'Oscar',
      type: 'Cat',
      breed: 'Sphynx',
      color: '#E8DCD0',
      age: '2 years',
      price: 35000.00,
      description: 'A hairless Sphynx cat with an extroverted and affectionate personality.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2017/03/14/14/49/cat-2143332_1280.jpg', 'https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg']),
      is_popular: false,
      emotion: 'Curious',
      rating: 4.4,
      is_favorite: false
    },
    {
      name: 'Rosie',
      type: 'Dog',
      breed: 'Shih Tzu',
      color: '#F5F5DC',
      age: '3 years',
      price: 22000.00,
      description: 'A friendly Shih Tzu with a flowing coat and affectionate nature.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2019/11/18/00/38/dog-4633734_1280.jpg', 'https://cdn.pixabay.com/photo/2020/10/01/09/43/dog-5619379_1280.jpg']),
      is_popular: false,
      emotion: 'Sleepy',
      rating: 4.3,
      is_favorite: false
    },
    {
      name: 'Mittens',
      type: 'Cat',
      breed: 'Domestic Shorthair',
      color: '#000000',
      age: '1 year',
      price: 15000.00,
      description: 'A playful black cat with white paws, resembling mittens.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_1280.jpg', 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg']),
      is_popular: false,
      emotion: 'Playful',
      rating: 4.2,
      is_favorite: false
    },
    {
      name: 'Winston',
      type: 'Dog',
      breed: 'French Bulldog',
      color: '#F5F5DC',
      age: '2 years',
      price: 38000.00,
      description: 'A charming French Bulldog with bat ears and a playful attitude.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2019/05/27/19/57/dog-4233357_1280.jpg', 'https://cdn.pixabay.com/photo/2015/11/03/12/58/dog-1020790_1280.jpg']),
      is_popular: true,
      emotion: 'Happy',
      rating: 4.8,
      is_favorite: false
    },
    {
      name: 'Whiskers',
      type: 'Cat',
      breed: 'Norwegian Forest',
      color: '#D2B48C',
      age: '3 years',
      price: 28000.00,
      description: 'A large Norwegian Forest cat with a thick, water-resistant coat.',
      images: JSON.stringify(['https://cdn.pixabay.com/photo/2013/10/25/20/46/cat-200855_1280.jpg', 'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189_1280.jpg']),
      is_popular: false,
      emotion: 'Relaxed',
      rating: 4.6,
      is_favorite: false
    }
  ];

  // Insert each pet into the database
  for (const pet of pets) {
    await db.query(`
      INSERT INTO pets 
      (name, type, breed, color, age, price, description, images, is_popular, emotion, rating, is_favorite) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      pet.name, pet.type, pet.breed, pet.color, pet.age, pet.price, 
      pet.description, pet.images, pet.is_popular, pet.emotion, pet.rating, pet.is_favorite
    ]);
  }

  console.log('20 dummy pets inserted successfully');
}
