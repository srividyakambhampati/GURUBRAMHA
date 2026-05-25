const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
  title: { type: String },
  topics: [{ type: String }]
});

const roadmapSchema = new mongoose.Schema({
  week: { type: Number },
  focus: { type: String }
});

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Product Based', 'Service Based', 'Startup'], required: true },
  logo: { type: String },
  package: { type: String },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Expert'] },
  
  overview: { type: String },
  eligibility: { type: String },
  skills: [{ type: String }],
  
  process: [{ type: String }],
  rounds: [roundSchema],
  roadmap30Days: [roadmapSchema]
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
