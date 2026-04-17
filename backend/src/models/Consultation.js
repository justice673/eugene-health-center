import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
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
  consultationType: {
    type: String,
    enum: ['chat', 'video', 'phone'],
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: Date,
  duration: Number, // in minutes
  meetingLink: String,
  chatLogs: [{
    sender: {
      type: String,
      enum: ['patient', 'doctor'],
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  notes: String,
  followUpRequired: {
    type: Boolean,
    default: false,
  },
  followUpDate: Date,
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled',
  },
}, {
  timestamps: true,
});

consultationSchema.index({ appointmentId: 1 });
consultationSchema.index({ userId: 1, createdAt: -1 });
consultationSchema.index({ doctorId: 1 });

const Consultation = mongoose.models.Consultation || mongoose.model('Consultation', consultationSchema);

export default Consultation;

