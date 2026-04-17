import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Appointment Model
 * Represents a medical appointment/consultation
 */

export interface IAppointment extends Document {
  userId: mongoose.Types.ObjectId;
  doctorId?: mongoose.Types.ObjectId;
  doctorName: string;
  doctorSpecialty: string;
  consultationType: 'general' | 'specialist' | 'emergency';
  appointmentDate: Date;
  appointmentTime: string;
  duration: number; // in minutes
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  symptoms?: string;
  diagnosis?: string;
  prescription?: string;
  notes?: string;
  meetingLink?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentAmount: number;
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

// Indexes
AppointmentSchema.index({ userId: 1, appointmentDate: -1 });
AppointmentSchema.index({ doctorId: 1, appointmentDate: 1 });
AppointmentSchema.index({ status: 1 });

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;


