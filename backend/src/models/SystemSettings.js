import mongoose from 'mongoose';

const systemSettingsSchema = new mongoose.Schema({
  clinicName: {
    type: String,
    default: 'Eugene Online Health Center',
  },
  clinicAddress: String,
  clinicPhone: String,
  clinicEmail: String,
  clinicLogo: String,
  consultationFees: {
    general: { type: Number, default: 50 },
    specialist: { type: Number, default: 100 },
    emergency: { type: Number, default: 150 },
  },
  doctorCommission: {
    type: Number,
    default: 70, // percentage
  },
  subscriptionPlans: {
    basic: { price: Number, features: [String] },
    standard: { price: Number, features: [String] },
    premium: { price: Number, features: [String] },
  },
  emailSettings: {
    smtpHost: String,
    smtpPort: Number,
    smtpUser: String,
    smtpPassword: String,
    fromEmail: String,
    fromName: String,
  },
  smsSettings: {
    provider: String,
    apiKey: String,
    fromNumber: String,
  },
  hipaaCompliance: {
    enabled: { type: Boolean, default: true },
    encryptionEnabled: { type: Boolean, default: true },
    auditLogRetention: { type: Number, default: 365 }, // days
  },
  security: {
    passwordMinLength: { type: Number, default: 8 },
    sessionTimeout: { type: Number, default: 30 }, // minutes
    twoFactorEnabled: { type: Boolean, default: false },
  },
}, {
  timestamps: true,
});

// Ensure only one settings document exists
systemSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const SystemSettings = mongoose.models.SystemSettings || mongoose.model('SystemSettings', systemSettingsSchema);

export default SystemSettings;

