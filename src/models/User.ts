import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * User Model
 * Represents a user in the system (patient, doctor, or admin)
 */

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: 'user' | 'admin' | 'doctor';
  subscriptionPlan?: string;
  subscriptionStatus?: 'active' | 'inactive' | 'cancelled';
  avatar?: string;
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory?: string[];
  allergies?: string[];
  currentMedications?: string[];
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'doctor'],
      default: 'user',
    },
    subscriptionPlan: {
      type: String,
      enum: ['Basic Plan', 'Standard Plan', 'Premium Plan', 'None'],
      default: 'None',
    },
    subscriptionStatus: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'inactive',
    },
    avatar: String,
    dateOfBirth: Date,
    address: String,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
    medicalHistory: [String],
    allergies: [String],
    currentMedications: [String],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

// Prevent model recompilation in development
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;


