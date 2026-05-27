const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  contest: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest' },
  code: { type: String, required: true },
  language: { type: String, required: true },
  status: { type: String, enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error', 'Pending'], default: 'Pending' },
  runtime: { type: Number, default: 0 }, // in ms
  memory: { type: Number, default: 0 }, // in KB
  testCasesPassed: { type: Number, default: 0 },
  totalTestCases: { type: Number, default: 0 },
  errorDetails: { type: String },
  pointsEarned: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
