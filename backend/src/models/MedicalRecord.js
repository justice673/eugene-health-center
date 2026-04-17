import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  recordType: {
    type: String,
    enum: ['lab_result', 'xray', 'scan', 'report', 'note', 'other'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  fileUrl: String,
  fileName: String,
  fileSize: Number,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

medicalRecordSchema.index({ userId: 1, createdAt: -1 });
medicalRecordSchema.index({ appointmentId: 1 });

const MedicalRecord = mongoose.models.MedicalRecord || mongoose.model('MedicalRecord', medicalRecordSchema);

export default MedicalRecord;

