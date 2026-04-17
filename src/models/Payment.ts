import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Payment Model
 * Represents payment transactions (simulated)
 */

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  appointmentId?: mongoose.Types.ObjectId;
  subscriptionId?: string;
  amount: number;
  currency: string;
  paymentMethod: 'credit_card' | 'paypal' | 'insurance';
  paymentType: 'consultation' | 'subscription' | 'medication';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId: string;
  paymentDetails?: {
    cardLast4?: string;
    cardBrand?: string;
    paypalEmail?: string;
    insuranceProvider?: string;
    insurancePolicyNumber?: string;
  };
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
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
    metadata: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

// Indexes
PaymentSchema.index({ userId: 1, createdAt: -1 });
PaymentSchema.index({ transactionId: 1 });
PaymentSchema.index({ status: 1 });

const Payment: Model<IPayment> =
  mongoose.models.Payment ||
  mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;


