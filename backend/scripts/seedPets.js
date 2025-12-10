const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Pet = require('../models/Pet');

dotenv.config();

const dummyPets = [
  {
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 2,
    gender: 'Male',
    size: 'Large',
    description: 'Friendly and energetic Golden Retriever. Loves playing fetch and going for walks. Great with kids and other pets.',
    status: 'available',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400'
  },
  {
    name: 'Luna',
    species: 'Cat',
    breed: 'Persian',
    age: 3,
    gender: 'Female',
    size: 'Medium',
    description: 'Calm and gentle Persian cat. Enjoys lounging around and being pampered. Perfect for a quiet household.',
    status: 'available',
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400'
  },
  {
    name: 'Charlie',
    species: 'Dog',
    breed: 'Beagle',
    age: 1,
    gender: 'Male',
    size: 'Medium',
    description: 'Playful Beagle puppy. Very social and loves attention. Great for active families.',
    status: 'available',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400'
  },
  {
    name: 'Bella',
    species: 'Cat',
    breed: 'Siamese',
    age: 4,
    gender: 'Female',
    size: 'Small',
    description: 'Elegant Siamese cat with beautiful blue eyes. Very vocal and affectionate. Needs lots of attention.',
    status: 'available',
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400'
  },
  {
    name: 'Rocky',
    species: 'Dog',
    breed: 'Bulldog',
    age: 5,
    gender: 'Male',
    size: 'Medium',
    description: 'Gentle Bulldog with a big personality. Loves to cuddle and is great with children. Low energy, perfect for apartment living.',
    status: 'available',
    location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400'
  },
  {
    name: 'Whiskers',
    species: 'Cat',
    breed: 'Maine Coon',
    age: 2,
    gender: 'Male',
    size: 'Large',
    description: 'Majestic Maine Coon with fluffy fur. Very friendly and dog-like personality. Enjoys being around people.',
    status: 'available',
    location: 'Boston, MA',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'
  },
  {
    name: 'Daisy',
    species: 'Dog',
    breed: 'Cocker Spaniel',
    age: 3,
    gender: 'Female',
    size: 'Medium',
    description: 'Sweet Cocker Spaniel with a loving nature. Easy to train and great companion. Perfect for first-time dog owners.',
    status: 'available',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400'
  },
  {
    name: 'Oliver',
    species: 'Cat',
    breed: 'British Shorthair',
    age: 1,
    gender: 'Male',
    size: 'Medium',
    description: 'Adorable British Shorthair kitten. Curious and playful. Will bring lots of joy to your home.',
    status: 'available',
    location: 'Portland, OR',
    image: 'https://images.unsplash.com/photo-1586295166350-26e3be2903c3?w=400'
  },
  {
    name: 'Buddy',
    species: 'Dog',
    breed: 'Labrador Retriever',
    age: 4,
    gender: 'Male',
    size: 'Large',
    description: 'Loyal and friendly Labrador. Great family dog, loves water and playing outdoors. Very trainable.',
    status: 'available',
    location: 'Denver, CO',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400'
  },
  {
    name: 'Milo',
    species: 'Cat',
    breed: 'Tabby',
    age: 2,
    gender: 'Male',
    size: 'Medium',
    description: 'Friendly tabby cat with a playful personality. Gets along well with other pets and children.',
    status: 'available',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400'
  },
  {
    name: 'Sadie',
    species: 'Dog',
    breed: 'German Shepherd',
    age: 3,
    gender: 'Female',
    size: 'Large',
    description: 'Intelligent German Shepherd. Protective and loyal. Needs active owner for exercise and training.',
    status: 'available',
    location: 'Phoenix, AZ',
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400'
  },
  {
    name: 'Zoe',
    species: 'Cat',
    breed: 'Ragdoll',
    age: 2,
    gender: 'Female',
    size: 'Large',
    description: 'Beautiful Ragdoll with striking blue eyes. Very docile and loves to be held. Perfect lap cat.',
    status: 'available',
    location: 'Nashville, TN',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400'
  },
  {
    name: 'Cooper',
    species: 'Dog',
    breed: 'French Bulldog',
    age: 1,
    gender: 'Male',
    size: 'Small',
    description: 'Adorable French Bulldog puppy. Playful and affectionate. Great for city living and small spaces.',
    status: 'available',
    location: 'Las Vegas, NV',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'
  },
  {
    name: 'Chloe',
    species: 'Cat',
    breed: 'Russian Blue',
    age: 3,
    gender: 'Female',
    size: 'Medium',
    description: 'Elegant Russian Blue with silver-tipped fur. Shy at first but very affectionate once comfortable.',
    status: 'available',
    location: 'Philadelphia, PA',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400'
  },
  {
    name: 'Duke',
    species: 'Dog',
    breed: 'Rottweiler',
    age: 5,
    gender: 'Male',
    size: 'Large',
    description: 'Calm and confident Rottweiler. Well-trained and great with family. Needs experienced owner.',
    status: 'available',
    location: 'Dallas, TX',
    image: 'https://images.unsplash.com/photo-1534361960057-19889db1e77f?w=400'
  },
  {
    name: 'Tweety',
    species: 'Bird',
    breed: 'Canary',
    age: 1,
    gender: 'Unknown',
    size: 'Small',
    description: 'Beautiful yellow canary with a cheerful song. Easy to care for and great for first-time bird owners.',
    status: 'available',
    location: 'Atlanta, GA',
    image: ''
  },
  {
    name: 'Fluffy',
    species: 'Rabbit',
    breed: 'Angora',
    age: 2,
    gender: 'Female',
    size: 'Small',
    description: 'Soft and fluffy Angora rabbit. Gentle and friendly. Needs regular grooming for its long fur.',
    status: 'available',
    location: 'Minneapolis, MN',
    image: ''
  },
  {
    name: 'Molly',
    species: 'Dog',
    breed: 'Shih Tzu',
    age: 4,
    gender: 'Female',
    size: 'Small',
    description: 'Sweet Shih Tzu with a friendly disposition. Perfect companion dog. Great for seniors or small families.',
    status: 'available',
    location: 'San Diego, CA',
    image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3dcb?w=400'
  }
];

const seedPets = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-adoption', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing pets (optional - remove if you want to keep existing data)
    const deleteResult = await Pet.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing pets`);

    // Insert dummy pets
    const insertedPets = await Pet.insertMany(dummyPets);
    console.log(`Successfully seeded ${insertedPets.length} pets`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding pets:', error);
    process.exit(1);
  }
};

seedPets();

