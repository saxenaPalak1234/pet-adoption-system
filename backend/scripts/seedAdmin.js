const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const adminData = {
  name: 'Admin User',
  email: 'admin@petadoption.com',
  password: 'admin123',
  role: 'admin'
};

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-adoption';
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB successfully');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      // Update existing admin
      existingAdmin.name = adminData.name;
      existingAdmin.role = 'admin';
      existingAdmin.password = adminData.password;
      await existingAdmin.save();
      console.log('Admin user updated successfully');
    } else {
      // Create new admin
      const admin = await User.create(adminData);
      console.log('Admin user created successfully');
    }

    console.log('\n========================================');
    console.log('ADMIN CREDENTIALS:');
    console.log('========================================');
    console.log('Email: admin@petadoption.com');
    console.log('Password: admin123');
    console.log('========================================\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();

