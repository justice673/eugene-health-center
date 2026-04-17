/**
 * List All Users Script
 * Shows all users in the database
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './src/models/User.js';

dotenv.config();

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const users = await User.find({}).select('-password');
    
    if (users.length === 0) {
      console.log('❌ No users found in database!');
      console.log('\n💡 Create a user by:');
      console.log('   1. Sign up at http://localhost:3000/signup');
      console.log('   2. Or run: node create-admin.js');
    } else {
      console.log(`📋 Found ${users.length} user(s) in database:\n`);
      users.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}`);
        console.log(`   Name: ${user.fullName}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   ID: ${user._id}`);
        console.log('');
      });
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

listUsers();

