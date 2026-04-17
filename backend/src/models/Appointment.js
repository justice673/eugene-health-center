import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorSpecialty: {
    type: String,
    required: true,
  },
  consultationType: {
    type: String,
    enum: ['general', 'specialist', 'emergency'],
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 30,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'pending',
  },
  reason: {
    type: String,
    required: true,
  },
  symptoms: String,
  diagnosis: String,
  prescription: String,
  notes: String,
  meetingLink: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending',
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: String,
}, {
  timestamps: true,
});

// Indexes
appointmentSchema.index({ userId: 1, appointmentDate: -1 });
appointmentSchema.index({ doctorId: 1, appointmentDate: 1 });
appointmentSchema.index({ status: 1 });

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

export default Appointment;


