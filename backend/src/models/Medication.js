import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Medication name is required'],
    trim: true,
    index: true,
  },
  genericName: {
    type: String,
    required: [true, 'Generic name is required'],
    trim: true,
    index: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: [
      'Pain & Inflammation',
      'Antibiotics',
      'Antimalarial',
      'Antiviral',
      'Antifungal',
      'Cardiovascular',
      'Diabetes',
      'Respiratory',
      'Gastrointestinal',
      'Mental Health',
      'Allergy',
      'Vitamins & Supplements',
      'Women\'s Health',
      'Dermatology',
      'Emergency',
    ],
    index: true,
  },
  form: {
    type: String,
    required: [true, 'Form is required'],
    enum: ['Tablet', 'Syrup', 'Injection', 'Cream', 'Capsule', 'Drops', 'Spray', 'Other'],
  },
  strength: {
    type: String,
    required: [true, 'Strength is required'],
    trim: true,
  },
  prescriptionRequired: {
    type: Boolean,
    default: true,
    index: true,
  },
  manufacturer: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  sideEffects: {
    type: [String],
    default: [],
  },
  contraindications: {
    type: [String],
    default: [],
  },
  // Additional fields for inventory management
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  stock: {
    type: Number,
    min: 0,
    default: 0,
  },
  imageUrl: String,
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
}, {
  timestamps: true,
});

// Indexes
medicationSchema.index({ name: 1 });
medicationSchema.index({ category: 1 });
medicationSchema.index({ isActive: 1 });

const Medication = mongoose.models.Medication || mongoose.model('Medication', medicationSchema);

export default Medication;


