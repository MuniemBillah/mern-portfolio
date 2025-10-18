// backend/seedAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const createAdmin = async () => {
  try {
    // Check if admin exists
    const adminExists = await Admin.findOne({ email: 'admin@portfolio.com' });
    
    if (adminExists) {
      console.log('⚠️ Admin already exists');
      process.exit();
    }

    // Create admin
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@portfolio.com',
      password: 'admin123' // Change this!
    });

    console.log('✅ Admin created successfully');
    console.log('Email: admin@portfolio.com');
    console.log('Password: admin123');
    console.log('⚠️ CHANGE THE PASSWORD AFTER FIRST LOGIN!');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createAdmin();