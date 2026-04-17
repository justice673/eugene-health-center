import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Medication Model
 * Represents medications available in the system
 */

export interface IMedication extends Document {
  name: string;
  category: string;
  description: string;
  dosage: string;
  sideEffects?: string[];
  contraindications?: string[];
  price: number;
  stock: number;
  manufacturer?: string;
  requiresPrescription: boolean;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MedicationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Medication name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    dosage: {
      type: String,
      required: [true, 'Dosage information is required'],
    },
    sideEffects: [String],
    contraindications: [String],
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: 0,
      default: 0,
    },
    manufacturer: String,
    requiresPrescription: {
      type: Boolean,
      default: true,
    },
    imageUrl: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
MedicationSchema.index({ name: 1 });
MedicationSchema.index({ category: 1 });
MedicationSchema.index({ isActive: 1 });

const Medication: Model<IMedication> =
  mongoose.models.Medication ||
  mongoose.model<IMedication>('Medication', MedicationSchema);

export default Medication;


