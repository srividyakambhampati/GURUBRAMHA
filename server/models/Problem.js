const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  
  accuracy: { type: Number, default: 0 },
  points: { type: Number, default: 100 },
  
  description: { type: String, required: true },
  validationCases: [{
    input: { type: String },
    output: { type: String },
    isHidden: { type: Boolean, default: false }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Problem', problemSchema);
