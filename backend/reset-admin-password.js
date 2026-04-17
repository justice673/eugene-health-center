/**
 * Reset Admin Password Script
 * Resets the admin user password to a known value
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './src/models/User.js';

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const adminEmail = 'admin@eugenehealth.com';
    const newPassword = 'Admin123!';

    // Find admin user
    const admin = await User.findOne({ email: adminEmail });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      console.log('   Run: node create-admin.js to create one');
      await mongoose.connection.close();
      process.exit(1);
    }

    // Update password (will be hashed automatically by pre-save hook)
    admin.password = newPassword;
    await admin.save();

    console.log('✅ Admin password reset successfully!\n');
    console.log('📋 Updated Admin Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Email:    ${adminEmail}`);
    console.log(`   Password: ${newPassword}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🔐 Try logging in now at: http://localhost:3000/signin');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

resetAdminPassword();

