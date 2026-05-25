const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  id: { type: String, required: true }, // For dnd-kit
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ['PDF', 'ZIP', 'DOCUMENT', 'OTHER'], default: 'DOCUMENT' }
});

const lessonSchema = new mongoose.Schema({
  id: { type: String, required: true }, // For dnd-kit
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String },
  duration: { type: String },
  isFreePreview: { type: Boolean, default: false },
  resources: [resourceSchema]
});

const submoduleSchema = new mongoose.Schema({
  id: { type: String, required: true }, // For dnd-kit
  title: { type: String, required: true },
  lessons: [lessonSchema]
});

const moduleSchema = new mongoose.Schema({
  id: { type: String, required: true }, // For dnd-kit
  title: { type: String, required: true },
  submodules: [submoduleSchema]
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instructor: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  isPremium: { type: Boolean, default: false },
  status: { type: String, enum: ['Draft', 'Published', 'Scheduled', 'Archived'], default: 'Draft' },
  students: { type: Number, default: 0 },
  watchTime: { type: String, default: '0 hrs' },
  demoUrl: { type: String },
  notesName: { type: String },
  
  // Hierarchical Structure
  modules: [moduleSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
