const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  timer: { type: Number, default: 120 }, // in minutes
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  status: { type: String, enum: ['Draft', 'Upcoming', 'Active', 'Past'], default: 'Draft' },
  rankings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, default: 0 },
    timeTaken: { type: Number, default: 0 }, // in seconds
    submissionsCount: { type: Number, default: 0 }
  }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Contest', contestSchema);
