/**
 * Create Admin User Script
 * Run this to create an admin user in your database
 * 
 * Usage: node create-admin.js
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './src/models/User.js';

// Load environment variables
dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Admin credentials
    const adminEmail = 'admin@eugenehealth.com';
    const adminPassword = 'Admin123!';
    const adminName = 'Admin User';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
      console.log('\n   To reset password, delete the user first or update manually in database.');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      fullName: adminName,
      email: adminEmail,
      phone: '+1234567890',
      password: adminPassword,
      role: 'admin',
      subscriptionPlan: 'Premium Plan',
      subscriptionStatus: 'active',
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('\n📋 Admin Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Email:    ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🔐 Login at: http://localhost:3000/signin');
    console.log('   After login, you\'ll be redirected to: http://localhost:3000/admin');
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
};

createAdmin();

