const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, unique: true, sparse: true },
  password: { type: String }, // For standard email/pass auth
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photoURL: { type: String },
  phone: { type: String },
  address: { type: String },
  
  // Academic & Location Details
  age: { type: Number },
  gender: { type: String },
  college: { type: String },
  branch: { type: String },
  academicYear: { type: String },
  district: { type: String },
  state: { type: String },
  postalCode: { type: String },
  
  // Professional Vaults
  githubUrl: { type: String },
  leetcodeUrl: { type: String },
  codechefUrl: { type: String },

  // Subscription & Elite Status
  isSubscribed: { type: Boolean, default: false },
  subscriptionEndDate: { type: Date },
  
  // Practice Stats
  scholarPoints: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  bookmarkedCompanies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
  isBanned: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
