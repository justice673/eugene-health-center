import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  subscriptionId: String,
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'insurance'],
    required: true,
  },
  paymentType: {
    type: String,
    enum: ['consultation', 'subscription', 'medication'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  paymentDetails: {
    cardLast4: String,
    cardBrand: String,
    paypalEmail: String,
    insuranceProvider: String,
    insurancePolicyNumber: String,
  },
  metadata: mongoose.Schema.Types.Mixed,
}, {
  timestamps: true,
});

// Indexes
paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ status: 1 });

const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

export default Payment;


