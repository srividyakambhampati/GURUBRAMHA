const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  
  accuracy: { type: Number, default: 0 },
  points: { type: Number, default: 100 },
  
  description: { type: String, required: true },
  constraints: { type: String },
  inputFormat: { type: String },
  outputFormat: { type: String },
  sampleInput: { type: String },
  sampleOutput: { type: String },
  explanation: { type: String },
  hints: [{ type: String }],
  
  timeLimit: { type: Number, default: 1 }, // in seconds
  memoryLimit: { type: Number, default: 256 }, // in MB
  
  starterCode: [{
    language: { type: String }, // 'python', 'java', 'cpp', 'javascript', 'c'
    code: { type: String }
  }],
  
  solutions: [{
    language: { type: String },
    code: { type: String }
  }],
  
  testCases: [{
    input: { type: String },
    expectedOutput: { type: String },
    explanation: { type: String },
    isHidden: { type: Boolean, default: false }
  }],
  
  status: { type: String, enum: ['Draft', 'Published', 'Hidden', 'Archived'], default: 'Draft' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Problem', problemSchema);
