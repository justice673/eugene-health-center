import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  resource: {
    type: String,
    enum: ['user', 'appointment', 'prescription', 'payment', 'medication', 'system'],
    required: true,
  },
  resourceId: mongoose.Schema.Types.ObjectId,
  details: mongoose.Schema.Types.Mixed,
  ipAddress: String,
  userAgent: String,
  status: {
    type: String,
    enum: ['success', 'failure', 'warning'],
    default: 'success',
  },
}, {
  timestamps: true,
});

activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ resource: 1, resourceId: 1 });
activityLogSchema.index({ createdAt: -1 });

const ActivityLog = mongoose.models.ActivityLog || mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;

