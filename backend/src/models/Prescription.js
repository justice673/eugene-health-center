import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  medications: [{
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    instructions: String,
  }],
  diagnosis: String,
  notes: String,
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active',
  },
  issuedDate: {
    type: Date,
    default: Date.now,
  },
  expiryDate: Date,
}, {
  timestamps: true,
});

prescriptionSchema.index({ userId: 1, createdAt: -1 });
prescriptionSchema.index({ doctorId: 1 });
prescriptionSchema.index({ appointmentId: 1 });

const Prescription = mongoose.models.Prescription || mongoose.model('Prescription', prescriptionSchema);

export default Prescription;

